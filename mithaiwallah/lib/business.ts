/**
 * Mithaiwallah — business facts.
 *
 * ┌──────────────────────────────────────────────────────────────────────┐
 * │  EVERY FACT THE SITE STATES ABOUT THE BUSINESS LIVES IN THIS FILE.   │
 * │                                                                      │
 * │  Phone numbers, licence numbers, lead times, order minimums and      │
 * │  delivery coverage are promises a customer can hold you to. Anything │
 * │  marked `null` or listed in `LAUNCH_CHECKS` below has not been        │
 * │  confirmed yet — the site hides it rather than inventing it.         │
 * └──────────────────────────────────────────────────────────────────────┘
 */

export const BRAND = {
  name: 'Mithaiwallah',
  hindiName: 'मिठाईवाला',
  legalName: 'Mithaiwallah',
  tagline: 'Handcrafted Traditions. Crafted for Celebrations.',
  positioning: 'A premium celebration & gifting brand',
  description:
    'Premium handcrafted Indian sweets, corporate gifting and customised wedding hampers — made in Prayagraj with pure milk solids, premium dry fruits and recipes kept the traditional way.',
  city: 'Prayagraj',
  region: 'Uttar Pradesh',
  regionCode: 'UP',
  country: 'India',
  countryCode: 'IN',
  /**
   * The real logo. Drop the file into /public/brand/ and set the path here —
   * every logo on the site (nav, footer, brochures, favicon card, schema)
   * switches over. Left null, the site uses the arch monogram placeholder.
   * SVG preferred; a transparent PNG at least 600px wide also works.
   */
  logo: null as null | { src: string; width: number; height: number; alt: string },
  /**
   * The hero film. Drop an MP4 (H.264, 1920×1080, under 8 MB, 10–20 s loop,
   * no audio) and a poster JPG into /public/media and set the paths here. The
   * home hero switches from the illustrated platter to the video. Brief in
   * docs/10-photography-brief.md.
   */
  heroVideo: null as null | { src: string; poster: string },
} as const;

// Literal `process.env.NEXT_PUBLIC_*` reads, not a helper taking the key as a
// string: Next.js only inlines public env vars into the browser bundle when
// it can see the literal property access.
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://mithaiwallah.in').trim().replace(/\/$/, '');

/** Digits only, with country code. Empty until the real number is set. */
const whatsapp = (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '').replace(/\D/g, '');
const phone = (process.env.NEXT_PUBLIC_PHONE_NUMBER ?? '').replace(/\D/g, '');

export const CONTACT = {
  whatsapp: whatsapp || null,
  phone: phone || null,
  /** Displayed in the footer and on /contact. CONFIRM the inbox exists. */
  email: 'hello@mithaiwallah.in' as string | null,
  salesEmail: 'gifting@mithaiwallah.in' as string | null,
  /**
   * Street address is withheld until confirmed — Google penalises a Business
   * Profile whose address does not match the website character for character.
   */
  streetAddress: null as string | null,
  postalCode: null as string | null,
  locality: 'Prayagraj',
  region: 'Uttar Pradesh',
  /** Opening hours for schema and the footer. CONFIRM. */
  hours: 'Mon–Sat, 10:00–19:00',
  hoursSchema: [{ days: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'], opens: '10:00', closes: '19:00' }],
  /** Google Maps link for the facility or shop, once the Business Profile exists. */
  mapsUrl: null as string | null,
} as const;

export const SOCIAL = {
  instagramHandle: 'mithaiwallahofficial',
  instagram: 'https://www.instagram.com/mithaiwallahofficial/',
  facebook: 'https://www.facebook.com/mithaiwallahofficial',
  youtube: 'https://www.youtube.com/@mithaiwallahofficial',
} as const;

/**
 * Food-business registration. The FSSAI licence number must be displayed on
 * any site that sells food online (FSS Act; FSSAI e-commerce guidance). It
 * renders in the footer the moment it is filled in.
 */
export const COMPLIANCE = {
  fssaiLicence: null as string | null,
  gstin: null as string | null,
} as const;

/**
 * Commercial terms. These appear on the gifting pages and brochures, so each
 * one is a promise. Values are deliberately phrased as "typical" and kept
 * conservative; change them to what production can actually hold in the
 * week before Diwali, not in a quiet week in July.
 */
export const TERMS = {
  corporateMinimumBoxes: 25,
  weddingMinimumBoxes: 50,
  brandedLeadTime: '10–14 days for custom-branded boxes',
  standardLeadTime: '3–5 days for standard gift boxes',
  festivePlanningNote: 'For Diwali, confirm orders at least four weeks ahead.',
  deliveryCoverage: 'Pan-India delivery via temperature-conscious courier partners',
  /** The shelf life you can stand behind for each product lives in lib/products.ts. */
  sampleBoxes: 'Tasting samples available for corporate and wedding orders',
} as const;

/**
 * The strip above the navigation. Set to null to remove it. Keep it seasonal:
 * a Diwali message still showing in January tells visitors nobody is minding
 * the site.
 */
export const ANNOUNCEMENT = {
  text: 'Diwali corporate gifting is now booking — custom-branded boxes need 10–14 days.',
  cta: 'Plan your order',
  href: '/corporate-gifting#enquire',
} as null | { text: string; cta: string; href: string };

/** WhatsApp deep link, or null when no number is configured. */
export function whatsappLink(message: string): string | null {
  if (!CONTACT.whatsapp) return null;
  return `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(message)}`;
}

export function formatPhone(digits: string): string {
  // 91 98765 43210 → +91 98765 43210
  if (digits.length === 12 && digits.startsWith('91')) {
    return `+91 ${digits.slice(2, 7)} ${digits.slice(7)}`;
  }
  return `+${digits}`;
}

/**
 * The pre-launch checklist in brief, so whoever edits this file sees every
 * open item in one place. The full list is docs/09-launch-checklist.md.
 */
export const LAUNCH_CHECKS = [
  'Real logo file in /public/brand and BRAND.logo set',
  'NEXT_PUBLIC_WHATSAPP_NUMBER and NEXT_PUBLIC_PHONE_NUMBER set',
  'Email inboxes in CONTACT exist and are monitored',
  'Street address + postal code confirmed, matching the Google Business Profile',
  'FSSAI licence number filled in COMPLIANCE',
  'TERMS confirmed with production',
  'Ingredients and shelf life in lib/products.ts checked against recipe cards',
  'Sample testimonials in lib/testimonials.ts replaced with real, consented quotes',
  'Product photography and hero video dropped in (see docs/10-photography-brief.md)',
  'Instagram handle @mithaiwallahofficial claimed; token set for the live feed',
  'Manufacturing statements and FAQ answers confirmed as true (docs/09-launch-checklist.md)',
] as const;
