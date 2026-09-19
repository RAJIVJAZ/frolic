'use client';

import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, AdaptiveDpr, AdaptiveEvents, ContactShadows } from '@react-three/drei';
import { SodaCan } from './SodaCan';
import { Bubbles, FloatingForms } from './Bubbles';
import type { Product } from '@/lib/products';

/**
 * The WebGL scene itself.
 *
 * Never imported directly by a page — LazyCanStage decides whether this module
 * should be fetched at all, so three.js stays out of the initial bundle on
 * every route. By the time this renders, the capability and visibility checks
 * have already passed.
 *
 * Performance contract (docs/06-motion-spec.md): dpr capped at 2 with
 * AdaptiveDpr dropping it under load, one instanced draw call for the whole
 * bubble field, and no texture or model fetched over the network.
 */

export type CanStageProps = {
  product: Product;
  /** Rotation nudge, typically wired to scroll progress. A ref, so scroll
   *  updates drive the 3D scene without re-rendering the React tree. */
  rotationRef?: React.MutableRefObject<number>;
  className?: string;
  bubbles?: number;
  showForms?: boolean;
  scale?: number;
};

export function CanStage({
  product,
  rotationRef,
  className,
  bubbles = 90,
  showForms = true,
  scale = 1,
}: CanStageProps) {
  const spec = {
    name: product.shortName,
    notes: product.notes,
    base: product.world.base,
    deep: product.world.deep,
    ink: product.world.ink,
    fibreGrams: product.nutrition.prebioticFibreG,
  };

  return (
    <div className={className}>
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
          <SodaCan spec={spec} rotationRef={rotationRef} scale={scale} />
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
    </div>
  );
}
