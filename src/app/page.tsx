import Link from 'next/link';
import Hero from '@/components/Hero';
import ProductGrid from '@/components/ProductGrid';
import Cta from '@/components/Cta';

export default function HomePage() {
  return (
    <>
      <Hero />

      <section className="container-page py-24">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <span className="text-xs uppercase tracking-[0.22em] text-brand-cyan">
              Product Suite
            </span>
            <h2 className="mt-3 font-display text-3xl tracking-tight md:text-5xl">
              Eight products. One platform.
            </h2>
            <p className="mt-4 text-brand-mist/70 leading-relaxed">
              Run any combination — or the whole stack. Each module is
              production-ready, white-labelled, and engineered to work together.
            </p>
          </div>
          <Link
            href="/products"
            className="text-sm text-brand-cyan hover:text-white"
          >
            View all →
          </Link>
        </div>
        <div className="mt-12">
          <ProductGrid />
        </div>
      </section>

      <section className="container-page py-24">
        <div className="grid gap-12 md:grid-cols-2 md:items-center">
          <div>
            <span className="text-xs uppercase tracking-[0.22em] text-brand-gold-light">
              Why GIORAPTOR
            </span>
            <h2 className="mt-3 font-display text-3xl tracking-tight md:text-5xl">
              Built by people who&apos;ve actually run a desk.
            </h2>
            <p className="mt-5 text-brand-mist/70 leading-relaxed">
              Most brokerage software is built for vendors. Ours is built for
              operators. Every workflow, screen, and calculation is shaped by
              the questions a dealer, risk manager, or compliance officer asks
              at 9:31 AM on a Monday — and answered before they have to.
            </p>
            <ul className="mt-8 space-y-4">
              {WHY.map((item) => (
                <li key={item.title} className="flex gap-4">
                  <span className="mt-1 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-brand-cyan/15 text-brand-cyan">
                    ✓
                  </span>
                  <div>
                    <h3 className="text-white font-medium">{item.title}</h3>
                    <p className="mt-1 text-sm text-brand-mist/60 leading-relaxed">
                      {item.body}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="surface-card relative overflow-hidden p-8">
            <div
              className="absolute inset-0 grid-bg opacity-40"
              aria-hidden
            />
            <div className="relative">
              <span className="text-xs uppercase tracking-[0.22em] text-brand-mist/50">
                The stack at a glance
              </span>
              <div className="mt-5 space-y-4">
                {LAYERS.map((l, i) => (
                  <div
                    key={l.title}
                    className="rounded-lg border border-white/5 bg-white/[0.02] p-4"
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium text-white">{l.title}</h3>
                      <span className="text-[10px] uppercase tracking-widest text-brand-mist/40">
                        Layer {i + 1}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-brand-mist/60">{l.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container-page py-24">
        <div className="max-w-2xl">
          <span className="text-xs uppercase tracking-[0.22em] text-brand-cyan">
            How we work
          </span>
          <h2 className="mt-3 font-display text-3xl tracking-tight md:text-5xl">
            From kickoff to live in weeks, not quarters.
          </h2>
        </div>
        <ol className="mt-12 grid gap-5 md:grid-cols-4">
          {PROCESS.map((step, i) => (
            <li key={step.title} className="surface-card p-6">
              <div className="flex items-center gap-3">
                <span className="font-display text-2xl text-brand-cyan">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="hairline flex-1" />
              </div>
              <h3 className="mt-4 font-medium text-white">{step.title}</h3>
              <p className="mt-2 text-sm text-brand-mist/60 leading-relaxed">
                {step.body}
              </p>
            </li>
          ))}
        </ol>
      </section>

      <Cta />
    </>
  );
}

const WHY = [
  {
    title: 'Institutional foundations',
    body: 'Real-time pricing, exposure, and risk engines designed around how desks actually trade — not generic enterprise frameworks.'
  },
  {
    title: 'AI-native, not bolted on',
    body: 'Decision support woven through dealing, CRM, and compliance — auditable, explainable, and always optional.'
  },
  {
    title: 'Modular by design',
    body: 'Pick the modules you need. Replace one provider, all of them, or run alongside what you already have.'
  },
  {
    title: 'White-label ready',
    body: 'Your brand, your domain, your colours — across every screen, email, and statement, on day one.'
  }
];

const LAYERS = [
  {
    title: 'Trading & Markets',
    body: 'Multi-asset terminal, charting, signals, copy & PAMM.'
  },
  {
    title: 'Dealing & Risk',
    body: 'Routing engine, exposure, toxic-flow, hedging, autodealer.'
  },
  {
    title: 'Client Lifecycle',
    body: 'CRM, KYC, onboarding, portals, retention, support.'
  },
  {
    title: 'Distribution',
    body: 'IB programs, affiliate tracking, payouts, marketing site.'
  }
];

const PROCESS = [
  {
    title: 'Discover',
    body: 'We map your license, market, asset coverage, LP relationships, and distribution model.'
  },
  {
    title: 'Configure',
    body: 'Modules are branded, parameterized, and connected to your bridges, payment providers, and data feeds.'
  },
  {
    title: 'Pilot',
    body: 'Internal pilot with your dealing desk and ops team, complete with training and run-books.'
  },
  {
    title: 'Launch & Scale',
    body: 'Go-live with monitoring, on-call coverage, and a roadmap that grows alongside the business.'
  }
];
