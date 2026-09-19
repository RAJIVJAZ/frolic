import type { Product } from '@/lib/products';

/**
 * Nutrition panel, laid out to mirror the printed label on the can so the two
 * can be checked against each other. Figures are per 250 ml serving.
 */
export function NutritionPanel({ product }: { product: Product }) {
  const n = product.nutrition;

  const rows: { label: string; value: string; indent?: boolean; bold?: boolean }[] = [
    { label: 'Energy', value: `${n.energyKcal} kcal`, bold: true },
    { label: 'Total Fat', value: `${n.totalFatG} g` },
    { label: 'Total Carbohydrate', value: `${n.totalSugarG + n.dietaryFibreG} g`, bold: true },
    { label: 'Dietary Fibre', value: `${n.dietaryFibreG} g`, indent: true },
    { label: 'of which prebiotic fibre', value: `${n.prebioticFibreG} g`, indent: true },
    { label: 'Total Sugars', value: `${n.totalSugarG} g`, indent: true },
    { label: 'of which added sugars', value: `${n.addedSugarG} g`, indent: true },
    { label: 'Protein', value: `${n.proteinG} g` },
    { label: 'Sodium', value: `${n.sodiumMg} mg` },
    { label: 'Caffeine', value: n.caffeineMg === 0 ? 'Nil' : `${n.caffeineMg} mg` },
  ];

  return (
    <div className="rounded-card border-2 border-charcoal bg-cream p-5">
      <h3 className="font-display text-step-2 leading-none">Nutrition</h3>
      <p className="mt-1.5 font-mono text-[0.66rem] uppercase tracking-[0.14em] text-charcoal-muted">
        Per {n.servingSize} serving · 1 serving per can
      </p>

      <table className="mt-4 w-full border-collapse text-step--1">
        <caption className="sr-only">
          Nutrition information for FROLIC {product.name}, per {n.servingSize}
        </caption>
        <tbody>
          {rows.map((row) => (
            <tr key={row.label} className="border-t border-charcoal-line">
              <th
                scope="row"
                className={[
                  'py-2 text-left font-normal',
                  row.indent ? 'pl-4 text-charcoal-muted' : '',
                  row.bold ? 'font-bold' : '',
                ].join(' ')}
              >
                {row.label}
              </th>
              <td
                className={[
                  'py-2 text-right tabular-nums',
                  row.bold ? 'font-bold' : '',
                  row.indent ? 'text-charcoal-muted' : '',
                ].join(' ')}
              >
                {row.value}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <p className="mt-4 border-t-2 border-charcoal pt-3 text-[0.7rem] leading-relaxed text-charcoal-muted">
        Values are typical and may vary marginally by batch. Contains no artificial colours. Not a
        significant source of trans fat or cholesterol.
      </p>
    </div>
  );
}
