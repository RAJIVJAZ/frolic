import { BrochureShell, ContactPage, Cover, Footer, GiftBoxArt, Page, PageHeader, SweetsPage } from '@/components/brochure/Brochure';
import { Icon } from '@/components/ui/Icon';
import { TERMS } from '@/lib/business';
import { CORPORATE_OFFERINGS, CUSTOMISATIONS, GIFT_COLLECTIONS } from '@/lib/gifting';
import { pageMeta } from '@/lib/seo';

export const metadata = pageMeta({
  title: 'Corporate Gifting Catalogue',
  description: 'The Mithaiwallah corporate gifting catalogue: collections, customisation, timelines and how to order.',
  path: '/brochure/corporate',
  noindex: true,
});

const WHY = [
  ['Premium ingredients', 'Full-cream milk, pure desi ghee, whole dry fruits.'],
  ['Custom branding', 'Logo foil, sleeves and message cards, approved on proof.'],
  ['Bulk capacity', 'Production planned weeks ahead of festive peaks.'],
  ['Pan-India delivery', 'One office or hundreds of addresses, tracked.'],
  ['Hygienic manufacturing', 'Sealed, batch-coded packs from a controlled kitchen.'],
  ['GST invoicing', 'Clean paperwork for finance and procurement.'],
];

export default function CorporateBrochure() {
  return (
    <BrochureShell pdf="/brochures/mithaiwallah-corporate-gifting.pdf" title="Corporate Gifting Catalogue">
      <Cover
        kicker="Corporate Gifting Collection · 2026"
        title={
          <>
            Gifts that carry
            <br />
            <span className="text-foil italic">your name well.</span>
          </>
        }
        subtitle="Premium handcrafted Indian sweets in boxes that carry your brand — for employees, clients and every festival in between."
        art={<GiftBoxArt variant="pair" tone="maroon" label="YOUR LOGO" className="mx-auto w-[175mm]" />}
      />

      <Page>
        <PageHeader eyebrow="Why Mithaiwallah" title="A gifting partner, not a vendor." />
        <p className="mt-6 text-[11pt] leading-relaxed text-ink-soft">
          Mithaiwallah makes a focused collection of milk sweets in Prayagraj the traditional way — slowly, by hand — and
          presents them with the finish of a luxury gift. Our corporate team plans with yours weeks ahead, so the festival
          week is calm on your side.
        </p>
        <div className="mt-8 grid grid-cols-2 gap-4">
          {CORPORATE_OFFERINGS.map((o) => (
            <div key={o.title} className="rounded-[3mm] border border-gold-300/60 bg-cream-50 p-5">
              <h3 className="font-display text-[16pt] font-semibold text-maroon">{o.title}</h3>
              <p className="mt-1.5 text-[9pt] leading-relaxed text-ink-muted">{o.body}</p>
            </div>
          ))}
        </div>
        <div className="mt-8 grid grid-cols-3 gap-x-5 gap-y-4">
          {WHY.map(([t, b]) => (
            <div key={t} className="flex gap-2">
              <Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-gold-600" />
              <div>
                <p className="text-[9.5pt] font-semibold text-ink">{t}</p>
                <p className="text-[8.5pt] leading-snug text-ink-muted">{b}</p>
              </div>
            </div>
          ))}
        </div>
        <blockquote className="mt-auto border-l-2 border-gold-500 pl-5 font-display text-[17pt] italic leading-snug text-maroon">
          “The sweets you give say something about you. We make sure they say the right thing.”
        </blockquote>
        <Footer n={2} />
      </Page>

      <SweetsPage n={3} />

      <Page>
        <PageHeader eyebrow="Signature Gift Boxes" title="Three collections. Endless combinations." />
        <div className="mt-6 space-y-4">
          {GIFT_COLLECTIONS.map((c) => (
            <div key={c.name} className="flex items-center gap-5 rounded-[3mm] border border-gold-300/60 bg-cream-50 p-4">
              <GiftBoxArt variant="closed" tone={c.box} label="LOGO" className="w-[52mm] shrink-0" />
              <div>
                <h3 className="font-display text-[18pt] font-semibold text-maroon">{c.name}</h3>
                <p className="text-[8.5pt] text-ink-muted">{c.finish}</p>
                <p className="mt-2 text-[9.5pt] text-ink-soft">{c.contents.join(' · ')}</p>
                <p className="mt-1 text-[8.5pt] text-ink-muted"><strong className="text-ink">Best for:</strong> {c.bestFor}</p>
              </div>
            </div>
          ))}
        </div>
        <p className="mt-5 text-[9pt] text-ink-muted">
          Every collection can be re-assorted, re-sized and branded. Pricing is quoted per order on volume, customisation and delivery spread.
        </p>
        <Footer n={4} />
      </Page>

      <Page>
        <PageHeader eyebrow="Custom Branding Available" title="Your brand, in gold foil." />
        <div className="mt-6 grid grid-cols-2 gap-4">
          {CUSTOMISATIONS.map((c) => (
            <div key={c.title} className="rounded-[3mm] bg-cream-200 p-5">
              <h3 className="font-display text-[15pt] font-semibold text-maroon">{c.title}</h3>
              <p className="mt-1 text-[9pt] leading-relaxed text-ink-muted">{c.body}</p>
            </div>
          ))}
        </div>
        <h3 className="mt-10 font-display text-[20pt] font-semibold text-maroon">Planning Diwali: work back from the date</h3>
        <ol className="mt-4 space-y-3 border-l border-gold-400/60 pl-5 text-[10pt]">
          {[
            ['8 weeks before', 'Share headcount, budget per box, cities and dates'],
            ['6 weeks before', 'Taste samples; choose assortment and box'],
            ['4 weeks before', 'Approve branded proof and delivery list'],
            ['2 weeks before', 'Production and assembly'],
            ['Festival week', 'Dispatch with tracking'],
          ].map(([w, t]) => (
            <li key={w}>
              <span className="text-[8pt] font-bold uppercase tracking-[0.18em] text-gold-700">{w}</span>
              <p className="text-ink-soft">{t}</p>
            </li>
          ))}
        </ol>
        <p className="mt-6 rounded-[3mm] border border-gold-400/60 p-4 text-[9.5pt] text-ink-soft">{TERMS.festivePlanningNote} {TERMS.sampleBoxes}.</p>
        <Footer n={5} />
      </Page>

      <ContactPage n={6} cta="Let’s plan your gifting." />
    </BrochureShell>
  );
}
