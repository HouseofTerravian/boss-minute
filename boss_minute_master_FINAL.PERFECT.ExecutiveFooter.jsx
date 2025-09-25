import { useEffect, useState } from "react";
import { ArrowRight, Dumbbell } from "lucide-react";

// *** Boss Minute — MASTER One‑Pager (Deploy) ***

// Expanded currency set (placeholders; swap to live FX in prod)
const RATES: Record<string, number> = {
  USD: 1,  EUR: 0.92,  JPY: 147,  GBP: 0.79,  AUD: 1.49,  CAD: 1.36,
  CHF: 0.89, NZD: 1.66,  SEK: 10.6, NOK: 10.7,
  CNY: 7.1,  HKD: 7.8,  SGD: 1.35,  KRW: 1370,  MXN: 18.1,
  INR: 84,  BRL: 5.5,  ZAR: 18.5,  TRY: 33,   TWD: 32,
  DKK: 6.9, PLN: 4.0,  THB: 36,   MYR: 4.6,  IDR: 15500,
  PHP: 57,  AED: 3.67, SAR: 3.75,
  BTC: 0.000017 // display conversion only — checkout coming soon
};
const SYMBOL: Record<string, string> = {
  USD: "$", EUR: "€", JPY: "¥", GBP: "£", AUD: "A$", CAD: "C$",
  CHF: "CHF", NZD: "NZ$", SEK: "kr", NOK: "kr",
  CNY: "¥",  HKD: "HK$", SGD: "S$", KRW: "₩",  MXN: "MX$",
  INR: "₹",  BRL: "R$", ZAR: "R",  TRY: "₺",  TWD: "NT$",
  DKK: "kr", PLN: "zł", THB: "฿", MYR: "RM", IDR: "Rp",
  PHP: "₱",  AED: "د.إ", SAR: "﷼",
  BTC: "₿"
};
const CURRENCIES = [
  "USD","EUR","JPY","GBP","AUD","CAD","CHF","NZD","SEK","NOK",
  "CNY","HKD","SGD","KRW","MXN","INR","BRL","ZAR","TRY","TWD",
  "DKK","PLN","THB","MYR","IDR","PHP","AED","SAR",
  "BTC" // display only until crypto checkout is enabled
] as const;

export default function BossMinuteOnePager() {
  const [currency, setCurrency] = useState<typeof CURRENCIES[number]>("USD");
  const [isCurMenuOpen, setCurMenuOpen] = useState(false);
  const [note, setNote] = useState("");

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
      <div className="absolute right-4 top-4 z-50">
        <div className="relative inline-block text-left">
          <button
            type="button"
            onClick={() => setCurMenuOpen(v => !v)}
            className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-1 text-sm text-white hover:bg-white/10"
            aria-haspopup="listbox"
            aria-expanded={isCurMenuOpen}
          >
            <span className="text-white/60">Currency</span>
            <span className="font-semibold">{currency}</span>
          </button>
          {isCurMenuOpen && (
            <ul
              role="listbox"
              className="absolute right-0 mt-2 max-h-64 w-44 overflow-auto rounded-xl border border-white/10 bg-black/95 p-1 shadow-2xl outline-none"
            >
              {CURRENCIES.map(c => (
                <li
                  key={c}
                  role="option"
                  aria-selected={currency === c}
                  onClick={() => {
                    setCurrency(c);
                    setCurMenuOpen(false);
                    setNote(c === 'BTC' ? 'Bitcoin checkout is coming soon. For now, BTC is display-only.' : '');
                  }}
                  className={`cursor-pointer rounded-lg px-3 py-2 text-sm hover:bg-white/10 ${currency === c ? 'bg-white/10' : ''}`}
                >
                  {c}{c === 'BTC' && <span className="ml-2 rounded bg-white/10 px-1.5 py-0.5 text-[10px] uppercase tracking-wide text-white/70">Coming Soon</span>}
                </li>
              ))}
            </ul>
          )}
        </div>
        {currency === 'BTC' && (
          <div className="mt-2 rounded-md border border-yellow-400/20 bg-yellow-400/10 px-3 py-1 text-xs text-yellow-300">
            BTC checkout is coming soon (display‑only for now).
          </div>
        )}
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
              <p className="mt-2 text-xs text-emerald-400">Check your inbox — your sample Boss Minute is on the way. Inside: upgrade to full access.</p>
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

          <p className="mt-6 text-xs text-white/50">
            Currency auto‑detect uses browser locale. (Prod: geo‑IP + live FX. Currencies include USD, EUR, JPY, GBP, AUD, CAD, CHF, NZD, SEK, NOK, CNY, HKD, SGD, KRW, MXN, INR, BRL, ZAR, TRY, TWD, DKK, PLN, THB, MYR, IDR, PHP, AED, SAR. <span className="text-white/60">BTC is display‑only — checkout coming soon.</span>)
          </p>

          <div className="mx-auto mt-4 flex items-center justify-center gap-3 text-xs text-white/60">
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">Boss Minute ELITE — Coming Soon</span>
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">Enterprise Packs — Coming Soon</span>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/10 bg-black py-8">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-6 md:flex-row">
          <p className="text-white/60">© {new Date().getFullYear()} The Boss Minute — All Rights Reserved</p>
          <div className="flex items-center gap-6 text-white/60">
            <a href="#" className="hover:text-white">Privacy</a>
            <a href="#" className="hover:text-white">Terms</a>
            <a href="mailto:hello@thebossminute.com" className="hover:text-white">Contact</a>
          </div>
        </div>
        <p className="mt-2 text-center text-xs text-white/60">
          The Boss Minute is an educational and professional development service designed for executives and leaders of organizations. It is not therapy, counseling, medical treatment, or a substitute for licensed mental health care. If you are seeking clinical services, please contact a licensed provider in your jurisdiction.
        </p>
      </footer>

      {/* Weglot snippet placeholder — paste real key at deploy */}
      {/* <script src="https://cdn.weglot.com/weglot.min.js"></script>
      <script>Weglot.initialize({ api_key: 'YOUR_KEY' });</script> */}
    </main>
  );
}
