/**
 * Signed currency. The minus sign belongs before the symbol (−₹4.42), not
 * after it (₹-4.42) — the latter reads as a typo to anyone who reads accounts.
 */
export function money(n, dp = 2) {
  const sign = n < 0 ? '\u2212' : '';
  return `${sign}\u20B9${Math.abs(n).toFixed(dp)}`;
}

/** Signed percentage using a true minus sign. */
export function pctSigned(n, dp = 1) {
  const sign = n < 0 ? '\u2212' : '';
  return `${sign}${Math.abs(n).toFixed(dp)}%`;
}

export const fmt = {
  cr: (n) => `₹${n.toFixed(2)} Cr`,
  cr0: (n) => `₹${n.toFixed(0)} Cr`,
  inr: (n) => `₹${Number(n).toLocaleString('en-IN')}`,
  pct: (n) => `${n.toFixed(1)}%`,
  num: (n) => Number(n).toLocaleString('en-IN'),
};

/** Horizontal bar row for print-safe charts. */
export function barRow(label, value, maxValue, display, cls = '') {
  const w = Math.max((value / maxValue) * 100, value > 0 ? 0.8 : 0);
  return `<div class="bar-row">
    <span class="bar-label">${label}</span>
    <span class="bar-track"><span class="bar-fill ${cls}" style="width:${w.toFixed(1)}%"></span></span>
    <span class="bar-val">${display}</span>
  </div>`;
}
