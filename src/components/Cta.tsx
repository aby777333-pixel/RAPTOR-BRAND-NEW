import Link from 'next/link';

export default function Cta() {
  return (
    <section className="container-page py-14 md:py-20">
      <div className="surface-card relative overflow-hidden p-9 md:p-12">
        <div
          className="absolute -top-32 -right-32 h-72 w-72 rounded-full bg-brand-cyan/15 blur-3xl"
          aria-hidden
        />
        <div
          className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-brand-gold/10 blur-3xl"
          aria-hidden
        />
        <div className="relative max-w-2xl">
          <h2 className="font-display text-3xl tracking-tight md:text-4xl">
            Ready to launch — or modernize — your brokerage?
          </h2>
          <p className="mt-4 text-brand-mist/70 leading-relaxed">
            We work with founders, prop firms, and established brokers. Tell us
            where you are, and we&apos;ll show you what GIORAPTOR can ship for
            your desk.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-md bg-brand-cyan px-5 py-3 text-sm font-medium text-brand-ink transition-all hover:bg-brand-cyan/90 hover:shadow-glow-cyan"
            >
              Talk to us
              <span aria-hidden>→</span>
            </Link>
            <Link
              href="/products"
              className="inline-flex items-center rounded-md border border-white/10 px-5 py-3 text-sm font-medium text-brand-mist hover:border-white/20"
            >
              See all products
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
