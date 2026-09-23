'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { ButtonLink } from '@/components/ui/Button';

const LINKS = [
  { href: '/flavours', label: 'Flavours' },
  { href: '/development', label: "What's Built" },
  { href: '/science', label: 'The Science' },
  { href: '/founder', label: 'Founder' },
  { href: '/investors', label: 'Investors' },
];

export function Wordmark({ className }: { className?: string }) {
  return (
    <span className={cn('font-display text-step-2 font-black tracking-[-0.05em]', className)}>
      FROLIC
    </span>
  );
}

export function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setMenuOpen(false), [pathname]);
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-pill focus:bg-charcoal focus:px-5 focus:py-3 focus:text-cream"
      >
        Skip to content
      </a>

      <header
        className={cn(
          'sticky top-0 z-50 transition-[background-color,box-shadow,backdrop-filter] duration-500',
          scrolled ? 'bg-cream/85 shadow-[0_1px_0_rgba(20,17,15,0.08)] backdrop-blur-xl' : 'bg-transparent',
        )}
      >
        <nav className="shell flex h-[var(--nav-height)] items-center justify-between gap-4" aria-label="Primary">
          <Link href="/" className="shrink-0" aria-label="FROLIC home">
            <Wordmark />
          </Link>

          <ul className="hidden items-center gap-1 lg:flex">
            {LINKS.map((link) => {
              const active = pathname.startsWith(link.href);
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={cn(
                      'relative rounded-pill px-4 py-2 text-step--1 font-semibold transition-colors duration-200',
                      active ? 'text-charcoal' : 'text-charcoal-muted hover:text-charcoal',
                    )}
                  >
                    {link.label}
                    {active && (
                      <motion.span
                        layoutId="nav-pill"
                        className="absolute inset-0 -z-10 rounded-pill bg-charcoal/[0.07]"
                        transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                      />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-2">
            <ButtonLink href="/waitlist" size="sm" variant="primary" className="hidden sm:inline-flex">
              Join the waitlist
            </ButtonLink>
            <button
              onClick={() => setMenuOpen(true)}
              className="grid h-11 w-11 place-items-center rounded-pill border-2 border-charcoal/15 lg:hidden"
              aria-label="Open menu"
              aria-expanded={menuOpen}
            >
              <svg viewBox="0 0 20 20" className="h-4 w-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M3 6h14M3 10h14M3 14h14" />
              </svg>
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-[70] bg-cream lg:hidden"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="shell flex h-[var(--nav-height)] items-center justify-between">
              <Wordmark />
              <button
                onClick={() => setMenuOpen(false)}
                className="grid h-11 w-11 place-items-center rounded-pill border-2 border-charcoal/15"
                aria-label="Close menu"
              >
                <svg viewBox="0 0 20 20" className="h-4 w-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M5 5l10 10M15 5L5 15" />
                </svg>
              </button>
            </div>
            <ul className="shell mt-6 flex flex-col">
              {[
                { href: '/waitlist', label: 'Join the Waitlist' },
                ...LINKS,
                { href: '/distributors', label: 'Distributors' },
                { href: '/careers', label: 'Join Us' },
              ].map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 + i * 0.045, duration: 0.4 }}
                  className="border-b border-charcoal-line/60"
                >
                  <Link href={link.href} className="block py-5 font-display text-step-3 font-black">
                    {link.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
