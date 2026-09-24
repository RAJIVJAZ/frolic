import { cn } from '@/lib/utils';

/**
 * The jharokha arch — the site's signature frame for product imagery.
 * The inner gold hairline sits 8px in, like a mount around a miniature.
 */
export function ArchFrame({
  children,
  className,
  tone = '#F4EAD6',
  glow = true,
}: {
  children: React.ReactNode;
  className?: string;
  tone?: string;
  glow?: boolean;
}) {
  return (
    <div
      className={cn('relative overflow-hidden rounded-arch shadow-card', className)}
      style={{ background: `radial-gradient(90% 70% at 50% 38%, #FFFDF8 0%, ${tone} 70%)` }}
    >
      {glow && <div className="pointer-events-none absolute inset-x-8 top-10 h-1/2 rounded-full bg-white/50 blur-3xl" />}
      <div className="pointer-events-none absolute inset-2 rounded-arch border border-gold-400/40" />
      <div className="relative h-full w-full">{children}</div>
    </div>
  );
}
