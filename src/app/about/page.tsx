import type { Metadata } from 'next';
import Cta from '@/components/Cta';

export const metadata: Metadata = {
  title: 'About',
  description:
    'GIORAPTOR is a forex broker technology provider building institutional-grade brokerage infrastructure for the next generation of operators.'
};

const PRINCIPLES = [
  {
    title: 'Operator-led',
    body: 'Designed by people who have run brokers, dealing desks, and compliance functions in live regulated environments.'
  },
  {
    title: 'Audit-ready',
    body: 'Every action is logged, every routing decision explainable, every report reconstructable. Compliance is a default, not a feature.'
  },
  {
    title: 'Open by interface',
    body: 'Our modules expose clean APIs and standard protocols. We integrate with your bridges, PSPs, KYC vendors, and BI tools — without lock-in.'
  },
  {
    title: 'Performance-obsessed',
    body: 'Pricing pipelines, charting, and execution paths are tuned for the desk, not the demo. Latency budgets are measured, not assumed.'
  }
];

const CAPABILITIES = [
  'Forex, indices, metals, energies, equities, and crypto',
  'A-book and B-book routing, with any hybrid model',
  'Multi-jurisdictional onboarding and compliance flows',
  'Multi-currency wallets and global payment rails',
  'Regulated market data and proprietary signal engines'
];

export default function AboutPage() {
  return (
    <>
      <section className="border-b border-white/5">
        <div className="container-page py-20 md:py-28">
          <span className="text-xs uppercase tracking-[0.22em] text-brand-cyan">
            About
          </span>
          <h1 className="mt-3 font-display text-4xl tracking-tight md:text-6xl">
            Infrastructure for the{' '}
            <span className="text-gradient-brand">next generation</span> of
            brokers.
          </h1>
          <p className="mt-6 max-w-3xl text-brand-mist/75 leading-relaxed text-lg">
            GIORAPTOR is a forex broker technology provider. We build the
            platforms, dealing systems, CRMs, portals, and websites that brokers
            run their businesses on — engineered to institutional standards and
            shipped with the urgency of a startup.
          </p>
        </div>
      </section>

      <section className="container-page py-20">
        <div className="grid gap-12 md:grid-cols-2">
          <div>
            <h2 className="font-display text-3xl tracking-tight md:text-4xl">
              Our position in the market
            </h2>
            <p className="mt-5 text-brand-mist/70 leading-relaxed">
              The brokerage industry runs on stitched-together tooling — bridges,
              CRMs, portals, and websites from different vendors that rarely
              talk to each other and almost never share a vision. GIORAPTOR was
              founded to fix that.
            </p>
            <p className="mt-4 text-brand-mist/70 leading-relaxed">
              We design every module to integrate end-to-end while remaining
              independently useful. A new broker can launch the entire stack in
              weeks. An established broker can replace a single component
              without re-platforming the rest.
            </p>
          </div>
          <div>
            <h2 className="font-display text-3xl tracking-tight md:text-4xl">
              What we cover
            </h2>
            <ul className="mt-5 space-y-3">
              {CAPABILITIES.map((c) => (
                <li key={c} className="flex items-start gap-3">
                  <span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-brand-cyan" />
                  <span className="text-brand-mist/80">{c}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="container-page py-20">
        <span className="text-xs uppercase tracking-[0.22em] text-brand-gold-light">
          Principles
        </span>
        <h2 className="mt-3 font-display text-3xl tracking-tight md:text-5xl">
          How we build.
        </h2>
        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {PRINCIPLES.map((p) => (
            <article key={p.title} className="surface-card p-7">
              <h3 className="font-display text-xl text-white">{p.title}</h3>
              <p className="mt-3 text-brand-mist/70 leading-relaxed">{p.body}</p>
            </article>
          ))}
        </div>
      </section>

      <Cta />
    </>
  );
}
