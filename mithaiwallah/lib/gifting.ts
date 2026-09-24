/**
 * Gifting programmes — corporate, wedding, festive.
 *
 * Collections are described by what is inside, never by price: B2B gifting is
 * quoted on volume, branding and delivery spread, and a list price on the site
 * becomes the ceiling every negotiation starts from.
 */

export type GiftCollection = {
  name: string;
  /** What the box looks and feels like. */
  finish: string;
  contents: string[];
  bestFor: string;
  /** Tints for the box illustration. */
  box: 'maroon' | 'ivory' | 'gold';
};

export type Offering = { title: string; body: string };

export const GIFT_COLLECTIONS: GiftCollection[] = [
  {
    name: 'The Classic Box',
    finish: 'Rigid maroon box, gold foil lid, four-cavity tray',
    contents: ['Milk Cake', 'Kalakand', 'Malai Barfi', 'Peda'],
    bestFor: 'Employee gifting at scale, return gifts, festive distribution',
    box: 'maroon',
  },
  {
    name: 'The Heritage Box',
    finish: 'Ivory linen box, embossed monogram, magnetic closure',
    contents: ['Six signature sweets', 'Roasted almonds & cashews', 'Printed note card'],
    bestFor: 'Client gifting, senior teams, wedding family hampers',
    box: 'ivory',
  },
  {
    name: 'The Royal Trunk',
    finish: 'Velvet-lined keepsake trunk with brass clasp',
    contents: ['Bikaneri Cake', 'Assorted signature sweets', 'Premium dry fruits', 'Brass diya or keepsake'],
    bestFor: 'Leadership and key-account gifting, wedding VIP hampers',
    box: 'gold',
  },
];

export const CORPORATE_OFFERINGS: Offering[] = [
  {
    title: 'Employee Gifts',
    body: 'Hundreds of identical boxes, each arriving perfect, on the day you choose — delivered to one office or split across cities.',
  },
  {
    title: 'Client Gifts',
    body: 'A box that speaks for your brand before the lid comes off: your logo, your colours and a note from your leadership.',
  },
  {
    title: 'Festive Gifts',
    body: 'Diwali, Holi, Raksha Bandhan, New Year — planned with you weeks ahead, so the festival week is calm on your side.',
  },
  {
    title: 'Luxury Gift Boxes',
    body: 'Keepsake trunks and velvet-lined hampers for leadership, partners and the relationships that matter most.',
  },
];

export const WEDDING_OFFERINGS: Offering[] = [
  {
    title: 'Wedding Hampers',
    body: 'Family hampers for the baraat, the bride’s side and every elder — built around the sweets your family actually loves.',
  },
  {
    title: 'Return Gifts',
    body: 'Small, beautiful boxes that every guest takes home — matched to your wedding colours and ready at the venue.',
  },
  {
    title: 'Premium Invitation Boxes',
    body: 'A mithai box that carries your wedding card — the first taste of the celebration, delivered with the invitation.',
  },
  {
    title: 'Customised Packaging',
    body: 'Box colour, ribbon, monogram and message designed around your wedding, with a proof you approve before we print.',
  },
];

export const CUSTOMISATIONS = [
  { title: 'Custom logo printing', body: 'Foil, emboss or print your logo or wedding monogram on the lid and sleeve.' },
  { title: 'Custom messages', body: 'A printed card or a sleeve message in English, Hindi or both.' },
  { title: 'Custom packaging', body: 'Box colour, ribbon, tray layout and outer carton chosen to match your theme.' },
  { title: 'Custom assortments', body: 'Pick the sweets, the count and the weight — or let us recommend a mix.' },
] as const;

export const FESTIVALS = [
  'Diwali',
  'Raksha Bandhan',
  'Holi',
  'Bhai Dooj',
  'Karva Chauth',
  'Navratri & Dussehra',
  'Eid',
  'Christmas & New Year',
  'Makar Sankranti',
  'Weddings & Anniversaries',
] as const;

/** Steps shown on both gifting pages. */
export const GIFTING_PROCESS = [
  { step: 'Brief', body: 'Tell us the occasion, quantity, budget per box and delivery dates.' },
  { step: 'Curate', body: 'We recommend an assortment and box, and send tasting samples on request.' },
  { step: 'Design', body: 'Your logo or monogram goes on a digital proof you approve before print.' },
  { step: 'Craft', body: 'Sweets are made fresh for your order — never pulled from old stock.' },
  { step: 'Deliver', body: 'One address or hundreds, across India, on the date you set.' },
] as const;
