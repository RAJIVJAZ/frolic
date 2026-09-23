import { COMPANY, STATUS_LABEL, type WorkStatus } from '@/lib/company';
import { cn } from '@/lib/utils';

/** Sitewide "we are pre-launch" marker. Honest by default, everywhere. */
export function StagePill({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-2 rounded-pill border border-charcoal/12 bg-cream/70 px-3 py-1',
        'font-mono text-[0.66rem] font-semibold uppercase tracking-[0.16em] text-charcoal-soft backdrop-blur',
        className,
      )}
    >
      <span className="relative flex h-2 w-2" aria-hidden>
        <span className="absolute inline-flex h-full w-full rounded-full bg-tangerine opacity-70 animate-pulseRing" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-tangerine" />
      </span>
      {COMPANY.stage}
    </span>
  );
}

const TONE: Record<WorkStatus, string> = {
  complete: 'border-mint-600 bg-mint-50 text-mint-700',
  underway: 'border-tangerine-500 bg-tangerine-50 text-tangerine-600',
  next: 'border-charcoal/25 bg-cream text-charcoal-soft',
  planned: 'border-charcoal/12 bg-transparent text-charcoal-muted',
};

export function StatusBadge({ status, className }: { status: WorkStatus; className?: string }) {
  return (
    <span
      className={cn(
        'inline-flex shrink-0 items-center gap-1.5 rounded-pill border px-2.5 py-1',
        'font-mono text-[0.62rem] font-bold uppercase tracking-[0.14em]',
        TONE[status],
        className,
      )}
    >
      {status === 'complete' && <CheckMark />}
      {STATUS_LABEL[status]}
    </span>
  );
}

function CheckMark() {
  return (
    <svg viewBox="0 0 12 12" className="h-2.5 w-2.5" aria-hidden fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 6.5l2.8 2.8L10 3.5" />
    </svg>
  );
}
