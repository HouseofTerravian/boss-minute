import { useState } from "react";

function App() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("Loading...");

    try {
      const res = await fetch("/.netlify/functions/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        setStatus("✅ Subscribed successfully!");
        // @ts-ignore
        window.splitbee?.track("cta_click", { id: "subscribe" });
      } else {
        const text = await res.text();
        setStatus(`❌ Error: ${text}`);
      }
    } catch (err) {
      setStatus(`❌ Error: ${err}`);
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-black text-white">
      <h1 className="text-3xl font-bold mb-4">The Boss Minute</h1>
      <p className="mb-6 text-center max-w-md">
        A premium daily briefing (150–250 words) + progressive concentration drill.
        Faceless. Precise. Built for elite operators.
      </p>

      <form onSubmit={handleSubscribe} className="flex gap-2">
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="px-3 py-2 rounded text-black"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-green-600 rounded hover:bg-green-700"
        >
          Send Test Email
        </button>
      </form>

      {status && <p className="mt-4">{status}</p>}

      <footer className="absolute bottom-4 text-sm space-x-4">
        <a href="/docs/bossminute-privacy-2025-09-21.pdf" target="_blank" rel="noreferrer">Privacy</a>
        <a href="/docs/bossminute-terms-2025-09-21.pdf" target="_blank" rel="noreferrer">Terms</a>
        <a href="/docs/bossminute-affiliates-2025-09-21.pdf" target="_blank" rel="noreferrer">Affiliates</a>
        <a href="/docs/bossminute-contact-2025-09-21.pdf" target="_blank" rel="noreferrer">Contact</a>
      </footer>
    </main>
  );
}

export default App;
