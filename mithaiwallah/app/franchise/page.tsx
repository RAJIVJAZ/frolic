import { PageShell } from '@/components/layout/PageShell';
import { JsonLd } from '@/components/seo/JsonLd';
import { EnquirySection } from '@/components/sections/EnquirySection';
import { FeatureGrid } from '@/components/sections/FeatureGrid';
import { PageHero } from '@/components/sections/PageHero';
import { Button } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { breadcrumbSchema, pageMeta } from '@/lib/seo';

const PATH = '/franchise';

export const metadata = pageMeta({
  title: 'Franchise & Distributorship — Partner with Mithaiwallah',
  description:
    'Bring Mithaiwallah premium sweets and gifting to your city. Franchise and distributor opportunities across Uttar Pradesh, Madhya Pradesh and beyond — register your interest.',
  path: PATH,
});

export default function FranchisePage() {
  return (
    <PageShell>
      <JsonLd data={breadcrumbSchema([{ name: 'Franchise', path: PATH }])} />
      <PageHero
        eyebrow="Franchise & Distribution"
        title="Bring Mithaiwallah to your city."
        intro="We are building a network of franchise partners and distributors who share our standards — starting across Uttar Pradesh and Madhya Pradesh. Register your interest and we will share the model."
        crumbs={[{ name: 'Franchise', path: PATH }]}
        actions={
          <>
            <Button href="#enquire" variant="primary" icon="arrow">
              Register interest
            </Button>
            <Button href="#distributors" variant="outline">
              Distributorship
            </Button>
          </>
        }
      />

      <section className="py-24 sm:py-28">
        <div className="container-luxe">
          <SectionHeading
            eyebrow="Franchise Partners"
            title="A premium sweets & gifting boutique."
            intro="The franchise model is being finalised with our first partners. Expressions of interest now shape where we open first — and early partners help define the format."
          />
          <div className="mt-14">
            <FeatureGrid
              cols={3}
              items={[
                { icon: 'store', title: 'Boutique format', body: 'A compact, premium store built around gifting — the signature collection, gift boxes and corporate orders from your city.' },
                { icon: 'factory', title: 'Central production', body: 'Sweets made in our kitchen and supplied to you, so every outlet tastes the same and needs no halwai team.' },
                { icon: 'sparkle', title: 'Brand & marketing', body: 'Store design, packaging, social content and festive campaigns provided centrally.' },
                { icon: 'building', title: 'Corporate pipeline', body: 'Corporate and wedding leads from your territory routed to you.' },
                { icon: 'users', title: 'Training', body: 'Product, service and gifting-sales training for you and your team.' },
                { icon: 'handshake', title: 'Transparent terms', body: 'Investment, margins and obligations set out in writing before you commit to anything.' },
              ]}
            />
          </div>
        </div>
      </section>

      <section id="distributors" className="scroll-mt-28 relative overflow-hidden bg-maroon-velvet py-24 text-cream sm:py-28">
        <div className="jaali-light pointer-events-none absolute inset-0" />
        <div className="container-luxe relative grid gap-14 lg:grid-cols-2">
          <SectionHeading
            light
            align="left"
            eyebrow="Distributors & Super-Stockists"
            title="Territories open across UP & MP."
            intro="For established FMCG and food distributors with retail reach, cold-chain awareness and a sales team. We supply the shelf-stable range and support you with trade marketing."
          />
          <Reveal className="space-y-4">
            {[
              'Shelf-stable lines: milk cake, peda, kunda, Bikaneri cake',
              'Retail-ready packs with batch codes and best-before dates',
              'Festive-season allocation planned in advance',
              'Point-of-sale material and social content for your retailers',
              'Clear territory, margin and credit terms in writing',
            ].map((pt) => (
              <p key={pt} className="flex gap-3 text-cream/85">
                <Icon name="check" className="mt-0.5 h-5 w-5 shrink-0 text-gold-300" /> {pt}
              </p>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="py-20">
        <div className="container-luxe max-w-3xl text-center">
          <p className="text-sm leading-relaxed text-ink-muted">
            This page invites expressions of interest. It is not an offer of a franchise, and no investment should be made
            on the basis of it. Terms are shared individually, in writing, after an introductory conversation.
          </p>
        </div>
      </section>

      <EnquirySection defaultType="franchise" lockType title="Register your interest." intro="Tell us about yourself, your city and what you are looking for. We will share details of the model and next steps." />
    </PageShell>
  );
}
