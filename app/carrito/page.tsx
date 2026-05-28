'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { useCartStore } from '@/lib/store';
import { Button } from '@/components/ui/button';
import { Minus, Plus, X, ShoppingBag, ArrowRight, Truck } from 'lucide-react';

export default function CartPage() {
  const { items, removeItem, updateQuantity, getSubtotal, clearCart } = useCartStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const subtotal = mounted ? getSubtotal() : 0;
  const freeShippingThreshold = 150;
  const remainingForFreeShipping = freeShippingThreshold - subtotal;
  const shipping = subtotal >= freeShippingThreshold ? 0 : 5.99;
  const total = subtotal + shipping;

  if (!mounted) {
    return (
      <main className="min-h-screen">
        <Header />
        <div className="flex min-h-[60vh] items-center justify-center pt-20">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-foreground border-t-transparent" />
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen">
      <Header />

      <div className="mx-auto max-w-7xl px-4 pb-20 pt-28 sm:px-6 lg:px-8">
        <h1 className="mb-8 text-3xl font-light tracking-wide">Tu Carrito</h1>

        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <ShoppingBag className="mb-6 h-16 w-16 text-muted-foreground" />
            <h2 className="mb-2 text-xl font-medium">Tu carrito está vacío</h2>
            <p className="mb-8 text-muted-foreground">
              Descubre nuestra colección y encuentra algo que te encante.
            </p>
            <Link href="/">
              <Button className="rounded-none bg-foreground px-8 py-6 text-sm font-medium uppercase tracking-widest text-background hover:bg-foreground/90">
                Explorar Tienda
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid gap-12 lg:grid-cols-3">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              {/* Free Shipping Progress */}
              {remainingForFreeShipping > 0 && (
                <div className="mb-8 rounded-none border border-border bg-secondary/30 p-4">
                  <div className="mb-2 flex items-center gap-2">
                    <Truck className="h-4 w-4" />
                    <span className="text-sm">
                      Te faltan <strong>{remainingForFreeShipping.toFixed(2)}€</strong> para envío gratuito
                    </span>
                  </div>
                  <div className="h-2 overflow-hidden bg-border">
                    <div
                      className="h-full bg-foreground transition-all"
                      style={{ width: `${Math.min((subtotal / freeShippingThreshold) * 100, 100)}%` }}
                    />
                  </div>
                </div>
              )}

              {/* Items */}
              <div className="divide-y divide-border border-y border-border">
                {items.map((item) => (
                  <div
                    key={`${item.product.id}-${item.selectedSize}-${item.selectedColor}`}
                    className="flex gap-6 py-6"
                  >
                    {/* Image */}
                    <Link href={`/producto/${item.product.id}`} className="shrink-0">
                      <div className="relative h-32 w-24 overflow-hidden bg-secondary sm:h-40 sm:w-32">
                        <Image
                          src={item.product.images[0]}
                          alt={item.product.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </Link>

                    {/* Info */}
                    <div className="flex flex-1 flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <Link
                              href={`/producto/${item.product.id}`}
                              className="font-medium hover:text-accent"
                            >
                              {item.product.name}
                            </Link>
                            <p className="mt-1 text-sm text-muted-foreground">
                              Talla: {item.selectedSize} | Color: {item.selectedColor}
                            </p>
                          </div>
                          <button
                            onClick={() =>
                              removeItem(
                                item.product.id,
                                item.selectedSize,
                                item.selectedColor
                              )
                            }
                            className="text-muted-foreground transition-colors hover:text-foreground"
                          >
                            <X className="h-5 w-5" />
                          </button>
                        </div>
                      </div>

                      <div className="flex items-end justify-between">
                        {/* Quantity */}
                        <div className="flex items-center border border-border">
                          <button
                            onClick={() =>
                              updateQuantity(
                                item.product.id,
                                item.selectedSize,
                                item.selectedColor,
                                item.quantity - 1
                              )
                            }
                            className="px-3 py-2 transition-colors hover:bg-secondary"
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="min-w-[2.5rem] text-center text-sm">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(
                                item.product.id,
                                item.selectedSize,
                                item.selectedColor,
                                item.quantity + 1
                              )
                            }
                            className="px-3 py-2 transition-colors hover:bg-secondary"
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>

                        {/* Price */}
                        <div className="text-right">
                          <p className="font-semibold">
                            {(item.product.price * item.quantity).toFixed(2)}€
                          </p>
                          {item.quantity > 1 && (
                            <p className="text-xs text-muted-foreground">
                              {item.product.price.toFixed(2)}€ c/u
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Clear Cart */}
              <div className="mt-6 flex justify-end">
                <button
                  onClick={clearCart}
                  className="text-sm text-muted-foreground underline hover:text-foreground"
                >
                  Vaciar carrito
                </button>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="sticky top-28 border border-border bg-card p-6">
                <h2 className="mb-6 text-lg font-medium">Resumen del Pedido</h2>

                <div className="space-y-4 border-b border-border pb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>{subtotal.toFixed(2)}€</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Envío</span>
                    <span>
                      {shipping === 0 ? (
                        <span className="text-green-600">Gratis</span>
                      ) : (
                        `${shipping.toFixed(2)}€`
                      )}
                    </span>
                  </div>
                </div>

                <div className="flex justify-between py-6">
                  <span className="text-lg font-medium">Total</span>
                  <span className="text-lg font-semibold">{total.toFixed(2)}€</span>
                </div>

                <Link href="/checkout">
                  <Button className="w-full rounded-none bg-foreground py-6 text-sm font-medium uppercase tracking-widest text-background hover:bg-foreground/90">
                    Proceder al Pago
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>

                <p className="mt-4 text-center text-xs text-muted-foreground">
                  Impuestos calculados en el checkout
                </p>

                {/* Payment Methods */}
                <div className="mt-6 border-t border-border pt-6">
                  <p className="mb-3 text-xs text-muted-foreground">Métodos de pago aceptados</p>
                  <div className="flex items-center justify-center gap-4">
                    <div className="flex h-8 w-12 items-center justify-center rounded border border-border bg-background text-xs font-bold">
                      VISA
                    </div>
                    <div className="flex h-8 w-12 items-center justify-center rounded border border-border bg-background text-xs font-bold">
                      MC
                    </div>
                    <div className="flex h-8 w-12 items-center justify-center rounded border border-border bg-background text-xs font-bold">
                      AMEX
                    </div>
                    <div className="flex h-8 w-12 items-center justify-center rounded border border-border bg-background text-xs font-bold">
                      PP
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </main>
  );
}
