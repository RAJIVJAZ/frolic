import type { Metadata } from 'next';
import { PreLaunchHero } from '@/components/sections/PreLaunchHero';
import { Mission } from '@/components/sections/Mission';
import { LaunchFlavours } from '@/components/sections/LaunchFlavours';
import { FounderStory } from '@/components/sections/FounderStory';
import { DevelopmentRoadmap, Timeline } from '@/components/prelaunch/Roadmap';
import { Science } from '@/components/sections/Science';
import { Ingredients } from '@/components/sections/Ingredients';
import { SignupForm } from '@/components/prelaunch/SignupForm';
import { JsonLd } from '@/components/JsonLd';
import { buildMetadata, faqSchema } from '@/lib/seo';
import { PRELAUNCH_FAQS } from '@/lib/faqs';

export const metadata: Metadata = buildMetadata({
  title: 'FROLIC — A New Generation of Indian Soda | Launching 2027',
  description:
    'FROLIC is a premium prebiotic soda being built in India — nimbu masala, aam panna, kokum and ginger lime, with prebiotic fibre and a quarter of the sugar. In development. Join the waitlist.',
  path: '/',
  keywords: [
    'prebiotic soda India',
    'Indian functional soda',
    'healthy soda India',
    'low sugar soft drink India',
    'gut health drink India',
  ],
});

export default function HomePage() {
  return (
    <>
      <JsonLd data={faqSchema(PRELAUNCH_FAQS)} />
      <PreLaunchHero />
      <Mission />
      <LaunchFlavours />
      <DevelopmentRoadmap limit={6} />
      <FounderStory />
      <Science />
      <Ingredients limit={6} showFilter={false} />
      <Timeline />

      <section className="py-section">
        <div className="shell">
          <div className="mx-auto max-w-3xl rounded-panel border-2 border-charcoal bg-cream p-8 text-center sm:p-12">
            <p className="eyebrow">Coming soon</p>
            <h2 className="mt-4 text-step-4">Be among the first to taste FROLIC.</h2>
            <p className="mx-auto mt-5 max-w-prose text-step-1 text-charcoal-muted">
              Early tasters get pilot batches before launch. Distributors and investors can register
              interest on the same page.
            </p>
            <div className="mx-auto mt-8 max-w-md">
              <SignupForm intent="waitlist" compact />
            </div>
            <p className="mt-5 text-step--1 text-charcoal-muted">
              We write when something real happens — not on a schedule.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
