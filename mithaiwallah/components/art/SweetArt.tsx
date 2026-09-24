import type { SweetArtVariant } from '@/lib/products';
import {
  Almond,
  BikaneriPiece,
  BrassThali,
  Cardamom,
  Cashew,
  KalakandPiece,
  KundaBowl,
  MalaiBarfiPiece,
  MilkCakePiece,
  PedaPiece,
  Petal,
  Pistachio,
  PorcelainPlate,
  Saffron,
} from './pieces';

/**
 * One plated illustration per sweet. These stand in for product photography
 * until the shoot is done: `ProductMedia` swaps to the real photo the moment a
 * product's `photo` field is set.
 */

const PLATE = { cx: 200, cy: 272, rx: 174, ry: 70 };

function Scene({ variant }: { variant: SweetArtVariant }) {
  switch (variant) {
    case 'milk-cake':
      return (
        <>
          <PorcelainPlate {...PLATE} />
          <MilkCakePiece x={70} y={244} s={0.92} />
          <MilkCakePiece x={210} y={234} s={0.9} />
          <MilkCakePiece x={128} y={294} s={0.94} />
          <Cardamom x={318} y={306} r={-20} />
          <Cardamom x={300} y={322} r={25} s={0.9} />
          <Petal x={70} y={306} r={-40} s={0.9} />
        </>
      );
    case 'kalakand':
      return (
        <>
          <PorcelainPlate {...PLATE} />
          <KalakandPiece x={66} y={246} s={0.92} />
          <KalakandPiece x={206} y={236} s={0.92} />
          <KalakandPiece x={126} y={296} s={0.94} />
          <Pistachio x={318} y={308} r={30} s={1.2} />
          <Pistachio x={300} y={322} r={-20} s={1.1} />
          <Saffron x={76} y={312} r={10} s={1.4} />
        </>
      );
    case 'malai-barfi':
      return (
        <>
          <PorcelainPlate {...PLATE} />
          <MalaiBarfiPiece x={78} y={242} s={0.9} />
          <MalaiBarfiPiece x={212} y={234} s={0.88} />
          <MalaiBarfiPiece x={134} y={294} s={0.92} />
          <Petal x={318} y={306} r={30} />
          <Petal x={298} y={320} r={-10} s={0.8} />
          <Pistachio x={80} y={312} r={-10} s={1.2} />
        </>
      );
    case 'peda':
      return (
        <>
          <PorcelainPlate {...PLATE} />
          <PedaPiece x={128} y={244} s={0.9} />
          <PedaPiece x={228} y={238} s={0.88} saffron={false} />
          <PedaPiece x={310} y={262} s={0.84} />
          <PedaPiece x={96} y={292} s={0.9} saffron={false} />
          <PedaPiece x={198} y={300} s={0.94} />
          <Saffron x={300} y={316} r={-15} s={1.3} />
        </>
      );
    case 'kunda':
      return (
        <>
          <PorcelainPlate {...PLATE} />
          <KundaBowl x={194} y={262} s={1.2} />
          <Cardamom x={66} y={296} r={-30} />
          <Cardamom x={336} y={300} r={20} s={0.9} />
          <Petal x={320} y={318} r={-20} s={0.8} />
        </>
      );
    case 'bikaneri-cake':
      return (
        <>
          <PorcelainPlate {...PLATE} />
          <BikaneriPiece x={76} y={244} s={0.9} />
          <BikaneriPiece x={170} y={292} s={0.94} />
          <Almond x={330} y={290} r={20} s={1.4} />
          <Cashew x={312} y={314} r={-10} s={1.3} />
          <Almond x={64} y={318} r={-30} s={1.3} />
          <Pistachio x={290} y={300} r={10} s={1.2} />
        </>
      );
  }
}

export function SweetArt({ variant, className, title }: { variant: SweetArtVariant; className?: string; title?: string }) {
  return (
    <svg
      viewBox="0 150 400 240"
      className={className}
      role={title ? 'img' : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      preserveAspectRatio="xMidYMax meet"
    >
      <Scene variant={variant} />
    </svg>
  );
}

/** The hero platter: every signature sweet on one brass thali. */
export function HeroPlatter({ className }: { className?: string }) {
  return (
    <svg viewBox="40 150 720 360" className={className} role="img" aria-label="A brass thali of Mithaiwallah sweets: milk cake, kalakand, malai barfi, peda, kunda and Bikaneri cake">
      <BrassThali cx={400} cy={330} rx={340} ry={138} />
      <MilkCakePiece x={300} y={236} s={0.95} />
      <BikaneriPiece x={146} y={262} s={0.95} />
      <KundaBowl x={566} y={262} s={0.9} />
      <KalakandPiece x={378} y={324} s={0.95} />
      <MalaiBarfiPiece x={206} y={340} s={0.95} />
      <PedaPiece x={604} y={360} s={0.82} />
      <PedaPiece x={512} y={392} s={0.86} saffron={false} />
      <PedaPiece x={662} y={322} s={0.72} />
      <Petal x={110} y={346} r={-30} s={1.2} />
      <Petal x={132} y={372} r={40} s={1} />
      <Petal x={700} y={380} r={20} s={1.1} />
      <Petal x={360} y={428} r={-60} s={1} />
      <Pistachio x={330} y={420} r={20} s={1.4} />
      <Pistachio x={186} y={420} r={-30} s={1.3} />
      <Saffron x={452} y={430} r={10} s={1.5} />
      <Cardamom x={690} y={420} r={-20} s={1.1} />
    </svg>
  );
}
