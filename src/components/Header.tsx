import Link from 'next/link';
import Logo from './Logo';

const NAV_LINKS = [
  { href: '/products', label: 'Products' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' }
];

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/5 bg-brand-ink/70 backdrop-blur-xl">
      <div className="container-page flex h-20 items-center justify-between">
        <Logo />
        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-brand-mist/70 transition-colors hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <Link
            href="/contact"
            className="hidden rounded-md border border-brand-cyan/40 bg-brand-cyan/10 px-4 py-2 text-sm font-medium text-brand-cyan transition-all hover:border-brand-cyan hover:bg-brand-cyan/20 sm:inline-flex"
          >
            Request Demo
          </Link>
        </div>
      </div>
    </header>
  );
}
