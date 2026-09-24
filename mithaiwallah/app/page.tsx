import { PageShell } from '@/components/layout/PageShell';
import { JsonLd } from '@/components/seo/JsonLd';
import { Audiences } from '@/components/sections/Audiences';
import { CollectionShowcase } from '@/components/sections/CollectionShowcase';
import { EnquirySection } from '@/components/sections/EnquirySection';
import { CorporateGifting, GiftCollections, WeddingGifting } from '@/components/sections/Gifting';
import { Hero } from '@/components/sections/Hero';
import { InstagramGallery } from '@/components/sections/InstagramGallery';
import { Manufacturing } from '@/components/sections/Manufacturing';
import { Story } from '@/components/sections/Story';
import { Testimonials } from '@/components/sections/Testimonials';
import { WhyChoose } from '@/components/sections/WhyChoose';
import { Button } from '@/components/ui/Button';
import { Marquee } from '@/components/ui/Marquee';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { localBusinessSchema, pageMeta, websiteSchema } from '@/lib/seo';

export const metadata = pageMeta({
  title: 'Mithaiwallah — Premium Indian Sweets, Corporate & Wedding Gifting',
  absoluteTitle: true,
  description:
    'Premium handcrafted Indian sweets from Prayagraj — milk cake, kalakand, malai barfi, peda, kunda and Bikaneri cake. Luxury mithai boxes, corporate gifting, wedding hampers and bulk orders across India.',
  path: '/',
});

export const revalidate = 3600;

export default function Home() {
  return (
    <PageShell overDark>
      <JsonLd data={[websiteSchema(), localBusinessSchema()]} />
      <Hero />
      <Marquee />
      <Story />
      <section id="collection" className="bg-cream-50 py-24 sm:py-32">
        <div className="container-luxe">
          <SectionHeading
            eyebrow="The Signature Collection"
            title="Six sweets. Each one made the long way."
            intro="Pure milk solids, premium dry fruits and recipes that have not changed because they did not need to."
          />
          <div className="mt-14">
            <CollectionShowcase />
          </div>
          <div className="mt-16 text-center">
            <Button href="/sweets" variant="outline" icon="arrow">
              View the full collection
            </Button>
          </div>
        </div>
      </section>
      <CorporateGifting />
      <GiftCollections />
      <WeddingGifting />
      <WhyChoose />
      <Manufacturing />
      <Audiences />
      <Testimonials />
      <InstagramGallery />
      <EnquirySection />
    </PageShell>
  );
}
