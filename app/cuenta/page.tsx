'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { useAuthStore } from '@/lib/store';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  User, 
  Package, 
  MapPin, 
  LogOut, 
  ChevronRight,
  Loader2
} from 'lucide-react';
import { cn } from '@/lib/utils';

type Tab = 'profile' | 'orders' | 'address';

export default function AccountPage() {
  const router = useRouter();
  const { user, isAuthenticated, logout, updateProfile, updateAddress } = useAuthStore();
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState('');

  const [profileForm, setProfileForm] = useState({
    name: '',
    email: '',
  });

  const [addressForm, setAddressForm] = useState({
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'España',
    phone: '',
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && !isAuthenticated) {
      router.push('/login');
    }
  }, [mounted, isAuthenticated, router]);

  useEffect(() => {
    if (user) {
      setProfileForm({
        name: user.name || '',
        email: user.email || '',
      });
      setAddressForm({
        street: user.address?.street || '',
        city: user.address?.city || '',
        state: user.address?.state || '',
        zipCode: user.address?.zipCode || '',
        country: user.address?.country || 'España',
        phone: user.address?.phone || '',
      });
    }
  }, [user]);

  const handleSaveProfile = async () => {
    setIsSaving(true);
    await new Promise((resolve) => setTimeout(resolve, 500));
    updateProfile({ name: profileForm.name });
    setIsSaving(false);
    setIsEditing(false);
    setMessage('Perfil actualizado correctamente');
    setTimeout(() => setMessage(''), 3000);
  };

  const handleSaveAddress = async () => {
    setIsSaving(true);
    await new Promise((resolve) => setTimeout(resolve, 500));
    updateAddress(addressForm);
    setIsSaving(false);
    setIsEditing(false);
    setMessage('Dirección actualizada correctamente');
    setTimeout(() => setMessage(''), 3000);
  };

  const handleLogout = () => {
    logout();
    router.push('/');
  };

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

  const tabs = [
    { id: 'profile' as Tab, label: 'Mi Perfil', icon: User },
    { id: 'orders' as Tab, label: 'Mis Pedidos', icon: Package },
    { id: 'address' as Tab, label: 'Dirección', icon: MapPin },
  ];

  return (
    <main className="min-h-screen">
      <Header />

      <div className="mx-auto max-w-7xl px-4 pb-20 pt-28 sm:px-6 lg:px-8">
        <h1 className="mb-8 text-3xl font-light tracking-wide">Mi Cuenta</h1>

        <div className="grid gap-8 lg:grid-cols-4">
          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <nav className="space-y-1">
              {tabs.map((tab) => {
                const TabIcon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => {
                      setActiveTab(tab.id);
                      setIsEditing(false);
                    }}
                    className={cn(
                      'flex w-full items-center justify-between rounded-none border px-4 py-3 text-left transition-colors',
                      activeTab === tab.id
                        ? 'border-foreground bg-foreground text-background'
                        : 'border-border hover:border-foreground'
                    )}
                  >
                    <span className="flex items-center gap-3">
                      <TabIcon className="h-5 w-5" />
                      {tab.label}
                    </span>
                    <ChevronRight className="h-4 w-4" />
                  </button>
                );
              })}
              <button
                onClick={handleLogout}
                className="flex w-full items-center gap-3 rounded-none border border-border px-4 py-3 text-left text-destructive transition-colors hover:bg-destructive/10"
              >
                <LogOut className="h-5 w-5" />
                Cerrar Sesión
              </button>
            </nav>
          </aside>

          {/* Content */}
          <div className="lg:col-span-3">
            {message && (
              <div className="mb-6 rounded-none border border-green-600 bg-green-50 p-4 text-sm text-green-600">
                {message}
              </div>
            )}

            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <div className="border border-border p-6">
                <div className="mb-6 flex items-center justify-between">
                  <h2 className="text-xl font-medium">Información Personal</h2>
                  {!isEditing && (
                    <Button
                      variant="outline"
                      onClick={() => setIsEditing(true)}
                      className="rounded-none"
                    >
                      Editar
                    </Button>
                  )}
                </div>

                {isEditing ? (
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="name">Nombre</Label>
                      <Input
                        id="name"
                        value={profileForm.name}
                        onChange={(e) =>
                          setProfileForm({ ...profileForm, name: e.target.value })
                        }
                        className="mt-1 rounded-none"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={profileForm.email}
                        disabled
                        className="mt-1 rounded-none bg-secondary"
                      />
                      <p className="mt-1 text-xs text-muted-foreground">
                        El email no se puede cambiar
                      </p>
                    </div>
                    <div className="flex gap-4 pt-4">
                      <Button
                        onClick={handleSaveProfile}
                        disabled={isSaving}
                        className="rounded-none bg-foreground text-background hover:bg-foreground/90"
                      >
                        {isSaving ? (
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        ) : null}
                        Guardar
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => setIsEditing(false)}
                        className="rounded-none"
                      >
                        Cancelar
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Nombre</p>
                      <p className="font-medium">{user?.name}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Email</p>
                      <p className="font-medium">{user?.email}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Miembro desde</p>
                      <p className="font-medium">
                        {user?.createdAt
                          ? new Date(user.createdAt).toLocaleDateString('es-ES', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                            })
                          : '-'}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Orders Tab */}
            {activeTab === 'orders' && (
              <div className="border border-border p-6">
                <h2 className="mb-6 text-xl font-medium">Mis Pedidos</h2>

                {user?.orders && user.orders.length > 0 ? (
                  <div className="space-y-4">
                    {user.orders.map((order) => (
                      <div
                        key={order.id}
                        className="border border-border p-4"
                      >
                        <div className="mb-4 flex items-start justify-between">
                          <div>
                            <p className="text-sm text-muted-foreground">
                              Pedido #{order.id.slice(0, 8)}
                            </p>
                            <p className="font-medium">
                              {new Date(order.createdAt).toLocaleDateString('es-ES', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                              })}
                            </p>
                          </div>
                          <span
                            className={cn(
                              'px-3 py-1 text-xs font-medium uppercase',
                              order.status === 'delivered' && 'bg-green-100 text-green-700',
                              order.status === 'processing' && 'bg-blue-100 text-blue-700',
                              order.status === 'shipped' && 'bg-yellow-100 text-yellow-700',
                              order.status === 'pending' && 'bg-gray-100 text-gray-700',
                              order.status === 'cancelled' && 'bg-red-100 text-red-700'
                            )}
                          >
                            {order.status === 'delivered' && 'Entregado'}
                            {order.status === 'processing' && 'En proceso'}
                            {order.status === 'shipped' && 'Enviado'}
                            {order.status === 'pending' && 'Pendiente'}
                            {order.status === 'cancelled' && 'Cancelado'}
                          </span>
                        </div>
                        <div className="mb-4 flex flex-wrap gap-2">
                          {order.items.slice(0, 3).map((item, idx) => (
                            <div
                              key={idx}
                              className="relative h-16 w-12 overflow-hidden bg-secondary"
                            >
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img
                                src={item.product.images[0]}
                                alt={item.product.name}
                                className="h-full w-full object-cover"
                              />
                            </div>
                          ))}
                          {order.items.length > 3 && (
                            <div className="flex h-16 w-12 items-center justify-center bg-secondary text-sm">
                              +{order.items.length - 3}
                            </div>
                          )}
                        </div>
                        <div className="flex items-center justify-between">
                          <p className="font-semibold">{order.total.toFixed(2)}€</p>
                          {order.trackingNumber && (
                            <p className="text-sm text-muted-foreground">
                              Seguimiento: {order.trackingNumber}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="py-12 text-center">
                    <Package className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
                    <p className="mb-2 font-medium">No tienes pedidos aún</p>
                    <p className="mb-6 text-sm text-muted-foreground">
                      Explora nuestra colección y encuentra algo especial.
                    </p>
                    <Link href="/">
                      <Button className="rounded-none bg-foreground text-background hover:bg-foreground/90">
                        Explorar Tienda
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            )}

            {/* Address Tab */}
            {activeTab === 'address' && (
              <div className="border border-border p-6">
                <div className="mb-6 flex items-center justify-between">
                  <h2 className="text-xl font-medium">Dirección de Envío</h2>
                  {!isEditing && (
                    <Button
                      variant="outline"
                      onClick={() => setIsEditing(true)}
                      className="rounded-none"
                    >
                      {user?.address?.street ? 'Editar' : 'Añadir'}
                    </Button>
                  )}
                </div>

                {isEditing ? (
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="street">Dirección</Label>
                      <Input
                        id="street"
                        value={addressForm.street}
                        onChange={(e) =>
                          setAddressForm({ ...addressForm, street: e.target.value })
                        }
                        placeholder="Calle, número, piso..."
                        className="mt-1 rounded-none"
                      />
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <Label htmlFor="city">Ciudad</Label>
                        <Input
                          id="city"
                          value={addressForm.city}
                          onChange={(e) =>
                            setAddressForm({ ...addressForm, city: e.target.value })
                          }
                          className="mt-1 rounded-none"
                        />
                      </div>
                      <div>
                        <Label htmlFor="state">Provincia</Label>
                        <Input
                          id="state"
                          value={addressForm.state}
                          onChange={(e) =>
                            setAddressForm({ ...addressForm, state: e.target.value })
                          }
                          className="mt-1 rounded-none"
                        />
                      </div>
                      <div>
                        <Label htmlFor="zipCode">Código Postal</Label>
                        <Input
                          id="zipCode"
                          value={addressForm.zipCode}
                          onChange={(e) =>
                            setAddressForm({ ...addressForm, zipCode: e.target.value })
                          }
                          className="mt-1 rounded-none"
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone">Teléfono</Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={addressForm.phone}
                          onChange={(e) =>
                            setAddressForm({ ...addressForm, phone: e.target.value })
                          }
                          className="mt-1 rounded-none"
                        />
                      </div>
                    </div>
                    <div className="flex gap-4 pt-4">
                      <Button
                        onClick={handleSaveAddress}
                        disabled={isSaving}
                        className="rounded-none bg-foreground text-background hover:bg-foreground/90"
                      >
                        {isSaving ? (
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        ) : null}
                        Guardar
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => setIsEditing(false)}
                        className="rounded-none"
                      >
                        Cancelar
                      </Button>
                    </div>
                  </div>
                ) : user?.address?.street ? (
                  <div className="space-y-2">
                    <p>{user.address.street}</p>
                    <p>
                      {user.address.zipCode} {user.address.city}
                    </p>
                    <p>{user.address.state}</p>
                    <p>{user.address.country}</p>
                    <p className="text-muted-foreground">{user.address.phone}</p>
                  </div>
                ) : (
                  <div className="py-8 text-center">
                    <MapPin className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
                    <p className="mb-2 font-medium">Sin dirección guardada</p>
                    <p className="text-sm text-muted-foreground">
                      Añade una dirección para un checkout más rápido.
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
