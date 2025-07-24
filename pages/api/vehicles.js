// pages/api/vehicles.js

import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    // 🔹 Add a new vehicle
    const { owner, vehicleNumber, type, color } = req.body;

    const { data, error } = await supabase.from('vehicles').insert([
      { owner, vehicleNumber, type, color }
    ]);

    if (error) {
      return res.status(500).json({ error: 'Failed to add vehicle' });
    }

    return res.status(200).json({ message: 'Vehicle added', data });
  }

  if (req.method === 'GET') {
    // 🔹 Get all vehicles
    const { data, error } = await supabase.from('vehicles').select('*');

    if (error) {
      return res.status(500).json({ error: 'Failed to fetch vehicles' });
    }

    return res.status(200).json({ data });
  }

  if (req.method === 'DELETE') {
    // 🔹 Delete a vehicle by ID
    const { id } = req.body;

    const { error } = await supabase.from('vehicles').delete().eq('id', id);

    if (error) {
      return res.status(500).json({ error: 'Failed to delete vehicle' });
    }

    return res.status(200).json({ message: 'Vehicle deleted successfully' });
  }

  // ❌ Unsupported method
  res.setHeader('Allow', ['POST', 'GET', 'DELETE']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
