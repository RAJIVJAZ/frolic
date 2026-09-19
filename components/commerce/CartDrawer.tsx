'use client';

import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect } from 'react';
import {
  useCart,
  computeTotals,
  lineSubtotal,
  FREE_SHIPPING_THRESHOLD,
} from '@/lib/cart';
import { getProduct, formatINR } from '@/lib/products';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { worldVars } from '@/lib/utils';

export function CartDrawer() {
  const { isOpen, close, lines, setQuantity, remove } = useCart();
  const totals = computeTotals(lines);
  const toFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - totals.subtotal);
  const progress = Math.min(100, (totals.subtotal / FREE_SHIPPING_THRESHOLD) * 100);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && close();
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [isOpen, close]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 z-[80] bg-charcoal/45 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
            aria-hidden
          />
          <motion.aside
            role="dialog"
            aria-modal="true"
            aria-label="Shopping cart"
            className="fixed inset-y-0 right-0 z-[90] flex w-full max-w-[28rem] flex-col bg-cream shadow-float"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 320, damping: 36 }}
          >
            <header className="flex items-center justify-between border-b border-charcoal-line px-5 py-4">
              <h2 className="font-display text-step-2">Your cart</h2>
              <button
                onClick={close}
                aria-label="Close cart"
                className="grid h-10 w-10 place-items-center rounded-pill border-2 border-charcoal/15 transition hover:bg-charcoal/5"
              >
                <svg viewBox="0 0 20 20" className="h-4 w-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M5 5l10 10M15 5L5 15" />
                </svg>
              </button>
            </header>

            {lines.length > 0 && (
              <div className="border-b border-charcoal-line px-5 py-3">
                <p className="text-step--1 text-charcoal-muted">
                  {toFreeShipping > 0 ? (
                    <>
                      <strong className="text-charcoal">{formatINR(toFreeShipping)}</strong> away from free
                      shipping
                    </>
                  ) : (
                    <strong className="text-mint-700">Free shipping unlocked ✳</strong>
                  )}
                </p>
                <div className="mt-2 h-1.5 overflow-hidden rounded-pill bg-charcoal/10">
                  <motion.div
                    className="h-full rounded-pill bg-mint"
                    initial={false}
                    animate={{ width: `${progress}%` }}
                    transition={{ type: 'spring', stiffness: 180, damping: 26 }}
                  />
                </div>
              </div>
            )}

            <div className="flex-1 overflow-y-auto px-5 py-4">
              {lines.length === 0 ? (
                <div className="grid h-full place-items-center text-center">
                  <div className="space-y-4">
                    <p className="font-display text-step-2">Nothing in here yet.</p>
                    <p className="max-w-[28ch] text-charcoal-muted">
                      Ten flavours, seven grams of fibre each. Start somewhere.
                    </p>
                    <Button onClick={close} variant="primary">
                      <Link href="/shop">Browse flavours</Link>
                    </Button>
                  </div>
                </div>
              ) : (
                <ul className="space-y-4">
                  {lines.map((line) => {
                    const product = getProduct(line.handle);
                    if (!product) return null;
                    return (
                      <li
                        key={line.id}
                        className="flex gap-4 rounded-card border border-charcoal-line/70 p-3"
                        style={worldVars(product.world)}
                      >
                        <div
                          className="grid h-20 w-14 shrink-0 place-items-center rounded-lg"
                          style={{
                            background: `linear-gradient(165deg, ${product.world.base}, ${product.world.deep})`,
                          }}
                          aria-hidden
                        >
                          <span
                            className="font-display text-[0.6rem] font-black leading-none"
                            style={{ color: product.world.ink }}
                          >
                            FROLIC
                          </span>
                        </div>

                        <div className="min-w-0 flex-1">
                          <div className="flex items-start justify-between gap-2">
                            <div className="min-w-0">
                              <p className="truncate font-semibold">{product.shortName}</p>
                              <p className="text-step--1 text-charcoal-muted">
                                {line.note ?? `${line.packSize}-can pack`}
                                {line.note && ` · ${line.packSize} cans`}
                              </p>
                            </div>
                            <button
                              onClick={() => remove(line.id)}
                              className="text-step--1 text-charcoal-muted underline underline-offset-4 hover:text-charcoal"
                            >
                              Remove
                            </button>
                          </div>

                          {line.subscribe && (
                            <Badge tone="mint" className="mt-1.5">
                              Subscription · save 20%
                            </Badge>
                          )}

                          <div className="mt-3 flex items-center justify-between gap-3">
                            <div className="flex items-center rounded-pill border border-charcoal/15">
                              <button
                                onClick={() => setQuantity(line.id, line.quantity - 1)}
                                className="grid h-9 w-9 place-items-center rounded-pill text-step-1 leading-none hover:bg-charcoal/5"
                                aria-label={`Decrease ${product.shortName} quantity`}
                              >
                                −
                              </button>
                              <span className="w-7 text-center text-step--1 font-semibold tabular-nums">
                                {line.quantity}
                              </span>
                              <button
                                onClick={() => setQuantity(line.id, line.quantity + 1)}
                                className="grid h-9 w-9 place-items-center rounded-pill text-step-1 leading-none hover:bg-charcoal/5"
                                aria-label={`Increase ${product.shortName} quantity`}
                              >
                                +
                              </button>
                            </div>
                            <span className="font-semibold tabular-nums">
                              {formatINR(lineSubtotal(line))}
                            </span>
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>

            {lines.length > 0 && (
              <footer className="space-y-3 border-t border-charcoal-line px-5 py-4">
                <dl className="space-y-1.5 text-step--1">
                  <div className="flex justify-between">
                    <dt className="text-charcoal-muted">Subtotal · {totals.cans} cans</dt>
                    <dd className="font-semibold tabular-nums">{formatINR(totals.subtotal)}</dd>
                  </div>
                  {totals.savings > 0 && (
                    <div className="flex justify-between text-mint-700">
                      <dt>You save</dt>
                      <dd className="font-semibold tabular-nums">−{formatINR(totals.savings)}</dd>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <dt className="text-charcoal-muted">Shipping</dt>
                    <dd className="font-semibold tabular-nums">
                      {totals.shipping === 0 ? 'Free' : formatINR(totals.shipping)}
                    </dd>
                  </div>
                  <div className="flex justify-between border-t border-charcoal-line pt-2 text-step-1">
                    <dt className="font-semibold">Total</dt>
                    <dd className="font-display font-black tabular-nums">{formatINR(totals.total)}</dd>
                  </div>
                </dl>
                <Button variant="primary" size="lg" className="w-full">
                  Checkout
                </Button>
                <p className="text-center font-mono text-[0.62rem] uppercase tracking-[0.14em] text-charcoal-muted">
                  Taxes calculated at checkout · UPI, cards, COD
                </p>
              </footer>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
