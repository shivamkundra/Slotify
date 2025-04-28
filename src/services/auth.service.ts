import supabase from '../db/db'; // assuming your client is here
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const AuthService = {
  signup: async (email: string, password: string) => {
    // 1. Check if user already exists
    const { data: existingUser, error: findError } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single();

    if (existingUser) {
      throw new Error('User already exists');
    }

    // 2. Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // 3. Insert new user into DB
    const { data: newUser, error: insertError } = await supabase
      .from('users')
      .insert([{ email, password: hashedPassword }])
      .select()
      .single();

    if (insertError) {
      throw new Error(insertError.message);
    }

    return { id: newUser.id, email: newUser.email };
  },

  login: async (email: string, password: string) => {
    // 1. Find the user by email
    const { data: user, error: findError } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single();

    if (!user) {
      throw new Error('Invalid credentials');
    }

    // 2. Compare password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error('Invalid credentials');
    }

    // 3. Generate JWT token
    const payload = { id: user.id, email: user.email };
    const token = jwt.sign(payload, process.env.JWT_SECRET as string, { expiresIn: '15m' });

    return { token, user: { id: user.id, email: user.email } };
  }
};
