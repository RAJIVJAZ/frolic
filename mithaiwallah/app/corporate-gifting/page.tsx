import { GiftBoxArt } from '@/components/art/GiftBoxArt';
import { PageShell } from '@/components/layout/PageShell';
import { JsonLd } from '@/components/seo/JsonLd';
import { EnquirySection } from '@/components/sections/EnquirySection';
import { Faq } from '@/components/sections/Faq';
import { FeatureGrid } from '@/components/sections/FeatureGrid';
import { GiftCollections, Seal } from '@/components/sections/Gifting';
import { PageHero } from '@/components/sections/PageHero';
import { Process } from '@/components/sections/Process';
import { Testimonials } from '@/components/sections/Testimonials';
import { Button } from '@/components/ui/Button';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { TERMS } from '@/lib/business';
import { CORPORATE_OFFERINGS, CUSTOMISATIONS, GIFTING_PROCESS } from '@/lib/gifting';
import { breadcrumbSchema, pageMeta, serviceSchema } from '@/lib/seo';

const PATH = '/corporate-gifting';

export const metadata = pageMeta({
  title: 'Corporate Gifting India — Branded Luxury Mithai Boxes',
  description:
    'Corporate gifting across India with premium handcrafted sweets. Custom-branded luxury mithai boxes for employees, clients and Diwali — planned to your dates, delivered pan-India.',
  path: PATH,
});

/** A Diwali planning timeline, working back from the festival week. */
const TIMELINE = [
  { when: '8 weeks before', what: 'Share the brief: headcount, budget per box, cities, delivery dates.' },
  { when: '6 weeks before', what: 'Tasting samples and box options; finalise the assortment.' },
  { when: '4 weeks before', what: 'Approve the branded proof and the delivery list. Order confirmed.' },
  { when: '2 weeks before', what: 'Boxes printed and assembled; sweets made fresh for your batch.' },
  { when: 'Festival week', what: 'Dispatch to one office or hundreds of addresses, with tracking.' },
];

const FAQS = [
  { q: 'What is the minimum order for corporate gifting?', a: `Corporate orders start at ${TERMS.corporateMinimumBoxes} boxes. There is no upper limit — we plan production around large orders well ahead of festive peaks.` },
  { q: 'Can you put our logo on the box?', a: 'Yes. We print, foil or emboss your logo on the lid or sleeve, and can add a printed message card from your leadership. You approve a digital proof before anything is printed.' },
  { q: 'How far in advance should we order for Diwali?', a: `${TERMS.festivePlanningNote} Custom-branded boxes typically need ${TERMS.brandedLeadTime.replace(' for custom-branded boxes', '')}; the earlier you confirm, the more packaging options remain open.` },
  { q: 'Do you deliver to multiple offices or employees’ homes?', a: 'Yes. Send us the address list and we will dispatch to one location or many across India, with tracking shared with your admin team.' },
  { q: 'Can we taste before we order?', a: `${TERMS.sampleBoxes}. For large orders we are happy to arrange a tasting at your office in Prayagraj or courier a sample box.` },
  { q: 'Do you provide GST invoices?', a: 'Yes — every corporate order is invoiced with GST, with the details your finance team needs for reimbursement and audit.' },
];

export default function CorporatePage() {
  return (
    <PageShell>
      <JsonLd
        data={[
          breadcrumbSchema([{ name: 'Corporate Gifting', path: PATH }]),
          serviceSchema({ name: 'Corporate gifting', serviceType: 'Corporate gifting', path: PATH, description: 'Custom-branded premium Indian sweet boxes for employees, clients and festive occasions, delivered across India.' }),
        ]}
      />
      <PageHero
        eyebrow="Corporate Gifting India"
        title="Corporate gifts people actually look forward to."
        intro="Premium handcrafted mithai in boxes that carry your brand — for employees, clients and every festival in between. Planned with your team, delivered on your dates, anywhere in India."
        crumbs={[{ name: 'Corporate Gifting', path: PATH }]}
        actions={
          <>
            <Button href="#enquire" variant="primary" icon="arrow">
              Get a corporate quote
            </Button>
            <Button href="/brochure/corporate" variant="outline" iconLeft="download">
              Download catalogue
            </Button>
          </>
        }
        art={
          <div className="relative">
            <GiftBoxArt variant="pair" tone="maroon" label="YOUR LOGO" className="w-full" />
            <Seal className="absolute -top-4 right-0 rotate-[-8deg]">Custom Branding Available</Seal>
          </div>
        }
      />

      <section className="py-24 sm:py-28">
        <div className="container-luxe">
          <SectionHeading eyebrow="What We Gift" title="One partner for every corporate occasion." />
          <div className="mt-14">
            <FeatureGrid
              items={CORPORATE_OFFERINGS.map((o, i) => ({ ...o, icon: (['users', 'handshake', 'sparkle', 'gift'] as const)[i] }))}
            />
          </div>
        </div>
      </section>

      <GiftCollections />

      <section className="relative overflow-hidden bg-maroon-velvet py-24 text-cream sm:py-28">
        <div className="jaali-light pointer-events-none absolute inset-0" />
        <div className="container-luxe relative grid gap-14 lg:grid-cols-2">
          <SectionHeading
            light
            align="left"
            eyebrow="Custom Branding Available"
            title="Your brand, in gold foil."
            intro="Every corporate box can carry your identity — on the lid, on a sleeve, on a card, or all three."
          />
          <div className="grid gap-4 sm:grid-cols-2">
            {CUSTOMISATIONS.map((c, i) => (
              <Reveal key={c.title} delay={i * 0.07} className="rounded-3xl border border-gold-300/25 bg-maroon-800/60 p-6">
                <h3 className="font-display text-2xl font-semibold text-gold-100">{c.title}</h3>
                <p className="mt-2 text-[0.95rem] text-cream/70">{c.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 sm:py-28">
        <div className="container-luxe">
          <SectionHeading
            eyebrow="Planning Diwali?"
            title="The calm way to do festive gifting."
            intro="Most gifting stress comes from starting late. Here is the schedule our corporate clients follow — work back from your festival date."
          />
          <ol className="relative mx-auto mt-14 max-w-3xl border-l border-gold-400/50 pl-8">
            {TIMELINE.map((t, i) => (
              <Reveal as="li" key={t.when} delay={i * 0.06} className="relative pb-10 last:pb-0">
                <span className="absolute -left-[41px] top-1 grid h-5 w-5 place-items-center rounded-full border border-gold-500 bg-cream">
                  <span className="h-2 w-2 rounded-full bg-maroon" />
                </span>
                <p className="eyebrow">{t.when}</p>
                <p className="mt-2 font-display text-2xl text-ink">{t.what}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <Process title="From brief to doorstep in five steps." steps={GIFTING_PROCESS} />
      <Testimonials />
      <Faq faqs={FAQS} title="Corporate gifting, answered." />
      <EnquirySection
        defaultType="corporate"
        lockType
        title="Plan your corporate gifting."
        intro="Tell us the occasion, the headcount and the dates. A gifting specialist will come back within one working day with recommendations and a quote."
      />
    </PageShell>
  );
}
