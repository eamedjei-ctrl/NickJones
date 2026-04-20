import { supabase } from '../../../lib/supabaseServer';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const { request_id } = req.query;
    const query = supabase.from('earnings').select('*');

    if (request_id) {
      query.eq('request_id', request_id);
    }

    const { data, error } = await query;
    if (error) return res.status(500).json({ error: error.message });
    return res.status(200).json({ earnings: data });
  }

  if (req.method === 'POST') {
    const { distance, fuel_cost, estimated_earnings, request_id } = req.body;
    if (!distance || !fuel_cost || !estimated_earnings || !request_id) {
      return res.status(400).json({ error: 'distance, fuel_cost, estimated_earnings, and request_id are required' });
    }

    // Generate a simple ID
    const id = 't' + Date.now() + Math.random().toString(36).substr(2, 5);

    const { data, error } = await supabase
      .from('earnings')
      .insert([{ id, distance, fuel_cost, estimated_earnings, request_id }])
      .single();

    if (error) return res.status(500).json({ error: error.message });
    return res.status(201).json({ earning: data });
  }

  res.setHeader('Allow', ['GET', 'POST']);
  return res.status(405).json({ error: 'Method not allowed' });
}
