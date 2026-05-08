import Link from 'next/link';
import { PRODUCTS } from '@/lib/products';

export default function ProductGrid({ compact = false }: { compact?: boolean }) {
  return (
    <div
      className={
        compact
          ? 'grid gap-4 md:grid-cols-2 lg:grid-cols-4'
          : 'grid gap-5 md:grid-cols-2 lg:grid-cols-3'
      }
    >
      {PRODUCTS.map((p) => (
        <Link
          key={p.slug}
          href={`/products#${p.slug}`}
          className="surface-card surface-card-hover group flex flex-col p-6"
        >
          <div className="flex items-start justify-between">
            <span
              className={`text-[10px] uppercase tracking-[0.22em] ${
                p.highlight === 'cyan'
                  ? 'text-brand-cyan'
                  : 'text-brand-gold-light'
              }`}
            >
              {p.highlight === 'cyan' ? 'Trading' : 'Operations'}
            </span>
            <span
              className="text-xs text-brand-mist/40 transition-transform group-hover:translate-x-1 group-hover:text-brand-cyan"
              aria-hidden
            >
              →
            </span>
          </div>
          <h3 className="mt-3 font-display text-lg text-white">{p.title}</h3>
          {!compact && (
            <p className="mt-2 text-sm text-brand-mist/60 leading-relaxed">
              {p.tagline}
            </p>
          )}
        </Link>
      ))}
    </div>
  );
}
