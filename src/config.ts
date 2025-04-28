import dotenv from "dotenv";

dotenv.config();

const configs = {
  port: process.env.PORT,
  supabaseUrl: process.env.SUPABASE_URL,
  supabaseKey: process.env.SUPABASE_KEY,
};

export default configs;