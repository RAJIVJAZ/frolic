import type { Metadata } from 'next';
import { StagePill } from '@/components/prelaunch/StatusPill';
import { SignupForm } from '@/components/prelaunch/SignupForm';
import { Timeline } from '@/components/prelaunch/Roadmap';
import { buildMetadata, breadcrumbSchema } from '@/lib/seo';
import { JsonLd } from '@/components/JsonLd';
import { Reveal } from '@/components/ui/Reveal';
import { ButtonLink, Arrow } from '@/components/ui/Button';

export const metadata: Metadata = buildMetadata({
  title: 'Investor Relations',
  description:
    'FROLIC is a pre-revenue, pre-production prebiotic soda brand for India. Market opportunity, category timing and current stage — stated without overclaiming.',
  path: '/investors',
});

/**
 * Investor page.
 *
 * Every number here is either third-party verifiable or explicitly labelled as
 * a target. No revenue, no traction, no partnerships are claimed, because none
 * exist — and an investor who finds an overstatement here stops reading.
 */
export default function InvestorsPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Investors', path: '/investors' }])} />

      <section className="shell pt-12">
        <div className="max-w-3xl">
          <StagePill />
          <h1 className="mt-6 text-step-5">Why FROLIC exists.</h1>
          <p className="mt-6 text-step-1 text-charcoal-muted">
            A category that has been proven decisively elsewhere, is barely served in India, and is
            structurally protected from price competition by the way India taxes soft drinks.
          </p>
        </div>
      </section>

      <section className="shell py-section">
        <div className="rounded-panel border-2 border-tangerine-400 bg-tangerine-50 p-7 sm:p-9">
          <p className="font-mono text-[0.68rem] font-bold uppercase tracking-[0.16em] text-tangerine-600">
            Current stage — stated plainly
          </p>
          <h2 className="mt-3 text-step-3">Pre-revenue. Pre-production. Pre-formulation.</h2>
          <p className="mt-4 max-w-prose leading-relaxed text-charcoal-soft">
            FROLIC has no sales, no completed formulation, no manufacturing partner and no
            regulatory approvals. What exists is a complete brand and range architecture, a
            financial model built on verified tax and channel inputs, and a detailed project report.
            Anything on this page that is a target is labelled as one.
          </p>
        </div>

        <h2 className="mt-16 text-step-3">The category is proven</h2>
        <ul className="mt-8 grid gap-5 sm:grid-cols-3">
          {[
            {
              v: '$1.95bn',
              t: 'Poppi, acquired by PepsiCo',
              d: 'May 2025, plus $0.2bn contingent, against roughly $500m of revenue — about 3.9× revenue.',
            },
            {
              v: '$1.85bn',
              t: 'Olipop valuation',
              d: 'At its 2025 round, on roughly $400m of revenue. Profitable since early 2024.',
            },
            {
              v: '~$12.6m',
              t: 'Indian prebiotic soda, 2025',
              d: 'The entire category — roughly 0.2% of the functional beverage market it sits inside.',
            },
          ].map((s, i) => (
            <Reveal as="li" key={s.t} delay={i}>
              <article className="h-full rounded-card border border-charcoal-line bg-cream p-7">
                <p className="font-display text-step-3 font-black leading-none">{s.v}</p>
                <h3 className="mt-3 text-step-1">{s.t}</h3>
                <p className="mt-2 text-step--1 leading-relaxed text-charcoal-muted">{s.d}</p>
              </article>
            </Reveal>
          ))}
        </ul>
        <p className="mt-4 text-step--1 text-charcoal-muted">
          Sources: PepsiCo Form 10-Q FY2025; category reporting. Indian category size is an industry
          estimate and is being re-sourced.
        </p>

        <h2 className="mt-16 text-step-3">Why now</h2>
        <ol className="mt-8 space-y-px overflow-hidden rounded-panel bg-charcoal/10">
          {[
            ['The category stopped being speculative', 'A $1.95bn strategic exit removed any need to explain what a prebiotic soda is to an investor or a retailer.'],
            ['Demand is being validated by others', 'Two Indian entrants are in market and funding category education. Neither has national distribution.'],
            ['Quick commerce collapsed the distribution timeline', 'Reaching a premium urban consumer went from a multi-year retail grind to a months-long listing process.'],
            ['A 40% GST slab keeps volume players out', 'India taxes aerated sweetened beverages at 40%. Price-led competition is structurally unattractive, which protects a premium challenger from exactly the incumbents who would otherwise crush it.'],
            ['The Indian flavour position is unoccupied', 'Existing entrants work in a Western flavour idiom. Nobody has put functional formulation inside nimbu masala, aam panna or kokum.'],
          ].map(([t, d], i) => (
            <Reveal as="li" key={t} delay={i} className="bg-cream">
              <article className="flex gap-5 p-6 sm:gap-7 sm:p-7">
                <span className="font-mono text-step--1 font-bold text-lime-700">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div>
                  <h3 className="text-step-1">{t}</h3>
                  <p className="mt-2 max-w-prose text-step--1 leading-relaxed text-charcoal-muted">{d}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </ol>
      </section>

      <Timeline />

      <section className="shell py-section">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <div>
            <h2 className="text-step-3">What&apos;s available on request</h2>
            <ul className="mt-7 space-y-px overflow-hidden rounded-card bg-charcoal/10">
              {[
                ['Detailed project report', '55 pages — market, competition, unit economics, three-scenario financials, cap table, risk register and a milestone plan.'],
                ['Financial model', 'Every input tagged verified, estimate or assumption. Change an assumption and every table regenerates.'],
                ['Brand and range architecture', 'Design system, ten flavour concepts, packaging direction.'],
                ['Honest readiness assessment', 'Including where the model is weakest and what has to be proven before institutional capital makes sense.'],
              ].map(([t, d]) => (
                <li key={t} className="bg-cream px-5 py-4">
                  <p className="font-semibold">{t}</p>
                  <p className="mt-1 text-step--1 text-charcoal-muted">{d}</p>
                </li>
              ))}
            </ul>
            <div className="mt-8 rounded-card border border-charcoal-line p-6">
              <p className="eyebrow">A note on sequencing</p>
              <p className="mt-2 leading-relaxed text-charcoal-muted">
                Our own view is that institutional capital should follow evidence, not precede it.
                The near-term priority is a pilot batch and a blind sensory test — not a large
                round. Conversations now are welcome; the ask will be better justified in nine
                months.
              </p>
            </div>
          </div>

          <div className="rounded-panel border-2 border-charcoal bg-cream p-7 lg:sticky lg:top-24">
            <h2 className="text-step-2">Investor enquiry</h2>
            <p className="mt-2 text-step--1 text-charcoal-muted">
              Materials are shared directly. No data room, no gate.
            </p>
            <SignupForm intent="investor" className="mt-6" />
            <div className="mt-6 border-t border-charcoal-line pt-5">
              <ButtonLink href="/development" variant="ghost" className="px-0">
                See current development status <Arrow />
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
