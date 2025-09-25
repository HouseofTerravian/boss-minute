import { useEffect, useState } from "react";
import { ArrowRight, Dumbbell } from "lucide-react";

// One-screen premium landing with currency toggle + test email capture
export default function BossMinuteOnePager() {
  const [currency, setCurrency] = useState("USD");

  // Locale-based autodetect (swap to geo‑IP + live FX in production)
  useEffect(() => {
    try {
      const loc = Intl.DateTimeFormat().resolvedOptions().locale || "en-US";
      if (loc.startsWith("en-GB") || loc.includes("GB")) setCurrency("GBP");
      else if (loc.startsWith("de") || loc.startsWith("fr") || loc.startsWith("es") || loc.startsWith("it") || loc.includes("EU")) setCurrency("EUR");
      else setCurrency("USD");
    } catch {
      setCurrency("USD");
    }
  }, []);

  // Simple static FX (placeholder)
  const RATES: Record<string, number> = { USD: 1, EUR: 0.92, GBP: 0.79 };
  const SYMBOL: Record<string, string> = { USD: "$", EUR: "€", GBP: "£" };
  const fmtMonth = (usd: number) => `${SYMBOL[currency]}${Math.round(usd * (RATES[currency] || 1))}`;

  return (
    <main className="min-h-screen w-full bg-black text-white">
      {/* Currency toggle (top‑right) */}
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
          <option value="GBP">GBP</option>
        </select>
      </div>

      {/* One‑page layout (centered, no scrolling on most laptops) */}
      <section className="flex min-h-screen items-center justify-center px-6">
        <div className="mx-auto w-full max-w-3xl rounded-3xl border border-white/10 bg-white/5 p-8 text-center shadow-2xl">
          {/* Brand Pill */}
          <p className="mx-auto inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs uppercase tracking-widest text-white/70">
            <Dumbbell className="h-3 w-3" aria-hidden />
            Gym for the Mind
          </p>

          <h1 className="mt-4 text-4xl font-extrabold leading-tight">The Boss Minute</h1>
          <p className="mt-3 text-lg text-white/80">
            A premium daily briefing (150–250 words) + a progressive concentration drill. Faceless. Precise. Built for elite operators.
          </p>

          {/* Premium Plan */}
          <div className="mx-auto mt-8 max-w-md rounded-2xl border border-white/10 bg-black/40 p-6">
            <p className="text-sm text-white/70">Premium Subscription</p>
            <div className="mt-2 text-5xl font-extrabold">{fmtMonth(50)}<span className="align-super text-base font-semibold text-white/70"> / month per leader</span></div>
            <ul className="mt-4 space-y-2 text-left text-white/80">
              <li className="flex items-center gap-2"><span className="text-white/60">•</span> Daily executive email (150–250 words)</li>
              <li className="flex items-center gap-2"><span className="text-white/60">•</span> Progressive concentration drills (builds each month)</li>
              <li className="flex items-center gap-2"><span className="text-white/60">•</span> Translation‑friendly writing for global teams</li>
            </ul>

            {/* TEST EMAIL capture */}
            <form className="mt-6 flex w-full items-center gap-2 rounded-2xl border border-white/10 bg-white/5 p-2" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                required
                placeholder="Work email"
                className="h-11 w-full rounded-xl bg-transparent px-4 text-white placeholder-white/40 outline-none"
              />
              <button type="submit" className="inline-flex h-11 items-center rounded-xl bg-white px-4 font-semibold text-black">
                Send Test Email
              </button>
            </form>
            <p className="mt-2 text-xs text-white/60">
              We’ll send a sample Boss Minute. Inside: upgrade to full access or join the free periodic list.
            </p>
          </div>

          {/* Tight inbox preview */}
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

          <p className="mt-6 text-xs text-white/50">Currency auto‑detect uses browser locale. (Prod: geo‑IP + live FX.)</p>
        </div>
      </section>
    </main>
  );
}
