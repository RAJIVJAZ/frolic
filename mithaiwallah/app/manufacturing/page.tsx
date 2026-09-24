import { PageShell } from '@/components/layout/PageShell';
import { JsonLd } from '@/components/seo/JsonLd';
import { CtaBand } from '@/components/sections/CtaBand';
import { FeatureGrid } from '@/components/sections/FeatureGrid';
import { PILLARS, PROCESS } from '@/components/sections/Manufacturing';
import { PageHero } from '@/components/sections/PageHero';
import { Icon } from '@/components/ui/Icon';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { COMPLIANCE } from '@/lib/business';
import { breadcrumbSchema, pageMeta } from '@/lib/seo';

const PATH = '/manufacturing';

export const metadata = pageMeta({
  title: 'Manufacturing Excellence — How Our Sweets Are Made',
  description:
    'Inside the Mithaiwallah kitchen in Prayagraj: fresh milk, slow cooking in small batches, hand finishing, quality checks and food-grade packaging for every order.',
  path: PATH,
});

const STANDARDS = [
  'Fresh milk checked on arrival; anything that fails goes back',
  'Small-batch cooking so texture stays consistent',
  'Separate zones for raw material, cooking, setting and packing',
  'Hairnets, gloves and hand-wash discipline for everyone on the floor',
  'Every batch tasted before it is cut and packed',
  'Batch code and best-before date on every pack',
  'Food-grade trays and sealed inner packs',
  'Dispatch packing designed for the length of the journey',
];

export default function ManufacturingPage() {
  return (
    <PageShell>
      <JsonLd data={breadcrumbSchema([{ name: 'Manufacturing', path: PATH }])} />
      <PageHero
        eyebrow="Manufacturing Excellence"
        title="Where tradition meets discipline."
        intro="Our halwais bring the recipes and the hands. Our process makes sure the thousandth box tastes exactly like the first. Here is what happens between the milk and your gift box."
        crumbs={[{ name: 'Manufacturing', path: PATH }]}
      />

      <section className="py-24 sm:py-28">
        <div className="container-luxe">
          <SectionHeading eyebrow="From Milk to Gift Box" title="Five stages. No shortcuts." />
          <ol className="mt-14 grid gap-5 md:grid-cols-5">
            {PROCESS.map((s, i) => (
              <Reveal as="li" key={s.title} delay={i * 0.07} className="rounded-3xl border border-gold-300/50 bg-cream-50 p-6 text-center">
                <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-maroon font-display text-2xl text-gold-200">{i + 1}</span>
                <h3 className="mt-4 font-display text-2xl font-semibold text-maroon">{s.title}</h3>
                <p className="mt-2 text-sm text-ink-muted">{s.body}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-ink py-24 text-cream sm:py-28">
        <div className="container-luxe">
          <SectionHeading light eyebrow="Four Pillars" title="What we hold ourselves to." />
          <div className="mt-14">
            <FeatureGrid dark items={PILLARS} />
          </div>
        </div>
      </section>

      <section className="py-24 sm:py-28">
        <div className="container-luxe grid gap-14 lg:grid-cols-2">
          <SectionHeading
            align="left"
            eyebrow="Quality & Hygiene"
            title="The standards on our kitchen wall."
            intro={
              COMPLIANCE.fssaiLicence
                ? `We operate under FSSAI licence no. ${COMPLIANCE.fssaiLicence}. These are the house rules we add on top.`
                : 'These are the house rules every batch follows — on top of what food-safety law requires.'
            }
          />
          <Reveal>
            <ul className="grid gap-4 sm:grid-cols-2">
              {STANDARDS.map((s) => (
                <li key={s} className="flex gap-3 rounded-2xl border border-gold-300/50 bg-cream-50 p-5 text-[0.95rem] text-ink-soft">
                  <Icon name="shield" className="h-5 w-5 shrink-0 text-gold-700" /> {s}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <section className="bg-cream-50 py-20">
        <div className="container-luxe">
          <Reveal className="rounded-[2rem] border border-dashed border-gold-400/70 p-10 text-center">
            <p className="eyebrow">Factory tours</p>
            <h2 className="mt-4 font-display text-display-sm font-semibold text-maroon">See it for yourself.</h2>
            <p className="mx-auto mt-4 max-w-2xl text-ink-soft">
              Corporate buyers, wedding planners, distributors and private-label partners are welcome to visit the kitchen in
              Prayagraj by appointment.
            </p>
          </Reveal>
        </div>
      </section>

      <CtaBand
        title="Need a manufacturing partner?"
        body="Private label, bulk supply or a long-term gifting programme — talk to the people who run the kitchen."
        primary={{ href: '/contact?type=wholesale#enquire', label: 'Talk to our trade team' }}
      />
    </PageShell>
  );
}
