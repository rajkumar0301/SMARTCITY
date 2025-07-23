// api/complaint.js

const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { user_id, title, description, status } = req.body;

    const { data, error } = await supabase
      .from('complaints')
      .insert([
        {
          user_id,
          title,
          description,
          status: status || 'pending',
        },
      ]);

    return res.status(error ? 500 : 200).json({ data, error });
  }

  res.status(405).send('Method Not Allowed');
}
