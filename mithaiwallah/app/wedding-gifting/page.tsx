import { GiftBoxArt } from '@/components/art/GiftBoxArt';
import { PageShell } from '@/components/layout/PageShell';
import { JsonLd } from '@/components/seo/JsonLd';
import { EnquirySection } from '@/components/sections/EnquirySection';
import { Faq } from '@/components/sections/Faq';
import { FeatureGrid } from '@/components/sections/FeatureGrid';
import { PageHero } from '@/components/sections/PageHero';
import { Process } from '@/components/sections/Process';
import { Button } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { TERMS } from '@/lib/business';
import { CUSTOMISATIONS, GIFTING_PROCESS, GIFT_COLLECTIONS, WEDDING_OFFERINGS } from '@/lib/gifting';
import { breadcrumbSchema, pageMeta, serviceSchema } from '@/lib/seo';

const PATH = '/wedding-gifting';

export const metadata = pageMeta({
  title: 'Wedding Gift Hampers, Return Gifts & Mithai Invitation Boxes',
  description:
    'Customised wedding gift hampers, return gifts and premium mithai invitation boxes — handcrafted sweets, your monogram, your colours. Wedding gifting consultations in Prayagraj, delivery across India.',
  path: PATH,
});

const MOMENTS = [
  { title: 'Roka & sagai', body: 'The first sweets the two families share. Small, elegant boxes that set the tone.' },
  { title: 'Invitations', body: 'A mithai box that carries the card — often the first thing guests remember.' },
  { title: 'Mehendi & sangeet', body: 'Bite-sized assortments for long evenings of music and dancing.' },
  { title: 'The wedding', body: 'Family hampers, baraat boxes and trays for the reception.' },
  { title: 'Bidaai & return gifts', body: 'A beautiful box in every guest’s hand as they leave.' },
];

const FAQS = [
  { q: 'What is the minimum order for wedding boxes?', a: `Wedding orders start at ${TERMS.weddingMinimumBoxes} boxes. Most weddings order several types — invitation boxes, family hampers and return gifts — which we plan together.` },
  { q: 'Can the boxes match our wedding colours and carry our names?', a: 'Yes. Box colour, ribbon, a monogram or your names, and a printed message can all be customised. You approve a proof before we print.' },
  { q: 'How early should we book?', a: `Book as soon as your date is fixed — the wedding season fills quickly. Custom-printed boxes typically need ${TERMS.brandedLeadTime.replace(' for custom-branded boxes', '')}, and peak muhurat dates need more.` },
  { q: 'Can we do a tasting?', a: 'Yes. We host tasting sessions in Prayagraj for families and planners, and can courier a sample box to other cities.' },
  { q: 'Do you deliver to the venue?', a: 'Yes — to the venue, the family home or guests’ addresses across India. We coordinate timings with your planner.' },
  { q: 'Do you work with wedding planners?', a: 'Often. Planners and venues can contact us for trade terms and a single point of contact for every wedding they bring.' },
];

export default function WeddingPage() {
  return (
    <PageShell>
      <JsonLd
        data={[
          breadcrumbSchema([{ name: 'Wedding Gifting', path: PATH }]),
          serviceSchema({ name: 'Wedding gifting', serviceType: 'Wedding gift hampers and return gifts', path: PATH, description: 'Customised wedding hampers, return gifts and mithai invitation boxes with personalised packaging.' }),
        ]}
      />
      <PageHero
        eyebrow="Wedding Gifting"
        title="Wedding hampers as beautiful as the day itself."
        intro="Invitation boxes, family hampers and return gifts filled with handcrafted sweets — designed around your colours, printed with your names and delivered to the venue on time."
        crumbs={[{ name: 'Wedding Gifting', path: PATH }]}
        actions={
          <>
            <Button href="#enquire" variant="primary" icon="arrow">
              Book a consultation
            </Button>
            <Button href="/brochure/wedding" variant="outline" iconLeft="download">
              Wedding catalogue
            </Button>
          </>
        }
        art={<GiftBoxArt variant="stack" tone="maroon" label="A & R" className="w-full" />}
      />

      <section className="py-24 sm:py-28">
        <div className="container-luxe">
          <SectionHeading eyebrow="What We Create" title="Everything sweet, from roka to bidaai." />
          <div className="mt-14">
            <FeatureGrid items={WEDDING_OFFERINGS.map((o, i) => ({ ...o, icon: (['gift', 'heart', 'mail', 'sparkle'] as const)[i] }))} />
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-maroon-velvet py-24 text-cream sm:py-28">
        <div className="jaali-light pointer-events-none absolute inset-0" />
        <div className="container-luxe relative">
          <SectionHeading light eyebrow="Personalise It" title="Your names. Your colours. Your message." />
          <div className="mt-14">
            <FeatureGrid dark items={CUSTOMISATIONS.map((c, i) => ({ ...c, icon: (['sparkle', 'mail', 'gift', 'heart'] as const)[i] }))} />
          </div>
        </div>
      </section>

      <section className="py-24 sm:py-28">
        <div className="container-luxe">
          <SectionHeading eyebrow="Every Ceremony" title="A box for each moment of the wedding." />
          <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {MOMENTS.map((m, i) => (
              <Reveal key={m.title} delay={i * 0.06} className="rounded-3xl border border-gold-300/50 bg-cream-50 p-6">
                <span className="font-display text-sm text-gold-600">0{i + 1}</span>
                <h3 className="mt-3 font-display text-2xl font-semibold text-maroon">{m.title}</h3>
                <p className="mt-2 text-[0.92rem] leading-relaxed text-ink-muted">{m.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-cream-50 py-24 sm:py-28">
        <div className="container-luxe">
          <SectionHeading eyebrow="Collections" title="Start from a collection, make it yours." />
          <div className="mt-14 grid gap-6 lg:grid-cols-3">
            {GIFT_COLLECTIONS.map((c, i) => (
              <Reveal key={c.name} delay={i * 0.08} className="rounded-[2rem] border border-gold-300/60 bg-cream p-8">
                <GiftBoxArt variant="closed" tone={c.box} label="A & R" className="w-full" />
                <h3 className="mt-2 font-display text-3xl font-semibold text-maroon">{c.name}</h3>
                <p className="mt-2 text-sm text-ink-muted">{c.finish}</p>
                <ul className="mt-5 space-y-2">
                  {c.contents.map((x) => (
                    <li key={x} className="flex gap-2 text-[0.95rem] text-ink-soft">
                      <Icon name="check" className="mt-0.5 h-4 w-4 text-gold-600" /> {x}
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Process title="From first tasting to the last guest." steps={GIFTING_PROCESS} />

      <section className="py-20">
        <div className="container-luxe">
          <Reveal className="grid items-center gap-8 rounded-[2.5rem] border border-gold-300/60 bg-cream-200/60 p-9 sm:p-14 lg:grid-cols-[1.4fr_1fr]">
            <div>
              <span className="eyebrow">For Wedding Planners & Venues</span>
              <h2 className="mt-4 font-display text-display-sm font-semibold text-maroon">Bring us every wedding. We will make you look good at all of them.</h2>
              <p className="mt-4 text-ink-soft">Trade terms, a dedicated coordinator and priority slots in peak season for planners, banquet halls and event organisers.</p>
            </div>
            <div className="lg:text-right">
              <Button href="#enquire" variant="primary" icon="arrow">
                Partner with us
              </Button>
            </div>
          </Reveal>
        </div>
      </section>

      <Faq faqs={FAQS} title="Wedding gifting, answered." />
      <EnquirySection
        defaultType="wedding"
        lockType
        title="Book a wedding consultation."
        intro="Share your date, the number of guests and what you have in mind. We will call you to plan boxes, a tasting and a timeline."
      />
    </PageShell>
  );
}
