'use client';

import { motion } from 'framer-motion';
import { ButtonLink, Arrow } from '@/components/ui/Button';
import { Reveal } from '@/components/ui/Reveal';

const PERKS = [
  { title: 'Save 20%, always', body: 'On every can, every delivery, stacked on top of pack pricing.' },
  { title: 'Swap flavours freely', body: 'Change what is in your box up to 48 hours before it ships.' },
  { title: 'Skip or pause anytime', body: 'Two taps in your account. No phone call, no retention script.' },
  { title: 'New flavours first', body: 'Subscribers get limited batches before they hit the shop.' },
];

export function SubscribeCta() {
  return (
    <section className="relative isolate overflow-hidden bg-charcoal py-section text-cream">
      {/* Slow-drifting colour field */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            'radial-gradient(60% 55% at 15% 25%, rgba(184,241,53,0.30), transparent 62%),' +
            'radial-gradient(55% 50% at 85% 30%, rgba(107,46,143,0.38), transparent 62%),' +
            'radial-gradient(60% 55% at 50% 95%, rgba(255,106,26,0.26), transparent 60%)',
        }}
        animate={{ scale: [1, 1.08, 1], rotate: [0, 3, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="shell">
        <div className="max-w-3xl">
          <p className="eyebrow text-cream/45">Subscribe &amp; save</p>
          <h2 className="mt-5 text-step-5 text-cream">
            The fridge stays full.
            <br />
            <span className="text-lime">You stop thinking about it.</span>
          </h2>
          <p className="mt-6 max-w-prose text-step-1 text-cream/65">
            Pick your flavours, pick a cadence, and we handle the rest. Most people land on a
            12-can box every four weeks — it works out to about ₹82 a can.
          </p>
        </div>

        <ul className="mt-14 grid gap-px overflow-hidden rounded-panel bg-cream/12 sm:grid-cols-2 lg:grid-cols-4">
          {PERKS.map((perk, i) => (
            <Reveal as="li" key={perk.title} delay={i} className="bg-charcoal p-7">
              <span className="font-mono text-[0.68rem] font-bold text-lime">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="mt-4 text-step-1 text-cream">{perk.title}</h3>
              <p className="mt-2 text-step--1 leading-relaxed text-cream/55">{perk.body}</p>
            </Reveal>
          ))}
        </ul>

        <div className="mt-12 flex flex-wrap items-center gap-4">
          <ButtonLink href="/subscribe" variant="ink" size="lg">
            Start a subscription <Arrow />
          </ButtonLink>
          <ButtonLink href="/quiz" variant="ghost" size="lg" className="text-cream hover:bg-cream/10">
            Not sure which flavours? Take the quiz
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
