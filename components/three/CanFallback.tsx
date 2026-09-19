import type { Product } from '@/lib/products';
import { cn } from '@/lib/utils';

/**
 * Pure-CSS can.
 *
 * This is what renders during SSR, on reduced-motion, on low-capability
 * devices and before the 3D chunk arrives — so the hero is never an empty
 * box, and it is what Lighthouse measures for LCP. No `three` import, so it
 * costs nothing.
 */
export function CanFallback({
  product,
  className,
  widthClass = 'w-[38%] max-w-[13rem]',
}: {
  product: Product;
  className?: string;
  widthClass?: string;
}) {
  return (
    <div className={cn('grid h-full w-full place-items-center', className)}>
      <div
        className={cn('relative aspect-[53/134] overflow-hidden rounded-[14%/5%] shadow-float', widthClass)}
        style={{
          background: `linear-gradient(168deg, ${product.world.base} 0%, ${product.world.base} 60%, ${product.world.deep} 100%)`,
        }}
      >
        <span className="absolute inset-x-0 top-0 block h-[7%] bg-gradient-to-b from-white/70 to-transparent" />
        <span className="absolute inset-y-0 left-[15%] block w-[5%] bg-white/25 blur-[2px]" aria-hidden />
        <span className="absolute inset-y-0 right-[12%] block w-[3%] bg-black/10 blur-[2px]" aria-hidden />
        <span className="absolute inset-0 flex flex-col items-center justify-center gap-2 px-2 text-center">
          <span
            className="font-mono text-[0.44rem] font-bold uppercase tracking-[0.2em] opacity-80"
            style={{ color: product.world.ink }}
          >
            Prebiotic Soda
          </span>
          <span
            className="font-display text-[1.6rem] font-black leading-none"
            style={{ color: product.world.ink }}
          >
            FROLIC
          </span>
          <span
            className="rounded-pill px-2 py-1 text-[0.5rem] font-bold uppercase leading-tight tracking-wider"
            style={{ background: product.world.ink, color: product.world.base }}
          >
            {product.shortName}
          </span>
        </span>
      </div>
    </div>
  );
}
