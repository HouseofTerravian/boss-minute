export async function handler(event) {
  if (event.httpMethod !== 'POST') return { statusCode: 405, body: 'Method Not Allowed' };
  try {
    const { email, source, currency } = JSON.parse(event.body || '{}');
    if (!email) return { statusCode: 400, body: 'Email required' };

    const url = `https://api.convertkit.com/v3/forms/${process.env.CK_FORM_ID}/subscribe`;
    const resp = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        api_key: process.env.CK_API_KEY,
        email,
        fields: { source: source || 'boss-minute-test', currency: currency || 'USD' }
      })
    });

    if (!resp.ok) return { statusCode: resp.status, body: await resp.text() || 'ESP error' };
    return { statusCode: 200, body: JSON.stringify({ ok: true }) };
  } catch (e) {
    return { statusCode: 500, body: 'Failed to subscribe' };
  }
}
