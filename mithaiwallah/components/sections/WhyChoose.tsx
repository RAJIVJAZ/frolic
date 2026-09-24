import { Icon, type IconName } from '@/components/ui/Icon';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';

const REASONS: { icon: IconName; title: string; body: string }[] = [
  { icon: 'leaf', title: 'Premium Ingredients', body: 'Full-cream milk, pure desi ghee and whole dry fruits. Nothing we would not serve at our own table.' },
  { icon: 'shield', title: 'Hygienic Manufacturing', body: 'Clean, controlled production and sealed, batch-coded packing — so every box can be traced.' },
  { icon: 'sparkle', title: 'Customised Orders', body: 'Your assortment, your box, your logo or monogram — approved on a proof before we print.' },
  { icon: 'truck', title: 'Pan-India Delivery', body: 'Packed to travel and shipped with courier partners who know that mithai is not a parcel.' },
  { icon: 'boxes', title: 'Bulk Capacity', body: 'Built to fulfil large corporate and wedding orders without dropping the handmade finish.' },
  { icon: 'handshake', title: 'Trusted Manufacturing', body: 'Consistent recipes, consistent quality — the reason hotels, shops and brands trust us with their name.' },
];

export function WhyChoose() {
  return (
    <section id="why" className="py-24 sm:py-32">
      <div className="container-luxe">
        <SectionHeading
          eyebrow="Why Mithaiwallah"
          title="Six promises in every box."
          intro="What separates a gift from a parcel is everything you do not see: the ingredients, the kitchen, the packing and the people who stand behind the order."
        />
        <div className="mt-16 grid gap-px overflow-hidden rounded-[2rem] border border-gold-300/50 bg-gold-300/50 sm:grid-cols-2 lg:grid-cols-3">
          {REASONS.map((r, i) => (
            <Reveal key={r.title} delay={(i % 3) * 0.08} className="h-full">
              <div className="group relative h-full bg-cream-50 p-9 transition-colors duration-700 ease-luxe hover:bg-cream">
                <span className="font-display text-sm text-gold-600">0{i + 1}</span>
                <Icon name={r.icon} className="mt-5 h-8 w-8 text-maroon transition-transform duration-700 ease-luxe group-hover:scale-110" />
                <h3 className="mt-5 font-display text-2xl font-semibold text-ink">{r.title}</h3>
                <p className="mt-3 leading-relaxed text-ink-muted">{r.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
