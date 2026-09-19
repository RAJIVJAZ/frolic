/** DPR — Part II (business) and Part III (market & competition). */
import { partDivider } from './parts-a.mjs';

export function partB(M) {
  return `
${partDivider('Part II', 'The Business', 'What FROLIC makes, who would make it, and the brand system that has already been built.')}

<div class="section">
  <h1>3 · Promoter, Company &amp; Team</h1>

  <div class="callout warn">
    <span class="label">The largest gap in this report</span>
    <p><strong>No founder credentials are documented.</strong> For a consumer brand, investors back the operator
    before the idea — and nothing in the material underlying this report establishes who is building FROLIC or
    what they have built before. This is not a presentational problem that better writing can fix. It is the
    single highest-leverage addition available, worth more than any improvement to the projections.</p>
  </div>

  <h3>3.1 Proposed structure</h3>
  <table>
    <tbody>
      <tr><td style="width:36%"><strong>Entity</strong></td><td>Frolic Beverages Pvt. Ltd. — private limited company, to be incorporated</td></tr>
      <tr><td><strong>Registered office</strong></td><td>Pune, Maharashtra</td></tr>
      <tr><td><strong>Tax election</strong></td><td>Section 115BAA concessional regime — 25% effective corporate rate</td></tr>
      <tr><td><strong>ESOP pool</strong></td><td>10% at seed, refreshed 2% at each institutional round</td></tr>
    </tbody>
  </table>

  <h3>3.2 Capability required before the seed round</h3>
  <p>Four capabilities determine whether this project executes. Two are demonstrated by the work already done;
  two are not evidenced at all.</p>

  <table>
    <thead><tr><th style="width:26%">Capability</th><th style="width:12%">Status</th><th>Why it is decisive</th></tr></thead>
    <tbody>
      <tr><td><strong>Brand building</strong></td><td><span class="tag v">Shown</span></td>
        <td>A complete, original design system, ten flavour worlds and a functioning storefront exist. This is credible evidence of capability.</td></tr>
      <tr><td><strong>Financial rigour</strong></td><td><span class="tag v">Shown</span></td>
        <td>A generated, assumption-tagged model that surfaces its own weaknesses rather than hiding them.</td></tr>
      <tr><td><strong>Beverage formulation</strong></td><td><span class="tag e">Unevidenced</span></td>
        <td>Suspending 7 g of fibre in a clear, stable, carbonated liquid is a genuine technical problem. Requires an in-house food technologist or a named consulting formulator with a track record.</td></tr>
      <tr><td><strong>FMCG distribution</strong></td><td><span class="tag e">Unevidenced</span></td>
        <td>Nobody builds Indian beverage distribution from a cold start. A co-founder or first hire from a beverage or FMCG sales organisation is a prerequisite, not a nice-to-have.</td></tr>
    </tbody>
  </table>

  <p><strong>Recommendation:</strong> close the distribution gap before raising the institutional seed. A named
  operator with regional distributor relationships changes the risk profile of this project more than any
  additional month of model refinement.</p>
</div>

<div class="section">
  <h1>4 · Product &amp; Formulation</h1>

  <h3>4.1 What the product is</h3>
  <p>A carbonated soft drink in a 250&nbsp;ml sleek aluminium can, containing 7&nbsp;g of prebiotic fibre and
  between 2&nbsp;g and 5&nbsp;g of added sugar depending on flavour. Caffeine-free across the entire range.
  Shelf-stable at ambient temperature for a target 12 months.</p>

  <p>The functional premise rests on <strong>prebiotic fibre</strong>, not live cultures. A prebiotic is defined
  by what happens to it rather than what it is made of: it must resist digestion in the upper gut, be fermentable
  by colonic micro-organisms, and selectively favour some of them. Inulin — the fibre in chicory root — satisfies
  all three, because its fructose units are joined by bonds human enzymes cannot cleave.</p>

  <div class="callout good">
    <span class="label">A structural advantage over probiotic competitors</span>
    <p>Because FROLIC contains no live cultures, it is <strong>shelf-stable and requires no cold chain</strong>.
    It survives carbonation, canning, and a warm delivery van. Probiotic products carry refrigeration requirements
    and short shelf lives that make national distribution in India materially harder and more expensive.</p>
  </div>

  <h3>4.2 The fibre blend</h3>
  <p>A 60:40 ratio of chicory inulin to acacia gum, delivering 7&nbsp;g per can. Single-source fibre is simpler;
  a blend performs better. Inulin ferments relatively quickly, acacia gum slowly and further along the colon.
  Running them together spreads fermentation out, which in practice means materially better tolerance for
  consumers who are not used to a high-fibre drink.</p>

  <p>This matters commercially as well as physiologically. Any meaningful increase in fibre intake can cause
  temporary bloating, and a poor first week is how a consumer concludes that fibre is not for them. The blend,
  and the explicit "introduce gradually" advisory on pack, are both retention measures.</p>

  <h3>4.3 The formulation problem</h3>
  <p>Putting 7&nbsp;g of fibre into a clear carbonated liquid is the technical barrier that has kept this category
  small. Inulin clouds the liquid and drops out of suspension under carbonation; acacia adds body that is unwanted
  in citrus formulations; carbonation strips the volatile aromatics that make fresh ginger and lime rind taste
  fresh rather than flat.</p>

  <p>The mitigations are cold-pressing and cold-holding aromatic fractions, adding them late in the process, and
  the 60:40 blend ratio. <strong>None of this has been validated by a production run.</strong> Every cost and
  stability figure in this report is an estimate until one is completed.</p>

  <h3>4.4 Where FROLIC is and is not differentiated</h3>
  <div class="two-col">
    <div>
      <h4>Genuinely differentiated</h4>
      <ul>
        <li><strong>Flavour portfolio</strong> — ten SKUs from regional Indian drinking culture. A foreign entrant cannot manufacture this; an Indian incumbent could, but has not.</li>
        <li><strong>Brand craft</strong> — materially ahead of the category.</li>
        <li><strong>Seasonal sourcing</strong> — jamun and kokum are hard to secure at scale, which is a barrier to fast followers.</li>
        <li><strong>Direct relationship</strong> — subscription and rewards built from day one.</li>
      </ul>
    </div>
    <div>
      <h4>Not differentiated</h4>
      <ul>
        <li><strong>The fibre specification</strong> — 7 g / 4 g is table stakes and already matched by Misfits.</li>
        <li><strong>The format</strong> — 250 ml sleek can is category standard.</li>
        <li><strong>The health claim</strong> — weaker than the incumbent's zero-added-sugar position.</li>
        <li><strong>Anything operational</strong> — no plant, no distribution, no supply advantage.</li>
      </ul>
    </div>
  </div>
</div>

<div class="section">
  <h1>5 · Product Range — Ten SKUs</h1>
  <p>Each flavour is built around a drink that already exists somewhere in India — a roadside cart, a coastal
  kitchen, a summer ritual. The commercial logic is that taste memory is the one thing a multinational cannot
  synthesise quickly.</p>
  ${skuTable(M)}
  <div class="callout">
    <span class="label">Launch-range recommendation</span>
    <p><strong>Launch with three SKUs, not ten.</strong> Typical Indian co-packer minimum order quantities run
    30,000–50,000 cans per SKU per run. Ten SKUs at launch is an inventory and working-capital burden a
    pre-revenue brand cannot carry, and any experienced consumer investor will say so. Recommended launch set:
    <strong>Nimbu Masala Fizz, Ginger Lime Lift and Jamun Pop</strong> — one savoury-citrus, one low-sugar
    workhorse, one distinctive colour-led SKU. Expand on demonstrated velocity.</p>
  </div>
</div>

<div class="section">
  <h1>6 · Brand &amp; Design System</h1>
  <p>The brand system is complete and is the most developed asset the project currently holds. It is original
  throughout — name, positioning, palette, typography, flavour worlds, copy and illustration approach were all
  created for this project, and no third-party brand assets are reproduced.</p>

  <h3>6.1 Colour</h3>
  <p>Five brand primaries, each shipping as a 50–900 ramp, plus a neutral set. A rule enforced across the system:
  <strong>the 400-level brand hue is for large areas, never for text or data marks</strong>. Electric Lime at
  #B8F135 measures 1.32:1 against the cream page surface — correct on a can, unreadable as a chart bar.</p>

  <table class="compact">
    <thead><tr><th>Token</th><th>Hex</th><th>Role</th></tr></thead>
    <tbody>
      <tr><td><span class="swatch" style="background:#B8F135"></span>Electric Lime</td><td>#B8F135</td><td>Signature. Hero accent, primary flavour world, active states</td></tr>
      <tr><td><span class="swatch" style="background:#FF6A1A"></span>Deep Orange</td><td>#FF6A1A</td><td>Energy. Orange Masala world</td></tr>
      <tr><td><span class="swatch" style="background:#6B2E8F"></span>Berry Purple</td><td>#6B2E8F</td><td>Depth. Jamun and Kala Khatta worlds</td></tr>
      <tr><td><span class="swatch" style="background:#FFD029"></span>Sunshine Yellow</td><td>#FFD029</td><td>Warmth. Aam Panna world</td></tr>
      <tr><td><span class="swatch" style="background:#3FD9A4"></span>Fresh Mint</td><td>#3FD9A4</td><td>Trust. Verified badges, savings, free-shipping unlock</td></tr>
      <tr><td><span class="swatch" style="background:#FFFDF7;border:0.4pt solid #ccc"></span>Cream White</td><td>#FFFDF7</td><td>Page surface</td></tr>
      <tr><td><span class="swatch" style="background:#F6EFE2"></span>Warm Ivory</td><td>#F6EFE2</td><td>Alternating section surface</td></tr>
      <tr><td><span class="swatch" style="background:#14110F"></span>Charcoal Black</td><td>#14110F</td><td>Body text, primary buttons, dark sections</td></tr>
    </tbody>
  </table>

  <h3>6.2 The flavour world system</h3>
  <p>The mechanism that lets one component set serve ten products. Each product declares four values — a base
  hue, a deep shade, a page wash and a guaranteed-legible ink — which are applied as CSS custom properties. Any
  part of the interface can adopt a world independently: a product card, a carousel slide and a whole page each
  re-skin without affecting each other. <strong>Adding a flavour is one data entry; the shop, quiz, carousel,
  bundle builder, sitemap, structured data and 3D can label all update automatically.</strong></p>

  <h3>6.3 Typography</h3>
  <table class="compact">
    <thead><tr><th style="width:18%">Role</th><th style="width:26%">Family</th><th>Rationale</th></tr></thead>
    <tbody>
      <tr><td>Display</td><td>Bricolage Grotesque</td><td>High contrast, slightly irregular — carries the personality in headlines</td></tr>
      <tr><td>Sans</td><td>Inter</td><td>Chosen for tabular figures, which nutrition panels and price rows depend on</td></tr>
      <tr><td>Mono</td><td>JetBrains Mono</td><td>Eyebrows, badges, data labels</td></tr>
    </tbody>
  </table>
  <p>All three are self-hosted, so there is no render-blocking request to a font CDN and no layout shift on swap.
  The type scale is fluid — every step is a <span class="sans">clamp()</span> — so there are no type-only
  breakpoints and typography cannot break at an untested viewport width.</p>

  <h3>6.4 Accessibility contract</h3>
  <ul>
    <li>Body text at or above 4.5:1 contrast; large text and UI boundaries at or above 3:1.</li>
    <li>Touch targets at or above 44 × 44 px throughout.</li>
    <li><span class="sans">prefers-reduced-motion</span> honoured globally and per component — 3D assets are not merely frozen, they are never fetched.</li>
    <li>Charts are never colour-alone: every mark is directly labelled and a table view is available.</li>
    <li>Nutrition data is marked up as a real table with row headers, so assistive technology announces which value belongs to which nutrient.</li>
  </ul>
</div>

${partDivider('Part III', 'Market & Competition', 'Who the customer is, why the category is open now, who is already in it, and what can actually be defended.')}

<div class="section">
  <h1>7 · Market Analysis</h1>

  <h3>7.1 Category context</h3>
  <table>
    <thead><tr><th style="width:20%">Category</th><th style="width:20%">Scale in India</th><th style="width:14%">Price / 250 ml</th><th>Position</th></tr></thead>
    <tbody>
      <tr><td><strong>Traditional soft drinks</strong></td><td>Dominant, decades of penetration</td><td>₹20–40</td><td>Actively negative health perception</td></tr>
      <tr><td><strong>Functional beverages</strong></td><td>USD 4.2–8.3 bn <span class="tag v">V</span></td><td>₹40–150</td><td>Positive but fragmented; no category owner</td></tr>
      <tr><td><strong>Energy drinks</strong></td><td>Established, urban-skewed</td><td>₹110–125</td><td>Caffeine-led; distribution locked by Red Bull and Sting</td></tr>
      <tr><td><strong>Gut health drinks</strong></td><td>Small, fastest-growing sub-segment</td><td>₹30–60</td><td>Dairy-led (Yakult); never translated to the soda occasion</td></tr>
      <tr><td><strong>Kombucha</strong></td><td>Niche, metro-only, stalled</td><td>₹150–250</td><td>Positive but an acquired taste at a difficult price</td></tr>
      <tr><td><strong>Prebiotic soda</strong></td><td>~USD 12.6 m (2025) <span class="tag v">V</span></td><td>₹75–130</td><td>Two sub-scale entrants; no national distribution</td></tr>
    </tbody>
  </table>
  <p>The prebiotic soda line is the significant one. At approximately $12.6&nbsp;m it is roughly
  <strong>0.2% of the functional beverage market it sits inside</strong>. In the United States the equivalent
  sub-category went from nothing to two brands worth a combined ~$3.8&nbsp;bn in seven years.</p>

  <h3>7.2 Bottom-up market sizing</h3>
  <p>A "0.5% of an $8&nbsp;bn market" projection assumes its own conclusion. This model builds from people.</p>
  ${marketFunnel(M)}
  <p><strong>${M.market.premiumBeverageBuyersMn.toFixed(2)} million people.</strong> Not 1.4 billion, not "urban
  India". This is the population FROLIC must win before national expansion is a meaningful question, and every
  customer figure in this report is expressed as a percentage of it.</p>

  <div class="callout info">
    <span class="label">The comparison set that matters</span>
    <p>FROLIC's competition is not Coca-Cola. At ₹130 with a 40% tax, FROLIC and a ₹20 cola are not in the same
    purchase decision. The relevant set is <strong>Red Bull at ₹125, specialty coffee at ₹250, kombucha at
    ₹150–250 and cold-pressed juice at ₹120</strong>. At ₹130 FROLIC is mid-range in that set. The "India is
    price-sensitive" objection is true of the mass market and not of this consumer.</p>
  </div>

  <h3>7.3 Why India is underpenetrated</h3>
  <ol>
    <li><strong>The category was economically impossible until recently.</strong> Food-grade prebiotic fibre at
    scale was import-dependent and expensive, and the formulation problem is genuinely hard.</li>
    <li><strong>Health-led beverage in India has been dairy-led.</strong> Yakult trained a generation on
    "gut health = a small dairy shot". Nobody translated that into the soda occasion, where the volume is.</li>
    <li><strong>Kombucha taught the wrong lesson.</strong> Incumbents read its stall as "Indians do not want
    functional fizz". The correct reading is narrower: Indians did not want <em>vinegary</em> functional fizz at
    ₹200.</li>
    <li><strong>The 40% GST slab deters volume players.</strong> A brand competing on price is structurally dead,
    which has kept the category clear of exactly the players who would otherwise crush a startup.</li>
    <li><strong>Distribution is not yet contested.</strong> Quick commerce has compressed time-to-consumer from
    years to months, and neither incumbent holds national retail.</li>
  </ol>

  <h3>7.4 Seasonality</h3>
  <p>Indian beverage demand is summer-weighted, concentrated in March to June. Working capital planning assumes a
  Q1 inventory build ahead of that peak. Jamun carries an additional constraint: a roughly six-week harvest window
  and poor fresh shelf life, requiring freezing at harvest and forward contracting.</p>
</div>

<div class="section">
  <h1>8 · Category Creation &amp; Timing</h1>

  <h3>8.1 Why now</h3>
  <table>
    <thead><tr><th style="width:38%">Enabler</th><th>Status</th></tr></thead>
    <tbody>
      <tr><td>Prebiotic ingredient supply at Indian scale</td><td>Available — inulin and acacia both sourceable domestically or via established import routes</td></tr>
      <tr><td>Consumer awareness of gut health</td><td>Mainstream in metros; no longer requires category education</td></tr>
      <tr><td>Quick commerce as a premium beverage channel</td><td>Mature — reaches the target consumer in minutes</td></tr>
      <tr><td>Category proof</td><td>Poppi and Olipop removed all doubt that the category scales <span class="tag v">V</span></td></tr>
      <tr><td>Indian entrants</td><td>Two, both sub-scale, neither with distribution lock-in <span class="tag v">V</span></td></tr>
      <tr><td>Capital availability for Indian consumer</td><td>Active but disciplined — gross margin and repeat are the gating criteria</td></tr>
      <tr><td>Regulatory clarity</td><td>FSSAI framework workable within composition-only claim language</td></tr>
    </tbody>
  </table>

  <h3>8.2 Category timing matrix</h3>
  <p>Two axes determine whether a new entrant can win a category: how validated consumer demand is, and how
  contested distribution is. Only one quadrant reliably produces new category leaders.</p>
  ${timingMatrix()}

  <div class="callout">
    <span class="label">The window</span>
    <p><strong>18 to 30 months.</strong> It closes when either Misfits or Bubz raises a Series A and locks
    national distribution, or when Coca-Cola or PepsiCo launches an Indian prebiotic line — PepsiCo already owns
    Poppi and needs only to localise it. This is a specific, falsifiable closing condition, which is why it should
    be stated rather than implied.</p>
  </div>

  <h3>8.3 Why being second or third is the right position</h3>
  <p>True first-movers in consumer categories pay for consumer education and are frequently overtaken by better-
  executed followers. Misfits is currently funding category awareness in India; FROLIC benefits from that spend
  without having paid for it. The eventual winner will be whoever wins <strong>taste and distribution</strong>,
  not whoever issued the first press release.</p>
</div>

<div class="section">
  <h1>9 · Competition</h1>
  ${competitorTable()}

  <div class="callout warn">
    <span class="label">The honest read</span>
    <p><strong>Misfits is the direct competitor and is ahead on every dimension that currently matters.</strong>
    Product in market, funded, retail presence, and a cleaner health claim — zero added sugar against FROLIC's
    4&nbsp;g. FROLIC's advantages today are brand system and flavour portfolio: both real, both entirely unproven
    at the till.</p>
    <p>FROLIC's counter-position is that 4&nbsp;g of added sugar buys meaningfully better taste, and that taste
    drives repeat purchase more than a sugar figure on a label. <strong>This must be demonstrated in a blind
    panel before the seed round</strong>, not asserted.</p>
  </div>

  <h3>9.1 The most instructive comparison</h3>
  <p><strong>Paper Boat</strong> proved that Indian traditional flavours can be built into a national premium
  brand, and was acquired by Wipro Consumer Care. It is the closest domestic precedent for FROLIC's thesis — and
  a reminder that the outcome was a trade sale rather than a category-defining independent. It is also the most
  likely domestic fast-follower, holding the flavour credibility and lacking only the functional claim.</p>

  <h3>9.2 Response to incumbent entry</h3>
  <p>Coca-Cola and PepsiCo's structural advantages are cost, scale and price — none of which help in a 40%-taxed
  premium category where discount headroom is 11%. Their realistic move is to acquire the category leader, which
  is precisely what PepsiCo did with Poppi. The defensive position is therefore to become the obvious acquisition
  target before either decides to build instead.</p>
</div>

<div class="section">
  <h1>10 · Moat Analysis</h1>
  <p>Scored 1–5 for FROLIC at maturity, with an honest assessment of durability. A report claiming six moats has
  demonstrated none.</p>
  ${moatTable()}

  <p><strong>Weighted verdict: the moat is brand, taste and flavour IP. Everything else is either absent today or
  not defensible.</strong> The strategic implication is that FROLIC must convert brand and taste into distribution
  and habit before an incumbent decides the category is worth entering.</p>

  <h3>10.1 Competitive positioning</h3>
  ${positioningMap()}
  <p class="chart-note">The upper-right quadrant — credibly functional and unmistakably Indian — is unoccupied.
  Misfits holds functional credibility in a Western idiom; Paper Boat holds the Indian idiom with no functional
  claim. <strong>The risk is that the quadrant is empty because it is small, not because nobody considered it.</strong>
  Only repeat-purchase data resolves that.</p>
</div>
`;
}

/* ── tables & figures ───────────────────────────────────────── */

function skuTable(M) {
  const skus = [
    ['Nimbu Masala Fizz', 'Sharp lime · black salt · toasted cumin', 32, 6, 4, 180, 'Most loved', '#D7F23A'],
    ['Aam Panna Spark', 'Green mango · roasted jeera · mint', 38, 7, 4, 140, '—', '#F2C53A'],
    ['Kokum Burst', 'Tart kokum · sea salt · coconut air', 30, 5, 3, 200, 'Limited batch', '#E0457B'],
    ['Jamun Pop', 'Dark jamun · rock salt · plum skin', 36, 7, 4, 150, '—', '#8B47BC'],
    ['Kala Khatta Rush', 'Black grape · tamarind · chaat masala', 40, 8, 5, 220, '—', '#4B2E7A'],
    ['Ginger Lime Lift', 'Hot ginger · green lime · tulsi', 30, 5, 3, 90, 'Team favourite', '#F0A22B'],
    ['Jeera Fizz', 'Roasted cumin · mint · black salt', 26, 4, 2, 240, 'Lowest calorie', '#C08A3E'],
    ['Himalayan Lemon', 'Hill lemon · pink salt · cold air', 24, 4, 2, 160, 'Lowest calorie', '#8FD6C4'],
    ['Guava Chili', 'Pink guava · red chilli · lime salt', 38, 7, 4, 170, 'New', '#F2657B'],
    ['Orange Masala', 'Blood orange · chaat masala · amla', 36, 7, 4, 160, '—', '#FF6A1A'],
  ];
  return `<table class="compact">
    <thead><tr>
      <th style="width:19%">Flavour</th><th style="width:27%">Tasting notes</th>
      <th class="num">kcal</th><th class="num">Total sugar</th><th class="num">Added sugar</th>
      <th class="num">Fibre</th><th class="num">Sodium</th><th>Badge</th>
    </tr></thead>
    <tbody>${skus.map(([n, notes, kcal, sug, add, na, badge, hex]) => `<tr>
      <td><span class="swatch" style="background:${hex}"></span><strong>${n}</strong></td>
      <td>${notes}</td><td class="num">${kcal}</td><td class="num">${sug} g</td>
      <td class="num">${add} g</td><td class="num">7 g</td><td class="num">${na} mg</td><td>${badge}</td>
    </tr>`).join('')}</tbody>
  </table>
  <p class="chart-note">All values per 250 ml serving. Every SKU is caffeine-free and carries 7 g of prebiotic fibre.
  Figures are formulation targets and require batch verification.</p>`;
}

function marketFunnel(M) {
  const b = M.market;
  const rows = [
    ['Adults 18–45, five metros', b.adultPopulationMn, 100],
    ['× SEC A/A+ share (26%)', b.secAPlusMn, (b.secAPlusMn / b.adultPopulationMn) * 100],
    ['× already buy a ₹100+ beverage (25%)', b.premiumBeverageBuyersMn, (b.premiumBeverageBuyersMn / b.adultPopulationMn) * 100],
  ];
  return `<div class="chart">
    ${rows.map(([l, v, w], i) => `<div class="bar-row">
      <span class="bar-label">${l}</span>
      <span class="bar-track"><span class="bar-fill" style="width:${w.toFixed(1)}%;${i === 2 ? 'background:#14110F' : ''}"></span></span>
      <span class="bar-val">${v.toFixed(2)} M</span>
    </div>`).join('')}
    <p class="chart-note">${b.cities.join(' · ')}. Beachhead only — not a national TAM.</p>
  </div>`;
}

function timingMatrix() {
  return `<table class="compact">
    <thead><tr><th style="width:24%"></th><th style="width:38%">Distribution open</th><th>Distribution locked</th></tr></thead>
    <tbody>
      <tr>
        <td style="background:#14110F;color:#FFFDF7"><strong>Demand validated</strong></td>
        <td style="background:#f6fbe8"><strong>★ Prebiotic soda, India — now</strong><br>
          <span class="muted">Misfits and the US category proved demand. Nobody holds the shelf. An 18–30 month window.</span></td>
        <td><strong>Energy drinks</strong><br><span class="muted">Red Bull and Sting hold distribution. Entry means outspending incumbents.</span></td>
      </tr>
      <tr>
        <td style="background:#14110F;color:#FFFDF7"><strong>Demand unvalidated</strong></td>
        <td><strong>Kombucha, India</strong><br><span class="muted">Shelf is open because nobody wants it. Taste barrier unresolved at ₹200.</span></td>
        <td><strong>Packaged juice</strong><br><span class="muted">Dabur, ITC and PepsiCo hold it. The worst quadrant for a new entrant.</span></td>
      </tr>
    </tbody>
  </table>`;
}

function competitorTable() {
  const cols = ['FROLIC', 'Misfits', 'Bubz', 'Coca-Cola / Campa', 'Paper Boat', 'Kombucha'];
  const rows = [
    ['Category', 'Indian prebiotic soda', 'Prebiotic soda', 'Prebiotic soda', 'Mainstream CSD', 'Indian traditional', 'Fermented functional'],
    ['Price / 250 ml', '₹130', '₹75–100', 'n/a', '₹20–40', '₹40–60', '₹150–250'],
    ['Prebiotic fibre', '7 g', '7 g', 'Yes', '0 g', '0 g', 'Low'],
    ['Added sugar', '4 g', '<strong>0 g</strong>', 'Low', '25–27 g', 'Moderate–high', 'Low'],
    ['Flavour idiom', '<strong>Indian (10 SKUs)</strong>', 'Western minimal', 'Western, Gen Z', 'Western', '<strong>Indian</strong>', 'Western'],
    ['Distribution', '<strong>None</strong>', 'D2C, Amazon, Instamart', 'Early', '~10 M outlets', 'National', 'Metro premium'],
    ['Funding', '<strong>None</strong>', 'Seed (Nu Ventures)', 'Early', '—', 'Acquired (Wipro)', 'Mixed'],
    ['Brand system', '<strong>Complete, premium</strong>', 'Functional', 'Gen Z', 'Iconic', 'Strong, nostalgic', 'Varies'],
  ];
  return `<table class="compact">
    <thead><tr><th style="width:15%"></th>${cols.map((c, i) => `<th${i === 0 ? ' style="background:#5C8310"' : ''}>${c}</th>`).join('')}</tr></thead>
    <tbody>${rows.map(([label, ...cells]) =>
      `<tr><td><strong>${label}</strong></td>${cells.map((c, i) => `<td${i === 0 ? ' style="background:#f6fbe8"' : ''}>${c}</td>`).join('')}</tr>`).join('')}</tbody>
  </table>`;
}

function moatTable() {
  const rows = [
    ['Brand', '4 / 5', 'Durable', 'A complete original design system and ten flavour worlds. Brand is the only thing in beverage that compounds and cannot be bought quickly.'],
    ['Taste', 'Unproven', 'Durable if real', 'Potentially the deepest moat — formulation takes years to replicate. Currently a hypothesis, not an asset.'],
    ['Flavour IP &amp; sourcing', '3 / 5', 'Partially', 'Seasonal jamun and kokum sourcing is genuinely hard. Locking supply early constrains fast followers.'],
    ['Community', '3 / 5', 'Partially', 'Subscription, rewards and referral create switching cost. Real but modest — beverage loyalty is weak.'],
    ['Product innovation', '3 / 5', 'Partially', 'Ten SKUs and a still-beverage roadmap. An advantage only if the formulation library is genuinely proprietary.'],
    ['Health specification', '2 / 5', '<strong>No</strong>', '7 g / 4 g is matched by Misfits and beaten on sugar. Any competent formulator replicates it in six months.'],
    ['Distribution', '1 / 5', 'Eventually', 'Zero today. Becomes a moat at Year 4+ with shelf contracts and distributor exclusivity. This is what Series B buys.'],
    ['Supply chain', '1 / 5', 'Eventually', 'Co-packed. No advantage today.'],
    ['Cost', '1 / 5', '<strong>No</strong>', 'Subscale. Will never beat a multinational on cost and should not try.'],
  ];
  return `<table>
    <thead><tr><th style="width:20%">Moat</th><th style="width:10%" class="num">Score</th><th style="width:14%">Durable?</th><th>Assessment</th></tr></thead>
    <tbody>${rows.map(([m, s, d, a]) => `<tr><td><strong>${m}</strong></td><td class="num">${s}</td><td>${d}</td><td>${a}</td></tr>`).join('')}</tbody>
  </table>`;
}

function positioningMap() {
  return `<table class="compact">
    <thead><tr><th style="width:24%"></th><th style="width:38%">Western flavour idiom</th><th>Indian flavour idiom</th></tr></thead>
    <tbody>
      <tr>
        <td style="background:#14110F;color:#FFFDF7"><strong>High functional credibility</strong></td>
        <td>Misfits · Bubz · kombucha brands</td>
        <td style="background:#f6fbe8"><strong>★ FROLIC — unoccupied</strong></td>
      </tr>
      <tr>
        <td style="background:#14110F;color:#FFFDF7"><strong>Low functional credibility</strong></td>
        <td>Coca-Cola · Campa · Sting · Monster</td>
        <td>Paper Boat · traditional nimbu and jaljeera</td>
      </tr>
    </tbody>
  </table>`;
}
