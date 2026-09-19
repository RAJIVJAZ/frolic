import { defineType, defineField } from 'sanity';

/**
 * Ingredient — powers the explorer on /ingredients and the links from a PDP.
 *
 * `benefit` and `detail` are the highest-risk copy fields on the site: they
 * describe what an ingredient IS or DOES in the can, never a health outcome
 * for the drinker. The validation below is a speed bump, not a substitute for
 * the review process in docs/13-compliance-claims.md.
 */
const BANNED = [
  'cures', 'treats', 'prevents', 'heals', 'boosts immunity',
  'detox', 'detoxifies', 'burns fat', 'weight loss', 'anti-ageing',
];

export const ingredient = defineType({
  name: 'ingredient',
  title: 'Ingredient',
  type: 'document',
  fields: [
    defineField({ name: 'slug', type: 'slug', options: { source: 'name' }, validation: (r) => r.required() }),
    defineField({ name: 'name', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'botanical', title: 'Botanical name', type: 'string' }),
    defineField({
      name: 'category',
      type: 'string',
      options: { list: ['Fibre', 'Botanical', 'Fruit', 'Spice', 'Mineral'] },
      validation: (r) => r.required(),
    }),
    defineField({ name: 'origin', title: 'Where it comes from', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'flavourProfile', title: 'What it tastes like', type: 'string', validation: (r) => r.required() }),
    defineField({
      name: 'benefit',
      title: 'What it does in the can',
      type: 'text',
      rows: 3,
      description: 'Function, not health outcome. "A fibre that reaches the colon intact", not "improves digestion".',
      validation: (r) =>
        r.required().custom((value?: string) => {
          const hit = BANNED.find((w) => value?.toLowerCase().includes(w));
          return hit ? `"${hit}" is a health claim and needs compliance sign-off.` : true;
        }),
    }),
    defineField({ name: 'detail', title: 'Long description', type: 'text', rows: 6, validation: (r) => r.required().min(200) }),
    defineField({ name: 'dose', title: 'Per-can inclusion', type: 'string', description: 'e.g. "4 g per can". Leave empty if not meaningful.' }),
    defineField({ name: 'accent', title: 'Accent colour', type: 'string', validation: (r) => r.required().regex(/^#[0-9a-fA-F]{6}$/) }),
    defineField({ name: 'inFlavours', title: 'Used in', type: 'array', of: [{ type: 'reference', to: [{ type: 'flavour' }] }] }),
  ],
  preview: { select: { title: 'name', subtitle: 'category' } },
});
