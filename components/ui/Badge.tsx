import { cn } from '@/lib/utils';

export function Badge({
  children,
  tone = 'neutral',
  className,
}: {
  children: React.ReactNode;
  tone?: 'neutral' | 'world' | 'ink' | 'mint';
  className?: string;
}) {
  const tones = {
    neutral: 'border-charcoal/12 bg-cream/80 text-charcoal-soft',
    world: 'border-transparent bg-[var(--world-base)] text-[var(--world-ink)]',
    ink: 'border-transparent bg-charcoal text-cream',
    mint: 'border-transparent bg-mint-100 text-mint-700',
  };
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-pill border px-3 py-1 font-mono text-[0.64rem] font-bold uppercase tracking-[0.16em]',
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}

/** The recurring "7g fibre / low sugar / no caffeine" trio. */
export function StatRow({
  stats,
  className,
}: {
  stats: { value: string; label: string }[];
  className?: string;
}) {
  return (
    <dl className={cn('grid grid-cols-3 gap-px overflow-hidden rounded-card bg-charcoal/10', className)}>
      {stats.map((s) => (
        <div key={s.label} className="bg-cream px-3 py-4 text-center sm:px-5 sm:py-6">
          <dt className="sr-only">{s.label}</dt>
          <dd>
            <span className="block font-display text-step-2 font-black leading-none text-charcoal">
              {s.value}
            </span>
            <span className="mt-2 block font-mono text-[0.6rem] font-semibold uppercase tracking-[0.16em] text-charcoal-muted sm:text-[0.66rem]">
              {s.label}
            </span>
          </dd>
        </div>
      ))}
    </dl>
  );
}
