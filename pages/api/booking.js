// pages/api/booking.js
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Only POST allowed' });
  }

  const { userId, vehicleNumber, slotId, bookingTime } = req.body;

  if (!userId || !vehicleNumber || !slotId || !bookingTime) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const { data, error } = await supabase
    .from('bookings')
    .insert([
      {
        user_id: userId,
        vehicle_number: vehicleNumber,
        slot_id: slotId,
        booking_time: bookingTime,
      },
    ]);

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.status(200).json({ message: 'Booking successful', data });
}
