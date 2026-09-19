/** DPR — Part IV (operations) and Part V (financials). */
import { partDivider } from './parts-a.mjs';
import { barRow, money, pctSigned } from './helpers.mjs';

export function partC(M) {
  return `
${partDivider('Part IV', 'Operations', 'How the product gets made, cleared, sold and delivered — and the regulatory constraints that shape all three.')}

<div class="section">
  <h1>11 · Manufacturing &amp; Supply Chain</h1>

  <h3>11.1 Manufacturing model</h3>
  <p><strong>Co-packing (tolling) through Year 3.</strong> This is the standard and correct model for a beverage
  startup: it converts a large fixed capital requirement into a variable per-unit cost, and removes the risk of
  owning idle capacity while demand is unproven. Own capacity becomes a Series B consideration, and only if
  volume justifies it.</p>

  <p>The principal risk of tolling is capacity priority during the March–June peak, when every beverage brand in
  India wants the same line. The mitigation is committed annual volume contracts, which are also the lever that
  drives the conversion charge down from ₹5.50 to ₹2.90 per can across the projection period.</p>

  <div class="callout warn">
    <span class="label">Not yet in place</span>
    <p><strong>No co-packer has been signed and no production run has been completed.</strong> Both are month
    0–2 milestones and prerequisites for the seed round. Every cost figure in Part V is an estimate until one
    production run converts it into an invoice.</p>
  </div>

  <h3>11.2 Bill of materials — 250 ml can</h3>
  ${bomTable(M)}

  <div class="callout info">
    <span class="label">The counter-intuitive cost fact</span>
    <p><strong>The prebiotic fibre — the entire product premise — is ₹4.00 per can, 12% of COGS.</strong> The
    aluminium can costs three times more than the functional ingredient. There is nothing meaningful to save by
    reducing fibre, and doing so would destroy the proposition. The real cost lever is the can body, and it is a
    volume negotiation.</p>
  </div>

  <h3>11.3 Ingredient sourcing</h3>
  <table>
    <thead><tr><th style="width:22%">Ingredient</th><th style="width:26%">Source</th><th>Supply risk</th></tr></thead>
    <tbody>
      <tr><td>Chicory root inulin</td><td>Contract-farmed, Maharashtra and Karnataka; import routes established</td><td>Low — commodity food ingredient with multiple suppliers</td></tr>
      <tr><td>Acacia gum</td><td>Imported, re-tested in India</td><td>Low–medium — single origin region, price volatility</td></tr>
      <tr><td>Kokum</td><td>Konkan coast — Ratnagiri and Sindhudurg</td><td><strong>Medium–high</strong> — grows on one coastline, sun-dried, seasonal</td></tr>
      <tr><td>Jamun</td><td>Central and northern India</td><td><strong>High</strong> — ~six-week harvest, poor fresh shelf life, requires freezing at harvest</td></tr>
      <tr><td>Raw green mango, guava, blood orange</td><td>Multiple domestic regions</td><td>Low–medium — seasonal but widely grown</td></tr>
      <tr><td>Aluminium cans (250 ml sleek)</td><td>Domestic can makers</td><td>Medium — commodity price exposure; largest single cost line</td></tr>
    </tbody>
  </table>
  <p>Jamun and kokum are the two genuine operational constraints. They are also a barrier to fast followers:
  a competitor cannot replicate those SKUs without building the same forward-contracting relationships.</p>

  <h3>11.4 Quality, shelf life and recall</h3>
  <ul>
    <li><strong>Shelf life target 12 months ambient</strong>, requiring both accelerated and real-time validation before retail entry. Not yet performed.</li>
    <li>Stability testing must specifically cover fibre suspension, carbonation retention and aromatic degradation — the three known failure modes for this formulation.</li>
    <li>Batch coding, retained samples per batch, third-party lab testing, and a documented recall procedure are required before any retail listing.</li>
  </ul>

  <h3>11.5 Working capital cycle</h3>
  <p>Approximately <strong>55 days of COGS</strong> is tied up in inventory and channel receivables at peak.
  Cans are manufactured, shipped and sit on shelves months before cash returns. This is why the aggressive
  scenario requires more capital than the base case despite reaching profitability two years earlier.</p>
  ${wcTable(M)}
</div>

<div class="section">
  <h1>12 · Regulatory &amp; Compliance</h1>

  <h3>12.1 Tax treatment — the governing constraint</h3>
  <p>From 22 September 2025 India taxes aerated and sweetened beverages at a flat <strong>40% GST</strong>,
  replacing the previous 28% plus 12% compensation cess. Non-carbonated fruit- and juice-based drinks and
  packaged water sit at <strong>5%</strong>.</p>
  ${gstImpact(M)}

  <div class="callout good">
    <span class="label">A 35-point strategic lever</span>
    <p>A still (non-carbonated) FROLIC — same fibre, same Indian flavours, no carbonation — would face 5% GST.
    At the same ₹130 MRP the ex-tax value rises from ₹${(130 / 1.4).toFixed(2)} to ₹${(130 / 1.05).toFixed(2)}:
    <strong>+₹${(130 / 1.05 - 130 / 1.4).toFixed(2)} per can</strong>, straight into the value chain. That is
    larger than the entire Year-5 COGS reduction programme, achievable immediately, and requires no scale.</p>
    <p>This is not a recommendation to abandon carbonation — soda is the category and the product premise. It is
    a higher-margin second act, a hedge against further tightening of sin-goods policy, and a route into HoReCa
    and institutional channels where carbonation is a drawback. It belongs on the Series A roadmap.</p>
  </div>

  <h3>12.2 Claims framework</h3>
  <p>Governed by the FSS (Advertising and Claims) Regulations 2018, the FSS (Packaging and Labelling) Regulations,
  the Consumer Protection Act 2019 and the ASCI Code. The operative distinction is between describing
  <em>composition</em> and asserting a <em>health outcome</em>.</p>
  ${claimsTable()}

  <h3>12.3 How compliance is enforced in the build</h3>
  <ul>
    <li>Ingredient copy fields carry the discipline explicitly: every description states what the ingredient <em>is</em> or <em>does in the can</em>, never an outcome for the drinker.</li>
    <li>The CMS schema rejects a banned-phrase list at authoring time with an actionable error message.</li>
    <li>Nutrition panels validate against arithmetic impossibilities — added sugar cannot exceed total sugar, prebiotic fibre cannot exceed dietary fibre.</li>
    <li>Compliance sign-off is a blocking gate on any nutrition or ingredient copy change, with full document history as the audit trail.</li>
    <li>The legal disclaimer appears in the global footer of all 37 pages, not on a policy page.</li>
  </ul>

  <h3>12.4 Label requirements per can</h3>
  <p>FSSAI licence number and logo; veg mark; nutrition panel per 100 ml and per serving; full ingredient list in
  descending order by weight; allergen declaration; net quantity and MRP inclusive of all taxes; batch or lot
  number, date of manufacture and best-before; manufacturer name and address; customer care contact; storage
  instruction. Plus one item not required by regulation:</p>
  <p><strong>"Contains added dietary fibre. Introduce gradually."</strong> This is a voluntary advisory. A poor
  first week is how a consumer decides fibre is not for them, and telling people up front costs less than a refund
  and a one-star review.</p>
</div>

<div class="section">
  <h1>13 · Technology &amp; Digital Infrastructure</h1>
  <p>The digital storefront is built and operational — 37 statically pre-rendered pages including ten product
  pages, a flavour quiz, a bundle builder, subscription flows and a rewards programme.</p>

  <h3>13.1 Architecture</h3>
  <table>
    <thead><tr><th style="width:24%">Layer</th><th style="width:28%">Choice</th><th>Rationale</th></tr></thead>
    <tbody>
      <tr><td>Frontend</td><td>Next.js 14 (App Router), TypeScript, Tailwind</td><td>Static pre-rendering for every indexable route; Core Web Vitals are an SEO input</td></tr>
      <tr><td>Commerce</td><td>Headless Shopify + Recharge</td><td>Shopify owns money, inventory, tax and PCI scope; none benefit from a custom build</td></tr>
      <tr><td>CMS</td><td>Sanity</td><td>TypeScript schemas, so compliance validation runs at authoring time</td></tr>
      <tr><td>Data</td><td>Postgres</td><td>Owns only what Shopify cannot: loyalty ledger, referrals, quiz analytics, review moderation</td></tr>
      <tr><td>3D / motion</td><td>React Three Fiber, Framer Motion</td><td>Procedurally generated can — no 3D asset files, no CDN dependency</td></tr>
    </tbody>
  </table>

  <h3>13.2 Field ownership</h3>
  <p>A product record is the union of two sources, with <strong>exclusive</strong> field ownership — no field is
  writable from both systems. Shopify owns price, SKU, variant ID and inventory; Sanity owns story, flavour world,
  nutrition and quiz taxonomy. Duplicating a price would create two numbers that can disagree, and the one the
  customer sees would not be the one they are charged.</p>

  <h3>13.3 Engineering decisions with commercial consequences</h3>
  <ul>
    <li><strong>The 3D can is generated, not modelled.</strong> Lathe geometry plus a canvas-drawn label and a procedural lighting rig. A new flavour ships without any 3D work, and nothing in the render path can fail over the network.</li>
    <li><strong>three.js is genuinely conditional.</strong> Capability and viewport gates sit outside the dynamic-import boundary, so the renderer is never fetched on reduced-motion, Save-Data, slow-network, low-core or low-memory devices. First Load JS is 170 kB against 405 kB before that change.</li>
    <li><strong>Bundle lines carry their own unit price.</strong> A four-can share of a 24-can box is not re-priced as a four-can pack, so the cart total always matches the price shown.</li>
    <li><strong>Chart colours are a separate validated set</strong> from brand primaries, checked for colour-vision separation and 3:1 contrast.</li>
  </ul>

  <h3>13.4 Known gaps</h3>
  <p>Stated plainly, because they will surface in technical diligence: checkout is not wired to Shopify; forms do
  not submit; reviews are illustrative placeholders and the aggregate-rating structured data they feed
  <strong>must be disabled before launch</strong>; there is no test suite; and no analytics are instrumented.</p>
</div>

<div class="section">
  <h1>14 · Distribution &amp; Channel Strategy</h1>

  <h3>14.1 What the brand banks per can, by channel</h3>
  ${channelTable(M)}

  <p>The spread is the entire distribution strategy. <strong>D2C is worth
  ${(((M.channels[0].netToBrand / M.channels[3].netToBrand) - 1) * 100).toFixed(0)}% more per can than modern
  trade</strong> — it is not a channel to graduate out of, but permanently the most profitable one, and the only
  one that yields a customer relationship. Retail is brand-building that happens to roughly break even; its value
  is visibility, credibility and the volume that drives COGS down.</p>

  <h3>14.2 Channel mix by year</h3>
  ${channelMixTable(M)}

  <h3>14.3 Geographic sequencing</h3>
  <table>
    <thead><tr><th style="width:10%">Phase</th><th style="width:12%">Period</th><th style="width:38%">Markets</th><th>Channels</th></tr></thead>
    <tbody>
      <tr><td>1</td><td>Year 1</td><td>Mumbai, Bengaluru</td><td>D2C and quick commerce only</td></tr>
      <tr><td>2</td><td>Year 2</td><td>+ Delhi NCR, Pune, Hyderabad</td><td>+ modern trade, HoReCa</td></tr>
      <tr><td>3</td><td>Year 3</td><td>Top five consolidated</td><td>+ early general trade</td></tr>
      <tr><td>4</td><td>Year 4</td><td>+ Chennai, Kolkata, Ahmedabad, Jaipur, Chandigarh</td><td>Full omnichannel</td></tr>
      <tr><td>5</td><td>Year 5</td><td>Pan-India metro and tier-1</td><td>National distribution</td></tr>
    </tbody>
  </table>
  <p><strong>Two cities in Year 1, not five.</strong> Shelf velocity beats shelf coverage: a brand selling eight
  units per store per week across 200 Mumbai stores is fundable; the same volume spread across 1,000 stores in
  five cities is not.</p>

  <h3>14.4 Cash-on-delivery and returns</h3>
  <p>COD represents roughly 35% of Indian D2C beverage orders and is the principal driver of return-to-origin
  losses, which are a structural drag on Indian D2C margins. The model carries a 5% combined payment-and-RTO
  provision on D2C. Mitigations: prepaid incentives, pincode-level COD restriction based on RTO history, WhatsApp
  order confirmation before dispatch, and a ₹2,000 COD cap.</p>

  <div class="callout warn">
    <span class="label">Concentration risk</span>
    <p>Quick commerce represents approximately 40% of volume by Year 3. If platforms raise commissions or
    deprioritise the category, FROLIC is materially exposed. This is the most significant single channel risk
    in the plan.</p>
  </div>
</div>

<div class="section">
  <h1>15 · Marketing &amp; Conversion</h1>

  <h3>15.1 The friction, in order of cost</h3>
  <table>
    <thead><tr><th style="width:30%">Friction</th><th>Mechanism built to address it</th></tr></thead>
    <tbody>
      <tr><td><strong>Ten flavours is too many for a cold visitor</strong><br><span class="muted">The single largest leak</span></td>
        <td>Bestsellers section limits the first decision to four; a four-question flavour quiz scored against the live catalogue; a 6-can starter pack that makes "I don't know which one" a cheap decision; a bundle builder that reframes choice as assembly rather than selection.</td></tr>
      <tr><td><strong>"Will a functional beverage actually taste good?"</strong></td>
        <td>Flavour stories lead with sensory memory rather than nutrition; tasting notes are the first scannable element; intensity and sweetness meters set expectations honestly; a four-star review carrying a genuine caveat is deliberately published, because it raises trust in the five-star ones.</td></tr>
      <tr><td><strong>Subscription feels like a trap</strong></td>
        <td>"Skip or cancel anytime" stated inside the buy box at the decision point, not in a policy page; no minimum term; no cancellation fee; explicit "no retention script".</td></tr>
      <tr><td><strong>Cart abandonment</strong></td>
        <td>Free-shipping progress bar showing the exact rupee gap; drawer opens on add to confirm the action; savings shown as a line item; payment methods named before checkout.</td></tr>
    </tbody>
  </table>

  <h3>15.2 Pricing psychology</h3>
  <p><strong>Two stacked discounts, never one.</strong> Pack tier (0 / 8 / 15%) and subscription (20%) stack
  multiplicatively. The customer makes two separate, individually small decisions and arrives at 32% off without
  a single "32% OFF" banner — which would cheapen the brand and anchor the list price as fictional.</p>
  <p>The ₹999 free-shipping threshold sits deliberately above a 6-pack and below a 12-pack, so the progress bar
  always has somewhere to go.</p>

  <h3>15.3 Post-purchase sequence</h3>
  <table class="compact">
    <thead><tr><th style="width:12%">Day</th><th style="width:34%">Trigger</th><th>Purpose</th></tr></thead>
    <tbody>
      <tr><td>0</td><td>Order confirmation</td><td>Set delivery expectation</td></tr>
      <tr><td>2</td><td>Dispatch + WhatsApp tracking</td><td>Reduce "where is it" support contact</td></tr>
      <tr><td>7</td><td>Review request</td><td>Reviews; the fibre advisory repeats here. Day 7 is chosen so they have actually finished a pack — a day-2 request gets a review of the packaging</td></tr>
      <tr><td>14</td><td>Subscription offer</td><td>Convert a satisfied one-time buyer</td></tr>
      <tr><td>30</td><td>Replenishment nudge</td><td>Reorder</td></tr>
      <tr><td>60</td><td>Win-back with new flavours</td><td>Reactivation</td></tr>
    </tbody>
  </table>

  <h3>15.4 SEO and content</h3>
  <p>The category barely exists in Indian search, so the strategy is category creation rather than capture: win
  the informational queries that precede commercial ones. Structured data covers Organization, WebSite, Product
  with NutritionInformation, FAQPage, Article, BreadcrumbList and ItemList. NutritionInformation on a beverage
  product is underused by competitors and is exactly the kind of structured fact that surfaces in AI-generated
  answers.</p>
  <p class="small"><strong>Rule:</strong> never emit aggregate rating structured data without genuine reviews
  behind it. It is a manual-action risk and it is dishonest.</p>
</div>

${partDivider('Part V', 'Financials', 'Unit economics, three scenarios, the funding plan and what investors actually get back — generated from one model, including the parts that do not flatter.')}

<div class="section">
  <h1>16 · Unit Economics</h1>

  <h3>16.1 Where ₹130 goes</h3>
  <p>The most important table in this report.</p>
  ${channelTable(M)}

  <h3>16.2 Per-can economics by year — 250 ml</h3>
  ${unitByYearTable(M)}
  <p>Blended net realisation <em>falls</em> from ₹${M.unitEconomics.can250[0].blendedNetRealisation.toFixed(2)}
  to ₹${M.unitEconomics.can250[4].blendedNetRealisation.toFixed(2)} as the mix shifts toward retail. COGS falls
  faster. <strong>Margin expansion is a procurement achievement, not a pricing one</strong> — which is important,
  because procurement outcomes are far more controllable than consumer ones.</p>

  <h3>16.3 Format comparison</h3>
  ${formatTable(M)}
  <p><strong>Recommendation: launch 250 ml only.</strong> The margin gain from 330 ml is roughly one percentage
  point, which does not justify a second SKU's tooling, inventory and shelf complexity for a pre-revenue brand.
  250 ml also matches the price point consumers accept for a single-serve premium beverage and the funded
  incumbent's format, which keeps shelf comparison straightforward. Add 330 ml in Year 3 for HoReCa and multipack.</p>

  <h3>16.4 Minimum viable selling price</h3>
  <p>The MRP at which a can clears COGS plus a 50% gross margin after all downstream leakage, solved analytically —
  every deduction except per-can logistics is proportional to price.</p>
  ${mvpTable(M)}
  <div class="callout warn">
    <span class="label">Only 11% of pricing headroom</span>
    <p>FROLIC cannot run deep discounts, cannot fight a price war, and cannot sustain buy-one-get-one mechanics.
    A 20% promotion on a 250 ml can puts it below the viability floor.</p>
    <p>This is a strategic constraint and simultaneously a moat: <strong>the same arithmetic binds every
    entrant.</strong> Nobody can buy this market with price. The category will be won on taste, brand and
    distribution — which is the competition FROLIC would choose.</p>
  </div>

  <h3>16.5 Customer acquisition and lifetime value</h3>
  ${ltvTable(M)}
  <div class="callout warn">
    <span class="label">Where this model is weakest</span>
    <p><strong>Year 1 LTV:CAC of ${M.ltv.base[0].ltvToCac.toFixed(1)}× is below the 3× floor</strong> most
    consumer investors require, and the model does not clear it until Year
    ${M.ltv.base.findIndex(r => r.ltvToCac >= 3) + 1}. On a three-year view FROLIC acquires its first two cohorts
    at close to breakeven.</p>
    <p>This is normal for a brand buying its first customers, but it must be stated rather than hidden inside a
    blended figure: <strong>the seed round funds the journey to good unit economics; it does not scale economics
    that already work.</strong> Any investor told otherwise discovers it in diligence.</p>
  </div>
</div>

<div class="section">
  <h1>17 · Revenue Projections</h1>
  ${revenueTable(M, 'base')}
  <h3>17.1 Base case revenue trajectory</h3>
  ${revenueChart(M)}
  <p>Year 5 base case is approximately <strong>$${M.pnl.base.y5NetRevenueUsdMn.toFixed(1)} M</strong>. For
  reference, Poppi reached ~$500 M in its sixth year. The base case is roughly 6% of that trajectory, which is
  appropriate for a market with lower ARPU, a smaller premium cohort and a 40% tax.</p>

  <h3>17.2 The two assumptions that decide the outcome</h3>
  <ol>
    <li><strong>Annual retention.</strong> At 34% in Year 1 the model works. At 25% it does not — LTV:CAC never clears 3× and the business needs a fourth round.</li>
    <li><strong>Cans per order.</strong> At 10 cans the ₹4.20 per-can D2C last-mile is absorbable. At 6 cans it is ₹8.40 and Year 1 gross margin drops below 50%. This is the entire reason the bundle builder enforces 12- and 24-can boxes.</li>
  </ol>

  <h3>17.3 Adoption curve</h3>
  ${adoptionTable(M)}
  <p class="chart-note">Year 5 penetration of ${M.adoption[4].penetrationOfBeachheadPct.toFixed(1)}% of the
  beachhead is aggressive for any consumer brand in five years, and is flagged as one of the model's most
  attackable assumptions. A more conservative 20–25% still supports a ₹150 Cr+ business.</p>
</div>

<div class="section">
  <h1>18 · Profitability — Three Scenarios</h1>
  ${scenarioHeadline(M)}

  <h3>18.1 Base case</h3>
  ${pnlTable(M, 'base')}
  ${ebitdaChart(M)}

  <h3>18.2 Conservative case</h3>
  ${pnlTable(M, 'conservative')}
  <p>This case assumes management <strong>responds</strong> to underperformance — slower hiring, deferred line
  investment, tighter G&amp;A. Opex peaks at ₹27 Cr rather than ₹68 Cr. A conservative case that keeps base-case
  spending is a strawman, not a downside.</p>
  <p>The honest read: this is a <strong>survivable business, not a venture outcome</strong>. ₹73 Cr of revenue and
  ₹4 Cr of EBITDA at Year 5 is a real company that would struggle to raise a Series B at a step-up.</p>

  <h3>18.3 Aggressive case</h3>
  ${pnlTable(M, 'aggressive')}

  <h3>18.4 What drives the turn to profit</h3>
  <p>Three things move together, and all three are required:</p>
  <ol>
    <li><strong>Gross margin ${M.pnl.base.years[0].grossMarginPct.toFixed(1)}% → ${M.pnl.base.years[4].grossMarginPct.toFixed(1)}%.</strong> The most reliable of the three — a procurement outcome, not a consumer one.</li>
    <li><strong>Marketing ${M.pnl.base.years[0].marketingPctOfRev.toFixed(0)}% → ${M.pnl.base.years[4].marketingPctOfRev.toFixed(0)}% of net revenue.</strong> The <em>least</em> reliable. It assumes brand equity and repeat carry the demand that paid media carried in Year 1. If marketing must stay at 30% in Year 5, EBITDA drops to roughly ₹30 Cr and margin halves.</li>
    <li><strong>Operating leverage.</strong> ₹68 Cr of opex on ₹267 Cr of revenue is 25% — lean but achievable for a brand that outsources manufacturing.</li>
  </ol>

  <h3>18.5 Sensitivities</h3>
  ${sensitivityTable()}
</div>

<div class="section">
  <h1>19 · Working Capital &amp; Funding Plan</h1>

  <h3>19.1 Capital requirement</h3>
  ${capitalTable(M)}
  <div class="callout info">
    <span class="label">A result worth pausing on</span>
    <p><strong>The aggressive case requires more capital than the base case</strong>
    (₹${M.pnl.aggressive.totalCapitalNeedCr.toFixed(1)} Cr against ₹${M.pnl.base.totalCapitalNeedCr.toFixed(1)} Cr)
    despite reaching profitability two years earlier. Growth consumes working capital: cans are manufactured,
    shipped and sit on shelves months before the cash returns.</p>
    <p>Any plan that treats "grow faster" as the answer to a funding gap has the sign wrong.</p>
  </div>

  <h3>19.2 Funding plan</h3>
  ${fundingTable(M)}
  <p>Total ₹210 Cr raised against a modelled capital need of ₹${M.pnl.base.totalCapitalNeedCr.toFixed(1)} Cr
  (base) to ₹${M.pnl.aggressive.totalCapitalNeedCr.toFixed(1)} Cr (aggressive). The surplus funds national
  distribution build-out — <strong>a growth choice, not a survival requirement.</strong> The business does not
  need Series B to survive; it needs it to win.</p>

  <h3>19.3 Use of seed proceeds</h3>
  <table>
    <thead><tr><th style="width:40%">Application</th><th class="num" style="width:16%">₹ Cr</th><th>Note</th></tr></thead>
    <tbody>
      <tr><td>Inventory and first production runs</td><td class="num">2.8</td><td>3 SKUs, committed volume to secure conversion pricing</td></tr>
      <tr><td>Marketing and customer acquisition</td><td class="num">3.0</td><td>Two cities, D2C and quick commerce</td></tr>
      <tr><td>Team — distribution, formulation, ops</td><td class="num">2.4</td><td>The distribution hire is the priority</td></tr>
      <tr><td>Retail entry and trade spend</td><td class="num">0.9</td><td>Modern trade listings, shelf support</td></tr>
      <tr><td>Compliance, testing, shelf-life validation</td><td class="num">0.4</td><td>FSSAI, lab, stability studies</td></tr>
      <tr><td>Technology and working capital buffer</td><td class="num">0.5</td><td></td></tr>
      <tr class="tot"><td><strong>Total</strong></td><td class="num"><strong>10.0</strong></td><td></td></tr>
    </tbody>
  </table>
</div>

<div class="section">
  <h1>20 · Cap Table &amp; Investor Returns</h1>

  <h3>20.1 Cap table evolution</h3>
  ${capTableTable(M)}
  <p>Founders retain <strong>${M.returns.base.founderPct.toFixed(1)}%</strong> through Series B — healthy by
  Indian consumer standards and sufficient to keep the team motivated across a seven-year hold. The ESOP pool is
  refreshed 2% at each institutional round.</p>

  <h3>20.2 Exit assumption</h3>
  <p>Year 7 exit at <strong>3.9× revenue</strong>. This is not a chosen multiple — it is the multiple PepsiCo
  actually paid for Poppi ($1.95 bn cash plus $0.2 bn contingent against ~$500 m of 2024 revenue), as disclosed
  in its Form 10-Q. Using a strategic acquirer's disclosed multiple for the same category is considerably more
  defensible than a constructed comparable set.</p>
  ${exitTable(M)}

  <h3>20.3 Returns by round</h3>
  ${returnsTables(M)}

  <div class="callout warn">
    <span class="label">The asymmetry is the risk profile of this deal</span>
    <p>Seed returns <strong>${M.returns.conservative.rows[0].moic.toFixed(1)}×</strong> even in the conservative
    case. Series B returns <strong>${M.returns.conservative.rows[2].moic.toFixed(1)}×</strong> in that same case —
    barely capital back, after three years, with no liquidity. Late money in this business is a bet that growth
    continues exactly as modelled; early money is protected by entry price.</p>
    <p>Any Series B investor should price protective terms accordingly, and any founder should understand that the
    ₹1,050 Cr post-money is only defensible if Year 4 lands near base case.</p>
  </div>

  <h3>20.4 Probability-weighted seed return</h3>
  <p>Every deck shows the success case. This is the number a seed partner is actually underwriting.</p>
  ${probTable(M)}
  <p>A 55% failure weighting is deliberately harsh and appropriate for a pre-revenue consumer brand facing a
  funded incumbent. Even so, the expected return clears the bar for a seed consumer fund, because the entry price
  is low relative to the category's demonstrated exit values.</p>
  <p><strong>What the weighting hides:</strong> 55% of the time this returns nothing. The fund mathematics works
  because of portfolio construction, not because this particular company is likely to succeed. An honest
  presentation says that out loud.</p>

  <h3>20.5 What breaks the return</h3>
  ${returnSensitivity()}
  <p>The most sensitive variable is not revenue — it is <strong>seed entry price</strong>. A ₹50 Cr post-money is
  the difference between a fund-returning position and a merely good one.</p>
</div>
`;
}

/* ── tables ─────────────────────────────────────────────────── */

function bomTable(M) {
  const y1 = M.costBreakdown.y1, y5 = M.costBreakdown.y5;
  const labels = {
    canBody: 'Can body (printed 250 ml sleek)', ingredientsBase: 'Flavour base, acidulants, salt, sweetener',
    conversion: 'Conversion / co-packer tolling', prebioticFibre: 'Prebiotic fibre (7 g)',
    secondaryPack: 'Secondary packaging (shrink, divider, carton)', canEnd: 'Can end',
    waterCo2: 'Water and CO₂',
  };
  const order = ['canBody', 'ingredientsBase', 'conversion', 'prebioticFibre', 'secondaryPack', 'canEnd', 'waterCo2'];
  const t1 = order.reduce((s, k) => s + y1[k], 0);
  const t5 = order.reduce((s, k) => s + y5[k], 0);
  return `<table>
    <thead><tr><th>Component</th><th class="num">Year 1</th><th class="num">Year 5</th><th class="num">% of Y1 COGS</th><th class="num">Δ</th></tr></thead>
    <tbody>
      ${order.map((k) => `<tr><td>${labels[k]}</td><td class="num">₹${y1[k].toFixed(2)}</td>
        <td class="num">₹${y5[k].toFixed(2)}</td><td class="num">${((y1[k] / t1) * 100).toFixed(1)}%</td>
        <td class="num">−${(((y1[k] - y5[k]) / y1[k]) * 100).toFixed(0)}%</td></tr>`).join('')}
      <tr class="tot"><td><strong>Total COGS</strong></td><td class="num"><strong>₹${t1.toFixed(2)}</strong></td>
        <td class="num"><strong>₹${t5.toFixed(2)}</strong></td><td class="num">100%</td>
        <td class="num"><strong>−${(((t1 - t5) / t1) * 100).toFixed(0)}%</strong></td></tr>
    </tbody>
  </table>`;
}

function wcTable(M) {
  return `<table>
    <thead><tr><th>Scenario</th><th class="num">Peak operating burn</th><th class="num">Peak working capital</th><th class="num">Total capital need</th></tr></thead>
    <tbody>${['conservative', 'base', 'aggressive'].map((k) => {
      const p = M.pnl[k];
      return `<tr><td><strong>${p.scenario}</strong></td>
        <td class="num">₹${Math.abs(p.peakCumulativeBurnCr).toFixed(2)} Cr</td>
        <td class="num">₹${p.peakWorkingCapitalCr.toFixed(2)} Cr</td>
        <td class="num"><strong>₹${p.totalCapitalNeedCr.toFixed(2)} Cr</strong></td></tr>`;
    }).join('')}</tbody>
  </table>`;
}

function gstImpact(M) {
  const c = M.channels[0];
  return `<div class="stats">
    <div class="stat"><span class="v">${(M.tax.carbonatedGst * 100).toFixed(0)}%</span><span class="l">GST on aerated sweetened beverages <span class="tag v">V</span></span></div>
    <div class="stat"><span class="v">₹${c.gst.toFixed(2)}</span><span class="l">Tax per ₹130 can — 29% of shelf price</span></div>
    <div class="stat"><span class="v">${(M.tax.stillBeverageGst * 100).toFixed(0)}%</span><span class="l">GST on non-carbonated fruit-based drinks <span class="tag v">V</span></span></div>
    <div class="stat"><span class="v">35 pt</span><span class="l">The arbitrage between the two slabs</span></div>
  </div>`;
}

function claimsTable() {
  const rows = [
    ['"7 g prebiotic fibre per 250 ml can"', 'Approved', 'Composition claim. Batch-verified; must match the panel exactly'],
    ['"4 g added sugar"', 'Approved', 'Per flavour; never stated as a range'],
    ['"No caffeine" / "0 mg caffeine"', 'Approved', 'True across all ten SKUs'],
    ['"No artificial colours"', 'Approved', 'Formulation fact'],
    ['"Inulin reaches the colon intact"', 'Approved', 'Definitional, not an outcome claim'],
    ['"−75% sugar vs. regular soda"', 'Conditional', 'Basis must be visible on the same screen; comparator is a category typical, not a named brand'],
    ['"Low sugar"', 'Conditional', 'Only where the flavour meets the regulatory threshold; not a blanket brand claim'],
    ['"Amla is rich in vitamin C"', 'Conditional', 'True of the ingredient; must not imply the finished product is a vitamin C source'],
    ['"Supports gut health"', '<strong>Prohibited</strong>', 'Health claim, unsubstantiated'],
    ['"Improves digestion"', '<strong>Prohibited</strong>', 'Health claim'],
    ['"Boosts immunity"', '<strong>Prohibited</strong>', 'Health claim; heavily scrutinised'],
    ['"Aids weight loss"', '<strong>Prohibited</strong>', 'Health and disease-risk-reduction claim'],
    ['"Healthy" (unqualified, of the product)', '<strong>Prohibited</strong>', 'Implied general health claim'],
    ['"Suitable for diabetics"', '<strong>Prohibited</strong>', 'Medical claim; the FAQ explicitly declines it'],
  ];
  return `<table class="compact">
    <thead><tr><th style="width:34%">Claim</th><th style="width:14%">Status</th><th>Condition</th></tr></thead>
    <tbody>${rows.map(([c, s, n]) => `<tr><td>${c}</td><td>${s}</td><td>${n}</td></tr>`).join('')}</tbody>
  </table>`;
}

function channelTable(M) {
  return `<table>
    <thead><tr><th>Channel</th><th class="num">MRP</th><th class="num">GST</th><th class="num">Ex-GST</th>
      <th class="num">Trade + platform</th><th class="num">Freight</th><th class="num">Net to brand</th><th class="num">% of MRP</th></tr></thead>
    <tbody>${M.channels.map((c) => `<tr>
      <td><strong>${c.channel}</strong></td><td class="num">₹${c.mrp}</td>
      <td class="num">−₹${c.gst.toFixed(2)}</td><td class="num">₹${c.exGst.toFixed(2)}</td>
      <td class="num">−₹${c.tradeAndPlatform.toFixed(2)}</td><td class="num">−₹${c.logistics.toFixed(2)}</td>
      <td class="num"><strong>₹${c.netToBrand.toFixed(2)}</strong></td>
      <td class="num">${c.netAsPctOfMrp.toFixed(1)}%</td></tr>`).join('')}</tbody>
  </table>`;
}

function channelMixTable(M) {
  const keys = ['d2c', 'qcommerce', 'modernTrade', 'generalTrade', 'horeca'];
  const labels = ['D2C', 'Quick commerce', 'Modern trade', 'General trade', 'HoReCa'];
  return `<table class="compact">
    <thead><tr><th>Channel</th>${[1, 2, 3, 4, 5].map((y) => `<th class="num">Year ${y}</th>`).join('')}</tr></thead>
    <tbody>${keys.map((k, i) => `<tr><td><strong>${labels[i]}</strong></td>
      ${M.marketRefs ? '' : ''}${[0, 1, 2, 3, 4].map((y) => `<td class="num">${(MIX[y][k] * 100).toFixed(0)}%</td>`).join('')}
    </tr>`).join('')}</tbody>
  </table>`;
}
const MIX = [
  { d2c: 0.60, qcommerce: 0.30, modernTrade: 0.10, generalTrade: 0.00, horeca: 0.00 },
  { d2c: 0.42, qcommerce: 0.38, modernTrade: 0.15, generalTrade: 0.00, horeca: 0.05 },
  { d2c: 0.30, qcommerce: 0.40, modernTrade: 0.20, generalTrade: 0.05, horeca: 0.05 },
  { d2c: 0.24, qcommerce: 0.40, modernTrade: 0.22, generalTrade: 0.09, horeca: 0.05 },
  { d2c: 0.20, qcommerce: 0.38, modernTrade: 0.24, generalTrade: 0.13, horeca: 0.05 },
];

function unitByYearTable(M) {
  return `<table>
    <thead><tr><th>Year</th><th class="num">Blended net realisation</th><th class="num">COGS</th>
      <th class="num">Contribution</th><th class="num">Gross margin</th><th class="num">MRP → net leakage</th></tr></thead>
    <tbody>${M.unitEconomics.can250.map((u, i) => `<tr>
      <td><strong>Y${i + 1}</strong></td><td class="num">₹${u.blendedNetRealisation.toFixed(2)}</td>
      <td class="num">₹${u.cogs.toFixed(2)}</td><td class="num"><strong>₹${u.contributionPerCan.toFixed(2)}</strong></td>
      <td class="num">${u.grossMarginPct.toFixed(1)}%</td><td class="num">${u.mrpToNetLeakagePct.toFixed(1)}%</td></tr>`).join('')}</tbody>
  </table>`;
}

function formatTable(M) {
  return `<table>
    <thead><tr><th>Format</th><th class="num">MRP</th><th class="num">GST/can</th><th class="num">Net to brand</th>
      <th class="num">COGS</th><th class="num">Contribution</th><th class="num">GM%</th></tr></thead>
    <tbody>${M.unitEconomics.byFormatY1.map((f) => `<tr>
      <td><strong>${f.format}</strong></td><td class="num">₹${f.mrp}</td><td class="num">₹${f.gstPerCan.toFixed(2)}</td>
      <td class="num">₹${f.blendedNetRealisation.toFixed(2)}</td><td class="num">₹${f.cogs.toFixed(2)}</td>
      <td class="num"><strong>₹${f.contributionPerCan.toFixed(2)}</strong></td>
      <td class="num">${f.grossMarginPct.toFixed(1)}%</td></tr>`).join('')}</tbody>
  </table>
  <p class="chart-note">Year 1 costs. Larger formats carry marginally better margin because fibre and liquid scale with volume while the can end, label and conversion are near-fixed.</p>`;
}

function mvpTable(M) {
  return `<table>
    <thead><tr><th>Format</th><th class="num">Planned MRP</th><th class="num">Net required</th>
      <th class="num">Minimum viable MRP</th><th class="num">Headroom</th></tr></thead>
    <tbody>${M.unitEconomics.minimumViablePrice.map((m) => `<tr>
      <td><strong>${m.format}</strong></td><td class="num">₹${m.currentMrp}</td>
      <td class="num">₹${m.requiredNet.toFixed(2)}</td>
      <td class="num"><strong>₹${m.minimumViableMrp.toFixed(2)}</strong></td>
      <td class="num">${(((m.currentMrp - m.minimumViableMrp) / m.currentMrp) * 100).toFixed(1)}%</td></tr>`).join('')}</tbody>
  </table>`;
}

function ltvTable(M) {
  return `<table>
    <thead><tr><th>Year</th><th class="num">CAC</th><th class="num">Y1 contribution</th>
      <th class="num">3-yr LTV</th><th class="num">LTV:CAC</th><th class="num">Payback</th><th class="num">Retention</th></tr></thead>
    <tbody>${M.ltv.base.map((r, i) => `<tr>
      <td><strong>Y${r.year}</strong></td><td class="num">₹${r.cac.toLocaleString('en-IN')}</td>
      <td class="num">₹${r.year1Contribution.toLocaleString('en-IN')}</td>
      <td class="num">₹${r.threeYearLtv.toLocaleString('en-IN')}</td>
      <td class="num"><strong style="color:${r.ltvToCac >= 3 ? '#1A8F69' : '#BC4104'}">${r.ltvToCac.toFixed(1)}×</strong></td>
      <td class="num">${r.paybackMonths.toFixed(0)} mo</td>
      <td class="num">${M.pnl.base.years[i].retentionPct.toFixed(0)}%</td></tr>`).join('')}</tbody>
  </table>`;
}

function revenueTable(M, k) {
  const p = M.pnl[k];
  return `<table>
    <thead><tr><th>Year</th><th class="num">Customers</th><th class="num">% of beachhead</th>
      <th class="num">Cans</th><th class="num">ARPU</th><th class="num">Net revenue</th></tr></thead>
    <tbody>${p.years.map((y, i) => `<tr>
      <td><strong>Y${y.year}</strong></td><td class="num">${y.customers.toLocaleString('en-IN')}</td>
      <td class="num">${M.adoption[i].penetrationOfBeachheadPct.toFixed(1)}%</td>
      <td class="num">${(y.cans / 1e6).toFixed(2)} M</td>
      <td class="num">₹${y.arpu.toLocaleString('en-IN')}</td>
      <td class="num"><strong>₹${y.netRevenueCr.toFixed(2)} Cr</strong></td></tr>`).join('')}</tbody>
  </table>`;
}

function revenueChart(M) {
  const max = M.pnl.aggressive.years[4].netRevenueCr;
  let out = '<div class="chart">';
  for (const k of ['conservative', 'base', 'aggressive']) {
    const p = M.pnl[k];
    out += `<h4>${p.scenario}</h4>`;
    out += p.years.map((y) => barRow(`Year ${y.year}`, y.netRevenueCr, max,
      `₹${y.netRevenueCr.toFixed(1)} Cr`, k === 'base' ? '' : 'ctx')).join('');
  }
  out += `<p class="chart-note">All three scenarios on a common scale (max ₹${max.toFixed(0)} Cr). Base case highlighted.</p></div>`;
  return out;
}

function adoptionTable(M) {
  return `<table>
    <thead><tr><th>Year</th><th class="num">Customers</th><th class="num">Penetration of beachhead</th><th>Adopter band</th></tr></thead>
    <tbody>${M.adoption.map((a) => `<tr><td><strong>Y${a.year}</strong></td>
      <td class="num">${a.customers.toLocaleString('en-IN')}</td>
      <td class="num">${a.penetrationOfBeachheadPct.toFixed(2)}%</td><td>${a.adopterBand}</td></tr>`).join('')}</tbody>
  </table>`;
}

function scenarioHeadline(M) {
  return `<div class="stats">${['conservative', 'base', 'aggressive'].map((k) => {
    const p = M.pnl[k];
    return `<div class="stat"><span class="v">₹${p.years[4].netRevenueCr.toFixed(0)} Cr</span>
      <span class="l"><strong>${p.scenario}</strong> · Y5 revenue · EBITDA+ Year ${p.ebitdaPositiveYear} · ${p.years[4].ebitdaMarginPct.toFixed(1)}% margin</span></div>`;
  }).join('')}</div>`;
}

function pnlTable(M, k) {
  const p = M.pnl[k];
  return `<table>
    <thead><tr><th>Year</th><th class="num">Net revenue</th><th class="num">Gross profit</th><th class="num">GM%</th>
      <th class="num">Marketing</th><th class="num">Opex</th><th class="num">EBITDA</th>
      <th class="num">EBITDA%</th><th class="num">Net profit</th></tr></thead>
    <tbody>${p.years.map((y) => `<tr>
      <td><strong>Y${y.year}</strong></td><td class="num">₹${y.netRevenueCr.toFixed(2)}</td>
      <td class="num">₹${y.grossProfitCr.toFixed(2)}</td><td class="num">${y.grossMarginPct.toFixed(1)}%</td>
      <td class="num">₹${y.marketingCr.toFixed(2)}</td><td class="num">₹${y.opexCr.toFixed(2)}</td>
      <td class="num"><strong style="color:${y.ebitdaCr >= 0 ? '#1A8F69' : '#BC4104'}">${money(y.ebitdaCr)}</strong></td>
      <td class="num">${pctSigned(y.ebitdaMarginPct)}</td>
      <td class="num">${money(y.netProfitCr)}</td></tr>`).join('')}</tbody>
  </table>
  <p class="chart-note">All figures ₹ Cr. Depreciation ₹1.0 Cr (Y1–Y3) and ₹3.5 Cr (Y4–Y5); tax at 25% on positive EBIT.</p>`;
}

function ebitdaChart(M) {
  const ys = M.pnl.base.years;
  const scale = 26 / 65; // mm per ₹Cr
  return `<div class="col-chart">${ys.map((y) => {
    const h = Math.min(Math.abs(y.ebitdaCr) * scale, 25).toFixed(1);
    const pos = y.ebitdaCr >= 0;
    return `<div class="col">
      <div class="col-top">${pos ? `<div class="col-cap">+₹${y.ebitdaCr.toFixed(1)}</div><div class="col-bar" style="height:${h}mm"></div>` : ''}</div>
      <div class="col-zero"></div>
      <div class="col-bot">${!pos ? `<div class="col-bar neg" style="height:${h}mm"></div><div class="col-cap neg">−₹${Math.abs(y.ebitdaCr).toFixed(1)}</div>` : ''}
        <div class="col-lab">Year ${y.year}</div></div>
    </div>`;
  }).join('')}</div>
  <p class="chart-note">EBITDA, ₹ Cr, base case. Losses through Year 3 are modest relative to the Year 5 result — that asymmetry is the shape of the investment.</p>`;
}

function sensitivityTable() {
  const rows = [
    ['Retention falls 34% → 25% in Year 1', 'Materially negative', 'Customer base compounds far slower; requires a fourth round'],
    ['Marketing stays at 30% of revenue in Year 5', '~₹30 Cr EBITDA', 'Margin halves to roughly 11%'],
    ['COGS stalls at ₹28 (no scale benefit)', '~₹43 Cr EBITDA', '−₹19 Cr; still profitable'],
    ['Cans per order falls 11.5 → 8', 'Materially negative', 'D2C last-mile per can rises ~44%'],
    ['MRP cut to ₹110', 'Negative', 'Only 11% headroom above the ₹115.89 viability floor'],
    ['Quick commerce commission rises 25% → 32%', 'Negative', '~40% of volume by Y3 is exposed'],
  ];
  return `<table>
    <thead><tr><th style="width:36%">Change from base case</th><th style="width:22%">Year 5 EBITDA</th><th>Effect</th></tr></thead>
    <tbody>${rows.map(([c, e, n]) => `<tr><td>${c}</td><td><strong>${e}</strong></td><td>${n}</td></tr>`).join('')}</tbody>
  </table>`;
}

function capitalTable(M) { return wcTable(M); }

function fundingTable(M) {
  const rows = [
    ['Seed', 'Year 0', 10, 50, '20.0%', '2-city launch, 3 SKUs, D2C and quick commerce, first production runs'],
    ['Series A', 'End Year 2', 50, 250, '20.0%', '5-city expansion, modern trade entry, full range'],
    ['Series B', 'End Year 4', 150, 1050, '14.0%', 'National distribution, still-beverage line, own capacity'],
  ];
  return `<table>
    <thead><tr><th>Round</th><th>Timing</th><th class="num">Raise</th><th class="num">Post-money</th>
      <th class="num">Dilution</th><th>Purpose</th></tr></thead>
    <tbody>${rows.map(([n, t, r, p, d, u]) => `<tr><td><strong>${n}</strong></td><td>${t}</td>
      <td class="num">₹${r} Cr</td><td class="num">₹${p} Cr</td><td class="num">${d}</td><td>${u}</td></tr>`).join('')}</tbody>
  </table>`;
}

function capTableTable(M) {
  const stages = M.capTable.filter((s) => s.stage !== 'Founding');
  const get = (s, n) => { const r = s.rows.find((x) => x.name === n); return r ? `${r.pct.toFixed(1)}%` : '—'; };
  return `<table>
    <thead><tr><th>Stage</th><th class="num">Raise</th><th class="num">Post-money</th><th class="num">Founders</th>
      <th class="num">ESOP</th><th class="num">Seed</th><th class="num">Series A</th><th class="num">Series B</th></tr></thead>
    <tbody>${stages.map((s) => `<tr><td><strong>${s.stage}</strong></td>
      <td class="num">${s.raiseCr ? '₹' + s.raiseCr + ' Cr' : '—'}</td>
      <td class="num">${s.postMoneyCr ? '₹' + s.postMoneyCr + ' Cr' : '—'}</td>
      <td class="num"><strong>${s.founders.toFixed(1)}%</strong></td><td class="num">${s.esop.toFixed(1)}%</td>
      <td class="num">${get(s, 'Seed')}</td><td class="num">${get(s, 'Series A')}</td>
      <td class="num">${get(s, 'Series B')}</td></tr>`).join('')}</tbody>
  </table>`;
}

function exitTable(M) {
  return `<table>
    <thead><tr><th>Scenario</th><th class="num">Year 7 revenue</th><th class="num">Multiple</th>
      <th class="num">Exit value</th><th class="num">USD</th></tr></thead>
    <tbody>${['conservative', 'base', 'aggressive'].map((k) => {
      const r = M.returns[k];
      return `<tr><td><strong>${M.pnl[k].scenario}</strong></td><td class="num">₹${r.y7RevenueCr} Cr</td>
        <td class="num">${r.exitMultiple}×</td><td class="num"><strong>₹${r.exitValueCr.toFixed(0)} Cr</strong></td>
        <td class="num">$${r.exitValueUsdMn.toFixed(0)} M</td></tr>`;
    }).join('')}</tbody>
  </table>`;
}

function returnsTables(M) {
  return ['base', 'conservative', 'aggressive'].map((k) => {
    const r = M.returns[k];
    return `<h4>${M.pnl[k].scenario} case — exit ₹${r.exitValueCr.toFixed(0)} Cr</h4>
    <table class="compact">
      <thead><tr><th>Round</th><th class="num">Invested</th><th class="num">Entry post-money</th>
        <th class="num">Final ownership</th><th class="num">Exit proceeds</th><th class="num">MOIC</th><th class="num">IRR</th></tr></thead>
      <tbody>${r.rows.map((x) => `<tr><td><strong>${x.round}</strong></td><td class="num">₹${x.investedCr} Cr</td>
        <td class="num">₹${x.entryPostMoneyCr} Cr</td><td class="num">${x.finalOwnershipPct.toFixed(1)}%</td>
        <td class="num">₹${x.exitProceedsCr.toFixed(0)} Cr</td>
        <td class="num"><strong>${x.moic.toFixed(1)}×</strong></td>
        <td class="num">${x.irrPct.toFixed(1)}%</td></tr>`).join('')}</tbody>
    </table>`;
  }).join('');
}

function probTable(M) {
  const pw = M.probabilityWeighted;
  return `<table>
    <thead><tr><th>Outcome</th><th class="num">Probability</th><th class="num">Seed proceeds</th>
      <th class="num">MOIC</th><th class="num">Weighted contribution</th></tr></thead>
    <tbody>${pw.outcomes.map((o) => `<tr><td><strong>${o.name}</strong></td>
      <td class="num">${o.probabilityPct.toFixed(0)}%</td><td class="num">₹${o.proceedsCr.toFixed(0)} Cr</td>
      <td class="num">${o.moic.toFixed(1)}×</td><td class="num">₹${o.weightedCr.toFixed(1)} Cr</td></tr>`).join('')}
      <tr class="tot"><td><strong>Expected value</strong></td><td class="num">100%</td>
        <td class="num"><strong>₹${pw.expectedProceedsCr.toFixed(1)} Cr</strong></td>
        <td class="num"><strong>${pw.expectedMoic.toFixed(1)}×</strong></td>
        <td class="num"><strong>${pw.expectedIrrPct.toFixed(1)}% IRR</strong></td></tr>
    </tbody>
  </table>`;
}

function returnSensitivity() {
  const rows = [
    ['Exit multiple 3.9× → 2.5×', '39.0× → 25.0× (base)', 'Still a strong seed outcome'],
    ['Year 7 revenue base → conservative', '39.0× → 15.9×', 'The scenario risk'],
    ['One additional ₹75 Cr round before exit', '39.0× → ~33×', '~15% further dilution'],
    ['Seed post-money ₹50 Cr → ₹80 Cr', '39.0× → ~24×', '<strong>Entry price is the single biggest lever</strong>'],
    ['Exit at Year 9 instead of Year 7', 'IRR 68.8% → ~52%', 'MOIC unchanged; time value lost'],
  ];
  return `<table>
    <thead><tr><th style="width:36%">Change</th><th style="width:26%">Effect on seed MOIC</th><th>Comment</th></tr></thead>
    <tbody>${rows.map(([c, e, n]) => `<tr><td>${c}</td><td><strong>${e}</strong></td><td>${n}</td></tr>`).join('')}</tbody>
  </table>`;
}
