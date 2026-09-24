import { InquiryForm } from '@/components/forms/InquiryForm';
import { Icon } from '@/components/ui/Icon';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { CONTACT, formatPhone, whatsappLink } from '@/lib/business';
import type { LeadType } from '@/lib/leads';

const NEXT = [
  { t: 'We call you', b: 'Within one working day, to understand the occasion and your dates.' },
  { t: 'You taste & choose', b: 'Assortment and box recommendations, with samples on request.' },
  { t: 'You approve a proof', b: 'Branding and packaging signed off before anything is printed.' },
];

export function EnquirySection({
  defaultType = 'corporate',
  lockType = false,
  title = 'Let’s plan something sweet.',
  intro = 'Tell us about your occasion. Corporate gifting, a wedding, a regular wholesale order or a franchise — the right person on our team will get back to you.',
}: {
  defaultType?: LeadType;
  lockType?: boolean;
  title?: string;
  intro?: string;
}) {
  const wa = whatsappLink('Hello Mithaiwallah, I would like to discuss an order.');
  return (
    <section id="enquire" className="relative scroll-mt-24 overflow-hidden py-24 sm:py-32">
      <div className="jaali pointer-events-none absolute inset-0 opacity-40" />
      <div className="container-luxe relative grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
        <div>
          <SectionHeading align="left" eyebrow="Enquire" title={title} intro={intro} />
          <Reveal className="mt-10">
            <ol className="space-y-6">
              {NEXT.map((n, i) => (
                <li key={n.t} className="flex gap-4">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-gold-400/60 font-display text-lg text-gold-700">
                    {i + 1}
                  </span>
                  <div>
                    <p className="font-display text-xl font-semibold text-ink">{n.t}</p>
                    <p className="text-[0.95rem] text-ink-muted">{n.b}</p>
                  </div>
                </li>
              ))}
            </ol>
          </Reveal>
          <Reveal className="mt-10 space-y-3 rounded-3xl bg-maroon p-7 text-cream">
            <p className="eyebrow-light">Prefer to talk now?</p>
            {wa && (
              <a href={wa} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-lg font-semibold hover:text-gold-200">
                <Icon name="whatsapp" className="h-6 w-6 text-gold-300" /> WhatsApp {formatPhone(CONTACT.whatsapp!)}
              </a>
            )}
            {CONTACT.phone && (
              <a href={`tel:+${CONTACT.phone}`} className="flex items-center gap-3 text-lg font-semibold hover:text-gold-200">
                <Icon name="phone" className="h-6 w-6 text-gold-300" /> {formatPhone(CONTACT.phone)}
              </a>
            )}
            {CONTACT.salesEmail && (
              <a href={`mailto:${CONTACT.salesEmail}`} className="flex items-center gap-3 text-lg font-semibold hover:text-gold-200">
                <Icon name="mail" className="h-6 w-6 text-gold-300" /> {CONTACT.salesEmail}
              </a>
            )}
            <p className="pt-1 text-sm text-cream/65">{CONTACT.hours}</p>
          </Reveal>
        </div>
        <Reveal>
          <InquiryForm defaultType={defaultType} lockType={lockType} />
        </Reveal>
      </div>
    </section>
  );
}
