'use client';

import { useState, useEffect } from 'react';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { ProductCard } from '@/components/product-card';
import { getProductById, products } from '@/lib/data';
import { useCartStore } from '@/lib/store';
import { Button } from '@/components/ui/button';
import { ChevronRight, Minus, Plus, Heart, Truck, Shield, RotateCcw, Star } from 'lucide-react';
import { cn } from '@/lib/utils';
import { use } from 'react';

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export default function ProductPage({ params }: ProductPageProps) {
  const { id } = use(params);
  const product = getProductById(id);
  const addItem = useCartStore((state) => state.addItem);

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  useEffect(() => {
    if (product) {
      setSelectedSize(product.sizes[0] || '');
      setSelectedColor(product.colors[0]?.name || '');
    }
  }, [product]);

  if (!product) {
    notFound();
  }

  const handleAddToCart = () => {
    addItem(product, selectedSize, selectedColor, quantity);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <main className="min-h-screen">
      <Header />

      {/* Breadcrumb */}
      <nav className="border-b border-border pt-20">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <ol className="flex items-center gap-2 text-sm">
            <li>
              <Link href="/" className="text-muted-foreground hover:text-foreground">
                Inicio
              </Link>
            </li>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
            <li>
              <Link
                href={`/categoria/${product.category}`}
                className="text-muted-foreground hover:text-foreground capitalize"
              >
                {product.category}
              </Link>
            </li>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
            <li className="font-medium truncate max-w-[200px]">{product.name}</li>
          </ol>
        </div>
      </nav>

      {/* Product Detail */}
      <section className="py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2">
            {/* Images */}
            <div className="space-y-4">
              <div className="relative aspect-[3/4] overflow-hidden bg-secondary">
                <Image
                  src={product.images[selectedImage]}
                  alt={product.name}
                  fill
                  className="object-cover"
                  priority
                />
                {product.isNew && (
                  <span className="absolute left-4 top-4 bg-foreground px-3 py-1 text-xs font-medium uppercase tracking-wider text-background">
                    Nuevo
                  </span>
                )}
                {discount > 0 && (
                  <span className="absolute left-4 top-12 bg-accent px-3 py-1 text-xs font-medium uppercase tracking-wider text-accent-foreground">
                    -{discount}%
                  </span>
                )}
              </div>
              {product.images.length > 1 && (
                <div className="flex gap-4">
                  {product.images.map((image, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage(idx)}
                      className={cn(
                        'relative aspect-square w-20 overflow-hidden border-2 transition-colors',
                        selectedImage === idx ? 'border-foreground' : 'border-transparent'
                      )}
                    >
                      <Image
                        src={image}
                        alt={`${product.name} ${idx + 1}`}
                        fill
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div>
              <div className="mb-6">
                <p className="mb-2 text-sm font-medium uppercase tracking-widest text-muted-foreground">
                  {product.category}
                </p>
                <h1 className="text-3xl font-light tracking-wide md:text-4xl">
                  {product.name}
                </h1>
                <div className="mt-4 flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={cn(
                          'h-4 w-4',
                          i < Math.floor(product.rating)
                            ? 'fill-accent text-accent'
                            : 'text-muted-foreground'
                        )}
                      />
                    ))}
                    <span className="ml-2 text-sm text-muted-foreground">
                      ({product.reviews} reseñas)
                    </span>
                  </div>
                </div>
              </div>

              {/* Price */}
              <div className="mb-8 flex items-baseline gap-3">
                <span className="text-3xl font-semibold">
                  {product.price.toFixed(2)}€
                </span>
                {product.originalPrice && (
                  <span className="text-xl text-muted-foreground line-through">
                    {product.originalPrice.toFixed(2)}€
                  </span>
                )}
              </div>

              {/* Description */}
              <p className="mb-8 leading-relaxed text-muted-foreground">
                {product.description}
              </p>

              {/* Color Selection */}
              <div className="mb-6">
                <p className="mb-3 text-sm font-medium">
                  Color: <span className="font-normal">{selectedColor}</span>
                </p>
                <div className="flex gap-3">
                  {product.colors.map((color) => (
                    <button
                      key={color.name}
                      onClick={() => setSelectedColor(color.name)}
                      className={cn(
                        'h-10 w-10 rounded-full border-2 transition-all',
                        selectedColor === color.name
                          ? 'border-foreground scale-110'
                          : 'border-border hover:scale-105'
                      )}
                      style={{ backgroundColor: color.hex }}
                      title={color.name}
                    />
                  ))}
                </div>
              </div>

              {/* Size Selection */}
              <div className="mb-6">
                <div className="mb-3 flex items-center justify-between">
                  <p className="text-sm font-medium">Talla</p>
                  <button className="text-sm text-muted-foreground underline hover:text-foreground">
                    Guía de tallas
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={cn(
                        'min-w-[3rem] border px-4 py-2 text-sm transition-colors',
                        selectedSize === size
                          ? 'border-foreground bg-foreground text-background'
                          : 'border-border hover:border-foreground'
                      )}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div className="mb-8">
                <p className="mb-3 text-sm font-medium">Cantidad</p>
                <div className="flex items-center gap-4">
                  <div className="flex items-center border border-border">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-4 py-2 transition-colors hover:bg-secondary"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="min-w-[3rem] text-center">{quantity}</span>
                    <button
                      onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                      className="px-4 py-2 transition-colors hover:bg-secondary"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {product.stock} disponibles
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="mb-8 flex gap-4">
                <Button
                  onClick={handleAddToCart}
                  disabled={!selectedSize || !selectedColor}
                  className={cn(
                    'flex-1 rounded-none py-6 text-sm font-medium uppercase tracking-widest transition-all',
                    isAdded
                      ? 'bg-green-600 hover:bg-green-600'
                      : 'bg-foreground hover:bg-foreground/90'
                  )}
                >
                  {isAdded ? 'Añadido al carrito' : 'Añadir al carrito'}
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-auto rounded-none border-foreground px-4 py-6"
                >
                  <Heart className="h-5 w-5" />
                </Button>
              </div>

              {/* Benefits */}
              <div className="space-y-4 border-t border-border pt-8">
                <div className="flex items-center gap-4">
                  <Truck className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Envío gratuito</p>
                    <p className="text-xs text-muted-foreground">
                      En pedidos superiores a 150€
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <RotateCcw className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Devolución gratuita</p>
                    <p className="text-xs text-muted-foreground">
                      30 días para devoluciones
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Shield className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Pago seguro</p>
                    <p className="text-xs text-muted-foreground">
                      Transacciones 100% protegidas
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="border-t border-border bg-secondary/30 py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="mb-8 text-2xl font-light tracking-wide">
              También te puede gustar
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {relatedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </main>
  );
}
