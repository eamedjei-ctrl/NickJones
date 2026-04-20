import { supabase } from '../../../lib/supabaseServer';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const { data, error } = await supabase.from('requests').select('*');
    if (error) return res.status(500).json({ error: error.message });
    return res.status(200).json({ requests: data });
  }

  if (req.method === 'POST') {
    const { pickup_location, destination, user_id } = req.body;
    if (!pickup_location || !destination || !user_id) {
      return res.status(400).json({ error: 'pickup_location, destination, and user_id are required' });
    }

    const { data, error } = await supabase
      .from('requests')
      .insert([{ pickup_location, destination, status: 'Pending', user_id }])
      .single();

    if (error) return res.status(500).json({ error: error.message });
    return res.status(201).json({ request: data });
  }

  res.setHeader('Allow', ['GET', 'POST']);
  return res.status(405).json({ error: 'Method not allowed' });
}
