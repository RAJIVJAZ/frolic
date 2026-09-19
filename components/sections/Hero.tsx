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
import { products } from '@/lib/products';
import { worldVars } from '@/lib/utils';


const HERO_PRODUCT = products[0];

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  // Parallax: copy drifts up and fades, the can holds longer and scales down.
  const copyY = useTransform(scrollYProgress, [0, 1], ['0%', '-38%']);
  const copyOpacity = useTransform(scrollYProgress, [0, 0.62], [1, 0]);
  const canScale = useTransform(scrollYProgress, [0, 1], [1, 0.82]);

  // Scroll → can tilt. Written into a ref rather than state: the 3D scene
  // samples it inside its own render loop, so scrolling costs zero React work.
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
      {/* Colour wash keyed to the hero flavour world */}
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
          <motion.p
            className="chip mb-6"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-mint" />
            7g prebiotic fibre · 4g added sugar · 0 caffeine
          </motion.p>

          <h1 className="text-step-6">
            <RevealWords text="India's most" delay={0.15} />
            <br />
            <RevealWords text="exciting" delay={0.3} className="gradient-text" />{' '}
            <RevealWords text="functional soda" delay={0.42} />
          </h1>

          <motion.p
            className="mt-6 max-w-[42ch] text-step-1 text-charcoal-muted"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.7 }}
          >
            Prebiotic fibre, botanical ingredients, and amazing taste — built from nimbu, jamun,
            kokum and every other flavour we actually grew up drinking.
          </motion.p>

          <motion.div
            className="mt-9 flex flex-wrap items-center gap-3"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.82 }}
          >
            <ButtonLink href="/shop" size="lg" variant="primary">
              Shop Now <Arrow />
            </ButtonLink>
            <ButtonLink href="/flavours" size="lg" variant="outline">
              Explore Flavours
            </ButtonLink>
          </motion.div>

          <motion.dl
            className="mt-10 flex flex-wrap gap-x-10 gap-y-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            {[
              { v: '7g', l: 'Prebiotic fibre' },
              { v: '−75%', l: 'Sugar vs. regular soda' },
              { v: '10', l: 'Flavours' },
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

      <ScrollCue />
    </section>
  );
}

function ScrollCue() {
  return (
    <motion.div
      className="pointer-events-none absolute inset-x-0 bottom-6 z-10 hidden justify-center lg:flex"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.4, duration: 0.8 }}
      aria-hidden
    >
      <div className="flex flex-col items-center gap-2">
        <span className="font-mono text-[0.6rem] font-semibold uppercase tracking-[0.22em] text-charcoal-muted">
          Scroll
        </span>
        <span className="relative block h-9 w-[1px] overflow-hidden bg-charcoal/15">
          <motion.span
            className="absolute inset-x-0 top-0 block h-3 bg-charcoal"
            animate={{ y: [-12, 36] }}
            transition={{ duration: 1.9, repeat: Infinity, ease: 'easeInOut' }}
          />
        </span>
      </div>
    </motion.div>
  );
}
