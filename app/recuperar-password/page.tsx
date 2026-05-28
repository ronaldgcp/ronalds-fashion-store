'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2, ArrowLeft, Mail, CheckCircle } from 'lucide-react';
import { useAuthStore } from '@/lib/store';

export default function RecuperarPasswordPage() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');
  const { users } = useAuthStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Simular delay de envío
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Verificar si el email existe en los usuarios registrados
    const userExists = users.some((user) => user.email.toLowerCase() === email.toLowerCase());

    if (!userExists) {
      setError('No existe una cuenta asociada a este email');
      setIsLoading(false);
      return;
    }

    // Simular envío exitoso
    setIsSubmitted(true);
    setIsLoading(false);
  };

  return (
    <main className="min-h-screen bg-background">
      <Header />

      <div className="flex min-h-screen items-center justify-center px-4 pt-20">
        <div className="w-full max-w-md">
          {!isSubmitted ? (
            <>
              <Link
                href="/login"
                className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
                Volver al inicio de sesión
              </Link>

              <div className="mb-8">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-secondary">
                  <Mail className="h-6 w-6 text-foreground" />
                </div>
                <h1 className="text-3xl font-light tracking-wide">
                  Recuperar contraseña
                </h1>
                <p className="mt-2 text-muted-foreground">
                  Introduce tu email y te enviaremos instrucciones para restablecer tu contraseña.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {error && (
                  <div className="rounded-md bg-destructive/10 p-4 text-sm text-destructive">
                    {error}
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="tu@email.com"
                    required
                    className="rounded-none"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full rounded-none bg-foreground py-6 text-sm font-medium uppercase tracking-widest text-background hover:bg-foreground/90"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Enviando...
                    </>
                  ) : (
                    'Enviar instrucciones'
                  )}
                </Button>
              </form>

              <div className="mt-8 text-center">
                <p className="text-sm text-muted-foreground">
                  ¿Recordaste tu contraseña?{' '}
                  <Link
                    href="/login"
                    className="font-medium text-foreground hover:underline"
                  >
                    Iniciar sesión
                  </Link>
                </p>
              </div>
            </>
          ) : (
            <div className="text-center">
              <div className="mb-6 flex justify-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
              </div>
              
              <h1 className="text-3xl font-light tracking-wide">
                Email enviado
              </h1>
              
              <p className="mt-4 text-muted-foreground">
                Hemos enviado las instrucciones para restablecer tu contraseña a:
              </p>
              
              <p className="mt-2 font-medium text-foreground">
                {email}
              </p>
              
              <p className="mt-6 text-sm text-muted-foreground">
                Si no recibes el email en unos minutos, revisa tu carpeta de spam.
              </p>

              <div className="mt-8 space-y-4">
                <Button
                  onClick={() => {
                    setIsSubmitted(false);
                    setEmail('');
                  }}
                  variant="outline"
                  className="w-full rounded-none py-6 text-sm font-medium uppercase tracking-widest"
                >
                  Enviar de nuevo
                </Button>
                
                <Link href="/login">
                  <Button className="w-full rounded-none bg-foreground py-6 text-sm font-medium uppercase tracking-widest text-background hover:bg-foreground/90">
                    Volver al inicio de sesión
                  </Button>
                </Link>
              </div>

              <p className="mt-8 text-xs text-muted-foreground">
                Nota: En esta demo, el email no se envía realmente. 
                Para probar, puedes usar el email de un usuario registrado.
              </p>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </main>
  );
}
