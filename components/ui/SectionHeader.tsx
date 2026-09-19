import { cn } from '@/lib/utils';
import { Reveal } from './Reveal';

export function SectionHeader({
  eyebrow,
  title,
  body,
  align = 'left',
  className,
  children,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  body?: React.ReactNode;
  align?: 'left' | 'center';
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        'flex flex-col gap-4',
        align === 'center' && 'items-center text-center',
        className,
      )}
    >
      {eyebrow && (
        <Reveal>
          <p className="eyebrow">{eyebrow}</p>
        </Reveal>
      )}
      <Reveal delay={1}>
        <h2 className="max-w-[18ch] text-step-4">{title}</h2>
      </Reveal>
      {body && (
        <Reveal delay={2}>
          <p className={cn('max-w-prose text-step-1 text-charcoal-muted', align === 'center' && 'mx-auto')}>
            {body}
          </p>
        </Reveal>
      )}
      {children && <Reveal delay={3}>{children}</Reveal>}
    </div>
  );
}
