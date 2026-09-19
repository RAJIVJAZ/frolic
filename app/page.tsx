import type { Metadata } from 'next';
import { Hero } from '@/components/sections/Hero';
import { BestSellers } from '@/components/sections/BestSellers';
import { Story } from '@/components/sections/Story';
import { FlavourCarousel } from '@/components/sections/FlavourCarousel';
import { Ingredients } from '@/components/sections/Ingredients';
import { Science } from '@/components/sections/Science';
import { SocialProof } from '@/components/sections/SocialProof';
import { SubscribeCta } from '@/components/sections/SubscribeCta';
import { JsonLd } from '@/components/JsonLd';
import { buildMetadata, itemListSchema, faqSchema } from '@/lib/seo';
import { HOME_FAQS } from '@/lib/faqs';

export const metadata: Metadata = buildMetadata({
  title: "FROLIC — India's Prebiotic Functional Soda | Feel Good. Sip Different.",
  description:
    'Ten prebiotic sodas built from Indian fruit and spice. 7g of prebiotic fibre, 4g added sugar, no caffeine. Nimbu masala, aam panna, kokum, jamun and more. Free shipping over ₹999.',
  path: '/',
  keywords: [
    'prebiotic soda India',
    'healthy soda India',
    'low sugar soft drink',
    'gut health drink India',
    'functional beverage India',
  ],
});

export default function HomePage() {
  return (
    <>
      <JsonLd data={[itemListSchema(), faqSchema(HOME_FAQS)]} />
      <Hero />
      <BestSellers />
      <Story />
      <FlavourCarousel />
      <Science />
      <Ingredients limit={6} showFilter={false} />
      <SocialProof />
      <SubscribeCta />
    </>
  );
}
