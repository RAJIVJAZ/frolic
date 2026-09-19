'use client';

import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { products, formatINR, SUBSCRIPTION_DISCOUNT } from '@/lib/products';
import { Button } from '@/components/ui/Button';
import { useCart } from '@/lib/cart';
import { cn, worldVars } from '@/lib/utils';

/**
 * Mix-and-match bundle builder.
 *
 * The bundle price is derived from the box tier rather than per-flavour, so a
 * 12-can box costs the same whether it holds one flavour or six. That keeps
 * the pricing explainable and removes any reason to hesitate over the mix.
 */

const TIERS = [
  { size: 12, discount: 0.08, label: '12 cans' },
  { size: 24, discount: 0.15, label: '24 cans' },
] as const;

/** Flat per-can base for bundles — averages the ₹120/₹130 catalogue split. */
const BASE_PRICE = 124;

export function BundleBuilder() {
  const [size, setSize] = useState<12 | 24>(12);
  const [subscribe, setSubscribe] = useState(true);
  const [picks, setPicks] = useState<Record<string, number>>({});
  const add = useCart((s) => s.add);

  const tier = TIERS.find((t) => t.size === size)!;
  const placed = useMemo(() => Object.values(picks).reduce((a, b) => a + b, 0), [picks]);
  const remaining = size - placed;
  const full = remaining === 0;

  const unitPrice = Math.round(
    BASE_PRICE * (1 - tier.discount) * (1 - (subscribe ? SUBSCRIPTION_DISCOUNT : 0)),
  );
  const total = unitPrice * size;
  const saving = BASE_PRICE * size - total;

  function bump(handle: string, delta: number) {
    setPicks((prev) => {
      const next = Math.max(0, (prev[handle] ?? 0) + delta);
      if (delta > 0 && remaining <= 0) return prev;
      const updated = { ...prev, [handle]: next };
      if (next === 0) delete updated[handle];
      return updated;
    });
  }

  function changeSize(next: 12 | 24) {
    setSize(next);
    // Shrinking the box can leave it over-filled; trim from the end rather
    // than silently dropping the customer's earliest choices.
    setPicks((prev) => {
      let budget = next;
      const trimmed: Record<string, number> = {};
      for (const [handle, qty] of Object.entries(prev)) {
        const take = Math.min(qty, budget);
        if (take > 0) trimmed[handle] = take;
        budget -= take;
      }
      return trimmed;
    });
  }

  function fillRandomly() {
    const shuffled = [...products].sort(() => Math.random() - 0.5);
    const next: Record<string, number> = {};
    let budget = size;
    let i = 0;
    while (budget > 0) {
      const handle = shuffled[i % shuffled.length].handle;
      const take = Math.min(budget, i < shuffled.length ? Math.ceil(size / 6) : 1);
      next[handle] = (next[handle] ?? 0) + take;
      budget -= take;
      i++;
    }
    setPicks(next);
  }

  function addToCart() {
    // Each flavour becomes its own line so the drawer stays legible, but they
    // all carry the box's per-can price — a 4-can share of a 24-can box is not
    // re-priced as a 4-can pack.
    Object.entries(picks).forEach(([handle, qty]) => {
      add({
        handle,
        packSize: qty,
        subscribe,
        quantity: 1,
        unitPrice,
        note: `Part of your ${size}-can box`,
      });
    });
    setPicks({});
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:gap-12 lg:items-start">
      {/* ——— Flavour picker */}
      <div>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex rounded-pill border-2 border-charcoal/12 p-1">
            {TIERS.map((t) => (
              <button
                key={t.size}
                onClick={() => changeSize(t.size)}
                aria-pressed={size === t.size}
                className={cn(
                  'rounded-pill px-5 py-2 text-step--1 font-semibold transition-colors',
                  size === t.size ? 'bg-charcoal text-cream' : 'text-charcoal-muted hover:text-charcoal',
                )}
              >
                {t.label} · −{Math.round(t.discount * 100)}%
              </button>
            ))}
          </div>
          <button
            onClick={fillRandomly}
            className="text-step--1 font-semibold underline decoration-charcoal/25 decoration-2 underline-offset-4 hover:decoration-charcoal"
          >
            Surprise me
          </button>
        </div>

        <ul className="mt-6 grid gap-3 sm:grid-cols-2">
          {products.map((product) => {
            const qty = picks[product.handle] ?? 0;
            return (
              <li
                key={product.handle}
                style={worldVars(product.world)}
                className={cn(
                  'flex items-center gap-3 rounded-card border-2 p-3 transition-all duration-300',
                  qty > 0 ? 'border-[var(--world-deep)] bg-[var(--world-base)]/[0.09]' : 'border-charcoal/10',
                )}
              >
                <span
                  className="grid h-14 w-10 shrink-0 place-items-center rounded-md"
                  style={{
                    background: `linear-gradient(165deg, ${product.world.base}, ${product.world.deep})`,
                  }}
                  aria-hidden
                >
                  <span
                    className="font-display text-[0.5rem] font-black"
                    style={{ color: product.world.ink }}
                  >
                    FROLIC
                  </span>
                </span>

                <div className="min-w-0 flex-1">
                  <p className="truncate font-semibold leading-tight">{product.shortName}</p>
                  <p className="truncate text-[0.7rem] text-charcoal-muted">
                    {product.notes.slice(0, 2).join(' · ')}
                  </p>
                </div>

                <div className="flex shrink-0 items-center rounded-pill border border-charcoal/15">
                  <button
                    onClick={() => bump(product.handle, -1)}
                    disabled={qty === 0}
                    aria-label={`Remove one ${product.shortName}`}
                    className="grid h-9 w-9 place-items-center rounded-pill text-step-1 leading-none disabled:opacity-25 hover:bg-charcoal/5"
                  >
                    −
                  </button>
                  <span className="w-6 text-center text-step--1 font-bold tabular-nums">{qty}</span>
                  <button
                    onClick={() => bump(product.handle, 1)}
                    disabled={full}
                    aria-label={`Add one ${product.shortName}`}
                    className="grid h-9 w-9 place-items-center rounded-pill text-step-1 leading-none disabled:opacity-25 hover:bg-charcoal/5"
                  >
                    +
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      </div>

      {/* ——— Box summary */}
      <aside className="lg:sticky lg:top-24">
        <div className="rounded-panel border border-charcoal-line bg-cream p-6 shadow-lift">
          <div className="flex items-baseline justify-between">
            <h2 className="text-step-2">Your box</h2>
            <span className="font-mono text-[0.72rem] font-bold tabular-nums text-charcoal-muted">
              {placed}/{size}
            </span>
          </div>

          <div className="mt-3 h-2 overflow-hidden rounded-pill bg-charcoal/10">
            <motion.div
              className={cn('h-full rounded-pill', full ? 'bg-mint' : 'bg-charcoal')}
              initial={false}
              animate={{ width: `${(placed / size) * 100}%` }}
              transition={{ type: 'spring', stiffness: 200, damping: 28 }}
            />
          </div>

          <p className="mt-2.5 text-step--1 text-charcoal-muted" aria-live="polite">
            {full ? 'Box is full — ready to go.' : `${remaining} can${remaining === 1 ? '' : 's'} left to choose.`}
          </p>

          {/* Visual stack of chosen cans */}
          <div className="mt-5 flex min-h-[3.5rem] flex-wrap gap-1">
            <AnimatePresence mode="popLayout">
              {Object.entries(picks).flatMap(([handle, qty]) => {
                const product = products.find((p) => p.handle === handle)!;
                return Array.from({ length: qty }, (_, i) => (
                  <motion.span
                    key={`${handle}-${i}`}
                    layout
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 26 }}
                    title={product.shortName}
                    className="h-11 w-4 rounded-sm"
                    style={{
                      background: `linear-gradient(170deg, ${product.world.base}, ${product.world.deep})`,
                    }}
                  />
                ));
              })}
            </AnimatePresence>
          </div>

          <label className="mt-6 flex cursor-pointer items-start gap-3 rounded-card border-2 border-charcoal/12 p-4 transition-colors has-[:checked]:border-charcoal has-[:checked]:bg-charcoal/[0.04]">
            <input
              type="checkbox"
              checked={subscribe}
              onChange={(e) => setSubscribe(e.target.checked)}
              className="mt-1 h-5 w-5 shrink-0 accent-charcoal"
            />
            <span>
              <span className="block font-semibold">
                Deliver it regularly, save {Math.round(SUBSCRIPTION_DISCOUNT * 100)}%
              </span>
              <span className="mt-0.5 block text-step--1 text-charcoal-muted">
                Change the mix or skip a box anytime.
              </span>
            </span>
          </label>

          <dl className="mt-6 space-y-1.5 border-t border-charcoal-line pt-5 text-step--1">
            <div className="flex justify-between">
              <dt className="text-charcoal-muted">Per can</dt>
              <dd className="font-semibold tabular-nums">{formatINR(unitPrice)}</dd>
            </div>
            {saving > 0 && (
              <div className="flex justify-between text-mint-700">
                <dt>You save</dt>
                <dd className="font-semibold tabular-nums">−{formatINR(saving)}</dd>
              </div>
            )}
            <div className="flex justify-between pt-1.5 text-step-1">
              <dt className="font-semibold">Box total</dt>
              <dd className="font-display font-black tabular-nums">{formatINR(total)}</dd>
            </div>
          </dl>

          <Button
            variant="primary"
            size="lg"
            className="mt-5 w-full"
            disabled={!full}
            onClick={addToCart}
          >
            {full ? 'Add box to cart' : `Choose ${remaining} more`}
          </Button>
        </div>
      </aside>
    </div>
  );
}
