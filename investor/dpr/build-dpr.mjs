/**
 * Assembles the Detailed Project Report as a single HTML document,
 * then renders it to PDF via Chromium.
 *
 *   node investor/dpr/build-dpr.mjs
 *
 * Every figure is read from investor/output/model.json. Nothing is typed here.
 */
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { CSS } from './style.mjs';
import { partA } from './parts-a.mjs';
import { partB } from './parts-b.mjs';
import { partC } from './parts-c.mjs';
import { partD } from './parts-d.mjs';
import { FAQ_SELECTION } from './faq-selection.mjs';

const M = JSON.parse(readFileSync(new URL('../output/model.json', import.meta.url), 'utf8'));

const html = `<!DOCTYPE html>
<html lang="en-IN">
<head>
<meta charset="utf-8">
<title>FROLIC — Detailed Project Report</title>
<style>${CSS}</style>
</head>
<body>
${partA(M)}
${partB(M)}
${partC(M)}
${partD(M, FAQ_SELECTION)}
</body>
</html>`;

mkdirSync(new URL('../output/', import.meta.url), { recursive: true });
const out = new URL('../output/FROLIC-DPR.html', import.meta.url);
writeFileSync(out, html);
console.log(`Wrote ${out.pathname} (${(html.length / 1024).toFixed(0)} kB)`);
