import { PageShell } from '@/components/layout/PageShell';
import { JsonLd } from '@/components/seo/JsonLd';
import { EnquirySection } from '@/components/sections/EnquirySection';
import { PageHero } from '@/components/sections/PageHero';
import { Icon } from '@/components/ui/Icon';
import { Reveal } from '@/components/ui/Reveal';
import { CONTACT, SOCIAL, formatPhone, whatsappLink } from '@/lib/business';
import { breadcrumbSchema, localBusinessSchema, pageMeta } from '@/lib/seo';

const PATH = '/contact';

export const metadata = pageMeta({
  title: 'Contact & Enquiries — Corporate, Wedding, Wholesale',
  description:
    'Contact Mithaiwallah, Prayagraj, for corporate gifting, wedding hampers, bulk and wholesale orders, franchise and distribution. WhatsApp, phone and email.',
  path: PATH,
});

export default function ContactPage() {
  const wa = whatsappLink('Hello Mithaiwallah, I would like to discuss an order.');
  const cards = [
    wa && { icon: 'whatsapp' as const, title: 'WhatsApp', line: formatPhone(CONTACT.whatsapp!), href: wa },
    CONTACT.phone && { icon: 'phone' as const, title: 'Call', line: formatPhone(CONTACT.phone), href: `tel:+${CONTACT.phone}` },
    CONTACT.salesEmail && { icon: 'mail' as const, title: 'Gifting & trade', line: CONTACT.salesEmail, href: `mailto:${CONTACT.salesEmail}` },
    CONTACT.email && { icon: 'mail' as const, title: 'General', line: CONTACT.email, href: `mailto:${CONTACT.email}` },
    { icon: 'instagram' as const, title: 'Instagram', line: `@${SOCIAL.instagramHandle}`, href: SOCIAL.instagram },
    {
      icon: 'pin' as const,
      title: 'Visit',
      line: `${CONTACT.streetAddress ? CONTACT.streetAddress + ', ' : ''}${CONTACT.locality}, ${CONTACT.region}`,
      href: CONTACT.mapsUrl ?? undefined,
    },
  ].filter(Boolean) as { icon: 'whatsapp' | 'phone' | 'mail' | 'instagram' | 'pin'; title: string; line: string; href?: string }[];

  return (
    <PageShell>
      <JsonLd data={[breadcrumbSchema([{ name: 'Contact', path: PATH }]), localBusinessSchema()]} />
      <PageHero
        eyebrow="Contact"
        title="Let’s talk sweets."
        intro={`Corporate gifting, a wedding, a wholesale account or a franchise conversation — reach us however suits you. ${CONTACT.hours}.`}
        crumbs={[{ name: 'Contact', path: PATH }]}
      />
      <section className="-mt-10 pb-4">
        <div className="container-luxe grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((c, i) => {
            const inner = (
              <>
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-maroon text-gold-200">
                  <Icon name={c.icon} />
                </span>
                <span>
                  <span className="block text-xs font-bold uppercase tracking-[0.16em] text-gold-700">{c.title}</span>
                  <span className="mt-1 block font-semibold text-ink">{c.line}</span>
                </span>
              </>
            );
            return (
              <Reveal key={c.title + i} delay={i * 0.05}>
                {c.href ? (
                  <a href={c.href} target={c.href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer" className="flex items-center gap-4 rounded-3xl border border-gold-300/60 bg-cream-50 p-6 shadow-card transition hover:-translate-y-0.5">
                    {inner}
                  </a>
                ) : (
                  <div className="flex items-center gap-4 rounded-3xl border border-gold-300/60 bg-cream-50 p-6 shadow-card">{inner}</div>
                )}
              </Reveal>
            );
          })}
        </div>
      </section>
      <EnquirySection />
    </PageShell>
  );
}
