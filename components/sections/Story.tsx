'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { Reveal } from '@/components/ui/Reveal';
import { ButtonLink, Arrow } from '@/components/ui/Button';

/**
 * The problem → solution turn.
 *
 * Structurally this is one sticky viewport that the reader scrubs through:
 * the background crossfades from a desaturated "old soda" world into the
 * FROLIC world, and the two copy blocks hand off at the midpoint. Under
 * reduced-motion it degrades into two ordinary stacked panels.
 */

const PROBLEM = [
  { stat: '8–10', label: 'teaspoons of sugar in a regular 300 ml soft drink' },
  { stat: '< 50%', label: 'of Indian adults meet recommended daily fibre intake' },
  { stat: '0 g', label: 'fibre in the soda aisle, more or less across the board' },
];

const SOLUTION = [
  { stat: '7 g', label: 'prebiotic fibre per 250 ml can' },
  { stat: '4 g', label: 'added sugar — about a quarter of a regular soda' },
  { stat: '10', label: 'flavours built from Indian fruit, spice and salt' },
];

export function Story() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });

  const problemOpacity = useTransform(scrollYProgress, [0.02, 0.32, 0.46], [1, 1, 0]);
  const problemY = useTransform(scrollYProgress, [0.02, 0.46], ['0%', '-12%']);
  const solutionOpacity = useTransform(scrollYProgress, [0.5, 0.64, 0.98], [0, 1, 1]);
  const solutionY = useTransform(scrollYProgress, [0.5, 0.7], ['14%', '0%']);
  const washOpacity = useTransform(scrollYProgress, [0.36, 0.62], [0, 1]);
  const grayscale = useTransform(scrollYProgress, [0.1, 0.5], [1, 0]);
  const filter = useTransform(grayscale, (g) => `saturate(${1 - g})`);

  if (reduce) {
    return (
      <section className="bg-charcoal text-cream">
        <div className="shell space-y-16 py-section">
          <Panel kind="problem" />
          <Panel kind="solution" />
        </div>
      </section>
    );
  }

  return (
    <section ref={ref} className="relative h-[280svh] bg-charcoal text-cream" aria-label="Why we built FROLIC">
      <div className="sticky top-0 flex h-svh items-center overflow-hidden">
        {/* Dull, flat backdrop for the problem half */}
        <div className="absolute inset-0 bg-[#1b1917]" aria-hidden />
        {/* Flavour wash fades in as the solution arrives */}
        <motion.div
          className="absolute inset-0"
          style={{
            opacity: washOpacity,
            background:
              'radial-gradient(90% 70% at 20% 20%, rgba(184,241,53,0.28), transparent 60%),' +
              'radial-gradient(80% 70% at 85% 75%, rgba(255,106,26,0.22), transparent 62%),' +
              'radial-gradient(70% 60% at 60% 10%, rgba(63,217,164,0.18), transparent 60%)',
          }}
          aria-hidden
        />
        <motion.div className="shell relative w-full" style={{ filter }}>
          <motion.div style={{ opacity: problemOpacity, y: problemY }} className="absolute inset-x-gutter">
            <Panel kind="problem" />
          </motion.div>
          <motion.div style={{ opacity: solutionOpacity, y: solutionY }}>
            <Panel kind="solution" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function Panel({ kind }: { kind: 'problem' | 'solution' }) {
  const isProblem = kind === 'problem';
  const rows = isProblem ? PROBLEM : SOLUTION;

  return (
    <div className="max-w-4xl">
      <p className="eyebrow text-cream/45">{isProblem ? 'The problem' : 'What we did about it'}</p>
      <h2 className="mt-5 text-step-5 text-cream">
        {isProblem ? (
          <>
            Soda got very good
            <br />
            at one thing: <span className="text-tangerine">sugar.</span>
          </>
        ) : (
          <>
            So we rebuilt it
            <br />
            from the <span className="text-lime">fibre up.</span>
          </>
        )}
      </h2>
      <p className="mt-6 max-w-prose text-step-1 text-cream/65">
        {isProblem
          ? 'For a century the category optimised for one sensation and stopped there. Meanwhile the people drinking it started reading labels, counting grams, and quietly walking away — without ever finding something that tasted as good.'
          : 'Low sugar. Seven grams of prebiotic fibre. Botanical ingredients pressed, steeped and blended rather than reconstituted from a powder. And flavours drawn from what India already drinks: nimbu, jamun, kokum, aam panna, jeera.'}
      </p>

      <dl className="mt-10 grid gap-6 sm:grid-cols-3">
        {rows.map((r, i) => (
          <Reveal key={r.label} delay={i} className="border-t border-cream/15 pt-4">
            <dt className="sr-only">{r.label}</dt>
            <dd>
              <span
                className={
                  'block font-display text-step-4 font-black leading-none ' +
                  (isProblem ? 'text-tangerine' : 'text-lime')
                }
              >
                {r.stat}
              </span>
              <span className="mt-3 block max-w-[24ch] text-step--1 leading-relaxed text-cream/55">
                {r.label}
              </span>
            </dd>
          </Reveal>
        ))}
      </dl>

      {!isProblem && (
        <div className="mt-10">
          <ButtonLink href="/story" variant="ink" size="lg">
            Read the full story <Arrow />
          </ButtonLink>
        </div>
      )}
    </div>
  );
}
