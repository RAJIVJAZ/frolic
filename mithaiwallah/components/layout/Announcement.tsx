import Link from 'next/link';
import { ANNOUNCEMENT } from '@/lib/business';

export function Announcement() {
  if (!ANNOUNCEMENT) return null;
  return (
    <div className="relative z-[51] bg-maroon-900 text-center text-[0.78rem] tracking-[0.04em] text-gold-200">
      <Link href={ANNOUNCEMENT.href} className="container-luxe block py-2.5 hover:text-cream">
        <span className="mr-2 text-gold-400">✦</span>
        {ANNOUNCEMENT.text}
        <span className="ml-2 underline decoration-gold-500 underline-offset-4">{ANNOUNCEMENT.cta}</span>
      </Link>
    </div>
  );
}
