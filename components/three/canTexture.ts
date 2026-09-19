import * as THREE from 'three';

/**
 * Procedural can-label generator.
 *
 * Every FROLIC can label is drawn at runtime onto a 2D canvas and used as a
 * texture, rather than shipping ten baked PNGs. That keeps the 3D payload at
 * effectively zero bytes, lets a new flavour ship by adding one row to
 * lib/products.ts, and means the label always matches the flavour world tokens
 * exactly. Art direction for the photographic equivalent lives in
 * docs/07-3d-asset-spec.md.
 */

export type LabelSpec = {
  name: string;
  notes: string[];
  base: string;
  deep: string;
  ink: string;
  fibreGrams: number;
};

const W = 2048; // maps to the can circumference
const H = 1024; // maps to the label band height

function roundedRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number,
) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

/** Draws one complete lockup inside a half-width panel starting at `ox`. */
function drawPanel(ctx: CanvasRenderingContext2D, ox: number, spec: LabelSpec) {
  const PW = W / 2;
  const cx = ox + PW / 2;

  // —— Arc motif: three concentric rings behind the wordmark.
  ctx.save();
  ctx.globalAlpha = 0.16;
  ctx.strokeStyle = spec.ink;
  ctx.lineWidth = 6;
  for (let i = 0; i < 3; i++) {
    ctx.beginPath();
    ctx.arc(cx, H * 0.46, 210 + i * 62, 0, Math.PI * 2);
    ctx.stroke();
  }
  ctx.restore();

  // —— Top rail: brand line
  ctx.save();
  ctx.fillStyle = spec.ink;
  ctx.globalAlpha = 0.85;
  ctx.font = '600 34px ui-monospace, monospace';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.letterSpacing = '14px';
  ctx.fillText('PREBIOTIC SODA', cx, H * 0.12);
  ctx.restore();

  // —— Wordmark
  ctx.save();
  ctx.fillStyle = spec.ink;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.font = '900 190px Georgia, "Times New Roman", serif';
  ctx.letterSpacing = '-6px';
  ctx.fillText('FROLIC', cx, H * 0.36);
  ctx.restore();

  // —— Flavour name on an ink bar
  ctx.save();
  ctx.font = '700 62px system-ui, -apple-system, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.letterSpacing = '2px';
  const label = spec.name.toUpperCase();
  const barW = Math.min(ctx.measureText(label).width + 110, PW - 120);
  ctx.fillStyle = spec.ink;
  roundedRect(ctx, cx - barW / 2, H * 0.5, barW, 104, 52);
  ctx.fill();
  ctx.fillStyle = spec.base;
  ctx.fillText(label, cx, H * 0.5 + 54);
  ctx.restore();

  // —— Tasting notes
  ctx.save();
  ctx.fillStyle = spec.ink;
  ctx.globalAlpha = 0.78;
  ctx.font = '500 36px system-ui, -apple-system, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.letterSpacing = '5px';
  ctx.fillText(spec.notes.join('  ·  ').toUpperCase(), cx, H * 0.68);
  ctx.restore();

  // —— Fibre roundel
  ctx.save();
  ctx.translate(cx, H * 0.83);
  ctx.fillStyle = spec.ink;
  ctx.beginPath();
  ctx.arc(0, 0, 74, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = spec.base;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.font = '900 54px system-ui, sans-serif';
  ctx.fillText(`${spec.fibreGrams}g`, 0, -10);
  ctx.font = '700 21px ui-monospace, monospace';
  ctx.letterSpacing = '3px';
  ctx.fillText('FIBRE', 0, 32);
  ctx.restore();

  // —— Volume marks flanking the roundel
  ctx.save();
  ctx.fillStyle = spec.ink;
  ctx.globalAlpha = 0.7;
  ctx.font = '600 32px ui-monospace, monospace';
  ctx.textBaseline = 'middle';
  ctx.letterSpacing = '4px';
  ctx.textAlign = 'right';
  ctx.fillText('250 ML', cx - 130, H * 0.83);
  ctx.textAlign = 'left';
  ctx.fillText('NO CAFFEINE', cx + 130, H * 0.83);
  ctx.restore();
}

export function createCanLabelTexture(spec: LabelSpec): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext('2d')!;

  // Base wash — vertical gradient from the flavour base into its deep shade.
  const grad = ctx.createLinearGradient(0, 0, 0, H);
  grad.addColorStop(0, spec.base);
  grad.addColorStop(0.62, spec.base);
  grad.addColorStop(1, spec.deep);
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, W, H);

  // Subtle vertical banding suggests the printed-aluminium finish and gives
  // the rotating can something to catch light on.
  ctx.save();
  ctx.globalAlpha = 0.05;
  ctx.fillStyle = '#ffffff';
  for (let x = 0; x < W; x += 48) ctx.fillRect(x, 0, 18, H);
  ctx.restore();

  // Two identical panels so the lockup reads from any rotation.
  drawPanel(ctx, 0, spec);
  drawPanel(ctx, W / 2, spec);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 8;
  texture.wrapS = THREE.RepeatWrapping;
  texture.needsUpdate = true;
  return texture;
}
