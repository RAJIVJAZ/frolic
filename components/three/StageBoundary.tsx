'use client';

import { Component, type ReactNode } from 'react';

/**
 * Error boundary around the WebGL stage.
 *
 * The 3D scene is decoration. A driver bug, a lost context or a throw inside
 * Suspense must never be able to take the page down with it — without this,
 * React unmounts the whole tree and the visitor gets "Application error"
 * instead of a storefront. On failure we swap in the CSS can and carry on.
 */
export class StageBoundary extends Component<
  { children: ReactNode; fallback: ReactNode },
  { failed: boolean }
> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch(error: Error) {
    // Left as a warning rather than an error: the page is still fully usable,
    // and this should not page anyone at 3am.
    console.warn('[frolic] 3D stage unavailable, using static fallback:', error.message);
  }

  render() {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}
