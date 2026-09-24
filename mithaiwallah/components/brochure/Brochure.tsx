import Link from 'next/link';
import { GiftBoxArt } from '@/components/art/GiftBoxArt';
import { SweetArt } from '@/components/art/SweetArt';
import { Logo } from '@/components/brand/Logo';
import { Icon } from '@/components/ui/Icon';
import { Ornament } from '@/components/ui/SectionHeading';
import { BRAND, CONTACT, SITE_URL, SOCIAL, TERMS, formatPhone } from '@/lib/business';
import { PRODUCTS } from '@/lib/products';
import { cn } from '@/lib/utils';

/**
 * Building blocks for the printable catalogues. Each <Page> is exactly one A4
 * sheet; `npm run brochures` prints them to /public/brochures/*.pdf with
 * Chromium, so the PDF and the web page can never drift apart.
 */

export function BrochureShell({ children, pdf, title }: { children: React.ReactNode; pdf: string; title: string }) {
  return (
    <main className="brochure-stack flex flex-col items-center gap-10 bg-[#E9E1D2] px-4 pb-20 pt-6">
      <div className="no-print sticky top-4 z-10 flex w-full max-w-[210mm] items-center justify-between rounded-full bg-maroon px-5 py-3 text-sm text-cream shadow-luxe">
        <Link href="/" className="font-semibold">
          ← {BRAND.name}
        </Link>
        <span className="hidden sm:inline">{title}</span>
        <a href={pdf} download className="inline-flex items-center gap-2 rounded-full bg-gold-foil px-4 py-1.5 font-semibold text-maroon-900">
          <Icon name="download" className="h-4 w-4" /> PDF
        </a>
      </div>
      {children}
    </main>
  );
}

export function Page({ children, dark, className }: { children: React.ReactNode; dark?: boolean; className?: string }) {
  return (
    <section
      className={cn(
        'a4 flex flex-col shadow-luxe',
        dark ? 'bg-maroon-velvet text-cream' : 'bg-cream text-ink',
        className,
      )}
    >
      {dark && <div className="jaali-light pointer-events-none absolute inset-0" />}
      <div className="pointer-events-none absolute inset-[7mm] rounded-[4mm] border border-gold-400/50" />
      <div className="relative flex flex-1 flex-col px-[16mm] py-[16mm]">{children}</div>
    </section>
  );
}

export function PageHeader({ eyebrow, title, light }: { eyebrow: string; title: string; light?: boolean }) {
  return (
    <header>
      <p className={light ? 'eyebrow-light' : 'eyebrow'}>{eyebrow}</p>
      <Ornament light={light} className="-ml-1 mt-2" />
      <h2 className={cn('mt-3 font-display text-[34pt] font-semibold leading-[1.02]', light ? 'text-cream' : 'text-maroon')}>{title}</h2>
    </header>
  );
}

export function Footer({ n, light }: { n: number; light?: boolean }) {
  return (
    <footer className={cn('mt-auto flex items-center justify-between pt-6 text-[8pt] uppercase tracking-[0.2em]', light ? 'text-gold-300/80' : 'text-ink-muted')}>
      <span>{BRAND.name} · {SITE_URL.replace(/^https?:\/\//, '')}</span>
      <span>{String(n).padStart(2, '0')}</span>
    </footer>
  );
}

export function Cover({ kicker, title, subtitle, art }: { kicker: string; title: React.ReactNode; subtitle: string; art: React.ReactNode }) {
  return (
    <Page dark>
      <Logo tone="light" />
      <div className="mt-[22mm]">
        <p className="eyebrow-light">{kicker}</p>
        <h1 className="mt-4 font-display text-[50pt] font-semibold leading-[0.98]">{title}</h1>
        <p className="mt-5 max-w-[130mm] text-[12pt] leading-relaxed text-cream/75">{subtitle}</p>
      </div>
      <div className="mt-auto -mx-[6mm]">{art}</div>
      <p className="mt-4 text-center font-display text-[14pt] italic text-gold-200">{BRAND.tagline}</p>
    </Page>
  );
}

export function SweetsPage({ n }: { n: number }) {
  return (
    <Page>
      <PageHeader eyebrow="The Signature Collection" title="Six sweets, made the long way." />
      <div className="mt-8 grid grid-cols-2 gap-x-8 gap-y-5">
        {PRODUCTS.map((p) => (
          <div key={p.slug} className="flex items-center gap-4">
            <div className="h-[30mm] w-[38mm] shrink-0 overflow-hidden rounded-[3mm]" style={{ background: p.tone }}>
              <SweetArt variant={p.art} className="h-full w-full scale-125" />
            </div>
            <div>
              <h3 className="font-display text-[17pt] font-semibold leading-tight text-maroon">{p.name}</h3>
              <p className="mt-1 text-[8.5pt] leading-snug text-ink-muted">{p.summary}</p>
            </div>
          </div>
        ))}
      </div>
      <p className="mt-8 rounded-[3mm] bg-cream-200 p-4 text-[9pt] leading-relaxed text-ink-soft">
        Every sweet is made fresh for your order with full-cream milk, pure desi ghee and premium dry fruits. Kalakand and malai barfi are fresh sweets best enjoyed within days; milk cake, peda, kunda and Bikaneri cake travel well for pan-India delivery.
      </p>
      <Footer n={n} />
    </Page>
  );
}

export function ContactPage({ n, cta }: { n: number; cta: string }) {
  return (
    <Page dark>
      <PageHeader light eyebrow="How to Order" title={cta} />
      <ol className="mt-8 space-y-4 text-[11pt]">
        {[
          'Share your occasion, quantity, budget per box and delivery dates.',
          'Receive recommendations, samples on request and a written quote.',
          'Approve your branded proof. We craft your order fresh.',
          'We deliver to one address or many, anywhere in India.',
        ].map((s, i) => (
          <li key={s} className="flex gap-4">
            <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-gold-300/60 font-display text-gold-200">{i + 1}</span>
            <span className="pt-1 text-cream/85">{s}</span>
          </li>
        ))}
      </ol>
      <div className="mt-8 grid grid-cols-2 gap-4 text-[9.5pt] text-cream/75">
        <p>
          <span className="block text-[8pt] uppercase tracking-[0.2em] text-gold-300">Minimums</span>
          Corporate from {TERMS.corporateMinimumBoxes} boxes · Weddings from {TERMS.weddingMinimumBoxes} boxes
        </p>
        <p>
          <span className="block text-[8pt] uppercase tracking-[0.2em] text-gold-300">Lead time</span>
          {TERMS.standardLeadTime}; {TERMS.brandedLeadTime}
        </p>
      </div>
      <div className="mt-auto rounded-[4mm] border border-gold-300/40 bg-maroon-900/40 p-7">
        <p className="eyebrow-light">Talk to us</p>
        <div className="mt-4 grid grid-cols-2 gap-3 text-[11pt]">
          {CONTACT.whatsapp && <p className="flex items-center gap-2"><Icon name="whatsapp" className="h-5 w-5 text-gold-300" /> {formatPhone(CONTACT.whatsapp)}</p>}
          {CONTACT.phone && <p className="flex items-center gap-2"><Icon name="phone" className="h-5 w-5 text-gold-300" /> {formatPhone(CONTACT.phone)}</p>}
          {CONTACT.salesEmail && <p className="flex items-center gap-2"><Icon name="mail" className="h-5 w-5 text-gold-300" /> {CONTACT.salesEmail}</p>}
          <p className="flex items-center gap-2"><Icon name="instagram" className="h-5 w-5 text-gold-300" /> @{SOCIAL.instagramHandle}</p>
          <p className="flex items-center gap-2"><Icon name="globe" className="h-5 w-5 text-gold-300" /> {SITE_URL.replace(/^https?:\/\//, '')}</p>
          <p className="flex items-center gap-2"><Icon name="pin" className="h-5 w-5 text-gold-300" /> {CONTACT.locality}, {CONTACT.region}</p>
        </div>
      </div>
      <p className="mt-5 text-[8pt] text-cream/50">Prices are quoted per order based on volume, customisation and delivery. Contents may vary with seasonal availability.</p>
      <Footer n={n} light />
    </Page>
  );
}

export { GiftBoxArt };
