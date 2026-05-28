'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { useCartStore, useAuthStore, useOrderStore } from '@/lib/store';
import { shippingMethods } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  ChevronLeft, 
  CreditCard, 
  Truck, 
  Check,
  Lock,
  Loader2
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Address, ShippingMethod } from '@/lib/types';

type CheckoutStep = 'shipping' | 'payment' | 'confirmation';

export default function CheckoutPage() {
  const router = useRouter();
  const { items, getSubtotal, clearCart } = useCartStore();
  const { isAuthenticated, user, addOrder, updateAddress } = useAuthStore();
  const { setShippingAddress, setShippingMethod, createOrder, shippingMethod } = useOrderStore();
  
  const [mounted, setMounted] = useState(false);
  const [currentStep, setCurrentStep] = useState<CheckoutStep>('shipping');
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderId, setOrderId] = useState<string | null>(null);

  // Form states
  const [shippingForm, setShippingForm] = useState<Address>({
    street: user?.address?.street || '',
    city: user?.address?.city || '',
    state: user?.address?.state || '',
    zipCode: user?.address?.zipCode || '',
    country: user?.address?.country || 'España',
    phone: user?.address?.phone || '',
  });

  const [selectedShipping, setSelectedShipping] = useState<ShippingMethod | null>(null);

  const [paymentForm, setPaymentForm] = useState({
    cardNumber: '',
    cardName: '',
    expiry: '',
    cvv: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    setMounted(true);
  }, []);

  const subtotal = mounted ? getSubtotal() : 0;
  const shippingCost = selectedShipping?.price || 0;
  const freeShippingThreshold = 150;
  const qualifiesForFreeShipping = subtotal >= freeShippingThreshold;
  const finalShipping = qualifiesForFreeShipping && selectedShipping?.id !== 'overnight' 
    ? 0 
    : shippingCost;
  const tax = subtotal * 0.21; // 21% IVA
  const total = subtotal + finalShipping + tax;

  // Redirect if cart is empty
  useEffect(() => {
    if (mounted && items.length === 0 && !orderId) {
      router.push('/carrito');
    }
  }, [mounted, items, router, orderId]);

  const validateShippingForm = () => {
    const newErrors: Record<string, string> = {};
    if (!shippingForm.street) newErrors.street = 'Dirección requerida';
    if (!shippingForm.city) newErrors.city = 'Ciudad requerida';
    if (!shippingForm.state) newErrors.state = 'Provincia requerida';
    if (!shippingForm.zipCode) newErrors.zipCode = 'Código postal requerido';
    if (!shippingForm.phone) newErrors.phone = 'Teléfono requerido';
    if (!selectedShipping) newErrors.shipping = 'Selecciona un método de envío';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validatePaymentForm = () => {
    const newErrors: Record<string, string> = {};
    if (!paymentForm.cardNumber || paymentForm.cardNumber.replace(/\s/g, '').length < 16) {
      newErrors.cardNumber = 'Número de tarjeta inválido';
    }
    if (!paymentForm.cardName) newErrors.cardName = 'Nombre requerido';
    if (!paymentForm.expiry || !/^\d{2}\/\d{2}$/.test(paymentForm.expiry)) {
      newErrors.expiry = 'Fecha inválida (MM/AA)';
    }
    if (!paymentForm.cvv || paymentForm.cvv.length < 3) {
      newErrors.cvv = 'CVV inválido';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateShippingForm()) {
      setShippingAddress(shippingForm);
      if (selectedShipping) {
        setShippingMethod(selectedShipping);
      }
      setCurrentStep('payment');
    }
  };

  const handlePaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validatePaymentForm()) return;

    setIsProcessing(true);

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Create order
    const order = createOrder(items, total, subtotal, finalShipping, tax);
    order.paymentStatus = 'paid';
    order.status = 'processing';
    order.trackingNumber = `RONALDS-${Date.now()}`;

    // Save order to user
    if (isAuthenticated) {
      addOrder(order);
      updateAddress(shippingForm);
    }

    setOrderId(order.id);
    clearCart();
    setCurrentStep('confirmation');
    setIsProcessing(false);
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    return parts.length ? parts.join(' ') : value;
  };

  const formatExpiry = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4);
    }
    return v;
  };

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

  const steps = [
    { id: 'shipping', label: 'Envío', icon: Truck },
    { id: 'payment', label: 'Pago', icon: CreditCard },
    { id: 'confirmation', label: 'Confirmación', icon: Check },
  ];

  return (
    <main className="min-h-screen bg-background">
      <Header />

      <div className="mx-auto max-w-7xl px-4 pb-20 pt-28 sm:px-6 lg:px-8">
        {/* Back Link */}
        {currentStep !== 'confirmation' && (
          <Link
            href={currentStep === 'shipping' ? '/carrito' : '#'}
            onClick={(e) => {
              if (currentStep === 'payment') {
                e.preventDefault();
                setCurrentStep('shipping');
              }
            }}
            className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
          >
            <ChevronLeft className="h-4 w-4" />
            {currentStep === 'shipping' ? 'Volver al carrito' : 'Volver a envío'}
          </Link>
        )}

        {/* Progress Steps */}
        <div className="mb-12">
          <div className="flex items-center justify-center gap-4">
            {steps.map((step, idx) => {
              const StepIcon = step.icon;
              const isActive = currentStep === step.id;
              const isCompleted = 
                (step.id === 'shipping' && (currentStep === 'payment' || currentStep === 'confirmation')) ||
                (step.id === 'payment' && currentStep === 'confirmation');

              return (
                <div key={step.id} className="flex items-center">
                  <div className="flex flex-col items-center">
                    <div
                      className={cn(
                        'flex h-10 w-10 items-center justify-center rounded-full border-2 transition-colors',
                        isActive && 'border-foreground bg-foreground text-background',
                        isCompleted && 'border-green-600 bg-green-600 text-white',
                        !isActive && !isCompleted && 'border-border text-muted-foreground'
                      )}
                    >
                      {isCompleted ? (
                        <Check className="h-5 w-5" />
                      ) : (
                        <StepIcon className="h-5 w-5" />
                      )}
                    </div>
                    <span
                      className={cn(
                        'mt-2 text-xs font-medium',
                        isActive && 'text-foreground',
                        !isActive && 'text-muted-foreground'
                      )}
                    >
                      {step.label}
                    </span>
                  </div>
                  {idx < steps.length - 1 && (
                    <div
                      className={cn(
                        'mx-4 h-0.5 w-16 sm:w-24',
                        isCompleted ? 'bg-green-600' : 'bg-border'
                      )}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Confirmation Step */}
        {currentStep === 'confirmation' && (
          <div className="mx-auto max-w-2xl text-center">
            <div className="mb-8 flex justify-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
                <Check className="h-10 w-10 text-green-600" />
              </div>
            </div>
            <h1 className="mb-4 text-3xl font-light tracking-wide">
              ¡Pedido Confirmado!
            </h1>
            <p className="mb-2 text-muted-foreground">
              Gracias por tu compra. Hemos enviado la confirmación a tu email.
            </p>
            <p className="mb-8 text-sm text-muted-foreground">
              Número de pedido: <span className="font-mono font-medium text-foreground">{orderId}</span>
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Link href="/cuenta/pedidos">
                <Button
                  variant="outline"
                  className="w-full rounded-none border-foreground px-8 py-6 text-sm font-medium uppercase tracking-widest sm:w-auto"
                >
                  Ver Mis Pedidos
                </Button>
              </Link>
              <Link href="/">
                <Button className="w-full rounded-none bg-foreground px-8 py-6 text-sm font-medium uppercase tracking-widest text-background hover:bg-foreground/90 sm:w-auto">
                  Seguir Comprando
                </Button>
              </Link>
            </div>
          </div>
        )}

        {/* Shipping & Payment Steps */}
        {currentStep !== 'confirmation' && (
          <div className="grid gap-12 lg:grid-cols-3">
            {/* Form */}
            <div className="lg:col-span-2">
              {/* Shipping Form */}
              {currentStep === 'shipping' && (
                <form onSubmit={handleShippingSubmit} className="space-y-8">
                  <div>
                    <h2 className="mb-6 text-xl font-medium">Dirección de Envío</h2>
                    
                    {!isAuthenticated && (
                      <div className="mb-6 rounded-none border border-border bg-secondary/30 p-4">
                        <p className="text-sm">
                          ¿Ya tienes cuenta?{' '}
                          <Link href="/login" className="font-medium underline">
                            Inicia sesión
                          </Link>{' '}
                          para un checkout más rápido.
                        </p>
                      </div>
                    )}

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="sm:col-span-2">
                        <Label htmlFor="street">Dirección</Label>
                        <Input
                          id="street"
                          value={shippingForm.street}
                          onChange={(e) =>
                            setShippingForm({ ...shippingForm, street: e.target.value })
                          }
                          placeholder="Calle, número, piso..."
                          className={cn('mt-1 rounded-none', errors.street && 'border-destructive')}
                        />
                        {errors.street && (
                          <p className="mt-1 text-xs text-destructive">{errors.street}</p>
                        )}
                      </div>
                      <div>
                        <Label htmlFor="city">Ciudad</Label>
                        <Input
                          id="city"
                          value={shippingForm.city}
                          onChange={(e) =>
                            setShippingForm({ ...shippingForm, city: e.target.value })
                          }
                          placeholder="Madrid"
                          className={cn('mt-1 rounded-none', errors.city && 'border-destructive')}
                        />
                        {errors.city && (
                          <p className="mt-1 text-xs text-destructive">{errors.city}</p>
                        )}
                      </div>
                      <div>
                        <Label htmlFor="state">Provincia</Label>
                        <Input
                          id="state"
                          value={shippingForm.state}
                          onChange={(e) =>
                            setShippingForm({ ...shippingForm, state: e.target.value })
                          }
                          placeholder="Madrid"
                          className={cn('mt-1 rounded-none', errors.state && 'border-destructive')}
                        />
                        {errors.state && (
                          <p className="mt-1 text-xs text-destructive">{errors.state}</p>
                        )}
                      </div>
                      <div>
                        <Label htmlFor="zipCode">Código Postal</Label>
                        <Input
                          id="zipCode"
                          value={shippingForm.zipCode}
                          onChange={(e) =>
                            setShippingForm({ ...shippingForm, zipCode: e.target.value })
                          }
                          placeholder="28001"
                          className={cn('mt-1 rounded-none', errors.zipCode && 'border-destructive')}
                        />
                        {errors.zipCode && (
                          <p className="mt-1 text-xs text-destructive">{errors.zipCode}</p>
                        )}
                      </div>
                      <div>
                        <Label htmlFor="phone">Teléfono</Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={shippingForm.phone}
                          onChange={(e) =>
                            setShippingForm({ ...shippingForm, phone: e.target.value })
                          }
                          placeholder="+34 600 000 000"
                          className={cn('mt-1 rounded-none', errors.phone && 'border-destructive')}
                        />
                        {errors.phone && (
                          <p className="mt-1 text-xs text-destructive">{errors.phone}</p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Shipping Method */}
                  <div>
                    <h2 className="mb-6 text-xl font-medium">Método de Envío</h2>
                    {errors.shipping && (
                      <p className="mb-4 text-sm text-destructive">{errors.shipping}</p>
                    )}
                    <div className="space-y-3">
                      {shippingMethods.map((method) => {
                        const isFree = qualifiesForFreeShipping && method.id !== 'overnight';
                        return (
                          <label
                            key={method.id}
                            className={cn(
                              'flex cursor-pointer items-center justify-between border p-4 transition-colors',
                              selectedShipping?.id === method.id
                                ? 'border-foreground bg-secondary/30'
                                : 'border-border hover:border-foreground/50'
                            )}
                          >
                            <div className="flex items-center gap-4">
                              <input
                                type="radio"
                                name="shipping"
                                checked={selectedShipping?.id === method.id}
                                onChange={() => setSelectedShipping(method)}
                                className="h-4 w-4"
                              />
                              <div>
                                <p className="font-medium">{method.name}</p>
                                <p className="text-sm text-muted-foreground">
                                  {method.estimatedDays}
                                </p>
                              </div>
                            </div>
                            <span className="font-medium">
                              {isFree ? (
                                <span className="text-green-600">Gratis</span>
                              ) : (
                                `${method.price.toFixed(2)}€`
                              )}
                            </span>
                          </label>
                        );
                      })}
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full rounded-none bg-foreground py-6 text-sm font-medium uppercase tracking-widest text-background hover:bg-foreground/90"
                  >
                    Continuar al Pago
                  </Button>
                </form>
              )}

              {/* Payment Form */}
              {currentStep === 'payment' && (
                <form onSubmit={handlePaymentSubmit} className="space-y-8">
                  <div>
                    <h2 className="mb-6 text-xl font-medium">Información de Pago</h2>
                    
                    <div className="mb-6 flex items-center gap-2 text-sm text-muted-foreground">
                      <Lock className="h-4 w-4" />
                      <span>Tus datos de pago están protegidos con encriptación SSL</span>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="cardNumber">Número de Tarjeta</Label>
                        <Input
                          id="cardNumber"
                          value={paymentForm.cardNumber}
                          onChange={(e) =>
                            setPaymentForm({
                              ...paymentForm,
                              cardNumber: formatCardNumber(e.target.value),
                            })
                          }
                          placeholder="1234 5678 9012 3456"
                          maxLength={19}
                          className={cn(
                            'mt-1 rounded-none font-mono',
                            errors.cardNumber && 'border-destructive'
                          )}
                        />
                        {errors.cardNumber && (
                          <p className="mt-1 text-xs text-destructive">{errors.cardNumber}</p>
                        )}
                      </div>
                      <div>
                        <Label htmlFor="cardName">Nombre en la Tarjeta</Label>
                        <Input
                          id="cardName"
                          value={paymentForm.cardName}
                          onChange={(e) =>
                            setPaymentForm({ ...paymentForm, cardName: e.target.value.toUpperCase() })
                          }
                          placeholder="NOMBRE APELLIDO"
                          className={cn(
                            'mt-1 rounded-none uppercase',
                            errors.cardName && 'border-destructive'
                          )}
                        />
                        {errors.cardName && (
                          <p className="mt-1 text-xs text-destructive">{errors.cardName}</p>
                        )}
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="expiry">Fecha de Expiración</Label>
                          <Input
                            id="expiry"
                            value={paymentForm.expiry}
                            onChange={(e) =>
                              setPaymentForm({
                                ...paymentForm,
                                expiry: formatExpiry(e.target.value),
                              })
                            }
                            placeholder="MM/AA"
                            maxLength={5}
                            className={cn(
                              'mt-1 rounded-none font-mono',
                              errors.expiry && 'border-destructive'
                            )}
                          />
                          {errors.expiry && (
                            <p className="mt-1 text-xs text-destructive">{errors.expiry}</p>
                          )}
                        </div>
                        <div>
                          <Label htmlFor="cvv">CVV</Label>
                          <Input
                            id="cvv"
                            type="password"
                            value={paymentForm.cvv}
                            onChange={(e) =>
                              setPaymentForm({
                                ...paymentForm,
                                cvv: e.target.value.replace(/\D/g, '').slice(0, 4),
                              })
                            }
                            placeholder="•••"
                            maxLength={4}
                            className={cn(
                              'mt-1 rounded-none',
                              errors.cvv && 'border-destructive'
                            )}
                          />
                          {errors.cvv && (
                            <p className="mt-1 text-xs text-destructive">{errors.cvv}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    disabled={isProcessing}
                    className="w-full rounded-none bg-foreground py-6 text-sm font-medium uppercase tracking-widest text-background hover:bg-foreground/90"
                  >
                    {isProcessing ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Procesando Pago...
                      </>
                    ) : (
                      `Pagar ${total.toFixed(2)}€`
                    )}
                  </Button>
                </form>
              )}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="sticky top-28 border border-border bg-card p-6">
                <h2 className="mb-6 text-lg font-medium">Resumen del Pedido</h2>

                {/* Items Preview */}
                <div className="mb-6 max-h-64 space-y-4 overflow-y-auto">
                  {items.map((item) => (
                    <div
                      key={`${item.product.id}-${item.selectedSize}-${item.selectedColor}`}
                      className="flex gap-4"
                    >
                      <div className="relative h-16 w-12 shrink-0 overflow-hidden bg-secondary">
                        <Image
                          src={item.product.images[0]}
                          alt={item.product.name}
                          fill
                          className="object-cover"
                        />
                        <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-foreground text-xs text-background">
                          {item.quantity}
                        </span>
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium line-clamp-1">{item.product.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {item.selectedSize} / {item.selectedColor}
                        </p>
                      </div>
                      <p className="text-sm font-medium">
                        {(item.product.price * item.quantity).toFixed(2)}€
                      </p>
                    </div>
                  ))}
                </div>

                <div className="space-y-3 border-t border-border pt-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>{subtotal.toFixed(2)}€</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Envío</span>
                    <span>
                      {finalShipping === 0 ? (
                        <span className="text-green-600">Gratis</span>
                      ) : selectedShipping ? (
                        `${finalShipping.toFixed(2)}€`
                      ) : (
                        'Calcular en el siguiente paso'
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">IVA (21%)</span>
                    <span>{tax.toFixed(2)}€</span>
                  </div>
                </div>

                <div className="flex justify-between border-t border-border pt-4 mt-4">
                  <span className="text-lg font-medium">Total</span>
                  <span className="text-lg font-semibold">{total.toFixed(2)}€</span>
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
