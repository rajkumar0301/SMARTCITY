// /pages/api/otp_register.js
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email, password } = req.body;

  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    return res.status(200).json({ message: 'User registered', user: data.user });
  } catch (err) {
    return res.status(500).json({ error: 'Server error: ' + err.message });
  }
}







// // /api/otp_register.js
// import { createClient } from '@supabase/supabase-js';

// const supabase = createClient(
//   process.env.SUPABASE_URL,
//   process.env.SUPABASE_SERVICE_ROLE_KEY // Use service role to insert
// );

// export default async function handler(req, res) {
//   if (req.method !== 'POST') return res.status(405).json({ message: 'Method not allowed' });

//   const { email } = req.body;
//   if (!email) return res.status(400).json({ message: 'Email is required' });

//   const otp = Math.floor(100000 + Math.random() * 900000).toString();

//   const { error } = await supabase.from('otp_verification').insert([
//     {
//       email,
//       otp,
//       verified: false,
//     },
//   ]);

//   if (error) return res.status(500).json({ message: 'Failed to store OTP', error });

//   console.log(`OTP for ${email}: ${otp}`); // Log only for development

//   res.status(200).json({ message: 'OTP generated and sent (logged in console)' });
// }







// pages/api/otp_register.js
// import { createClient } from '@supabase/supabase-js';

// const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

// export default async function handler(req, res) {
//   if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

//   const { email } = req.body;
//   if (!email) return res.status(400).json({ error: 'Email is required' });

//   const otp = Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit

//   const { error } = await supabase.from('otp_verification').insert([
//     { email, otp }
//   ]);

//   if (error) return res.status(500).json({ error: 'Failed to save OTP' });

//   console.log(`OTP for ${email} is: ${otp}`); // Simulate sending

//   res.status(200).json({ message: 'OTP sent successfully' });
// }
