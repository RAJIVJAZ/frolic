import type { Metadata, Viewport } from 'next';
import { Cormorant_Garamond, Manrope, Tiro_Devanagari_Hindi } from 'next/font/google';
import { SvgDefs } from '@/components/art/SvgDefs';
import { BRAND, SITE_URL } from '@/lib/business';
import { JsonLd } from '@/components/seo/JsonLd';
import { organizationSchema } from '@/lib/seo';
import './globals.css';

const display = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-display',
  display: 'swap',
});

const sans = Manrope({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-sans',
  display: 'swap',
});

const hindi = Tiro_Devanagari_Hindi({
  subsets: ['devanagari', 'latin'],
  weight: '400',
  variable: '--font-hindi',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${BRAND.name} — Premium Indian Sweets, Corporate & Wedding Gifting`,
    template: `%s | ${BRAND.name}`,
  },
  description: BRAND.description,
  applicationName: BRAND.name,
  openGraph: {
    type: 'website',
    siteName: BRAND.name,
    locale: 'en_IN',
  },
  twitter: { card: 'summary_large_image' },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: '#6B1024',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN" className={`${display.variable} ${sans.variable} ${hindi.variable}`}>
      <body>
        <SvgDefs />
        <JsonLd data={organizationSchema()} />
        {children}
      </body>
    </html>
  );
}
