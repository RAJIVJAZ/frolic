import Link from 'next/link';
import { Wordmark } from './Nav';
import { products } from '@/lib/products';

const COLUMNS = [
  {
    title: 'The Brand',
    links: [
      { href: '/flavours', label: 'Flavours' },
      { href: '/story', label: 'Our story' },
      { href: '/founder', label: 'The founder' },
      { href: '/science', label: 'The science' },
      { href: '/ingredients', label: 'Ingredients' },
    ],
  },
  {
    title: 'Progress',
    links: [
      { href: '/development', label: "What's built" },
      { href: '/quiz', label: 'Find your flavour' },
      { href: '/journal', label: 'Journal' },
      { href: '/faq', label: 'FAQ' },
    ],
  },
  {
    title: 'Work With Us',
    links: [
      { href: '/waitlist', label: 'Join the waitlist' },
      { href: '/distributors', label: 'Distributors & retail' },
      { href: '/investors', label: 'Investors' },
      { href: '/careers', label: 'Join the team' },
      { href: '/contact', label: 'Contact' },
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
              Feel Good. Sip Different. A premium prebiotic soda being built in India, on the
              flavours we actually grew up drinking. In development — not yet available.
            </p>

            <form className="max-w-sm space-y-2">
              <label htmlFor="footer-email" className="eyebrow block text-cream/50">
                Be first to taste it
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
          <h3 className="eyebrow text-cream/45">The range in development</h3>
          <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
            {products.map((p) => (
              <li key={p.handle}>
                <Link
                  href={`/flavours/${p.handle}`}
                  className="text-step--1 text-cream/60 transition-colors hover:text-lime"
                >
                  {p.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-cream/12 pt-8 text-[0.75rem] text-cream/45 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} FROLIC · Frolic Beverages (proposed). Pune, India.</p>
          <ul className="flex flex-wrap gap-5">
            <li><Link href="/privacy" className="hover:text-cream">Privacy</Link></li>
            <li><Link href="/terms" className="hover:text-cream">Terms</Link></li>
            <li><Link href="/accessibility" className="hover:text-cream">Accessibility</Link></li>
          </ul>
        </div>

        <p className="mt-8 max-w-[70ch] text-[0.7rem] leading-relaxed text-cream/30">
          FROLIC is in pre-launch development and is not yet available for sale. Product images are
          design concepts; formulations, nutritional values and packaging are not final. FROLIC is
          intended as a food product, not a medicine, and nothing here is a claim to diagnose,
          treat, cure or prevent any disease.
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
