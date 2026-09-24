'use client';

import { LazyMotion, MotionConfig, domAnimation, m } from 'framer-motion';

/**
 * Fade-and-rise on first entry into the viewport.
 *
 * Reduced motion is handled by `MotionConfig reducedMotion="user"`, which
 * drops the rise and keeps only the fade — rather than branching on
 * useReducedMotion(), whose value differs between server and client and would
 * cause a hydration mismatch on every revealed element.
 */
export function Reveal({
  children,
  delay = 0,
  className,
  y = 28,
  as = 'div',
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  y?: number;
  as?: 'div' | 'li' | 'section' | 'article';
}) {
  const Tag = m[as];
  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">
        <Tag
          className={className}
          initial={{ opacity: 0, y }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '0px 0px -10% 0px' }}
          transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
        >
          {children}
        </Tag>
      </MotionConfig>
    </LazyMotion>
  );
}
