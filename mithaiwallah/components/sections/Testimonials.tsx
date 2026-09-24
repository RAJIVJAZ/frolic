import { Icon } from '@/components/ui/Icon';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { TESTIMONIALS, TESTIMONIALS_ARE_SAMPLES } from '@/lib/testimonials';
import { cn } from '@/lib/utils';

export function Testimonials() {
  const [lead, ...rest] = TESTIMONIALS;
  return (
    <section id="testimonials" className="py-24 sm:py-32">
      <div className="container-luxe">
        <SectionHeading eyebrow="Kind Words" title="Trusted at celebrations of every size." />

        <div className="mt-16 grid gap-6 lg:grid-cols-[1.2fr_1fr]">
          <Reveal className="h-full">
            <figure className="relative flex h-full flex-col justify-between overflow-hidden rounded-[2rem] bg-maroon-velvet p-10 text-cream shadow-luxe sm:p-12">
              <div className="jaali-light pointer-events-none absolute inset-0" />
              <Icon name="quote" className="relative h-12 w-12 text-gold-300" />
              <blockquote className="relative mt-8 font-display text-[1.85rem] leading-snug text-cream sm:text-[2.2rem]">
                “{lead.quote}”
              </blockquote>
              <figcaption className="relative mt-10 border-t border-cream/15 pt-6">
                <p className="font-semibold text-gold-200">{lead.name}</p>
                <p className="text-sm text-cream/65">{lead.role}</p>
              </figcaption>
            </figure>
          </Reveal>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-1">
            {rest.slice(0, 2).map((t, i) => (
              <Reveal key={t.quote} delay={0.1 + i * 0.08} className="h-full">
                <Quote t={t} />
              </Reveal>
            ))}
          </div>
        </div>
        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          {rest.slice(2).map((t, i) => (
            <Reveal key={t.quote} delay={i * 0.08} className="h-full">
              <Quote t={t} />
            </Reveal>
          ))}
        </div>

        {TESTIMONIALS_ARE_SAMPLES && (
          <p className="mt-8 text-center text-xs uppercase tracking-[0.16em] text-ink-muted">
            Illustrative testimonials — to be replaced with client feedback before launch
          </p>
        )}
      </div>
    </section>
  );
}

function Quote({ t, className }: { t: (typeof TESTIMONIALS)[number]; className?: string }) {
  return (
    <figure className={cn('flex h-full flex-col rounded-[2rem] border border-gold-300/50 bg-cream-50 p-8 shadow-card', className)}>
      <span className="self-start rounded-full bg-cream-200 px-3 py-1 text-[0.7rem] font-bold uppercase tracking-[0.16em] text-gold-700">
        {t.segment}
      </span>
      <blockquote className="mt-5 flex-1 font-display text-[1.35rem] leading-snug text-ink">“{t.quote}”</blockquote>
      <figcaption className="mt-6">
        <p className="font-semibold text-maroon">{t.name}</p>
        <p className="text-sm text-ink-muted">{t.role}</p>
      </figcaption>
    </figure>
  );
}
