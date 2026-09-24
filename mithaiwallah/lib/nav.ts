export const NAV = [
  { href: '/sweets', label: 'Sweets' },
  { href: '/corporate-gifting', label: 'Corporate' },
  { href: '/wedding-gifting', label: 'Weddings' },
  { href: '/wholesale', label: 'Wholesale' },
  { href: '/manufacturing', label: 'Our Craft' },
  { href: '/journal', label: 'Journal' },
] as const;

export const FOOTER_NAV = [
  {
    title: 'Sweets',
    links: [
      { href: '/sweets/milk-cake', label: 'Milk Cake' },
      { href: '/sweets/kalakand', label: 'Kalakand' },
      { href: '/sweets/malai-barfi', label: 'Malai Barfi' },
      { href: '/sweets/peda', label: 'Peda' },
      { href: '/sweets/kunda', label: 'Kunda' },
      { href: '/sweets/bikaneri-cake', label: 'Bikaneri Cake' },
    ],
  },
  {
    title: 'Gifting',
    links: [
      { href: '/corporate-gifting', label: 'Corporate Gifting' },
      { href: '/wedding-gifting', label: 'Wedding Gifting' },
      { href: '/festive-hampers', label: 'Festive Hampers' },
      { href: '/brochure/corporate', label: 'Corporate Catalogue' },
      { href: '/brochure/wedding', label: 'Wedding Catalogue' },
    ],
  },
  {
    title: 'Business',
    links: [
      { href: '/wholesale', label: 'Bulk & Wholesale' },
      { href: '/wholesale#private-label', label: 'Private Label' },
      { href: '/wholesale#export', label: 'Export' },
      { href: '/franchise', label: 'Franchise' },
      { href: '/franchise#distributors', label: 'Distributors' },
    ],
  },
  {
    title: 'Company',
    links: [
      { href: '/about', label: 'Our Story' },
      { href: '/manufacturing', label: 'Manufacturing' },
      { href: '/journal', label: 'Journal' },
      { href: '/contact', label: 'Contact' },
      { href: '/privacy', label: 'Privacy' },
    ],
  },
] as const;
