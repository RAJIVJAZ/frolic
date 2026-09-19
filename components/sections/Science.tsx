'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Reveal } from '@/components/ui/Reveal';
import { ButtonLink, Arrow } from '@/components/ui/Button';
import { CHART } from '@/lib/chartTokens';
import { cn } from '@/lib/utils';

/**
 * Science section.
 *
 * Claims discipline: everything here describes composition (what is in the can)
 * or well-established definitions (what a prebiotic fibre is). Nothing asserts
 * a health outcome for the drinker. See docs/13-compliance-claims.md.
 */

type Row = { label: string; value: number; note: string; highlight?: boolean };

const SUGAR_ROWS: Row[] = [
  { label: 'FROLIC', value: 6, note: '4 g of it added', highlight: true },
  { label: 'Packaged fruit juice', value: 24, note: 'per 250 ml, typical' },
  { label: 'Regular cola', value: 27, note: 'per 250 ml, typical' },
  { label: 'Energy drink', value: 28, note: 'per 250 ml, typical' },
];

const FIBRE_ROWS: Row[] = [
  { label: 'FROLIC', value: 7, note: 'per 250 ml can', highlight: true },
  { label: 'Regular cola', value: 0, note: 'no fibre' },
  { label: 'Packaged fruit juice', value: 0.3, note: 'mostly removed in processing' },
  { label: 'Sparkling water', value: 0, note: 'no fibre' },
];

const STEPS = [
  {
    n: '01',
    title: 'It goes in undigested',
    body: 'Prebiotic fibres like inulin are chains of fructose units. Humans do not produce the enzyme needed to break those bonds, so the fibre passes through the stomach and small intestine structurally intact.',
  },
  {
    n: '02',
    title: 'It reaches the colon',
    body: 'Arriving intact is the whole point — and the formal definition of a prebiotic. Most carbohydrates are absorbed long before this stage.',
  },
  {
    n: '03',
    title: 'Gut bacteria ferment it',
    body: 'Resident bacteria in the large intestine are able to metabolise these fibres, producing short-chain fatty acids as a by-product. This fermentation is an active area of nutrition research.',
  },
];

export function Science() {
  const [tab, setTab] = useState<'sugar' | 'fibre'>('sugar');
  const [asTable, setAsTable] = useState(false);
  const rows = tab === 'sugar' ? SUGAR_ROWS : FIBRE_ROWS;
  const unit = 'g';
  const measure = tab === 'sugar' ? 'Total sugar' : 'Dietary fibre';

  return (
    <section className="bg-ivory py-section" aria-label="The science">
      <div className="shell">
        <SectionHeader
          eyebrow="The science, plainly"
          title={<>Fibre is the part everyone skipped.</>}
          body="Prebiotic fibre is not an exotic supplement — it is a plant fibre your own gut bacteria can use and you cannot digest. Here is what that means, and what it looks like next to the rest of the aisle."
        />

        {/* ——— Comparison chart ——————————————————————————————— */}
        <div className="mt-12 rounded-panel border border-charcoal-line bg-cream p-6 shadow-lift sm:p-9">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h3 className="text-step-2">{measure} per 250 ml</h3>
              <p className="mt-1 text-step--1 text-charcoal-muted">
                Comparison figures are category typicals, not specific brands.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex rounded-pill border-2 border-charcoal/12 p-1" role="tablist" aria-label="Choose a measure">
                {(['sugar', 'fibre'] as const).map((t) => (
                  <button
                    key={t}
                    role="tab"
                    aria-selected={tab === t}
                    onClick={() => setTab(t)}
                    className={cn(
                      'rounded-pill px-4 py-1.5 text-step--1 font-semibold capitalize transition-colors',
                      tab === t ? 'bg-charcoal text-cream' : 'text-charcoal-muted hover:text-charcoal',
                    )}
                  >
                    {t}
                  </button>
                ))}
              </div>
              <button
                onClick={() => setAsTable((v) => !v)}
                className="rounded-pill border-2 border-charcoal/12 px-4 py-2 text-step--1 font-semibold text-charcoal-muted transition hover:border-charcoal/35 hover:text-charcoal"
                aria-pressed={asTable}
              >
                {asTable ? 'View as chart' : 'View as table'}
              </button>
            </div>
          </div>

          {asTable ? (
            <DataTable rows={rows} measure={measure} unit={unit} />
          ) : (
            <BarChart key={tab} rows={rows} measure={measure} unit={unit} />
          )}
        </div>

        {/* ——— How it works ——————————————————————————————————— */}
        <div className="mt-16 grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          <div>
            <h3 className="text-step-3">What a prebiotic actually is</h3>
            <p className="mt-4 max-w-prose text-charcoal-muted">
              Prebiotics and probiotics get used interchangeably and they are not the same thing.
              Probiotics are live bacteria. Prebiotics are the fibre those bacteria feed on. FROLIC
              contains prebiotic fibre — no live cultures, which is also why it survives being
              carbonated, canned and left in a warm delivery van.
            </p>
            <div className="mt-8">
              <ButtonLink href="/science" variant="outline">
                Read the long version <Arrow />
              </ButtonLink>
            </div>
          </div>

          <ol className="space-y-3">
            {STEPS.map((step, i) => (
              <Reveal as="li" key={step.n} delay={i} className="relative">
                <div className="rounded-card border border-charcoal-line bg-cream p-6 transition-shadow hover:shadow-lift">
                  <div className="flex items-start gap-5">
                    <span className="font-mono text-step-1 font-bold text-lime-700">{step.n}</span>
                    <div>
                      <h4 className="text-step-1">{step.title}</h4>
                      <p className="mt-2 text-step--1 leading-relaxed text-charcoal-muted">
                        {step.body}
                      </p>
                    </div>
                  </div>
                </div>
                {i < STEPS.length - 1 && (
                  <span
                    aria-hidden
                    className="mx-auto block h-3 w-px bg-charcoal-line"
                    style={{ marginBlock: '0.375rem' }}
                  />
                )}
              </Reveal>
            ))}
          </ol>
        </div>

        <p className="mt-10 max-w-[68ch] text-[0.78rem] leading-relaxed text-charcoal-muted">
          FROLIC is a food product. It is not intended to diagnose, treat, cure or prevent any
          disease, and nothing here should be read as medical advice. Figures for other categories
          are typical published values for those product types and will vary by brand and batch.
        </p>
      </div>
    </section>
  );
}

/**
 * Horizontal bars, one measure, emphasis encoding.
 * Single series, so no legend — the heading names the measure. Every bar is
 * directly labelled, which is what carries the value when the fill contrast is
 * doing decorative work rather than semantic work.
 */
function BarChart({ rows, measure, unit }: { rows: Row[]; measure: string; unit: string }) {
  const max = Math.max(...rows.map((r) => r.value), 1);

  return (
    <div
      className="mt-8"
      role="img"
      aria-label={`${measure} per 250 ml: ${rows.map((r) => `${r.label} ${r.value} ${unit}`).join(', ')}.`}
    >
      <ul className="space-y-5">
        {rows.map((row, i) => (
          <li key={row.label}>
            <div className="flex items-baseline justify-between gap-4">
              <span
                className={cn(
                  'text-step--1',
                  row.highlight ? 'font-bold text-charcoal' : 'font-medium text-charcoal-muted',
                )}
              >
                {row.label}
              </span>
              <span className="shrink-0 font-mono text-[0.72rem] text-charcoal-muted">{row.note}</span>
            </div>

            <div className="mt-2 flex items-center gap-3">
              <div className="h-7 flex-1 overflow-hidden rounded-r-[4px] bg-charcoal/[0.05]">
                <motion.div
                  className="h-full rounded-r-[4px]"
                  style={{ background: row.highlight ? CHART.highlight : CHART.context }}
                  initial={{ width: 0 }}
                  whileInView={{ width: `${Math.max((row.value / max) * 100, row.value > 0 ? 1.5 : 0)}%` }}
                  viewport={{ once: true, amount: 0.6 }}
                  transition={{ duration: 0.9, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                />
              </div>
              <span
                className={cn(
                  'w-16 shrink-0 text-right font-display font-black tabular-nums',
                  row.highlight ? 'text-step-1 text-lime-700' : 'text-step-0 text-charcoal-muted',
                )}
              >
                {row.value}
                {unit}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

function DataTable({ rows, measure, unit }: { rows: Row[]; measure: string; unit: string }) {
  return (
    <div className="mt-8 overflow-x-auto">
      <table className="w-full border-collapse text-step--1">
        <caption className="sr-only">{measure} per 250 ml serving</caption>
        <thead>
          <tr className="border-b border-charcoal-line text-left">
            <th scope="col" className="py-3 pr-4 font-mono text-[0.66rem] uppercase tracking-[0.14em] text-charcoal-muted">
              Drink
            </th>
            <th scope="col" className="py-3 pr-4 text-right font-mono text-[0.66rem] uppercase tracking-[0.14em] text-charcoal-muted">
              {measure} ({unit})
            </th>
            <th scope="col" className="py-3 font-mono text-[0.66rem] uppercase tracking-[0.14em] text-charcoal-muted">
              Note
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.label} className="border-b border-charcoal-line/50">
              <th scope="row" className={cn('py-3 pr-4 text-left', r.highlight ? 'font-bold' : 'font-medium text-charcoal-muted')}>
                {r.label}
              </th>
              <td className="py-3 pr-4 text-right font-semibold tabular-nums">{r.value}</td>
              <td className="py-3 text-charcoal-muted">{r.note}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
