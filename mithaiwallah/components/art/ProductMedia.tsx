import Image from 'next/image';
import type { Product } from '@/lib/products';
import { SweetArt } from './SweetArt';

/** Real photography when a product has it; the illustration until then. */
export function ProductMedia({ product, className, priority, sizes = '(min-width: 1024px) 33vw, 90vw' }: { product: Product; className?: string; priority?: boolean; sizes?: string }) {
  if (product.photo) {
    return (
      <Image
        src={product.photo.src}
        alt={product.photo.alt}
        fill
        sizes={sizes}
        priority={priority}
        className="object-cover"
      />
    );
  }
  return <SweetArt variant={product.art} className={className} title={`${product.name}, plated`} />;
}
