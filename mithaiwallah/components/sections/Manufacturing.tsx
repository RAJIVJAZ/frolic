import { Button } from '@/components/ui/Button';
import { Icon, type IconName } from '@/components/ui/Icon';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';

export const PILLARS: { icon: IconName; title: string; body: string }[] = [
  {
    icon: 'factory',
    title: 'Production Facility',
    body: 'A dedicated kitchen laid out for milk sweets: separate zones for raw milk, cooking, setting and packing, so nothing crosses back.',
  },
  {
    icon: 'flask',
    title: 'Quality Control',
    body: 'Milk is checked on arrival, every batch is tasted before it is cut, and each pack carries a batch code and best-before date.',
  },
  {
    icon: 'hand',
    title: 'Skilled Workforce',
    body: 'Halwais who learned these sweets by hand, working alongside a team trained in food-safety and hygiene practice.',
  },
  {
    icon: 'gift',
    title: 'Packaging Standards',
    body: 'Food-grade trays, sealed inner packs and rigid outer boxes designed to arrive the way they left — even across the country.',
  },
];

export const PROCESS = [
  { title: 'Milk', body: 'Fresh full-cream milk, checked on arrival.' },
  { title: 'Slow cooking', body: 'Reduced in small batches, stirred by hand.' },
  { title: 'Finishing', body: 'Set, cut and garnished by our halwais.' },
  { title: 'Quality check', body: 'Tasted, weighed and batch-coded.' },
  { title: 'Packing', body: 'Sealed, boxed and dispatched to order.' },
];

export function Manufacturing() {
  return (
    <section id="manufacturing" className="relative overflow-hidden bg-ink py-24 text-cream sm:py-32">
      <div className="pointer-events-none absolute -right-40 top-0 h-[520px] w-[520px] rounded-full bg-gold-500/10 blur-3xl" />
      <div className="container-luxe relative">
        <SectionHeading
          light
          eyebrow="Manufacturing Excellence"
          title="Handmade taste. Industrial discipline."
          intro="Tradition decides how our sweets taste. Process decides whether they taste that way every single time — in a box of four or an order of four thousand."
        />

        {/* From milk to gift box */}
        <Reveal className="mt-16">
          <ol className="relative grid gap-8 sm:grid-cols-5 sm:gap-4">
            <div className="absolute left-0 right-0 top-6 hidden h-px bg-gradient-to-r from-gold-500/0 via-gold-500/60 to-gold-500/0 sm:block" />
            {PROCESS.map((s, i) => (
              <li key={s.title} className="relative flex gap-4 sm:flex-col sm:items-center sm:text-center">
                <span className="relative grid h-12 w-12 shrink-0 place-items-center rounded-full border border-gold-400/60 bg-ink font-display text-lg text-gold-200">
                  {i + 1}
                </span>
                <div>
                  <h3 className="font-display text-xl font-semibold text-gold-100">{s.title}</h3>
                  <p className="mt-1 text-sm text-cream/60">{s.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </Reveal>

        <div className="mt-20 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {PILLARS.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.07} className="h-full">
              <article className="h-full rounded-3xl border border-cream/10 bg-cream/[0.04] p-7 backdrop-blur-sm">
                <Icon name={p.icon} className="h-7 w-7 text-gold-300" />
                <h3 className="mt-5 font-display text-2xl font-semibold text-cream">{p.title}</h3>
                <p className="mt-3 text-[0.95rem] leading-relaxed text-cream/65">{p.body}</p>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-12 text-center">
          <Button href="/manufacturing" variant="outline-light" icon="arrow">
            Inside our kitchen
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
