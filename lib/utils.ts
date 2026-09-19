import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/** Tailwind-aware class joiner. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Turn a flavour world into the CSS custom properties the rest of the UI reads.
 * Applied at any level of the tree, so a single card and a whole page section
 * can each own a different world without leaking into each other.
 */
export function worldVars(world: {
  base: string;
  deep: string;
  wash: string;
  ink: string;
}): React.CSSProperties {
  return {
    ['--world-base' as string]: world.base,
    ['--world-deep' as string]: world.deep,
    ['--world-wash' as string]: world.wash,
    ['--world-ink' as string]: world.ink,
    ['--glow-tint' as string]: `${world.base}8c`,
  } as React.CSSProperties;
}

export function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/** Deterministic pseudo-random in [0,1) — keeps SSR and client markup identical. */
export function seeded(seed: number): number {
  const x = Math.sin(seed * 12.9898) * 43758.5453;
  return x - Math.floor(x);
}
