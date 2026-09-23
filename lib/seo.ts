import type { Metadata } from 'next';
import { products, type Product } from './products';

export const SITE = {
  name: 'FROLIC',
  legalName: 'Frolic Beverages Pvt. Ltd.',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://frolic.in',
  tagline: 'Feel Good. Sip Different.',
  description:
    "A premium prebiotic soda being built in India — prebiotic fibre, low sugar and botanical ingredients in flavours drawn from Indian drinking culture. In development.",
  twitter: '@drinkfrolic',
  instagram: 'https://instagram.com/drinkfrolic',
} as const;

export function absoluteUrl(path = '/'): string {
  return new URL(path, SITE.url).toString();
}

/** Page-level metadata builder — keeps titles, OG and canonicals consistent. */
export function buildMetadata({
  title,
  description,
  path = '/',
  image,
  keywords,
}: {
  title: string;
  description: string;
  path?: string;
  image?: string;
  keywords?: string[];
}): Metadata {
  const url = absoluteUrl(path);
  const ogImage = image ?? '/og/default.png';
  return {
    title,
    description,
    keywords,
    alternates: { canonical: url },
    openGraph: {
      type: 'website',
      url,
      title,
      description,
      siteName: SITE.name,
      locale: 'en_IN',
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: 'summary_large_image',
      site: SITE.twitter,
      title,
      description,
      images: [ogImage],
    },
  };
}

/* ——— JSON-LD builders ————————————————————————————————————————— */

export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${SITE.url}/#organization`,
    name: SITE.name,
    legalName: SITE.legalName,
    url: SITE.url,
    logo: absoluteUrl('/brand/frolic-logo.png'),
    slogan: SITE.tagline,
    description: SITE.description,
    foundingDate: '2024',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Prayagraj',
      addressRegion: 'Uttar Pradesh',
      addressCountry: 'IN',
    },
    sameAs: [SITE.instagram, 'https://www.linkedin.com/company/drinkfrolic'],
    contactPoint: [
      {
        '@type': 'ContactPoint',
        contactType: 'customer support',
        email: 'hello@frolic.in',
        availableLanguage: ['en', 'hi'],
        areaServed: 'IN',
      },
    ],
  };
}

export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE.url}/#website`,
    url: SITE.url,
    name: SITE.name,
    publisher: { '@id': `${SITE.url}/#organization` },
    potentialAction: {
      '@type': 'SearchAction',
      target: { '@type': 'EntryPoint', urlTemplate: `${SITE.url}/search?q={query}` },
      'query-input': 'required name=query',
    },
  };
}

export function productSchema(product: Product, reviewCount = 0, rating = 0) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    '@id': absoluteUrl(`/products/${product.handle}/#product`),
    name: `FROLIC ${product.name}`,
    sku: product.sku,
    description: product.story,
    brand: { '@type': 'Brand', name: SITE.name },
    category: 'Functional Beverage > Prebiotic Soda',
    image: [absoluteUrl(`/og/${product.handle}.png`)],
    nutrition: {
      '@type': 'NutritionInformation',
      servingSize: product.nutrition.servingSize,
      calories: `${product.nutrition.energyKcal} kcal`,
      sugarContent: `${product.nutrition.totalSugarG} g`,
      fiberContent: `${product.nutrition.dietaryFibreG} g`,
      sodiumContent: `${product.nutrition.sodiumMg} mg`,
      fatContent: `${product.nutrition.totalFatG} g`,
      proteinContent: `${product.nutrition.proteinG} g`,
    },
    offers: {
      '@type': 'AggregateOffer',
      priceCurrency: 'INR',
      lowPrice: Math.round(product.price * 0.68),
      highPrice: product.price,
      offerCount: 3,
      availability: 'https://schema.org/InStock',
      url: absoluteUrl(`/products/${product.handle}`),
      seller: { '@id': `${SITE.url}/#organization` },
    },
    ...(reviewCount > 0 && {
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: rating,
        reviewCount,
        bestRating: 5,
      },
    }),
  };
}

export function faqSchema(faqs: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  };
}

export function breadcrumbSchema(crumbs: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.name,
      item: absoluteUrl(c.path),
    })),
  };
}

export function itemListSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'FROLIC prebiotic soda flavours',
    numberOfItems: products.length,
    itemListElement: products.map((p, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: `FROLIC ${p.name}`,
      url: absoluteUrl(`/products/${p.handle}`),
    })),
  };
}
