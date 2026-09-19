/**
 * FROLIC financial model — assumptions.
 *
 * EVERY number in the DPR, the pitch deck and the return model derives from
 * this file. Nothing downstream is hand-typed. Change an assumption here,
 * re-run `node investor/build.mjs`, and every table regenerates.
 *
 * That is deliberate: the fastest way to lose a term sheet is for two numbers
 * in the same deck to disagree.
 *
 * SOURCING DISCIPLINE
 *   [V] = verified against a primary or reputable secondary source, cited
 *   [E] = estimate / industry benchmark — defensible but must be validated
 *   [A] = assumption — a choice, not a fact. These are the ones investors
 *         will attack, and they are labelled so we attack them first.
 */

export const META = {
  currency: 'INR',
  crore: 1e7,
  usdInr: 88,            // [E] indicative Sep-2026 rate for USD comparisons
  modelVersion: '1.0',
  baseYearLabel: 'FY27',
};

/* ─────────────────────────────────────────────────────────────────────────
   1. TAX — the single most important structural input in this model
   ───────────────────────────────────────────────────────────────────────── */

export const TAX = {
  // [V] From 22 Sep 2025 India moved aerated/sweetened beverages to a flat
  // 40% GST slab, replacing 28% GST + 12% compensation cess.
  // Source: CBIC rate rationalisation, Sep 2025.
  carbonatedGst: 0.40,

  // [V] Non-carbonated fruit/juice-based drinks and packaged water sit at 5%.
  // This 35-point gap is a genuine strategic lever, not a footnote — see
  // docs/investor/05-unit-economics.md.
  stillBeverageGst: 0.05,

  corporateTax: 0.25,    // [V] Indian domestic company concessional rate (115BAA)
};

/* ─────────────────────────────────────────────────────────────────────────
   2. PRODUCT & COST — per can, INR
   ───────────────────────────────────────────────────────────────────────── */

export const FORMATS = {
  can250: {
    label: '250 ml sleek can',
    ml: 250,
    mrp: 130,            // [A] premium functional tier, benchmarked to Red Bull ₹125
    // Cost curve by year. Year 1 is co-packer tolling at low volume; by Y5 we
    // assume committed annual volumes and direct can procurement.
    cogsByYear: [34.0, 31.0, 28.0, 25.0, 23.0],  // [E]
    costBreakdownY1: {
      ingredientsBase: 8.0,   // [E] flavour base, acidulants, salt, sweetener
      prebioticFibre: 4.0,    // [E] 7g: ~4g inulin + 3g acacia at low-volume lots
      waterCo2: 0.5,          // [E]
      canBody: 12.0,          // [E] printed 250ml sleek, low volume
      canEnd: 1.5,            // [E]
      secondaryPack: 2.5,     // [E] shrink, divider, carton
      conversion: 5.5,        // [E] co-packer tolling charge
    },
    costBreakdownY5: {
      ingredientsBase: 5.5,
      prebioticFibre: 3.0,
      waterCo2: 0.4,
      canBody: 8.0,
      canEnd: 1.2,
      secondaryPack: 2.0,
      conversion: 2.9,
    },
  },
  can300: {
    label: '300 ml can',
    ml: 300,
    mrp: 145,            // [A]
    cogsByYear: [37.5, 34.2, 30.9, 27.6, 25.4],  // [E]
  },
  can330: {
    label: '330 ml sleek can',
    ml: 330,
    mrp: 155,            // [A]
    cogsByYear: [39.8, 36.3, 32.8, 29.3, 27.0],  // [E]
  },
};

/* ─────────────────────────────────────────────────────────────────────────
   3. CHANNELS — what the brand actually banks per can
   ───────────────────────────────────────────────────────────────────────── */

export const CHANNELS = {
  d2c: {
    label: 'D2C (own site)',
    retailerMargin: 0,
    distributorMargin: 0,
    platformCommission: 0,
    logisticsPerCan: 4.2,      // [E] ₹50/order last-mile ÷ 12 cans
    paymentAndRtoPct: 0.05,    // [E] 2% gateway + ~3% COD/RTO provision
  },
  qcommerce: {
    label: 'Quick commerce',
    retailerMargin: 0,
    distributorMargin: 0,
    platformCommission: 0.25,  // [E] 22–28% incl. listing/visibility spend
    logisticsPerCan: 2.5,      // [E] freight to dark store
    paymentAndRtoPct: 0,
  },
  modernTrade: {
    label: 'Modern trade',
    retailerMargin: 0.25,      // [E]
    distributorMargin: 0.08,   // [E]
    platformCommission: 0,
    logisticsPerCan: 2.5,      // [E]
    paymentAndRtoPct: 0,
  },
  generalTrade: {
    label: 'General trade',
    retailerMargin: 0.22,      // [E]
    distributorMargin: 0.10,   // [E]
    platformCommission: 0,
    logisticsPerCan: 3.0,      // [E] higher cost-to-serve, smaller drops
    paymentAndRtoPct: 0,
  },
  horeca: {
    label: 'HoReCa / gyms',
    retailerMargin: 0,         // sold at wholesale; venue sets its own price
    distributorMargin: 0.12,   // [E]
    platformCommission: 0,
    logisticsPerCan: 2.5,      // [E]
    paymentAndRtoPct: 0,
  },
};

/** [A] Channel mix by year. Shifts from D2C-led to retail-led as we scale. */
export const CHANNEL_MIX = [
  { d2c: 0.60, qcommerce: 0.30, modernTrade: 0.10, generalTrade: 0.00, horeca: 0.00 },
  { d2c: 0.42, qcommerce: 0.38, modernTrade: 0.15, generalTrade: 0.00, horeca: 0.05 },
  { d2c: 0.30, qcommerce: 0.40, modernTrade: 0.20, generalTrade: 0.05, horeca: 0.05 },
  { d2c: 0.24, qcommerce: 0.40, modernTrade: 0.22, generalTrade: 0.09, horeca: 0.05 },
  { d2c: 0.20, qcommerce: 0.38, modernTrade: 0.24, generalTrade: 0.13, horeca: 0.05 },
];

/* ─────────────────────────────────────────────────────────────────────────
   4. MARKET — bottom-up, not top-down
   ───────────────────────────────────────────────────────────────────────── */

export const MARKET = {
  // [V] User-supplied, requires primary citation before external use.
  functionalBeverageIndiaUsdBn: { low: 4.2, high: 8.3, year: '2025-26' },
  functionalBeverageCagr: 0.105,
  prebioticSodaIndiaUsdMn2025: 12.6,

  // [V] PepsiCo 10-Q, May 2025: $1.95bn cash + $0.2bn contingent for Poppi,
  // against 2024 revenue of ~$500mn -> ~3.9x revenue.
  poppiExitMultiple: 3.9,
  poppiExitUsdBn: 1.95,
  poppiRevenueUsdMn: 500,
  olipopValuationUsdBn: 1.85,
  olipopRevenueUsdMn: 400,

  // Bottom-up beachhead. This is what we actually underwrite against.
  beachhead: {
    cities: ['Delhi NCR', 'Mumbai', 'Bengaluru', 'Pune', 'Hyderabad'],
    adultPopulationMn: 46,        // [E] 18–45 across the five metros
    secAPlusShare: 0.26,          // [E] SEC A/A+ share of that cohort
    premiumBeverageBuyerShare: 0.25, // [E] already spend ₹100+ on a drink
  },
};

/* ─────────────────────────────────────────────────────────────────────────
   5. CUSTOMER & DEMAND — the assumptions investors will attack hardest
   ───────────────────────────────────────────────────────────────────────── */

export const SCENARIOS = {
  conservative: {
    label: 'Conservative',
    customers: [11_000, 40_000, 110_000, 230_000, 420_000],   // [A]
    ordersPerCustomerPerYear: [2.0, 2.1, 2.2, 2.3, 2.4],      // [A]
    cansPerOrder: [9, 9.5, 10, 10, 10.5],                     // [A]
    marketingPctOfNetRev: [0.70, 0.52, 0.38, 0.30, 0.24],     // [A]
    // [A] Conservative assumes management RESPONDS to underperformance —
    // slower hiring, deferred line investment, tighter G&A. A conservative
    // case that keeps base-case spending is a strawman, not a downside.
    opexCr: [4.2, 7.0, 12.5, 19.0, 27.0],                     // [A]
    cac: [1100, 950, 820, 760, 720],                          // [A]
  },
  base: {
    label: 'Base',
    customers: [18_000, 75_000, 250_000, 600_000, 1_200_000], // [A]
    ordersPerCustomerPerYear: [2.4, 2.5, 2.6, 2.7, 2.8],      // [A]
    cansPerOrder: [10, 10.5, 11, 11, 11.5],                   // [A]
    marketingPctOfNetRev: [0.60, 0.45, 0.32, 0.24, 0.18],     // [A]
    opexCr: [4.5, 9.0, 20.0, 38.0, 68.0],                     // [A]
    cac: [850, 780, 640, 580, 540],                           // [A]
  },
  aggressive: {
    label: 'Aggressive',
    customers: [26_000, 120_000, 420_000, 1_050_000, 2_050_000], // [A]
    ordersPerCustomerPerYear: [2.7, 2.9, 3.1, 3.3, 3.5],         // [A]
    cansPerOrder: [10.5, 11, 11.5, 12, 12],                      // [A]
    marketingPctOfNetRev: [0.58, 0.42, 0.30, 0.22, 0.16],        // [A]
    opexCr: [5.5, 12.0, 28.0, 55.0, 96.0],                       // [A]
    cac: [780, 700, 590, 530, 495],                              // [A]
  },
};

/** [A] Share of customers retained into the following year. */
export const RETENTION = [0.34, 0.38, 0.42, 0.45, 0.47];

/* ─────────────────────────────────────────────────────────────────────────
   6. FUNDING & CAP TABLE
   ───────────────────────────────────────────────────────────────────────── */

export const FUNDING = {
  esopAtSeed: 0.10,
  rounds: [
    { name: 'Seed',     year: 0, raiseCr: 10,  postMoneyCr: 50,    esopRefresh: 0.00 },
    { name: 'Series A', year: 2, raiseCr: 50,  postMoneyCr: 250,   esopRefresh: 0.02 },
    { name: 'Series B', year: 4, raiseCr: 150, postMoneyCr: 1050,  esopRefresh: 0.02 },
  ],
  // [A] Exit in Y7 at the Poppi strategic multiple applied to Y7 revenue.
  exitYear: 7,
  exitRevenueMultiple: 3.9,
  y7RevenueCr: { conservative: 310, base: 760, aggressive: 1450 },  // [A]
  // [A] Honest probability weighting. Most seed consumer bets return nothing.
  outcomeProbabilities: { failure: 0.55, conservative: 0.25, base: 0.15, aggressive: 0.05 },
};
