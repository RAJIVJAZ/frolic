import Link from 'next/link';
import { Reveal } from '@/components/ui/Reveal';
import { Ornament } from '@/components/ui/SectionHeading';
import { cn } from '@/lib/utils';

export type Crumb = { name: string; path: string };

/** Light hero for inner pages: breadcrumb, H1, intro, actions, optional art. */
export function PageHero({
  eyebrow,
  title,
  intro,
  crumbs,
  actions,
  art,
  className,
}: {
  eyebrow: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  crumbs: Crumb[];
  actions?: React.ReactNode;
  art?: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={cn('relative overflow-hidden bg-cream-200/50 pb-20 pt-40 sm:pb-24 sm:pt-48', className)}>
      <div className="jaali pointer-events-none absolute inset-0 opacity-60" />
      <div className="pointer-events-none absolute -right-32 -top-32 h-[480px] w-[480px] rounded-full bg-gold-200/40 blur-3xl" />
      <div className={cn('container-luxe relative grid items-center gap-12', art && 'lg:grid-cols-[1.1fr_1fr]')}>
        <div>
          <nav aria-label="Breadcrumb" className="mb-8 text-[0.8rem] text-ink-muted">
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <Link href="/" className="hover:text-maroon">
                  Home
                </Link>
              </li>
              {crumbs.map((c, i) => (
                <li key={c.path} className="flex items-center gap-2">
                  <span className="text-gold-500">/</span>
                  {i === crumbs.length - 1 ? (
                    <span aria-current="page" className="text-ink-soft">
                      {c.name}
                    </span>
                  ) : (
                    <Link href={c.path} className="hover:text-maroon">
                      {c.name}
                    </Link>
                  )}
                </li>
              ))}
            </ol>
          </nav>
          <Reveal>
            <span className="eyebrow">{eyebrow}</span>
            <Ornament className="-ml-1 mt-3" />
            <h1 className="mt-5 font-display text-display-lg font-semibold text-maroon text-balance">{title}</h1>
            {intro && <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-soft text-pretty">{intro}</p>}
            {actions && <div className="mt-9 flex flex-wrap gap-3">{actions}</div>}
          </Reveal>
        </div>
        {art && <Reveal delay={0.15}>{art}</Reveal>}
      </div>
    </section>
  );
}
