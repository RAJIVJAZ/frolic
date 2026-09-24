/**
 * Illustration primitives: sweets drawn in a fixed oblique projection so any
 * piece can sit on any plate and still read as the same scene.
 *
 * Every piece is positioned by its front-top-left corner (x, y). Depth runs
 * up and to the right at a constant ratio, which keeps a whole platter
 * consistent without a real 3D camera.
 */

const DX = 0.55;
const DY = 0.38;

type BlockProps = {
  x: number;
  y: number;
  w: number;
  h: number;
  d: number;
  top: string;
  front: string;
  side: string;
  grain?: string;
  children?: React.ReactNode;
};

/** A point on a block's top face; u across (0→1), v into depth (0→1). */
export function onTop(b: { x: number; y: number; w: number; d: number }, u: number, v: number) {
  return { x: b.x + u * b.w + v * b.d * DX, y: b.y - v * b.d * DY };
}

export function Shadow({ cx, cy, rx, ry, opacity = 0.28 }: { cx: number; cy: number; rx: number; ry: number; opacity?: number }) {
  return <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill={`rgba(58,24,8,${opacity})`} filter="url(#mw-soft)" />;
}

/** An oblique slab: top, front and right side faces. */
export function Block({ x, y, w, h, d, top, front, side, grain, children }: BlockProps) {
  const dx = d * DX;
  const dy = d * DY;
  const topPts = `${x},${y} ${x + w},${y} ${x + w + dx},${y - dy} ${x + dx},${y - dy}`;
  const sidePts = `${x + w},${y} ${x + w + dx},${y - dy} ${x + w + dx},${y - dy + h} ${x + w},${y + h}`;
  return (
    <g>
      <Shadow cx={x + (w + dx) / 2 + 4} cy={y + h - dy / 2 + 2} rx={(w + dx) / 2 + 6} ry={dy / 2 + 8} />
      <g filter={grain ? `url(#${grain})` : undefined} strokeLinejoin="round">
        <polygon points={sidePts} fill={`url(#${side})`} stroke={`url(#${side})`} strokeWidth={2.2} />
        <rect x={x} y={y} width={w} height={h} fill={`url(#${front})`} stroke={`url(#${front})`} strokeWidth={2.2} />
        <polygon points={topPts} fill={`url(#${top})`} stroke={`url(#${top})`} strokeWidth={2.2} />
      </g>
      {/* Catch-light along the front top edge. */}
      <line x1={x + 3} y1={y + 0.8} x2={x + w - 2} y2={y + 0.8} stroke="rgba(255,250,235,0.55)" strokeWidth={1.2} strokeLinecap="round" />
      {children}
    </g>
  );
}

export function Pistachio({ x, y, r = 0, s = 1 }: { x: number; y: number; r?: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`}>
      <ellipse rx={6} ry={2.1} fill="#8FA84E" />
      <ellipse rx={4.4} ry={1.1} cx={-0.6} cy={-0.4} fill="#C5D78C" />
      <path d="M-6 0.4 Q0 2.6 6 0.4" stroke="#7B4B5B" strokeWidth={0.7} fill="none" opacity={0.7} />
    </g>
  );
}

export function Almond({ x, y, r = 0, s = 1 }: { x: number; y: number; r?: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`}>
      <path d="M-7 0 Q-2 -4.6 7 0 Q-2 4.6 -7 0 Z" fill="#E6C593" stroke="#A8743E" strokeWidth={0.9} />
      <path d="M-4 -0.6 Q0 -2 4 -0.4" stroke="#FFF2D8" strokeWidth={0.8} fill="none" opacity={0.7} />
    </g>
  );
}

export function Cashew({ x, y, r = 0, s = 1 }: { x: number; y: number; r?: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`}>
      <path d="M-6 -2 Q-7 5 0 5 Q6 5 6 1 Q3 3 0 2 Q-3 1 -3 -2 Z" fill="#F0DDB4" stroke="#C49A5E" strokeWidth={0.8} />
    </g>
  );
}

export function Saffron({ x, y, r = 0, s = 1 }: { x: number; y: number; r?: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`}>
      <path d="M-6 1 Q-2 -2 2 0 T7 -1" stroke="#B8360C" strokeWidth={1.3} fill="none" strokeLinecap="round" />
      <circle cx={7} cy={-1} r={1.2} fill="#D9541A" />
    </g>
  );
}

export function Petal({ x, y, r = 0, s = 1 }: { x: number; y: number; r?: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`}>
      <path d="M0 -10 C9 -8 11 4 0 10 C-11 4 -9 -8 0 -10 Z" fill="url(#petal)" />
      <path d="M0 -7 Q2 0 0 7" stroke="rgba(255,255,255,0.25)" strokeWidth={0.8} fill="none" />
    </g>
  );
}

export function Cardamom({ x, y, r = 0, s = 1 }: { x: number; y: number; r?: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`}>
      <ellipse rx={7} ry={3.8} fill="#A2AE68" stroke="#7D8A4C" strokeWidth={0.8} />
      <path d="M-5 -1 Q0 -3 5 -1 M-5 1.2 Q0 3 5 1.2" stroke="#7D8A4C" strokeWidth={0.6} fill="none" />
    </g>
  );
}

/* ── Sweets ───────────────────────────────────────────────────────────── */

type PieceProps = { x: number; y: number; s?: number };

/** Positions are unscaled; `s` scales around the piece's own origin. */
function Scaled({ x, y, s = 1, children }: PieceProps & { children: React.ReactNode }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>{children}</g>;
}

export function MilkCakePiece(p: PieceProps) {
  const b = { x: 0, y: 0, w: 96, h: 44, d: 78 };
  return (
    <Scaled {...p}>
      <Block {...b} top="mc-top" front="mc-front" side="mc-side" grain="mw-grain-caramel" />
    </Scaled>
  );
}

export function KalakandPiece(p: PieceProps) {
  const b = { x: 0, y: 0, w: 94, h: 36, d: 78 };
  const nuts: [number, number, number][] = [
    [0.18, 0.3, 20], [0.42, 0.62, -35], [0.7, 0.28, 60], [0.3, 0.82, 10], [0.82, 0.7, -15], [0.55, 0.12, 40],
  ];
  return (
    <Scaled {...p}>
      <Block {...b} top="kk-top" front="kk-front" side="kk-side" grain="mw-grain-cream">
        {nuts.map(([u, v, r], i) => {
          const pt = onTop(b, u, v);
          return <Pistachio key={i} x={pt.x} y={pt.y} r={r} s={0.95} />;
        })}
      </Block>
    </Scaled>
  );
}

export function MalaiBarfiPiece(p: PieceProps) {
  const b = { x: 0, y: 0, w: 92, h: 38, d: 76 };
  const c = [onTop(b, 0.07, 0.1), onTop(b, 0.93, 0.08), onTop(b, 0.92, 0.9), onTop(b, 0.08, 0.92)];
  const varq = c.map((q) => `${q.x},${q.y}`).join(' ');
  const a = onTop(b, 0.5, 0.52);
  return (
    <Scaled {...p}>
      <Block {...b} top="mb-top" front="mb-front" side="mb-side" grain="mw-grain-fine">
        <polygon points={varq} fill="url(#varq)" filter="url(#mw-grain-silver)" opacity={0.92} />
        <Pistachio x={a.x - 8} y={a.y + 2} r={25} s={0.9} />
        <Pistachio x={a.x + 9} y={a.y - 3} r={-30} s={0.85} />
      </Block>
    </Scaled>
  );
}

export function PedaPiece({ x, y, s = 1, saffron = true }: PieceProps & { saffron?: boolean }) {
  const rx = 44;
  const ry = 17;
  const h = 15;
  return (
    <Scaled x={x} y={y} s={s}>
      <Shadow cx={4} cy={h + 4} rx={rx + 6} ry={ry} />
      <g filter="url(#mw-grain-sugar)">
        <path d={`M${-rx} 0 L${-rx} ${h} A${rx} ${ry} 0 0 0 ${rx} ${h} L${rx} 0 Z`} fill="url(#pd-side)" />
        <ellipse rx={rx} ry={ry} fill="url(#pd-top)" />
        <ellipse cx={2} cy={1} rx={13} ry={5.5} fill="url(#pd-thumb)" />
      </g>
      <path d={`M${-rx + 6} -6 A${rx} ${ry} 0 0 1 ${rx - 12} -9`} stroke="rgba(255,240,210,0.45)" strokeWidth={1.4} fill="none" />
      {saffron && <Saffron x={3} y={0} r={-12} s={0.8} />}
    </Scaled>
  );
}

export function KundaBowl({ x, y, s = 1 }: PieceProps) {
  return (
    <Scaled x={x} y={y} s={s}>
      <Shadow cx={6} cy={50} rx={92} ry={20} opacity={0.32} />
      {/* bowl body */}
      <path d="M-82 0 Q-78 58 0 62 Q78 58 82 0 Z" fill="url(#bowl-outer)" />
      <ellipse rx={82} ry={24} fill="url(#brass-rim)" />
      <ellipse rx={74} ry={19} fill="url(#bowl-inside)" />
      {/* the kunda: a loose, glossy mound */}
      <g filter="url(#mw-grain-dark)">
        <path d="M-68 2 Q-60 -26 -20 -30 Q10 -40 40 -26 Q66 -18 68 2 Q40 16 0 16 Q-44 16 -68 2 Z" fill="url(#kd-mass)" />
      </g>
      <path d="M-30 -22 Q-8 -32 22 -26" stroke="rgba(255,214,160,0.55)" strokeWidth={2.2} fill="none" strokeLinecap="round" />
      <Cardamom x={24} y={-14} r={20} s={0.8} />
    </Scaled>
  );
}

export function BikaneriPiece(p: PieceProps) {
  const b = { x: 0, y: 0, w: 98, h: 58, d: 74 };
  const top: [number, number, number][] = [[0.2, 0.3, 15], [0.5, 0.65, -40], [0.78, 0.35, 70], [0.35, 0.85, -5]];
  return (
    <Scaled {...p}>
      <Block {...b} top="bk-top" front="bk-front" side="bk-side" grain="mw-grain-caramel">
        {/* Dry fruits set into the cut face. */}
        <Almond x={16} y={22} r={-10} s={0.95} />
        <Cashew x={44} y={34} r={20} s={0.9} />
        <Almond x={74} y={18} r={15} s={0.9} />
        <Pistachio x={30} y={46} r={5} s={0.9} />
        <Almond x={82} y={44} r={-25} s={0.85} />
        <Pistachio x={60} y={12} r={-20} s={0.8} />
        {top.map(([u, v, r], i) => {
          const pt = onTop(b, u, v);
          return i % 2 ? <Pistachio key={i} x={pt.x} y={pt.y} r={r} /> : <Almond key={i} x={pt.x} y={pt.y} r={r} s={0.85} />;
        })}
      </Block>
    </Scaled>
  );
}

/* ── Tableware ────────────────────────────────────────────────────────── */

export function PorcelainPlate({ cx, cy, rx, ry }: { cx: number; cy: number; rx: number; ry: number }) {
  return (
    <g>
      <ellipse cx={cx + 6} cy={cy + 14} rx={rx} ry={ry} fill="rgba(58,24,8,0.22)" filter="url(#mw-soft)" />
      <ellipse cx={cx} cy={cy + 6} rx={rx} ry={ry} fill="#E3D5BC" />
      <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill="url(#porcelain)" />
      <ellipse cx={cx} cy={cy} rx={rx - 7} ry={ry - 3.5} fill="none" stroke="url(#mw-gold)" strokeWidth={2} />
      <ellipse cx={cx} cy={cy + 2} rx={rx * 0.72} ry={ry * 0.68} fill="rgba(210,190,150,0.18)" />
    </g>
  );
}

export function BrassThali({ cx, cy, rx, ry }: { cx: number; cy: number; rx: number; ry: number }) {
  return (
    <g>
      <ellipse cx={cx + 8} cy={cy + 22} rx={rx + 6} ry={ry + 4} fill="rgba(58,24,8,0.3)" filter="url(#mw-soft)" />
      <ellipse cx={cx} cy={cy + 10} rx={rx} ry={ry} fill="#7A5823" />
      <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill="url(#brass-rim)" />
      <ellipse cx={cx} cy={cy + 2} rx={rx - 14} ry={ry - 6} fill="url(#brass)" />
      <ellipse cx={cx} cy={cy + 2} rx={rx - 14} ry={ry - 6} fill="none" stroke="rgba(90,65,25,0.35)" strokeWidth={1.5} />
      {/* Engraved ring */}
      <ellipse cx={cx} cy={cy + 3} rx={(rx - 14) * 0.82} ry={(ry - 6) * 0.82} fill="none" stroke="rgba(122,88,35,0.35)" strokeWidth={1} strokeDasharray="3 5" />
    </g>
  );
}
