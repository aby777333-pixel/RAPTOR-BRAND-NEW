import Link from 'next/link';
import Logo from './Logo';

const PRODUCTS = [
  { href: '/products#trading-platforms', label: 'Trading Platforms' },
  { href: '/products#dealer-systems', label: 'Dealer Systems' },
  { href: '/products#crm', label: 'CRM Solutions' },
  { href: '/products#client-portals', label: 'Client Portals' },
  { href: '/products#ib-portals', label: 'IB & Affiliate Portals' },
  { href: '/products#pamm', label: 'PAMM Systems' },
  { href: '/products#copy-trading', label: 'Copy Trading' },
  { href: '/products#websites', label: 'Brokerage Websites' }
];

const COMPANY = [
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' }
];

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-white/5 bg-brand-ink-soft">
      <div className="container-page py-10 md:py-12">
        <div className="grid gap-8 md:grid-cols-4">
          <div className="md:col-span-2">
            <Logo />
            <p className="mt-5 max-w-md text-sm text-brand-mist/60 leading-relaxed">
              GIORAPTOR builds the institutional-grade infrastructure that powers
              modern brokers. Trading platforms, dealing operations, CRM, and the
              full client lifecycle — engineered to launch and scale.
            </p>
            <div className="mt-6 flex items-center gap-2">
              <span className="rounded-full border border-brand-cyan/20 bg-brand-cyan/10 px-3 py-1 text-xs text-brand-cyan">
                B2B
              </span>
              <span className="rounded-full border border-brand-gold/20 bg-brand-gold/10 px-3 py-1 text-xs text-brand-gold-light">
                White-Label
              </span>
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-brand-mist/70">
                Multi-Asset
              </span>
            </div>
          </div>
          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] text-brand-mist/50">
              Products
            </h4>
            <ul className="mt-4 space-y-2.5">
              {PRODUCTS.map((p) => (
                <li key={p.href}>
                  <Link
                    href={p.href}
                    className="text-sm text-brand-mist/70 transition-colors hover:text-white"
                  >
                    {p.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] text-brand-mist/50">
              Company
            </h4>
            <ul className="mt-4 space-y-2.5">
              {COMPANY.map((p) => (
                <li key={p.href}>
                  <Link
                    href={p.href}
                    className="text-sm text-brand-mist/70 transition-colors hover:text-white"
                  >
                    {p.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-10 flex flex-col items-start justify-between gap-3 border-t border-white/5 pt-5 md:flex-row md:items-center">
          <p className="text-xs text-brand-mist/50">
            © {new Date().getFullYear()} GIORAPTOR. All rights reserved.
          </p>
          <p className="text-xs text-brand-mist/40">
            Forex Broker Technology Provider · Multi-Asset Infrastructure
          </p>
        </div>
      </div>
    </footer>
  );
}
