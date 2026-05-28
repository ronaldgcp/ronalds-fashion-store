'use client';

import { useState, useMemo } from 'react';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { use } from 'react';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { ProductCard } from '@/components/product-card';
import { categories, getProductsBySubcategory } from '@/lib/data';
import { ChevronRight, X } from 'lucide-react';

interface SubcategoryPageProps {
  params: Promise<{ slug: string; subcategory: string }>;
}

type PriceRange = 'all' | 'under100' | '100-300' | '300-500' | 'over500';
type SortOption = 'featured' | 'price-asc' | 'price-desc' | 'newest';

const priceRanges: { key: PriceRange; label: string; min: number; max: number }[] = [
  { key: 'under100', label: 'Menos de 100€', min: 0, max: 99.99 },
  { key: '100-300', label: '100€ - 300€', min: 100, max: 300 },
  { key: '300-500', label: '300€ - 500€', min: 300, max: 500 },
  { key: 'over500', label: 'Más de 500€', min: 500, max: Infinity },
];

export default function SubcategoryPage({ params }: SubcategoryPageProps) {
  const { slug, subcategory } = use(params);
  const [priceFilter, setPriceFilter] = useState<PriceRange>('all');
  const [sortBy, setSortBy] = useState<SortOption>('featured');

  const category = categories.find((c) => c.slug === slug);

  if (!category) {
    notFound();
  }

  const subcategoryData = category.subcategories?.find((s) => s.slug === subcategory);

  if (!subcategoryData) {
    notFound();
  }

  const allProducts = getProductsBySubcategory(slug, subcategory);

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

  // Imagen de cabecera según la subcategoría
  const subcategoryImages: Record<string, string> = {
    // Mujer
    'vestidos': 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=1200&q=80',
    'blusas': 'https://images.unsplash.com/photo-1564257631407-4deb1f99d992?w=1200&q=80',
    'pantalones': 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=1200&q=80',
    'faldas': 'https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=1200&q=80',
    'abrigos': 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=1200&q=80',
    'chaquetas': 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=1200&q=80',
    'camisetas': 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=1200&q=80',
    'jerseys': 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=1200&q=80',
    // Hombre
    'camisas': 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=1200&q=80',
    'trajes': 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=1200&q=80',
    'polos': 'https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?w=1200&q=80',
    // Bolsos
    'tote-bags': 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=1200&q=80',
    'bandoleras': 'https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=1200&q=80',
    'mochilas': 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=1200&q=80',
    'clutches': 'https://images.unsplash.com/photo-1594223274512-ad4803739b7c?w=1200&q=80',
    'shoppers': 'https://images.unsplash.com/photo-1591561954557-26941169b49e?w=1200&q=80',
    // Zapatos
    'sneakers': 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=1200&q=80',
    'tacones': 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=1200&q=80',
    'botas': 'https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=1200&q=80',
    'sandalias': 'https://images.unsplash.com/photo-1603487742131-4160ec999306?w=1200&q=80',
    'mocasines': 'https://images.unsplash.com/photo-1614252369475-531eba835eb1?w=1200&q=80',
    'deportivos': 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=1200&q=80',
    // Accesorios
    'billeteras': 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=1200&q=80',
    'cinturones': 'https://images.unsplash.com/photo-1553062407-98eeb64c6a45?w=1200&q=80',
    'gafas-sol': 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=1200&q=80',
    'relojes': 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=1200&q=80',
    'joyeria': 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=1200&q=80',
    'bufandas': 'https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?w=1200&q=80',
    'gorros': 'https://images.unsplash.com/photo-1576871337622-98d48d1cf531?w=1200&q=80',
    'guantes': 'https://images.unsplash.com/photo-1545170241-e489b4c3e3e8?w=1200&q=80',
    // Sport
    'leggings': 'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=1200&q=80',
    'tops-deportivos': 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1200&q=80',
    'sudaderas': 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=1200&q=80',
    'shorts': 'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=1200&q=80',
  };

  const headerImage = subcategoryImages[subcategory] || category.image;

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
          src={headerImage}
          alt={subcategoryData.name}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-foreground/40" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <p className="text-sm uppercase tracking-[0.3em] text-background/70 mb-2">
              {category.name}
            </p>
            <h1 className="text-4xl font-light tracking-[0.2em] text-background md:text-6xl">
              {subcategoryData.name}
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
            <li>
              <Link href={`/categoria/${slug}`} className="text-muted-foreground hover:text-foreground">
                {category.name}
              </Link>
            </li>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
            <li className="font-medium">{subcategoryData.name}</li>
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
                  {category.name}
                </h3>
                <ul className="space-y-2">
                  <li>
                    <Link
                      href={`/categoria/${slug}`}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      Ver todo
                    </Link>
                  </li>
                  {category.subcategories?.map((sub) => (
                    <li key={sub.slug}>
                      <Link
                        href={`/categoria/${slug}/${sub.slug}`}
                        className={`text-sm transition-colors hover:text-foreground ${
                          sub.slug === subcategory 
                            ? 'font-medium text-foreground' 
                            : 'text-muted-foreground'
                        }`}
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
                        : 'Actualmente no tenemos productos en esta subcategoría. Explora otras secciones.'}
                    </p>
                    {hasActiveFilters ? (
                      <button
                        onClick={clearFilters}
                        className="inline-block bg-foreground text-background px-6 py-3 text-sm font-medium hover:bg-foreground/90 transition-colors"
                      >
                        Limpiar filtros
                      </button>
                    ) : (
                      <Link
                        href={`/categoria/${slug}`}
                        className="inline-block bg-foreground text-background px-6 py-3 text-sm font-medium hover:bg-foreground/90 transition-colors"
                      >
                        Ver todo {category.name}
                      </Link>
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
