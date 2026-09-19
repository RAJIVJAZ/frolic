'use client';

import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { products } from '@/lib/products';
import { ProductCard } from './ProductCard';
import { cn } from '@/lib/utils';

const FILTERS = [
  { id: 'all', label: 'All ten' },
  { id: 'citrus', label: 'Citrus' },
  { id: 'spiced', label: 'Spiced' },
  { id: 'fruity', label: 'Fruity' },
  { id: 'tart', label: 'Tart' },
  { id: 'herbal', label: 'Herbal' },
] as const;

const SORTS = [
  { id: 'featured', label: 'Featured' },
  { id: 'sugar', label: 'Lowest sugar' },
  { id: 'intensity', label: 'Boldest' },
  { id: 'price', label: 'Price' },
] as const;

export function ShopGrid() {
  const [filter, setFilter] = useState<string>('all');
  const [sort, setSort] = useState<string>('featured');

  const list = useMemo(() => {
    const filtered =
      filter === 'all'
        ? [...products]
        : products.filter((p) => (p.profile as readonly string[]).includes(filter));

    switch (sort) {
      case 'sugar':
        return filtered.sort((a, b) => a.nutrition.totalSugarG - b.nutrition.totalSugarG);
      case 'intensity':
        return filtered.sort((a, b) => b.intensity - a.intensity);
      case 'price':
        return filtered.sort((a, b) => a.price - b.price);
      default:
        // Bestsellers first, then catalogue order.
        return filtered.sort((a, b) => Number(!!b.isBestseller) - Number(!!a.isBestseller));
    }
  }, [filter, sort]);

  return (
    <>
      <div className="flex flex-col gap-4 border-y border-charcoal-line py-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="rail flex gap-2 overflow-x-auto" role="group" aria-label="Filter by flavour profile">
          {FILTERS.map((f) => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              aria-pressed={filter === f.id}
              className={cn(
                'shrink-0 rounded-pill border-2 px-4 py-2 text-step--1 font-semibold transition-all duration-300',
                filter === f.id
                  ? 'border-transparent bg-charcoal text-cream'
                  : 'border-charcoal/12 text-charcoal-muted hover:border-charcoal/40 hover:text-charcoal',
              )}
            >
              {f.label}
            </button>
          ))}
        </div>

        <label className="flex shrink-0 items-center gap-2 text-step--1">
          <span className="font-mono text-[0.66rem] uppercase tracking-[0.14em] text-charcoal-muted">
            Sort
          </span>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="min-h-[2.75rem] rounded-pill border-2 border-charcoal/12 bg-cream px-4 font-semibold focus:border-charcoal focus:outline-none"
          >
            {SORTS.map((s) => (
              <option key={s.id} value={s.id}>{s.label}</option>
            ))}
          </select>
        </label>
      </div>

      <p className="mt-5 text-step--1 text-charcoal-muted" aria-live="polite">
        Showing {list.length} of {products.length} flavours
      </p>

      <motion.ul layout className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <AnimatePresence mode="popLayout">
          {list.map((product) => (
            <motion.li
              key={product.handle}
              layout
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.94 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <ProductCard product={product} />
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>

      {list.length === 0 && (
        <p className="py-16 text-center text-charcoal-muted">
          Nothing matches that filter yet. Try another profile.
        </p>
      )}
    </>
  );
}
