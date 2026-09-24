import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';

export function Process({
  eyebrow = 'How It Works',
  title,
  steps,
}: {
  eyebrow?: string;
  title: string;
  steps: readonly { step: string; body: string }[];
}) {
  return (
    <section className="bg-cream-50 py-24 sm:py-28">
      <div className="container-luxe">
        <SectionHeading eyebrow={eyebrow} title={title} />
        <ol className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {steps.map((s, i) => (
            <Reveal as="li" key={s.step} delay={i * 0.07} className="relative rounded-3xl border border-gold-300/50 bg-cream p-7">
              <span className="font-display text-5xl font-semibold text-gold-300">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="mt-3 font-display text-2xl font-semibold text-maroon">{s.step}</h3>
              <p className="mt-2 text-[0.95rem] leading-relaxed text-ink-muted">{s.body}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
