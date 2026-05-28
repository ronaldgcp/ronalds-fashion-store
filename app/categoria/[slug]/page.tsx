'use client';

import { useState, useMemo } from 'react';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { use } from 'react';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { ProductCard } from '@/components/product-card';
import { categories, getProductsByCategory } from '@/lib/data';
import { ChevronRight, X } from 'lucide-react';

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

type PriceRange = 'all' | 'under100' | '100-300' | '300-500' | 'over500';
type SortOption = 'featured' | 'price-asc' | 'price-desc' | 'newest';

const priceRanges: { key: PriceRange; label: string; min: number; max: number }[] = [
  { key: 'under100', label: 'Menos de 100€', min: 0, max: 99.99 },
  { key: '100-300', label: '100€ - 300€', min: 100, max: 300 },
  { key: '300-500', label: '300€ - 500€', min: 300, max: 500 },
  { key: 'over500', label: 'Más de 500€', min: 500, max: Infinity },
];

export default function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = use(params);
  const [priceFilter, setPriceFilter] = useState<PriceRange>('all');
  const [sortBy, setSortBy] = useState<SortOption>('featured');

  const category = categories.find((c) => c.slug === slug);

  if (!category) {
    notFound();
  }

  const allProducts = getProductsByCategory(slug);

  // Filtrar y ordenar productos
  const filteredProducts = useMemo(() => {
    let result = [...allProducts];

    // Aplicar filtro de precio
    if (priceFilter !== 'all') {
      const range = priceRanges.find((r) => r.key === priceFilter);
      if (range) {
        result = result.filter((product) => {
          const price = product.salePrice || product.price;
          return price >= range.min && price <= range.max;
        });
      }
    }

    // Aplicar ordenamiento
    switch (sortBy) {
      case 'price-asc':
        result.sort((a, b) => (a.salePrice || a.price) - (b.salePrice || b.price));
        break;
      case 'price-desc':
        result.sort((a, b) => (b.salePrice || b.price) - (a.salePrice || a.price));
        break;
      case 'newest':
        result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
      default:
        // featured - mantener orden original
        break;
    }

    return result;
  }, [allProducts, priceFilter, sortBy]);

  const clearFilters = () => {
    setPriceFilter('all');
    setSortBy('featured');
  };

  const hasActiveFilters = priceFilter !== 'all';

  return (
    <main className="min-h-screen bg-background">
      <Header />

      {/* Hero */}
      <section className="relative h-[50vh] min-h-[400px]">
        <Image
          src={category.image}
          alt={category.name}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-foreground/40" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-light tracking-[0.2em] text-background md:text-6xl">
              {category.name}
            </h1>
            <p className="mt-4 text-background/80">
              {allProducts.length} productos
            </p>
          </div>
        </div>
      </section>

      {/* Breadcrumb */}
      <nav className="border-b border-border">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <ol className="flex items-center gap-2 text-sm">
            <li>
              <Link href="/" className="text-muted-foreground hover:text-foreground">
                Inicio
              </Link>
            </li>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
            <li className="font-medium">{category.name}</li>
          </ol>
        </div>
      </nav>

      {/* Active Filters Banner */}
      {hasActiveFilters && (
        <div className="border-b border-border bg-secondary/30">
          <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-sm text-muted-foreground">Filtros activos:</span>
                {priceFilter !== 'all' && (
                  <button
                    onClick={() => setPriceFilter('all')}
                    className="inline-flex items-center gap-1 rounded-full bg-foreground px-3 py-1 text-xs text-background hover:bg-foreground/80 transition-colors"
                  >
                    {priceRanges.find((r) => r.key === priceFilter)?.label}
                    <X className="h-3 w-3" />
                  </button>
                )}
              </div>
              <button
                onClick={clearFilters}
                className="text-sm text-muted-foreground hover:text-foreground underline"
              >
                Limpiar filtros
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Filters & Products */}
      <section className="py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-8 lg:flex-row">
            {/* Sidebar */}
            <aside className="w-full lg:w-64 lg:shrink-0">
              <div className="sticky top-24">
                <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider">
                  Subcategorías
                </h3>
                <ul className="space-y-2">
                  <li>
                    <Link
                      href={`/categoria/${slug}`}
                      className="text-sm font-medium text-foreground"
                    >
                      Ver todo
                    </Link>
                  </li>
                  {category.subcategories?.map((sub) => (
                    <li key={sub.slug}>
                      <Link
                        href={`/categoria/${slug}/${sub.slug}`}
                        className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                      >
                        {sub.name}
                      </Link>
                    </li>
                  ))}
                </ul>

                <div className="mt-8">
                  <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider">
                    Precio
                  </h3>
                  <ul className="space-y-2">
                    {priceRanges.map((range) => (
                      <li key={range.key}>
                        <button
                          onClick={() => setPriceFilter(priceFilter === range.key ? 'all' : range.key)}
                          className={`text-sm transition-colors hover:text-foreground ${
                            priceFilter === range.key
                              ? 'font-medium text-foreground'
                              : 'text-muted-foreground'
                          }`}
                        >
                          {range.label}
                          {priceFilter === range.key && (
                            <span className="ml-2 text-xs">(activo)</span>
                          )}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8">
                  <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider">
                    Otras Categorías
                  </h3>
                  <ul className="space-y-2">
                    {categories.filter(c => c.id !== category.id).slice(0, 4).map((cat) => (
                      <li key={cat.id}>
                        <Link
                          href={`/categoria/${cat.slug}`}
                          className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                        >
                          {cat.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </aside>

            {/* Products Grid */}
            <div className="flex-1">
              <div className="mb-6 flex items-center justify-between">
                <p className="text-sm text-muted-foreground">
                  Mostrando {filteredProducts.length} de {allProducts.length} productos
                </p>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  className="rounded-none border border-border bg-background px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-foreground"
                >
                  <option value="featured">Ordenar por: Destacados</option>
                  <option value="price-asc">Precio: Menor a Mayor</option>
                  <option value="price-desc">Precio: Mayor a Menor</option>
                  <option value="newest">Más Nuevos</option>
                </select>
              </div>
              
              {filteredProducts.length > 0 ? (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {filteredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              ) : (
                <div className="py-20 text-center">
                  <div className="mx-auto max-w-md">
                    <h3 className="text-lg font-medium mb-2">No hay productos disponibles</h3>
                    <p className="text-muted-foreground mb-6">
                      {hasActiveFilters
                        ? 'No hay productos que coincidan con los filtros seleccionados. Prueba a ajustar tus filtros.'
                        : 'No hay productos en esta categoría.'}
                    </p>
                    {hasActiveFilters && (
                      <button
                        onClick={clearFilters}
                        className="inline-block bg-foreground text-background px-6 py-3 text-sm font-medium hover:bg-foreground/90 transition-colors"
                      >
                        Limpiar filtros
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
