import { BrochureShell, ContactPage, Cover, Footer, GiftBoxArt, Page, PageHeader, SweetsPage } from '@/components/brochure/Brochure';
import { CUSTOMISATIONS, GIFT_COLLECTIONS, WEDDING_OFFERINGS } from '@/lib/gifting';
import { pageMeta } from '@/lib/seo';

export const metadata = pageMeta({
  title: 'Wedding Gifting Catalogue',
  description: 'The Mithaiwallah wedding gifting catalogue: hampers, return gifts, invitation boxes and personalisation.',
  path: '/brochure/wedding',
  noindex: true,
});

const MOMENTS = [
  ['Roka & sagai', 'Elegant boxes for the first sweets the families share.'],
  ['Invitations', 'A mithai box that travels with the card.'],
  ['Mehendi & sangeet', 'Bite-sized assortments for long evenings.'],
  ['The wedding', 'Family hampers, baraat boxes and reception trays.'],
  ['Bidaai & return gifts', 'A beautiful box in every guest’s hand.'],
];

export default function WeddingBrochure() {
  return (
    <BrochureShell pdf="/brochures/mithaiwallah-wedding-gifting.pdf" title="Wedding Gifting Catalogue">
      <Cover
        kicker="Wedding Gifting Collection · 2026"
        title={
          <>
            For the sweetest days
            <br />
            <span className="text-foil italic">of their lives.</span>
          </>
        }
        subtitle="Wedding hampers, return gifts and invitation boxes filled with handcrafted sweets — designed around your colours, printed with your names."
        art={<GiftBoxArt variant="stack" tone="maroon" label="A & R" className="mx-auto w-[165mm]" />}
      />

      <Page>
        <PageHeader eyebrow="What We Create" title="Everything sweet, from roka to bidaai." />
        <div className="mt-7 grid grid-cols-2 gap-4">
          {WEDDING_OFFERINGS.map((o) => (
            <div key={o.title} className="rounded-[3mm] border border-gold-300/60 bg-cream-50 p-5">
              <h3 className="font-display text-[16pt] font-semibold text-maroon">{o.title}</h3>
              <p className="mt-1.5 text-[9pt] leading-relaxed text-ink-muted">{o.body}</p>
            </div>
          ))}
        </div>
        <h3 className="mt-9 font-display text-[20pt] font-semibold text-maroon">A box for every ceremony</h3>
        <div className="mt-4 space-y-3">
          {MOMENTS.map(([t, b], i) => (
            <div key={t} className="flex gap-4 border-b border-gold-300/50 pb-3">
              <span className="font-display text-[14pt] text-gold-600">0{i + 1}</span>
              <div>
                <p className="font-display text-[14pt] font-semibold text-ink">{t}</p>
                <p className="text-[9pt] text-ink-muted">{b}</p>
              </div>
            </div>
          ))}
        </div>
        <Footer n={2} />
      </Page>

      <SweetsPage n={3} />

      <Page>
        <PageHeader eyebrow="Personalise It" title="Your names. Your colours. Your message." />
        <div className="mt-6 grid grid-cols-2 gap-4">
          {CUSTOMISATIONS.map((c) => (
            <div key={c.title} className="rounded-[3mm] bg-cream-200 p-5">
              <h3 className="font-display text-[15pt] font-semibold text-maroon">{c.title}</h3>
              <p className="mt-1 text-[9pt] leading-relaxed text-ink-muted">{c.body}</p>
            </div>
          ))}
        </div>
        <h3 className="mt-8 font-display text-[20pt] font-semibold text-maroon">Start from a collection</h3>
        <div className="mt-4 grid grid-cols-3 gap-3">
          {GIFT_COLLECTIONS.map((c) => (
            <div key={c.name} className="rounded-[3mm] border border-gold-300/60 bg-cream-50 p-3">
              <GiftBoxArt variant="closed" tone={c.box} label="A & R" className="w-full" />
              <p className="font-display text-[13pt] font-semibold text-maroon">{c.name}</p>
              <p className="text-[8pt] leading-snug text-ink-muted">{c.contents.join(' · ')}</p>
            </div>
          ))}
        </div>
        <div className="mt-6 rounded-[3mm] border border-gold-400/60 p-4 text-[9.5pt] text-ink-soft">
          <strong className="text-ink">How many boxes?</strong> Count households, not heads, for invitation boxes and family hampers; one return gift per household or couple; add about 5% for the relatives who appear on the day.
        </div>
        <Footer n={4} />
      </Page>

      <ContactPage n={5} cta="Book your wedding consultation." />
    </BrochureShell>
  );
}
