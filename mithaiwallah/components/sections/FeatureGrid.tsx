import { Icon, type IconName } from '@/components/ui/Icon';
import { Reveal } from '@/components/ui/Reveal';
import { cn } from '@/lib/utils';

export function FeatureGrid({
  items,
  cols = 4,
  dark,
}: {
  items: { title: string; body: string; icon?: IconName }[];
  cols?: 2 | 3 | 4;
  dark?: boolean;
}) {
  return (
    <div className={cn('grid gap-5 sm:grid-cols-2', cols === 3 && 'lg:grid-cols-3', cols === 4 && 'lg:grid-cols-4')}>
      {items.map((it, i) => (
        <Reveal key={it.title} delay={(i % cols) * 0.07} className="h-full">
          <article
            className={cn(
              'h-full rounded-3xl border p-7',
              dark ? 'border-cream/10 bg-cream/[0.05] text-cream' : 'border-gold-300/50 bg-cream-50 shadow-card',
            )}
          >
            {it.icon && (
              <span className={cn('grid h-12 w-12 place-items-center rounded-full', dark ? 'bg-gold-300/15 text-gold-300' : 'bg-maroon text-gold-200')}>
                <Icon name={it.icon} />
              </span>
            )}
            <h3 className={cn('mt-5 font-display text-2xl font-semibold', dark ? 'text-gold-100' : 'text-maroon')}>{it.title}</h3>
            <p className={cn('mt-3 text-[0.95rem] leading-relaxed', dark ? 'text-cream/70' : 'text-ink-muted')}>{it.body}</p>
          </article>
        </Reveal>
      ))}
    </div>
  );
}
