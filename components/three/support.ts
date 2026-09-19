'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Capability + visibility gates for the WebGL stage.
 *
 * Deliberately kept in its own module with no `three` import: these run on
 * every page, and the whole point is to decide whether three.js should be
 * fetched at all. Importing it here would defeat that.
 */

export function hasWebGL(): boolean {
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

/** True once the element has come within `rootMargin` of the viewport. Latches. */
export function useNearViewport<T extends HTMLElement>(rootMargin = '200px') {
  const ref = useRef<T>(null);
  const [near, setNear] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || near) return;
    if (typeof IntersectionObserver === 'undefined') {
      setNear(true);
      return;
    }
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

/**
 * Also require the device to look capable enough to be worth ~400 KB of
 * renderer. Low core counts and Save-Data get the CSS can instead.
 */
export function useCapableDevice(): boolean | null {
  const [capable, setCapable] = useState<boolean | null>(null);

  useEffect(() => {
    const nav = navigator as Navigator & {
      deviceMemory?: number;
      connection?: { saveData?: boolean; effectiveType?: string };
    };
    const saveData = nav.connection?.saveData === true;
    const slowNetwork = /(^|-)2g$/.test(nav.connection?.effectiveType ?? '');
    const weakCpu = (nav.hardwareConcurrency ?? 8) < 4;
    const lowMemory = (nav.deviceMemory ?? 8) < 4;
    setCapable(hasWebGL() && !saveData && !slowNetwork && !weakCpu && !lowMemory);
  }, []);

  return capable;
}
