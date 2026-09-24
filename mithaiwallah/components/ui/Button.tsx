import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Icon, type IconName } from './Icon';

type Variant = 'primary' | 'gold' | 'outline' | 'outline-light' | 'ghost' | 'whatsapp';

const VARIANTS: Record<Variant, string> = {
  primary: 'bg-maroon text-cream hover:bg-maroon-700 shadow-[0_12px_30px_-14px_rgba(107,16,36,0.8)]',
  gold: 'bg-gold-foil bg-[length:200%_100%] bg-left text-maroon-900 hover:bg-right shadow-glow',
  outline: 'border border-maroon/30 text-maroon hover:border-maroon hover:bg-maroon hover:text-cream',
  'outline-light': 'border border-cream/40 text-cream hover:border-gold-300 hover:bg-cream hover:text-maroon',
  ghost: 'text-maroon hover:text-maroon-700 px-0',
  whatsapp: 'bg-[#1F7A4D] text-white hover:bg-[#186540]',
};

type Props = {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  icon?: IconName;
  iconLeft?: IconName;
  className?: string;
  external?: boolean;
  size?: 'md' | 'lg';
};

export function Button({ href, children, variant = 'primary', icon, iconLeft, className, external, size = 'md' }: Props) {
  const cls = cn(
    'group inline-flex items-center justify-center gap-2.5 rounded-full font-semibold tracking-[0.02em] transition-all duration-500 ease-luxe',
    size === 'lg' ? 'px-7 py-4 text-[0.95rem]' : 'px-5 py-3 text-sm',
    variant === 'ghost' && 'py-1',
    VARIANTS[variant],
    className,
  );
  const inner = (
    <>
      {iconLeft && <Icon name={iconLeft} className="h-[18px] w-[18px]" />}
      <span>{children}</span>
      {icon && <Icon name={icon} className="h-[18px] w-[18px] transition-transform duration-500 ease-luxe group-hover:translate-x-1" />}
    </>
  );
  if (external || href.startsWith('http')) {
    return (
      <a href={href} className={cls} target="_blank" rel="noopener noreferrer">
        {inner}
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {inner}
    </Link>
  );
}
