import { SectionHeader } from '@/components/ui/SectionHeader';
import { Reveal } from '@/components/ui/Reveal';

const PILLARS = [
  {
    n: '01',
    title: 'Less sugar, not no sugar',
    body: 'Target is roughly a quarter of the sugar in a conventional soft drink. Not zero — a drink with no sweetness is not a soda, and we would rather be honest about a small number than perform a zero we have not achieved.',
  },
  {
    n: '02',
    title: 'Prebiotic fibre as the point',
    body: 'A target of 7 g per can, from a blend of chicory inulin and acacia gum. Fibre is the nutrient the entire beverage category skipped, and it is the one most people are short of.',
  },
  {
    n: '03',
    title: 'Botanicals, pressed not powdered',
    body: 'Fresh ginger, tulsi, amla, kokum. Reconstituting from extract is cheaper and tastes like it. The difference is the whole product.',
  },
  {
    n: '04',
    title: 'Indian flavour, not Indian packaging',
    body: 'Nimbu masala, aam panna, jeera, kokum, jamun. Flavours that already exist in Indian drinking culture, built properly rather than referenced decoratively.',
  },
];

export function Mission() {
  return (
    <section className="bg-ivory py-section" aria-label="Our mission">
      <div className="shell">
        <SectionHeader
          eyebrow="Our mission"
          title={<>Reimagining soda for India.</>}
          body="Traditional soft drinks were built for one sensation and optimised for it for a century. FROLIC is being built for taste and function at the same time — which is a harder formulation problem, and the reason the category stayed empty this long."
        />

        <ol className="mt-12 grid gap-5 sm:grid-cols-2">
          {PILLARS.map((p, i) => (
            <Reveal as="li" key={p.n} delay={i}>
              <article className="h-full rounded-card border border-charcoal-line bg-cream p-7 transition-shadow hover:shadow-lift">
                <span className="font-mono text-[0.68rem] font-bold text-lime-700">{p.n}</span>
                <h3 className="mt-4 text-step-2">{p.title}</h3>
                <p className="mt-3 leading-relaxed text-charcoal-muted">{p.body}</p>
              </article>
            </Reveal>
          ))}
        </ol>

        <p className="mx-auto mt-12 max-w-prose text-center text-step--1 text-charcoal-muted">
          These are the design targets the formulation work is aimed at. They are not yet
          verified in a finished product — see{' '}
          <a href="/development" className="underline decoration-charcoal/25 decoration-2 underline-offset-4 hover:decoration-charcoal">
            what&apos;s built
          </a>
          .
        </p>
      </div>
    </section>
  );
}
