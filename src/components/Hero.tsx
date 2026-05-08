import Link from 'next/link';

export default function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-white/5">
      <div className="absolute inset-0 grid-bg opacity-60" aria-hidden />
      <div
        className="absolute inset-0 bg-gradient-to-b from-transparent via-brand-ink/40 to-brand-ink"
        aria-hidden
      />
      <div className="container-page relative pt-24 pb-28 md:pt-32 md:pb-36">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs uppercase tracking-[0.2em] text-brand-mist/70">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-cyan shadow-glow-cyan" />
            Forex Broker Technology Provider
          </div>
          <h1 className="mt-6 font-display text-4xl leading-[1.05] tracking-tight md:text-6xl lg:text-7xl">
            Complete brokerage{' '}
            <span className="text-gradient-brand">infrastructure</span>
            <br className="hidden md:inline" /> built for serious operators.
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-relaxed text-brand-mist/75 md:text-xl">
            GIORAPTOR delivers the entire brokerage stack — multi-asset trading
            platforms, dealing operations, CRM, client portals, IB programs,
            PAMM, copy trading, and turnkey websites. Launch faster. Operate
            cleaner. Scale on infrastructure that was engineered for the desk.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-md bg-brand-cyan px-5 py-3 text-sm font-medium text-brand-ink transition-all hover:bg-brand-cyan/90 hover:shadow-glow-cyan"
            >
              Request a Demo
              <span aria-hidden>→</span>
            </Link>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 rounded-md border border-white/10 bg-white/[0.03] px-5 py-3 text-sm font-medium text-brand-mist transition-all hover:border-white/20 hover:bg-white/[0.06]"
            >
              Explore Products
            </Link>
          </div>
        </div>

        <dl className="mt-20 grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-4">
          {[
            { kpi: '8', label: 'Modular Products' },
            { kpi: 'Multi', label: 'Asset Class Coverage' },
            { kpi: 'White', label: 'Label Ready' },
            { kpi: '24/7', label: 'Operational Support' }
          ].map((s) => (
            <div key={s.label}>
              <dt className="font-display text-3xl text-white md:text-4xl">
                {s.kpi}
              </dt>
              <dd className="mt-1 text-xs uppercase tracking-[0.18em] text-brand-mist/55">
                {s.label}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
