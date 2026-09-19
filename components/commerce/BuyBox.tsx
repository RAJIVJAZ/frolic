'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  type Product,
  PACK_SIZES,
  SUBSCRIPTION_DISCOUNT,
  unitPriceFor,
  formatINR,
} from '@/lib/products';
import { Button } from '@/components/ui/Button';
import { useCart } from '@/lib/cart';
import { cn } from '@/lib/utils';

/**
 * Product buy box.
 *
 * Purchase mode leads, pack size follows — subscription is the higher-LTV
 * option so it is pre-selected and framed as the default, with one-time
 * purchase kept a single tap away rather than buried. Rationale in
 * docs/14-cro-strategy.md.
 */
export function BuyBox({ product }: { product: Product }) {
  const [packSize, setPackSize] = useState<number>(12);
  const [subscribe, setSubscribe] = useState(true);
  const [cadence, setCadence] = useState<2 | 4 | 6>(4);
  const add = useCart((s) => s.add);

  const unit = unitPriceFor(product, packSize, subscribe);
  const total = unit * packSize;
  const listTotal = product.price * packSize;
  const saving = listTotal - total;

  return (
    <div className="rounded-panel border border-charcoal-line bg-cream p-6 shadow-lift sm:p-7">
      {/* ——— Purchase mode */}
      <fieldset>
        <legend className="eyebrow mb-3">How often</legend>
        <div className="grid gap-2 sm:grid-cols-2">
          <ModeOption
            selected={subscribe}
            onSelect={() => setSubscribe(true)}
            title="Subscribe"
            price={`${formatINR(unitPriceFor(product, packSize, true))}/can`}
            note={`Save ${Math.round(SUBSCRIPTION_DISCOUNT * 100)}% · skip or cancel anytime`}
            flag="Best value"
          />
          <ModeOption
            selected={!subscribe}
            onSelect={() => setSubscribe(false)}
            title="One time"
            price={`${formatINR(unitPriceFor(product, packSize, false))}/can`}
            note="No commitment"
          />
        </div>
      </fieldset>

      {/* ——— Pack size */}
      <fieldset className="mt-6">
        <legend className="eyebrow mb-3">Pack size</legend>
        <div className="grid grid-cols-3 gap-2">
          {PACK_SIZES.map((tier) => (
            <button
              key={tier.size}
              onClick={() => setPackSize(tier.size)}
              aria-pressed={packSize === tier.size}
              className={cn(
                'relative rounded-card border-2 px-3 py-4 text-center transition-all duration-300 ease-elastic',
                packSize === tier.size
                  ? 'border-charcoal bg-charcoal text-cream'
                  : 'border-charcoal/12 hover:border-charcoal/40',
              )}
            >
              <span className="block font-display text-step-2 font-black leading-none">
                {tier.size}
              </span>
              <span className="mt-1.5 block text-[0.66rem] font-semibold uppercase tracking-wide opacity-70">
                cans
              </span>
              {tier.discount > 0 && (
                <span
                  className={cn(
                    'mt-2 block font-mono text-[0.6rem] font-bold',
                    packSize === tier.size ? 'text-lime' : 'text-lime-700',
                  )}
                >
                  −{Math.round(tier.discount * 100)}%
                </span>
              )}
            </button>
          ))}
        </div>
      </fieldset>

      {/* ——— Cadence */}
      {subscribe && (
        <motion.fieldset
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="mt-6 overflow-hidden"
        >
          <legend className="eyebrow mb-3">Deliver every</legend>
          <div className="flex gap-2">
            {([2, 4, 6] as const).map((weeks) => (
              <button
                key={weeks}
                onClick={() => setCadence(weeks)}
                aria-pressed={cadence === weeks}
                className={cn(
                  'flex-1 rounded-pill border-2 px-3 py-2.5 text-step--1 font-semibold transition-colors',
                  cadence === weeks
                    ? 'border-transparent bg-[var(--world-base)] text-[var(--world-ink)]'
                    : 'border-charcoal/12 text-charcoal-muted hover:border-charcoal/40',
                )}
              >
                {weeks} weeks
              </button>
            ))}
          </div>
        </motion.fieldset>
      )}

      {/* ——— Price + CTA */}
      <div className="mt-7 border-t border-charcoal-line pt-6">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="font-display text-step-3 font-black leading-none tabular-nums">
              {formatINR(total)}
            </p>
            <p className="mt-2 text-step--1 text-charcoal-muted">
              {formatINR(unit)} per can
              {saving > 0 && (
                <span className="ml-2 font-semibold text-mint-700">
                  save {formatINR(saving)}
                </span>
              )}
            </p>
          </div>
          {saving > 0 && (
            <p className="text-step--1 text-charcoal-muted line-through tabular-nums">
              {formatINR(listTotal)}
            </p>
          )}
        </div>

        <Button
          variant="world"
          size="lg"
          className="mt-5 w-full"
          onClick={() => add({ handle: product.handle, packSize, subscribe })}
        >
          {subscribe ? `Subscribe · every ${cadence} weeks` : 'Add to cart'}
        </Button>

        <ul className="mt-5 space-y-2 text-step--1 text-charcoal-muted">
          {[
            'Free shipping over ₹999',
            'Delivered in 2–4 working days across metros',
            subscribe ? 'Swap flavours or skip up to 48h before dispatch' : 'Reorder in one tap from your account',
          ].map((line) => (
            <li key={line} className="flex items-start gap-2.5">
              <span className="mt-[0.4em] h-1.5 w-1.5 shrink-0 rounded-full bg-mint" aria-hidden />
              {line}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function ModeOption({
  selected,
  onSelect,
  title,
  price,
  note,
  flag,
}: {
  selected: boolean;
  onSelect: () => void;
  title: string;
  price: string;
  note: string;
  flag?: string;
}) {
  return (
    <button
      onClick={onSelect}
      aria-pressed={selected}
      className={cn(
        'relative rounded-card border-2 p-4 text-left transition-all duration-300',
        selected ? 'border-charcoal bg-charcoal/[0.04]' : 'border-charcoal/12 hover:border-charcoal/40',
      )}
    >
      {flag && (
        <span className="absolute -top-2.5 right-3 rounded-pill bg-mint px-2.5 py-0.5 font-mono text-[0.58rem] font-bold uppercase tracking-[0.12em] text-mint-900">
          {flag}
        </span>
      )}
      <span className="flex items-center gap-2.5">
        <span
          className={cn(
            'grid h-5 w-5 shrink-0 place-items-center rounded-full border-2 transition-colors',
            selected ? 'border-charcoal' : 'border-charcoal/25',
          )}
          aria-hidden
        >
          {selected && <span className="h-2.5 w-2.5 rounded-full bg-charcoal" />}
        </span>
        <span className="font-semibold">{title}</span>
      </span>
      <span className="mt-2 block font-display text-step-1 font-black tabular-nums">{price}</span>
      <span className="mt-1 block text-[0.72rem] leading-snug text-charcoal-muted">{note}</span>
    </button>
  );
}
