import { JsonLd } from '@/components/seo/JsonLd';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { faqSchema } from '@/lib/seo';

/** Native <details> accordion — works without JavaScript. Emits FAQPage schema. */
export function Faq({ faqs, title = 'Questions, answered.' }: { faqs: { q: string; a: string }[]; title?: string }) {
  return (
    <section className="py-24 sm:py-28">
      <JsonLd data={faqSchema(faqs)} />
      <div className="container-luxe max-w-4xl">
        <SectionHeading eyebrow="FAQ" title={title} />
        <Reveal className="mt-12 divide-y divide-gold-300/50 border-y border-gold-300/50">
          {faqs.map((f) => (
            <details key={f.q} className="group py-6">
              <summary className="flex cursor-pointer list-none items-start justify-between gap-6 font-display text-[1.4rem] font-semibold text-ink [&::-webkit-details-marker]:hidden">
                {f.q}
                <span className="mt-1 grid h-8 w-8 shrink-0 place-items-center rounded-full border border-gold-400/60 text-gold-700 transition-transform duration-500 group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="mt-4 max-w-3xl leading-relaxed text-ink-soft">{f.a}</p>
            </details>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
