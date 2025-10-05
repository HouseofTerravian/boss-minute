export async function handler() {
  return {
    statusCode: 200,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      FROM_EMAIL: process.env.FROM_EMAIL,
      TEST_RECIPIENT: process.env.TEST_RECIPIENT,
      RESEND_API_KEY: process.env.RESEND_API_KEY
        ? "✅ Loaded (hidden for security)"
        : "❌ Missing",
    }),
  };
}
