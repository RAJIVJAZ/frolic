import { cn } from '@/lib/utils';
import { Reveal } from './Reveal';

export function Ornament({ className, light }: { className?: string; light?: boolean }) {
  const c = light ? '#D9B872' : '#B8893B';
  return (
    <svg viewBox="0 0 120 12" className={cn('h-3 w-28', className)} aria-hidden>
      <path d="M0 6h46M74 6h46" stroke={c} strokeWidth="0.8" />
      <path d="M60 1l5 5-5 5-5-5 5-5z" fill="none" stroke={c} strokeWidth="0.9" />
      <circle cx="50" cy="6" r="1.2" fill={c} />
      <circle cx="70" cy="6" r="1.2" fill={c} />
    </svg>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = 'center',
  light,
  className,
  as: Tag = 'h2',
}: {
  eyebrow?: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  align?: 'center' | 'left';
  light?: boolean;
  className?: string;
  as?: 'h1' | 'h2';
}) {
  const center = align === 'center';
  return (
    <Reveal className={cn(center ? 'mx-auto max-w-3xl text-center' : 'max-w-2xl', className)}>
      {eyebrow && (
        <div className={cn('flex flex-col gap-3', center ? 'items-center' : 'items-start')}>
          <span className={light ? 'eyebrow-light' : 'eyebrow'}>{eyebrow}</span>
          <Ornament light={light} className={center ? '' : '-ml-1'} />
        </div>
      )}
      <Tag
        className={cn(
          'mt-5 font-display font-semibold text-balance',
          Tag === 'h1' ? 'text-display-lg' : 'text-display-md',
          light ? 'text-cream' : 'text-maroon',
        )}
      >
        {title}
      </Tag>
      {intro && (
        <p className={cn('mt-6 text-[1.075rem] leading-relaxed text-pretty', light ? 'text-cream/75' : 'text-ink-soft')}>
          {intro}
        </p>
      )}
    </Reveal>
  );
}
