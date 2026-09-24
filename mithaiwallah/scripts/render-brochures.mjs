/**
 * Renders the printable catalogues to PDF.
 *
 *   npm run build && npm start      # or npm run dev
 *   npm run brochures
 *
 * Output: public/brochures/*.pdf — linked from the "PDF" button on each
 * brochure page and attachable to sales emails and WhatsApp.
 */
import { chromium } from 'playwright-core';
import { mkdirSync } from 'node:fs';

const BASE = process.env.BASE_URL ?? 'http://localhost:3100';
const executablePath = process.env.CHROMIUM_PATH ?? '/opt/pw-browsers/chromium';
const JOBS = [
  { path: '/brochure/corporate', out: 'public/brochures/mithaiwallah-corporate-gifting.pdf' },
  { path: '/brochure/wedding', out: 'public/brochures/mithaiwallah-wedding-gifting.pdf' },
];

mkdirSync('public/brochures', { recursive: true });
const browser = await chromium.launch({ executablePath });
const page = await browser.newPage();
for (const job of JOBS) {
  await page.goto(BASE + job.path, { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  await page.emulateMedia({ media: 'print' });
  await page.pdf({ path: job.out, format: 'A4', printBackground: true, preferCSSPageSize: true });
  console.log('wrote', job.out);
}
await browser.close();
