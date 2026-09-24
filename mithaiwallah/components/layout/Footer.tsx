import Link from 'next/link';
import { Logo } from '@/components/brand/Logo';
import { Icon } from '@/components/ui/Icon';
import { Ornament } from '@/components/ui/SectionHeading';
import { BRAND, COMPLIANCE, CONTACT, SOCIAL, formatPhone, whatsappLink } from '@/lib/business';
import { FOOTER_NAV } from '@/lib/nav';

export function Footer() {
  const wa = whatsappLink('Hello Mithaiwallah, I would like to know more about your sweets and gift boxes.');
  const year = new Date().getFullYear();
  return (
    <footer className="relative overflow-hidden bg-maroon-900 text-cream/80">
      <div className="jaali-light pointer-events-none absolute inset-0 opacity-60" />
      <div className="container-luxe relative pb-28 pt-20 lg:pb-12">
        <div className="grid gap-14 lg:grid-cols-[1.3fr_2fr]">
          <div>
            <Logo tone="light" />
            <p className="mt-6 max-w-sm font-display text-2xl leading-snug text-cream">
              {BRAND.tagline}
            </p>
            <Ornament light className="mt-6" />
            <ul className="mt-8 space-y-3 text-[0.95rem]">
              <li>
                <a href={wa ?? '/contact#enquire'} className="flex items-center gap-3 hover:text-gold-200">
                  <Icon name="whatsapp" className="h-5 w-5 text-gold-300" />
                  {CONTACT.whatsapp ? `WhatsApp ${formatPhone(CONTACT.whatsapp)}` : 'Message us on WhatsApp'}
                </a>
              </li>
              {CONTACT.phone && (
                <li>
                  <a href={`tel:+${CONTACT.phone}`} className="flex items-center gap-3 hover:text-gold-200">
                    <Icon name="phone" className="h-5 w-5 text-gold-300" />
                    {formatPhone(CONTACT.phone)}
                  </a>
                </li>
              )}
              {CONTACT.email && (
                <li>
                  <a href={`mailto:${CONTACT.email}`} className="flex items-center gap-3 hover:text-gold-200">
                    <Icon name="mail" className="h-5 w-5 text-gold-300" />
                    {CONTACT.email}
                  </a>
                </li>
              )}
              <li className="flex items-start gap-3">
                <Icon name="pin" className="mt-0.5 h-5 w-5 shrink-0 text-gold-300" />
                <span>
                  {CONTACT.streetAddress ? `${CONTACT.streetAddress}, ` : ''}
                  {CONTACT.locality}, {CONTACT.region}
                  {CONTACT.postalCode ? ` ${CONTACT.postalCode}` : ''}, India
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Icon name="clock" className="h-5 w-5 text-gold-300" />
                {CONTACT.hours}
              </li>
            </ul>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-4">
            {FOOTER_NAV.map((col) => (
              <div key={col.title}>
                <h2 className="eyebrow-light">{col.title}</h2>
                <ul className="mt-5 space-y-3 text-[0.92rem]">
                  {col.links.map((l) => (
                    <li key={l.href}>
                      <Link href={l.href} className="transition-colors hover:text-gold-200">
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="rule-gold mt-16 opacity-40" />

        <div className="mt-8 flex flex-col gap-6 text-[0.8rem] text-cream/55 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            {[
              { href: SOCIAL.instagram, icon: 'instagram' as const, label: 'Instagram' },
              { href: SOCIAL.facebook, icon: 'facebook' as const, label: 'Facebook' },
              { href: SOCIAL.youtube, icon: 'youtube' as const, label: 'YouTube' },
            ].map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Mithaiwallah on ${s.label}`}
                className="grid h-10 w-10 place-items-center rounded-full border border-gold-300/25 text-gold-200 transition hover:border-gold-300 hover:bg-gold-300 hover:text-maroon-900"
              >
                <Icon name={s.icon} className="h-[18px] w-[18px]" />
              </a>
            ))}
            <span className="ml-2">@{SOCIAL.instagramHandle}</span>
          </div>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            {COMPLIANCE.fssaiLicence && <span>FSSAI Lic. No. {COMPLIANCE.fssaiLicence}</span>}
            {COMPLIANCE.gstin && <span>GSTIN {COMPLIANCE.gstin}</span>}
            <span>
              © {year} {BRAND.legalName}. Handcrafted in {BRAND.city}.
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
