'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { products, unitPriceFor, SUBSCRIPTION_DISCOUNT } from './products';

export type CartLine = {
  /** Stable key: handle + packSize + purchase mode. */
  id: string;
  handle: string;
  packSize: number;
  subscribe: boolean;
  quantity: number;
};

type CartState = {
  lines: CartLine[];
  isOpen: boolean;
  /** Set once the persisted cart has rehydrated, so we never render a
   *  server-empty cart badge over a client-full one. */
  hydrated: boolean;
  add: (input: Omit<CartLine, 'id' | 'quantity'> & { quantity?: number }) => void;
  setQuantity: (id: string, quantity: number) => void;
  remove: (id: string) => void;
  clear: () => void;
  setHydrated: () => void;
  open: () => void;
  close: () => void;
  toggle: () => void;
};

const lineId = (handle: string, packSize: number, subscribe: boolean) =>
  `${handle}:${packSize}:${subscribe ? 'sub' : 'once'}`;

export const useCart = create<CartState>()(
  persist(
    (set) => ({
      lines: [],
      isOpen: false,
      hydrated: false,

      add: ({ handle, packSize, subscribe, quantity = 1 }) =>
        set((state) => {
          const id = lineId(handle, packSize, subscribe);
          const existing = state.lines.find((l) => l.id === id);
          const lines = existing
            ? state.lines.map((l) =>
                l.id === id ? { ...l, quantity: l.quantity + quantity } : l,
              )
            : [...state.lines, { id, handle, packSize, subscribe, quantity }];
          return { lines, isOpen: true };
        }),

      setQuantity: (id, quantity) =>
        set((state) => ({
          lines:
            quantity <= 0
              ? state.lines.filter((l) => l.id !== id)
              : state.lines.map((l) => (l.id === id ? { ...l, quantity } : l)),
        })),

      remove: (id) => set((state) => ({ lines: state.lines.filter((l) => l.id !== id) })),
      clear: () => set({ lines: [] }),
      setHydrated: () => set({ hydrated: true }),
      open: () => set({ isOpen: true }),
      close: () => set({ isOpen: false }),
      toggle: () => set((s) => ({ isOpen: !s.isOpen })),
    }),
    {
      name: 'frolic-cart-v1',
      storage: createJSONStorage(() => localStorage),
      // `isOpen` is deliberately not persisted — nobody wants the drawer
      // waiting for them on their next visit.
      partialize: (state) => ({ lines: state.lines }),
      // Fires after the persisted lines are merged in. Components gate their
      // cart-count render on this so SSR markup and first paint agree.
      onRehydrateStorage: () => (state) => state?.setHydrated(),
    },
  ),
);

/* ——— Derived values ———————————————————————————————————————————— */

export type CartTotals = {
  cans: number;
  subtotal: number;
  savings: number;
  hasSubscription: boolean;
  /** Free shipping over ₹999. */
  shipping: number;
  total: number;
};

export const FREE_SHIPPING_THRESHOLD = 999;
const FLAT_SHIPPING = 79;

export function lineSubtotal(line: CartLine): number {
  const product = products.find((p) => p.handle === line.handle);
  if (!product) return 0;
  return unitPriceFor(product, line.packSize, line.subscribe) * line.packSize * line.quantity;
}

export function lineListPrice(line: CartLine): number {
  const product = products.find((p) => p.handle === line.handle);
  if (!product) return 0;
  return product.price * line.packSize * line.quantity;
}

export function computeTotals(lines: CartLine[]): CartTotals {
  const subtotal = lines.reduce((sum, l) => sum + lineSubtotal(l), 0);
  const listTotal = lines.reduce((sum, l) => sum + lineListPrice(l), 0);
  const cans = lines.reduce((sum, l) => sum + l.packSize * l.quantity, 0);
  const shipping = subtotal === 0 || subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : FLAT_SHIPPING;
  return {
    cans,
    subtotal,
    savings: listTotal - subtotal,
    hasSubscription: lines.some((l) => l.subscribe),
    shipping,
    total: subtotal + shipping,
  };
}

export { SUBSCRIPTION_DISCOUNT };
