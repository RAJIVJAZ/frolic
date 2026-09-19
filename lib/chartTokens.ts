/**
 * Chart colour tokens.
 *
 * The brand primaries are tuned for large areas on cream and are far too light
 * to work as data marks — #B8F135 lands at 1.32:1 against our surface. These
 * are the darker steps from the same ramps, checked against the light chart
 * surface (#FFFDF7) for lightness band, chroma floor, CVD separation and 3:1
 * contrast. Every chart on the site draws from this list, in this order.
 *
 * Scope: light surface only. A dark-surface chart needs its own steps selected
 * and re-validated — the light set does not survive being flipped.
 */
export const CHART = {
  surface: '#FFFDF7',
  /** Fixed categorical order. Assign by entity, never by rank, never cycled. */
  categorical: ['#5C8310', '#6B2E8F', '#BC4104', '#1A8F69'] as const,
  /** The FROLIC bar in any comparison. */
  highlight: '#5C8310',
  /** Context bars the highlight is measured against. */
  context: '#B8AFA2',
  grid: 'rgba(20,17,15,0.10)',
  ink: '#14110F',
  inkMuted: '#5C544D',
} as const;
