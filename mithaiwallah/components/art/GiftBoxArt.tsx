import { Block, onTop, MilkCakePiece, PedaPiece, KalakandPiece, MalaiBarfiPiece, Shadow } from './pieces';

type Tone = 'maroon' | 'ivory' | 'gold';

const RIBBON: Record<Tone, string> = { maroon: 'url(#mw-gold)', ivory: '#6B1024', gold: '#6B1024' };
const FOIL: Record<Tone, string> = { maroon: 'url(#mw-gold)', ivory: 'url(#mw-gold)', gold: '#6B1024' };

/** A closed, ribboned gift box. */
function ClosedBox({ tone, x, y, s = 1, label }: { tone: Tone; x: number; y: number; s?: number; label?: string }) {
  const b = { x: 0, y: 0, w: 200, h: 92, d: 120 };
  const dx = b.d * 0.55;
  const dy = b.d * 0.38;
  const band = (u0: number, u1: number) =>
    [onTop(b, u0, 0), onTop(b, u1, 0), onTop(b, u1, 1), onTop(b, u0, 1)].map((p) => `${p.x},${p.y}`).join(' ');
  const bandV = (v0: number, v1: number) =>
    [onTop(b, 0, v0), onTop(b, 1, v0), onTop(b, 1, v1), onTop(b, 0, v1)].map((p) => `${p.x},${p.y}`).join(' ');
  const knot = onTop(b, 0.5, 0.5);
  const sideBand = `${b.w + 0.46 * dx},${-0.46 * dy} ${b.w + 0.56 * dx},${-0.56 * dy} ${b.w + 0.56 * dx},${-0.56 * dy + b.h} ${b.w + 0.46 * dx},${-0.46 * dy + b.h}`;
  const ribbon = RIBBON[tone];
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <Block {...b} top={`box-${tone}-top`} front={`box-${tone}-front`} side={`box-${tone}-side`} />
      {/* lid seam */}
      <rect x={0} y={0} width={b.w} height={16} fill="rgba(0,0,0,0.08)" />
      <line x1={0} y1={16} x2={b.w} y2={16} stroke="rgba(0,0,0,0.18)" strokeWidth={1} />
      {/* ribbons */}
      <polygon points={band(0.46, 0.56)} fill={ribbon} />
      <polygon points={bandV(0.46, 0.56)} fill={ribbon} />
      <rect x={b.w * 0.46} y={0} width={b.w * 0.1} height={b.h} fill={ribbon} />
      <polygon points={sideBand} fill={ribbon} opacity={0.85} />
      {/* foil frame + label on the front */}
      <rect x={14} y={30} width={62} height={46} fill="none" stroke={FOIL[tone]} strokeWidth={1.2} />
      <text
        x={45}
        y={(label ?? 'M').length > 5 ? 56 : 58}
        textAnchor="middle"
        fontFamily="var(--font-display), Georgia, serif"
        fontSize={(label ?? 'M').length > 5 ? 9 : (label ?? 'M').length > 3 ? 13 : 20}
        letterSpacing={(label ?? 'M').length > 5 ? 1 : 0}
        fill={FOIL[tone]}
      >
        {label ?? 'M'}
      </text>
      {/* bow */}
      <g transform={`translate(${knot.x} ${knot.y})`}>
        <path d="M0 0 C-10 8 -18 22 -12 30 L-4 6 Z" fill={ribbon} opacity={0.9} />
        <path d="M0 0 C8 10 20 20 16 30 L4 6 Z" fill={ribbon} opacity={0.9} />
        <ellipse cx={-22} cy={-8} rx={24} ry={11} transform="rotate(-18 -22 -8)" fill="none" stroke={ribbon} strokeWidth={7} />
        <ellipse cx={22} cy={-8} rx={24} ry={11} transform="rotate(18 22 -8)" fill="none" stroke={ribbon} strokeWidth={7} />
        <ellipse cx={0} cy={-2} rx={8} ry={6} fill={ribbon} />
      </g>
    </g>
  );
}

/** An open tray with four sweets and the lid standing behind it. */
function OpenBox({ tone, x, y, s = 1 }: { tone: Tone; x: number; y: number; s?: number }) {
  const t = { x: 0, y: 0, w: 220, h: 34, d: 130 };
  const dx = t.d * 0.55;
  const dy = t.d * 0.38;
  const cell = (i: number, j: number) => {
    const u0 = 0.06 + i * 0.46;
    const v0 = 0.08 + j * 0.46;
    return [onTop(t, u0, v0), onTop(t, u0 + 0.42, v0), onTop(t, u0 + 0.42, v0 + 0.4), onTop(t, u0, v0 + 0.4)];
  };
  const pts = (c: { x: number; y: number }[]) => c.map((p) => `${p.x},${p.y}`).join(' ');
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      {/* Lid, upright behind the tray */}
      <g>
        <Shadow cx={dx + t.w / 2} cy={-dy} rx={t.w / 2} ry={8} opacity={0.18} />
        <rect x={dx} y={-dy - 118} width={t.w} height={118} fill={`url(#box-${tone}-front)`} />
        <rect x={dx + 12} y={-dy - 106} width={t.w - 24} height={94} fill="none" stroke={FOIL[tone]} strokeWidth={1.2} />
        <text x={dx + t.w / 2} y={-dy - 54} textAnchor="middle" fontFamily="var(--font-display), Georgia, serif" fontSize={30} fill={FOIL[tone]}>
          Mithaiwallah
        </text>
        <text x={dx + t.w / 2} y={-dy - 32} textAnchor="middle" fontFamily="var(--font-sans), sans-serif" fontSize={8} letterSpacing={3} fill={FOIL[tone]}>
          HANDCRAFTED · PRAYAGRAJ
        </text>
      </g>
      <Block {...t} top={`box-${tone}-top`} front={`box-${tone}-front`} side={`box-${tone}-side`} />
      {/* Cavities, back row first */}
      {[
        [0, 1],
        [1, 1],
        [0, 0],
        [1, 0],
      ].map(([i, j]) => (
        <polygon key={`${i}${j}`} points={pts(cell(i, j))} fill="rgba(40,10,4,0.28)" stroke={FOIL[tone]} strokeWidth={0.8} />
      ))}
      <PedaPiece x={onTop(t, 0.27, 0.72).x} y={onTop(t, 0.27, 0.72).y + 2} s={0.5} />
      <KalakandPiece x={onTop(t, 0.56, 0.6).x - 4} y={onTop(t, 0.56, 0.6).y + 14} s={0.42} />
      <MilkCakePiece x={onTop(t, 0.1, 0.14).x - 2} y={onTop(t, 0.1, 0.14).y + 4} s={0.44} />
      <MalaiBarfiPiece x={onTop(t, 0.56, 0.14).x - 2} y={onTop(t, 0.56, 0.14).y + 4} s={0.44} />
      <line x1={0} y1={t.h * 0.5} x2={t.w} y2={t.h * 0.5} stroke={FOIL[tone]} strokeWidth={1} opacity={0.8} />
    </g>
  );
}

export function GiftBoxArt({
  tone = 'maroon',
  variant = 'pair',
  className,
  label,
}: {
  tone?: Tone;
  variant?: 'pair' | 'closed' | 'open' | 'stack';
  className?: string;
  label?: string;
}) {
  const alt: Tone = tone === 'maroon' ? 'ivory' : 'maroon';
  return (
    <svg viewBox="0 0 420 320" className={className} aria-hidden preserveAspectRatio="xMidYMax meet">
      {variant === 'closed' && <ClosedBox tone={tone} x={70} y={170} label={label} />}
      {variant === 'open' && <OpenBox tone={tone} x={60} y={236} />}
      {variant === 'pair' && (
        <>
          <OpenBox tone={tone} x={24} y={250} s={0.86} />
          <ClosedBox tone={alt} x={236} y={236} s={0.62} label={label} />
        </>
      )}
      {variant === 'stack' && (
        <>
          <ClosedBox tone={alt} x={96} y={250} s={0.9} label={label} />
          <ClosedBox tone={tone} x={128} y={166} s={0.66} label={label} />
          <ClosedBox tone="gold" x={150} y={104} s={0.46} label={label} />
        </>
      )}
    </svg>
  );
}
