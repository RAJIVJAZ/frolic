import { GiftBoxArt } from '@/components/art/GiftBoxArt';
import { Button } from '@/components/ui/Button';
import { Icon, type IconName } from '@/components/ui/Icon';
import { Reveal } from '@/components/ui/Reveal';
import { Ornament, SectionHeading } from '@/components/ui/SectionHeading';
import { TERMS } from '@/lib/business';
import { CORPORATE_OFFERINGS, CUSTOMISATIONS, GIFT_COLLECTIONS, WEDDING_OFFERINGS } from '@/lib/gifting';
import { cn } from '@/lib/utils';

const CORP_ICONS: IconName[] = ['users', 'handshake', 'sparkle', 'gift'];
const WED_ICONS: IconName[] = ['gift', 'heart', 'mail', 'sparkle'];

/** A round foil seal — used for "Custom Branding Available". */
export function Seal({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn('grid h-32 w-32 place-items-center rounded-full bg-gold-foil p-[3px] shadow-glow', className)}>
      <div className="grid h-full w-full place-items-center rounded-full border border-dashed border-maroon/40 bg-maroon text-center">
        <span className="px-4 font-display text-[1.05rem] font-semibold leading-tight text-gold-200">{children}</span>
      </div>
    </div>
  );
}

export function CorporateGifting() {
  return (
    <section id="corporate" className="relative overflow-hidden bg-cream-200/70 py-24 sm:py-32">
      <div className="jaali pointer-events-none absolute inset-0 opacity-50" />
      <div className="container-luxe relative">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          <div>
            <SectionHeading
              align="left"
              eyebrow="Corporate Gifting"
              title="Gifts that carry your name well."
              intro="From a hundred employee boxes to a keepsake trunk for your most important client — planned with your team weeks ahead, branded with your identity and delivered on the date you set, anywhere in India."
            />
            <Reveal className="mt-9 flex flex-wrap gap-3">
              <Button href="/corporate-gifting" variant="primary" icon="arrow">
                Plan corporate gifting
              </Button>
              <Button href="/brochure/corporate" variant="outline" iconLeft="download">
                Corporate catalogue
              </Button>
            </Reveal>
          </div>
          <Reveal className="relative">
            <GiftBoxArt variant="pair" tone="maroon" className="w-full" />
            <Seal className="absolute -top-2 right-2 rotate-[-8deg] sm:right-8">Custom Branding Available</Seal>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {CORPORATE_OFFERINGS.map((o, i) => (
            <Reveal key={o.title} delay={i * 0.07} className="h-full">
              <article className="group flex h-full flex-col rounded-3xl border border-gold-300/50 bg-cream-50 p-7 shadow-card transition-all duration-700 ease-luxe hover:-translate-y-1 hover:border-gold-400">
                <span className="grid h-12 w-12 place-items-center rounded-full bg-maroon text-gold-200">
                  <Icon name={CORP_ICONS[i]} />
                </span>
                <h3 className="mt-6 font-display text-2xl font-semibold text-maroon">{o.title}</h3>
                <p className="mt-3 text-[0.95rem] leading-relaxed text-ink-muted">{o.body}</p>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-10 flex flex-col items-center justify-between gap-4 rounded-2xl border border-gold-300/50 bg-cream-50/80 px-6 py-5 text-center text-sm text-ink-soft sm:flex-row sm:text-left">
          <span>
            <strong className="text-maroon">From {TERMS.corporateMinimumBoxes} boxes.</strong> {TERMS.brandedLeadTime}. {TERMS.sampleBoxes}.
          </span>
          <Button href="/contact?type=corporate#enquire" variant="ghost" icon="arrow">
            Get a corporate quote
          </Button>
        </Reveal>
      </div>
    </section>
  );
}

export function GiftCollections() {
  return (
    <section id="gift-boxes" className="py-24 sm:py-32">
      <div className="container-luxe">
        <SectionHeading
          eyebrow="Signature Gift Boxes"
          title="Three ways to say it with mithai."
          intro="Every collection can be re-assorted, re-sized and branded. Pricing depends on volume, customisation and delivery spread — so we quote each order rather than print a list."
        />
        <div className="mt-16 grid gap-8 lg:grid-cols-3">
          {GIFT_COLLECTIONS.map((c, i) => (
            <Reveal key={c.name} delay={i * 0.1} className="h-full">
              <article
                className={cn(
                  'relative flex h-full flex-col overflow-hidden rounded-[2rem] border p-8 shadow-card',
                  c.box === 'gold'
                    ? 'border-gold-400 bg-maroon-velvet text-cream'
                    : 'border-gold-300/60 bg-cream-50',
                )}
              >
                {c.box === 'gold' && (
                  <span className="absolute right-6 top-6 rounded-full bg-gold-foil px-3 py-1 text-[0.68rem] font-bold uppercase tracking-[0.18em] text-maroon-900">
                    Most gifted to leadership
                  </span>
                )}
                <div className="-mx-4 -mt-2">
                  <GiftBoxArt variant="closed" tone={c.box} className="w-full" />
                </div>
                <h3 className={cn('mt-2 font-display text-3xl font-semibold', c.box === 'gold' ? 'text-gold-200' : 'text-maroon')}>
                  {c.name}
                </h3>
                <p className={cn('mt-2 text-sm', c.box === 'gold' ? 'text-cream/70' : 'text-ink-muted')}>{c.finish}</p>
                <ul className="mt-6 space-y-2.5">
                  {c.contents.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-[0.95rem]">
                      <Icon name="check" className={cn('mt-0.5 h-4 w-4 shrink-0', c.box === 'gold' ? 'text-gold-300' : 'text-gold-600')} />
                      {item}
                    </li>
                  ))}
                </ul>
                <p className={cn('mt-6 border-t pt-5 text-sm', c.box === 'gold' ? 'border-cream/15 text-cream/70' : 'border-gold-300/50 text-ink-muted')}>
                  <span className={cn('font-semibold', c.box === 'gold' ? 'text-gold-200' : 'text-ink')}>Best for: </span>
                  {c.bestFor}
                </p>
                <div className="mt-auto pt-7">
                  <Button
                    href={`/contact?type=corporate&collection=${encodeURIComponent(c.name)}#enquire`}
                    variant={c.box === 'gold' ? 'gold' : 'outline'}
                    icon="arrow"
                    className="w-full"
                  >
                    Request a quote
                  </Button>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function WeddingGifting() {
  return (
    <section id="weddings" className="relative overflow-hidden bg-maroon-velvet py-24 text-cream sm:py-32">
      <div className="jaali-light pointer-events-none absolute inset-0" />
      <div className="container-luxe relative">
        <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_1fr]">
          <Reveal className="order-2 lg:order-1">
            <GiftBoxArt variant="stack" tone="maroon" label="A & R" className="mx-auto w-full max-w-xl" />
          </Reveal>
          <div className="order-1 lg:order-2">
            <SectionHeading
              light
              align="left"
              eyebrow="Wedding Gifting"
              title={
                <>
                  For the sweetest days <span className="text-foil italic">of their lives.</span>
                </>
              }
              intro="Hampers for the family, return gifts for every guest, and invitation boxes that arrive with the card — each one designed around your wedding, with your names on it."
            />
            <Reveal className="mt-8 grid gap-3 sm:grid-cols-2">
              {CUSTOMISATIONS.slice(0, 3).map((c) => (
                <div key={c.title} className="flex items-center gap-3 text-[0.95rem] text-cream/85">
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-gold-300/40 text-gold-300">
                    <Icon name="check" className="h-4 w-4" />
                  </span>
                  {c.title}
                </div>
              ))}
            </Reveal>
            <Reveal className="mt-10 flex flex-wrap gap-3">
              <Button href="/wedding-gifting" variant="gold" icon="arrow">
                Book a wedding consultation
              </Button>
              <Button href="/brochure/wedding" variant="outline-light" iconLeft="download">
                Wedding catalogue
              </Button>
            </Reveal>
          </div>
        </div>

        <div className="mt-20 grid gap-px overflow-hidden rounded-3xl border border-gold-300/20 bg-gold-300/20 sm:grid-cols-2 lg:grid-cols-4">
          {WEDDING_OFFERINGS.map((o, i) => (
            <Reveal key={o.title} delay={i * 0.07} className="h-full">
              <article className="h-full bg-maroon-800/90 p-8">
                <Icon name={WED_ICONS[i]} className="h-6 w-6 text-gold-300" />
                <h3 className="mt-5 font-display text-2xl font-semibold text-gold-100">{o.title}</h3>
                <p className="mt-3 text-[0.95rem] leading-relaxed text-cream/70">{o.body}</p>
              </article>
            </Reveal>
          ))}
        </div>
        <p className="mt-8 text-center text-sm text-cream/60">
          <Ornament light className="mx-auto mb-4" />
          Wedding orders from {TERMS.weddingMinimumBoxes} boxes · Tasting sessions available in Prayagraj
        </p>
      </div>
    </section>
  );
}
