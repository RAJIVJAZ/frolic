import { defineType, defineField } from 'sanity';

/**
 * Flavour — the editorial half of a product.
 *
 * Commerce fields (price, SKU, inventory, variant IDs) are NOT here. They live
 * in Shopify and are merged at request time; see docs/08-shopify-architecture.md.
 * `handle` is the join key and must match the Shopify product handle exactly.
 */
export const flavour = defineType({
  name: 'flavour',
  title: 'Flavour',
  type: 'document',
  groups: [
    { name: 'identity', title: 'Identity', default: true },
    { name: 'editorial', title: 'Editorial' },
    { name: 'world', title: 'Visual world' },
    { name: 'nutrition', title: 'Nutrition' },
    { name: 'taxonomy', title: 'Quiz & merchandising' },
  ],
  fields: [
    defineField({
      name: 'handle',
      title: 'Handle',
      type: 'slug',
      group: 'identity',
      description: 'Must match the Shopify product handle exactly. Changing this breaks the merge.',
      options: { source: 'name', maxLength: 64 },
      validation: (r) => r.required(),
    }),
    defineField({ name: 'name', title: 'Full name', type: 'string', group: 'identity', validation: (r) => r.required() }),
    defineField({
      name: 'shortName',
      title: 'Short name',
      type: 'string',
      group: 'identity',
      description: 'Used on the can label and in tight UI. Keep under 18 characters.',
      validation: (r) => r.required().max(18),
    }),
    defineField({
      name: 'tagline',
      title: 'Tagline',
      type: 'string',
      group: 'editorial',
      description: 'One line, sentence case, ends with a full stop.',
      validation: (r) => r.required().max(70),
    }),
    defineField({
      name: 'notes',
      title: 'Tasting notes',
      type: 'array',
      of: [{ type: 'string' }],
      group: 'editorial',
      description: 'Exactly three, two words maximum each — they are printed on the can.',
      validation: (r) => r.required().length(3),
    }),
    defineField({
      name: 'story',
      title: 'Flavour story',
      type: 'text',
      rows: 6,
      group: 'editorial',
      validation: (r) => r.required().min(200).max(900),
    }),
    defineField({ name: 'ritual', title: 'How to drink it', type: 'text', rows: 2, group: 'editorial' }),
    defineField({ name: 'pairing', title: 'Goes with', type: 'text', rows: 2, group: 'editorial' }),
    defineField({
      name: 'heroIngredients',
      title: 'Hero ingredients',
      type: 'array',
      group: 'editorial',
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'name', type: 'string', validation: (r) => r.required() }),
          defineField({ name: 'role', type: 'string', description: 'What it contributes. Composition, never a health outcome.', validation: (r) => r.required() }),
          defineField({ name: 'ingredient', type: 'reference', to: [{ type: 'ingredient' }] }),
        ],
        preview: { select: { title: 'name', subtitle: 'role' } },
      }],
      validation: (r) => r.required().min(2).max(4),
    }),

    defineField({
      name: 'world',
      title: 'Visual world',
      type: 'object',
      group: 'world',
      description: 'These four values re-skin every surface this flavour appears on.',
      fields: [
        defineField({ name: 'base', title: 'Base hue', type: 'string', description: 'Hex. Can body, buttons, glow.', validation: (r) => r.required().regex(/^#[0-9a-fA-F]{6}$/) }),
        defineField({ name: 'deep', title: 'Deep shade', type: 'string', description: 'Hex. Gradient end, meters. Must reach 3:1 on cream.', validation: (r) => r.required().regex(/^#[0-9a-fA-F]{6}$/) }),
        defineField({ name: 'wash', title: 'Page wash', type: 'string', description: 'Hex. Very light tint behind the product.', validation: (r) => r.required().regex(/^#[0-9a-fA-F]{6}$/) }),
        defineField({ name: 'ink', title: 'Ink on base', type: 'string', description: 'Hex. Must reach 4.5:1 against the base hue. Charcoal #14110F or cream #FFFDF7.', validation: (r) => r.required().regex(/^#[0-9a-fA-F]{6}$/) }),
        defineField({ name: 'environment', title: 'Art-direction brief', type: 'text', rows: 3, description: 'One sentence for the photography or 3D team.' }),
      ],
      validation: (r) => r.required(),
    }),

    defineField({
      name: 'nutrition',
      title: 'Nutrition (per 250 ml)',
      type: 'object',
      group: 'nutrition',
      description: 'Legally sensitive. Changes require sign-off — see docs/13-compliance-claims.md.',
      fields: [
        defineField({ name: 'energyKcal', type: 'number', validation: (r) => r.required().min(0) }),
        defineField({ name: 'totalSugarG', type: 'number', validation: (r) => r.required().min(0) }),
        defineField({ name: 'addedSugarG', type: 'number', validation: (r) => r.required().min(0) }),
        defineField({ name: 'dietaryFibreG', type: 'number', validation: (r) => r.required().min(0) }),
        defineField({ name: 'prebioticFibreG', type: 'number', validation: (r) => r.required().min(0) }),
        defineField({ name: 'proteinG', type: 'number', initialValue: 0 }),
        defineField({ name: 'totalFatG', type: 'number', initialValue: 0 }),
        defineField({ name: 'sodiumMg', type: 'number', validation: (r) => r.required().min(0) }),
        defineField({ name: 'caffeineMg', type: 'number', initialValue: 0 }),
      ],
      validation: (r) =>
        r.required().custom((n: Record<string, number> | undefined) => {
          if (!n) return true;
          if (n.addedSugarG > n.totalSugarG) return 'Added sugar cannot exceed total sugar.';
          if (n.prebioticFibreG > n.dietaryFibreG) return 'Prebiotic fibre cannot exceed dietary fibre.';
          return true;
        }),
    }),

    defineField({ name: 'intensity', title: 'Intensity (1–5)', type: 'number', group: 'taxonomy', validation: (r) => r.required().min(1).max(5).integer() }),
    defineField({ name: 'sweetness', title: 'Sweetness (1–5)', type: 'number', group: 'taxonomy', validation: (r) => r.required().min(1).max(5).integer() }),
    defineField({
      name: 'profile',
      title: 'Flavour profile',
      type: 'array',
      group: 'taxonomy',
      of: [{ type: 'string' }],
      options: { list: ['citrus', 'spiced', 'fruity', 'tart', 'herbal', 'sweet'], layout: 'tags' },
      description: 'Drives quiz matching and shop filters.',
      validation: (r) => r.required().min(1),
    }),
    defineField({ name: 'bestFor', title: 'Best for', type: 'array', of: [{ type: 'string' }], group: 'taxonomy', options: { layout: 'tags' } }),
    defineField({ name: 'badge', title: 'Merchandising badge', type: 'string', group: 'taxonomy', description: 'e.g. "Most loved". Leave empty for none.' }),
    defineField({ name: 'isNew', type: 'boolean', group: 'taxonomy', initialValue: false }),
    defineField({ name: 'isBestseller', type: 'boolean', group: 'taxonomy', initialValue: false }),
    defineField({ name: 'lifestyleImages', title: 'Lifestyle imagery', type: 'array', group: 'world', of: [{ type: 'image', options: { hotspot: true }, fields: [defineField({ name: 'alt', type: 'string', validation: (r) => r.required() })] }] }),
  ],
  preview: {
    select: { title: 'name', subtitle: 'tagline', base: 'world.base' },
  },
});
