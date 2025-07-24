// /api/report-violation.js
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { user_id, vehicle_number, violation_type, location, description, evidence_url } = req.body;

  if (!user_id || !vehicle_number || !violation_type || !location || !description) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const { data, error } = await supabase
    .from('violations')
    .insert([{ user_id, vehicle_number, violation_type, location, description, evidence_url }]);

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  return res.status(200).json({ message: 'Violation reported successfully', data });
}
