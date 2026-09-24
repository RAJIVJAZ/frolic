import { SweetArt } from '@/components/art/SweetArt';
import { PageShell } from '@/components/layout/PageShell';
import { JsonLd } from '@/components/seo/JsonLd';
import { CtaBand } from '@/components/sections/CtaBand';
import { PageHero } from '@/components/sections/PageHero';
import { ArchFrame } from '@/components/ui/ArchFrame';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { breadcrumbSchema, pageMeta } from '@/lib/seo';

const PATH = '/about';

export const metadata = pageMeta({
  title: 'Our Story — Handcrafted Indian Sweets from Prayagraj',
  description:
    'Mithaiwallah is a premium Indian sweets and gifting brand from Prayagraj, built on traditional recipes, premium ingredients and modern manufacturing.',
  path: PATH,
});

/** The seven brand values, in the order they appear in the brand guidelines. */
const VALUES = [
  { title: 'Trust', body: 'We say what is in the box and deliver what we promise — on the date we promised it.' },
  { title: 'Purity', body: 'Full-cream milk, pure desi ghee, real dry fruits. No premixes, no shortcuts.' },
  { title: 'Tradition', body: 'Recipes kept the way they were taught, because they were right.' },
  { title: 'Luxury', body: 'Luxury is care you can feel: in the texture, the box, the ribbon and the timing.' },
  { title: 'Celebration', body: 'We exist for the happiest days in people’s lives. That is a responsibility.' },
  { title: 'Craftsmanship', body: 'Every tray is finished by hand, by people who are proud of it.' },
  { title: 'Authentic Taste', body: 'It should taste like the best version of what you remember.' },
];

export default function AboutPage() {
  return (
    <PageShell>
      <JsonLd data={breadcrumbSchema([{ name: 'Our Story', path: PATH }])} />
      <PageHero
        eyebrow="Our Story"
        title="Sweets that say something about you."
        intro="Mithaiwallah is a premium celebration and gifting brand from Prayagraj — the city of the Sangam, of pilgrims, poets and wedding processions — built on one belief: the sweets you give are part of the message."
        crumbs={[{ name: 'Our Story', path: PATH }]}
        art={
          <ArchFrame tone="#EFDDBA" className="mx-auto aspect-square max-w-md">
            <SweetArt variant="peda" className="absolute bottom-[6%] left-1/2 w-[112%] max-w-none -translate-x-1/2" />
          </ArchFrame>
        }
      />

      <section className="py-24 sm:py-28">
        <div className="container-luxe grid gap-14 lg:grid-cols-[1fr_1.4fr]">
          <Reveal>
            <span className="eyebrow">Why we exist</span>
            <h2 className="mt-4 font-display text-display-sm font-semibold text-maroon">Mithai deserved better than a plastic tray.</h2>
          </Reveal>
          <Reveal className="space-y-5 text-[1.08rem] leading-[1.85] text-ink-soft">
            <p>
              India gives sweets at every moment that matters — a new job, a wedding, a festival, a result. Yet too often the
              box that carries them is an afterthought, and the sweets inside are made to a price rather than a standard.
            </p>
            <p>
              Mithaiwallah was started to close that gap. We make a focused collection of milk sweets the traditional way —
              slowly, by hand, with ingredients we would serve at our own table — and we present them with the finish of a
              luxury gift.
            </p>
            <p>
              Behind the counter sits a modern, hygienic kitchen and a team that plans large orders weeks ahead. That is what
              lets a company send a thousand boxes, or a family send five hundred return gifts, and trust that every one will
              be perfect.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="relative overflow-hidden bg-maroon-velvet py-24 text-cream sm:py-28">
        <div className="jaali-light pointer-events-none absolute inset-0" />
        <div className="container-luxe relative">
          <SectionHeading light eyebrow="What We Stand For" title="Seven values, one standard." />
          <div className="mt-14 grid gap-px overflow-hidden rounded-3xl border border-gold-300/20 bg-gold-300/20 sm:grid-cols-2 lg:grid-cols-4">
            {VALUES.map((v, i) => (
              <Reveal key={v.title} delay={(i % 4) * 0.06} className="h-full">
                <div className="h-full bg-maroon-800/90 p-8">
                  <span className="font-display text-sm text-gold-400">0{i + 1}</span>
                  <h3 className="mt-3 font-display text-3xl font-semibold text-gold-100">{v.title}</h3>
                  <p className="mt-3 text-[0.95rem] leading-relaxed text-cream/70">{v.body}</p>
                </div>
              </Reveal>
            ))}
            <div className="hidden bg-maroon-800/90 p-8 lg:flex lg:items-end">
              <p className="font-hindi text-3xl text-gold-300/70">मिठाईवाला</p>
            </div>
          </div>
        </div>
      </section>

      <CtaBand />
    </PageShell>
  );
}
