// api/supabaseClient.js

const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://qmodnifxglafmjmowspy.supabase.co';
const supabaseKey = process.env.SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Supabase URL or Key is missing in environment variables.');
}

const supabase = createClient(supabaseUrl, supabaseKey);

module.exports = supabase;
