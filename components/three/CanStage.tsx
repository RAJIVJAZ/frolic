'use client';

import { Suspense, useEffect, useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, AdaptiveDpr, AdaptiveEvents, ContactShadows } from '@react-three/drei';
import { useReducedMotion } from 'framer-motion';
import { SodaCan } from './SodaCan';
import { Bubbles, FloatingForms } from './Bubbles';
import type { Product } from '@/lib/products';

/**
 * WebGL stage wrapper.
 *
 * Performance contract (see docs/06-motion-spec.md):
 *  - never mounts until the section is within 200px of the viewport
 *  - never mounts at all under prefers-reduced-motion or without WebGL
 *  - dpr is capped at 2 and AdaptiveDpr drops it under load
 *  - `frameloop="demand"` is NOT used here because the scene animates
 *    continuously; instead the whole canvas unmounts when scrolled away.
 */

function hasWebGL(): boolean {
  try {
    const canvas = document.createElement('canvas');
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext('webgl2') || canvas.getContext('webgl'))
    );
  } catch {
    return false;
  }
}

export function useNearViewport<T extends HTMLElement>(rootMargin = '200px') {
  const ref = useRef<T>(null);
  const [near, setNear] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || near) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setNear(true);
          io.disconnect();
        }
      },
      { rootMargin },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [near, rootMargin]);

  return [ref, near] as const;
}

export type CanStageProps = {
  product: Product;
  /** Rotation nudge, typically wired to scroll progress. */
  rotationOffset?: number;
  className?: string;
  bubbles?: number;
  showForms?: boolean;
  scale?: number;
  /** Rendered instead of the canvas when WebGL/motion is unavailable. */
  fallback?: React.ReactNode;
};

export function CanStage({
  product,
  rotationOffset = 0,
  className,
  bubbles = 90,
  showForms = true,
  scale = 1,
  fallback,
}: CanStageProps) {
  const [ref, near] = useNearViewport<HTMLDivElement>();
  const reduce = useReducedMotion();
  const [webgl, setWebgl] = useState<boolean | null>(null);

  useEffect(() => setWebgl(hasWebGL()), []);

  const spec = {
    name: product.shortName,
    notes: product.notes,
    base: product.world.base,
    deep: product.world.deep,
    ink: product.world.ink,
    fibreGrams: product.nutrition.prebioticFibreG,
  };

  const active = near && webgl === true && !reduce;

  return (
    <div ref={ref} className={className}>
      {active ? (
        <Canvas
          camera={{ position: [0, 0.08, 3.1], fov: 34 }}
          dpr={[1, 2]}
          gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
          // The scene is decorative; its meaning is conveyed by the surrounding
          // copy and the 2D fallback, so it is hidden from assistive tech.
          aria-hidden
          style={{ touchAction: 'pan-y' }}
        >
          <AdaptiveDpr pixelated />
          <AdaptiveEvents />
          <ambientLight intensity={0.85} />
          <directionalLight position={[3, 4, 3]} intensity={1.5} castShadow />
          <directionalLight position={[-3, 1.5, -2]} intensity={0.6} color={product.world.base} />
          <Suspense fallback={null}>
            <SodaCan spec={spec} rotationOffset={rotationOffset} scale={scale} />
            <Bubbles count={bubbles} spread={2.6} height={4} />
            {showForms && (
              <FloatingForms
                colors={[product.world.base, product.world.deep, '#FFFDF7']}
                count={6}
              />
            )}
            <ContactShadows
              position={[0, -0.95, 0]}
              opacity={0.3}
              scale={4}
              blur={2.6}
              far={1.6}
            />
            <Environment preset="studio" />
          </Suspense>
        </Canvas>
      ) : (
        fallback ?? <CanFallback product={product} />
      )}
    </div>
  );
}

/**
 * Pure-CSS can. Renders during SSR, on reduced-motion, and on devices without
 * WebGL — so the hero is never an empty box. Also what Lighthouse measures,
 * which is largely why the LCP budget is achievable at all.
 */
export function CanFallback({ product, className }: { product: Product; className?: string }) {
  return (
    <div className={className ?? 'grid h-full w-full place-items-center'}>
      <div
        className="relative aspect-[53/134] w-[38%] max-w-[13rem] overflow-hidden rounded-[14%/5%] shadow-float"
        style={{
          background: `linear-gradient(170deg, ${product.world.base} 0%, ${product.world.base} 62%, ${product.world.deep} 100%)`,
        }}
      >
        <div className="absolute inset-x-0 top-0 h-[7%] bg-gradient-to-b from-white/70 to-transparent" />
        <div
          className="absolute inset-y-0 left-[14%] w-[6%] bg-white/25 blur-[2px]"
          aria-hidden
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 px-2 text-center">
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
            className="rounded-pill px-2 py-1 font-sans text-[0.5rem] font-bold uppercase leading-tight tracking-wider"
            style={{ background: product.world.ink, color: product.world.base }}
          >
            {product.shortName}
          </span>
        </div>
      </div>
    </div>
  );
}
