import { supabase } from '../../../lib/supabaseServer';

export default async function handler(req, res) {
  const {
    query: { id },
    method,
  } = req;

  if (!id) {
    return res.status(400).json({ error: 'User id is required' });
  }

  if (method === 'GET') {
    const { data, error } = await supabase.from('users').select('*').eq('id', id).single();
    if (error) return res.status(500).json({ error: error.message });
    return res.status(200).json({ user: data });
  }

  res.setHeader('Allow', ['GET']);
  return res.status(405).json({ error: 'Method not allowed' });
}
