import type { Metadata } from 'next';
import { Story } from '@/components/sections/Story';
import { JsonLd } from '@/components/JsonLd';
import { buildMetadata, breadcrumbSchema } from '@/lib/seo';
import { Reveal } from '@/components/ui/Reveal';
import { ButtonLink, Arrow } from '@/components/ui/Button';
import { Marquee } from '@/components/ui/Marquee';

export const metadata: Metadata = buildMetadata({
  title: 'Our Story',
  description:
    'Why we rebuilt Indian soda from the fibre up — the flavours we grew up drinking, made with 7g of prebiotic fibre and a quarter of the sugar.',
  path: '/story',
});

const CHAPTERS = [
  {
    year: '2023',
    title: 'A bad afternoon in a Pune warehouse',
    body: 'Our first batch of nimbu masala separated in the can within eleven days. The fibre dropped out of suspension, the salt clumped at the bottom, and the whole thing tasted like disappointed seawater. We drank one each anyway, because that is what you do, and then went back to the formulation bench for another fourteen months.',
  },
  {
    year: '2024',
    title: 'The flavours were the easy part',
    body: 'Deciding what to make took an afternoon. Nimbu, aam panna, jeera, kokum, jamun — these are not obscure. Every one of them is already a drink somebody makes at home or sells from a cart. The hard part was getting 7 g of fibre into a carbonated liquid without turning it cloudy, syrupy or flat.',
  },
  {
    year: '2025',
    title: 'Eleven ratios later',
    body: 'Inulin alone works but ferments fast, which some people feel. Acacia alone is gentle but adds body we did not want everywhere. Sixty-forty was the eleventh combination we tried and the first one that nobody on the panel had a complaint about. That ratio is now in every can we make.',
  },
  {
    year: '2026',
    title: 'Ten flavours, and counting',
    body: 'We launched with four and added six as the formulation library grew. Guava Chili is the newest and the one we were least sure about. It is now in the top three. We are not always right about what people will like, which is why the flavour quiz exists.',
  },
];

const VALUES = [
  {
    title: 'Say the number',
    body: 'Grams of fibre, grams of added sugar, kcal, sodium. On the can, on the site, in the same units, every time. If a figure is a category typical rather than ours, we label it as one.',
  },
  {
    title: 'Flavour first, always',
    body: 'Nobody drinks a functional beverage twice because of the function. If a formulation does not taste good enough to want again, no amount of fibre saves it and we do not ship it.',
  },
  {
    title: 'Indian by default, not as a theme',
    body: 'Kokum and jamun are not a flavour gimmick here — they are what half the founding team grew up drinking. We source them from the regions that actually grow them, seasonally, and accept the supply headaches that come with it.',
  },
  {
    title: 'Under-claim',
    body: 'The gut health category has an overselling problem. We would rather be the brand that told you less than it could than the one that told you more than it knew.',
  },
];

export default function StoryPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Our Story', path: '/story' },
        ])}
      />

      <section className="shell pt-12">
        <div className="max-w-3xl">
          <p className="eyebrow">Our story</p>
          <h1 className="mt-4 text-step-5">
            We wanted the drink that already existed — just built properly.
          </h1>
          <p className="mt-6 text-step-1 text-charcoal-muted">
            FROLIC did not start with a gap in the market. It started with a fridge full of things
            we liked drinking and a growing irritation about what was in them.
          </p>
        </div>
      </section>

      <Story />

      <section className="shell py-section">
        <p className="eyebrow">How we got here</p>
        <ol className="mt-10 space-y-px overflow-hidden rounded-panel bg-charcoal/10">
          {CHAPTERS.map((chapter, i) => (
            <Reveal as="li" key={chapter.year} delay={i} className="bg-cream">
              <article className="grid gap-4 p-7 sm:grid-cols-[6rem_1fr] sm:gap-8 sm:p-9">
                <p className="font-mono text-step-1 font-bold text-charcoal-muted">{chapter.year}</p>
                <div>
                  <h2 className="text-step-2">{chapter.title}</h2>
                  <p className="mt-3 max-w-prose leading-relaxed text-charcoal-muted">
                    {chapter.body}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </ol>
      </section>

      <Marquee
        items={['Feel Good.', 'Sip Different.']}
        speed={30}
        className="border-y border-charcoal-line py-6"
        itemClassName="font-display text-step-5 font-black text-charcoal/15"
        separator="✳"
      />

      <section className="shell py-section">
        <div className="max-w-2xl">
          <p className="eyebrow">What we hold to</p>
          <h2 className="mt-4 text-step-4">Four things we do not negotiate on.</h2>
        </div>

        <ul className="mt-12 grid gap-5 sm:grid-cols-2">
          {VALUES.map((value, i) => (
            <Reveal as="li" key={value.title} delay={i}>
              <article className="h-full rounded-card border border-charcoal-line p-7 transition-shadow hover:shadow-lift">
                <span className="font-mono text-[0.68rem] font-bold text-lime-700">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="mt-4 text-step-2">{value.title}</h3>
                <p className="mt-3 leading-relaxed text-charcoal-muted">{value.body}</p>
              </article>
            </Reveal>
          ))}
        </ul>

        <div className="mt-14">
          <ButtonLink href="/flavours" size="lg">
            See the range <Arrow />
          </ButtonLink>
        </div>
      </section>
    </>
  );
}
