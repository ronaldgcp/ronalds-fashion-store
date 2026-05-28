'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Search, ShoppingBag, User, Menu, X, Heart, ChevronDown } from 'lucide-react';
import { useCartStore, useAuthStore } from '@/lib/store';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { categories, collections } from '@/lib/data';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const itemCount = useCartStore((state) => state.getItemCount());
  const { isAuthenticated, user, logout } = useAuthStore();

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-background/95 backdrop-blur-md shadow-sm py-2' 
          : 'bg-gradient-to-b from-background/80 to-transparent py-4'
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Mobile Header */}
        <div className="flex lg:hidden h-14 items-center justify-between">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="h-10 w-10"
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>

          {/* Logo centrado en móvil */}
          <Link href="/" className="absolute left-1/2 -translate-x-1/2">
            <h1 className="text-xl font-semibold tracking-[0.25em] text-foreground">
              RONALD'S
            </h1>
          </Link>

          <div className="flex items-center gap-1">
            <Link href="/carrito">
              <Button variant="ghost" size="icon" className="relative h-10 w-10">
                <ShoppingBag className="h-5 w-5" />
                {mounted && itemCount > 0 && (
                  <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-accent text-[10px] text-foreground font-medium">
                    {itemCount}
                  </span>
                )}
              </Button>
            </Link>
          </div>
        </div>

        {/* Desktop Header */}
        <div className="hidden lg:flex h-14 items-center">
          {/* Navigation Left */}
          <nav className="flex items-center gap-6 flex-1">
            {categories.slice(0, 3).map((category) => (
              <div
                key={category.id}
                className="relative"
                onMouseEnter={() => setActiveCategory(category.id)}
                onMouseLeave={() => setActiveCategory(null)}
              >
                <Link
                  href={`/categoria/${category.slug}`}
                  className="flex items-center gap-1 text-sm font-medium text-foreground/70 transition-colors hover:text-foreground py-4"
                >
                  {category.name}
                  {category.subcategories && category.subcategories.length > 0 && (
                    <ChevronDown className={`h-3 w-3 transition-transform duration-200 ${activeCategory === category.id ? 'rotate-180' : ''}`} />
                  )}
                </Link>
                
                {/* Dropdown */}
                {activeCategory === category.id && category.subcategories && (
                  <div className="absolute top-full left-0 pt-2 animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="bg-background border border-border/50 shadow-2xl rounded-xl py-3 min-w-56">
                      <Link
                        href={`/categoria/${category.slug}`}
                        className="block px-5 py-2.5 text-sm font-medium hover:bg-secondary/50 transition-colors"
                      >
                        Ver Todo
                      </Link>
                      <div className="border-t border-border/50 my-2 mx-4" />
                      {category.subcategories.map((sub) => (
                        <Link
                          key={sub.slug}
                          href={`/categoria/${category.slug}/${sub.slug}`}
                          className="block px-5 py-2 text-sm text-muted-foreground hover:bg-secondary/50 hover:text-foreground transition-colors"
                        >
                          {sub.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
            
            {/* Collections */}
            <div
              className="relative"
              onMouseEnter={() => setActiveCategory('collections')}
              onMouseLeave={() => setActiveCategory(null)}
            >
              <Link
                href="/colecciones"
                className="flex items-center gap-1 text-sm font-medium text-foreground/70 transition-colors hover:text-foreground py-4"
              >
                Colecciones
                <ChevronDown className={`h-3 w-3 transition-transform duration-200 ${activeCategory === 'collections' ? 'rotate-180' : ''}`} />
              </Link>
              
              {activeCategory === 'collections' && (
                <div className="absolute top-full left-0 pt-2 animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="bg-background border border-border/50 shadow-2xl rounded-xl py-3 min-w-56">
                    {collections.slice(0, 6).map((col) => (
                      <Link
                        key={col.id}
                        href={`/coleccion/${col.slug}`}
                        className="block px-5 py-2 text-sm text-muted-foreground hover:bg-secondary/50 hover:text-foreground transition-colors"
                      >
                        {col.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </nav>

          {/* Logo Center - Desktop */}
          <Link href="/" className="px-8">
            <h1 className="text-2xl font-semibold tracking-[0.3em] text-foreground">
              RONALD'S
            </h1>
          </Link>

          {/* Navigation Right */}
          <nav className="flex items-center gap-6 flex-1 justify-end">
            {categories.slice(3, 6).map((category) => (
              <div
                key={category.id}
                className="relative"
                onMouseEnter={() => setActiveCategory(category.id)}
                onMouseLeave={() => setActiveCategory(null)}
              >
                <Link
                  href={`/categoria/${category.slug}`}
                  className="flex items-center gap-1 text-sm font-medium text-foreground/70 transition-colors hover:text-foreground py-4"
                >
                  {category.name}
                  {category.subcategories && category.subcategories.length > 0 && (
                    <ChevronDown className={`h-3 w-3 transition-transform duration-200 ${activeCategory === category.id ? 'rotate-180' : ''}`} />
                  )}
                </Link>
                
                {activeCategory === category.id && category.subcategories && (
                  <div className="absolute top-full right-0 pt-2 animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="bg-background border border-border/50 shadow-2xl rounded-xl py-3 min-w-56">
                      <Link
                        href={`/categoria/${category.slug}`}
                        className="block px-5 py-2.5 text-sm font-medium hover:bg-secondary/50 transition-colors"
                      >
                        Ver Todo
                      </Link>
                      <div className="border-t border-border/50 my-2 mx-4" />
                      {category.subcategories.map((sub) => (
                        <Link
                          key={sub.slug}
                          href={`/categoria/${category.slug}/${sub.slug}`}
                          className="block px-5 py-2 text-sm text-muted-foreground hover:bg-secondary/50 hover:text-foreground transition-colors"
                        >
                          {sub.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
            
            {/* Actions */}
            <div className="flex items-center gap-1 ml-4 pl-4 border-l border-border/50">
              <Button variant="ghost" size="icon" className="h-9 w-9 text-foreground/70 hover:text-foreground">
                <Search className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-9 w-9 text-foreground/70 hover:text-foreground">
                <Heart className="h-4 w-4" />
              </Button>

              {/* User Menu */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-9 w-9 text-foreground/70 hover:text-foreground">
                    <User className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  {isAuthenticated && mounted ? (
                    <>
                      <DropdownMenuItem className="font-medium">
                        Hola, {user?.name}
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild>
                        <Link href="/cuenta">Mi Cuenta</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href="/cuenta/pedidos">Mis Pedidos</Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={logout}>
                        Cerrar Sesión
                      </DropdownMenuItem>
                    </>
                  ) : (
                    <>
                      <DropdownMenuItem asChild>
                        <Link href="/login">Iniciar Sesión</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href="/registro">Crear Cuenta</Link>
                      </DropdownMenuItem>
                    </>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Cart */}
              <Link href="/carrito">
                <Button variant="ghost" size="icon" className="relative h-9 w-9 text-foreground/70 hover:text-foreground">
                  <ShoppingBag className="h-4 w-4" />
                  {mounted && itemCount > 0 && (
                    <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-accent text-[10px] text-foreground font-medium">
                      {itemCount}
                    </span>
                  )}
                </Button>
              </Link>
            </div>
          </nav>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="lg:hidden animate-in slide-in-from-top duration-300">
          <div className="border-t border-border bg-background px-6 py-6 max-h-[80vh] overflow-y-auto">
            <nav className="flex flex-col gap-5">
              {categories.map((category) => (
                <div key={category.id}>
                  <Link
                    href={`/categoria/${category.slug}`}
                    className="text-base font-medium uppercase tracking-wider block mb-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {category.name}
                  </Link>
                  {category.subcategories && (
                    <div className="pl-4 flex flex-col gap-2 border-l border-border/50">
                      {category.subcategories.slice(0, 5).map((sub) => (
                        <Link
                          key={sub.slug}
                          href={`/categoria/${category.slug}/${sub.slug}`}
                          className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          {sub.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              
              <div className="border-t border-border pt-5 mt-2">
                <Link
                  href="/colecciones"
                  className="text-base font-medium uppercase tracking-wider"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Colecciones
                </Link>
              </div>

              {/* Mobile Account Links */}
              <div className="border-t border-border pt-5 mt-2 flex flex-col gap-3">
                {isAuthenticated && mounted ? (
                  <>
                    <Link
                      href="/cuenta"
                      className="text-sm text-muted-foreground hover:text-foreground"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Mi Cuenta
                    </Link>
                    <Link
                      href="/cuenta/pedidos"
                      className="text-sm text-muted-foreground hover:text-foreground"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Mis Pedidos
                    </Link>
                    <button
                      onClick={() => {
                        logout();
                        setIsMenuOpen(false);
                      }}
                      className="text-sm text-muted-foreground hover:text-foreground text-left"
                    >
                      Cerrar Sesión
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      href="/login"
                      className="text-sm text-muted-foreground hover:text-foreground"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Iniciar Sesión
                    </Link>
                    <Link
                      href="/registro"
                      className="text-sm text-muted-foreground hover:text-foreground"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Crear Cuenta
                    </Link>
                  </>
                )}
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
