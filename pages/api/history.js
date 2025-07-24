import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { user_id, action } = req.body;

    const { data, error } = await supabase
      .from('user_history')
      .insert([{ user_id, action }]);

    if (error) return res.status(500).json({ error: error.message });
    return res.status(200).json({ message: 'History saved', data });
  }

  if (req.method === 'GET') {
    const { user_id } = req.query;

    const { data, error } = await supabase
      .from('user_history')
      .select('*')
      .eq('user_id', user_id)
      .order('timestamp', { ascending: false });

    if (error) return res.status(500).json({ error: error.message });
    return res.status(200).json(data);
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
