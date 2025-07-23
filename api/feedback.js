// api/feedback.js

const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { user_id, message } = req.body;

    const { data, error } = await supabase
      .from('feedback')
      .insert([{ user_id, message }]);

    return res.status(error ? 500 : 200).json({ data, error });
  }

  return res.status(405).send('Method Not Allowed');
}
