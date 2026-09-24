import { BRAND } from '@/lib/business';
import { cn } from '@/lib/utils';

/**
 * The logo.
 *
 * When BRAND.logo is set (the real file in /public/brand), that file renders
 * everywhere. Until then this draws the placeholder: a jharokha-arch
 * monogram and a serif wordmark — built so the layout does not shift when the
 * real logo arrives, as long as it is roughly the same width.
 */

export function ArchMark({ className, tone = 'gold' }: { className?: string; tone?: 'gold' | 'maroon' | 'cream' }) {
  const stroke = tone === 'gold' ? 'url(#mw-gold)' : tone === 'maroon' ? '#6B1024' : '#FBF6EC';
  const fill = tone === 'cream' ? '#FBF6EC' : tone === 'maroon' ? '#6B1024' : '#7A5823';
  return (
    <svg viewBox="0 0 40 52" className={className} aria-hidden>
      <path d="M3 51 V22 C3 11 11 5 20 1 C29 5 37 11 37 22 V51" fill="none" stroke={stroke} strokeWidth={1.6} />
      <path d="M7.5 51 V23 C7.5 14 13.5 9 20 6 C26.5 9 32.5 14 32.5 23 V51" fill="none" stroke={stroke} strokeWidth={0.8} />
      <path d="M13 41 V27 L20 35 L27 27 V41" fill="none" stroke={fill} strokeWidth={2} strokeLinejoin="round" strokeLinecap="round" />
      <circle cx="20" cy="17" r="1.6" fill={fill} />
    </svg>
  );
}

export function Logo({
  className,
  tone = 'dark',
  showHindi = true,
}: {
  className?: string;
  tone?: 'dark' | 'light';
  showHindi?: boolean;
}) {
  if (BRAND.logo) {
    return (
      <img
        src={BRAND.logo.src}
        width={BRAND.logo.width}
        height={BRAND.logo.height}
        alt={BRAND.logo.alt}
        className={cn('h-11 w-auto', className)}
      />
    );
  }
  const light = tone === 'light';
  return (
    <span className={cn('inline-flex items-center gap-2.5', className)}>
      <ArchMark className="h-10 w-8 shrink-0" tone={light ? 'gold' : 'maroon'} />
      <span className="flex flex-col leading-none">
        <span className={cn('font-display text-[1.6rem] font-semibold tracking-[0.01em]', light ? 'text-cream' : 'text-maroon')}>
          {BRAND.name}
        </span>
        {showHindi && (
          <span className={cn('mt-1 font-hindi text-[0.78rem]', light ? 'text-gold-300' : 'text-gold-700')}>
            {BRAND.hindiName}
          </span>
        )}
      </span>
    </span>
  );
}
