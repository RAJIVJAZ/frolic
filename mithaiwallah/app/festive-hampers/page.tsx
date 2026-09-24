import { GiftBoxArt } from '@/components/art/GiftBoxArt';
import { PageShell } from '@/components/layout/PageShell';
import { JsonLd } from '@/components/seo/JsonLd';
import { EnquirySection } from '@/components/sections/EnquirySection';
import { GiftCollections } from '@/components/sections/Gifting';
import { PageHero } from '@/components/sections/PageHero';
import { Button } from '@/components/ui/Button';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { breadcrumbSchema, pageMeta, serviceSchema } from '@/lib/seo';

const PATH = '/festive-hampers';

export const metadata = pageMeta({
  title: 'Festive Gift Hampers — Diwali, Rakhi & Holi Mithai Boxes',
  description:
    'Festive gift hampers and luxury mithai boxes for Diwali, Raksha Bandhan, Holi, Bhai Dooj and New Year. Handcrafted sweets, premium dry fruits and custom branding for families and companies.',
  path: PATH,
});

/**
 * Festival dates for the current season. Update each year — Hindu festival
 * dates move with the lunar calendar. 2026 dates checked against published
 * panchang calendars; confirm locally before campaigns go out.
 */
const SEASON = [
  { name: 'Navratri & Dussehra', date: '11–20 October 2026', note: 'Sattvik-friendly boxes, office pujas' },
  { name: 'Karva Chauth', date: '29 October 2026', note: 'Sargi and gifting boxes' },
  { name: 'Dhanteras & Diwali', date: '6–8 November 2026', note: 'Our biggest season — book early' },
  { name: 'Bhai Dooj', date: '10–11 November 2026', note: 'Sibling gift boxes' },
  { name: 'Christmas & New Year', date: '25 Dec – 1 Jan', note: 'Client and team gifting' },
  { name: 'Makar Sankranti', date: 'Mid-January', note: 'Til-and-gur pairings' },
  { name: 'Holi', date: 'March', note: 'Colourful assortments' },
  { name: 'Raksha Bandhan', date: 'August', note: 'Rakhi hampers, shipped across India' },
];

export default function FestivePage() {
  return (
    <PageShell>
      <JsonLd
        data={[
          breadcrumbSchema([{ name: 'Festive Hampers', path: PATH }]),
          serviceSchema({ name: 'Festive gift hampers', serviceType: 'Festive gift hampers', path: PATH, description: 'Festive mithai boxes and hampers for Diwali, Raksha Bandhan, Holi and New Year.' }),
        ]}
      />
      <PageHero
        eyebrow="Festive Gift Hampers"
        title="Every festival deserves a box worth opening."
        intro="Diwali, Rakhi, Holi, Bhai Dooj, New Year — handcrafted sweets and premium dry fruits in hampers made for giving, for families and for companies."
        crumbs={[{ name: 'Festive Hampers', path: PATH }]}
        actions={
          <>
            <Button href="#enquire" variant="primary" icon="arrow">
              Order festive hampers
            </Button>
            <Button href="/corporate-gifting" variant="outline">
              Corporate festive gifting
            </Button>
          </>
        }
        art={<GiftBoxArt variant="stack" tone="ivory" className="w-full" />}
      />

      <section className="py-24 sm:py-28">
        <div className="container-luxe">
          <SectionHeading eyebrow="The Gifting Calendar" title="Plan the year’s celebrations." intro="Order windows open about six weeks before each festival. Corporate orders with custom branding should be confirmed at least four weeks ahead." />
          <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {SEASON.map((f, i) => (
              <Reveal key={f.name} delay={(i % 4) * 0.06} className="rounded-3xl border border-gold-300/50 bg-cream-50 p-6">
                <p className="eyebrow">{f.date}</p>
                <h3 className="mt-3 font-display text-2xl font-semibold text-maroon">{f.name}</h3>
                <p className="mt-2 text-sm text-ink-muted">{f.note}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <GiftCollections />
      <EnquirySection defaultType="retail" title="Order your festive hampers." />
    </PageShell>
  );
}
