/**
 * FROLIC — company status, founder and roadmap.
 *
 * ┌──────────────────────────────────────────────────────────────────────┐
 * │  THIS FILE IS THE ONLY PLACE THE SITE MAKES A CLAIM ABOUT PROGRESS.  │
 * │                                                                      │
 * │  Every "underway / complete / planned" badge on the public site      │
 * │  reads from here. Before publishing, set each `status` to what is    │
 * │  ACTUALLY true. Defaults below are deliberately conservative — they  │
 * │  claim only what this project has demonstrably produced.             │
 * │                                                                      │
 * │  Claiming formulation trials, regulatory filings or manufacturing    │
 * │  partners that do not exist is the fastest way to lose a distributor │
 * │  or an investor, because both will ask for the batch report, the     │
 * │  licence number or the co-packer name.                               │
 * └──────────────────────────────────────────────────────────────────────┘
 */

export const COMPANY = {
  name: 'FROLIC',
  legalName: 'Frolic Beverages (proposed)',
  tagline: 'Feel Good. Sip Different.',
  category: 'Premium functional prebiotic soda',
  country: 'India',
  base: 'Pune, Maharashtra',
  /** Shown as the status pill sitewide. */
  stage: 'Pre-launch · in development',
  /** Deliberately a window, not a date. Do not promise a month. */
  launchWindow: 'Targeting first pilot production in 2027',
  foundedYear: 2026,
} as const;

export const FOUNDER = {
  name: 'Rajeev Jaiswal',
  role: 'Founder',
  /** Solo for now — stated plainly rather than implied by an empty team grid. */
  soloFounder: true,
  credentials: [
    'B.Tech, Electrical Engineering',
    'Founder, Anuradha Enterprises',
    'Food manufacturing and dairy processing',
  ],
  /**
   * PLACEHOLDERS — replace before publishing. An investor or distributor who
   * reads "[university]" on a live site draws the obvious conclusion.
   */
  placeholders: {
    university: '[University name]',
    graduationYear: '[Year]',
    yearsInManufacturing: '[N]',
    anuradhaScale: '[Daily processing capacity / years operating]',
    email: '[founder email]',
    linkedin: '[LinkedIn URL]',
  },
} as const;

/* ─────────────────────────────────────────────────────────────────────────
   Development roadmap
   ───────────────────────────────────────────────────────────────────────── */

export type WorkStatus = 'complete' | 'underway' | 'next' | 'planned';

export type RoadmapItem = {
  title: string;
  status: WorkStatus;
  /** What "done" means for this item — keeps the claim specific and checkable. */
  detail: string;
  /** Only set where there is something a third party could actually verify. */
  evidence?: string;
};

export const STATUS_LABEL: Record<WorkStatus, string> = {
  complete: 'Complete',
  underway: 'Underway',
  next: 'Next up',
  planned: 'Planned',
};

/**
 * Defaults claim ONLY what this project has produced. Everything requiring a
 * lab, a co-packer or a regulator is marked `next` or `planned`, because none
 * of it has happened yet. Move an item to `underway` the day it genuinely is.
 */
export const ROADMAP: RoadmapItem[] = [
  {
    title: 'Brand strategy & identity',
    status: 'complete',
    detail:
      'Positioning, naming, palette, typography and a full design system across ten flavour worlds.',
    evidence: 'Design system and brand guidelines documented',
  },
  {
    title: 'Product concept & range architecture',
    status: 'complete',
    detail:
      'Ten flavour concepts defined from Indian drinking culture, with target nutritional profile and four selected for launch.',
    evidence: 'Range architecture and launch-set rationale documented',
  },
  {
    title: 'Flavour research & sensory direction',
    status: 'complete',
    detail:
      'Desk research into regional flavour traditions, tasting-note architecture and ingredient philosophy per SKU.',
    evidence: 'Flavour briefs written for all ten concepts',
  },
  {
    title: 'Digital presence & investor materials',
    status: 'complete',
    detail:
      'Company site, financial model and a detailed project report covering market, unit economics and funding plan.',
    evidence: 'This site, plus a 55-page project report',
  },
  {
    title: 'Packaging & can design concepts',
    status: 'underway',
    detail:
      'Label architecture, can format and on-pack information design. Print-ready artwork and dieline validation still to come.',
  },
  {
    title: 'Formulation development',
    status: 'next',
    detail:
      'Bench trials for fibre suspension in a carbonated matrix, sweetness balance and aromatic retention. No trials have been run yet.',
  },
  {
    title: 'Co-packer selection & manufacturing plan',
    status: 'next',
    detail:
      'Identifying tolling partners with sleek-can capability and committed volume terms. No partner selected.',
  },
  {
    title: 'FSSAI licensing & label compliance',
    status: 'next',
    detail:
      'Licence application, label approval and claims review against FSS (Advertising & Claims) Regulations 2018. Not yet filed.',
  },
  {
    title: 'Pilot production run',
    status: 'planned',
    detail:
      'First commercial batch, which is also what converts every cost estimate in the model into a real invoice.',
  },
  {
    title: 'Blind sensory testing',
    status: 'planned',
    detail:
      'Third-party blind panel against category incumbents. The single most important validation step before scaling.',
  },
  {
    title: 'Regional launch',
    status: 'planned',
    detail: 'Two cities, direct-to-consumer and quick commerce first.',
  },
];

/* ─────────────────────────────────────────────────────────────────────────
   Timeline — years, not months. A missed month is a credibility cost.
   ───────────────────────────────────────────────────────────────────────── */

export type TimelinePhase = {
  period: string;
  label: string;
  current?: boolean;
  items: string[];
};

export const TIMELINE: TimelinePhase[] = [
  {
    period: '2026',
    label: 'Foundation',
    current: true,
    items: [
      'Brand strategy and identity',
      'Range architecture and flavour briefs',
      'Financial model and project report',
      'Packaging concept development',
      'Waitlist and early community',
    ],
  },
  {
    period: '2027',
    label: 'Build',
    items: [
      'Formulation trials',
      'Co-packer selection',
      'FSSAI licensing',
      'Pilot production run',
      'Blind sensory testing',
      'Regional launch, two cities',
    ],
  },
  {
    period: '2028',
    label: 'Prove',
    items: [
      'Quick commerce listings',
      'Modern trade entry',
      'Full launch range',
      'Repeat-purchase and velocity data',
    ],
  },
  {
    period: '2029+',
    label: 'Scale',
    items: [
      'National distribution',
      'Extended range',
      'Adjacent formats',
    ],
  },
];

/* ─────────────────────────────────────────────────────────────────────────
   Launch set — four of ten concepts selected to go first
   ───────────────────────────────────────────────────────────────────────── */

export const LAUNCH_FLAVOURS = [
  'nimbu-masala-fizz',
  'aam-panna-spark',
  'kokum-burst',
  'ginger-lime-lift',
] as const;

/** Why these four, stated on the site — a considered range beats ten guesses. */
export const LAUNCH_SET_RATIONALE =
  'Four concepts, chosen to cover the range rather than to fill a shelf: one sharp and savoury, one fruit-led, one regional and distinctive, one low-sugar everyday. The remaining six stay in development.';

/* ─────────────────────────────────────────────────────────────────────────
   Signup intents — one form component, five audiences
   ───────────────────────────────────────────────────────────────────────── */

export type SignupIntent =
  | 'waitlist'
  | 'taster'
  | 'distributor'
  | 'investor'
  | 'partnership';

export const SIGNUP_INTENTS: Record<
  SignupIntent,
  { label: string; blurb: string; cta: string; extraField?: { name: string; label: string; type: 'text' | 'textarea' } }
> = {
  waitlist: {
    label: 'Join the waitlist',
    blurb: 'First to know when FROLIC is available, and first to order.',
    cta: 'Join the waitlist',
  },
  taster: {
    label: 'Become an early taster',
    blurb:
      'A small group receives pilot batches and gives structured feedback. Honest opinions are the point — including the unflattering ones.',
    cta: 'Apply to taste',
    extraField: { name: 'city', label: 'Which city are you in?', type: 'text' },
  },
  distributor: {
    label: 'Distributor & retail enquiry',
    blurb:
      'For distributors, retailers, cafés, gyms and offices who want to stock FROLIC when it launches.',
    cta: 'Register interest',
    extraField: { name: 'business', label: 'Business name and territory', type: 'text' },
  },
  investor: {
    label: 'Investor enquiry',
    blurb:
      'FROLIC is pre-revenue and pre-production. A project report covering market, unit economics and funding plan is available on request.',
    cta: 'Request materials',
    extraField: { name: 'firm', label: 'Fund or firm', type: 'text' },
  },
  partnership: {
    label: 'Partnership enquiry',
    blurb: 'Ingredient suppliers, co-packers, design and retail partners.',
    cta: 'Get in touch',
    extraField: { name: 'about', label: 'What would you like to explore?', type: 'textarea' },
  },
};
