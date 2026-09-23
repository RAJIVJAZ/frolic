'use client';

import { useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { ingredients, ingredientCategories, type Ingredient } from '@/lib/ingredients';
import { getProduct } from '@/lib/products';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Badge } from '@/components/ui/Badge';
import { cn } from '@/lib/utils';

export function Ingredients({
  limit,
  showFilter = true,
}: {
  limit?: number;
  showFilter?: boolean;
}) {
  const [filter, setFilter] = useState<string>('All');
  const [open, setOpen] = useState<string | null>(null);

  const filtered = ingredients.filter((i) => filter === 'All' || i.category === filter);
  const shown = limit ? filtered.slice(0, limit) : filtered;

  return (
    <section className="py-section" aria-label="Ingredients">
      <div className="shell">
        <SectionHeader
          eyebrow="What's actually in it"
          title={<>Ten ingredients worth naming.</>}
          body="No proprietary blends hiding behind a trademark. Tap any card for where it comes from, what it tastes like, and why it earned a place in the can."
        />

        {showFilter && (
          <div className="rail mt-9 flex gap-2 overflow-x-auto pb-1">
            {['All', ...ingredientCategories].map((c) => (
              <button
                key={c}
                onClick={() => setFilter(c)}
                aria-pressed={filter === c}
                className={cn(
                  'shrink-0 rounded-pill border-2 px-4 py-2 text-step--1 font-semibold transition-all duration-300',
                  filter === c
                    ? 'border-transparent bg-charcoal text-cream'
                    : 'border-charcoal/12 text-charcoal-muted hover:border-charcoal/35 hover:text-charcoal',
                )}
              >
                {c}
              </button>
            ))}
          </div>
        )}

        <motion.ul layout className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {shown.map((ing, i) => (
              <IngredientCard
                key={ing.slug}
                ingredient={ing}
                index={i}
                open={open === ing.slug}
                onToggle={() => setOpen(open === ing.slug ? null : ing.slug)}
              />
            ))}
          </AnimatePresence>
        </motion.ul>
      </div>
    </section>
  );
}

function IngredientCard({
  ingredient,
  index,
  open,
  onToggle,
}: {
  ingredient: Ingredient;
  index: number;
  open: boolean;
  onToggle: () => void;
}) {
  const panelId = `ing-panel-${ingredient.slug}`;

  return (
    <motion.li
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.45, delay: index * 0.04, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        'group relative overflow-hidden rounded-card border border-charcoal-line bg-cream transition-shadow duration-400',
        open ? 'shadow-float sm:col-span-2 lg:col-span-1' : 'hover:shadow-lift',
      )}
      style={{ ['--glow-tint' as string]: `${ingredient.accent}80` }}
    >
      {/* Accent wash that blooms on hover */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: `radial-gradient(120% 90% at 50% 0%, ${ingredient.accent}2e, transparent 65%)`,
        }}
      />

      <button
        onClick={onToggle}
        aria-expanded={open}
        aria-controls={panelId}
        className="relative w-full px-6 pb-5 pt-6 text-left"
      >
        <div className="flex items-start justify-between gap-3">
          <div>
            <Badge className="mb-3" tone="neutral">
              <span
                className="h-2 w-2 rounded-full"
                style={{ background: ingredient.accent }}
                aria-hidden
              />
              {ingredient.category}
            </Badge>
            <h3 className="text-step-2 leading-tight">{ingredient.name}</h3>
            {ingredient.botanical && (
              <p className="mt-1 font-display text-step--1 italic text-charcoal-muted">
                {ingredient.botanical}
              </p>
            )}
          </div>
          <span
            className={cn(
              'mt-1 grid h-9 w-9 shrink-0 place-items-center rounded-pill border-2 border-charcoal/12 text-step-1 leading-none transition-transform duration-400 ease-elastic',
              open && 'rotate-45 border-charcoal bg-charcoal text-cream',
            )}
            aria-hidden
          >
            +
          </span>
        </div>

        <p className="mt-4 text-step--1 leading-relaxed text-charcoal-muted">
          {ingredient.benefit}
        </p>

        {ingredient.dose && (
          <p className="mt-4 font-mono text-[0.66rem] font-bold uppercase tracking-[0.16em]" style={{ color: ingredient.accent }}>
            {ingredient.dose}
          </p>
        )}
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={panelId}
            key="panel"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="relative overflow-hidden"
          >
            <div className="space-y-5 border-t border-charcoal-line/70 px-6 py-6">
              <Row label="Origin" value={ingredient.origin} />
              <Row label="Flavour profile" value={ingredient.flavourProfile} />
              <p className="text-step--1 leading-relaxed text-charcoal-soft">{ingredient.detail}</p>
              <div>
                <p className="eyebrow mb-2">Find it in</p>
                <ul className="flex flex-wrap gap-2">
                  {ingredient.inFlavours.map((handle) => {
                    const p = getProduct(handle);
                    if (!p) return null;
                    return (
                      <li key={handle}>
                        <Link
                          href={`/flavours/${handle}`}
                          className="chip transition hover:border-charcoal/40 hover:bg-cream"
                        >
                          <span
                            className="h-2 w-2 rounded-full"
                            style={{ background: p.world.base }}
                            aria-hidden
                          />
                          {p.shortName}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.li>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="eyebrow">{label}</p>
      <p className="mt-1 text-step--1 text-charcoal-soft">{value}</p>
    </div>
  );
}
