'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { useAuthStore } from '@/lib/store';
import { Button } from '@/components/ui/button';
import { Package, ChevronLeft, Truck, Check, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function OrdersPage() {
  const router = useRouter();
  const { user, isAuthenticated } = useAuthStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && !isAuthenticated) {
      router.push('/login');
    }
  }, [mounted, isAuthenticated, router]);

  if (!mounted || !isAuthenticated) {
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

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'delivered':
        return <Check className="h-5 w-5" />;
      case 'shipped':
        return <Truck className="h-5 w-5" />;
      default:
        return <Clock className="h-5 w-5" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'Entregado';
      case 'processing':
        return 'En proceso';
      case 'shipped':
        return 'Enviado';
      case 'pending':
        return 'Pendiente';
      case 'cancelled':
        return 'Cancelado';
      default:
        return status;
    }
  };

  return (
    <main className="min-h-screen">
      <Header />

      <div className="mx-auto max-w-4xl px-4 pb-20 pt-28 sm:px-6 lg:px-8">
        <Link
          href="/cuenta"
          className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
        >
          <ChevronLeft className="h-4 w-4" />
          Volver a Mi Cuenta
        </Link>

        <h1 className="mb-8 text-3xl font-light tracking-wide">Mis Pedidos</h1>

        {user?.orders && user.orders.length > 0 ? (
          <div className="space-y-6">
            {user.orders
              .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
              .map((order) => (
                <div key={order.id} className="border border-border">
                  {/* Order Header */}
                  <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border bg-secondary/30 p-4">
                    <div className="flex flex-wrap gap-6 text-sm">
                      <div>
                        <p className="text-muted-foreground">Pedido realizado</p>
                        <p className="font-medium">
                          {new Date(order.createdAt).toLocaleDateString('es-ES', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          })}
                        </p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Total</p>
                        <p className="font-medium">{order.total.toFixed(2)}€</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Envío a</p>
                        <p className="font-medium">{order.shippingAddress.city}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">
                        Pedido #{order.id.slice(0, 8).toUpperCase()}
                      </p>
                      {order.trackingNumber && (
                        <p className="text-xs text-muted-foreground">
                          Seguimiento: {order.trackingNumber}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Order Status */}
                  <div className="flex items-center gap-3 border-b border-border p-4">
                    <div
                      className={cn(
                        'flex h-10 w-10 items-center justify-center rounded-full',
                        order.status === 'delivered' && 'bg-green-100 text-green-600',
                        order.status === 'processing' && 'bg-blue-100 text-blue-600',
                        order.status === 'shipped' && 'bg-yellow-100 text-yellow-600',
                        order.status === 'pending' && 'bg-gray-100 text-gray-600',
                        order.status === 'cancelled' && 'bg-red-100 text-red-600'
                      )}
                    >
                      {getStatusIcon(order.status)}
                    </div>
                    <div>
                      <p className="font-medium">{getStatusText(order.status)}</p>
                      <p className="text-sm text-muted-foreground">
                        {order.status === 'delivered'
                          ? 'Tu pedido ha sido entregado'
                          : order.status === 'shipped'
                          ? `Entrega estimada: ${order.shippingMethod.estimatedDays}`
                          : order.status === 'processing'
                          ? 'Tu pedido está siendo preparado'
                          : 'Procesando tu pedido'}
                      </p>
                    </div>
                  </div>

                  {/* Order Items */}
                  <div className="p-4">
                    <div className="space-y-4">
                      {order.items.map((item, idx) => (
                        <div key={idx} className="flex gap-4">
                          <div className="relative h-20 w-16 shrink-0 overflow-hidden bg-secondary">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={item.product.images[0]}
                              alt={item.product.name}
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <Link
                              href={`/producto/${item.product.id}`}
                              className="font-medium hover:text-accent"
                            >
                              {item.product.name}
                            </Link>
                            <p className="text-sm text-muted-foreground">
                              Talla: {item.selectedSize} | Color: {item.selectedColor}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              Cantidad: {item.quantity}
                            </p>
                          </div>
                          <p className="font-medium">
                            {(item.product.price * item.quantity).toFixed(2)}€
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Order Summary */}
                  <div className="border-t border-border bg-secondary/30 p-4">
                    <div className="flex justify-end">
                      <div className="w-64 space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Subtotal</span>
                          <span>{order.subtotal.toFixed(2)}€</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Envío</span>
                          <span>
                            {order.shipping === 0 ? (
                              <span className="text-green-600">Gratis</span>
                            ) : (
                              `${order.shipping.toFixed(2)}€`
                            )}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">IVA</span>
                          <span>{order.tax.toFixed(2)}€</span>
                        </div>
                        <div className="flex justify-between border-t border-border pt-2 font-medium">
                          <span>Total</span>
                          <span>{order.total.toFixed(2)}€</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <Package className="mb-6 h-16 w-16 text-muted-foreground" />
            <h2 className="mb-2 text-xl font-medium">No tienes pedidos aún</h2>
            <p className="mb-8 text-muted-foreground">
              Explora nuestra colección y encuentra algo especial.
            </p>
            <Link href="/">
              <Button className="rounded-none bg-foreground px-8 py-6 text-sm font-medium uppercase tracking-widest text-background hover:bg-foreground/90">
                Explorar Tienda
              </Button>
            </Link>
          </div>
        )}
      </div>

      <Footer />
    </main>
  );
}
