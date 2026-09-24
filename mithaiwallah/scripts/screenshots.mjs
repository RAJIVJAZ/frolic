/**
 * Screenshots of the running site, desktop and mobile.
 *
 *   npm run dev            # in another terminal
 *   npm run screens -- / /corporate-gifting
 *
 * Uses the system Chromium (PLAYWRIGHT_BROWSERS_PATH or CHROMIUM_PATH) so no
 * browser download is needed.
 */
import { chromium } from 'playwright-core';
import { mkdirSync } from 'node:fs';

const BASE = process.env.BASE_URL ?? 'http://localhost:3100';
const OUT = process.env.OUT_DIR ?? 'screens';
const FULL = process.env.FULL !== '0';
const paths = process.argv.slice(2).length ? process.argv.slice(2) : ['/'];
const executablePath = process.env.CHROMIUM_PATH ?? '/opt/pw-browsers/chromium';

const VIEWPORTS = [
  { name: 'desktop', width: 1440, height: 900, deviceScaleFactor: 1 },
  { name: 'mobile', width: 390, height: 844, deviceScaleFactor: 2, isMobile: true, hasTouch: true },
];

mkdirSync(OUT, { recursive: true });
const browser = await chromium.launch({ executablePath });
for (const vp of VIEWPORTS) {
  const ctx = await browser.newContext({
    viewport: { width: vp.width, height: vp.height },
    deviceScaleFactor: vp.deviceScaleFactor,
    isMobile: vp.isMobile,
    hasTouch: vp.hasTouch,
    reducedMotion: 'reduce',
  });
  const page = await ctx.newPage();
  const errors = [];
  page.on('pageerror', (e) => errors.push(e.message));
  page.on('console', (m) => m.type() === 'error' && errors.push(m.text()));
  for (const p of paths) {
    await page.goto(BASE + p, { waitUntil: 'networkidle' });
    // Scroll through once so in-view reveals fire before the full-page shot.
    await page.evaluate(async () => {
      for (let y = 0; y < document.body.scrollHeight; y += 600) {
        window.scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 60));
      }
      window.scrollTo(0, 0);
    });
    await page.waitForTimeout(400);
    const file = `${OUT}/${vp.name}${p === '/' ? '-home' : p.replace(/\//g, '-')}.png`;
    await page.screenshot({ path: file, fullPage: FULL });
    console.log(file);
  }
  if (errors.length) console.log(`[${vp.name}] console errors:\n  ` + [...new Set(errors)].join('\n  '));
  await ctx.close();
}
await browser.close();
