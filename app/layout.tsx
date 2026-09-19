import type { Metadata, Viewport } from 'next';
import { Bricolage_Grotesque, Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { Nav } from '@/components/layout/Nav';
import { Footer } from '@/components/layout/Footer';
import { Announcement } from '@/components/layout/Announcement';
import { CartDrawer } from '@/components/commerce/CartDrawer';
import { SITE, organizationSchema, websiteSchema, absoluteUrl } from '@/lib/seo';
import { JsonLd } from '@/components/JsonLd';

/**
 * Type system.
 *  Display  — Bricolage Grotesque: high-contrast, slightly odd, does the
 *             personality work in headlines.
 *  Sans     — Inter: everything else. Chosen for its tabular figures, which
 *             the nutrition panels and price rows rely on.
 *  Mono     — JetBrains Mono: eyebrows, badges, data labels.
 * All three are self-hosted by next/font, so there is no render-blocking
 * request to a font CDN and no layout shift on swap.
 */
const display = Bricolage_Grotesque({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
  weight: ['600', '700', '800'],
});

const sans = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const mono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
  weight: ['500', '600', '700'],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `FROLIC — ${SITE.tagline} | India's Prebiotic Functional Soda`,
    template: '%s | FROLIC',
  },
  description: SITE.description,
  applicationName: SITE.name,
  keywords: [
    'prebiotic soda India',
    'healthy soda India',
    'low sugar soft drink',
    'gut health drink India',
    'functional beverage India',
    'prebiotic fibre drink',
  ],
  authors: [{ name: SITE.legalName }],
  creator: SITE.legalName,
  alternates: { canonical: absoluteUrl('/') },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#FFFDF7' },
    { media: '(prefers-color-scheme: dark)', color: '#14110F' },
  ],
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en-IN"
      className={`no-js ${display.variable} ${sans.variable} ${mono.variable}`}
    >
      <head>
        {/* Runs before first paint, so scroll reveals keep their animation
            when JS is available and are forced visible when it is not. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `document.documentElement.classList.remove('no-js')`,
          }}
        />
      </head>
      <body>
        <JsonLd data={[organizationSchema(), websiteSchema()]} />
        <Announcement />
        <Nav />
        <main id="main">{children}</main>
        <Footer />
        <CartDrawer />
      </body>
    </html>
  );
}
