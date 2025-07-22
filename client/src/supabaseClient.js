import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://your-project.supabase.co'; // Replace this
const supabaseAnonKey = 'your-anon-key'; // Replace this

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
