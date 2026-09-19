/**
 * FROLIC catalogue.
 *
 * This is the single source of truth the storefront renders from. In the
 * production build it is hydrated from Shopify (commerce fields: price, sku,
 * inventory, variantId) merged with Sanity (editorial fields: story, world,
 * ritual, pairing) — see docs/09-shopify-architecture.md for the merge
 * contract. Keeping the shape identical here means the UI never changes when
 * the data source is swapped.
 */

export type NutritionPanel = {
  servingSize: string;
  energyKcal: number;
  totalSugarG: number;
  addedSugarG: number;
  dietaryFibreG: number;
  prebioticFibreG: number;
  proteinG: number;
  totalFatG: number;
  sodiumMg: number;
  caffeineMg: number;
};

export type FlavourWorld = {
  /** Primary hue — drives buttons, glow, can body. */
  base: string;
  /** Deep shade — drives text on light, gradient end, shadow tint. */
  deep: string;
  /** Page wash behind the can. */
  wash: string;
  /** Ink that stays legible on `base`. */
  ink: string;
  /** One-line art direction brief for the 3D/photography team. */
  environment: string;
};

export type Product = {
  handle: string;
  name: string;
  shortName: string;
  tagline: string;
  /** Three-word flavour descriptor shown under the can. */
  notes: [string, string, string];
  story: string;
  ritual: string;
  pairing: string;
  heroIngredients: { name: string; role: string }[];
  world: FlavourWorld;
  nutrition: NutritionPanel;
  /** INR, single 250ml can. */
  price: number;
  comparePrice?: number;
  sku: string;
  badge?: string;
  /** 1 = gentle, 5 = full-throttle. Powers the quiz + intensity meters. */
  intensity: 1 | 2 | 3 | 4 | 5;
  sweetness: 1 | 2 | 3 | 4 | 5;
  /** Quiz taxonomy. */
  profile: ('citrus' | 'spiced' | 'fruity' | 'tart' | 'herbal' | 'sweet')[];
  bestFor: string[];
  isNew?: boolean;
  isBestseller?: boolean;
};

export const PACK_SIZES = [
  { size: 6, label: '6-can starter', discount: 0 },
  { size: 12, label: '12-can favourite', discount: 0.08 },
  { size: 24, label: '24-can stock-up', discount: 0.15 },
] as const;

export const SUBSCRIPTION_DISCOUNT = 0.2;

const baseNutrition = {
  servingSize: '250 ml',
  proteinG: 0,
  totalFatG: 0,
} as const;

export const products: Product[] = [
  {
    handle: 'nimbu-masala-fizz',
    name: 'Nimbu Masala Fizz',
    shortName: 'Nimbu Masala',
    tagline: 'The corner-shop classic, rebuilt with fibre.',
    notes: ['Sharp lime', 'Black salt', 'Toasted cumin'],
    story:
      'Every Indian summer has a soundtrack: the hiss of a bottle opening at a roadside stall. We chased that exact memory — the lime that makes you squint, the black salt that lands a half-second later — and rebuilt it with 7 g of prebiotic fibre and a quarter of the sugar. Same squint. Better afterglow.',
    ritual: 'Pour over one enormous ice cube. Rub a lime wedge around the rim first.',
    pairing: 'Street chaat, anything fried, the 4 p.m. slump.',
    heroIngredients: [
      { name: 'Cold-pressed lime', role: 'The sharp, unmistakable top note' },
      { name: 'Kala namak', role: 'Mineral depth and that sulphuric tang' },
      { name: 'Chicory root fibre', role: '7 g of prebiotic fuel per can' },
    ],
    world: {
      base: '#D7F23A',
      deep: '#5C7A0C',
      wash: '#F7FBE4',
      ink: '#14110F',
      environment:
        'Sun-bleached limes mid-bounce over a chalk-white surface, hard noon shadow, salt crystals suspended in the air.',
    },
    nutrition: {
      ...baseNutrition,
      energyKcal: 32,
      totalSugarG: 6,
      addedSugarG: 4,
      dietaryFibreG: 7,
      prebioticFibreG: 7,
      sodiumMg: 180,
      caffeineMg: 0,
    },
    price: 120,
    sku: 'FRLC-NMF-250',
    badge: 'Most loved',
    intensity: 4,
    sweetness: 2,
    profile: ['citrus', 'spiced', 'tart'],
    bestFor: ['Afternoon reset', 'Food pairing', 'Post-workout salt'],
    isBestseller: true,
  },
  {
    handle: 'aam-panna-spark',
    name: 'Aam Panna Spark',
    shortName: 'Aam Panna',
    tagline: 'Raw mango, roasted cumin, zero apology.',
    notes: ['Green mango', 'Roasted jeera', 'Mint finish'],
    story:
      'Aam panna was never a soft drink — it was medicine that happened to taste incredible, boiled in steel pots to survive a heatwave. We kept the raw green mango tartness and the roasted cumin backbone, dropped the sugar loaf, and carbonated the whole thing until it sparkled.',
    ritual: 'Serve cold enough to fog the glass. A single mint leaf, torn, not chopped.',
    pairing: 'Peak-summer afternoons, long drives, biryani.',
    heroIngredients: [
      { name: 'Raw green mango', role: 'Tart, green, unmistakably unripe' },
      { name: 'Roasted cumin', role: 'Earthy warmth underneath the tartness' },
      { name: 'Inulin blend', role: 'Gentle, slow-fermenting prebiotic fibre' },
    ],
    world: {
      base: '#F2C53A',
      deep: '#8A6208',
      wash: '#FCF4DE',
      ink: '#14110F',
      environment:
        'A mango orchard at golden hour — backlit leaves, dust in the light shafts, green mangoes tumbling through frame.',
    },
    nutrition: {
      ...baseNutrition,
      energyKcal: 38,
      totalSugarG: 7,
      addedSugarG: 4,
      dietaryFibreG: 7,
      prebioticFibreG: 7,
      sodiumMg: 140,
      caffeineMg: 0,
    },
    price: 120,
    sku: 'FRLC-APS-250',
    intensity: 3,
    sweetness: 3,
    profile: ['fruity', 'spiced', 'tart'],
    bestFor: ['Heat relief', 'Mocktail base', 'Sunday lunch'],
    isBestseller: true,
  },
  {
    handle: 'kokum-burst',
    name: 'Kokum Burst',
    shortName: 'Kokum',
    tagline: 'The Konkan coast in a cold can.',
    notes: ['Tart kokum', 'Sea salt', 'Coconut air'],
    story:
      'Walk into any Konkan kitchen in May and someone hands you a glass of sol kadhi. Kokum is the fruit behind it — deep magenta, mouth-puckering, and so cooling that coastal families treat it as air conditioning. We carbonated it. The colour alone is worth the can.',
    ritual: 'Straight from the fridge, no ice — dilution is the enemy here.',
    pairing: 'Coastal food, chilli heat, anything that needs putting out.',
    heroIngredients: [
      { name: 'Kokum fruit', role: 'Deep magenta tartness, naturally cooling' },
      { name: 'Sea salt', role: 'Rounds the acid, replaces what you sweat out' },
      { name: 'Acacia fibre', role: 'Low-FODMAP-friendly prebiotic fibre' },
    ],
    world: {
      base: '#E0457B',
      deep: '#7A123C',
      wash: '#FDE8EF',
      ink: '#FFFDF7',
      environment:
        'Wet black volcanic rock, spray from a breaking wave, kokum fruit half-submerged in a tide pool at dusk.',
    },
    nutrition: {
      ...baseNutrition,
      energyKcal: 30,
      totalSugarG: 5,
      addedSugarG: 3,
      dietaryFibreG: 7,
      prebioticFibreG: 7,
      sodiumMg: 200,
      caffeineMg: 0,
    },
    price: 130,
    sku: 'FRLC-KKB-250',
    badge: 'Limited coast batch',
    intensity: 4,
    sweetness: 2,
    profile: ['tart', 'fruity'],
    bestFor: ['Cooling down', 'Spicy meals', 'Coastal nostalgia'],
  },
  {
    handle: 'jamun-pop',
    name: 'Jamun Pop',
    shortName: 'Jamun',
    tagline: 'Purple-tongue season, bottled.',
    notes: ['Dark jamun', 'Rock salt', 'Plum skin'],
    story:
      'Jamun arrives for six weeks a year and stains everything it touches. That deep astringent sweetness — somewhere between plum, grape and black tea — has never had a proper soda. Now it does, and yes, it still turns your tongue purple. We consider that a feature.',
    ritual: 'Shake once, pour hard, watch the foam go violet.',
    pairing: 'Monsoon evenings, dark chocolate, showing people your tongue.',
    heroIngredients: [
      { name: 'Jamun fruit', role: 'Astringent, dark, faintly tannic' },
      { name: 'Rock salt', role: 'Cuts the astringency, lifts the fruit' },
      { name: 'Chicory root fibre', role: '7 g of prebiotic fuel per can' },
    ],
    world: {
      base: '#8B47BC',
      deep: '#3F1B56',
      wash: '#F1E7F8',
      ink: '#FFFDF7',
      environment:
        'Violet liquid splash frozen mid-crown against near-black, single jamun fruit breaking the surface, glossy skin highlights.',
    },
    nutrition: {
      ...baseNutrition,
      energyKcal: 36,
      totalSugarG: 7,
      addedSugarG: 4,
      dietaryFibreG: 7,
      prebioticFibreG: 7,
      sodiumMg: 150,
      caffeineMg: 0,
    },
    price: 130,
    sku: 'FRLC-JMP-250',
    intensity: 3,
    sweetness: 3,
    profile: ['fruity', 'tart', 'sweet'],
    bestFor: ['Monsoon evenings', 'Dessert swap', 'The colour'],
    isBestseller: true,
  },
  {
    handle: 'kala-khatta-rush',
    name: 'Kala Khatta Rush',
    shortName: 'Kala Khatta',
    tagline: 'Gola-stand energy. Grown-up build.',
    notes: ['Black grape', 'Tamarind', 'Chaat masala'],
    story:
      'Kala khatta is the flavour of every seaside gola cart — syrup-black, sweet-sour, faintly medicinal in the best way. We rebuilt it from actual tamarind and black grape instead of a syrup pump, kept the chaat masala dusting, and cut the sugar by three quarters.',
    ritual: 'Rim the glass with chaat masala. Non-negotiable.',
    pairing: 'Beach evenings, cricket, anyone who says soda has got boring.',
    heroIngredients: [
      { name: 'Tamarind', role: 'Sour-sweet body with real depth' },
      { name: 'Black grape', role: 'The dark, syrupy top note' },
      { name: 'Prebiotic blend', role: 'Inulin + acacia, 7 g combined' },
    ],
    world: {
      base: '#4B2E7A',
      deep: '#1E1036',
      wash: '#ECE8F7',
      ink: '#FFFDF7',
      environment:
        'Neon-lit night market, crushed ice glittering under a bare bulb, deep indigo syrup arcing through frame.',
    },
    nutrition: {
      ...baseNutrition,
      energyKcal: 40,
      totalSugarG: 8,
      addedSugarG: 5,
      dietaryFibreG: 7,
      prebioticFibreG: 7,
      sodiumMg: 220,
      caffeineMg: 0,
    },
    price: 130,
    sku: 'FRLC-KKR-250',
    intensity: 5,
    sweetness: 3,
    profile: ['tart', 'spiced', 'sweet'],
    bestFor: ['Nostalgia hit', 'Party pour', 'Evening pick-me-up'],
  },
  {
    handle: 'ginger-lime-lift',
    name: 'Ginger Lime Lift',
    shortName: 'Ginger Lime',
    tagline: 'A clean slap of ginger. Then lime. Then calm.',
    notes: ['Hot ginger', 'Green lime', 'Tulsi'],
    story:
      'This one is the workhorse. Fresh ginger pressed hard enough to actually burn a little, lime to keep it bright, and a whisper of tulsi so it finishes soft instead of sharp. It is the can our team reaches for at 3 p.m. and the one most people build a subscription around.',
    ritual: 'Over crushed ice with a twist of lime peel, oils expressed over the top.',
    pairing: 'Deadlines, long meetings, the first drink after a workout.',
    heroIngredients: [
      { name: 'Fresh ginger', role: 'Warming bite, 6-gingerol aroma' },
      { name: 'Tulsi (holy basil)', role: 'Soft herbal landing' },
      { name: 'Chicory root fibre', role: '7 g of prebiotic fuel per can' },
    ],
    world: {
      base: '#F0A22B',
      deep: '#7A4406',
      wash: '#FDF0DC',
      ink: '#14110F',
      environment:
        'Cracked ginger root and lime halves on warm travertine, low raking light, steam-like haze catching the edges.',
    },
    nutrition: {
      ...baseNutrition,
      energyKcal: 30,
      totalSugarG: 5,
      addedSugarG: 3,
      dietaryFibreG: 7,
      prebioticFibreG: 7,
      sodiumMg: 90,
      caffeineMg: 0,
    },
    price: 120,
    sku: 'FRLC-GLL-250',
    badge: 'Team favourite',
    intensity: 4,
    sweetness: 1,
    profile: ['citrus', 'spiced', 'herbal'],
    bestFor: ['Focus', 'Post-workout', 'Lowest sugar'],
    isBestseller: true,
  },
  {
    handle: 'jeera-fizz',
    name: 'Jeera Fizz',
    shortName: 'Jeera',
    tagline: 'For people who order jeera soda on purpose.',
    notes: ['Roasted cumin', 'Mint', 'Black salt'],
    story:
      'Jeera soda divides rooms. Half of India orders it after every meal; the other half has never understood why. We are firmly in the first camp — roasted cumin, mint, black salt, and enough carbonation to make it feel like punctuation at the end of a heavy plate.',
    ritual: 'After food. Room-temperature glass, very cold can.',
    pairing: 'Thalis, biryani, anything that needs settling.',
    heroIngredients: [
      { name: 'Roasted cumin', role: 'Deep, toasted, digestive warmth' },
      { name: 'Mint', role: 'Cooling lift against the cumin' },
      { name: 'Acacia fibre', role: 'Gentle on sensitive stomachs' },
    ],
    world: {
      base: '#C08A3E',
      deep: '#5E3A06',
      wash: '#F8EFDF',
      ink: '#14110F',
      environment:
        'Toasted cumin seeds scattered across raw linen, warm tungsten light, a thin curl of smoke rising from a cast-iron pan.',
    },
    nutrition: {
      ...baseNutrition,
      energyKcal: 26,
      totalSugarG: 4,
      addedSugarG: 2,
      dietaryFibreG: 7,
      prebioticFibreG: 7,
      sodiumMg: 240,
      caffeineMg: 0,
    },
    price: 120,
    sku: 'FRLC-JRF-250',
    intensity: 3,
    sweetness: 1,
    profile: ['spiced', 'herbal'],
    bestFor: ['After meals', 'Lowest calorie', 'Settling the stomach'],
  },
  {
    handle: 'himalayan-lemon',
    name: 'Himalayan Lemon',
    shortName: 'Himalayan Lemon',
    tagline: 'The quiet one. Mineral, clean, endlessly drinkable.',
    notes: ['Hill lemon', 'Pink salt', 'Cold air'],
    story:
      'Hill lemons are thicker-skinned and less aggressive than their plains cousins — more perfume, less acid. Paired with pink rock salt, the result is the most restrained can we make. It is what we serve people who insist they do not like soda. They usually have a second.',
    ritual: 'Tall glass, no ice, drunk slowly. Works as a still-water replacement.',
    pairing: 'Mornings, desk work, guests who do not drink.',
    heroIngredients: [
      { name: 'Himalayan hill lemon', role: 'Perfumed, low-acid citrus' },
      { name: 'Pink rock salt', role: 'Trace minerals, clean finish' },
      { name: 'Inulin blend', role: 'Neutral-tasting prebiotic fibre' },
    ],
    world: {
      base: '#8FD6C4',
      deep: '#1D6B59',
      wash: '#E9F7F3',
      ink: '#14110F',
      environment:
        'Pale morning fog over still water, a single lemon on wet slate, muted palette, condensation beading on cold glass.',
    },
    nutrition: {
      ...baseNutrition,
      energyKcal: 24,
      totalSugarG: 4,
      addedSugarG: 2,
      dietaryFibreG: 7,
      prebioticFibreG: 7,
      sodiumMg: 160,
      caffeineMg: 0,
    },
    price: 120,
    sku: 'FRLC-HML-250',
    intensity: 2,
    sweetness: 1,
    profile: ['citrus', 'herbal'],
    bestFor: ['Everyday sipping', 'Lowest calorie', 'Soda sceptics'],
  },
  {
    handle: 'guava-chili',
    name: 'Guava Chili',
    shortName: 'Guava Chili',
    tagline: 'Pink guava up front. Chilli on the way out.',
    notes: ['Pink guava', 'Red chilli', 'Lime salt'],
    story:
      'The guava cart guy has been doing this for a century: slice, dust with chilli and salt, hand it over. That sequence — sweet, then salt, then a slow build of heat — is the whole drink. The chilli is real but polite; it arrives after you have swallowed, and it makes you want another sip.',
    ritual: 'Salt-and-chilli rim, lime wedge, ice. Treat it like a paloma.',
    pairing: 'Barbecue, tacos, anyone who likes a little heat.',
    heroIngredients: [
      { name: 'Pink guava', role: 'Tropical, floral sweetness' },
      { name: 'Red chilli', role: 'A slow, warming back-of-throat finish' },
      { name: 'Prebiotic blend', role: 'Inulin + acacia, 7 g combined' },
    ],
    world: {
      base: '#F2657B',
      deep: '#8E1E36',
      wash: '#FDECEF',
      ink: '#FFFDF7',
      environment:
        'Halved pink guava on terracotta, chilli flakes suspended in a light shaft, saturated coral-to-red gradient backdrop.',
    },
    nutrition: {
      ...baseNutrition,
      energyKcal: 38,
      totalSugarG: 7,
      addedSugarG: 4,
      dietaryFibreG: 7,
      prebioticFibreG: 7,
      sodiumMg: 170,
      caffeineMg: 0,
    },
    price: 130,
    sku: 'FRLC-GVC-250',
    badge: 'New',
    intensity: 4,
    sweetness: 3,
    profile: ['fruity', 'spiced', 'sweet'],
    bestFor: ['Cocktail base', 'Grill nights', 'Heat seekers'],
    isNew: true,
  },
  {
    handle: 'orange-masala',
    name: 'Orange Masala',
    shortName: 'Orange Masala',
    tagline: 'Orange soda that grew up and got a spice rack.',
    notes: ['Blood orange', 'Chaat masala', 'Amla'],
    story:
      'Orange soda is the flavour most of us started on — and the one most guilty of the sugar problem. So we rebuilt it: real blood orange for bitterness and colour, chaat masala for savoury lift, amla for a sour-vitamin edge. It tastes like the memory, not the ingredient list.',
    ritual: 'Over ice with an orange wheel. Works exceptionally well with gin.',
    pairing: 'Brunch, kids who want "the orange one", weekend cocktails.',
    heroIngredients: [
      { name: 'Blood orange', role: 'Bittersweet citrus with real colour' },
      { name: 'Amla (Indian gooseberry)', role: 'Sour, astringent, vitamin-C rich' },
      { name: 'Chicory root fibre', role: '7 g of prebiotic fuel per can' },
    ],
    world: {
      base: '#FF6A1A',
      deep: '#8E3103',
      wash: '#FFEFE4',
      ink: '#14110F',
      environment:
        'Blood-orange cross-sections backlit like stained glass, warm amber gradient, spice dust drifting through the beam.',
    },
    nutrition: {
      ...baseNutrition,
      energyKcal: 36,
      totalSugarG: 7,
      addedSugarG: 4,
      dietaryFibreG: 7,
      prebioticFibreG: 7,
      sodiumMg: 160,
      caffeineMg: 0,
    },
    price: 120,
    sku: 'FRLC-ORM-250',
    intensity: 3,
    sweetness: 4,
    profile: ['citrus', 'spiced', 'sweet'],
    bestFor: ['Family fridge', 'Brunch', 'Cocktail mixer'],
  },
];

/* ——— Selectors ——————————————————————————————————————————————— */

export const productMap = new Map(products.map((p) => [p.handle, p]));

export function getProduct(handle: string): Product | undefined {
  return productMap.get(handle);
}

export function getBestsellers(): Product[] {
  return products.filter((p) => p.isBestseller);
}

/** Cheapest per-can price across all pack sizes, used for "from ₹x" copy. */
export function unitPriceFor(product: Product, packSize: number, subscribe = false): number {
  const tier = [...PACK_SIZES].reverse().find((t) => packSize >= t.size);
  const packDiscount = tier?.discount ?? 0;
  const subDiscount = subscribe ? SUBSCRIPTION_DISCOUNT : 0;
  // Discounts stack multiplicatively so a 24-pack subscription never dips below cost.
  return Math.round(product.price * (1 - packDiscount) * (1 - subDiscount));
}

export function formatINR(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}
