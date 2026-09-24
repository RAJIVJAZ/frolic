/**
 * Shared SVG paint server: every gradient and texture filter the sweet
 * illustrations use, defined once per page and referenced by id.
 *
 * Why global: dozens of illustrations render on one page, and duplicating
 * identical <defs> in each costs bytes and forces unique-id plumbing. Why not
 * `display: none`: gradients inside a display:none SVG do not paint in
 * Chromium or Firefox, so the host SVG is sized to zero instead.
 */

type Rgb = [number, number, number];

/**
 * A two-tone grain: dark flecks and light crystals, clipped to the shape.
 * fractalNoise's alpha channel is itself noise centred near 0.5, so
 * `alpha * gain - offset` keeps only its peaks — a sparse, irregular speckle
 * that reads as the granular texture of reduced milk.
 */
function Grain({
  id,
  dark,
  light,
  freq = 0.36,
  darkCut = 3.1,
  lightCut = 3.3,
  strength = 0.55,
}: {
  id: string;
  dark: Rgb;
  light: Rgb;
  freq?: number;
  darkCut?: number;
  lightCut?: number;
  strength?: number;
}) {
  // Gain 5 (not a hard threshold) gives soft-edged flecks rather than pixel
  // noise; `strength` caps their opacity so the face's own gradient — the
  // caramel band through a milk cake — still reads through the texture.
  const m = (c: Rgb, cut: number) =>
    `0 0 0 0 ${c[0]}  0 0 0 0 ${c[1]}  0 0 0 0 ${c[2]}  0 0 0 5 -${cut}`;
  return (
    <filter id={id} x="-2%" y="-2%" width="104%" height="104%" colorInterpolationFilters="sRGB">
      <feTurbulence type="fractalNoise" baseFrequency={freq} numOctaves={2} seed={3} result="n1" />
      <feColorMatrix in="n1" type="matrix" values={m(dark, darkCut)} result="d1" />
      <feComponentTransfer in="d1" result="d1s">
        <feFuncA type="linear" slope={strength} />
      </feComponentTransfer>
      <feComposite in="d1s" in2="SourceGraphic" operator="in" result="c1" />
      <feTurbulence type="fractalNoise" baseFrequency={freq * 1.3} numOctaves={1} seed={17} result="n2" />
      <feColorMatrix in="n2" type="matrix" values={m(light, lightCut)} result="d2" />
      <feComponentTransfer in="d2" result="d2s">
        <feFuncA type="linear" slope={strength * 0.8} />
      </feComponentTransfer>
      <feComposite in="d2s" in2="SourceGraphic" operator="in" result="c2" />
      <feMerge>
        <feMergeNode in="SourceGraphic" />
        <feMergeNode in="c1" />
        <feMergeNode in="c2" />
      </feMerge>
    </filter>
  );
}

function V({ id, stops }: { id: string; stops: [number, string][] }) {
  return (
    <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
      {stops.map(([o, c]) => (
        <stop key={o} offset={o} stopColor={c} />
      ))}
    </linearGradient>
  );
}

function D({ id, stops }: { id: string; stops: [number, string][] }) {
  return (
    <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
      {stops.map(([o, c]) => (
        <stop key={o} offset={o} stopColor={c} />
      ))}
    </linearGradient>
  );
}

function R({ id, stops, cx = 0.5, cy = 0.45, r = 0.6 }: { id: string; stops: [number, string][]; cx?: number; cy?: number; r?: number }) {
  return (
    <radialGradient id={id} cx={cx} cy={cy} r={r}>
      {stops.map(([o, c]) => (
        <stop key={o} offset={o} stopColor={c} />
      ))}
    </radialGradient>
  );
}

export function SvgDefs() {
  return (
    <svg aria-hidden width="0" height="0" style={{ position: 'absolute', width: 0, height: 0, overflow: 'hidden' }}>
      <defs>
        {/* ── Textures ─────────────────────────────────────────────── */}
        <Grain id="mw-grain-caramel" dark={[0.45, 0.24, 0.1]} light={[1, 0.92, 0.76]} freq={0.34} />
        <Grain id="mw-grain-cream" dark={[0.76, 0.64, 0.44]} light={[1, 0.99, 0.95]} freq={0.4} darkCut={3.0} lightCut={3.1} strength={0.6} />
        <Grain id="mw-grain-fine" dark={[0.84, 0.76, 0.6]} light={[1, 1, 0.98]} freq={0.5} darkCut={3.3} lightCut={3.3} strength={0.35} />
        <Grain id="mw-grain-sugar" dark={[0.55, 0.33, 0.13]} light={[1, 0.95, 0.84]} freq={0.55} darkCut={3.3} lightCut={3.0} strength={0.45} />
        <Grain id="mw-grain-dark" dark={[0.2, 0.08, 0.02]} light={[0.9, 0.62, 0.36]} freq={0.38} darkCut={2.9} lightCut={3.2} strength={0.6} />
        <Grain id="mw-grain-silver" dark={[0.62, 0.63, 0.63]} light={[1, 1, 1]} freq={0.3} darkCut={2.8} lightCut={2.8} strength={0.8} />

        <filter id="mw-soft" x="-30%" y="-60%" width="160%" height="220%">
          <feGaussianBlur stdDeviation="6" />
        </filter>
        <filter id="mw-blur-lg" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="18" />
        </filter>

        {/* ── Milk cake ────────────────────────────────────────────── */}
        <D id="mc-top" stops={[[0, '#EFD29A'], [0.6, '#E4BE7F'], [1, '#D6A864']]} />
        <V id="mc-front" stops={[[0, '#EBCB8E'], [0.26, '#C58A47'], [0.5, '#8E5026'], [0.74, '#C58A47'], [1, '#E3BF80']]} />
        <V id="mc-side" stops={[[0, '#D6B073'], [0.26, '#A96C35'], [0.5, '#6F3B1A'], [0.74, '#A96C35'], [1, '#CDA56A']]} />

        {/* ── Kalakand ─────────────────────────────────────────────── */}
        <R id="kk-top" stops={[[0, '#FDF7E9'], [1, '#EDDDBA']]} />
        <V id="kk-front" stops={[[0, '#F3E7CB'], [1, '#E0CBA0']]} />
        <V id="kk-side" stops={[[0, '#E5D4AE'], [1, '#CDB688']]} />

        {/* ── Malai barfi ──────────────────────────────────────────── */}
        <R id="mb-top" stops={[[0, '#FFFBF2'], [1, '#F1E5CB']]} />
        <V id="mb-front" stops={[[0, '#F6EDD9'], [1, '#E7D7B5']]} />
        <V id="mb-side" stops={[[0, '#E9DBBC'], [1, '#D5C29C']]} />
        <D id="varq" stops={[[0, '#CFD2D2'], [0.35, '#FFFFFF'], [0.55, '#BEC1C1'], [0.8, '#F4F4F2'], [1, '#D6D8D8']]} />

        {/* ── Peda ─────────────────────────────────────────────────── */}
        <R id="pd-top" stops={[[0, '#E2B574'], [0.7, '#C99048'], [1, '#B27637']]} />
        <V id="pd-side" stops={[[0, '#B47A3A'], [1, '#86521F']]} />
        <R id="pd-thumb" stops={[[0, '#A0642C'], [1, '#D4A15E']]} cx={0.55} cy={0.6} r={0.7} />

        {/* ── Kunda ────────────────────────────────────────────────── */}
        <R id="kd-mass" stops={[[0, '#95592A'], [0.55, '#6A3717'], [1, '#43200B']]} cx={0.42} cy={0.35} r={0.75} />

        {/* ── Bikaneri cake ────────────────────────────────────────── */}
        <D id="bk-top" stops={[[0, '#DDAA64'], [1, '#BF8542']]} />
        <V id="bk-front" stops={[[0, '#CF9A55'], [0.3, '#A2652E'], [0.55, '#7C441C'], [0.8, '#A2652E'], [1, '#C48C4B']]} />
        <V id="bk-side" stops={[[0, '#B8813F'], [0.3, '#86501F'], [0.55, '#5F3113'], [0.8, '#86501F'], [1, '#AA743A']]} />

        {/* ── Tableware ────────────────────────────────────────────── */}
        <R id="brass" stops={[[0, '#F6E2A8'], [0.45, '#D8AE5A'], [0.8, '#B08336'], [1, '#8C6524']]} cx={0.45} cy={0.4} r={0.65} />
        <D id="brass-rim" stops={[[0, '#8C6524'], [0.3, '#E9CF94'], [0.55, '#A57A30'], [0.8, '#F4E6C4'], [1, '#8C6524']]} />
        <R id="porcelain" stops={[[0, '#FFFFFF'], [0.75, '#F8F1E4'], [1, '#EDE2CD']]} />
        <R id="bowl-inside" stops={[[0, '#5B2D12'], [1, '#2E1407']]} />
        <V id="bowl-outer" stops={[[0, '#E4C47F'], [0.5, '#B8893B'], [1, '#7A5823']]} />

        {/* ── Gold, boxes, petals ──────────────────────────────────── */}
        <D id="mw-gold" stops={[[0, '#7A5823'], [0.22, '#C89F52'], [0.42, '#F4E6C4'], [0.58, '#C89F52'], [0.78, '#9A712E'], [1, '#D9B872']]} />
        <V id="box-maroon-front" stops={[[0, '#841935'], [1, '#4A0A18']]} />
        <D id="box-maroon-top" stops={[[0, '#9A2442'], [1, '#6B1024']]} />
        <V id="box-maroon-side" stops={[[0, '#5F0E20'], [1, '#33060F']]} />
        <V id="box-ivory-front" stops={[[0, '#F8F0DF'], [1, '#E2D0AB']]} />
        <D id="box-ivory-top" stops={[[0, '#FFFBF3'], [1, '#EFE3CB']]} />
        <V id="box-ivory-side" stops={[[0, '#E6D6B4'], [1, '#CDB88F']]} />
        <V id="box-gold-front" stops={[[0, '#D9B872'], [0.5, '#B8893B'], [1, '#7A5823']]} />
        <D id="box-gold-top" stops={[[0, '#F4E6C4'], [0.5, '#D9B872'], [1, '#B8893B']]} />
        <V id="box-gold-side" stops={[[0, '#9A712E'], [1, '#5A4119']]} />
        <R id="petal" stops={[[0, '#D4506A'], [1, '#8F1631']]} cx={0.35} cy={0.35} r={0.8} />
        <R id="halo" stops={[[0, 'rgba(255,240,205,0.95)'], [0.5, 'rgba(244,230,196,0.35)'], [1, 'rgba(244,230,196,0)']]} />
      </defs>
    </svg>
  );
}
