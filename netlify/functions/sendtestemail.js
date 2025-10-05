// netlify/functions/sendtestemail.js
export async function handler(event) {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  try {
    const { to } = JSON.parse(event.body || "{}");
    const recipient = to || process.env.TEST_RECIPIENT;

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: process.env.FROM_EMAIL,
        to: [recipient],
        subject: "TBM — Email Test Successful ✅",
        html: `<h2>The Boss Minute</h2><p>Test OK at ${new Date().toISOString()}</p>`,
      }),
    });

    if (!res.ok) {
      return { statusCode: res.status, body: `Resend error: ${await res.text()}` };
    }
    return { statusCode: 200, body: "Sent" };
  } catch (e) {
    return { statusCode: 500, body: e.message || "Server error" };
  }
}
