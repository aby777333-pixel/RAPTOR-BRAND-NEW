import Image from 'next/image';
import Link from 'next/link';

export default function Logo() {
  return (
    <Link href="/" className="flex items-center" aria-label="GIORAPTOR home">
      <Image
        src="/logo.png"
        alt="GIORAPTOR"
        width={2752}
        height={624}
        priority
        className="h-9 w-auto md:h-10"
      />
    </Link>
  );
}
