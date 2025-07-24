// api/login.js
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email, password } = req.body;
  // Authenticate logic here (e.g., with Supabase)
  res.status(200).json({ message: 'Login successful' });
}
