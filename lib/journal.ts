export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  category: 'Gut health' | 'Flavour' | 'Behind the can' | 'Recipes';
  readingMinutes: number;
  date: string;
  /** The keyword cluster this post is built to rank for. */
  targetKeyword: string;
  /** Body sections. `h` is the H2; `p` are its paragraphs. */
  body: { h: string; p: string[] }[];
};

/**
 * Journal index.
 *
 * Each post maps to a keyword cluster from docs/11-seo-strategy.md — the blog
 * exists to win informational search and funnel into the product pages, not to
 * publish for its own sake.
 */
export const posts: Post[] = [
  {
    slug: 'prebiotic-vs-probiotic',
    title: 'Prebiotic or probiotic? The difference, in one page',
    excerpt:
      'They sound identical and are routinely used interchangeably in marketing copy. They are not the same thing, and the distinction is genuinely simple once someone explains it.',
    category: 'Gut health',
    readingMinutes: 6,
    date: '2026-08-28',
    targetKeyword: 'prebiotic vs probiotic',
    body: [
      {
        h: "The one-sentence version",
        p: [
          'Probiotics are live bacteria you swallow. Prebiotics are the fibre that feeds the bacteria already living in you. That is the whole distinction, and almost every other difference follows from it.',
          'The words are close enough that marketing departments have been using them interchangeably for years, which is how we ended up with a category where a sizeable share of shoppers cannot tell you which one they bought.',
        ],
      },
      {
        h: "Why the difference has practical consequences",
        p: [
          'Live cultures are fragile. They have to survive manufacture, distribution, a warm warehouse and your stomach acid before they can do anything at all, which is why probiotic products carry refrigeration instructions and short shelf lives.',
          'Prebiotic fibre has none of those problems. It is not alive, so nothing can kill it. It can be carbonated, canned, shipped across the country in a hot van and left in a cupboard for a year without changing. That robustness is precisely why a prebiotic soda is possible and a probiotic one is difficult.',
        ],
      },
      {
        h: "What makes a fibre count as prebiotic",
        p: [
          'Three conditions. It has to resist digestion in the stomach and small intestine. It has to be fermentable by the microbes in the colon. And that fermentation has to selectively favour some populations over others.',
          'Inulin, the fibre in chicory root, satisfies all three. Its fructose units are joined by bonds human enzymes cannot cut, so it arrives in the large intestine structurally unchanged — which is the entire point.',
        ],
      },
      {
        h: "Where we stop",
        p: [
          'There is good evidence that dietary fibre intake matters and that most people do not get enough. There is a great deal of confident extrapolation beyond that point about mood, immunity and skin which is not settled, and we are not going to pretend otherwise to sell more cans.',
          'FROLIC contains 7 g of prebiotic fibre per 250 ml. That is the claim. It is a real one and it does not need embellishment.',
        ],
      },
    ],
  },
  {
    slug: 'how-much-sugar-in-indian-soft-drinks',
    title: 'How much sugar is actually in an Indian soft drink?',
    excerpt:
      'We put fourteen widely available drinks side by side on a per-250ml basis. Some of the results are predictable. The fruit juices are not.',
    category: 'Gut health',
    readingMinutes: 8,
    date: '2026-08-11',
    targetKeyword: 'sugar content soft drinks India',
    body: [
      {
        h: "The method",
        p: [
          'We normalised everything to a 250 ml serving, because serving sizes across the category are wildly inconsistent and comparing a 200 ml tetra pack to a 600 ml bottle tells you nothing useful.',
          'Figures come from published nutrition panels. Where a brand declares a range we took the midpoint. We are comparing categories rather than naming products, because batch and regional variation is real.',
        ],
      },
      {
        h: "The predictable part",
        p: [
          'Colas and lemon-lime sodas land between 25 g and 28 g per 250 ml — roughly six to seven teaspoons. Energy drinks are marginally worse and add caffeine on top.',
          'None of this is surprising. Sweetness is what the category sells, and it is priced and formulated accordingly.',
        ],
      },
      {
        h: "The part that surprises people",
        p: [
          'Packaged fruit juice averaged 24 g per 250 ml in our sample — within a couple of grams of cola. The sugar is largely intrinsic to the fruit rather than added, which matters nutritionally, but the fibre that would normally accompany it in whole fruit has been removed during processing.',
          'That combination — fruit sugar without fruit fibre — is the one most shoppers do not expect, largely because juice is marketed as the healthy option on the same shelf.',
        ],
      },
      {
        h: "Where we sit",
        p: [
          'FROLIC ranges from 4 g to 8 g of total sugar per 250 ml depending on the flavour, of which 2 g to 5 g is added. Jeera Fizz is the lowest, Kala Khatta Rush the highest.',
          'We are not claiming zero. A drink with no sweetness at all is not a soda, and we would rather be honest about a small number than perform a zero we have not achieved.',
        ],
      },
    ],
  },
  {
    slug: 'why-kokum-deserves-better',
    title: 'Kokum deserves better than a sachet',
    excerpt:
      'A fruit that grows on one coastline, stains everything it touches, and has been cooling people down for centuries — and almost nobody outside Maharashtra and Goa has tasted it.',
    category: 'Flavour',
    readingMinutes: 5,
    date: '2026-07-22',
    targetKeyword: 'what is kokum',
    body: [
      {
        h: "A fruit with one postcode",
        p: [
          'Garcinia indica grows along a narrow strip of the western coast — Ratnagiri, Sindhudurg, coastal Karnataka, Goa. It does not travel well fresh, which is why the rind is sun-dried to a leathery black and rehydrated when needed.',
          'That single constraint explains why a fruit central to one region\'s cooking is close to unknown three hundred kilometres inland.',
        ],
      },
      {
        h: "Why it tastes different from lime",
        p: [
          'Kokum\'s acid is hydroxycitric rather than citric. In practice that means it reads as round and lingering where lime reads as a sharp spike that vanishes.',
          'It also carries a genuine cooling sensation, which is why coastal households treat sol kadhi as hot-weather infrastructure rather than as a beverage choice.',
        ],
      },
      {
        h: "The colour problem, which is not a problem",
        p: [
          'Kokum stains. Cloth, fingers, worktops, anything. In a food context that is an asset: the deep magenta in our Kokum Burst is the fruit itself, not a colouring agent, and no synthetic pigment we tested came close to matching it.',
        ],
      },
      {
        h: "What we did with it",
        p: [
          'Sea salt to round the acid and replace what you sweat out, acacia fibre because it does not interfere with a delicate flavour, and carbonation. Nothing else. It is the shortest ingredient list we make.',
        ],
      },
    ],
  },
  {
    slug: 'fibre-gap-india',
    title: 'The Indian fibre gap, and why nobody talks about it',
    excerpt:
      'Protein gets the attention. Fibre intake has been quietly falling for decades as diets shift toward refined grains, and it is much easier to fix.',
    category: 'Gut health',
    readingMinutes: 7,
    date: '2026-06-30',
    targetKeyword: 'daily fibre intake India',
    body: [
      {
        h: "The number nobody quotes",
        p: [
          'Protein has had a decade of attention. Fibre has had almost none, despite the evidence base being at least as strong and the shortfall being considerably more widespread.',
          'Indian dietary guidance generally puts adult fibre intake at around 25–30 g per day. A substantial share of urban Indian adults fall short of that, and the trend has been going the wrong way for decades.',
        ],
      },
      {
        h: "Why intake fell",
        p: [
          'Not because anyone decided to eat less fibre. It fell as a side effect of grain refining, of millets being displaced by polished rice and refined wheat, and of more meals being eaten out of a packet.',
          'Each of those shifts happened for reasons that made sense at the time — shelf life, convenience, cost, perceived status. The fibre loss was collateral.',
        ],
      },
      {
        h: "Why it is an unusually fixable gap",
        p: [
          'Most nutritional shortfalls require changing what you eat. Fibre is one of the few you can meaningfully close by changing what you drink, because fibre can be added to a liquid without dominating it.',
          'Seven grams is not a whole day\'s requirement. It is roughly a quarter of one, from something you were going to drink anyway.',
        ],
      },
      {
        h: "Going slowly",
        p: [
          'If your current intake is low, a sudden jump will produce bloating and wind. This is normal, it passes, and it is avoidable: start with one can a day rather than three. We say this in the product copy too, because a bad first week is how people decide fibre is not for them.',
        ],
      },
    ],
  },
  {
    slug: 'eleven-attempts-at-a-fibre-soda',
    title: 'Eleven attempts at getting fibre into a fizzy drink',
    excerpt:
      'Inulin clouds. Acacia thickens. Carbonation strips aroma. A production diary of the formulation rounds that did not work, and the one that did.',
    category: 'Behind the can',
    readingMinutes: 9,
    date: '2026-05-18',
    targetKeyword: 'prebiotic fibre beverage formulation',
    body: [
      {
        h: "Attempt one: just add inulin",
        p: [
          'It clouded. Not attractively — a flat, grey haze that made the liquid look like it had gone off. Carbonation made it worse by dropping the fibre out of suspension within days.',
          'We drank it anyway. It tasted fine. It looked like something you would return.',
        ],
      },
      {
        h: "Attempts two to five: chasing clarity",
        p: [
          'Different inulin chain lengths, different dissolution temperatures, different orders of addition. Short-chain inulin stayed clear but was noticeably sweet, which meant cutting sugar elsewhere and unbalancing flavours we had already signed off.',
          'Attempt five was clear, stable and tasted like a compromise. That was the round where we stopped optimising one variable at a time.',
        ],
      },
      {
        h: "Attempts six to nine: the aroma problem",
        p: [
          'Carbonation strips volatile aromatics. Fresh ginger loses its top note within a fortnight of canning if you press it warm; lime rind oils go flat faster still.',
          'Cold-pressing and cold-holding fixed most of it. Adding the aromatic fraction later in the process fixed the rest.',
        ],
      },
      {
        h: "Attempts ten and eleven: the blend",
        p: [
          'Pure inulin ferments fast, which some people feel. Pure acacia is gentle but adds body we did not want in the citrus flavours.',
          'Sixty inulin, forty acacia. Clear, stable, 7 g, and nobody on the panel had a complaint. That ratio is now in every can.',
        ],
      },
    ],
  },
  {
    slug: 'six-frolic-mocktails',
    title: 'Six mocktails that take under two minutes',
    excerpt:
      'Guava Chili with a salt-chilli rim. Orange Masala with an orange wheel. Kokum with nothing at all, because it does not need help.',
    category: 'Recipes',
    readingMinutes: 4,
    date: '2026-04-09',
    targetKeyword: 'easy mocktail recipes India',
    body: [
      {
        h: "Guava Chili paloma",
        p: [
          'Salt-and-chilli rim, ice, a squeeze of lime, top with Guava Chili. The rim does most of the work — it turns a soft drink into something that reads as a cocktail without anything being added to it.',
        ],
      },
      {
        h: "Nimbu Masala spritz",
        p: [
          'Rub a lime wedge around the rim, one large ice cube, pour slowly. A large cube rather than several small ones, because dilution is what kills this one.',
        ],
      },
      {
        h: "Aam Panna cooler",
        p: [
          'Tall glass, plenty of ice, one mint leaf torn rather than chopped — tearing releases oil, chopping bruises it. A pinch of black salt on top if the day has been long.',
        ],
      },
      {
        h: "Kokum, as is",
        p: [
          'Straight from the fridge into a chilled glass. No ice, nothing added. It does not need help and dilution flattens the colour.',
        ],
      },
      {
        h: "Orange Masala sundowner",
        p: [
          'Over ice with an orange wheel. Works exceptionally well as a gin mixer if that is the evening you are having.',
        ],
      },
      {
        h: "Jamun float",
        p: [
          'Jamun Pop over a scoop of vanilla ice cream. The astringency cuts the dairy and the foam turns violet. Serve it to somebody and watch their face.',
        ],
      },
    ],
  },
];
