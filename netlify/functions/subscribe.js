// Netlify Function — /api/subscribe
// Posts email to ConvertKit with honeypot, validation, and rate limiting

const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const RATE_LIMIT_MAX = 5; // max submissions per IP per window
const ipLog = new Map();

function isRateLimited(ip) {
  const now = Date.now();
  const entry = ipLog.get(ip);
  if (!entry || now - entry.ts > RATE_LIMIT_WINDOW_MS) {
    ipLog.set(ip, { ts: now, count: 1 });
    return false;
  }
  if (entry.count >= RATE_LIMIT_MAX) return true;
  entry.count += 1;
  return false;
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
}

exports.handler = async (event) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json',
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers, body: '' };
  }

  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, headers, body: JSON.stringify({ error: 'Method not allowed' }) };
  }

  // Rate limiting
  const ip = event.headers['x-forwarded-for']?.split(',')[0]?.trim() || 'unknown';
  if (isRateLimited(ip)) {
    return { statusCode: 429, headers, body: JSON.stringify({ error: 'Too many requests' }) };
  }

  let body;
  try {
    body = JSON.parse(event.body || '{}');
  } catch {
    return { statusCode: 400, headers, body: JSON.stringify({ error: 'Invalid request' }) };
  }

  const { email, website, first_name, variant, ref_source } = body;

  // Honeypot — bots fill this, humans don't
  if (website) {
    return { statusCode: 200, headers, body: JSON.stringify({ ok: true }) };
  }

  // Email validation
  if (!email || !isValidEmail(email)) {
    return { statusCode: 400, headers, body: JSON.stringify({ error: 'Valid email required' }) };
  }

  const apiKey = process.env.CONVERTKIT_API_KEY;
  const formId = process.env.CONVERTKIT_FORM_ID;

  if (!apiKey || !formId) {
    console.error('Missing CONVERTKIT_API_KEY or CONVERTKIT_FORM_ID env vars');
    return { statusCode: 500, headers, body: JSON.stringify({ error: 'Server configuration error' }) };
  }

  // Build tags from variant + attribution
  const tags = [];
  if (variant) tags.push(`variant:${variant}`);
  if (ref_source) tags.push(`ref:${ref_source}`);

  try {
    const kitRes = await fetch(`https://api.convertkit.com/v3/forms/${formId}/subscribe`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        api_key: apiKey,
        email,
        first_name: first_name || undefined,
        fields: {
          ...(variant ? { variant } : {}),
          ...(ref_source ? { ref_source } : {}),
        },
      }),
    });

    const kitData = await kitRes.json();

    if (!kitRes.ok) {
      console.error('Kit error:', kitData);
      return { statusCode: 502, headers, body: JSON.stringify({ error: 'Subscription failed' }) };
    }

    return { statusCode: 200, headers, body: JSON.stringify({ ok: true }) };
  } catch (err) {
    console.error('Subscribe function error:', err);
    return { statusCode: 500, headers, body: JSON.stringify({ error: 'Server error' }) };
  }
};
