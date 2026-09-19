import type { Metadata } from 'next';
import { buildMetadata, breadcrumbSchema } from '@/lib/seo';
import { JsonLd } from '@/components/JsonLd';
import { Reveal } from '@/components/ui/Reveal';
import { ButtonLink, Arrow } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';

export const metadata: Metadata = buildMetadata({
  title: 'Frolic Club — Rewards & Referrals',
  description:
    'Earn Fizz points on every order, review and referral. Three tiers, free cans, early access to limited batches, and ₹150 for both sides on a referral.',
  path: '/rewards',
});

const EARN = [
  { action: 'Every ₹100 spent', points: '10 Fizz', note: 'Automatic on every order' },
  { action: 'Write a review', points: '150 Fizz', note: 'Once per flavour you have bought' },
  { action: 'Add a photo to a review', points: '+100 Fizz', note: 'On top of the review points' },
  { action: 'Refer a friend', points: '500 Fizz', note: 'When their first order ships' },
  { action: 'Birthday', points: '250 Fizz', note: 'Add your date to your account' },
  { action: 'Follow @drinkfrolic', points: '50 Fizz', note: 'One time' },
];

const SPEND = [
  { reward: '₹100 off', cost: '1,000 Fizz' },
  { reward: 'Free 6-can pack', cost: '2,500 Fizz' },
  { reward: 'Free shipping for 3 months', cost: '3,000 Fizz' },
  { reward: 'Limited batch early access', cost: '4,000 Fizz' },
];

const TIERS = [
  {
    name: 'Sipper',
    threshold: 'From your first order',
    perks: ['10 Fizz per ₹100', 'Birthday points', 'Member-only flavour drops'],
    accent: '#8FD6C4',
  },
  {
    name: 'Regular',
    threshold: '5,000 Fizz earned',
    perks: ['15 Fizz per ₹100', 'Free shipping, always', 'First access to new flavours'],
    accent: '#F0A22B',
  },
  {
    name: 'Devotee',
    threshold: '15,000 Fizz earned',
    perks: ['20 Fizz per ₹100', 'Free shipping, always', 'Two free cans in every fourth box', 'Name on the tasting panel invite list'],
    accent: '#8B47BC',
  },
];

export default function RewardsPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Rewards', path: '/rewards' },
        ])}
      />

      <section className="shell pt-12">
        <div className="max-w-3xl">
          <p className="eyebrow">Frolic Club</p>
          <h1 className="mt-4 text-step-5">Drink more. Pay less. Obviously.</h1>
          <p className="mt-6 text-step-1 text-charcoal-muted">
            Points on everything, three tiers that actually change what you pay, and a referral that
            is worth ₹150 to both of you. Free to join, joins itself on your first order.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href="/shop" size="lg">
              Start earning <Arrow />
            </ButtonLink>
            <ButtonLink href="/account" variant="outline" size="lg">
              Check my balance
            </ButtonLink>
          </div>
        </div>
      </section>

      <section className="shell py-section">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 className="text-step-3">How to earn Fizz</h2>
            <ul className="mt-7 space-y-px overflow-hidden rounded-card bg-charcoal/10">
              {EARN.map((row) => (
                <li key={row.action} className="flex items-center justify-between gap-4 bg-cream px-5 py-4">
                  <span>
                    <span className="block font-semibold">{row.action}</span>
                    <span className="mt-0.5 block text-step--1 text-charcoal-muted">{row.note}</span>
                  </span>
                  <span className="shrink-0 font-display font-black text-lime-700">{row.points}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-step-3">What to spend it on</h2>
            <ul className="mt-7 space-y-px overflow-hidden rounded-card bg-charcoal/10">
              {SPEND.map((row) => (
                <li key={row.reward} className="flex items-center justify-between gap-4 bg-cream px-5 py-5">
                  <span className="font-semibold">{row.reward}</span>
                  <span className="shrink-0 font-mono text-step--1 font-bold text-charcoal-muted">
                    {row.cost}
                  </span>
                </li>
              ))}
            </ul>

            <div className="mt-8 rounded-card border-2 border-charcoal p-6">
              <Badge tone="ink">Referral</Badge>
              <h3 className="mt-4 text-step-2">Give ₹150, get ₹150</h3>
              <p className="mt-2 text-charcoal-muted">
                Share your link. They get ₹150 off their first order, you get ₹150 in credit the
                moment it ships. No cap on how many times.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-ivory py-section">
        <div className="shell">
          <h2 className="text-step-3">Three tiers</h2>
          <ul className="mt-10 grid gap-5 lg:grid-cols-3">
            {TIERS.map((tier, i) => (
              <Reveal as="li" key={tier.name} delay={i}>
                <article className="h-full overflow-hidden rounded-card border border-charcoal-line bg-cream">
                  <div className="h-2" style={{ background: tier.accent }} aria-hidden />
                  <div className="p-7">
                    <h3 className="text-step-2">{tier.name}</h3>
                    <p className="mt-1.5 font-mono text-[0.68rem] uppercase tracking-[0.14em] text-charcoal-muted">
                      {tier.threshold}
                    </p>
                    <ul className="mt-6 space-y-2.5">
                      {tier.perks.map((perk) => (
                        <li key={perk} className="flex items-start gap-2.5 text-step--1">
                          <span
                            className="mt-[0.45em] h-1.5 w-1.5 shrink-0 rounded-full"
                            style={{ background: tier.accent }}
                            aria-hidden
                          />
                          {perk}
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              </Reveal>
            ))}
          </ul>
          <p className="mt-8 text-[0.75rem] text-charcoal-muted">
            Fizz points expire after 18 months of account inactivity. Tier status is reviewed
            annually. Full terms apply.
          </p>
        </div>
      </section>
    </>
  );
}
