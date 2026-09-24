/**
 * Lead types and their form fields — shared by the enquiry form (client) and
 * /api/lead (server), so a field cannot exist on one side and not the other.
 *
 * No secrets here: this module is imported into the browser bundle.
 */

export type LeadType = 'corporate' | 'wedding' | 'wholesale' | 'franchise' | 'retail';

export type FieldDef = {
  name: string;
  label: string;
  type: 'text' | 'select' | 'date' | 'number';
  options?: string[];
  placeholder?: string;
  required?: boolean;
  /** Tailwind column span on the 2-column grid. */
  wide?: boolean;
};

export type LeadTypeDef = {
  label: string;
  short: string;
  /** Shown above the form when this type is picked. */
  pitch: string;
  /** Label for the organisation field, or null to hide it. */
  companyLabel: string | null;
  fields: FieldDef[];
  /** Opening line of the WhatsApp message after submitting. */
  whatsappIntro: string;
};

const QTY = ['Under 25', '25–100', '100–250', '250–500', '500–1,000', '1,000+'];
const BUDGET = ['Under ₹500', '₹500–₹1,000', '₹1,000–₹2,500', '₹2,500–₹5,000', '₹5,000+', 'Need guidance'];

export const LEAD_TYPES: Record<LeadType, LeadTypeDef> = {
  corporate: {
    label: 'Corporate gifting',
    short: 'Corporate',
    pitch: 'Employee, client and festive gifting with your branding — planned to your dates.',
    companyLabel: 'Company',
    fields: [
      { name: 'designation', label: 'Your role', type: 'text', placeholder: 'HR, Admin, Procurement…' },
      { name: 'occasion', label: 'Occasion', type: 'select', options: ['Diwali', 'New Year', 'Holi', 'Raksha Bandhan', 'Client gifting', 'Employee milestone', 'Event / conference', 'Other'] },
      { name: 'quantity', label: 'Number of boxes', type: 'select', options: QTY, required: true },
      { name: 'budget', label: 'Budget per box', type: 'select', options: BUDGET },
      { name: 'event_date', label: 'Delivery by', type: 'date' },
      { name: 'branding', label: 'Custom branding', type: 'select', options: ['Yes — logo on box', 'Yes — logo + message card', 'No branding needed', 'Not sure yet'] },
    ],
    whatsappIntro: 'Hello Mithaiwallah, I have just sent a corporate gifting enquiry',
  },
  wedding: {
    label: 'Wedding gifting',
    short: 'Wedding',
    pitch: 'Hampers, return gifts and invitation boxes designed around your wedding.',
    companyLabel: null,
    fields: [
      { name: 'relation', label: 'You are', type: 'select', options: ['Bride / groom', 'Family member', 'Wedding planner', 'Event organiser', 'Banquet / venue'] },
      { name: 'event_date', label: 'Wedding date', type: 'date', required: true },
      { name: 'quantity', label: 'Number of boxes', type: 'select', options: QTY, required: true },
      { name: 'gift_type', label: 'Looking for', type: 'select', options: ['Return gifts', 'Wedding hampers', 'Invitation boxes', 'Shagun / family boxes', 'A mix of these'] },
      { name: 'budget', label: 'Budget per box', type: 'select', options: BUDGET },
      { name: 'branding', label: 'Personalisation', type: 'select', options: ['Monogram / names on box', 'Custom message card', 'Theme colours', 'All of these', 'Not sure yet'] },
    ],
    whatsappIntro: 'Hello Mithaiwallah, I have just sent a wedding gifting enquiry',
  },
  wholesale: {
    label: 'Bulk & wholesale',
    short: 'Wholesale',
    pitch: 'Regular supply for hotels, restaurants, caterers, sweet shops and export buyers — or private label.',
    companyLabel: 'Business name',
    fields: [
      { name: 'business_type', label: 'Business type', type: 'select', required: true, options: ['Hotel', 'Restaurant / café', 'Caterer', 'Sweet shop', 'Retail / supermarket', 'Exporter / importer', 'Private label', 'Other'] },
      { name: 'products', label: 'Sweets of interest', type: 'text', placeholder: 'Milk cake, peda…' },
      { name: 'volume', label: 'Monthly volume', type: 'select', options: ['Under 50 kg', '50–200 kg', '200–500 kg', '500 kg–1 tonne', '1 tonne+'] },
      { name: 'frequency', label: 'Order frequency', type: 'select', options: ['Weekly', 'Fortnightly', 'Monthly', 'Seasonal / festive', 'One-time bulk'] },
    ],
    whatsappIntro: 'Hello Mithaiwallah, I have just sent a wholesale enquiry',
  },
  franchise: {
    label: 'Franchise & distribution',
    short: 'Franchise',
    pitch: 'Bring Mithaiwallah to your city as a franchise partner or distributor.',
    companyLabel: 'Current business (if any)',
    fields: [
      { name: 'interest', label: 'Interested in', type: 'select', required: true, options: ['Franchise outlet', 'Distributorship', 'Super-stockist', 'Export partnership'] },
      { name: 'territory', label: 'Target city / territory', type: 'text', placeholder: 'Lucknow, Varanasi, Indore…' },
      { name: 'investment', label: 'Investment capacity', type: 'select', options: ['Under ₹10 lakh', '₹10–25 lakh', '₹25–50 lakh', '₹50 lakh+', 'Prefer to discuss'] },
      { name: 'experience', label: 'Experience in food / FMCG', type: 'select', options: ['None yet', 'Under 3 years', '3–10 years', '10+ years'] },
    ],
    whatsappIntro: 'Hello Mithaiwallah, I have just sent a franchise / distribution enquiry',
  },
  retail: {
    label: 'Order for family & friends',
    short: 'Family order',
    pitch: 'Boxes for home, festivals and the people you love.',
    companyLabel: null,
    fields: [
      { name: 'products', label: 'Sweets you would like', type: 'text', placeholder: 'Kalakand, milk cake…', wide: true },
      { name: 'quantity', label: 'Quantity', type: 'select', options: ['1–2 boxes', '3–5 boxes', '6–10 boxes', '10–25 boxes'] },
      { name: 'event_date', label: 'Needed by', type: 'date' },
    ],
    whatsappIntro: 'Hello Mithaiwallah, I have just placed an order enquiry',
  },
};

export const LEAD_TYPE_KEYS = Object.keys(LEAD_TYPES) as LeadType[];

export const isLeadType = (v: unknown): v is LeadType => typeof v === 'string' && v in LEAD_TYPES;

/** Every type-specific field name, flattened — the server's allow-list. */
export const DETAIL_FIELDS = new Set(
  LEAD_TYPE_KEYS.flatMap((k) => LEAD_TYPES[k].fields.map((f) => f.name)).filter((n) => n !== 'event_date'),
);

export const PHONE_RE = /^\+?[0-9][0-9\s-]{8,16}$/;
export const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

export const LEAD_STATUSES = ['new', 'contacted', 'qualified', 'quoted', 'won', 'lost'] as const;
export type LeadStatus = (typeof LEAD_STATUSES)[number];
