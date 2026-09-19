/** DPR — Part VI (risk & execution) and Annexures. */
import { partDivider } from './parts-a.mjs';
import { money } from './helpers.mjs';

export function partD(M, faqs) {
  return `
${partDivider('Part VI', 'Risk & Execution', 'What can go wrong, what must be proven before raising, and the honest assessment of how fundable this is today.')}

<div class="section">
  <h1>21 · Risk Register</h1>
  <p>Scored on likelihood and impact as the project stands today. Risks are ordered by severity, not by how
  comfortable they are to discuss.</p>
  ${riskTable()}

  <h3>21.1 The three that matter most</h3>
  <div class="callout warn">
    <span class="label">Risk 1 — taste does not win</span>
    <p>FROLIC's only durable differentiation is flavour, and it is entirely unproven. Misfits ships a cleaner
    health claim (zero added sugar). If FROLIC does not demonstrably beat it in a blind panel, the strategic
    position collapses and there is no fallback — the fibre specification is identical and the price is higher.</p>
    <p><strong>Mitigation:</strong> run the blind test before spending anything else. ~₹4 L, six weeks. If FROLIC
    loses, reformulate rather than fundraise.</p>
  </div>
  <div class="callout warn">
    <span class="label">Risk 2 — the incumbent raises first</span>
    <p>Misfits is already funded. A Series A that locks national distribution closes the window before FROLIC
    has a product in market.</p>
    <p><strong>Mitigation:</strong> compress time to first production run. The window is 18–30 months and every
    month spent fundraising instead of manufacturing consumes it.</p>
  </div>
  <div class="callout warn">
    <span class="label">Risk 3 — the team gap</span>
    <p>No FMCG distribution capability is documented. Indian beverage distribution cannot be built from a cold
    start, and no amount of capital substitutes for the relationships.</p>
    <p><strong>Mitigation:</strong> hire or co-found before the seed round. This is the single highest-leverage
    action available to the project.</p>
  </div>
</div>

<div class="section">
  <h1>22 · Proof Required Before Funding</h1>
  <p>The most operationally useful section of this report. Everything preceding it is a model; this is the work.</p>

  <h3>22.1 Sequencing</h3>
  <p>Raising ₹10 Cr on a model alone, against a funded incumbent with a near-identical product, invites either a
  pass or a valuation that permanently damages the cap table. The sequence that works:</p>
  <table>
    <thead><tr><th style="width:18%">Stage</th><th style="width:22%">Raise</th><th>Against</th></tr></thead>
    <tbody>
      <tr><td><strong>Now</strong></td><td>₹1.5–2.5 Cr angel / pre-seed</td><td>One production run · 3 SKUs · 2 cities · 6 months of D2C</td></tr>
      <tr><td><strong>Month 9</strong></td><td>—</td><td>Cohort and taste data in hand; readiness reassessed</td></tr>
      <tr><td><strong>Month 10</strong></td><td>₹10 Cr institutional seed at ₹50 Cr post</td><td>Real repeat-purchase and shelf-velocity evidence</td></tr>
    </tbody>
  </table>

  <h3>22.2 Product validation</h3>
  ${proofTable([
    ['Blind taste test', 'n ≥ 200, five metros, FROLIC vs Misfits vs a mainstream cola. Monadic, blind, third-party administered. Target ≥ 60% preference vs Misfits on at least 3 SKUs', 'The entire thesis. If FROLIC loses blind, nothing else matters'],
    ['Sugar objection test', 'Does 4 g added sugar cost preference against a 0 g competitor when disclosed?', 'Quantify the competitive threat before an investor does'],
    ['Repeat purchase', '≥ 35% of first-time buyers order again within 90 days', "The model's central assumption; currently unvalidated"],
    ['Shelf-life validation', '12 months ambient, accelerated and real-time. Fibre suspension, carbonation retention, flavour degradation', 'A separating batch is a recall. Non-negotiable before retail'],
    ['FSSAI compliance', 'Licence, label approval, nutrition panel verification, claims review', 'Table stakes. Absence is disqualifying'],
    ['Formulation defensibility', 'Documented process IP; ideally a provisional patent on the fibre suspension method', 'Converts taste from a hypothesis into an asset'],
  ])}

  <h3>22.3 Market validation</h3>
  ${proofTable([
    ['D2C revenue', '≥ ₹40 L cumulative over 6 months; ≥ ₹12 L in month 6', 'Demand at full price without trade support'],
    ['Cohort retention', 'M1 / M3 / M6 curves by acquisition channel; M3 ≥ 35%', 'Distinguishes a brand from a promotion'],
    ['CAC by channel', 'Blended ≤ ₹900 at ₹12 L/month scale', 'The model assumes ₹850. Prove it holds beyond the first ₹2 L of spend'],
    ['Basket size', '≥ 10 cans per order sustained', 'Below 8, D2C gross margin breaks'],
    ['Subscription attach', '≥ 20% of orders by month 6', 'The LTV case depends on it'],
    ['Retail sell-through', '50-store pilot, ≥ 4 units/store/week sustained 8 weeks', 'The number every distributor and consumer investor asks for'],
    ['Quick commerce velocity', 'Listed on ≥ 2 platforms in 2 cities, repeat-order rate tracked', 'The realistic scale channel'],
    ['Distributor interest', '≥ 3 signed LOIs from regional distributors', 'Evidence that trade will carry it'],
  ])}
  <p class="small"><strong>Deliberately excluded:</strong> Instagram followers, waitlist signups, press mentions
  and expressions of retailer "interest". No competent investor counts them.</p>

  <h3>22.4 Financial validation</h3>
  ${proofTable([
    ['Gross margin > 40%', '55.7% modelled in Year 1', 'Modelled, unvalidated'],
    ['CAC payback < 12 months', '10.0 months modelled in Year 1', 'Modelled'],
    ['LTV:CAC ≥ 3×', '1.8× in Year 1, 3.1× in Year 3', '<strong>Below threshold in Y1–Y2 — disclose proactively</strong>'],
    ['Working capital quantified', '₹13.4 Cr peak (base case)', 'Modelled'],
    ['Actual COGS from a production run', '₹34/can assumed', '<strong>Not yet known. One invoice converts the entire cost stack from estimate to fact</strong>'],
  ])}

  <h3>22.5 The three questions that decide everything</h3>
  <p>Ranked by how much they matter and how cheaply they can be answered.</p>
  <table>
    <thead><tr><th style="width:8%">#</th><th style="width:40%">Question</th><th class="num" style="width:14%">Cost</th><th class="num" style="width:14%">Time</th><th>Sequence</th></tr></thead>
    <tbody>
      <tr><td><strong>1</strong></td><td>Does it taste better than Misfits, blind?</td><td class="num">~₹4 L</td><td class="num">6 weeks</td><td>Answer this before spending anything else</td></tr>
      <tr><td><strong>2</strong></td><td>Do 35% of first buyers come back within 90 days?</td><td class="num">~₹25 L</td><td class="num">6 months</td><td>Requires inventory and media</td></tr>
      <tr><td><strong>3</strong></td><td>Can it hold 4 units/store/week in 50 stores?</td><td class="num">~₹8 L</td><td class="num">8 weeks</td><td>Can run in parallel with 2</td></tr>
      <tr class="tot"><td></td><td><strong>Total to reach institutional readiness</strong></td><td class="num"><strong>~₹37 L</strong></td><td class="num"><strong>9 months</strong></td><td></td></tr>
    </tbody>
  </table>
</div>

<div class="section">
  <h1>23 · Investor Readiness Assessment</h1>
  <p>Scored as the business stands today: pre-product, pre-revenue, with a complete brand system and financial
  model.</p>
  ${readinessTable()}

  <div class="callout warn">
    <span class="label">Overall: 5.7 / 10 — not yet institutionally fundable</span>
    <p>That is not a failing grade for a pre-revenue brand; it is an accurate one. The score is dragged down
    almost entirely by two things, and both are fixable within nine months.</p>
    <p><strong>Traction (1/10).</strong> Nothing substitutes for it.<br>
    <strong>Team (unscored).</strong> No founder credentials are documented anywhere. For a consumer brand,
    investors back the operator before the idea. If the founding team includes beverage formulation or FMCG
    distribution experience, documenting it is the single highest-leverage addition to this report.</p>
    <p><strong>Projected score at a realistic ₹10 Cr seed</strong> (after 9–12 months of D2C):
    <strong>7.5–8 / 10</strong>, assuming repeat and taste data land where the model assumes.</p>
  </div>

  <h3>23.1 How seven investor lenses would assess this</h3>
  ${investorLensTable()}
</div>

<div class="section">
  <h1>24 · Implementation Roadmap</h1>
  ${roadmapTable()}
  <h3>24.1 Critical path</h3>
  <p>The binding constraint is not capital — it is <strong>time to first production run</strong>. Every month
  spent fundraising rather than manufacturing consumes the 18–30 month window before an incumbent locks
  distribution. The correct order is: sign a co-packer, produce, test blind, sell, then raise.</p>
</div>

${partDivider('Annexures', 'Annexures', 'Full model assumptions, generated financial tables, selected investor questions and the sources behind every verified claim.')}

<div class="section">
  <h1>Annexure A · Model Assumptions in Full</h1>
  <p>Every input to the financial model, with provenance. These are the numbers to attack in diligence.</p>
  ${assumptionsTable(M)}
</div>

<div class="section">
  <h1>Annexure B · Generated Financial Tables</h1>
  <h3>B.1 Channel economics</h3>
  ${miniChannelTable(M)}
  <h3>B.2 Unit economics by year — all formats</h3>
  ${allFormatTable(M)}
  <h3>B.3 Full P&amp;L — all scenarios</h3>
  ${allPnl(M)}
</div>

<div class="section">
  <h1>Annexure C · Investor FAQ — Selected</h1>
  <p class="small">The full set of 100 questions is maintained in <span class="sans">docs/investor/09-investor-faq.md</span>.
  Reproduced here are those most likely to be asked in a first meeting.</p>
  ${faqBlocks(faqs)}
</div>

<div class="section">
  <h1>Annexure D · Sources &amp; References</h1>
  <h3>D.1 Verified claims</h3>
  ${sourcesTable()}
  <h3>D.2 Requiring citation before external use</h3>
  <div class="callout warn">
    <span class="label">Outstanding</span>
    <p>The following figures are carried through this report as supplied and <strong>have not been verified
    against a primary source</strong>. They must be cited or replaced before this document is circulated:</p>
    <ul>
      <li>Indian functional beverage market at USD 4.2–8.3 bn (2025–26)</li>
      <li>Functional beverage CAGR of ~10–11%</li>
      <li>Indian prebiotic soda category at USD 12.6 m (2025)</li>
      <li>"Fewer than 50% of Indian adults meet recommended daily fibre intake"</li>
      <li>Category-typical sugar content figures for juice, cola and energy drinks</li>
    </ul>
  </div>
  <h3>D.3 Model provenance</h3>
  <p>Every figure in this report is generated from <span class="sans">investor/assumptions.mjs</span> via
  <span class="sans">investor/build.mjs</span> and <span class="sans">investor/dpr/build-dpr.mjs</span>.
  No number was typed by hand. Model version ${M.meta.modelVersion}, generated ${M.meta.generatedAt}.</p>
  <p class="small muted">Prepared for Frolic Beverages Pvt. Ltd. (proposed). Confidential. This document is not a
  prospectus, an offer or a solicitation. Projections are illustrative and depend on assumptions that may prove
  incorrect. FROLIC is a food product, not a medicine, and nothing herein is a claim to diagnose, treat, cure or
  prevent any condition.</p>
</div>
`;
}

/* ── tables ─────────────────────────────────────────────────── */

function riskTable() {
  const rows = [
    ['Taste does not beat the incumbent', 'Medium', 'Critical', 'Blind panel before any further spend; reformulate rather than fundraise if it loses'],
    ['Team lacks FMCG distribution capability', 'High', 'Critical', 'Hire or co-found before the seed round'],
    ['Misfits raises a Series A and locks distribution', 'Medium', 'High', 'Compress time to first production run; concentrate on two cities'],
    ['Repeat rate below 25%', 'Medium', 'High', 'Six-month D2C pilot answers it before institutional capital is at risk'],
    ['Coca-Cola or PepsiCo launches an Indian prebiotic line', 'Medium', 'High', 'Build regional dominance so cloning is slower than acquiring'],
    ['Quick commerce commission increase or delisting', 'Medium', 'High', '~40% of volume by Y3. Diversify into modern trade earlier'],
    ['GST tightens further on sin goods', 'Low–medium', 'High', 'Still-beverage line at 5% GST is the structural hedge'],
    ['Co-packer capacity unavailable in peak season', 'Medium', 'Medium', 'Committed annual volume contracts; Q1 inventory build'],
    ['Jamun / kokum supply failure', 'Medium', 'Medium', 'Freeze at harvest, forward contract, and do not launch with these SKUs'],
    ['Basket size falls below 8 cans', 'Medium', 'Medium', 'Bundle builder enforces 12- and 24-can boxes'],
    ['Aluminium price shock', 'Low–medium', 'Medium', 'Largest single cost line; forward cover at volume'],
    ['Batch stability failure in market', 'Low', 'Critical', 'Shelf-life validation before retail; retained samples; recall procedure'],
    ['Claims challenge from FSSAI or ASCI', 'Low', 'Medium', 'Composition-only language; banned-phrase validation at authoring time'],
    ['COD return-to-origin losses exceed provision', 'Medium', 'Low–medium', 'Pincode-level COD restriction; prepaid incentives; ₹2,000 cap'],
  ];
  return `<table class="compact">
    <thead><tr><th style="width:28%">Risk</th><th style="width:12%">Likelihood</th><th style="width:12%">Impact</th><th>Mitigation</th></tr></thead>
    <tbody>${rows.map(([r, l, i, m]) => `<tr><td><strong>${r}</strong></td><td>${l}</td>
      <td>${i}</td><td>${m}</td></tr>`).join('')}</tbody>
  </table>`;
}

function proofTable(rows) {
  return `<table class="compact">
    <thead><tr><th style="width:22%">Evidence</th><th style="width:38%">Specification</th><th>Why it decides the deal</th></tr></thead>
    <tbody>${rows.map(([e, s, w]) => `<tr><td><strong>${e}</strong></td><td>${s}</td><td>${w}</td></tr>`).join('')}</tbody>
  </table>`;
}

function readinessTable() {
  const rows = [
    ['Market opportunity', '8 / 10', 'Large, growing, global precedent unambiguous'],
    ['Category timing', '8 / 10', 'Early but no longer speculative — incumbents validate demand'],
    ['Product differentiation', '6 / 10', 'Indian-flavour wedge is real; the fibre specification is not'],
    ['Brand &amp; design', '9 / 10', 'Complete, original, genuinely premium; ahead of the category'],
    ['Team', '<strong>Unscored</strong>', '<strong>Not assessable. The largest gap in this report</strong>'],
    ['Traction', '<strong>1 / 10</strong>', '<strong>None. No sales, no taste data, no shelf presence</strong>'],
    ['Unit economics', '6 / 10', 'Modelled and coherent, entirely unvalidated'],
    ['Financial model quality', '8 / 10', 'Assumption-driven, auditable, internally consistent'],
    ['Defensibility', '4 / 10', 'Brand and flavour IP only; no supply or distribution lock'],
    ['Capital efficiency', '7 / 10', '₹30 Cr to EBITDA breakeven is reasonable for the category'],
  ];
  return `<table>
    <thead><tr><th style="width:26%">Dimension</th><th style="width:14%" class="num">Score</th><th>Rationale</th></tr></thead>
    <tbody>${rows.map(([d, s, r]) => `<tr><td><strong>${d}</strong></td><td class="num">${s}</td><td>${r}</td></tr>`).join('')}
    <tr class="tot"><td><strong>Overall</strong></td><td class="num"><strong>5.7 / 10</strong></td>
      <td><strong>Not yet institutionally fundable</strong></td></tr></tbody>
  </table>`;
}

function investorLensTable() {
  const rows = [
    ['Peak XV Partners', 'Category creation with a proven global playbook; ₹3,000 Cr+ outcome if a leader emerges', 'Underwrites velocity. Indian beverage is a distribution and capital game. Pre-revenue against a funded incumbent is a pass at seed'],
    ['Accel India', 'D2C-first brand with owned demand; subscription and CRM assets are real', 'Indian D2C beverage economics are poor at low AOV. Will interrogate whether the free-shipping threshold drives basket size or erodes margin'],
    ['Fireside Ventures', '<strong>The most likely lead.</strong> "Western format, Indian taste" is precisely their thesis', 'Ten SKUs at launch is an inventory disaster. Will push hard to launch with three, and will ask why 4 g sugar when the incumbent is at zero'],
    ['DSG Consumer Partners', 'Underwrites gross margin and repeat. 55.7% → 66.7% on net revenue after a 40% tax is genuinely good', 'Sceptical of heavy marketing ratios. Year 1 at 60% of net revenue signals a brand buying trial'],
    ['Coca-Cola Ventures', 'Strategic defence. Watched PepsiCo pay $1.95 bn. Distribution could reach 500,000 outlets in 24 months', 'Strategics do not lead pre-revenue seed rounds. Can develop a prebiotic line internally for less'],
    ['PepsiCo Ventures', 'Already owns the global playbook via Poppi; understands the unit economics better than any financial investor', 'Owning Poppi means they can launch it in India themselves. Build-versus-buy cuts hard against FROLIC'],
    ['Generalist growth fund (Series B)', 'By Series B the only question is whether the machine compounds. 8.4× trailing is defensible for a category leader', 'In the conservative case Series B returns 1.1×. Nothing protects late money except growth continuing exactly as planned'],
  ];
  return `<table class="compact">
    <thead><tr><th style="width:18%">Lens</th><th style="width:41%">Why they would invest</th><th>Why they would pass</th></tr></thead>
    <tbody>${rows.map(([n, y, p]) => `<tr><td><strong>${n}</strong></td><td>${y}</td><td>${p}</td></tr>`).join('')}</tbody>
  </table>`;
}

function roadmapTable() {
  const rows = [
    ['0–2', 'Formulation locked (3 SKUs). Co-packer signed. FSSAI licence obtained', 'Ability to manufacture'],
    ['2–3', 'First production run ~50,000 cans. <strong>Actual COGS recorded</strong>', 'Cost stack verified'],
    ['3', '<strong>Blind taste test, n ≥ 200</strong>', 'Go / no-go on the entire thesis'],
    ['3–4', 'Shelf-life study initiated (accelerated)', 'Retail readiness'],
    ['4–9', 'D2C live in 2 cities. Quick commerce listing', 'Revenue, cohort data, CAC'],
    ['6', '50-store retail pilot', 'Sell-through evidence'],
    ['9', 'M3 retention curve complete', 'The number the seed round turns on'],
    ['10', '<strong>₹10 Cr seed raise</strong>', '5-city expansion'],
    ['12–18', 'Modern trade entry; full 10-SKU range', 'Series A narrative'],
    ['24', '₹15 Cr revenue run-rate', '<strong>Series A at ₹250 Cr post-money</strong>'],
    ['36', '₹51 Cr revenue; general trade entry', 'Path to EBITDA breakeven visible'],
    ['48', '₹125 Cr revenue; <strong>EBITDA positive</strong>', '<strong>Series B at ₹1,050 Cr post-money</strong>'],
    ['60', '₹267 Cr revenue; 23.3% EBITDA margin', 'National distribution; still-beverage line'],
    ['84', '₹760 Cr revenue', '<strong>Exit at 3.9× revenue</strong>'],
  ];
  return `<table>
    <thead><tr><th style="width:12%">Month</th><th style="width:50%">Milestone</th><th>Unlocks</th></tr></thead>
    <tbody>${rows.map(([m, s, u]) => `<tr><td><strong>${m}</strong></td><td>${s}</td><td>${u}</td></tr>`).join('')}</tbody>
  </table>`;
}

function assumptionsTable(M) {
  const s = M.pnl.base.years;
  const groups = [
    ['Tax', [
      ['GST — aerated sweetened beverages', '40%', 'V'],
      ['GST — non-carbonated fruit-based', '5%', 'V'],
      ['Corporate tax (s.115BAA)', '25%', 'V'],
    ]],
    ['Product &amp; cost — 250 ml', [
      ['MRP', '₹130', 'A'],
      ['COGS Year 1 → Year 5', '₹34.00 → ₹23.00', 'E'],
      ['Prebiotic fibre cost per can', '₹4.00 → ₹3.00', 'E'],
      ['Can body cost per can', '₹12.00 → ₹8.00', 'E'],
    ]],
    ['Channel', [
      ['D2C logistics per can', '₹4.20 (₹50/order ÷ 12 cans)', 'E'],
      ['D2C payment + RTO provision', '5%', 'E'],
      ['Quick commerce commission', '25%', 'E'],
      ['Modern trade retailer margin', '25%', 'E'],
      ['Modern trade distributor margin', '8%', 'E'],
      ['General trade retailer / distributor', '22% / 10%', 'E'],
    ]],
    ['Market', [
      ['Adults 18–45, five metros', '46.0 M', 'E'],
      ['SEC A/A+ share', '26%', 'E'],
      ['Premium beverage buyer share', '25%', 'E'],
      ['Beachhead', `${M.market.premiumBeverageBuyersMn.toFixed(2)} M`, 'E'],
    ]],
    ['Demand — base case', [
      ['Customers Y1 → Y5', '18,000 → 1,200,000', 'A'],
      ['Orders per customer per year', '2.4 → 2.8', 'A'],
      ['Cans per order', '10.0 → 11.5', 'A'],
      ['Annual retention', '34% → 47%', 'A'],
      ['CAC', '₹850 → ₹540', 'A'],
      ['Marketing as % of net revenue', '60% → 18%', 'A'],
      ['Operating expenditure', '₹4.5 Cr → ₹68 Cr', 'A'],
    ]],
    ['Funding &amp; exit', [
      ['Seed', '₹10 Cr at ₹50 Cr post', 'A'],
      ['Series A', '₹50 Cr at ₹250 Cr post', 'A'],
      ['Series B', '₹150 Cr at ₹1,050 Cr post', 'A'],
      ['ESOP at seed / refresh per round', '10% / 2%', 'A'],
      ['Exit year', 'Year 7', 'A'],
      ['Exit revenue multiple', '3.9× (PepsiCo–Poppi disclosed)', 'V'],
      ['Year 7 revenue — cons / base / agg', '₹310 / ₹760 / ₹1,450 Cr', 'A'],
      ['Failure probability weighting', '55%', 'A'],
    ]],
  ];
  return groups.map(([g, rows]) => `<h3>${g}</h3>
    <table class="compact"><thead><tr><th style="width:44%">Input</th><th style="width:34%">Value</th><th class="num">Provenance</th></tr></thead>
    <tbody>${rows.map(([k, v, t]) => `<tr><td>${k}</td><td><strong>${v}</strong></td>
      <td class="num"><span class="tag ${t.toLowerCase()}">${t}</span></td></tr>`).join('')}</tbody></table>`).join('');
}

function miniChannelTable(M) {
  return `<table class="compact">
    <thead><tr><th>Channel</th><th class="num">Net to brand</th><th class="num">% of MRP</th><th class="num">vs modern trade</th></tr></thead>
    <tbody>${M.channels.map((c) => `<tr><td>${c.channel}</td>
      <td class="num">₹${c.netToBrand.toFixed(2)}</td><td class="num">${c.netAsPctOfMrp.toFixed(1)}%</td>
      <td class="num">${(((c.netToBrand / M.channels[3].netToBrand) - 1) * 100).toFixed(0)}%</td></tr>`).join('')}</tbody>
  </table>`;
}

function allFormatTable(M) {
  return `<table class="compact">
    <thead><tr><th>Format</th><th class="num">Y1 net</th><th class="num">Y1 COGS</th><th class="num">Y1 GM%</th>
      <th class="num">Y5 net</th><th class="num">Y5 COGS</th><th class="num">Y5 GM%</th></tr></thead>
    <tbody>${M.unitEconomics.byFormatY1.map((f, i) => {
      const f5 = M.unitEconomics.byFormatY5[i];
      return `<tr><td><strong>${f.format}</strong></td>
        <td class="num">₹${f.blendedNetRealisation.toFixed(2)}</td><td class="num">₹${f.cogs.toFixed(2)}</td>
        <td class="num">${f.grossMarginPct.toFixed(1)}%</td>
        <td class="num">₹${f5.blendedNetRealisation.toFixed(2)}</td><td class="num">₹${f5.cogs.toFixed(2)}</td>
        <td class="num">${f5.grossMarginPct.toFixed(1)}%</td></tr>`;
    }).join('')}</tbody>
  </table>`;
}

function allPnl(M) {
  return ['conservative', 'base', 'aggressive'].map((k) => {
    const p = M.pnl[k];
    return `<h4>${p.scenario}</h4>
    <table class="compact">
      <thead><tr><th>Yr</th><th class="num">Customers</th><th class="num">Cans</th><th class="num">ARPU</th>
        <th class="num">Revenue</th><th class="num">GM%</th><th class="num">Mktg</th><th class="num">Opex</th>
        <th class="num">EBITDA</th><th class="num">CAC</th></tr></thead>
      <tbody>${p.years.map((y) => `<tr><td>Y${y.year}</td>
        <td class="num">${y.customers.toLocaleString('en-IN')}</td>
        <td class="num">${(y.cans / 1e6).toFixed(2)} M</td>
        <td class="num">₹${y.arpu.toLocaleString('en-IN')}</td>
        <td class="num">₹${y.netRevenueCr.toFixed(1)}</td><td class="num">${y.grossMarginPct.toFixed(1)}%</td>
        <td class="num">₹${y.marketingCr.toFixed(1)}</td><td class="num">₹${y.opexCr.toFixed(1)}</td>
        <td class="num"><strong>${money(y.ebitdaCr, 1)}</strong></td>
        <td class="num">₹${y.cac}</td></tr>`).join('')}</tbody>
    </table>`;
  }).join('');
}

function faqBlocks(faqs) {
  return faqs.map((g) => `<h3>${g.group}</h3>${g.items.map(([q, a]) =>
    `<div class="avoid-break" style="margin-bottom:3mm"><p style="margin-bottom:1mm"><strong>${q}</strong></p>
     <p class="muted" style="margin-bottom:0">${a}</p></div>`).join('')}`).join('');
}

function sourcesTable() {
  const rows = [
    ['40% GST on aerated sweetened beverages, effective 22 Sep 2025', 'CBIC rate rationalisation; ClearTax; industry reporting'],
    ['5% GST on non-carbonated fruit-based drinks', 'Same'],
    ['PepsiCo acquired Poppi for $1.95 bn cash + $0.2 bn contingent', 'PepsiCo Form 10-Q, FY2025 (SEC EDGAR)'],
    ['Poppi 2024 revenue ~$500 m; implied multiple 3.9×', 'PepsiCo Form 10-Q; CNBC'],
    ['Olipop valued at $1.85 bn; profitable since early 2024', 'Reported funding round coverage'],
    ['Misfits — India prebiotic soda, seed-funded, 250 ml / 7 g fibre / 4 g sugar, zero added sugar', 'BW Disrupt; YourStory; company site'],
    ['Bubz — second Indian prebiotic soda entrant', 'SME Futures'],
  ];
  return `<table class="compact">
    <thead><tr><th style="width:52%">Claim</th><th>Source</th></tr></thead>
    <tbody>${rows.map(([c, s]) => `<tr><td>${c}</td><td>${s}</td></tr>`).join('')}</tbody>
  </table>`;
}
