import { Request, Response } from 'express';
// import { AuthService } from '../services/auth.service'; // we'll create this next

export const AuthController = {
  signup: async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;

      const result = await AuthService.signup(email, password);

      return res.status(201).json({ message: 'User created successfully', data: result });
    } catch (error: any) {
      console.error(error);
      return res.status(400).json({ message: error.message || 'Signup failed' });
    }
  },

  login: async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;

      const result = await AuthService.login(email, password);

      return res.status(200).json({ message: 'Login successful', data: result });
    } catch (error: any) {
      console.error(error);
      return res.status(400).json({ message: error.message || 'Login failed' });
    }
  },
};
