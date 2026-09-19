'use client';

import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, Lightformer, AdaptiveDpr, AdaptiveEvents, ContactShadows } from '@react-three/drei';
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
 * bubble field, and no texture, model or environment map fetched over the
 * network — see StudioEnvironment below.
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
          <StudioEnvironment />
        </Suspense>
        </Canvas>
    </div>
  );
}

/**
 * Studio lighting rig, built from geometry rather than an HDR file.
 *
 * drei's `<Environment preset="...">` looks great but fetches a ~1 MB .hdr
 * from a third-party CDN at runtime. That is a hard external dependency in the
 * render path: when the fetch fails the loader throws inside Suspense and takes
 * the whole page down with it, and even when it succeeds it is a megabyte on
 * the critical path for a decorative background.
 *
 * Building the environment map from Lightformers instead keeps the aluminium
 * reflections that make the can read as metal, costs nothing over the network,
 * and cannot fail. The rig is a standard three-point setup: a broad key panel,
 * a cooler fill opposite, and two thin strips that draw the vertical
 * highlights down the side of the can.
 */
function StudioEnvironment() {
  return (
    <Environment resolution={128} frames={1}>
      <group>
        {/* Key */}
        <Lightformer
          form="rect"
          intensity={2.6}
          position={[2.5, 3, 2]}
          rotation={[-Math.PI / 4, 0, 0]}
          scale={[6, 6, 1]}
          color="#ffffff"
        />
        {/* Fill */}
        <Lightformer
          form="rect"
          intensity={0.9}
          position={[-3.5, 1, -1.5]}
          rotation={[0, Math.PI / 2.4, 0]}
          scale={[5, 5, 1]}
          color="#e8f0ff"
        />
        {/* Edge strips — these are what become the long vertical highlights */}
        <Lightformer
          form="rect"
          intensity={3.2}
          position={[-2, 0, 1.5]}
          rotation={[0, Math.PI / 3, 0]}
          scale={[0.35, 5, 1]}
          color="#ffffff"
        />
        <Lightformer
          form="rect"
          intensity={2.2}
          position={[2, 0.4, 1.2]}
          rotation={[0, -Math.PI / 3, 0]}
          scale={[0.25, 4.5, 1]}
          color="#fff6e8"
        />
        {/* Ground bounce */}
        <Lightformer
          form="rect"
          intensity={0.5}
          position={[0, -3, 0]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={[8, 8, 1]}
          color="#fffdf7"
        />
      </group>
    </Environment>
  );
}
