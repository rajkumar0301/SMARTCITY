// pages/api/emergencies.js

import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    // 🔹 Handle submission from emergency.html
    const { name, location, description, contact } = req.body;

    const { data, error } = await supabase.from('emergencies').insert([
      { name, location, description, contact }
    ]);

    if (error) {
      return res.status(500).json({ error: 'Failed to report emergency' });
    }

    return res.status(200).json({ message: 'Emergency reported successfully', data });
  }

  if (req.method === 'GET') {
    // 🔹 Return all emergencies for admin view
    const { data, error } = await supabase.from('emergencies').select('*');

    if (error) {
      return res.status(500).json({ error: 'Failed to fetch emergencies' });
    }

    return res.status(200).json({ data });
  }

  // ❌ Method not allowed
  res.setHeader('Allow', ['POST', 'GET']);
  return res.status(405).end(`Method ${req.method} Not Allowed`);
}
