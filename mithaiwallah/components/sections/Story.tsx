import { SweetArt } from '@/components/art/SweetArt';
import { ArchFrame } from '@/components/ui/ArchFrame';
import { Button } from '@/components/ui/Button';
import { Icon, type IconName } from '@/components/ui/Icon';
import { Reveal } from '@/components/ui/Reveal';
import { Ornament } from '@/components/ui/SectionHeading';

const PILLARS: { icon: IconName; title: string; body: string }[] = [
  { icon: 'flame', title: 'Traditional Recipes', body: 'Slow-cooked the way these sweets have always been made — no shortcuts, no premixes.' },
  { icon: 'leaf', title: 'Premium Ingredients', body: 'Full-cream milk, pure desi ghee, whole dry fruits and real saffron and cardamom.' },
  { icon: 'factory', title: 'Modern Manufacturing', body: 'Hygienic, temperature-controlled production that makes the hundredth box as good as the first.' },
  { icon: 'sparkle', title: 'Customised Solutions', body: 'Assortments, packaging and branding shaped around your occasion, not a catalogue.' },
];

export function Story() {
  return (
    <section id="story" className="relative overflow-hidden py-24 sm:py-32">
      <div className="container-luxe grid items-center gap-16 lg:grid-cols-[1fr_1.1fr] lg:gap-24">
        <Reveal className="relative mx-auto w-full max-w-md">
          <ArchFrame tone="#EFDDBA" className="aspect-[4/5]">
            <div className="absolute inset-x-0 top-14 text-center">
              <span className="font-hindi text-3xl text-gold-700/70">मिठाईवाला</span>
            </div>
            <SweetArt variant="milk-cake" className="absolute inset-x-0 bottom-6 w-full" />
          </ArchFrame>
          <div className="absolute -bottom-6 -right-4 rounded-2xl bg-maroon px-6 py-5 text-cream shadow-luxe sm:-right-10">
            <p className="font-display text-3xl font-semibold text-gold-200">Hours,</p>
            <p className="text-sm text-cream/75">not minutes, in every kadhai</p>
          </div>
        </Reveal>

        <div>
          <Reveal>
            <span className="eyebrow">Our Story</span>
            <Ornament className="-ml-1 mt-3" />
            <h2 className="mt-5 font-display text-display-md font-semibold text-maroon text-balance">
              A sweet-maker’s patience. A modern kitchen’s discipline.
            </h2>
            <div className="mt-7 space-y-5 text-[1.05rem] leading-relaxed text-ink-soft">
              <p>
                Mithaiwallah was born in Prayagraj — a city that has welcomed pilgrims, poets and wedding processions for
                centuries — on a simple belief: the sweets you give say something about you.
              </p>
              <p>
                So we make them the long way. Milk reduced slowly in open kadhais, khoya roasted in pure ghee, every tray
                finished by hand. Then we pack them with the care of a jeweller, because a gift should feel like one before
                the lid is even lifted.
              </p>
            </div>
          </Reveal>

          <div className="mt-10 grid gap-x-8 gap-y-8 sm:grid-cols-2">
            {PILLARS.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.08}>
                <div className="flex gap-4">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-gold-400/50 bg-cream-50 text-gold-700">
                    <Icon name={p.icon} className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className="font-display text-xl font-semibold text-ink">{p.title}</h3>
                    <p className="mt-1.5 text-[0.95rem] leading-relaxed text-ink-muted">{p.body}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-10">
            <Button href="/about" variant="ghost" icon="arrow">
              Read our story
            </Button>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
