import { PageShell } from '@/components/layout/PageShell';
import { JsonLd } from '@/components/seo/JsonLd';
import { EnquirySection } from '@/components/sections/EnquirySection';
import { Faq } from '@/components/sections/Faq';
import { FeatureGrid } from '@/components/sections/FeatureGrid';
import { PageHero } from '@/components/sections/PageHero';
import { SweetArt } from '@/components/art/SweetArt';
import { ArchFrame } from '@/components/ui/ArchFrame';
import { Button } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { PRODUCTS } from '@/lib/products';
import { breadcrumbSchema, pageMeta, serviceSchema } from '@/lib/seo';
import { cn } from '@/lib/utils';

const PATH = '/wholesale';

export const metadata = pageMeta({
  title: 'Wholesale Mithai Supplier & Bulk Sweet Manufacturer',
  description:
    'Bulk sweet supplier and wholesale mithai manufacturer in Prayagraj, UP. Milk cake, kalakand, peda and more for hotels, restaurants, caterers, sweet shops, private label and export.',
  path: PATH,
});

const SEGMENTS = [
  {
    id: 'horeca',
    eyebrow: 'Hotels, Restaurants & Caterers',
    title: 'Buffet-ready trays, on schedule.',
    body: 'Consistent sweets for buffets, turndown service, dessert menus and banquets — cut to your portion size and delivered on a standing schedule.',
    points: ['Pre-cut trays in portion sizes you specify', 'Weekly, fortnightly or event-based supply', 'Menu descriptions and allergen information supplied', 'One point of contact for your purchase team'],
    art: 'milk-cake' as const,
  },
  {
    id: 'retail',
    eyebrow: 'Sweet Shops & Retailers',
    title: 'Stock sweets your customers come back for.',
    body: 'Fill your counter with sweets that are hard to make well in a small kitchen — milk cake, kunda, Bikaneri cake — delivered fresh and consistent.',
    points: ['Loose trays or retail-ready packs', 'Counter display guidance', 'Festive-season volume planning', 'Credit terms for regular partners'],
    art: 'kunda' as const,
  },
  {
    id: 'private-label',
    eyebrow: 'Private Label Manufacturing',
    title: 'Our kitchen. Your name on the box.',
    body: 'We manufacture to our recipe or yours and pack under your brand — for sweet shop chains, gifting companies, hotel boutiques and retail brands.',
    points: ['Recipe matching or our signature recipes', 'Your packaging, or packaging we design for you', 'Labelling to FSSAI requirements', 'Minimum batch sizes agreed per product'],
    art: 'peda' as const,
  },
  {
    id: 'export',
    eyebrow: 'Export Buyers',
    title: 'Indian sweets for Indian homes abroad.',
    body: 'For importers and distributors serving the diaspora, we work on the longer-life lines — milk cake, peda and Bikaneri cake — with shelf life, packaging and documentation agreed market by market.',
    points: ['Shelf-stable product lines', 'Export-grade secondary packaging', 'Documentation support per destination', 'Sampling for buyer evaluation'],
    art: 'bikaneri-cake' as const,
  },
];

const FAQS = [
  { q: 'What is your minimum wholesale order?', a: 'It depends on the product and the delivery location. Share your requirement and we will confirm minimums, pricing and delivery schedule in writing.' },
  { q: 'Which sweets are best suited to long-distance supply?', a: `Milk cake, peda, kunda and Bikaneri cake travel best. Kalakand and malai barfi are fresher sweets and are supplied closer to Prayagraj or for events with tight timelines.` },
  { q: 'Can you match an existing recipe for private label?', a: 'Often, yes. We run trial batches against your reference sample and your approval before production begins.' },
  { q: 'Do you deliver outside Uttar Pradesh?', a: 'Yes. We supply across India through courier and freight partners, with temperature-conscious packing for the fresher products.' },
];

export default function WholesalePage() {
  return (
    <PageShell>
      <JsonLd
        data={[
          breadcrumbSchema([{ name: 'Wholesale', path: PATH }]),
          serviceSchema({ name: 'Wholesale and private-label sweets manufacturing', serviceType: 'Wholesale mithai supply', path: PATH, description: 'Bulk and wholesale Indian sweets for hotels, restaurants, sweet shops, private label and export.' }),
        ]}
      />
      <PageHero
        eyebrow="Bulk & Wholesale"
        title="The kitchen behind your counter."
        intro="Wholesale mithai supply and private-label manufacturing for hotels, restaurants, caterers, sweet shops, retailers and export buyers — handcrafted quality at the volumes your business runs on."
        crumbs={[{ name: 'Wholesale', path: PATH }]}
        actions={
          <>
            <Button href="#enquire" variant="primary" icon="arrow">
              Request trade pricing
            </Button>
            <Button href="#private-label" variant="outline">
              Private label
            </Button>
          </>
        }
      />

      <section className="py-24 sm:py-28">
        <div className="container-luxe">
          <SectionHeading eyebrow="Why Trade With Us" title="What a supplier should give you." />
          <div className="mt-14">
            <FeatureGrid
              items={[
                { icon: 'boxes', title: 'Volume without shortcuts', body: 'Production planned around your orders, so peak weeks do not mean compromised batches.' },
                { icon: 'shield', title: 'Consistency', body: 'The same recipe, texture and sweetness in every delivery — the thing trade buyers value most.' },
                { icon: 'truck', title: 'Reliable dispatch', body: 'Standing delivery schedules and packing built for the journey.' },
                { icon: 'handshake', title: 'Straightforward terms', body: 'Written quotes, GST invoicing and a named contact for your account.' },
              ]}
            />
          </div>
        </div>
      </section>

      {SEGMENTS.map((s, i) => (
        <section key={s.id} id={s.id} className={cn('scroll-mt-28 py-20 sm:py-24', i % 2 === 0 ? 'bg-cream-50' : '')}>
          <div className="container-luxe grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
            <Reveal className={cn('mx-auto w-full max-w-md', i % 2 === 1 && 'lg:order-2')}>
              <ArchFrame tone={PRODUCTS.find((p) => p.art === s.art)?.tone} className="aspect-square">
                <SweetArt variant={s.art} className="absolute bottom-[6%] left-1/2 w-[112%] max-w-none -translate-x-1/2" />
              </ArchFrame>
            </Reveal>
            <Reveal>
              <span className="eyebrow">{s.eyebrow}</span>
              <h2 className="mt-4 font-display text-display-sm font-semibold text-maroon">{s.title}</h2>
              <p className="mt-5 leading-relaxed text-ink-soft">{s.body}</p>
              <ul className="mt-7 space-y-3">
                {s.points.map((pt) => (
                  <li key={pt} className="flex gap-3 text-ink-soft">
                    <Icon name="check" className="mt-0.5 h-5 w-5 shrink-0 text-gold-600" /> {pt}
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <Button href={`/contact?type=wholesale#enquire`} variant="outline" icon="arrow">
                  Enquire about {s.eyebrow.split(' ')[0].toLowerCase() === 'export' ? 'export' : 'supply'}
                </Button>
              </div>
            </Reveal>
          </div>
        </section>
      ))}

      <Faq faqs={FAQS} title="Wholesale, answered." />
      <EnquirySection defaultType="wholesale" lockType title="Request trade pricing." intro="Tell us your business, the sweets you need and your volumes. Our trade team will send pricing and terms." />
    </PageShell>
  );
}
