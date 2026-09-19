'use client';

import dynamic from 'next/dynamic';
import { useReducedMotion } from 'framer-motion';
import { useNearViewport, useCapableDevice } from './support';
import { CanFallback } from './CanFallback';
import type { Product } from '@/lib/products';

/**
 * The only entry point pages use for a 3D can.
 *
 * The gates live out here, outside the dynamic-import boundary, so three.js is
 * not merely deferred — it is never fetched at all unless the element is close
 * to the viewport AND the device looks capable AND the visitor has not asked
 * for reduced motion. Everyone else gets the CSS can, which is already on
 * screen from SSR.
 */
const CanStage = dynamic(() => import('./CanStage').then((m) => m.CanStage), {
  ssr: false,
});

export type LazyCanStageProps = {
  product: Product;
  rotationRef?: React.MutableRefObject<number>;
  className?: string;
  bubbles?: number;
  showForms?: boolean;
  scale?: number;
  fallbackWidthClass?: string;
};

export function LazyCanStage({
  product,
  rotationRef,
  className,
  bubbles = 90,
  showForms = true,
  scale = 1,
  fallbackWidthClass,
}: LazyCanStageProps) {
  const [ref, near] = useNearViewport<HTMLDivElement>();
  const capable = useCapableDevice();
  const reduce = useReducedMotion();

  const use3D = near && capable === true && !reduce;

  return (
    <div ref={ref} className={className}>
      {use3D ? (
        <CanStage
          product={product}
          rotationRef={rotationRef}
          className="h-full w-full"
          bubbles={bubbles}
          showForms={showForms}
          scale={scale}
        />
      ) : (
        <CanFallback product={product} widthClass={fallbackWidthClass} />
      )}
    </div>
  );
}
