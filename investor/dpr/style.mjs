/** Print stylesheet for the DPR. A4, 18mm margins, Chromium-rendered. */
export const CSS = `
@page { size: A4; margin: 18mm 16mm 20mm 16mm; }
@page :first { margin: 0; }

*, *::before, *::after { box-sizing: border-box; }
html { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
body {
  margin: 0;
  font-family: "Bitstream Charter", Charter, Georgia, "Liberation Serif", serif;
  font-size: 9.8pt;
  line-height: 1.52;
  color: #1a1714;
  text-rendering: optimizeLegibility;
}

/* ── Typography ─────────────────────────────────────────────── */
h1, h2, h3, h4, .sans {
  font-family: "Liberation Sans", Arial, Helvetica, sans-serif;
}
h1 { font-size: 21pt; line-height: 1.12; margin: 0 0 4mm; font-weight: 700; letter-spacing: -0.3pt; }
h2 { font-size: 14pt; line-height: 1.2; margin: 9mm 0 3mm; font-weight: 700; color: #14110F;
     padding-bottom: 1.6mm; border-bottom: 1.6pt solid #14110F; }
h3 { font-size: 11pt; line-height: 1.25; margin: 6mm 0 2mm; font-weight: 700; color: #14110F; }
h4 { font-size: 9.6pt; margin: 4mm 0 1.5mm; font-weight: 700; color: #4a423a; }
p  { margin: 0 0 2.6mm; text-align: justify; hyphens: auto; }
ul, ol { margin: 0 0 3mm; padding-left: 5mm; }
li { margin-bottom: 1.2mm; }
strong { font-weight: 700; color: #14110F; }
a { color: #5C8310; text-decoration: none; }
.small { font-size: 8.4pt; line-height: 1.45; color: #5C544D; }
.muted { color: #5C544D; }
.eyebrow { font-family: "Liberation Sans", Arial, sans-serif; font-size: 7.6pt; font-weight: 700;
           letter-spacing: 1.4pt; text-transform: uppercase; color: #5C8310; margin: 0 0 2mm; }

/* ── Structure ──────────────────────────────────────────────── */
.section { page-break-before: always; }
.part-divider { page-break-before: always; page-break-after: always;
  display: flex; flex-direction: column; justify-content: center; height: 232mm;
  background: #14110F; color: #FFFDF7; padding: 0 16mm;
  /* No negative margins. A full-bleed panel pulled outside the @page box
     overlaps the preceding content in continuous flow, and the risk of it
     doing so in pagination is not worth the edge-to-edge look. */
  page-break-inside: avoid; }
.avoid-break { page-break-inside: avoid; }

/* ── Cover ──────────────────────────────────────────────────── */
.cover { height: 297mm; width: 210mm; background: #14110F; color: #FFFDF7;
  padding: 26mm 22mm; display: flex; flex-direction: column; justify-content: space-between;
  page-break-after: always; }
.cover .wordmark { font-family: "Liberation Sans", Arial, sans-serif; font-size: 62pt;
  font-weight: 700; letter-spacing: -2.5pt; color: #B8F135; line-height: 0.95; margin: 0; }

/* ── Tables ─────────────────────────────────────────────────── */
table { width: 100%; border-collapse: collapse; margin: 3mm 0 4mm;
  font-family: "Liberation Sans", Arial, sans-serif; font-size: 8.2pt;
  page-break-inside: avoid; }
thead { display: table-header-group; }
th { background: #14110F; color: #FFFDF7; font-weight: 700; text-align: left;
     padding: 2mm 2.4mm; border: none; }
td { padding: 1.9mm 2.4mm; border-bottom: 0.4pt solid #ddd5c6; vertical-align: top; }
tbody tr:nth-child(even) { background: #faf7f0; }
.num { text-align: right; font-variant-numeric: tabular-nums; }
.tot td { font-weight: 700; background: #f0eadc !important; border-top: 1pt solid #14110F; }
table.compact { font-size: 7.6pt; }
table.compact td, table.compact th { padding: 1.4mm 1.8mm; }

/* ── Callouts ───────────────────────────────────────────────── */
.callout { border-left: 3pt solid #BC4104; background: #fdf3ee; padding: 3.5mm 4mm;
  margin: 4mm 0; page-break-inside: avoid; }
.callout.good { border-left-color: #1A8F69; background: #eefaf5; }
.callout.info { border-left-color: #5C8310; background: #f6fbe8; }
.callout.warn { border-left-color: #BC4104; background: #fdf3ee; }
.callout p:last-child { margin-bottom: 0; }
.callout .label { font-family: "Liberation Sans", Arial, sans-serif; font-size: 7.4pt;
  font-weight: 700; letter-spacing: 1pt; text-transform: uppercase; color: #BC4104;
  display: block; margin-bottom: 1.5mm; }
.callout.good .label { color: #1A8F69; }
.callout.info .label { color: #5C8310; }

/* ── Stat rows & cards ──────────────────────────────────────── */
.stats { display: flex; gap: 3mm; margin: 4mm 0; page-break-inside: avoid; }
.stat { flex: 1; border: 0.6pt solid #ddd5c6; border-top: 2.4pt solid #14110F;
  padding: 3mm; background: #fffdf7; }
.stat .v { font-family: "Liberation Sans", Arial, sans-serif; font-size: 16pt;
  font-weight: 700; line-height: 1; color: #14110F; display: block; }
.stat .l { font-size: 7.6pt; color: #5C544D; display: block; margin-top: 1.5mm; line-height: 1.3; }

/* ── Charts (print-safe CSS bars) ───────────────────────────── */
.chart { margin: 4mm 0 5mm; page-break-inside: avoid; }
.bar-row { display: flex; align-items: center; gap: 3mm; margin-bottom: 2mm; }
.bar-label { width: 38mm; font-family: "Liberation Sans", Arial, sans-serif; font-size: 8pt;
  flex-shrink: 0; }
.bar-track { flex: 1; background: #efe9dd; height: 5.5mm; position: relative; }
.bar-fill { height: 5.5mm; background: #5C8310; }
.bar-fill.ctx { background: #B8AFA2; }
.bar-fill.neg { background: #BC4104; }
.bar-val { width: 22mm; text-align: right; font-family: "Liberation Sans", Arial, sans-serif;
  font-size: 8pt; font-weight: 700; flex-shrink: 0; font-variant-numeric: tabular-nums; }
.chart-note { font-size: 7.6pt; color: #5C544D; margin-top: 2mm; font-style: italic; }

/* Column chart with a zero line, for EBITDA */
.col-chart { display: flex; gap: 3mm; height: 52mm; align-items: stretch; margin: 4mm 0 2mm; }
.col { flex: 1; display: flex; flex-direction: column; }
.col-top { height: 26mm; display: flex; flex-direction: column; justify-content: flex-end; }
.col-bot { height: 26mm; display: flex; flex-direction: column; }
.col-zero { height: 0.8pt; background: #14110F; }
.col-bar { background: #5C8310; }
.col-bar.neg { background: #BC4104; }
.col-cap { font-family: "Liberation Sans", Arial, sans-serif; font-size: 7.6pt;
  font-weight: 700; text-align: center; margin-bottom: 1mm; }
.col-cap.neg { color: #BC4104; margin-bottom: 0; margin-top: 1mm; }
.col-lab { font-family: "Liberation Sans", Arial, sans-serif; font-size: 7.6pt;
  text-align: center; color: #5C544D; margin-top: 1.5mm; }

/* ── TOC ────────────────────────────────────────────────────── */
.toc-item { display: flex; align-items: baseline; gap: 2mm; margin-bottom: 1.8mm;
  font-family: "Liberation Sans", Arial, sans-serif; font-size: 9pt; }
.toc-num { width: 9mm; color: #5C8310; font-weight: 700; flex-shrink: 0; }
.toc-txt { flex-shrink: 0; }
.toc-dots { flex: 1; border-bottom: 0.5pt dotted #b8ae9e; margin-bottom: 1mm; }
.toc-part { font-weight: 700; font-size: 9.4pt; margin: 4mm 0 2mm; color: #14110F;
  text-transform: uppercase; letter-spacing: 0.8pt; }

/* ── Misc ───────────────────────────────────────────────────── */
.two-col { display: flex; gap: 6mm; }
.two-col > * { flex: 1; }
.tag { display: inline-block; font-family: "Liberation Sans", Arial, sans-serif;
  font-size: 7pt; font-weight: 700; padding: 0.6mm 1.8mm; border-radius: 1mm;
  background: #14110F; color: #FFFDF7; letter-spacing: 0.5pt; }
.tag.v { background: #1A8F69; }
.tag.e { background: #BC4104; }
.tag.a { background: #6B2E8F; }
.swatch { display: inline-block; width: 4mm; height: 4mm; border: 0.4pt solid #00000022;
  vertical-align: -0.6mm; margin-right: 1.2mm; }
`;
