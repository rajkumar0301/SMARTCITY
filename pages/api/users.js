const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

module.exports = async (req, res) => {
  if (req.method === 'POST') {
    const { name, email } = req.body;
    const { data, error } = await supabase
      .from('users')
      .insert([{ name, email }]);

    res.status(error ? 500 : 200).json({ data, error });
  } else {
    res.status(405).send('Method Not Allowed');
  }
};
