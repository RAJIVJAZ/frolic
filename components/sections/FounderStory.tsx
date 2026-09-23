import { FOUNDER, COMPANY } from '@/lib/company';
import { Reveal } from '@/components/ui/Reveal';
import { ButtonLink, Arrow } from '@/components/ui/Button';

/**
 * Founder section.
 *
 * Written to be credible rather than impressive. Square brackets mark facts
 * only Rajeev can supply — they are deliberately visible so they cannot ship
 * unnoticed. Nothing here claims an outcome that has not happened.
 */
export function FounderStory({ full = false }: { full?: boolean }) {
  return (
    <section className="py-section" aria-label="Founder">
      <div className="shell grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <div>
          <p className="eyebrow">The founder</p>
          <h2 className="mt-4 text-step-4">Why I&apos;m building FROLIC</h2>

          <div className="mt-8 rounded-card border border-charcoal-line p-6">
            <p className="font-display text-step-2 font-bold">{FOUNDER.name}</p>
            <p className="mt-1 text-step--1 text-charcoal-muted">
              {FOUNDER.role} · {COMPANY.base}
            </p>
            <ul className="mt-5 space-y-2.5">
              {FOUNDER.credentials.map((c) => (
                <li key={c} className="flex items-start gap-2.5 text-step--1">
                  <span className="mt-[0.45em] h-1.5 w-1.5 shrink-0 rounded-full bg-lime-600" aria-hidden />
                  {c}
                </li>
              ))}
            </ul>
            <p className="mt-5 border-t border-charcoal-line pt-4 text-step--1 text-charcoal-muted">
              Building FROLIC solo, and hiring.
            </p>
          </div>
        </div>

        <div className="space-y-5 text-step-1 leading-relaxed text-charcoal-soft">
          <Reveal>
            <p>
              I am an electrical engineer by training and a manufacturer by trade. For the last{' '}
              {FOUNDER.yearsOperating} years I have run Anuradha Enterprises, a food manufacturing
              business working in dairy processing — and I run all of it myself, from development
              through to production. That means my working days are spent on the unglamorous end of
              this industry: cold chain, procurement, batch consistency, margins that move on the
              price of packaging.
            </p>
          </Reveal>
          <Reveal delay={1}>
            <p>
              That background is the reason I think I can build FROLIC, and it is also the reason I
              am cautious about it. Making a drink that tastes good once, in a kitchen, is not
              difficult. Making the same drink ten thousand times, at a stable cost, with a
              twelve-month shelf life and a supply chain that does not fail in May, is an entirely
              different problem. That second one is what I run every day — and I run the whole of
              it, not a function within it.
            </p>
          </Reveal>
          <Reveal delay={2}>
            <p>
              The idea came from looking at what my own family drinks. Nimbu soda, aam panna, jeera
              water, kokum in the summer — these are not niche. They are what India has been
              drinking for generations, and almost none of it is available as something you can pull
              out of a fridge. What you can pull out of a fridge is mostly sugar.
            </p>
          </Reveal>
          <Reveal delay={3}>
            <p>
              Meanwhile the global category moved on. Prebiotic sodas became a genuine business
              elsewhere, built on the idea that a soft drink can carry fibre and still taste like a
              treat. India has a handful of early entrants now, all of them working in a Western
              flavour idiom. Nobody has put that functional thinking inside the flavours people here
              actually grew up on.
            </p>
          </Reveal>
          {full && (
            <>
              <Reveal delay={4}>
                <p>
                  So that is what FROLIC is: prebiotic fibre and lower sugar, inside nimbu masala,
                  aam panna, kokum and ginger lime. Not an Indian version of an American soda — an
                  Indian soda, rebuilt.
                </p>
              </Reveal>
              <Reveal delay={5}>
                <p>
                  I am building it alone at the moment. The brand, the range architecture, the
                  financial model and this site are done. The formulation is not. Neither is the
                  co-packer, the FSSAI licence or the first production run — and I would rather say
                  that plainly than let a well-made website imply otherwise. The{' '}
                  <a href="/development" className="underline decoration-charcoal/25 decoration-2 underline-offset-4 hover:decoration-charcoal">
                    development page
                  </a>{' '}
                  lists every workstream and where it honestly stands.
                </p>
              </Reveal>
              <Reveal delay={6}>
                <p className="border-l-2 border-lime-600 pl-5 font-display text-step-2 font-bold not-italic text-charcoal">
                  I am not trying to build this quickly. I am trying to build it so that the second
                  can someone drinks is as good as the first.
                </p>
              </Reveal>
            </>
          )}
          {!full && (
            <Reveal delay={4}>
              <div className="pt-2">
                <ButtonLink href="/founder" variant="outline">
                  Read the full story <Arrow />
                </ButtonLink>
              </div>
            </Reveal>
          )}
        </div>
      </div>
    </section>
  );
}
