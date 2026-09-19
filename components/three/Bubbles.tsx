'use client';

import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * Carbonation field. One InstancedMesh, one draw call, N bubbles — each with
 * its own radius, speed, wobble frequency and reset height. Instancing is what
 * makes 140 bubbles cost roughly what one sphere costs.
 */

type Bubble = {
  x: number;
  z: number;
  y: number;
  r: number;
  speed: number;
  wobble: number;
  phase: number;
};

const dummy = new THREE.Object3D();

export function Bubbles({
  count = 120,
  color = '#ffffff',
  spread = 3.4,
  height = 4.2,
  opacity = 0.34,
}: {
  count?: number;
  color?: string;
  spread?: number;
  height?: number;
  opacity?: number;
}) {
  const mesh = useRef<THREE.InstancedMesh>(null);

  const bubbles = useMemo<Bubble[]>(() => {
    // Deterministic-ish distribution; visual noise doesn't need crypto entropy.
    return Array.from({ length: count }, () => ({
      x: (Math.random() - 0.5) * spread * 2,
      z: (Math.random() - 0.5) * spread,
      y: Math.random() * height - height / 2,
      r: 0.012 + Math.random() * 0.042,
      speed: 0.18 + Math.random() * 0.5,
      wobble: 0.5 + Math.random() * 1.6,
      phase: Math.random() * Math.PI * 2,
    }));
  }, [count, spread, height]);

  useFrame((state, delta) => {
    const m = mesh.current;
    if (!m) return;
    const t = state.clock.elapsedTime;

    for (let i = 0; i < bubbles.length; i++) {
      const b = bubbles[i];
      // Larger bubbles rise faster — mirrors how carbonation actually behaves.
      b.y += (b.speed + b.r * 4) * delta;
      if (b.y > height / 2) {
        b.y = -height / 2;
        b.x = (Math.random() - 0.5) * spread * 2;
      }
      dummy.position.set(
        b.x + Math.sin(t * b.wobble + b.phase) * 0.06,
        b.y,
        b.z,
      );
      const s = b.r * (1 + Math.sin(t * 2 + b.phase) * 0.06);
      dummy.scale.setScalar(s);
      dummy.updateMatrix();
      m.setMatrixAt(i, dummy.matrix);
    }
    m.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, count]} frustumCulled={false}>
      <sphereGeometry args={[1, 10, 10]} />
      <meshStandardMaterial
        color={color}
        transparent
        opacity={opacity}
        roughness={0.05}
        metalness={0.1}
        depthWrite={false}
      />
    </instancedMesh>
  );
}

/**
 * Low-poly fruit forms that drift through the hero. Deliberately abstract —
 * icosahedra and capsules, not modelled fruit — so they read as playful shapes
 * rather than as a failed attempt at realism.
 */
export function FloatingForms({
  colors,
  count = 7,
}: {
  colors: string[];
  count?: number;
}) {
  const group = useRef<THREE.Group>(null);

  const forms = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        position: [
          Math.cos((i / count) * Math.PI * 2) * (1.7 + (i % 3) * 0.45),
          Math.sin((i / count) * Math.PI * 4) * 1.15,
          -0.6 - (i % 4) * 0.55,
        ] as [number, number, number],
        scale: 0.1 + (i % 4) * 0.045,
        color: colors[i % colors.length],
        detail: i % 3,
        speed: 0.25 + (i % 5) * 0.12,
        phase: i * 1.7,
      })),
    [colors, count],
  );

  useFrame((state) => {
    const g = group.current;
    if (!g) return;
    const t = state.clock.elapsedTime;
    g.children.forEach((child, i) => {
      const f = forms[i];
      child.position.y = f.position[1] + Math.sin(t * f.speed + f.phase) * 0.3;
      child.rotation.x = t * f.speed * 0.5;
      child.rotation.z = t * f.speed * 0.32;
    });
  });

  return (
    <group ref={group}>
      {forms.map((f, i) => (
        <mesh key={i} position={f.position} scale={f.scale}>
          <icosahedronGeometry args={[1, f.detail]} />
          <meshStandardMaterial
            color={f.color}
            roughness={0.35}
            metalness={0.05}
            flatShading={f.detail === 0}
          />
        </mesh>
      ))}
    </group>
  );
}
