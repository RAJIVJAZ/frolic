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

/**
 * Only about a third of a cylinder's circumference faces the camera at any
 * moment. The label is drawn as two identical panels so a lockup is always in
 * view, which means each panel is W/2 wide — but content may only occupy the
 * middle SAFE_WIDTH of it. Anything wider runs past the panel edge and the
 * viewer sees two lockups colliding at the seam.
 */
const PANEL_W = W / 2;
const SAFE_WIDTH = 560;

/**
 * Shrinks the font until the text fits `maxWidth`, then draws it. Flavour
 * names vary from "Jeera" to "Himalayan Lemon", so a fixed size either
 * overflows the long ones or wastes the short ones.
 */
function fitText(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  buildFont: (size: number) => string,
  startSize: number,
  minSize = 12,
) {
  let size = startSize;
  ctx.font = buildFont(size);
  while (ctx.measureText(text).width > maxWidth && size > minSize) {
    size -= 2;
    ctx.font = buildFont(size);
  }
  ctx.fillText(text, x, y);
  return ctx.measureText(text).width;
}

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
  const cx = ox + PANEL_W / 2;

  // —— Arc motif: three concentric rings behind the wordmark.
  ctx.save();
  ctx.globalAlpha = 0.16;
  ctx.strokeStyle = spec.ink;
  ctx.lineWidth = 6;
  for (let i = 0; i < 3; i++) {
    ctx.beginPath();
    ctx.arc(cx, H * 0.46, 170 + i * 54, 0, Math.PI * 2);
    ctx.stroke();
  }
  ctx.restore();

  // —— Top rail: brand line
  ctx.save();
  ctx.fillStyle = spec.ink;
  ctx.globalAlpha = 0.85;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.letterSpacing = '10px';
  fitText(ctx, 'PREBIOTIC SODA', cx, H * 0.12, SAFE_WIDTH,
    (n) => `600 ${n}px ui-monospace, monospace`, 30);
  ctx.restore();

  // —— Wordmark
  ctx.save();
  ctx.fillStyle = spec.ink;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.letterSpacing = '-4px';
  fitText(ctx, 'FROLIC', cx, H * 0.36, SAFE_WIDTH,
    (n) => `900 ${n}px Georgia, "Times New Roman", serif`, 150);
  ctx.restore();

  // —— Flavour name on an ink bar
  ctx.save();
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.letterSpacing = '1px';
  const label = spec.name.toUpperCase();

  // Measure at the size it will actually be drawn, so the pill always hugs it.
  let nameSize = 52;
  ctx.font = `700 ${nameSize}px system-ui, -apple-system, sans-serif`;
  while (ctx.measureText(label).width > SAFE_WIDTH - 80 && nameSize > 24) {
    nameSize -= 2;
    ctx.font = `700 ${nameSize}px system-ui, -apple-system, sans-serif`;
  }
  const barW = ctx.measureText(label).width + 84;
  ctx.fillStyle = spec.ink;
  roundedRect(ctx, cx - barW / 2, H * 0.5, barW, 88, 44);
  ctx.fill();
  ctx.fillStyle = spec.base;
  ctx.fillText(label, cx, H * 0.5 + 46);
  ctx.restore();

  // —— Tasting notes
  ctx.save();
  ctx.fillStyle = spec.ink;
  ctx.globalAlpha = 0.78;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.letterSpacing = '2px';
  fitText(ctx, spec.notes.join(' · ').toUpperCase(), cx, H * 0.67, SAFE_WIDTH,
    (n) => `500 ${n}px system-ui, -apple-system, sans-serif`, 26, 14);
  ctx.restore();

  // —— Fibre roundel
  ctx.save();
  ctx.translate(cx, H * 0.83);
  ctx.fillStyle = spec.ink;
  ctx.beginPath();
  ctx.arc(0, 0, 62, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = spec.base;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.font = '900 46px system-ui, sans-serif';
  ctx.letterSpacing = '0px';
  ctx.fillText(`${spec.fibreGrams}g`, 0, -8);
  ctx.font = '700 18px ui-monospace, monospace';
  ctx.letterSpacing = '2px';
  ctx.fillText('FIBRE', 0, 26);
  ctx.restore();

  // —— Volume marks flanking the roundel
  ctx.save();
  ctx.fillStyle = spec.ink;
  ctx.globalAlpha = 0.7;
  ctx.font = '600 24px ui-monospace, monospace';
  ctx.textBaseline = 'middle';
  ctx.letterSpacing = '2px';
  ctx.textAlign = 'right';
  ctx.fillText('250 ML', cx - 96, H * 0.83);
  ctx.textAlign = 'left';
  ctx.fillText('NO CAFFEINE', cx + 96, H * 0.83);
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

  // Two identical panels so a lockup reads from any rotation.
  drawPanel(ctx, 0, spec);
  drawPanel(ctx, PANEL_W, spec);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 8;
  texture.wrapS = THREE.RepeatWrapping;
  texture.needsUpdate = true;
  return texture;
}
