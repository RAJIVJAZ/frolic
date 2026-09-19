'use client';

import { useCallback, useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { LazyCanStage } from '@/components/three/LazyCanStage';
import { products, formatINR, unitPriceFor } from '@/lib/products';
import { worldVars, cn } from '@/lib/utils';
import { Button, ButtonLink, Arrow } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { useCart } from '@/lib/cart';


/**
 * Flavour explorer. Each flavour owns a visual world — colours, wash,
 * environment note — and switching flavours re-skins the whole section through
 * CSS custom properties rather than swapping class names. The 3D can rebuilds
 * its label texture from the new flavour automatically.
 */
export function FlavourCarousel() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const add = useCart((s) => s.add);
  const product = products[index];

  const go = useCallback((next: number) => {
    setDirection(next > index ? 1 : -1);
    setIndex((next + products.length) % products.length);
  }, [index]);

  return (
    <section
      className="grain relative isolate overflow-hidden py-section transition-colors duration-700"
      style={{ ...worldVars(product.world), background: product.world.wash }}
      aria-label="Explore flavours"
    >
      <div className="world-wash pointer-events-none absolute inset-0 -z-10 opacity-50" aria-hidden />

      <div className="shell">
        <header className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="eyebrow">Ten flavours</p>
            <h2 className="mt-3 max-w-[14ch] text-step-4">Every one its own world.</h2>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => go(index - 1)}
              aria-label="Previous flavour"
              className="grid h-12 w-12 place-items-center rounded-pill border-2 border-charcoal/15 transition hover:-translate-y-0.5 hover:border-charcoal/40"
            >
              <Arrow className="rotate-180 group-hover:translate-x-0" />
            </button>
            <button
              onClick={() => go(index + 1)}
              aria-label="Next flavour"
              className="grid h-12 w-12 place-items-center rounded-pill border-2 border-charcoal/15 transition hover:-translate-y-0.5 hover:border-charcoal/40"
            >
              <Arrow />
            </button>
          </div>
        </header>

        <div className="mt-10 grid items-center gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:gap-14">
          {/* ——— Stage */}
          <div className="relative order-1 h-[42svh] min-h-[19rem] lg:h-[62svh]">
            <AnimatePresence mode="wait">
              <motion.div
                key={product.handle}
                className="h-full w-full"
                initial={{ opacity: 0, scale: 0.9, rotate: direction * 6 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, scale: 0.9, rotate: direction * -6 }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              >
                <LazyCanStage
                  product={product}
                  className="h-full w-full"
                  bubbles={70}
                  showForms
                  scale={1.05}
                />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* ——— Detail */}
          <div className="order-2">
            <AnimatePresence mode="wait">
              <motion.div
                key={product.handle}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="flex flex-wrap items-center gap-2">
                  {product.badge && <Badge tone="ink">{product.badge}</Badge>}
                  <Badge tone="world">{product.nutrition.prebioticFibreG}g fibre</Badge>
                  <Badge>{product.nutrition.energyKcal} kcal</Badge>
                </div>

                <h3 className="mt-5 text-step-4">{product.name}</h3>
                <p className="mt-3 text-step-1 font-medium text-charcoal-soft">{product.tagline}</p>
                <p className="mt-5 max-w-prose text-charcoal-muted">{product.story}</p>

                <ul className="mt-7 flex flex-wrap gap-2">
                  {product.notes.map((note) => (
                    <li key={note} className="chip">{note}</li>
                  ))}
                </ul>

                <div className="mt-6 grid max-w-md gap-4 sm:grid-cols-2">
                  <Meter label="Intensity" value={product.intensity} />
                  <Meter label="Sweetness" value={product.sweetness} />
                </div>

                <div className="mt-9 flex flex-wrap items-center gap-3">
                  <Button
                    variant="world"
                    size="lg"
                    onClick={() => add({ handle: product.handle, packSize: 12, subscribe: false })}
                  >
                    Add 12-pack · {formatINR(unitPriceFor(product, 12) * 12)}
                  </Button>
                  <ButtonLink href={`/products/${product.handle}`} variant="outline" size="lg">
                    Full details <Arrow />
                  </ButtonLink>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* ——— Flavour rail */}
        <div className="rail mt-12 flex gap-2 overflow-x-auto pb-2" role="tablist" aria-label="Choose a flavour">
          {products.map((p, i) => (
            <button
              key={p.handle}
              role="tab"
              aria-selected={i === index}
              onClick={() => go(i)}
              style={worldVars(p.world)}
              className={cn(
                'group relative shrink-0 rounded-pill border-2 px-4 py-2.5 text-step--1 font-semibold transition-all duration-300',
                i === index
                  ? 'border-transparent bg-[var(--world-base)] text-[var(--world-ink)] shadow-lift'
                  : 'border-charcoal/12 text-charcoal-muted hover:border-charcoal/35 hover:text-charcoal',
              )}
            >
              <span
                className="mr-2 inline-block h-2.5 w-2.5 rounded-full align-middle"
                style={{ background: p.world.base, outline: '1px solid rgba(0,0,0,0.12)' }}
                aria-hidden
              />
              {p.shortName}
            </button>
          ))}
        </div>

        <p className="mt-8 max-w-prose text-step--1 text-charcoal-muted">
          <span className="font-semibold text-charcoal">Art direction:</span>{' '}
          {product.world.environment}
        </p>

        <div className="mt-8">
          <Link
            href="/flavours"
            className="group inline-flex items-center gap-2 font-semibold underline decoration-charcoal/25 decoration-2 underline-offset-[6px] transition hover:decoration-charcoal"
          >
            See all ten side by side <Arrow />
          </Link>
        </div>
      </div>
    </section>
  );
}

/** Five-segment intensity readout. */
function Meter({ label, value }: { label: string; value: number }) {
  return (
    <div>
      <div className="flex items-baseline justify-between">
        <span className="font-mono text-[0.64rem] font-semibold uppercase tracking-[0.16em] text-charcoal-muted">
          {label}
        </span>
        <span className="text-step--1 font-semibold tabular-nums">{value}/5</span>
      </div>
      <div className="mt-2 flex gap-1" role="img" aria-label={`${label}: ${value} out of 5`}>
        {[1, 2, 3, 4, 5].map((n) => (
          <motion.span
            key={n}
            className="h-1.5 flex-1 rounded-pill"
            style={{ background: n <= value ? 'var(--world-deep)' : 'rgba(20,17,15,0.12)' }}
            initial={{ scaleX: 0.2, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ delay: n * 0.05, duration: 0.35 }}
          />
        ))}
      </div>
    </div>
  );
}
