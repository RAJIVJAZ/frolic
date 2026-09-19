export type Faq = { question: string; answer: string };

/** Surfaced on the homepage as FAQPage schema and rendered on /faq. */
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
