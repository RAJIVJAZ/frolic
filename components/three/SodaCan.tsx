'use client';

import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { createCanLabelTexture, type LabelSpec } from './canTexture';

/**
 * A 250 ml sleek can, built from primitives — no external GLB, no loader, no
 * network request. Silhouette is a LatheGeometry profile in brushed aluminium;
 * the printed sleeve is a separate open-ended cylinder sitting a hair proud of
 * the shell so the label never z-fights with the metal.
 *
 * Real-world reference: 250 ml sleek = Ø53 mm × 134 mm. Scene units are
 * decimetres, so the can is 0.53 × 1.34.
 */

const R = 0.265; // body radius
const HALF = 0.67; // half height

/** Silhouette profile, bottom → top, in the XY plane. */
function buildProfile(): THREE.Vector2[] {
  const pts: THREE.Vector2[] = [];
  const push = (x: number, y: number) => pts.push(new THREE.Vector2(x, y));

  push(0, -HALF);
  push(R * 0.62, -HALF);
  push(R * 0.9, -HALF + 0.045); // base chime
  push(R, -HALF + 0.11);
  push(R, HALF - 0.2); // straight wall
  push(R * 0.93, HALF - 0.105); // shoulder taper
  push(R * 0.78, HALF - 0.035);
  push(R * 0.72, HALF); // neck
  push(R * 0.75, HALF + 0.018); // rolled rim
  push(R * 0.7, HALF + 0.026);
  push(0, HALF + 0.026);

  return pts;
}

export type SodaCanProps = {
  spec: LabelSpec;
  /** Radians per second of idle spin. 0 disables. */
  spin?: number;
  /** Scroll- or pointer-driven rotation offset, in radians. Passed as a ref so
   *  scroll updates never trigger a React render — useFrame reads it directly. */
  rotationRef?: React.MutableRefObject<number>;
  /** Gentle vertical bob, in scene units. 0 disables. */
  float?: number;
  position?: [number, number, number];
  scale?: number;
  /** Phase offset so a row of cans doesn't move in lockstep. */
  phase?: number;
};

export function SodaCan({
  spec,
  spin = 0.35,
  rotationRef,
  float = 0.04,
  position = [0, 0, 0],
  scale = 1,
  phase = 0,
}: SodaCanProps) {
  const group = useRef<THREE.Group>(null);
  const label = useMemo(() => createCanLabelTexture(spec), [spec]);
  const profile = useMemo(() => buildProfile(), []);

  useFrame((state, delta) => {
    const g = group.current;
    if (!g) return;
    g.rotation.y += spin * delta;
    // Lerp toward the externally driven angle so scroll input feels weighted
    // rather than snapping frame-to-frame.
    const target = (rotationRef?.current ?? 0) * 0.08;
    g.rotation.z = THREE.MathUtils.lerp(g.rotation.z, target, 0.06);
    if (float > 0) {
      const t = state.clock.elapsedTime + phase;
      g.position.y = position[1] + Math.sin(t * 0.9) * float;
      g.rotation.x = Math.sin(t * 0.55) * 0.045;
    }
  });

  return (
    <group ref={group} position={position} scale={scale} dispose={null}>
      {/* Aluminium shell */}
      <mesh castShadow receiveShadow>
        <latheGeometry args={[profile, 64]} />
        <meshStandardMaterial
          color="#d8d8dc"
          metalness={0.92}
          roughness={0.28}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Printed sleeve */}
      <mesh position={[0, -0.03, 0]}>
        <cylinderGeometry args={[R * 1.004, R * 1.004, HALF * 1.72, 64, 1, true]} />
        <meshStandardMaterial
          map={label}
          metalness={0.35}
          roughness={0.42}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Lid disc + stay-on tab */}
      <mesh position={[0, HALF + 0.024, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[R * 0.7, 48]} />
        <meshStandardMaterial color="#c2c2c8" metalness={0.95} roughness={0.22} />
      </mesh>
      <mesh position={[0, HALF + 0.032, 0.035]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.032, 0.058, 24]} />
        <meshStandardMaterial color="#aaaab2" metalness={0.95} roughness={0.3} />
      </mesh>
    </group>
  );
}
