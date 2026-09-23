'use client';

import Link from 'next/link';
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { products, type Product } from '@/lib/products';
import { Button, ButtonLink, Arrow } from '@/components/ui/Button';
import { SignupForm } from '@/components/prelaunch/SignupForm';
import { CanFallback } from '@/components/three/CanFallback';
import { cn, worldVars } from '@/lib/utils';

/**
 * Flavour discovery quiz.
 *
 * Scoring is a transparent weighted sum rather than a lookup table, so adding
 * a flavour to the catalogue automatically makes it reachable without editing
 * the quiz. Each answer contributes points along one axis; the three
 * highest-scoring flavours are recommended.
 */

type Axis = 'sweetness' | 'intensity' | 'profile' | 'occasion';

type Answer = {
  id: string;
  label: string;
  caption: string;
  /** Target value on the axis, or profile tags to match. */
  value: number | string[];
};

type Question = {
  id: string;
  axis: Axis;
  prompt: string;
  helper: string;
  answers: Answer[];
};

const QUESTIONS: Question[] = [
  {
    id: 'q1',
    axis: 'profile',
    prompt: 'What are you reaching for, usually?',
    helper: 'Pick whichever is closest — this steers the flavour family.',
    answers: [
      { id: 'a1', label: 'Fresh lime soda', caption: 'Sharp, salty, citrus-forward', value: ['citrus', 'tart'] },
      { id: 'a2', label: 'Something fruity', caption: 'Mango, guava, plum territory', value: ['fruity', 'sweet'] },
      { id: 'a3', label: 'Jeera or masala soda', caption: 'Savoury, spiced, after a meal', value: ['spiced', 'herbal'] },
      { id: 'a4', label: 'Plain sparkling water', caption: 'Minimal, clean, not sweet', value: ['herbal', 'citrus'] },
    ],
  },
  {
    id: 'q2',
    axis: 'sweetness',
    prompt: 'How sweet do you want it?',
    helper: 'Every flavour is low sugar — this is about perceived sweetness.',
    answers: [
      { id: 'b1', label: 'Barely at all', caption: 'Dry, savoury, grown-up', value: 1 },
      { id: 'b2', label: 'A little', caption: 'Just enough to balance the acid', value: 2 },
      { id: 'b3', label: 'Properly fruity', caption: 'Tastes like a treat', value: 4 },
    ],
  },
  {
    id: 'q3',
    axis: 'intensity',
    prompt: 'How loud should it be?',
    helper: 'Intensity is about how much the flavour announces itself.',
    answers: [
      { id: 'c1', label: 'Easy-going', caption: 'Something I can drink all day', value: 2 },
      { id: 'c2', label: 'Confident', caption: 'Noticeable, not overwhelming', value: 3 },
      { id: 'c3', label: 'Hit me', caption: 'I want to feel it', value: 5 },
    ],
  },
  {
    id: 'q4',
    axis: 'occasion',
    prompt: 'When are you drinking it?',
    helper: 'Last one.',
    answers: [
      { id: 'd1', label: 'Desk, mid-afternoon', caption: 'Instead of a coffee or a cola', value: ['citrus', 'herbal', 'spiced'] },
      { id: 'd2', label: 'With food', caption: 'Alongside a proper meal', value: ['spiced', 'tart'] },
      { id: 'd3', label: 'After a workout', caption: 'Salt and something cold', value: ['citrus', 'tart'] },
      { id: 'd4', label: 'Weekend, socially', caption: 'Mixer duty included', value: ['fruity', 'sweet'] },
    ],
  },
];

function score(answers: Record<string, Answer>): Product[] {
  const scored = products.map((product) => {
    let points = 0;

    for (const question of QUESTIONS) {
      const answer = answers[question.id];
      if (!answer) continue;

      if (Array.isArray(answer.value)) {
        // Profile match — each overlapping tag is worth 3.
        const overlap = answer.value.filter((tag) =>
          (product.profile as readonly string[]).includes(tag),
        ).length;
        points += overlap * 3;
      } else if (question.axis === 'sweetness') {
        // Closer is better; an exact match is worth 4, each step away costs 1.5.
        points += Math.max(0, 4 - Math.abs(product.sweetness - answer.value) * 1.5);
      } else if (question.axis === 'intensity') {
        points += Math.max(0, 4 - Math.abs(product.intensity - answer.value) * 1.5);
      }
    }

    // Nudge bestsellers when two flavours tie, so a new visitor lands on
    // something we know converts.
    if (product.isBestseller) points += 0.4;

    return { product, points };
  });

  return scored.sort((a, b) => b.points - a.points).slice(0, 3).map((s) => s.product);
}

export function FlavourQuiz() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, Answer>>({});

  const done = step >= QUESTIONS.length;
  const question = QUESTIONS[step];
  const results = done ? score(answers) : [];
  const progress = (Math.min(step, QUESTIONS.length) / QUESTIONS.length) * 100;

  function choose(answer: Answer) {
    setAnswers((prev) => ({ ...prev, [question.id]: answer }));
    // Small beat so the selected state is visible before the panel swaps.
    window.setTimeout(() => setStep((s) => s + 1), 180);
  }

  return (
    <div className="mx-auto max-w-3xl">
      {/* Progress */}
      <div className="mb-10">
        <div className="flex items-baseline justify-between">
          <span className="eyebrow">
            {done ? 'Your matches' : `Question ${step + 1} of ${QUESTIONS.length}`}
          </span>
          {step > 0 && !done && (
            <button
              onClick={() => setStep((s) => s - 1)}
              className="text-step--1 font-semibold text-charcoal-muted underline underline-offset-4 hover:text-charcoal"
            >
              Back
            </button>
          )}
        </div>
        <div className="mt-3 h-1.5 overflow-hidden rounded-pill bg-charcoal/10">
          <motion.div
            className="h-full rounded-pill bg-charcoal"
            initial={false}
            animate={{ width: `${done ? 100 : progress}%` }}
            transition={{ type: 'spring', stiffness: 200, damping: 28 }}
          />
        </div>
      </div>

      <AnimatePresence mode="wait">
        {!done ? (
          <motion.div
            key={question.id}
            initial={{ opacity: 0, x: 28 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -28 }}
            transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
          >
            <h2 className="text-step-4">{question.prompt}</h2>
            <p className="mt-3 text-charcoal-muted">{question.helper}</p>

            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {question.answers.map((answer, i) => {
                const selected = answers[question.id]?.id === answer.id;
                return (
                  <motion.li
                    key={answer.id}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.06, duration: 0.4 }}
                  >
                    <button
                      onClick={() => choose(answer)}
                      className={cn(
                        'h-full w-full rounded-card border-2 p-5 text-left transition-all duration-300 ease-elastic',
                        selected
                          ? 'border-charcoal bg-charcoal text-cream'
                          : 'border-charcoal/12 hover:-translate-y-0.5 hover:border-charcoal/45 hover:shadow-lift',
                      )}
                    >
                      <span className="block font-display text-step-1 font-bold">{answer.label}</span>
                      <span
                        className={cn(
                          'mt-1.5 block text-step--1',
                          selected ? 'text-cream/65' : 'text-charcoal-muted',
                        )}
                      >
                        {answer.caption}
                      </span>
                    </button>
                  </motion.li>
                );
              })}
            </ul>
          </motion.div>
        ) : (
          <motion.div
            key="results"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <div style={worldVars(results[0].world)}>
              <h2 className="text-step-4">
                Start with <span className="gradient-text">{results[0].shortName}</span>.
              </h2>
              <p className="mt-4 max-w-prose text-step-1 text-charcoal-muted">
                {results[0].tagline} Based on your answers, these three concepts are the closest
                fit. Tell us and we will make sure your first taste includes them.
              </p>
            </div>

            <ul className="mt-10 grid gap-5 sm:grid-cols-3">
              {results.map((product, i) => (
                <motion.li
                  key={product.handle}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 + i * 0.09, duration: 0.5 }}
                  className="relative"
                >
                  {i === 0 && (
                    <span className="absolute -top-3 left-1/2 z-10 -translate-x-1/2 rounded-pill bg-charcoal px-3 py-1 font-mono text-[0.6rem] font-bold uppercase tracking-[0.14em] text-cream">
                      Best match
                    </span>
                  )}
                  <article
                    className="h-full overflow-hidden rounded-card border border-charcoal-line bg-cream"
                    style={worldVars(product.world)}
                  >
                    <div className="grid aspect-[4/5] place-items-center" style={{ background: product.world.wash }}>
                      <CanFallback product={product} widthClass="w-[36%]" />
                    </div>
                    <div className="p-5">
                      <h3 className="text-step-1 leading-tight">{product.name}</h3>
                      <p className="mt-1.5 text-step--1 text-charcoal-muted">{product.notes.join(' · ')}</p>
                      <Link
                        href={`/flavours/${product.handle}`}
                        className="mt-4 inline-flex items-center gap-2 text-step--1 font-semibold"
                      >
                        Flavour story <Arrow />
                      </Link>
                    </div>
                  </article>
                </motion.li>
              ))}
            </ul>

            <div className="mt-10 rounded-panel border-2 border-charcoal bg-cream p-7">
              <h3 className="text-step-2">Want these three first?</h3>
              <p className="mt-2 max-w-prose text-charcoal-muted">
                Join the waitlist and we will note your matches. Early tasters receive pilot batches
                before launch.
              </p>
              <div className="mt-6 max-w-md">
                <SignupForm intent="waitlist" compact />
              </div>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button
                variant="outline"
                size="lg"
                onClick={() => {
                  setAnswers({});
                  setStep(0);
                }}
              >
                Start over
              </Button>
              <ButtonLink href="/flavours" variant="ghost" size="lg">
                See the full range <Arrow />
              </ButtonLink>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
