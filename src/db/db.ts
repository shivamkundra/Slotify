import { createClient } from '@supabase/supabase-js'
import { Database } from './database.types'
import configs from '../config';
// Create a single supabase client for interacting with your database
const supabase = createClient<Database>(
  configs.supabaseUrl || "",
  configs.supabaseKey || ""
);
console.log(supabase);
export default supabase;
