import { Mail, ArrowRight, Sparkles, Shield, Globe } from "lucide-react";

export default function BossMinuteHome() {
  return (
    <main className="min-h-screen w-full bg-black text-white">
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="mx-auto max-w-6xl px-6 py-24">
          <div className="grid items-center gap-10 md:grid-cols-2">
            <div>
              <p className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs uppercase tracking-widest text-white/70">
                Gym for the Mind™
                <Sparkles className="h-3 w-3" />
              </p>
              <h1 className="mt-4 text-4xl font-extrabold leading-tight md:text-5xl">
                The Boss Minute
              </h1>
              <p className="mt-4 text-lg text-white/80">
                A daily, 150–250 word executive briefing with a built‑in concentration drill. Faceless. Precise. Global‑ready.
              </p>
              <ul className="mt-6 space-y-2 text-white/80">
                <li className="flex items-center gap-2"><Shield className="h-4 w-4"/>Reduce decision fatigue</li>
                <li className="flex items-center gap-2"><Mail className="h-4 w-4"/>Delivered by email, no logins</li>
                <li className="flex items-center gap-2"><Globe className="h-4 w-4"/>Written‑first for instant translation</li>
              </ul>

              <div className="mt-8 flex flex-col items-start gap-3 md:flex-row md:items-center">
                <a href="#start" className="inline-flex items-center rounded-2xl bg-white px-6 py-3 font-semibold text-black shadow-md hover:shadow-lg">
                  Start Pilot — $50/month <ArrowRight className="ml-2 h-4 w-4" />
                </a>
                <p className="text-sm text-white/60">Add leaders in minutes. Cancel anytime.</p>
              </div>

              {/* Email Capture Mock */}
              <form className="mt-6 flex w-full max-w-md items-center gap-2 rounded-2xl border border-white/10 bg-white/5 p-2">
                <input
                  type="email"
                  placeholder="Work email"
                  className="h-11 w-full rounded-xl bg-transparent px-4 text-white placeholder-white/40 outline-none"
                />
                <button type="button" className="inline-flex h-11 items-center rounded-xl bg-white px-4 font-semibold text-black">
                  Get a Sample
                </button>
              </form>
            </div>

            {/* INBOX PREVIEW */}
            <div className="rounded-3xl border border-white/10 bg-white/5 p-4 shadow-2xl">
              <div className="rounded-2xl bg-black/40 p-3 text-sm">
                <div className="mb-2 flex items-center justify-between text-white/60">
                  <span>Inbox • Priority</span>
                  <span>Today</span>
                </div>

                {/* Preview Card 1 */}
                <div className="mb-3 rounded-xl border border-white/10 bg-white/5 p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-white/80">The Boss Minute</span>
                    <span className="text-xs text-white/50">6:00 AM</span>
                  </div>
                  <p className="mt-1 text-sm font-semibold">The 2x2 Rule + 90‑Second Focus Drill</p>
                  <p className="mt-1 text-sm text-white/70 line-clamp-2">
                    Will this matter in 2 weeks? Will this matter in 2 years? If no/no → delegate. If yes/yes → full focus. Drill: stare at a single object for 90 seconds; return to target when mind wanders.
                  </p>
                </div>

                {/* Preview Card 2 */}
                <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-white/80">The Boss Minute</span>
                    <span className="text-xs text-white/50">Yesterday</span>
                  </div>
                  <p className="mt-1 text-sm font-semibold">Protect Your Power + Breath Control</p>
                  <p className="mt-1 text-sm text-white/70 line-clamp-2">
                    Track energy like money. Spend it only where it multiplies. Drill: box‑breathing 4‑4‑4‑4 for 3 minutes to reset executive attention.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES & BENEFITS (DARK) */}
      <section className="border-t border-white/10 bg-black/95 py-20">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-center text-3xl font-bold">Features & Benefits</h2>
          <p className="mt-2 text-center text-white/70">Daily email. Built‑in drill. Global‑ready. Future networking & events.</p>

          {/* Mount the previously built light block here in dark context via iframe-ish placeholder or duplicate styling (kept minimal here). */}
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {/* Left */}
            <div className="space-y-4">
              {[
                {title: 'Daily Executive Briefing', desc: '150–250 words delivered every morning for immediate action.'},
                {title: 'Built‑In Concentration Exercise', desc: 'A practical drill each day to train focus and endurance.'},
                {title: 'Faceless, Consistent Delivery', desc: 'Clean, 1‑on‑1 tone. No fluff. Ritual‑worthy.'},
              ].map((f, i) => (
                <div key={i} className="rounded-2xl border border-white/10 bg-white/5 p-6">
                  <h3 className="text-lg font-semibold">{f.title}</h3>
                  <p className="mt-1 text-white/70">{f.desc}</p>
                </div>
              ))}
            </div>
            {/* Right */}
            <div className="space-y-4">
              {[
                {title: 'Sharper Decisions, Faster Execution', desc: 'Reduce decision fatigue and accelerate key initiatives.'},
                {title: 'Low Cost, High ROI', desc: 'Less than a client lunch per month with compounding clarity gains.'},
                {title: 'Future Networking & Events', desc: 'Directories, regional meetups, and mega‑event discounts when scale is right.'},
              ].map((f, i) => (
                <div key={i} className="rounded-2xl border border-white/10 bg-white/5 p-6">
                  <h3 className="text-lg font-semibold">{f.title}</h3>
                  <p className="mt-1 text-white/70">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div id="start" className="mt-12 flex flex-col items-center gap-4">
            <a href="#" className="inline-flex items-center rounded-2xl bg-white px-6 py-3 font-semibold text-black shadow-md hover:shadow-lg">
              Start Pilot — $50/month <ArrowRight className="ml-2 h-4 w-4" />
            </a>
            <p className="text-sm text-white/60">Roll out to executives in minutes. Cancel anytime.</p>
          </div>
        </div>
      </section>
    </main>
  );
}
