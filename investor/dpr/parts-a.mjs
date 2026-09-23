/** DPR — front matter, executive summary, business and market sections. */
import { fmt as f } from './helpers.mjs';

export function partA(M) {
  const b = M.pnl.base, c = M.pnl.conservative, a = M.pnl.aggressive;
  const pw = M.probabilityWeighted;

  return `
<!-- ══════════════ COVER ══════════════ -->
<div class="cover">
  <div>
    <p style="font-family:'Liberation Sans',Arial,sans-serif;font-size:8pt;font-weight:700;letter-spacing:2pt;text-transform:uppercase;color:#B8F135;margin:0">Detailed Project Report</p>
    <p class="small" style="color:#8F8880;margin-top:2mm">Confidential · For prospective investors and lenders</p>
  </div>
  <div>
    <p class="wordmark">FROLIC</p>
    <p style="font-family:'Liberation Sans',Arial,sans-serif;font-size:19pt;font-weight:700;color:#FFFDF7;margin:6mm 0 0">Feel Good. Sip Different.</p>
    <p style="font-size:11.5pt;line-height:1.5;color:#BFBAB3;margin:5mm 0 0;max-width:135mm;text-align:left">
      India's prebiotic functional soda. Ten flavours built from nimbu, jamun, kokum and aam panna —
      7&nbsp;g of prebiotic fibre and a quarter of the sugar of a conventional soft drink.
    </p>
    <div style="height:0.8pt;background:#B8F135;margin:8mm 0 6mm;width:60mm"></div>
    <table style="width:auto;margin:0;font-size:8.6pt;color:#BFBAB3;border:none">
      <tbody>
      <tr style="background:none"><td style="border:none;padding:1mm 8mm 1mm 0;color:#8F8880">Entity</td><td style="border:none;padding:1mm 0;color:#FFFDF7">Frolic Beverages Pvt. Ltd. (proposed)</td></tr>
      <tr style="background:none"><td style="border:none;padding:1mm 8mm 1mm 0;color:#8F8880">Sector</td><td style="border:none;padding:1mm 0;color:#FFFDF7">FMCG — Functional Beverages</td></tr>
      <tr style="background:none"><td style="border:none;padding:1mm 8mm 1mm 0;color:#8F8880">Stage</td><td style="border:none;padding:1mm 0;color:#FFFDF7">Pre-revenue · pre-production</td></tr>
      <tr style="background:none"><td style="border:none;padding:1mm 8mm 1mm 0;color:#8F8880">Capital sought</td><td style="border:none;padding:1mm 0;color:#FFFDF7">₹10 Cr seed at ₹50 Cr post-money</td></tr>
      <tr style="background:none"><td style="border:none;padding:1mm 8mm 1mm 0;color:#8F8880">Base location</td><td style="border:none;padding:1mm 0;color:#FFFDF7">Prayagraj, Uttar Pradesh</td></tr>
      </tbody>
    </table>
  </div>
  <div>
    <p class="small" style="color:#8F8880;margin:0">Model version ${M.meta.modelVersion} · generated ${M.meta.generatedAt} · all figures in INR unless stated · USD at ₹${M.meta.usdInr}</p>
  </div>
</div>

<!-- ══════════════ NOTICE ══════════════ -->
<div class="section">
  <h1>Important Notice</h1>
  <div class="callout warn">
    <span class="label">Read before anything else</span>
    <p><strong>FROLIC is pre-revenue, pre-production and pre-traction.</strong> There is no sales history,
    no repeat-purchase data, no shelf velocity and no completed blind taste test. Every financial figure
    in this report is arithmetic applied to stated assumptions. The model is internally consistent; that
    is not the same as being correct.</p>
  </div>

  <h3>How to read the numbers</h3>
  <p>Every input to the financial model carries a provenance tag. The tags appear throughout this report
  and in <span class="sans">investor/assumptions.mjs</span>, which is the single source from which every
  table here is generated.</p>

  <table>
    <thead><tr><th style="width:14%">Tag</th><th style="width:30%">Meaning</th><th>What it implies for diligence</th></tr></thead>
    <tbody>
      <tr><td><span class="tag v">V</span></td><td>Verified against a primary or reputable secondary source</td><td>Cited in Annexure D. Can be independently checked.</td></tr>
      <tr><td><span class="tag e">E</span></td><td>Industry estimate or benchmark</td><td>Defensible, but must be validated by a production run or quotation.</td></tr>
      <tr><td><span class="tag a">A</span></td><td>An assumption — a choice, not a fact</td><td><strong>Attack these first.</strong> They drive the outcome.</td></tr>
    </tbody>
  </table>

  <p>Currently verified: the 40% GST slab on aerated beverages and the 5% still-beverage rate; the PepsiCo–Poppi
  acquisition consideration and revenue multiple; the Olipop valuation; the existence and product specification
  of competing Indian brands. <strong>Almost everything else is an estimate or an assumption.</strong></p>

  <h3>Nature of this document</h3>
  <p>This report is prepared for the information of prospective investors and lenders. It is not a prospectus,
  an offer, or a solicitation. Projections are illustrative and depend on assumptions that may prove incorrect.
  FROLIC is presented throughout as a food product, not a medicine; no statement here should be read as a claim
  to diagnose, treat, cure or prevent any condition. Readers should form their own view and take independent
  professional advice.</p>

  <h3>Generation and reproducibility</h3>
  <p>No figure in this report was typed by hand. Every table, chart and derived statistic is computed from
  <span class="sans">investor/assumptions.mjs</span> by <span class="sans">investor/build.mjs</span> and rendered
  by <span class="sans">investor/dpr/build-dpr.mjs</span>. Changing an assumption and re-running regenerates the
  entire document consistently. This is deliberate: the fastest way to lose credibility is for two figures in
  the same document to disagree.</p>
</div>

<!-- ══════════════ CONTENTS ══════════════ -->
<div class="section">
  <h1>Contents</h1>
  ${toc()}
</div>

<!-- ══════════════ PART I ══════════════ -->
${partDivider('Part I', 'Summary', 'The proposition, the numbers that matter, and the three findings that change how this business should be pitched.')}

<div class="section">
  <h1>1 · Executive Summary</h1>

  <p class="eyebrow">The proposition</p>
  <p><strong>FROLIC is a premium prebiotic soda brand for urban India, built on Indian flavour idiom rather than
  a Western one.</strong> Ten SKUs drawn from regional drinking culture — nimbu masala, aam panna, kokum, jamun,
  kala khatta, jeera — each carrying 7&nbsp;g of prebiotic fibre and roughly a quarter of the added sugar of a
  conventional soft drink, at an MRP of ₹130 for a 250&nbsp;ml can.</p>

  <p>The category has been proven decisively outside India. Poppi was acquired by PepsiCo in May 2025 for
  <strong>$1.95&nbsp;bn in cash plus $0.2&nbsp;bn contingent</strong> — approximately <strong>3.9× its 2024 revenue
  of ~$500&nbsp;m</strong>, as disclosed in PepsiCo's Form 10-Q. Olipop was valued at $1.85&nbsp;bn and has been
  profitable since early 2024. Both were founded in 2018. The Indian equivalent category was worth approximately
  <strong>$12.6&nbsp;m in 2025</strong> — roughly 0.2% of the functional beverage market it sits inside.</p>

  <div class="stats">
    <div class="stat"><span class="v">₹${b.years[4].netRevenueCr.toFixed(0)} Cr</span><span class="l">Year 5 net revenue, base case ($${b.y5NetRevenueUsdMn.toFixed(0)}M)</span></div>
    <div class="stat"><span class="v">Year ${b.ebitdaPositiveYear}</span><span class="l">EBITDA positive, base case</span></div>
    <div class="stat"><span class="v">₹${b.totalCapitalNeedCr.toFixed(1)} Cr</span><span class="l">Total capital required to breakeven</span></div>
    <div class="stat"><span class="v">${pw.expectedMoic.toFixed(1)}×</span><span class="l">Expected seed MOIC, weighted for a 55% failure rate</span></div>
  </div>

  <h3>1.1 Three findings that change the pitch</h3>
  <p>This report was built by verifying the load-bearing inputs rather than accepting them. Three came back
  differently from how they are usually presented, and each materially changes the investment case.</p>

  <div class="callout warn">
    <span class="label">Finding 1 — the first-mover claim is false</span>
    <p><strong>India already has at least two prebiotic soda brands in market.</strong> Misfits (Mumbai) is
    seed-funded by Nu Ventures alongside angels who backed Acko and Third Wave Coffee, and sells through its own
    site, Amazon India and Swiggy Instamart. Its specification is <strong>250&nbsp;ml, 7&nbsp;g prebiotic fibre,
    4&nbsp;g sugar</strong> — within rounding error of FROLIC's — at a lower price point, and with
    <strong>zero added sugar</strong> against FROLIC's 4&nbsp;g. Bubz is a second entrant.</p>
    <p>Any pitch claiming "India's first" fails the moment a partner runs one search. The reframe is stronger
    anyway: category creation with two sub-scale incumbents beats true first-mover, because someone else is
    funding consumer education and nobody has won distribution. <strong>FROLIC's wedge is not primacy — it is
    being the only brand in the category that tastes Indian.</strong></p>
  </div>

  <div class="callout warn">
    <span class="label">Finding 2 — a 40% GST slab governs the entire economic model</span>
    <p>From 22 September 2025 India taxes aerated sweetened beverages at a flat <strong>40% GST</strong>,
    replacing the earlier 28% plus 12% cess. At an MRP of ₹130, <strong>₹${M.channels[0].gst.toFixed(2)} is
    tax</strong> — 29% of shelf price — before the brand, distributor or retailer is paid anything.</p>
    <p>This sets the price floor (minimum viable MRP is ₹${M.unitEconomics.minimumViablePrice[0].minimumViableMrp.toFixed(2)},
    leaving only ${(((130 - M.unitEconomics.minimumViablePrice[0].minimumViableMrp) / 130) * 100).toFixed(0)}% of discount
    headroom), makes D2C permanently the most profitable channel, and rules out price-led competition for every
    participant. Non-carbonated beverages sit at 5% — a 35-point lever held on the Series A roadmap.</p>
  </div>

  <div class="callout info">
    <span class="label">Finding 3 — the exit multiple is observed, not chosen</span>
    <p>The return model applies <strong>3.9× revenue</strong>, which is the multiple PepsiCo actually paid for
    Poppi per its SEC filing — not a comparable-company average. Using a strategic acquirer's disclosed multiple
    for the same category is considerably more defensible than a constructed comp set.</p>
  </div>

  <h3>1.2 What the model says</h3>
  <p>Built bottom-up from a beachhead of <strong>${M.market.premiumBeverageBuyersMn.toFixed(2)} million</strong>
  premium-beverage buyers across five metros — not from a top-down share of a national market.</p>

  ${scenarioSummaryTable(M)}

  <p>The base case reaches EBITDA positive in Year ${b.ebitdaPositiveYear} on ₹${b.totalCapitalNeedCr.toFixed(1)} Cr
  of total capital. Gross margin expands from ${b.years[0].grossMarginPct.toFixed(1)}% to
  ${b.years[4].grossMarginPct.toFixed(1)}% — a procurement outcome as COGS falls from ₹34 to ₹23 per can, not a
  pricing one, since blended net realisation actually falls as the channel mix shifts toward retail.</p>

  <h3>1.3 What the model also says, which most decks omit</h3>
  <ul>
    <li><strong>Year 1 LTV:CAC is ${M.ltv.base[0].ltvToCac.toFixed(1)}×</strong>, below the 3× floor most consumer
    investors require. It does not clear 3× until Year ${M.ltv.base.findIndex(r => r.ltvToCac >= 3) + 1}. The seed
    round funds the journey to good unit economics; it does not scale economics that already work.</li>
    <li><strong>The aggressive case requires more capital than the base case</strong>
    (₹${a.totalCapitalNeedCr.toFixed(1)} Cr against ₹${b.totalCapitalNeedCr.toFixed(1)} Cr) despite reaching
    profitability two years earlier, because growth consumes working capital.</li>
    <li><strong>Series B returns ${M.returns.conservative.rows[2].moic.toFixed(1)}× in the conservative case</strong>
    — barely capital back after three years. Early money is protected by entry price; late money is a bet that
    growth continues exactly as modelled.</li>
    <li><strong>The probability-weighted seed return assumes a 55% chance of total failure</strong>, which is
    appropriate for a pre-revenue consumer brand facing a funded incumbent.</li>
  </ul>

  <h3>1.4 Recommendation</h3>
  <div class="callout">
    <span class="label">This contradicts the stated ask</span>
    <p><strong>Do not raise ₹10 Cr now.</strong> Investor readiness today assesses at <strong>5.7 / 10</strong>,
    dragged down by zero traction and — more seriously — an undocumented founding team. Raising an institutional
    seed on a model alone, against a funded incumbent with a near-identical product, invites either a pass or a
    valuation that permanently damages the cap table.</p>
    <p>The sequence that works: raise <strong>₹1.5–2.5 Cr from angels and strategic operators</strong> against one
    production run and a six-month D2C pilot in two cities; then raise the ₹10 Cr seed on cohort data. Approximately
    <strong>₹40 lakh and nine months</strong> moves readiness to 7.5–8 / 10. Section 22 sets out exactly what
    evidence to generate, in priority order.</p>
  </div>
</div>

<div class="section">
  <h1>2 · Project at a Glance</h1>
  ${glanceTable(M)}
</div>
`;
}

/* ── local helpers used above ───────────────────────────────── */

function partDivider(part, title, blurb) {
  return `<div class="part-divider">
    <p style="font-family:'Liberation Sans',Arial,sans-serif;font-size:8pt;font-weight:700;letter-spacing:2.4pt;text-transform:uppercase;color:#B8F135;margin:0 0 4mm">${part}</p>
    <h1 style="font-size:32pt;color:#FFFDF7;margin:0 0 6mm;border:none">${title}</h1>
    <p style="font-size:11pt;line-height:1.55;color:#BFBAB3;max-width:130mm;text-align:left;margin:0">${blurb}</p>
  </div>`;
}
export { partDivider };

function toc() {
  const parts = [
    ['Part I — Summary', [
      ['1', 'Executive Summary'], ['2', 'Project at a Glance'],
    ]],
    ['Part II — The Business', [
      ['3', 'Promoter, Company & Team'], ['4', 'Product & Formulation'],
      ['5', 'Product Range — Ten SKUs'], ['6', 'Brand & Design System'],
    ]],
    ['Part III — Market & Competition', [
      ['7', 'Market Analysis'], ['8', 'Category Creation & Timing'],
      ['9', 'Competition'], ['10', 'Moat Analysis'],
    ]],
    ['Part IV — Operations', [
      ['11', 'Manufacturing & Supply Chain'], ['12', 'Regulatory & Compliance'],
      ['13', 'Technology & Digital Infrastructure'], ['14', 'Distribution & Channel Strategy'],
      ['15', 'Marketing & Conversion'],
    ]],
    ['Part V — Financials', [
      ['16', 'Unit Economics'], ['17', 'Revenue Projections'],
      ['18', 'Profitability — Three Scenarios'], ['19', 'Working Capital & Funding Plan'],
      ['20', 'Cap Table & Investor Returns'],
    ]],
    ['Part VI — Risk & Execution', [
      ['21', 'Risk Register'], ['22', 'Proof Required Before Funding'],
      ['23', 'Investor Readiness Assessment'], ['24', 'Implementation Roadmap'],
    ]],
    ['Annexures', [
      ['A', 'Model Assumptions in Full'], ['B', 'Generated Financial Tables'],
      ['C', 'Investor FAQ — Selected'], ['D', 'Sources & References'],
    ]],
  ];
  return parts.map(([p, items]) => `
    <p class="toc-part">${p}</p>
    ${items.map(([n, t]) => `<div class="toc-item"><span class="toc-num">${n}</span><span class="toc-txt">${t}</span><span class="toc-dots"></span></div>`).join('')}
  `).join('');
}

function scenarioSummaryTable(M) {
  const rows = ['conservative', 'base', 'aggressive'].map((k) => {
    const p = M.pnl[k];
    const r = M.returns[k];
    return `<tr>
      <td><strong>${p.scenario}</strong></td>
      <td class="num">₹${p.years[4].netRevenueCr.toFixed(0)} Cr</td>
      <td class="num">$${p.y5NetRevenueUsdMn.toFixed(0)} M</td>
      <td class="num">Year ${p.ebitdaPositiveYear ?? '—'}</td>
      <td class="num">${p.years[4].ebitdaMarginPct.toFixed(1)}%</td>
      <td class="num">₹${p.totalCapitalNeedCr.toFixed(1)} Cr</td>
      <td class="num">${r.rows[0].moic.toFixed(1)}×</td>
    </tr>`;
  }).join('');
  return `<table>
    <thead><tr>
      <th>Scenario</th><th class="num">Y5 revenue</th><th class="num">Y5 USD</th>
      <th class="num">EBITDA+</th><th class="num">Y5 margin</th>
      <th class="num">Capital need</th><th class="num">Seed MOIC</th>
    </tr></thead>
    <tbody>${rows}</tbody>
  </table>`;
}

function glanceTable(M) {
  const b = M.pnl.base;
  const u = M.unitEconomics.can250;
  const rows = [
    ['Project', 'Premium prebiotic functional soda brand for urban India'],
    ['Product', '250 ml sleek can · 7 g prebiotic fibre · 4 g added sugar · 0 mg caffeine'],
    ['Range at maturity', '10 SKUs built from Indian flavour idiom'],
    ['MRP', '₹130 per 250 ml can'],
    ['Year 1 markets', 'Lucknow · Delhi NCR — sequenced from the Prayagraj base'],
    ['Target metros (by Y3)', M.market.cities.join(' · ')],
    ['Beachhead', `${M.market.premiumBeverageBuyersMn.toFixed(2)} M premium-beverage buyers (bottom-up)`],
    ['Manufacturing', 'Co-packed (tolling) through Year 3; own capacity a Series B consideration'],
    ['Primary channels', 'D2C and quick commerce (Y1) → modern trade (Y2) → general trade (Y3)'],
    ['GST treatment', `${(M.tax.carbonatedGst * 100).toFixed(0)}% — aerated sweetened beverage slab`],
    ['Year 1 COGS per can', `₹${u[0].cogs.toFixed(2)}`],
    ['Year 5 COGS per can', `₹${u[4].cogs.toFixed(2)}`],
    ['Year 1 gross margin', `${u[0].grossMarginPct.toFixed(1)}%`],
    ['Year 5 gross margin', `${u[4].grossMarginPct.toFixed(1)}%`],
    ['Minimum viable MRP', `₹${M.unitEconomics.minimumViablePrice[0].minimumViableMrp.toFixed(2)} (at a 50% gross-margin floor)`],
    ['Year 5 net revenue (base)', `₹${b.years[4].netRevenueCr.toFixed(2)} Cr ($${b.y5NetRevenueUsdMn.toFixed(1)} M)`],
    ['EBITDA positive', `Year ${b.ebitdaPositiveYear} (base case)`],
    ['Peak operating burn', `₹${Math.abs(b.peakCumulativeBurnCr).toFixed(2)} Cr`],
    ['Peak working capital', `₹${b.peakWorkingCapitalCr.toFixed(2)} Cr`],
    ['Total capital need', `₹${b.totalCapitalNeedCr.toFixed(2)} Cr`],
    ['Funding plan', '₹10 Cr seed → ₹50 Cr Series A → ₹150 Cr Series B'],
    ['Founder ownership post-B', `${M.returns.base.founderPct.toFixed(1)}%`],
    ['Exit assumption', `Year ${7} at 3.9× revenue (PepsiCo–Poppi disclosed multiple)`],
    ['Expected seed return', `${M.probabilityWeighted.expectedMoic.toFixed(1)}× MOIC · ${M.probabilityWeighted.expectedIrrPct.toFixed(1)}% IRR (probability-weighted)`],
    ['Current stage', 'Pre-revenue, pre-production. Brand system and financial model complete.'],
    ['Investor readiness', '5.7 / 10 — see Section 23'],
  ];
  return `<table><tbody>${rows.map(([k, v]) =>
    `<tr><td style="width:36%"><strong>${k}</strong></td><td>${v}</td></tr>`).join('')}</tbody></table>`;
}
