import React, { useState } from "react";

/**
 * Replace this component with your latest Canvas "Master One-Pager (deploy)".
 * Keep the footer links and the email test button wiring as shown below.
 */
export default function App() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "err">("idle");
  const [msg, setMsg] = useState("");

  async function sendTestEmail(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setStatus("sending");
    setMsg("");
    try {
      const resp = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: "boss-minute-test", currency: "USD" }),
      });
      if (!resp.ok) {
        const t = await resp.text();
        setStatus("err");
        setMsg(t || "ESP error");
      } else {
        setStatus("ok");
        setMsg("Success! Test request sent.");
      }
    } catch (e) {
      setStatus("err");
      setMsg("Network error");
    }
  }

  return (
    <div style={{minHeight:"100vh", display:"flex", flexDirection:"column", fontFamily:"system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial"}}>
      <main style={{flex:1, display:"grid", placeItems:"center", padding:"40px"}}>
        <div style={{maxWidth: 720}}>
          <h1 style={{fontSize: "2.5rem", marginBottom: 8}}>The Boss Minute</h1>
          <p style={{opacity:0.8, marginBottom: 24}}>Paste your Canvas one-pager here. Keep this form to test ConvertKit.</p>

          <form onSubmit={sendTestEmail} style={{display:"flex", gap:8}}>
            <input
              type="email"
              required
              placeholder="you@example.com"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              style={{flex:1, padding:"12px 14px", borderRadius:12, border:"1px solid #ddd"}}
            />
            <button
              data-splitbee-event="Send Test Email"
              type="submit"
              disabled={status === 'sending'}
              style={{height:44, padding:"0 16px", borderRadius:12, border:"0", background:"#fff", fontWeight:600, cursor:"pointer", opacity: status==='sending' ? 0.6 : 1}}
            >
              {status === 'sending' ? 'Sending…' : 'Send Test Email'}
            </button>
          </form>
          {status !== "idle" && (
            <p style={{marginTop:12, fontWeight:600, color: status==="ok" ? "green" : status==="err" ? "crimson" : "inherit"}}>{msg}</p>
          )}
        </div>
      </main>

      <footer style={{borderTop:"1px solid #eee", padding:"16px 24px", display:"flex", gap:16, flexWrap:"wrap"}}>
        <a href="/docs/bossminute-privacy-2025-09-21.pdf" target="_blank" rel="noopener noreferrer">Privacy</a>
        <a href="/docs/bossminute-terms-2025-09-21.pdf" target="_blank" rel="noopener noreferrer">Terms</a>
        <a href="/docs/bossminute-affiliates-2025-09-21.pdf" target="_blank" rel="noopener noreferrer">Affiliates</a>
        <a href="/docs/bossminute-contact-2025-09-21.pdf" target="_blank" rel="noopener noreferrer">Contact</a>
        <div style={{marginLeft:"auto", opacity:0.7, fontSize:12}}>
          Built for executives and leaders of organizations.
        </div>
      </footer>
    </div>
  );
}
