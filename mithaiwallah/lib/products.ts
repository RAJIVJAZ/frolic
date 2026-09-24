/**
 * The six signature sweets.
 *
 * CONFIRM BEFORE LAUNCH: ingredient lists and shelf life below are written
 * from the traditional recipe for each sweet, not from Mithaiwallah's own
 * recipe cards. FSSAI labelling rules require what the website lists to match
 * the pack. Check every line against production, and remove anything that is
 * not in the recipe — a customer with a nut allergy will read this page.
 *
 * `photo` is the slot for real photography. Left null, the page renders the
 * sweet's illustration instead. See docs/10-photography-brief.md for the shot
 * list and file names.
 */

export type SweetArtVariant =
  | 'milk-cake'
  | 'kalakand'
  | 'malai-barfi'
  | 'peda'
  | 'kunda'
  | 'bikaneri-cake';

export type Product = {
  slug: string;
  name: string;
  hindi: string;
  art: SweetArtVariant;
  /** One line, under the name. */
  tagline: string;
  /** Short card copy. */
  summary: string;
  /** Long-form product story, one string per paragraph. */
  story: string[];
  ingredients: string[];
  allergens: string[];
  serving: string[];
  /** e.g. "Best within 10 days at room temperature". CONFIRM per product. */
  shelfLife: string;
  formats: string[];
  /** For the B2B block on the product page. */
  bulk: string;
  /** SEO: the phrase this page is built to rank for. */
  keyword: string;
  metaDescription: string;
  /** Tint used behind the illustration. */
  tone: string;
  photo: null | { src: string; alt: string };
};

export const PRODUCTS: Product[] = [
  {
    slug: 'milk-cake',
    name: 'Milk Cake',
    hindi: 'मिल्क केक',
    art: 'milk-cake',
    tagline: 'Slow-caramelised, grainy, golden at the heart',
    summary:
      'Milk reduced for hours until its centre turns to toffee and its edges stay pale and grainy.',
    story: [
      'Milk cake cannot be hurried. Full-cream milk goes into a wide kadhai and stays there for hours, stirred by hand while it reduces, grains and slowly gives up its sweetness to caramel.',
      'When the slab is set and cut, you see the proof of that patience: a toffee-dark centre fading to golden, grainy edges. Every piece carries both — the deep caramel and the fresh milk it came from.',
      'It is the sweet most families reach for when they want something that tastes like a celebration and keeps well enough to share with everyone who drops by.',
    ],
    ingredients: ['Full-cream milk', 'Sugar', 'Pure desi ghee', 'Green cardamom', 'Citric acid (to set the grain)'],
    allergens: ['Milk'],
    serving: [
      'Serve at room temperature — the caramel tastes fullest when it is not cold.',
      'Cut with a warm knife for clean edges on a serving platter.',
      'Pairs with strong masala chai or an unsweetened filter coffee.',
    ],
    shelfLife: 'Best within 10 days at room temperature; 15 days refrigerated',
    formats: ['250 g box', '500 g box', '1 kg box', 'Custom gift box'],
    bulk: 'Supplied in 2 kg and 5 kg trays for hotels, caterers and sweet shops, or in your own label.',
    keyword: 'milk cake manufacturer',
    metaDescription:
      'Handcrafted milk cake from Mithaiwallah, Prayagraj — slow-caramelised, grainy and golden. Gift boxes, bulk trays and wholesale supply across India.',
    tone: '#F1DDB7',
    photo: null,
  },
  {
    slug: 'kalakand',
    name: 'Kalakand',
    hindi: 'कलाकंद',
    art: 'kalakand',
    tagline: 'Soft, moist, delicately grainy',
    summary:
      'Fresh chhena and reduced milk, set soft and scattered with pistachio — the most delicate sweet we make.',
    story: [
      'Kalakand is only ever as good as the morning’s milk. Fresh chhena is folded into slowly reduced milk and set just long enough to hold — soft, moist and gently grainy, never dry.',
      'We keep the sweetness light so the milk does the talking, finish it with cardamom, and scatter pistachio across the top the way it has always been done.',
      'It is the sweet people describe with their eyes closed. Because it is so fresh, it is also the one we are strictest about: made to order and shipped fast.',
    ],
    ingredients: ['Full-cream milk', 'Fresh chhena (cottage cheese)', 'Sugar', 'Green cardamom', 'Pistachio'],
    allergens: ['Milk', 'Tree nuts (pistachio)'],
    serving: [
      'Keep refrigerated; take out 10 minutes before serving.',
      'Lovely on its own after a meal — it needs no accompaniment.',
      'For a dessert platter, pair with fresh fruit and a few strands of saffron.',
    ],
    shelfLife: 'Best within 3 days, refrigerated',
    formats: ['250 g box', '500 g box', '1 kg box', 'Custom gift box'],
    bulk: 'Fresh-to-order bulk supply for weddings, events and hotels within reach of Prayagraj.',
    keyword: 'kalakand manufacturer',
    metaDescription:
      'Fresh kalakand from Mithaiwallah — soft, moist, grainy and finished with pistachio. Made to order for gifting, weddings and bulk supply.',
    tone: '#F5ECD8',
    photo: null,
  },
  {
    slug: 'malai-barfi',
    name: 'Malai Barfi',
    hindi: 'मलाई बर्फी',
    art: 'malai-barfi',
    tagline: 'Smooth ivory squares under silver varq',
    summary: 'Fresh malai and khoya set into smooth ivory squares, finished with silver varq and pistachio.',
    story: [
      'Malai barfi is the quiet one on the platter: smooth, pale, and richer than it looks. Fresh cream and khoya are cooked together just until they bind, so the barfi stays soft and melts rather than crumbles.',
      'Each tray is finished with edible silver varq and a scatter of pistachio, then cut into clean squares that look as good in a gift box as they taste.',
      'If you are building a box for someone who loves milk sweets but not heavy caramel, this is where to start.',
    ],
    ingredients: ['Full-cream milk', 'Fresh malai (cream)', 'Khoya', 'Sugar', 'Green cardamom', 'Pistachio', 'Edible silver varq'],
    allergens: ['Milk', 'Tree nuts (pistachio)'],
    serving: [
      'Serve slightly chilled for the cleanest bite.',
      'Arrange in a single layer — the varq is delicate and marks easily.',
      'A natural centrepiece for a wedding or festive assortment box.',
    ],
    shelfLife: 'Best within 5 days, refrigerated',
    formats: ['250 g box', '500 g box', '1 kg box', 'Custom gift box'],
    bulk: 'Available in cut trays for events and in assortment boxes for corporate orders.',
    keyword: 'malai barfi online',
    metaDescription:
      'Malai barfi by Mithaiwallah — fresh cream and khoya, smooth ivory squares finished with silver varq and pistachio. Gift boxes and bulk orders.',
    tone: '#F7F0E2',
    photo: null,
  },
  {
    slug: 'peda',
    name: 'Peda',
    hindi: 'पेड़ा',
    art: 'peda',
    tagline: 'Khoya roasted in ghee to old gold',
    summary: 'Khoya roasted slowly in ghee until it turns the colour of old gold, shaped by hand, one at a time.',
    story: [
      'Peda belongs to Uttar Pradesh. Our recipe follows the tradition closely: khoya roasted slowly in ghee until it darkens to old gold and smells of caramelised milk, then cooled and shaped by hand.',
      'Every peda carries a thumbprint — not decoration, but the mark of the hand that made it. Some are finished with a strand of saffron; all of them carry cardamom.',
      'It is the sweet of temples, results day and good news. Small enough to give by the dozen, rich enough that one is usually enough.',
    ],
    ingredients: ['Khoya', 'Sugar', 'Pure desi ghee', 'Green cardamom', 'Saffron'],
    allergens: ['Milk'],
    serving: [
      'Serve at room temperature.',
      'Ideal for prasad, puja thalis and good-news distribution boxes.',
      'Pair with a small cup of kesar milk for a festive table.',
    ],
    shelfLife: 'Best within 7 days at room temperature',
    formats: ['250 g box', '500 g box', '1 kg box', 'Individually wrapped for distribution'],
    bulk: 'The easiest sweet to distribute at scale — ideal for temples, events and bulk corporate orders.',
    keyword: 'peda sweet online',
    metaDescription:
      'Hand-shaped peda from Mithaiwallah, Prayagraj — khoya roasted in ghee, cardamom and saffron. Gift boxes, prasad and bulk distribution orders.',
    tone: '#EFD9B0',
    photo: null,
  },
  {
    slug: 'kunda',
    name: 'Kunda',
    hindi: 'कुंदा',
    art: 'kunda',
    tagline: 'Deep, dark, caramelised milk',
    summary: 'Milk and khoya cooked past the point where most sweetmakers stop — until it turns deep brown and grainy.',
    story: [
      'Kunda is milk taken to its darkest. Milk and khoya are cooked long past where most sweets stop, until the sugar caramelises and the whole pan turns a deep, glossy brown.',
      'The result is loose and grainy rather than set — closer to a spoonable fudge than a barfi — with a flavour that runs from burnt caramel to warm cardamom.',
      'Serve it in a small bowl with a spoon. It is the sweet that makes people ask what it is, and then ask for more.',
    ],
    ingredients: ['Full-cream milk', 'Khoya', 'Sugar', 'Pure desi ghee', 'Green cardamom'],
    allergens: ['Milk'],
    serving: [
      'Warm for 10 seconds and serve in a small bowl with a spoon.',
      'Try it over vanilla ice cream — it behaves like a caramel sauce with texture.',
      'A striking dark note in a mixed gift box beside pale barfi.',
    ],
    shelfLife: 'Best within 7 days at room temperature',
    formats: ['250 g tub', '500 g tub', 'Custom gift box'],
    bulk: 'Supplied in 2 kg food-grade tubs for restaurants and dessert counters.',
    keyword: 'kunda sweet',
    metaDescription:
      'Kunda by Mithaiwallah — milk and khoya slow-cooked to a deep, grainy caramel. Tubs for gifting and 2 kg packs for restaurants.',
    tone: '#E6CBA4',
    photo: null,
  },
  {
    slug: 'bikaneri-cake',
    name: 'Bikaneri Cake',
    hindi: 'बीकानेरी केक',
    art: 'bikaneri-cake',
    tagline: 'Our richest cake, studded with dry fruits',
    summary: 'A dense, deeply caramelised milk cake set thick and layered with almonds, cashews and pistachios.',
    story: [
      'Bikaneri cake is our milk cake’s richer cousin: set thicker, cooked a shade darker, and layered generously with almonds, cashews and pistachios.',
      'Cut a slice and you get caramel, milk and the crunch of whole dry fruits in every bite. It is the piece that makes a gift box feel generous.',
      'We make it for people who want a single sweet to carry a celebration on its own.',
    ],
    ingredients: ['Full-cream milk', 'Sugar', 'Pure desi ghee', 'Almonds', 'Cashews', 'Pistachio', 'Green cardamom'],
    allergens: ['Milk', 'Tree nuts (almond, cashew, pistachio)'],
    serving: [
      'Serve at room temperature, sliced thick.',
      'A natural hero for a corporate gift box — it travels well.',
      'Pair with kahwa or a light green tea to balance the richness.',
    ],
    shelfLife: 'Best within 10 days at room temperature',
    formats: ['500 g box', '1 kg box', 'Custom gift box'],
    bulk: 'Supplied whole or pre-cut for corporate gifting, hotels and private label.',
    keyword: 'bikaneri cake sweet',
    metaDescription:
      'Bikaneri Cake by Mithaiwallah — a dense, caramelised milk cake layered with almonds, cashews and pistachios. Gift boxes and corporate orders.',
    tone: '#E9CFA3',
    photo: null,
  },
];

export const productBySlug = (slug: string) => PRODUCTS.find((p) => p.slug === slug);
