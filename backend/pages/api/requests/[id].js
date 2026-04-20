import { supabase } from '../../../lib/supabaseServer';

export default async function handler(req, res) {
  const {
    query: { id },
    method,
  } = req;

  if (!id) {
    return res.status(400).json({ error: 'Request id is required' });
  }

  if (method === 'GET') {
    const { data, error } = await supabase.from('requests').select('*').eq('id', id).single();
    if (error) return res.status(500).json({ error: error.message });
    return res.status(200).json({ request: data });
  }

  if (method === 'PATCH') {
    const { status } = req.body;
    if (!status) {
      return res.status(400).json({ error: 'status is required' });
    }

    const { data, error } = await supabase
      .from('requests')
      .update({ status })
      .eq('id', id)
      .single();

    if (error) return res.status(500).json({ error: error.message });
    return res.status(200).json({ request: data });
  }

  res.setHeader('Allow', ['GET', 'PATCH']);
  return res.status(405).json({ error: 'Method not allowed' });
}
