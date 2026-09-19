'use client';

import { motion, useReducedMotion, type Variants } from 'framer-motion';
import { cn } from '@/lib/utils';

type Props = {
  children: React.ReactNode;
  className?: string;
  /** Stagger index — multiplied by 60ms. */
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  /** Fraction of the element that must be visible before it animates. */
  amount?: number;
  as?: 'div' | 'section' | 'li' | 'article' | 'header';
};

const offsets = {
  up: { y: 28, x: 0 },
  down: { y: -28, x: 0 },
  left: { y: 0, x: 28 },
  right: { y: 0, x: -28 },
  none: { y: 0, x: 0 },
};

/**
 * The workhorse scroll-in. Everything on the site that fades up uses this, so
 * the timing curve is consistent and there is exactly one place to tune it.
 * Respects prefers-reduced-motion by rendering the end state immediately.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  direction = 'up',
  amount = 0.25,
  as = 'div',
}: Props) {
  const reduce = useReducedMotion();
  const MotionTag = motion[as];

  const variants: Variants = {
    hidden: reduce ? { opacity: 1 } : { opacity: 0, ...offsets[direction] },
    show: {
      opacity: 1,
      y: 0,
      x: 0,
      transition: reduce
        ? { duration: 0 }
        : { duration: 0.75, delay: delay * 0.06, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <MotionTag
      className={cn(className)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount }}
      variants={variants}
    >
      {children}
    </MotionTag>
  );
}

/** Word-by-word headline reveal for hero and section openers. */
export function RevealWords({
  text,
  className,
  wordClassName,
  delay = 0,
}: {
  text: string;
  className?: string;
  wordClassName?: string;
  delay?: number;
}) {
  const reduce = useReducedMotion();
  const words = text.split(' ');

  if (reduce) return <span className={className}>{text}</span>;

  return (
    <span className={cn('inline-block', className)}>
      {words.map((word, i) => (
        <span key={`${word}-${i}`} className="inline-block overflow-hidden pb-[0.12em] align-bottom">
          <motion.span
            className={cn('inline-block', wordClassName)}
            initial={{ y: '110%', opacity: 0 }}
            animate={{ y: '0%', opacity: 1 }}
            transition={{
              duration: 0.85,
              delay: delay + i * 0.055,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {word}
            {i < words.length - 1 ? ' ' : ''}
          </motion.span>
        </span>
      ))}
    </span>
  );
}
