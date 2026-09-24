/**
 * Journal posts. Each is written to one search intent from the keyword map in
 * docs/02-seo-strategy.md; the full 12-month editorial plan is there too.
 *
 * Body blocks are plain data so posts can move to a CMS later without
 * rewriting the renderer.
 */

export type Block =
  | { type: 'p'; text: string }
  | { type: 'h2'; text: string }
  | { type: 'ul'; items: string[] }
  | { type: 'table'; head: string[]; rows: string[][] };

export type Post = {
  slug: string;
  title: string;
  description: string;
  category: 'Know Your Mithai' | 'Corporate Gifting' | 'Weddings' | 'Festivals';
  date: string;
  readMinutes: number;
  keyword: string;
  body: Block[];
};

export const POSTS: Post[] = [
  {
    slug: 'milk-cake-vs-kalakand',
    title: 'Milk Cake vs Kalakand: What Is the Difference?',
    description:
      'Both are grainy milk sweets, both are loved, and they are often confused. Here is how milk cake and kalakand differ in how they are made, how they taste and how long they keep.',
    category: 'Know Your Mithai',
    date: '2026-09-24',
    readMinutes: 5,
    keyword: 'milk cake vs kalakand',
    body: [
      { type: 'p', text: 'Put a piece of milk cake and a piece of kalakand side by side and most people can tell them apart at a glance — one golden with a dark caramel heart, the other pale and soft. But ask what actually makes them different and the answers get vague. Both start with milk. Both are grainy. So what is going on?' },
      { type: 'h2', text: 'How each one is made' },
      { type: 'p', text: 'Milk cake is milk reduced for a long time over steady heat. As it thickens, a little souring agent helps it form grains, and sugar goes in. The cooking continues until the sugars caramelise — which is why a slab of milk cake has a toffee-coloured centre where the heat was greatest, fading to lighter, grainy edges.' },
      { type: 'p', text: 'Kalakand is gentler. Fresh chhena (cottage cheese) is folded into reduced milk and cooked only until the mixture holds together. It is taken off the heat long before anything caramelises, so it stays pale, moist and soft, with a fresh, milky flavour.' },
      { type: 'h2', text: 'Side by side' },
      {
        type: 'table',
        head: ['', 'Milk Cake', 'Kalakand'],
        rows: [
          ['Colour', 'Golden with a caramel-brown centre', 'Pale ivory'],
          ['Texture', 'Firm, grainy, slightly chewy', 'Soft, moist, delicately grainy'],
          ['Flavour', 'Deep caramel and cooked milk', 'Fresh milk and cardamom'],
          ['Keeps', 'About 10 days at room temperature', 'About 3 days, refrigerated'],
          ['Best for', 'Gift boxes, travel, distribution', 'Eating fresh, close to home'],
        ],
      },
      { type: 'h2', text: 'Which should you choose?' },
      { type: 'p', text: 'If the sweets need to travel — a corporate gift box going to three cities, a hamper for relatives abroad — milk cake is the safer choice. It holds its shape and keeps well. Kalakand is at its best within a day or two of being made, which makes it ideal for a family table, a puja or a wedding close to where it was cooked.' },
      { type: 'p', text: 'For a mixed gift box, the two work beautifully together: the dark caramel of milk cake next to the pale softness of kalakand looks as good as it tastes.' },
      { type: 'h2', text: 'How to serve them' },
      { type: 'ul', items: ['Milk cake: at room temperature, cut with a warm knife, with strong chai.', 'Kalakand: from the fridge, rested for ten minutes, on its own after a meal.', 'Both: in a single layer, so the grain is not crushed.'] },
    ],
  },
  {
    slug: 'corporate-diwali-gifting-guide',
    title: 'The Corporate Diwali Gifting Guide: Timelines, Budgets and Branding',
    description:
      'A practical guide for HR, admin and procurement teams planning Diwali gifts — how early to start, how to set a budget per box, what branding options exist and how to avoid last-week chaos.',
    category: 'Corporate Gifting',
    date: '2026-09-24',
    readMinutes: 7,
    keyword: 'corporate diwali gifting',
    body: [
      { type: 'p', text: 'Every year the same thing happens in hundreds of offices: Diwali is three weeks away, someone realises the gifts have not been ordered, and the options shrink to whatever is left on the shelf. The difference between a gift people remember and one they forget is rarely the budget. It is the calendar.' },
      { type: 'h2', text: 'Start eight weeks out' },
      { type: 'p', text: 'Work back from the date you want boxes on desks. Eight weeks gives you time to collect the headcount and addresses, taste samples, approve a branded proof and still have production scheduled before the festive rush.' },
      {
        type: 'table',
        head: ['When', 'What to do'],
        rows: [
          ['8 weeks before', 'Brief your supplier: headcount, budget per box, cities, delivery dates'],
          ['6 weeks before', 'Taste samples; choose the assortment and the box'],
          ['4 weeks before', 'Approve the branded proof and the final delivery list'],
          ['2 weeks before', 'Production and assembly'],
          ['Festival week', 'Delivery, with tracking shared with your admin team'],
        ],
      },
      { type: 'h2', text: 'Setting a budget per box' },
      { type: 'p', text: 'Decide on a budget per recipient, not a total — it makes every later decision easier. Most companies run two or three tiers: one box for the whole team, a richer hamper for senior leadership, and a keepsake gift for the most important clients. Ask your supplier to build to each budget rather than choosing from a fixed list.' },
      { type: 'h2', text: 'Branding that feels like a gift, not merchandise' },
      { type: 'ul', items: ['Foil or emboss the logo small and precise on the lid — restraint reads as premium.', 'Add a printed card with a short note from leadership; it gets read more than anything on the box.', 'Match the ribbon or sleeve to your brand colour rather than printing the logo everywhere.'] },
      { type: 'h2', text: 'Delivery without the drama' },
      { type: 'p', text: 'If your team is spread across cities or working from home, send the supplier a clean address list in a spreadsheet — name, full address, pin code and phone number — at least two weeks before dispatch. Choose sweets that travel well, such as milk cake, peda and Bikaneri cake, for anything going beyond a day’s journey.' },
      { type: 'h2', text: 'A checklist to forward to your team' },
      { type: 'ul', items: ['Headcount per tier confirmed', 'Budget per box agreed with finance', 'Samples tasted and approved', 'Logo files (vector) sent to supplier', 'Branded proof signed off', 'Delivery list sent, with contact numbers', 'GST details shared for invoicing'] },
    ],
  },
  {
    slug: 'wedding-mithai-boxes-guide',
    title: 'Wedding Mithai Boxes: How Many to Order and How to Personalise Them',
    description:
      'A planning guide for families and wedding planners: which boxes you need for each ceremony, how to estimate quantities, and the personalisation options that make wedding sweets memorable.',
    category: 'Weddings',
    date: '2026-09-24',
    readMinutes: 6,
    keyword: 'wedding mithai boxes',
    body: [
      { type: 'p', text: 'Sweets run through an Indian wedding from the first conversation between two families to the last guest leaving the reception. Planning them ceremony by ceremony — rather than as one big order — makes the numbers far easier and the result far more beautiful.' },
      { type: 'h2', text: 'The boxes most weddings need' },
      { type: 'ul', items: ['Roka or engagement boxes for the two families', 'Invitation boxes that travel with the wedding card', 'Family hampers for close relatives and elders', 'Mehendi and sangeet assortments for guests', 'Return-gift boxes for every guest at the reception'] },
      { type: 'h2', text: 'Estimating quantities' },
      { type: 'p', text: 'Start from your guest list and count households, not heads, for invitation boxes and family hampers. Return gifts are usually one per household or one per couple. Add a buffer of about five per cent for the relatives who appear on the day and the boxes you forgot you promised.' },
      {
        type: 'table',
        head: ['Box', 'Count by', 'Typical buffer'],
        rows: [
          ['Invitation box', 'Invited households', '+5%'],
          ['Family hamper', 'Close-family households', '+2–3 boxes'],
          ['Return gift', 'Attending households or couples', '+5%'],
        ],
      },
      { type: 'h2', text: 'Personalisation that people notice' },
      { type: 'ul', items: ['Your monogram or both names, foiled on the lid', 'Box and ribbon colours matched to the wedding palette', 'A printed message card — a blessing, a thank-you, or the wedding date', 'A different assortment for elders (softer sweets) and for younger guests'] },
      { type: 'h2', text: 'When to book' },
      { type: 'p', text: 'As soon as the date is fixed. Custom-printed boxes need time for a proof and printing, and popular muhurat dates fill quickly for every supplier. Booking early also leaves room for a tasting with both families — often one of the happiest hours of the whole planning process.' },
    ],
  },
];

export const postBySlug = (slug: string) => POSTS.find((p) => p.slug === slug);
