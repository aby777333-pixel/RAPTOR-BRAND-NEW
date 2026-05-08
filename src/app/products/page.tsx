import type { Metadata } from 'next';
import Cta from '@/components/Cta';
import { PRODUCTS } from '@/lib/products';

export const metadata: Metadata = {
  title: 'Products',
  description:
    'Trading platforms, dealer systems, CRM, client portals, IB and affiliate portals, PAMM, copy trading, and brokerage websites — all from GIORAPTOR.'
};

export default function ProductsPage() {
  return (
    <>
      <section className="border-b border-white/5">
        <div className="container-page py-14 md:py-20">
          <span className="text-xs uppercase tracking-[0.22em] text-brand-cyan">
            Products
          </span>
          <h1 className="mt-3 font-display text-4xl tracking-tight md:text-6xl">
            The full <span className="text-gradient-brand">brokerage stack</span>
          </h1>
          <p className="mt-5 max-w-2xl text-brand-mist/75 leading-relaxed text-lg">
            Eight production-ready modules. Run them as a complete platform or
            mix into an existing setup. Every module is white-label, multi-asset,
            and built around how real desks operate.
          </p>
        </div>
      </section>

      <section className="container-page py-14 md:py-16">
        <div className="space-y-14">
          {PRODUCTS.map((p, idx) => (
            <article
              key={p.slug}
              id={p.slug}
              className="grid scroll-mt-24 gap-8 md:grid-cols-12 md:items-start"
            >
              <div className="md:col-span-5">
                <span
                  className={`text-[10px] uppercase tracking-[0.22em] ${
                    p.highlight === 'cyan'
                      ? 'text-brand-cyan'
                      : 'text-brand-gold-light'
                  }`}
                >
                  {String(idx + 1).padStart(2, '0')} · {p.tagline}
                </span>
                <h2 className="mt-3 font-display text-3xl tracking-tight md:text-4xl">
                  {p.title}
                </h2>
                <p className="mt-4 text-brand-mist/70 leading-relaxed">
                  {p.summary}
                </p>
              </div>
              <div className="md:col-span-7">
                <div className="surface-card p-6 md:p-8">
                  <h3 className="text-xs uppercase tracking-[0.22em] text-brand-mist/50">
                    What you get
                  </h3>
                  <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                    {p.features.map((f) => (
                      <li
                        key={f}
                        className="flex items-start gap-3 rounded-lg border border-white/5 bg-white/[0.02] p-3 text-sm text-brand-mist/85"
                      >
                        <span
                          className={`mt-1 inline-block h-1.5 w-1.5 rounded-full ${
                            p.highlight === 'cyan'
                              ? 'bg-brand-cyan'
                              : 'bg-brand-gold-light'
                          }`}
                          aria-hidden
                        />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <Cta />
    </>
  );
}
