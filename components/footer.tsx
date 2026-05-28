import Link from 'next/link';
import { categories } from '@/lib/data';

export function Footer() {
  return (
    <footer className="border-t border-border bg-secondary/30">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <h2 className="text-2xl font-semibold tracking-[0.2em]">RONALD'S</h2>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              Moda de lujo para quienes aprecian la calidad y el diseño atemporal.
              Cada pieza es una declaración de elegancia.
            </p>
          </div>

          {/* Shop */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider">Tienda</h3>
            <ul className="mt-4 space-y-3">
              {categories.map((category) => (
                <li key={category.id}>
                  <Link
                    href={`/categoria/${category.slug}`}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/novedades"
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  Novedades
                </Link>
              </li>
            </ul>
          </div>

          {/* Help */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider">Ayuda</h3>
            <ul className="mt-4 space-y-3">
              <li>
                <Link
                  href="/envios"
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  Información de Envío
                </Link>
              </li>
              <li>
                <Link
                  href="/devoluciones"
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  Devoluciones
                </Link>
              </li>
              <li>
                <Link
                  href="/tallas"
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  Guía de Tallas
                </Link>
              </li>
              <li>
                <Link
                  href="/contacto"
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  Contacto
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider">Newsletter</h3>
            <p className="mt-4 text-sm text-muted-foreground">
              Suscríbete y recibe un 10% de descuento en tu primera compra.
            </p>
            <form className="mt-4">
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="tu@email.com"
                  className="flex-1 rounded-none border border-border bg-background px-4 py-2 text-sm placeholder:text-muted-foreground focus:border-foreground focus:outline-none"
                />
                <button
                  type="submit"
                  className="bg-foreground px-4 py-2 text-sm font-medium text-background transition-colors hover:bg-foreground/90"
                >
                  Unirse
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 md:flex-row">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} RONALD'S. Todos los derechos reservados.
          </p>
          <div className="flex gap-6">
            <Link href="/privacidad" className="text-xs text-muted-foreground hover:text-foreground">
              Política de Privacidad
            </Link>
            <Link href="/terminos" className="text-xs text-muted-foreground hover:text-foreground">
              Términos y Condiciones
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
