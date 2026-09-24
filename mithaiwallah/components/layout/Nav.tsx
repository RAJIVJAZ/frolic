'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Logo } from '@/components/brand/Logo';
import { Icon } from '@/components/ui/Icon';
import { NAV } from '@/lib/nav';
import { cn } from '@/lib/utils';

/**
 * Transparent over the hero, cream glass once scrolled. Pages with a dark
 * hero set `overDark` so the logo and links start out light.
 */
export function Nav({
  overDark = false,
  whatsappHref,
  banner,
}: {
  overDark?: boolean;
  whatsappHref: string;
  banner?: React.ReactNode;
}) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const light = overDark && !scrolled && !open;

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-luxe',
        scrolled && !open ? 'bg-cream/85 shadow-[0_1px_0_rgba(184,137,59,0.25)] backdrop-blur-xl' : 'bg-transparent',
      )}
    >
      {banner && (
        <div
          className={cn(
            'overflow-hidden transition-[max-height] duration-500 ease-luxe',
            scrolled || open ? 'max-h-0' : 'max-h-20',
          )}
        >
          {banner}
        </div>
      )}
      <div className="container-luxe flex h-[76px] items-center justify-between gap-6">
        <Link href="/" aria-label="Mithaiwallah — home" className="relative z-[60]">
          <Logo tone={light || open ? 'light' : 'dark'} />
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-8 lg:flex">
          {NAV.map((item) => {
            const active = pathname === item.href || pathname.startsWith(item.href + '/');
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'relative text-[0.84rem] font-semibold tracking-[0.06em] transition-colors',
                  light ? 'text-cream/85 hover:text-cream' : 'text-ink-soft hover:text-maroon',
                  active && (light ? 'text-cream' : 'text-maroon'),
                )}
              >
                {item.label}
                <span
                  className={cn(
                    'absolute -bottom-1.5 left-0 h-px bg-gold-500 transition-all duration-500 ease-luxe',
                    active ? 'w-full' : 'w-0',
                  )}
                />
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/contact#enquire"
            className={cn(
              'hidden rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-500 ease-luxe sm:inline-flex',
              light ? 'bg-cream text-maroon hover:bg-gold-100' : 'bg-maroon text-cream hover:bg-maroon-700',
            )}
          >
            Request a Gift Box
          </Link>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            className={cn(
              'relative z-[60] grid h-11 w-11 place-items-center rounded-full border transition-colors lg:hidden',
              light || open ? 'border-cream/30 text-cream' : 'border-maroon/20 text-maroon',
            )}
          >
            <Icon name={open ? 'close' : 'menu'} className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        className={cn(
          'fixed inset-0 z-50 flex flex-col bg-maroon-velvet px-6 pb-10 pt-28 transition-all duration-500 ease-luxe lg:hidden',
          open ? 'visible opacity-100' : 'invisible opacity-0',
        )}
      >
        <div className="jaali-light pointer-events-none absolute inset-0" />
        <nav aria-label="Mobile" className="relative flex flex-col">
          {NAV.map((item, i) => (
            <Link
              key={item.href}
              href={item.href}
              className="border-b border-gold-300/15 py-4 font-display text-[2rem] font-medium text-cream"
              style={{ transitionDelay: open ? `${80 + i * 40}ms` : '0ms' }}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="relative mt-auto grid gap-3">
          <Link href="/contact#enquire" className="rounded-full bg-gold-foil py-4 text-center font-semibold text-maroon-900">
            Request a Custom Gift Box
          </Link>
          <a
            href={whatsappHref}
            className="flex items-center justify-center gap-2 rounded-full border border-cream/30 py-4 font-semibold text-cream"
          >
            <Icon name="whatsapp" /> Chat on WhatsApp
          </a>
        </div>
      </div>
    </header>
  );
}
