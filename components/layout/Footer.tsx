import Link from 'next/link';
import { Wordmark } from './Nav';
import { products } from '@/lib/products';

const COLUMNS = [
  {
    title: 'Shop',
    links: [
      { href: '/shop', label: 'All flavours' },
      { href: '/bundle', label: 'Build a bundle' },
      { href: '/subscribe', label: 'Subscribe & save' },
      { href: '/quiz', label: 'Flavour quiz' },
      { href: '/rewards', label: 'Rewards' },
    ],
  },
  {
    title: 'Learn',
    links: [
      { href: '/science', label: 'The science' },
      { href: '/ingredients', label: 'Ingredients' },
      { href: '/story', label: 'Our story' },
      { href: '/journal', label: 'Journal' },
      { href: '/faq', label: 'FAQ' },
    ],
  },
  {
    title: 'Support',
    links: [
      { href: '/contact', label: 'Contact' },
      { href: '/shipping', label: 'Shipping & returns' },
      { href: '/stockists', label: 'Find a stockist' },
      { href: '/wholesale', label: 'Wholesale' },
      { href: '/careers', label: 'Careers' },
    ],
  },
];

export function Footer() {
  return (
    <footer className="relative mt-section overflow-hidden bg-charcoal text-cream">
      <div className="shell py-section">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_2fr]">
          <div className="space-y-6">
            <Wordmark className="text-step-4" />
            <p className="max-w-[34ch] text-step-1 text-cream/65">
              Feel Good. Sip Different. Seven grams of prebiotic fibre, a quarter of the sugar, and
              flavours we actually grew up drinking.
            </p>

            <form className="max-w-sm space-y-2">
              <label htmlFor="footer-email" className="eyebrow block text-cream/50">
                Get first access to new flavours
              </label>
              <div className="flex gap-2">
                <input
                  id="footer-email"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="you@email.com"
                  className="min-h-[3rem] w-full rounded-pill border-2 border-cream/20 bg-transparent px-5 text-step-0 text-cream placeholder:text-cream/35 focus:border-lime focus:outline-none"
                />
                <button
                  type="submit"
                  className="min-h-[3rem] shrink-0 rounded-pill bg-lime px-6 font-semibold text-charcoal transition hover:bg-lime-300"
                >
                  Join
                </button>
              </div>
              <p className="text-[0.7rem] text-cream/40">
                No spam. Unsubscribe whenever. See our privacy policy.
              </p>
            </form>
          </div>

          <div className="grid gap-10 sm:grid-cols-3">
            {COLUMNS.map((col) => (
              <nav key={col.title} aria-label={col.title}>
                <h3 className="eyebrow text-cream/45">{col.title}</h3>
                <ul className="mt-4 space-y-2.5">
                  {col.links.map((l) => (
                    <li key={l.href}>
                      <Link
                        href={l.href}
                        className="text-cream/75 transition-colors hover:text-lime"
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        <div className="mt-14 border-t border-cream/12 pt-8">
          <h3 className="eyebrow text-cream/45">Every flavour</h3>
          <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
            {products.map((p) => (
              <li key={p.handle}>
                <Link
                  href={`/products/${p.handle}`}
                  className="text-step--1 text-cream/60 transition-colors hover:text-lime"
                >
                  {p.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-cream/12 pt-8 text-[0.75rem] text-cream/45 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Frolic Beverages Pvt. Ltd. Made in India.</p>
          <ul className="flex flex-wrap gap-5">
            <li><Link href="/privacy" className="hover:text-cream">Privacy</Link></li>
            <li><Link href="/terms" className="hover:text-cream">Terms</Link></li>
            <li><Link href="/accessibility" className="hover:text-cream">Accessibility</Link></li>
          </ul>
        </div>

        <p className="mt-8 max-w-[70ch] text-[0.7rem] leading-relaxed text-cream/30">
          FROLIC is a food product, not a medicine. It is not intended to diagnose, treat, cure or
          prevent any disease. Nutritional values are per 250 ml serving and may vary marginally by
          batch. If you are pregnant, nursing, or managing a medical condition, talk to a qualified
          healthcare professional before making changes to your diet.
        </p>
      </div>

      {/* Oversized wordmark, cropped by the viewport edge. */}
      <div aria-hidden className="pointer-events-none select-none overflow-hidden">
        <p className="-mb-[0.22em] translate-y-[0.1em] text-center font-display text-[22vw] font-black leading-none tracking-[-0.06em] text-cream/[0.055]">
          FROLIC
        </p>
      </div>
    </footer>
  );
}
