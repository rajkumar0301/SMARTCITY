// /api/verify_otp.js
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ message: 'Method not allowed' });

  const { email, otp } = req.body;
  if (!email || !otp) return res.status(400).json({ message: 'Email and OTP are required' });

  const { data, error } = await supabase
    .from('otp_verification')
    .select('*')
    .eq('email', email)
    .eq('otp', otp)
    .eq('verified', false)
    .order('created_at', { ascending: false })
    .limit(1);

  if (error || !data || data.length === 0) {
    return res.status(401).json({ message: 'Invalid or expired OTP' });
  }

  const otpRecord = data[0];
  const otpTime = new Date(otpRecord.created_at).getTime();
  const now = Date.now();
  const diffMinutes = (now - otpTime) / (1000 * 60);

  if (diffMinutes > 5) {
    return res.status(401).json({ message: 'OTP expired' });
  }

  await supabase
    .from('otp_verification')
    .update({ verified: true })
    .eq('id', otpRecord.id);

  res.status(200).json({ message: 'OTP verified successfully' });
}







// // pages/api/verify_otp.js
// import { createClient } from '@supabase/supabase-js';

// const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

// export default async function handler(req, res) {
//   if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

//   const { email, otp } = req.body;
//   if (!email || !otp) return res.status(400).json({ error: 'Email and OTP are required' });

//   const { data, error } = await supabase
//     .from('otp_verification')
//     .select('*')
//     .eq('email', email)
//     .eq('otp', otp)
//     .order('created_at', { ascending: false })
//     .limit(1);

//   if (error || data.length === 0) {
//     return res.status(400).json({ error: 'Invalid OTP' });
//   }

//   const otpEntry = data[0];
//   const now = new Date();
//   const createdTime = new Date(otpEntry.created_at);
//   const diffMinutes = (now - createdTime) / (1000 * 60);

//   if (diffMinutes > 5) {
//     return res.status(400).json({ error: 'OTP expired' });
//   }

//   res.status(200).json({ message: 'OTP verified successfully' });
// }
