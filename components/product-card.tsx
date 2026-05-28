'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/lib/types';
import { Heart } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div
      className="group relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <Link href={`/producto/${product.id}`} className="block">
        <div className="relative aspect-[3/4] overflow-hidden bg-secondary">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className={cn(
              'object-cover transition-all duration-700',
              isHovered && product.images[1] ? 'opacity-0' : 'opacity-100'
            )}
          />
          {product.images[1] && (
            <Image
              src={product.images[1]}
              alt={product.name}
              fill
              className={cn(
                'object-cover transition-all duration-700',
                isHovered ? 'opacity-100' : 'opacity-0'
              )}
            />
          )}

          {/* Badges */}
          <div className="absolute left-3 top-3 flex flex-col gap-2">
            {product.isNew && (
              <span className="bg-foreground px-2 py-1 text-xs font-medium uppercase tracking-wider text-background">
                Nuevo
              </span>
            )}
            {discount > 0 && (
              <span className="bg-accent px-2 py-1 text-xs font-medium uppercase tracking-wider text-accent-foreground">
                -{discount}%
              </span>
            )}
          </div>

          {/* Wishlist Button */}
          <button
            onClick={(e) => {
              e.preventDefault();
              setIsLiked(!isLiked);
            }}
            className={cn(
              'absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-background/80 backdrop-blur-sm transition-all',
              'opacity-0 group-hover:opacity-100',
              isLiked && 'opacity-100'
            )}
          >
            <Heart
              className={cn('h-4 w-4', isLiked && 'fill-accent text-accent')}
            />
          </button>

          {/* Quick View */}
          <div
            className={cn(
              'absolute bottom-0 left-0 right-0 flex justify-center bg-foreground/90 py-3 transition-all duration-300',
              'translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100'
            )}
          >
            <span className="text-xs font-medium uppercase tracking-wider text-background">
              Vista Rápida
            </span>
          </div>
        </div>
      </Link>

      {/* Product Info */}
      <div className="mt-4 text-center">
        <Link href={`/producto/${product.id}`}>
          <h3 className="text-sm font-medium tracking-wide transition-colors hover:text-accent">
            {product.name}
          </h3>
        </Link>
        <div className="mt-2 flex items-center justify-center gap-2">
          <span className="text-sm font-semibold">
            {product.price.toFixed(2)}€
          </span>
          {product.originalPrice && (
            <span className="text-sm text-muted-foreground line-through">
              {product.originalPrice.toFixed(2)}€
            </span>
          )}
        </div>
        {/* Color Options */}
        {product.colors.length > 1 && (
          <div className="mt-2 flex justify-center gap-1">
            {product.colors.map((color) => (
              <div
                key={color.name}
                className="h-3 w-3 rounded-full border border-border"
                style={{ backgroundColor: color.hex }}
                title={color.name}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
