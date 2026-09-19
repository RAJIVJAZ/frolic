/** Renders the assembled DPR HTML to PDF using the pre-installed Chromium. */
import { chromium } from 'playwright';
import { fileURLToPath } from 'node:url';

const htmlPath = fileURLToPath(new URL('../output/FROLIC-DPR.html', import.meta.url));
const pdfPath = fileURLToPath(new URL('../output/FROLIC-Detailed-Project-Report.pdf', import.meta.url));

const browser = await chromium.launch({
  executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome',
  args: ['--no-sandbox'],
});
const page = await browser.newPage();
await page.goto('file://' + htmlPath, { waitUntil: 'networkidle' });

await page.pdf({
  path: pdfPath,
  format: 'A4',
  printBackground: true,
  displayHeaderFooter: true,
  headerTemplate: '<div></div>',
  footerTemplate: `
    <div style="width:100%;font-family:Arial,sans-serif;font-size:7pt;color:#8F8880;
                padding:0 16mm;display:flex;justify-content:space-between;align-items:center">
      <span>FROLIC · Detailed Project Report · Confidential</span>
      <span class="pageNumber"></span>
    </div>`,
  margin: { top: '18mm', bottom: '20mm', left: '16mm', right: '16mm' },
});

await browser.close();
console.log('Wrote ' + pdfPath);
