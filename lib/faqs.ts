export type Faq = { question: string; answer: string };

/**
 * Pre-launch FAQs. These replace the commerce questions (shipping, returns,
 * subscriptions) that applied when this was a storefront — none of which can
 * be answered honestly before there is a product.
 */
export const PRELAUNCH_FAQS: Faq[] = [
  {
    question: 'Can I buy FROLIC yet?',
    answer:
      'No. FROLIC is pre-launch — the brand, range and plan exist, but no product has been manufactured. Joining the waitlist means you hear first when that changes.',
  },
  {
    question: 'When will FROLIC launch?',
    answer:
      'We are targeting first pilot production in 2027, with a regional launch in two cities to follow. We deliberately do not commit to a month, because beverage timelines depend on formulation and manufacturing partners we have not finalised.',
  },
  {
    question: 'Is FROLIC India\u2019s first prebiotic soda?',
    answer:
      'No. There are already prebiotic soda brands in the Indian market. FROLIC\u2019s difference is the flavour idiom \u2014 nimbu masala, aam panna, kokum, jeera \u2014 rather than being first.',
  },
  {
    question: 'What is a prebiotic soda?',
    answer:
      'A carbonated soft drink containing prebiotic fibre \u2014 plant fibres such as inulin and acacia gum that humans cannot digest and that reach the colon intact. FROLIC targets 7 g per 250 ml can.',
  },
  {
    question: 'Is that the same as a probiotic drink?',
    answer:
      'No. Probiotic drinks contain live bacteria. Prebiotics are the fibre those bacteria feed on. Because FROLIC contains no live cultures, it is shelf-stable and needs no refrigeration before opening.',
  },
  {
    question: 'How much sugar will FROLIC contain?',
    answer:
      'The formulation target is roughly a quarter of the sugar in a conventional soft drink. Final values will be confirmed by batch analysis after pilot production \u2014 we are not publishing a nutrition panel we cannot yet verify.',
  },
  {
    question: 'Will it contain caffeine?',
    answer: 'No. All FROLIC concepts are designed to be caffeine-free.',
  },
  {
    question: 'Who is building FROLIC?',
    answer:
      'Rajeev Jaiswal, an electrical engineer and food manufacturer based in Prayagraj, Uttar Pradesh, who has run Anuradha Enterprises — a dairy processing business — single-handedly for two years. He is currently the sole founder and is recruiting a founding team.',
  },
  {
    question: 'Can I stock FROLIC in my store or caf\u00e9?',
    answer:
      'Not yet, but you can register interest on the distributors page. Trade pricing and terms are not finalised because they depend on first production economics.',
  },
  {
    question: 'Are you raising investment?',
    answer:
      'Conversations are open. FROLIC is pre-revenue and pre-production, and a detailed project report covering market, unit economics and funding plan is available on request via the investors page.',
  },
];

/** Kept for the FAQ page listing. */
export const HOME_FAQS: Faq[] = [
  {
    question: 'What is a prebiotic soda?',
    answer:
      'A prebiotic soda is a carbonated soft drink that contains prebiotic fibre — plant fibres such as inulin and acacia gum that humans cannot digest and that reach the colon intact. FROLIC contains 7 g of prebiotic fibre per 250 ml can.',
  },
  {
    question: 'How much sugar is in FROLIC?',
    answer:
      'Between 4 g and 8 g of total sugar per 250 ml can depending on the flavour, of which 2–5 g is added sugar. A typical regular cola contains around 27 g of sugar in the same serving.',
  },
  {
    question: 'Is FROLIC the same as a probiotic drink?',
    answer:
      'No. Probiotic drinks contain live bacteria. FROLIC contains prebiotic fibre, which is the food those bacteria use. Because there are no live cultures, FROLIC is shelf-stable and does not need refrigeration before opening.',
  },
  {
    question: 'Does FROLIC contain caffeine?',
    answer: 'No. All ten FROLIC flavours are caffeine-free.',
  },
  {
    question: 'Can children drink FROLIC?',
    answer:
      'FROLIC is a caffeine-free soft drink with less sugar than a conventional soda. As with any high-fibre food, introduce it gradually. If you have specific concerns, speak to a qualified healthcare professional.',
  },
  {
    question: 'Where does FROLIC deliver?',
    answer:
      'We ship across India. Orders over ₹999 ship free; below that a flat ₹79 applies. Metro orders typically arrive in 2–4 working days.',
  },
  {
    question: 'How do I pause or cancel a subscription?',
    answer:
      'From your account dashboard. You can skip a delivery, change flavours, change cadence, pause indefinitely or cancel outright — all self-serve, up to 48 hours before your next box ships.',
  },
  {
    question: 'Is FROLIC suitable for diabetics?',
    answer:
      'FROLIC contains less sugar than conventional soft drinks, but it is not a medical product and we do not make claims about blood sugar. If you are managing diabetes, please consult your doctor or dietitian before changing what you drink.',
  },
];
