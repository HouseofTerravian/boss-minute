import { useEffect, useState } from "react";
import { ArrowRight, Dumbbell } from "lucide-react";

// *** MASTER DEPLOY FILE with Weglot placeholder ***
export default function BossMinuteOnePager() {
  const [currency, setCurrency] = useState("USD");

  useEffect(() => {
    try {
      const loc = Intl.DateTimeFormat().resolvedOptions().locale || "en-US";
      const l = loc.toLowerCase();
      if (l.includes("gb") || l.includes("uk")) setCurrency("GBP");
      else if (l.includes("au")) setCurrency("AUD");
      else if (l.includes("nz")) setCurrency("NZD");
      else if (l.includes("ca")) setCurrency("CAD");
      else if (l.includes("se")) setCurrency("SEK");
      else if (l.includes("no")) setCurrency("NOK");
      else if (l.includes("ch")) setCurrency("CHF");
      else if (l.includes("jp")) setCurrency("JPY");
      else if (l.includes("de") || l.includes("fr") || l.includes("es") || l.includes("it") || l.includes("eu")) setCurrency("EUR");
      else setCurrency("USD");
    } catch {
      setCurrency("USD");
    }
  }, []);

  // Static FX placeholder (Top 10 currencies)
  const RATES: Record<string, number> = {
    USD: 1,
    EUR: 0.92,
    JPY: 147,
    GBP: 0.79,
    AUD: 1.49,
    CAD: 1.36,
    CHF: 0.89,
    NZD: 1.66,
    SEK: 10.6,
    NOK: 10.7,
  };
  const SYMBOL: Record<string, string> = {
    USD: "$",
    EUR: "€",
    JPY: "¥",
    GBP: "£",
    AUD: "A$",
    CAD: "C$",
    CHF: "CHF",
    NZD: "NZ$",
    SEK: "kr",
    NOK: "kr",
  };
  const fmtMonth = (usd: number) => `${SYMBOL[currency]}${Math.round(usd * (RATES[currency] || 1))}`;

  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "err">("idle");
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    try {
      setStatus("sending");
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: "boss-minute-test", currency })
      });
      if (!res.ok) throw new Error("Network error");
      setStatus("ok");
    } catch {
      setStatus("err");
    }
  }

  return (
    <main className="min-h-screen w-full bg-black text-white">
      {/* Currency toggle */}
      <div className="absolute right-4 top-4 z-30 inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-1 text-sm">
        <span className="text-white/60">Currency</span>
        <select
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
          className="bg-transparent text-white outline-none"
          aria-label="Currency"
        >
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="JPY">JPY</option>
          <option value="GBP">GBP</option>
          <option value="AUD">AUD</option>
          <option value="CAD">CAD</option>
          <option value="CHF">CHF</option>
          <option value="NZD">NZD</option>
          <option value="SEK">SEK</option>
          <option value="NOK">NOK</option>
        </select>
      </div>

      <section className="flex min-h-screen items-center justify-center px-6">
        <div className="mx-auto w-full max-w-3xl rounded-3xl border border-white/10 bg-white/5 p-8 text-center shadow-2xl">
          <p className="mx-auto inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs uppercase tracking-widest text-white/70">
            <Dumbbell className="h-3 w-3" aria-hidden />
            Gym for the Mind
          </p>

          <h1 className="mt-4 text-4xl font-extrabold leading-tight">The Boss Minute</h1>
          <p className="mt-3 text-lg text-white/80">
            A premium daily briefing (150–250 words) + a progressive concentration drill. Faceless. Precise. Built for elite operators.
          </p>

          <div className="mx-auto mt-8 max-w-md rounded-2xl border border-white/10 bg-black/40 p-6">
            <p className="text-sm text-white/70">Premium Subscription</p>
            <div className="mt-2 text-5xl font-extrabold">{fmtMonth(50)}<span className="align-super text-base font-semibold text-white/70"> / month per leader</span></div>
            <ul className="mt-4 space-y-2 text-left text-white/80">
              <li className="flex items-center gap-2"><span className="text-white/60">•</span> Daily executive email (150–250 words)</li>
              <li className="flex items-center gap-2"><span className="text-white/60">•</span> Progressive concentration drills (builds each month)</li>
              <li className="flex items-center gap-2"><span className="text-white/60">•</span> Translation‑friendly writing for global teams</li>
            </ul>

            <form className="mt-6 flex w-full items-center gap-2 rounded-2xl border border-white/10 bg-white/5 p-2" onSubmit={handleSubmit}>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Work email"
                className="h-11 w-full rounded-xl bg-transparent px-4 text-white placeholder-white/40 outline-none"
              />
              <button type="submit" disabled={status==='sending'} className="inline-flex h-11 items-center rounded-xl bg-white px-4 font-semibold text-black disabled:opacity-60">
                {status === 'sending' ? 'Sending…' : 'Send Test Email'}
              </button>
            </form>
            {status === 'ok' && (
              <p className="mt-2 text-xs text-emerald-400">Check your inbox — your sample Boss Minute is on the way.</p>
            )}
            {status === 'err' && (
              <p className="mt-2 text-xs text-rose-400">We couldn’t send just now. Try again or email hello@thebossminute.com.</p>
            )}
          </div>

          <div className="mx-auto mt-8 grid gap-3 md:grid-cols-2">
            <div className="rounded-xl border border-white/10 bg-white/5 p-4 text-left text-sm">
              <div className="flex items-center justify-between text-white/60"><span>The Boss Minute</span><span>Today</span></div>
              <p className="mt-1 font-semibold">The 2x2 Rule + 90‑Second Drill</p>
              <p className="mt-1 text-white/70 line-clamp-2">Will this matter in 2 weeks? Will this matter in 2 years? Drill: single‑object gaze for 90s; return to target when mind wanders.</p>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/5 p-4 text-left text-sm">
              <div className="flex items-center justify-between text-white/60"><span>The Boss Minute</span><span>Yesterday</span></div>
              <p className="mt-1 font-semibold">Protect Your Power + Breath Control</p>
              <p className="mt-1 text-white/70 line-clamp-2">Track energy like money. Drill: box‑breathing 4‑4‑4‑4 for 3 minutes to reset executive attention.</p>
            </div>
          </div>

          <p className="mt-6 text-xs text-white/50">Currency auto‑detect uses browser locale. (Prod: geo‑IP + live FX. Currencies: USD, EUR, JPY, GBP, AUD, CAD, CHF, NZD, SEK, NOK.)</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-black py-8">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-6 md:flex-row">
          <p className="text-white/60">© {new Date().getFullYear()} The Boss Minute — All Rights Reserved</p>
          <div className="flex items-center gap-6 text-white/60">
            <a href="#" className="hover:text-white">Privacy</a>
            <a href="#" className="hover:text-white">Terms</a>
            <a href="mailto:hello@thebossminute.com" className="hover:text-white">Contact</a>
          </div>
        </div>
      </footer>

      {/* Weglot Translation Snippet Placeholder */}
      {/* Paste your Weglot snippet here once you create a project/key on weglot.com */}
      {/* Example: <script src="https://cdn.weglot.com/weglot.min.js"></script><script>Weglot.initialize({ api_key: 'YOUR_KEY' });</script> */}
    </main>
  );
}
