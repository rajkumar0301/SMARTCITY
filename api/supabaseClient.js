// api/supabaseClient.js

const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://qmodnifxglafmjmowspy.supabase.co';
const supabaseKey = process.env.SUPABASE_KEY;

if (!supabaseKey) {
  throw new Error('SUPABASE_KEY is not defined in environment variables.');
}

const supabase = createClient(supabaseUrl, supabaseKey);

module.exports = supabase;
