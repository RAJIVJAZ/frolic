/**
 * Illustrative review and community content.
 *
 * These are placeholder records with the exact shape the production loader
 * returns, so the components are already wired for real data. Nothing here
 * should ship to production as-is — see docs/14-cro-strategy.md for the
 * review-collection flow (post-delivery email at day 7, photo incentive,
 * verified-buyer flag from the Shopify order).
 */

export type Review = {
  id: string;
  name: string;
  location: string;
  rating: 1 | 2 | 3 | 4 | 5;
  title: string;
  body: string;
  flavour: string;
  verified: boolean;
  date: string;
};

export const reviews: Review[] = [
  {
    id: 'r1',
    name: 'Ananya R.',
    location: 'Bengaluru',
    rating: 5,
    title: 'Replaced my afternoon cola entirely',
    body: 'I was drinking one cola a day out of habit, not enjoyment. Ginger Lime Lift has the same "sharp cold thing" quality without the sugar crash afterwards. Three months in and I have not gone back.',
    flavour: 'ginger-lime-lift',
    verified: true,
    date: '2026-07-14',
  },
  {
    id: 'r2',
    name: 'Karthik M.',
    location: 'Chennai',
    rating: 5,
    title: 'The kokum one is genuinely special',
    body: 'I grew up on sol kadhi and was ready to be disappointed. It is not the same thing, obviously, but it is clearly made by someone who has actually had kokum. The colour is unreal.',
    flavour: 'kokum-burst',
    verified: true,
    date: '2026-06-28',
  },
  {
    id: 'r3',
    name: 'Meher S.',
    location: 'Mumbai',
    rating: 4,
    title: 'Great, but start slow on the fibre',
    body: 'Flavour is excellent — Jamun Pop especially. Fair warning that 7g of fibre is a real amount if your diet is low on it. I started with one a day rather than three and it was fine.',
    flavour: 'jamun-pop',
    verified: true,
    date: '2026-08-02',
  },
  {
    id: 'r4',
    name: 'Devika P.',
    location: 'Delhi',
    rating: 5,
    title: 'My kids ask for the orange one',
    body: 'That is the whole review. They ask for it by name, I am happy about what is in it, everybody wins. The 24-pack subscription pays for itself.',
    flavour: 'orange-masala',
    verified: true,
    date: '2026-08-19',
  },
  {
    id: 'r5',
    name: 'Rohan B.',
    location: 'Pune',
    rating: 5,
    title: 'Best post-gym drink I have found',
    body: 'Nimbu Masala has actual salt in it, which matters after an hour of lifting in a Pune summer. Tastes like the nimbu soda outside my gym but I am not drinking six spoons of sugar.',
    flavour: 'nimbu-masala-fizz',
    verified: true,
    date: '2026-05-30',
  },
  {
    id: 'r6',
    name: 'Fatima K.',
    location: 'Hyderabad',
    rating: 4,
    title: 'Guava Chili is the sleeper hit',
    body: 'Ordered the variety pack expecting to like the citrus ones. Guava Chili is the one I keep reaching for. The heat is subtle — it arrives after you swallow.',
    flavour: 'guava-chili',
    verified: true,
    date: '2026-09-05',
  },
];

export const reviewStats = {
  count: 2847,
  average: 4.7,
  wouldRecommend: 0.93,
  distribution: [
    { stars: 5, share: 0.78 },
    { stars: 4, share: 0.15 },
    { stars: 3, share: 0.04 },
    { stars: 2, share: 0.02 },
    { stars: 1, share: 0.01 },
  ],
};

export type CommunityPost = {
  id: string;
  handle: string;
  caption: string;
  flavour: string;
  likes: number;
};

export const communityPosts: CommunityPost[] = [
  { id: 'c1', handle: '@tiffin.diaries', caption: 'Sunday thali, Jeera Fizz, no notes', flavour: 'jeera-fizz', likes: 1240 },
  { id: 'c2', handle: '@liftwithnaz', caption: 'Post-session salt situation', flavour: 'nimbu-masala-fizz', likes: 2891 },
  { id: 'c3', handle: '@thekokumkid', caption: 'Coastal summer in a can', flavour: 'kokum-burst', likes: 976 },
  { id: 'c4', handle: '@brunchbombay', caption: 'Orange Masala + gin. Trust me.', flavour: 'orange-masala', likes: 3410 },
  { id: 'c5', handle: '@purple.tongue.club', caption: 'Jamun season is a lifestyle', flavour: 'jamun-pop', likes: 1855 },
  { id: 'c6', handle: '@thedeskrunner', caption: '3pm and still awake, no caffeine', flavour: 'ginger-lime-lift', likes: 742 },
];

export const press = [
  'Featured in India FMCG Review',
  'Best New Beverage — Food Forward Awards',
  '10,000+ subscribers',
  'Stocked in 400+ stores',
];
