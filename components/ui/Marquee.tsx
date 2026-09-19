'use client';

import { cn } from '@/lib/utils';

/**
 * Infinite ticker. The track is duplicated once and translated -50%, which is
 * why the loop is seamless without JS. `aria-hidden` on the clone keeps screen
 * readers from hearing everything twice.
 */
export function Marquee({
  items,
  speed = 38,
  className,
  itemClassName,
  separator = '✳',
  reverse = false,
}: {
  items: string[];
  speed?: number;
  className?: string;
  itemClassName?: string;
  separator?: string;
  reverse?: boolean;
}) {
  const Track = ({ hidden }: { hidden?: boolean }) => (
    <div className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {items.map((item, i) => (
        <span key={`${item}-${i}`} className={cn('flex items-center', itemClassName)}>
          <span className="whitespace-nowrap">{item}</span>
          <span className="mx-[0.7em] opacity-45">{separator}</span>
        </span>
      ))}
    </div>
  );

  return (
    <div className={cn('mask-fade-x flex w-full overflow-hidden', className)}>
      <div
        className="flex animate-marquee"
        style={{
          ['--marquee-duration' as string]: `${speed}s`,
          animationDirection: reverse ? 'reverse' : 'normal',
        }}
      >
        <Track />
        <Track hidden />
      </div>
    </div>
  );
}
