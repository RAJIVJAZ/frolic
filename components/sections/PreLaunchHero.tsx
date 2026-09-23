'use client';

import { useRef } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  useReducedMotion,
} from 'framer-motion';
import { ButtonLink, Arrow } from '@/components/ui/Button';
import { RevealWords } from '@/components/ui/Reveal';
import { LazyCanStage } from '@/components/three/LazyCanStage';
import { StagePill } from '@/components/prelaunch/StatusPill';
import { getProduct } from '@/lib/products';
import { LAUNCH_FLAVOURS, COMPANY } from '@/lib/company';
import { worldVars } from '@/lib/utils';

const HERO_PRODUCT = getProduct(LAUNCH_FLAVOURS[0])!;

/**
 * Pre-launch hero.
 *
 * Headline note: an earlier draft read "India's First Premium Prebiotic Soda".
 * That is not true — Misfits and Bubz are both already in market in India.
 * A first-mover claim that fails one search is the cheapest possible way to
 * lose a distributor or an investor, so the position here is the one that is
 * both true and more defensible: the Indian flavour idiom.
 */
export function PreLaunchHero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });

  const copyY = useTransform(scrollYProgress, [0, 1], ['0%', '-34%']);
  const copyOpacity = useTransform(scrollYProgress, [0, 0.62], [1, 0]);
  const canScale = useTransform(scrollYProgress, [0, 1], [1, 0.84]);

  const spin = useTransform(scrollYProgress, [0, 1], [0, 14]);
  const spinRef = useRef(0);
  useMotionValueEvent(spin, 'change', (v) => {
    spinRef.current = v;
  });

  return (
    <section
      ref={ref}
      className="grain relative isolate overflow-hidden"
      style={worldVars(HERO_PRODUCT.world)}
    >
      <div className="world-wash pointer-events-none absolute inset-0 -z-10 opacity-70" aria-hidden />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-t from-cream to-transparent"
        aria-hidden
      />

      <div className="shell grid min-h-[min(92svh,54rem)] items-center gap-6 pb-16 pt-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10 lg:pb-24">
        <motion.div
          style={reduce ? undefined : { y: copyY, opacity: copyOpacity }}
          className="relative z-10 order-2 max-w-[38rem] lg:order-1"
        >
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-6"
          >
            <StagePill />
          </motion.div>

          <h1 className="text-step-6">
            <RevealWords text="A new generation" delay={0.15} />
            <br />
            <RevealWords text="of" delay={0.32} />{' '}
            <RevealWords text="Indian soda" delay={0.4} className="gradient-text" />
          </h1>

          <motion.p
            className="mt-6 max-w-[44ch] text-step-1 text-charcoal-muted"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.7 }}
          >
            Prebiotic fibre, botanical ingredients and bold Indian flavours — nimbu masala, aam
            panna, kokum, ginger lime. Being built now, in Pune.
          </motion.p>

          <motion.div
            className="mt-9 flex flex-wrap items-center gap-3"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.82 }}
          >
            <ButtonLink href="/waitlist" size="lg" variant="primary">
              Join the waitlist <Arrow />
            </ButtonLink>
            <ButtonLink href="/development" size="lg" variant="outline">
              See what&apos;s built
            </ButtonLink>
          </motion.div>

          <motion.dl
            className="mt-10 flex flex-wrap gap-x-10 gap-y-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            {[
              { v: '7g', l: 'Prebiotic fibre, target' },
              { v: '4', l: 'Launch flavours' },
              { v: '2027', l: COMPANY.launchWindow.replace('Targeting first ', '').replace(' in 2027', '') },
            ].map((s) => (
              <div key={s.l}>
                <dt className="sr-only">{s.l}</dt>
                <dd>
                  <span className="block font-display text-step-2 font-black leading-none">{s.v}</span>
                  <span className="mt-1.5 block font-mono text-[0.64rem] font-semibold uppercase tracking-[0.16em] text-charcoal-muted">
                    {s.l}
                  </span>
                </dd>
              </div>
            ))}
          </motion.dl>
        </motion.div>

        <motion.div
          style={reduce ? undefined : { scale: canScale }}
          className="order-1 h-[46svh] min-h-[20rem] w-full lg:order-2 lg:h-[72svh]"
        >
          <LazyCanStage
            product={HERO_PRODUCT}
            rotationRef={spinRef}
            className="h-full w-full"
            bubbles={110}
            showForms
          />
        </motion.div>
      </div>
    </section>
  );
}
