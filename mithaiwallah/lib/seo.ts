import type { Metadata } from 'next';
import { BRAND, CONTACT, SITE_URL, SOCIAL, COMPLIANCE } from './business';
import type { Product } from './products';

export const abs = (path: string) => `${SITE_URL}${path === '/' ? '' : path}`;

export function pageMeta({
  title,
  description,
  path,
  absoluteTitle = false,
  noindex = false,
  type = 'website',
}: {
  title: string;
  description: string;
  path: string;
  absoluteTitle?: boolean;
  noindex?: boolean;
  type?: 'website' | 'article';
}): Metadata {
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: abs(path) },
    openGraph: { title, description, url: abs(path), siteName: BRAND.name, locale: 'en_IN', type },
    twitter: { card: 'summary_large_image', title, description },
    robots: noindex ? { index: false, follow: true } : undefined,
  };
}

/* ── Schema.org ──────────────────────────────────────────────────────── */

const ORG_ID = `${SITE_URL}/#organization`;
const BUSINESS_ID = `${SITE_URL}/#business`;

const address = () => ({
  '@type': 'PostalAddress',
  ...(CONTACT.streetAddress ? { streetAddress: CONTACT.streetAddress } : {}),
  addressLocality: CONTACT.locality,
  addressRegion: CONTACT.region,
  ...(CONTACT.postalCode ? { postalCode: CONTACT.postalCode } : {}),
  addressCountry: 'IN',
});

export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': ORG_ID,
    name: BRAND.name,
    alternateName: BRAND.hindiName,
    url: SITE_URL,
    logo: `${SITE_URL}/icon.svg`,
    description: BRAND.description,
    slogan: BRAND.tagline,
    sameAs: [SOCIAL.instagram, SOCIAL.facebook, SOCIAL.youtube],
    ...(CONTACT.email ? { email: CONTACT.email } : {}),
    ...(CONTACT.phone ? { telephone: `+${CONTACT.phone}` } : {}),
    address: address(),
    ...(COMPLIANCE.fssaiLicence
      ? { identifier: { '@type': 'PropertyValue', name: 'FSSAI Licence', value: COMPLIANCE.fssaiLicence } }
      : {}),
    contactPoint: [
      {
        '@type': 'ContactPoint',
        contactType: 'sales',
        areaServed: 'IN',
        availableLanguage: ['en', 'hi'],
        ...(CONTACT.phone ? { telephone: `+${CONTACT.phone}` } : {}),
        ...(CONTACT.salesEmail ? { email: CONTACT.salesEmail } : {}),
      },
    ],
  };
}

/**
 * LocalBusiness for Google's local pack. `FoodEstablishment` is the closest
 * schema.org type to a sweets maker that also sells direct; there is no
 * "SweetShop". Street address and geo are added once confirmed — Google
 * compares them with the Business Profile.
 */
export function localBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'FoodEstablishment',
    '@id': BUSINESS_ID,
    name: BRAND.name,
    url: SITE_URL,
    image: `${SITE_URL}/opengraph-image`,
    parentOrganization: { '@id': ORG_ID },
    servesCuisine: 'Indian sweets (mithai)',
    priceRange: '₹₹–₹₹₹',
    address: address(),
    areaServed: { '@type': 'Country', name: 'India' },
    ...(CONTACT.phone ? { telephone: `+${CONTACT.phone}` } : {}),
    ...(CONTACT.mapsUrl ? { hasMap: CONTACT.mapsUrl } : {}),
    openingHoursSpecification: CONTACT.hoursSchema.map((h) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: h.days.map((d) => `https://schema.org/${DAY[d]}`),
      opens: h.opens,
      closes: h.closes,
    })),
    knowsAbout: [
      'Premium Indian sweets',
      'Corporate gifting',
      'Wedding gift hampers',
      'Luxury mithai boxes',
      'Bulk and wholesale sweets',
      'Private label sweets manufacturing',
    ],
  };
}

const DAY: Record<string, string> = {
  Mo: 'Monday',
  Tu: 'Tuesday',
  We: 'Wednesday',
  Th: 'Thursday',
  Fr: 'Friday',
  Sa: 'Saturday',
  Su: 'Sunday',
};

export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    url: SITE_URL,
    name: BRAND.name,
    publisher: { '@id': ORG_ID },
    inLanguage: 'en-IN',
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [{ name: 'Home', path: '/' }, ...items].map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      item: abs(it.path),
    })),
  };
}

/**
 * Product schema without `offers`: prices are quoted, not listed. Google will
 * not show a price rich result for these pages — deliberate, see
 * docs/02-seo-strategy.md. No `aggregateRating` until there are real,
 * verifiable reviews.
 */
export function productSchema(p: Product) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    '@id': `${abs(`/sweets/${p.slug}`)}#product`,
    name: `${p.name} (${p.hindi})`,
    description: p.metaDescription,
    brand: { '@type': 'Brand', name: BRAND.name },
    manufacturer: { '@id': ORG_ID },
    category: 'Indian sweets',
    image: `${abs(`/sweets/${p.slug}`)}/opengraph-image`,
    material: p.ingredients.join(', '),
    countryOfOrigin: 'IN',
  };
}

export function serviceSchema({ name, description, path, serviceType }: { name: string; description: string; path: string; serviceType: string }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    description,
    serviceType,
    url: abs(path),
    provider: { '@id': ORG_ID },
    areaServed: { '@type': 'Country', name: 'India' },
  };
}

export function faqSchema(faqs: { q: string; a: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
}

export function articleSchema(post: { title: string; description: string; slug: string; date: string; updated?: string }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.updated ?? post.date,
    mainEntityOfPage: abs(`/journal/${post.slug}`),
    author: { '@type': 'Organization', name: BRAND.name, url: SITE_URL },
    publisher: { '@id': ORG_ID },
    image: `${abs(`/journal/${post.slug}`)}/opengraph-image`,
  };
}
