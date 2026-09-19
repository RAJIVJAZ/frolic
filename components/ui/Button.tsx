'use client';

import Link from 'next/link';
import { forwardRef } from 'react';
import { cn } from '@/lib/utils';

type Variant = 'primary' | 'ink' | 'outline' | 'ghost' | 'world';
type Size = 'sm' | 'md' | 'lg';

const base =
  'group relative inline-flex select-none items-center justify-center gap-2 rounded-pill font-sans font-semibold ' +
  'tracking-[-0.01em] transition-[transform,background-color,color,box-shadow] duration-300 ease-elastic ' +
  'active:scale-[0.97] disabled:pointer-events-none disabled:opacity-45 ' +
  // Touch targets stay >=44px tall at every size via the padding below.
  'touch-manipulation';

const variants: Record<Variant, string> = {
  primary:
    'bg-charcoal text-cream shadow-lift hover:-translate-y-0.5 hover:bg-charcoal-soft hover:shadow-float',
  ink: 'bg-cream text-charcoal shadow-lift hover:-translate-y-0.5 hover:shadow-float',
  world:
    'bg-[var(--world-base)] text-[var(--world-ink)] shadow-lift hover:-translate-y-0.5 hover:shadow-glow',
  outline:
    'border-2 border-charcoal/15 bg-transparent text-charcoal hover:-translate-y-0.5 hover:border-charcoal/45 hover:bg-charcoal/[0.04]',
  ghost: 'bg-transparent text-charcoal hover:bg-charcoal/[0.06]',
};

const sizes: Record<Size, string> = {
  sm: 'min-h-[2.75rem] px-4 text-step--1',
  md: 'min-h-[3rem] px-6 text-step-0',
  lg: 'min-h-[3.5rem] px-8 text-step-1',
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
};

type ButtonProps = CommonProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'children' | 'className'>;

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant = 'primary', size = 'md', className, children, ...rest },
  ref,
) {
  return (
    <button ref={ref} className={cn(base, variants[variant], sizes[size], className)} {...rest}>
      {children}
    </button>
  );
});

type ButtonLinkProps = CommonProps &
  Omit<React.ComponentProps<typeof Link>, 'children' | 'className'>;

export function ButtonLink({
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...rest
}: ButtonLinkProps) {
  return (
    <Link className={cn(base, variants[variant], sizes[size], className)} {...rest}>
      {children}
    </Link>
  );
}

/** Trailing arrow that slides on hover — used on most CTAs. */
export function Arrow({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 20 20"
      aria-hidden
      className={cn(
        'h-4 w-4 transition-transform duration-300 ease-elastic group-hover:translate-x-1',
        className,
      )}
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 10h12M11 5l5 5-5 5" />
    </svg>
  );
}
