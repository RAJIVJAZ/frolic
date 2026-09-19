/**
 * FROLIC financial model — computation.
 *
 * Pure functions over `assumptions.mjs`. No hard-coded outputs anywhere.
 */

import { META, TAX, FORMATS, CHANNELS, CHANNEL_MIX, MARKET, SCENARIOS, RETENTION, FUNDING } from './assumptions.mjs';

const r2 = (n) => Math.round(n * 100) / 100;
const r0 = (n) => Math.round(n);

/* ── Channel economics ──────────────────────────────────────────────────── */

/**
 * What the brand actually banks from one can, after GST, trade margins,
 * platform commission, freight and payment/RTO leakage.
 *
 * GST comes off first: at a 40% slab on an MRP of ₹130, ₹37 of the shelf
 * price is tax before anyone in the value chain is paid.
 */
export function netRealisation(mrp, channelKey) {
  const c = CHANNELS[channelKey];
  const exGst = mrp / (1 + TAX.carbonatedGst);
  const afterRetail = exGst * (1 - c.retailerMargin);
  const afterDistributor = afterRetail * (1 - c.distributorMargin);
  const afterPlatform = afterDistributor * (1 - c.platformCommission);
  const afterLeakage = afterPlatform * (1 - c.paymentAndRtoPct);
  return afterLeakage - c.logisticsPerCan;
}

export function channelTable(mrp = FORMATS.can250.mrp) {
  return Object.keys(CHANNELS).map((k) => {
    const c = CHANNELS[k];
    const exGst = mrp / (1 + TAX.carbonatedGst);
    const net = netRealisation(mrp, k);
    return {
      channel: c.label,
      mrp,
      gst: r2(mrp - exGst),
      exGst: r2(exGst),
      tradeAndPlatform: r2(exGst - net - c.logisticsPerCan),
      logistics: c.logisticsPerCan,
      netToBrand: r2(net),
      netAsPctOfMrp: r2((net / mrp) * 100),
    };
  });
}

/** Blended net realisation per can for a given year, using that year's mix. */
export function blendedNetRealisation(yearIdx, mrp = FORMATS.can250.mrp) {
  const mix = CHANNEL_MIX[yearIdx];
  return Object.entries(mix).reduce(
    (sum, [ch, share]) => sum + share * netRealisation(mrp, ch),
    0,
  );
}

/* ── Unit economics by format ───────────────────────────────────────────── */

export function unitEconomics(formatKey, yearIdx) {
  const f = FORMATS[formatKey];
  const net = blendedNetRealisation(yearIdx, f.mrp);
  const cogs = f.cogsByYear[yearIdx];
  const contribution = net - cogs;
  return {
    format: f.label,
    ml: f.ml,
    mrp: f.mrp,
    gstPerCan: r2(f.mrp - f.mrp / (1 + TAX.carbonatedGst)),
    blendedNetRealisation: r2(net),
    cogs: r2(cogs),
    contributionPerCan: r2(contribution),
    grossMarginPct: r2((contribution / net) * 100),
    mrpToNetLeakagePct: r2(((f.mrp - net) / f.mrp) * 100),
  };
}

/**
 * Minimum viable selling price: the MRP at which a can clears its own COGS
 * plus a target gross margin, after all downstream leakage. Solved directly —
 * every deduction except per-can logistics is proportional to price.
 */
export function minimumViablePrice(formatKey, yearIdx, targetGmPct = 0.55) {
  const f = FORMATS[formatKey];
  const cogs = f.cogsByYear[yearIdx];
  const mix = CHANNEL_MIX[yearIdx];

  // net = mrp * k - L, where k is the blended proportional retention and L the
  // blended per-can logistics cost.
  let k = 0;
  let L = 0;
  for (const [ch, share] of Object.entries(mix)) {
    const c = CHANNELS[ch];
    const prop =
      (1 / (1 + TAX.carbonatedGst)) *
      (1 - c.retailerMargin) *
      (1 - c.distributorMargin) *
      (1 - c.platformCommission) *
      (1 - c.paymentAndRtoPct);
    k += share * prop;
    L += share * c.logisticsPerCan;
  }
  // Require net - cogs = targetGm * net  ->  net = cogs / (1 - targetGm)
  const requiredNet = cogs / (1 - targetGmPct);
  const mrp = (requiredNet + L) / k;
  return { requiredNet: r2(requiredNet), minimumViableMrp: r2(mrp), targetGmPct };
}

/* ── Market sizing (bottom-up) ──────────────────────────────────────────── */

export function marketSizing() {
  const b = MARKET.beachhead;
  const secA = b.adultPopulationMn * b.secAPlusShare;
  const som = secA * b.premiumBeverageBuyerShare;
  return {
    cities: b.cities,
    adultPopulationMn: r2(b.adultPopulationMn),
    secAPlusMn: r2(secA),
    premiumBeverageBuyersMn: r2(som),
    note: 'Beachhead only — five metros. Not a national TAM.',
  };
}

/* ── P&L ────────────────────────────────────────────────────────────────── */

export function buildPnl(scenarioKey) {
  const s = SCENARIOS[scenarioKey];
  const years = [];

  for (let y = 0; y < 5; y++) {
    const customers = s.customers[y];
    const orders = s.ordersPerCustomerPerYear[y];
    const cansPerOrder = s.cansPerOrder[y];
    const cans = customers * orders * cansPerOrder;

    const netPerCan = blendedNetRealisation(y);
    const cogsPerCan = FORMATS.can250.cogsByYear[y];

    const netRevenue = cans * netPerCan;
    const cogs = cans * cogsPerCan;
    const grossProfit = netRevenue - cogs;

    const marketing = netRevenue * s.marketingPctOfNetRev[y];
    const opex = s.opexCr[y] * META.crore;
    const ebitda = grossProfit - marketing - opex;

    // D&A is light — we tole rather than own a line until Y4.
    const depreciation = (y >= 3 ? 3.5 : 1.0) * META.crore;
    const ebit = ebitda - depreciation;
    const tax = ebit > 0 ? ebit * TAX.corporateTax : 0;
    const netProfit = ebit - tax;

    const arpu = netRevenue / customers;
    const contributionPerCustomer = arpu * (grossProfit / netRevenue);

    years.push({
      year: y + 1,
      customers,
      cans: r0(cans),
      netRealisationPerCan: r2(netPerCan),
      cogsPerCan: r2(cogsPerCan),
      arpu: r0(arpu),
      netRevenueCr: r2(netRevenue / META.crore),
      grossProfitCr: r2(grossProfit / META.crore),
      grossMarginPct: r2((grossProfit / netRevenue) * 100),
      marketingCr: r2(marketing / META.crore),
      marketingPctOfRev: r2(s.marketingPctOfNetRev[y] * 100),
      opexCr: r2(s.opexCr[y]),
      ebitdaCr: r2(ebitda / META.crore),
      ebitdaMarginPct: r2((ebitda / netRevenue) * 100),
      netProfitCr: r2(netProfit / META.crore),
      cac: s.cac[y],
      contributionPerCustomer: r0(contributionPerCustomer),
      cacPaybackYears: r2(s.cac[y] / contributionPerCustomer),
      retentionPct: r2(RETENTION[y] * 100),
    });
  }

  const firstEbitdaPositive = years.find((y) => y.ebitdaCr > 0);

  // Peak cumulative cash shortfall from operations — the trough of the
  // running EBITDA total. This, plus working capital, is what the company
  // must have in the bank to survive to breakeven.
  let running = 0;
  let trough = 0;
  for (const y of years) {
    running += y.ebitdaCr;
    trough = Math.min(trough, running);
  }
  const peakCumulativeBurnCr = r2(trough);

  // Inventory-led working capital: cans are made before they are sold.
  // ~55 days of COGS tied up in stock and channel receivables at peak.
  const peakWorkingCapitalCr = r2(
    Math.max(...years.map((y) => ((y.cans * y.cogsPerCan) / META.crore) * (55 / 365))),
  );

  return {
    scenario: s.label,
    years,
    ebitdaPositiveYear: firstEbitdaPositive ? firstEbitdaPositive.year : null,
    cumulativeEbitdaToBreakevenCr: r2(
      years
        .filter((y) => y.ebitdaCr < 0)
        .reduce((a, y) => a + y.ebitdaCr, 0),
    ),
    peakCumulativeBurnCr,
    peakWorkingCapitalCr,
    totalCapitalNeedCr: r2(Math.abs(trough) + peakWorkingCapitalCr),
    y5NetRevenueCr: years[4].netRevenueCr,
    y5NetRevenueUsdMn: r2((years[4].netRevenueCr * META.crore) / (META.usdInr * 1e6)),
  };
}

/** 3-year LTV on retained contribution, against blended CAC. */
export function ltvAnalysis(scenarioKey) {
  const pnl = buildPnl(scenarioKey);
  return pnl.years.map((y, i) => {
    const c1 = y.contributionPerCustomer;
    const c2 = i + 1 < 5 ? c1 * RETENTION[i] : c1 * RETENTION[4];
    const c3 = c2 * (i + 2 < 5 ? RETENTION[i + 1] : RETENTION[4]);
    const ltv = c1 + c2 + c3;
    return {
      year: y.year,
      cac: y.cac,
      year1Contribution: r0(c1),
      threeYearLtv: r0(ltv),
      ltvToCac: r2(ltv / y.cac),
      paybackMonths: r2((y.cac / c1) * 12),
    };
  });
}

/* ── Cap table & returns ────────────────────────────────────────────────── */

export function capTable() {
  let founders = 1 - FUNDING.esopAtSeed;
  let esop = FUNDING.esopAtSeed;
  const investors = [];
  const stages = [{ stage: 'Founding', founders: 1, esop: 0, rows: [] }];

  stages.push({
    stage: 'Post-ESOP pool',
    founders: r2(founders * 100),
    esop: r2(esop * 100),
    rows: [],
  });

  for (const round of FUNDING.rounds) {
    const newShare = round.raiseCr / round.postMoneyCr;
    const dilution = 1 - newShare;

    founders *= dilution;
    esop *= dilution;
    for (const inv of investors) inv.share *= dilution;
    investors.push({ name: round.name, share: newShare, investedCr: round.raiseCr });

    // ESOP refresh dilutes everyone pro-rata, including prior investors.
    if (round.esopRefresh > 0) {
      const refreshDilution = 1 - round.esopRefresh;
      founders *= refreshDilution;
      for (const inv of investors) inv.share *= refreshDilution;
      esop = esop * refreshDilution + round.esopRefresh;
    }

    stages.push({
      stage: `Post-${round.name}`,
      raiseCr: round.raiseCr,
      postMoneyCr: round.postMoneyCr,
      founders: r2(founders * 100),
      esop: r2(esop * 100),
      rows: investors.map((i) => ({ name: i.name, pct: r2(i.share * 100) })),
    });
  }

  return { stages, finalInvestors: investors, finalFounders: founders, finalEsop: esop };
}

export function returns(scenarioKey) {
  const ct = capTable();
  const y7Rev = FUNDING.y7RevenueCr[scenarioKey];
  const exitValueCr = y7Rev * FUNDING.exitRevenueMultiple;

  const rows = ct.finalInvestors.map((inv) => {
    const round = FUNDING.rounds.find((r) => r.name === inv.name);
    const proceeds = exitValueCr * inv.share;
    const moic = proceeds / inv.investedCr;
    const holdYears = FUNDING.exitYear - round.year;
    const irr = Math.pow(moic, 1 / holdYears) - 1;
    return {
      round: inv.name,
      investedCr: inv.investedCr,
      entryPostMoneyCr: round.postMoneyCr,
      finalOwnershipPct: r2(inv.share * 100),
      exitProceedsCr: r2(proceeds),
      moic: r2(moic),
      irrPct: r2(irr * 100),
      holdYears,
    };
  });

  return {
    scenario: scenarioKey,
    y7RevenueCr: y7Rev,
    exitMultiple: FUNDING.exitRevenueMultiple,
    exitValueCr: r2(exitValueCr),
    exitValueUsdMn: r2((exitValueCr * META.crore) / (META.usdInr * 1e6)),
    founderPct: r2(ct.finalFounders * 100),
    esopPct: r2(ct.finalEsop * 100),
    rows,
  };
}

/**
 * Probability-weighted seed return.
 *
 * Every deck shows the success case. This shows the expected value across all
 * outcomes including total loss, which is the number a seed partner is
 * actually underwriting.
 */
export function probabilityWeightedSeedReturn() {
  const p = FUNDING.outcomeProbabilities;
  const seedInvested = FUNDING.rounds[0].raiseCr;

  const outcomes = [
    { name: 'Failure / acquihire', probability: p.failure, proceedsCr: 0 },
    ...['conservative', 'base', 'aggressive'].map((k) => {
      const r = returns(k);
      const seed = r.rows.find((x) => x.round === 'Seed');
      return { name: SCENARIOS[k].label, probability: p[k], proceedsCr: seed.exitProceedsCr };
    }),
  ];

  const expectedProceeds = outcomes.reduce((a, o) => a + o.probability * o.proceedsCr, 0);
  const expectedMoic = expectedProceeds / seedInvested;

  return {
    outcomes: outcomes.map((o) => ({
      ...o,
      probabilityPct: r2(o.probability * 100),
      weightedCr: r2(o.probability * o.proceedsCr),
      moic: r2(o.proceedsCr / seedInvested),
    })),
    expectedProceedsCr: r2(expectedProceeds),
    expectedMoic: r2(expectedMoic),
    expectedIrrPct: r2((Math.pow(expectedMoic, 1 / FUNDING.exitYear) - 1) * 100),
  };
}

/* ── Adoption curve ─────────────────────────────────────────────────────── */

export function adoptionCurve(scenarioKey = 'base') {
  const pnl = buildPnl(scenarioKey);
  const som = marketSizing().premiumBeverageBuyersMn * 1e6;
  const bands = [
    { band: 'Innovators', cumulativeCeiling: 0.025 },
    { band: 'Early adopters', cumulativeCeiling: 0.16 },
    { band: 'Early majority', cumulativeCeiling: 0.50 },
    { band: 'Late majority', cumulativeCeiling: 0.84 },
  ];

  return pnl.years.map((y) => {
    const pen = y.customers / som;
    const band = bands.find((b) => pen <= b.cumulativeCeiling) ?? bands[bands.length - 1];
    return {
      year: y.year,
      customers: y.customers,
      penetrationOfBeachheadPct: r2(pen * 100),
      adopterBand: band.band,
    };
  });
}

export { META, TAX, FORMATS, CHANNELS, CHANNEL_MIX, MARKET, SCENARIOS, FUNDING };
