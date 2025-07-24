import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { location, traffic_level } = req.body;

    const { data, error } = await supabase
      .from('traffic')
      .insert([{ location, traffic_level }]);

    if (error) return res.status(500).json({ error: error.message });
    return res.status(200).json({ message: 'Traffic data recorded', data });
  }

  if (req.method === 'GET') {
    const { data, error } = await supabase
      .from('traffic')
      .select('*')
      .order('updated_at', { ascending: false });

    if (error) return res.status(500).json({ error: error.message });
    return res.status(200).json(data);
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
