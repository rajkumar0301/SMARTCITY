// /supabaseClient.js or /lib/supabaseClient.js (your choice)

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();
// const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
// const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);
//export const supabase = createClient(supabaseUrl, supabaseAnonKey);
export default supabase;