/**
 * Testimonials.
 *
 * ┌──────────────────────────────────────────────────────────────────────┐
 * │  EVERY ENTRY BELOW IS A SAMPLE, WRITTEN TO SHOW THE LAYOUT.           │
 * │                                                                      │
 * │  Publishing invented reviews as real ones breaks the Consumer        │
 * │  Protection Act and the BIS standard on online reviews (IS 19000),   │
 * │  and one sharp-eyed procurement manager will ask for the reference.  │
 * │  While `sample` is true the site labels the section as illustrative │
 * │  and emits no Review schema. Replace each with a real client's own   │
 * │  words — with their written consent to publish their name — and set │
 * │  `sample: false`.                                                    │
 * └──────────────────────────────────────────────────────────────────────┘
 */

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  segment: 'Corporate' | 'Wedding' | 'Hospitality' | 'Retail' | 'Trade';
  sample: boolean;
};

export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      'We sent four hundred Diwali boxes to three cities and not one arrived damaged. The logo sleeve looked better than our own merchandise.',
    name: 'Head of People',
    role: 'IT services company, Noida',
    segment: 'Corporate',
    sample: true,
  },
  {
    quote:
      'The return-gift boxes matched the wedding colours exactly. Guests kept asking where the kalakand came from.',
    name: 'Wedding planner',
    role: 'Destination weddings, Lucknow',
    segment: 'Wedding',
    sample: true,
  },
  {
    quote:
      'Consistent quality batch after batch, which is the only thing a hotel kitchen really cares about. The milk cake trays go straight onto the buffet.',
    name: 'Executive chef',
    role: 'Heritage hotel, Varanasi',
    segment: 'Hospitality',
    sample: true,
  },
  {
    quote:
      'We moved our client gifting to Mithaiwallah because they plan it with us in September instead of panicking with us in November.',
    name: 'Admin & procurement lead',
    role: 'Regional bank office, Prayagraj',
    segment: 'Corporate',
    sample: true,
  },
  {
    quote:
      'Their private-label peda sits on our counter under our own name. Customers cannot tell it is not made in the back room — which is the point.',
    name: 'Owner',
    role: 'Sweet shop, Kanpur',
    segment: 'Trade',
    sample: true,
  },
];

export const TESTIMONIALS_ARE_SAMPLES = TESTIMONIALS.some((t) => t.sample);
