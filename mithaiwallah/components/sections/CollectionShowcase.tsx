'use client';

import Link from 'next/link';
import { useState } from 'react';
import { AnimatePresence, LazyMotion, domAnimation, m } from 'framer-motion';
import { SweetArt } from '@/components/art/SweetArt';
import { ArchFrame } from '@/components/ui/ArchFrame';
import { Icon } from '@/components/ui/Icon';
import { PRODUCTS } from '@/lib/products';
import { cn } from '@/lib/utils';

/**
 * One sweet at a time, Apple-product-picker style: pick a name, the plate,
 * story, ingredients and serving notes change together. Every product also
 * has its own full page for search; this is the browse surface.
 */
export function CollectionShowcase() {
  const [active, setActive] = useState(0);
  const p = PRODUCTS[active];

  return (
    <LazyMotion features={domAnimation} strict>
      <div role="tablist" aria-label="Signature sweets" className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-2 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:justify-center sm:px-0">
        {PRODUCTS.map((item, i) => (
          <button
            key={item.slug}
            role="tab"
            id={`tab-${item.slug}`}
            aria-selected={i === active}
            aria-controls={`panel-${item.slug}`}
            onClick={() => setActive(i)}
            className={cn(
              'shrink-0 rounded-full border px-5 py-2.5 text-sm font-semibold transition-all duration-500 ease-luxe',
              i === active
                ? 'border-maroon bg-maroon text-cream shadow-[0_10px_24px_-12px_rgba(107,16,36,0.8)]'
                : 'border-gold-300/70 bg-cream-50 text-ink-soft hover:border-maroon/40 hover:text-maroon',
            )}
          >
            {item.name}
          </button>
        ))}
      </div>

      <div
        role="tabpanel"
        id={`panel-${p.slug}`}
        aria-labelledby={`tab-${p.slug}`}
        className="mt-12 grid items-center gap-12 lg:grid-cols-2 lg:gap-20"
      >
        <AnimatePresence mode="wait">
          <m.div
            key={p.slug}
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto w-full max-w-lg"
          >
            <ArchFrame tone={p.tone} className="aspect-square">
              <div className="absolute inset-x-0 top-[12%] text-center">
                <span className="font-hindi text-4xl text-gold-700/60 sm:text-5xl">{p.hindi}</span>
              </div>
              <SweetArt variant={p.art} title={`${p.name}, plated`} className="absolute bottom-[4%] left-1/2 w-[112%] max-w-none -translate-x-1/2" />
            </ArchFrame>
          </m.div>
        </AnimatePresence>

        <AnimatePresence mode="wait">
          <m.div
            key={p.slug + '-copy'}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="eyebrow">{p.tagline}</p>
            <h3 className="mt-4 font-display text-display-sm font-semibold text-maroon">{p.name}</h3>
            <p className="mt-5 text-[1.05rem] leading-relaxed text-ink-soft">{p.story[0]}</p>

            <div className="mt-8 grid gap-8 sm:grid-cols-2">
              <div>
                <h4 className="label">Ingredients</h4>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {p.ingredients.map((ing) => (
                    <li key={ing} className="rounded-full border border-gold-300/70 bg-cream-50 px-3 py-1 text-[0.82rem] text-ink-soft">
                      {ing}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="label">Serving suggestions</h4>
                <ul className="mt-3 space-y-2">
                  {p.serving.slice(0, 2).map((s) => (
                    <li key={s} className="flex gap-2 text-[0.92rem] leading-relaxed text-ink-muted">
                      <Icon name="sparkle" className="mt-0.5 h-4 w-4 shrink-0 text-gold-600" />
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link
                href={`/sweets/${p.slug}`}
                className="group inline-flex items-center gap-2 rounded-full bg-maroon px-6 py-3 text-sm font-semibold text-cream transition hover:bg-maroon-700"
              >
                Discover {p.name}
                <Icon name="arrow" className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link href={`/contact?type=wholesale&product=${p.slug}#enquire`} className="text-sm font-semibold text-maroon underline decoration-gold-400 underline-offset-4">
                Bulk & wholesale enquiry
              </Link>
            </div>
          </m.div>
        </AnimatePresence>
      </div>
    </LazyMotion>
  );
}
