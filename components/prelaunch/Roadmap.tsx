'use client';

import { ROADMAP, TIMELINE } from '@/lib/company';
import { StatusBadge } from './StatusPill';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { cn } from '@/lib/utils';

/**
 * What is actually built, what is being built, what is not started.
 *
 * The "not started" items are shown rather than hidden. A roadmap where
 * everything is green reads as marketing; one that admits what has not begun
 * reads as a plan — and is the version a distributor or investor can act on.
 */
export function DevelopmentRoadmap({ limit }: { limit?: number }) {
  const items = limit ? ROADMAP.slice(0, limit) : ROADMAP;
  const done = ROADMAP.filter((i) => i.status === 'complete').length;

  return (
    <section className="py-section" aria-label="Development status">
      <div className="shell">
        <SectionHeader
          eyebrow="Currently in development"
          title={<>Where the work actually stands.</>}
          body={`${done} of ${ROADMAP.length} workstreams complete. The rest are listed honestly — including the ones that have not started, because those are the ones that decide whether this launches.`}
        />

        <ol className="mt-10 space-y-px overflow-hidden rounded-panel bg-charcoal/10">
          {items.map((item, i) => (
            <Reveal as="li" key={item.title} delay={i % 6} className="bg-cream">
              <article
                className={cn(
                  'flex flex-col gap-3 p-6 transition-colors sm:flex-row sm:items-start sm:gap-6 sm:p-7',
                  item.status === 'planned' && 'opacity-70',
                )}
              >
                <span className="font-mono text-step--1 font-bold text-charcoal-muted sm:w-8 sm:shrink-0">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-3">
                    <h3 className="text-step-1">{item.title}</h3>
                    <StatusBadge status={item.status} />
                  </div>
                  <p className="mt-2 max-w-prose text-step--1 leading-relaxed text-charcoal-muted">
                    {item.detail}
                  </p>
                  {item.evidence && (
                    <p className="mt-2 font-mono text-[0.66rem] uppercase tracking-[0.12em] text-mint-700">
                      ✳ {item.evidence}
                    </p>
                  )}
                </div>
              </article>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

/** Year-level phases. Years, not months — a missed month costs credibility. */
export function Timeline() {
  return (
    <section className="bg-charcoal py-section text-cream" aria-label="Timeline">
      <div className="shell">
        <p className="eyebrow text-cream/45">The plan</p>
        <h2 className="mt-4 max-w-[18ch] text-step-4 text-cream">
          Four years, stated in years rather than months.
        </h2>
        <p className="mt-5 max-w-prose text-step-1 text-cream/65">
          Beverage timelines slip. Committing to quarters we cannot control would be a promise to
          break, so the plan is deliberately coarse and the current phase is marked.
        </p>

        <ol className="mt-14 grid gap-px overflow-hidden rounded-panel bg-cream/12 lg:grid-cols-4">
          {TIMELINE.map((phase, i) => (
            <Reveal as="li" key={phase.period} delay={i} className="bg-charcoal p-7">
              <div className="flex items-baseline justify-between gap-3">
                <span className="font-display text-step-3 font-black text-cream">{phase.period}</span>
                {phase.current && (
                  <span className="rounded-pill bg-lime px-2.5 py-1 font-mono text-[0.6rem] font-bold uppercase tracking-[0.14em] text-charcoal">
                    Now
                  </span>
                )}
              </div>
              <p className="mt-1.5 font-mono text-[0.68rem] uppercase tracking-[0.16em] text-lime">
                {phase.label}
              </p>
              <ul className="mt-5 space-y-2.5">
                {phase.items.map((it) => (
                  <li key={it} className="flex items-start gap-2.5 text-step--1 text-cream/70">
                    <span className="mt-[0.45em] h-1 w-1 shrink-0 rounded-full bg-cream/40" aria-hidden />
                    {it}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
