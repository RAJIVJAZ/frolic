'use client';

import Link from 'next/link';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { type Product, formatINR, unitPriceFor } from '@/lib/products';
import { worldVars, cn } from '@/lib/utils';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { useCart } from '@/lib/cart';

export function ProductCard({
  product,
  packSize = 12,
  className,
}: {
  product: Product;
  packSize?: number;
  className?: string;
}) {
  const add = useCart((s) => s.add);
  const [added, setAdded] = useState(false);
  const packPrice = unitPriceFor(product, packSize) * packSize;

  function handleAdd() {
    add({ handle: product.handle, packSize, subscribe: false });
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1600);
  }

  return (
    <article
      className={cn(
        'group relative flex h-full flex-col overflow-hidden rounded-card border border-charcoal-line bg-cream transition-all duration-500 ease-frolic hover:-translate-y-1 hover:shadow-float',
        className,
      )}
      style={worldVars(product.world)}
    >
      <Link href={`/products/${product.handle}`} className="flex flex-1 flex-col">
        {/* ——— Can well */}
        <div
          className="relative grid aspect-[4/5] place-items-center overflow-hidden"
          style={{ background: product.world.wash }}
        >
          <div
            aria-hidden
            className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            style={{
              background: `radial-gradient(75% 60% at 50% 55%, ${product.world.base}55, transparent 70%)`,
            }}
          />

          {/* Rising bubbles on hover — CSS only, zero JS per card. */}
          <div aria-hidden className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
            {[14, 32, 48, 66, 82].map((left, i) => (
              <span
                key={left}
                className="absolute bottom-0 block rounded-full bg-white/60 animate-rise"
                style={{
                  left: `${left}%`,
                  width: `${5 + (i % 3) * 3}px`,
                  height: `${5 + (i % 3) * 3}px`,
                  ['--rise-duration' as string]: `${5 + i * 0.7}s`,
                  ['--drift' as string]: `${(i % 2 ? 1 : -1) * 14}px`,
                  animationDelay: `${i * 0.8}s`,
                }}
              />
            ))}
          </div>

          <motion.div
            className="relative aspect-[53/134] w-[36%] overflow-hidden rounded-[14%/5%] shadow-float"
            style={{
              background: `linear-gradient(168deg, ${product.world.base} 0%, ${product.world.base} 60%, ${product.world.deep} 100%)`,
            }}
            whileHover={{ rotate: -3, y: -6 }}
            transition={{ type: 'spring', stiffness: 260, damping: 18 }}
          >
            <span className="absolute inset-x-0 top-0 block h-[7%] bg-gradient-to-b from-white/70 to-transparent" />
            <span className="absolute inset-y-0 left-[15%] block w-[5%] bg-white/25 blur-[2px]" />
            <span className="absolute inset-0 flex flex-col items-center justify-center gap-1.5 px-1 text-center">
              <span
                className="font-mono text-[0.38rem] font-bold uppercase tracking-[0.18em] opacity-75"
                style={{ color: product.world.ink }}
              >
                Prebiotic Soda
              </span>
              <span
                className="font-display text-[1.25rem] font-black leading-none"
                style={{ color: product.world.ink }}
              >
                FROLIC
              </span>
              <span
                className="rounded-pill px-1.5 py-[3px] text-[0.4rem] font-bold uppercase leading-tight tracking-wider"
                style={{ background: product.world.ink, color: product.world.base }}
              >
                {product.shortName}
              </span>
            </span>
          </motion.div>

          {(product.badge || product.isNew) && (
            <Badge tone="ink" className="absolute left-4 top-4">
              {product.badge ?? 'New'}
            </Badge>
          )}
        </div>

        {/* ——— Detail */}
        <div className="flex flex-1 flex-col p-5">
          <h3 className="text-step-1 leading-tight">{product.name}</h3>
          <p className="mt-1.5 text-step--1 text-charcoal-muted">{product.notes.join(' · ')}</p>

          <dl className="mt-4 flex flex-wrap gap-x-4 gap-y-1 font-mono text-[0.64rem] uppercase tracking-[0.1em] text-charcoal-muted">
            <div className="flex gap-1">
              <dt className="sr-only">Prebiotic fibre</dt>
              <dd className="font-bold text-charcoal">{product.nutrition.prebioticFibreG}g fibre</dd>
            </div>
            <div className="flex gap-1">
              <dt className="sr-only">Energy</dt>
              <dd>{product.nutrition.energyKcal} kcal</dd>
            </div>
            <div className="flex gap-1">
              <dt className="sr-only">Added sugar</dt>
              <dd>{product.nutrition.addedSugarG}g added sugar</dd>
            </div>
          </dl>

          <p className="mt-auto pt-5 text-step-0">
            <span className="font-display font-black">{formatINR(packPrice)}</span>
            <span className="ml-2 text-step--1 text-charcoal-muted">
              {packSize}-pack · {formatINR(unitPriceFor(product, packSize))}/can
            </span>
          </p>
        </div>
      </Link>

      <div className="px-5 pb-5">
        <Button
          variant={added ? 'world' : 'primary'}
          className="w-full"
          onClick={handleAdd}
          aria-live="polite"
        >
          {added ? 'Added ✳' : `Add ${packSize}-pack`}
        </Button>
      </div>
    </article>
  );
}
