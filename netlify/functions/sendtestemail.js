// netlify/functions/sendTestEmail.js
const fetch = (...args) => import('node-fetch').then(({default: f}) => f(...args));

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
        from: process.env.FROM_EMAIL,      // e.g., no-reply@thebossminute.com
        to: [recipient],                   // any address you want
        subject: "TBM — Email Test Successful ✅",
        html: `
          <h2>The Boss Minute</h2>
          <p>Your test email is working.</p>
          <p><b>Timestamp:</b> ${new Date().toISOString()}</p>
        `,
      }),
    });

    if (!res.ok) {
      const txt = await res.text();
      return { statusCode: res.status, body: `Resend error: ${txt}` };
    }

    return { statusCode: 200, body: "Sent" };
  } catch (e) {
    return { statusCode: 500, body: e.message || "Server error" };
  }
}
