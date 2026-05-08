import Image from 'next/image';
import Link from 'next/link';

export default function Logo({ size = 36 }: { size?: number }) {
  return (
    <Link href="/" className="flex items-center gap-3" aria-label="GIORAPTOR home">
      <Image
        src="/logo-icon.png"
        alt=""
        width={size}
        height={size}
        priority
        className="h-9 w-auto"
      />
      <span className="font-display text-xl tracking-wide">
        <span className="text-brand-cyan">GIO</span>
        <span className="text-brand-mist/80"> RAPTOR</span>
      </span>
    </Link>
  );
}
