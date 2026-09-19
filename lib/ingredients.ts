/**
 * Ingredient library for the interactive explorer.
 *
 * Copy discipline: every `benefit` string describes what the ingredient IS or
 * DOES in the can — it never states a health outcome for the drinker. Anything
 * stronger has to clear the claims matrix in docs/13-compliance-claims.md
 * before it ships (FSSAI Advertising & Claims Regulations, 2018).
 */

export type Ingredient = {
  slug: string;
  name: string;
  botanical?: string;
  category: 'Fibre' | 'Botanical' | 'Fruit' | 'Spice' | 'Mineral';
  origin: string;
  /** Short sensory description — what it contributes to taste. */
  flavourProfile: string;
  /** Factual, compliant description of its function in the formulation. */
  benefit: string;
  /** Longer editorial paragraph for the expanded card. */
  detail: string;
  /** Per-can inclusion, where meaningful. */
  dose?: string;
  /** Which flavours carry it — links the explorer into the catalogue. */
  inFlavours: string[];
  accent: string;
};

export const ingredients: Ingredient[] = [
  {
    slug: 'chicory-root-fibre',
    name: 'Chicory Root Fibre',
    botanical: 'Cichorium intybus',
    category: 'Fibre',
    origin: 'Contract-farmed in Maharashtra and Karnataka',
    flavourProfile: 'Faintly sweet, clean, near-invisible on the palate',
    benefit:
      'Our primary source of inulin — a plant fibre that passes through the small intestine undigested and reaches the colon intact.',
    detail:
      'Chicory looks like a blue-flowered weed and tastes like nothing much, which is precisely why it works. Its root is roughly 70% inulin by dry weight — a chain of fructose units the human gut has no enzyme to break down. That means it arrives in the large intestine structurally unchanged, which is the definition of a prebiotic fibre. We use it because it dissolves clear, carries no off-notes, and lets the fruit do the talking.',
    dose: '4 g per can',
    inFlavours: ['nimbu-masala-fizz', 'jamun-pop', 'ginger-lime-lift', 'orange-masala'],
    accent: '#B8F135',
  },
  {
    slug: 'prebiotic-blend',
    name: 'The FROLIC Prebiotic Blend',
    category: 'Fibre',
    origin: 'Blended and tested at our Pune facility',
    flavourProfile: 'Neutral, with a very slight body-building silkiness',
    benefit:
      'A 60:40 inulin-to-acacia ratio delivering 7 g of prebiotic fibre per 250 ml can — about a quarter of the 25–30 g daily fibre intake most Indian adults fall short of.',
    detail:
      'Single-source fibre is easy; a blend is better. Inulin ferments relatively quickly, acacia gum slowly and further along the colon. Running them together spreads fermentation out, which in practice means a gentler experience for people who are not used to a high-fibre drink. The 60:40 ratio took us eleven formulation rounds and a lot of honest feedback.',
    dose: '7 g per can',
    inFlavours: ['kala-khatta-rush', 'guava-chili'],
    accent: '#3FD9A4',
  },
  {
    slug: 'acacia-fibre',
    name: 'Acacia Fibre',
    botanical: 'Senegalia senegal',
    category: 'Fibre',
    origin: 'Sustainably tapped acacia gum, imported and re-tested in India',
    flavourProfile: 'Completely neutral; adds a soft mouthfeel',
    benefit:
      'A slow-fermenting soluble fibre. We lean on it in the flavours we recommend to anyone new to fibre drinks.',
    detail:
      'Acacia gum is harvested by scoring the bark of the tree and collecting the hardened sap — a practice older than most countries. As a fibre it is unusually well tolerated, ferments gradually along the length of the colon rather than all at once, and adds a rounded body that carbonated drinks otherwise lack.',
    dose: '3 g per can',
    inFlavours: ['kokum-burst', 'jeera-fizz', 'guava-chili'],
    accent: '#8FD6C4',
  },
  {
    slug: 'ginger',
    name: 'Ginger',
    botanical: 'Zingiber officinale',
    category: 'Spice',
    origin: 'Rhizomes from the Wayanad hills, Kerala',
    flavourProfile: 'Hot, resinous, citrus-adjacent; builds at the back of the throat',
    benefit:
      'Pressed fresh rather than reconstituted from powder, which preserves the volatile gingerols responsible for its characteristic heat and aroma.',
    detail:
      'There is a large gap between fresh ginger juice and dried ginger extract, and you can taste it instantly. Dried ginger reads as warm and slightly dusty; fresh ginger reads as bright and sharp. We press within 48 hours of the rhizome arriving and cold-hold the juice, because the compounds that make ginger interesting start degrading the moment you apply heat.',
    inFlavours: ['ginger-lime-lift'],
    accent: '#F0A22B',
  },
  {
    slug: 'tulsi',
    name: 'Tulsi',
    botanical: 'Ocimum tenuiflorum',
    category: 'Botanical',
    origin: 'Organic small-holder plots, Madhya Pradesh',
    flavourProfile: 'Peppery, clove-like, faintly minty on the finish',
    benefit:
      'Used at a deliberately low inclusion as a finishing note — it softens the landing of sharper flavours rather than leading them.',
    detail:
      'Holy basil grows in courtyards across the country and carries a couple of thousand years of cultural weight. As a flavour ingredient it is assertive: clove-forward, slightly peppery, capable of taking over a formulation if you let it. We steep it cold and briefly, using it the way a chef uses a finishing oil.',
    inFlavours: ['ginger-lime-lift'],
    accent: '#22B686',
  },
  {
    slug: 'amla',
    name: 'Amla',
    botanical: 'Phyllanthus emblica',
    category: 'Fruit',
    origin: 'Orchards across Uttar Pradesh and Gujarat',
    flavourProfile: 'Brutally sour, astringent, with a sweet echo afterwards',
    benefit:
      'One of the densest natural sources of vitamin C available. We use it for its sour-astringent structure as much as its nutrient profile.',
    detail:
      'Indian gooseberry is famously difficult to eat raw — sourness first, then astringency that dries the whole mouth, then an odd sweetness once you drink water. That third phase is what we are after. A small amount of amla gives a citrus formulation a long tail, so the flavour keeps developing after you swallow instead of falling off a cliff.',
    inFlavours: ['orange-masala'],
    accent: '#9ED91C',
  },
  {
    slug: 'lemon',
    name: 'Himalayan Hill Lemon',
    botanical: 'Citrus pseudolimon',
    category: 'Fruit',
    origin: 'Terraced groves in Himachal Pradesh and Uttarakhand',
    flavourProfile: 'Perfumed, floral, gentler acid than a plains lemon',
    benefit:
      'Thicker rind and lower acidity than common cultivars, which gives us aromatic citrus character without needing to over-sweeten to balance it.',
    detail:
      'Hill lemons grow slowly in cool air, and it shows: the rind is thick and intensely oily, the juice comparatively mild. For a low-sugar drink that is an enormous advantage, because most of the perceived "lemon" in a beverage comes from rind oils, not juice acid. More aroma, less acid, less sugar needed to balance the whole thing.',
    inFlavours: ['himalayan-lemon', 'nimbu-masala-fizz'],
    accent: '#FFD029',
  },
  {
    slug: 'kokum',
    name: 'Kokum',
    botanical: 'Garcinia indica',
    category: 'Fruit',
    origin: 'Konkan coast — Ratnagiri and Sindhudurg districts',
    flavourProfile: 'Sour-fruity, deeply tart, with a cooling sensation',
    benefit:
      'Delivers a natural deep-magenta colour and a sourness structurally different from citrus — rounder, less sharp, longer.',
    detail:
      'Kokum is the reason sol kadhi exists, and coastal households treat it as a hot-weather staple. The rind is sun-dried to a leathery black, then rehydrated. Its acid is hydroxycitric rather than citric, which is why it reads as round and cooling where lime reads as a sharp spike. It also stains everything a colour no laboratory has ever quite matched.',
    inFlavours: ['kokum-burst'],
    accent: '#E0457B',
  },
  {
    slug: 'jamun',
    name: 'Jamun',
    botanical: 'Syzygium cumini',
    category: 'Fruit',
    origin: 'Seasonal harvest, central and northern India',
    flavourProfile: 'Dark, astringent, plum-meets-black-tea',
    benefit:
      'Its anthocyanin-rich skin gives us the colour and the tannic grip that stops a sweet fruit soda from tasting flat.',
    detail:
      'Java plum has a six-week season and an unforgiving shelf life, which is why almost nobody builds a product around it. We freeze at harvest within hours of picking. The flavour sits somewhere between plum, grape and strong black tea — the astringency is the point, and it is what makes the finish clean instead of cloying.',
    inFlavours: ['jamun-pop'],
    accent: '#8B47BC',
  },
  {
    slug: 'kala-namak',
    name: 'Kala Namak',
    category: 'Mineral',
    origin: 'Kiln-fired rock salt, Rajasthan',
    flavourProfile: 'Sulphurous, savoury, unmistakable',
    benefit:
      'Provides sodium and trace minerals, and supplies the savoury dimension that separates an Indian soda from a Western one.',
    detail:
      'Black salt is rock salt fired in a kiln with charcoal and seeds until it takes on its sulphur compounds and pinkish-grey colour. It is the single ingredient most responsible for why nimbu soda tastes like nimbu soda. Used carelessly it is overwhelming; used at the right dose it makes fruit taste more like itself.',
    inFlavours: ['nimbu-masala-fizz', 'jeera-fizz', 'kala-khatta-rush'],
    accent: '#5C544D',
  },
];

export const ingredientMap = new Map(ingredients.map((i) => [i.slug, i]));

export const ingredientCategories = [
  'Fibre',
  'Botanical',
  'Fruit',
  'Spice',
  'Mineral',
] as const;
