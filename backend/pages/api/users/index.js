import { supabase } from '../../../lib/supabaseServer';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const { data, error } = await supabase.from('users').select('*');
    if (error) return res.status(500).json({ error: error.message });
    return res.status(200).json({ users: data });
  }

  if (req.method === 'POST') {
    const { name, email, role } = req.body;
    if (!name || !email || !role) {
      return res.status(400).json({ error: 'name, email, and role are required' });
    }

    const { data, error } = await supabase.from('users').insert([{ name, email, role }]).single();
    if (error) return res.status(500).json({ error: error.message });
    return res.status(201).json({ user: data });
  }

  res.setHeader('Allow', ['GET', 'POST']);
  return res.status(405).json({ error: 'Method not allowed' });
}
