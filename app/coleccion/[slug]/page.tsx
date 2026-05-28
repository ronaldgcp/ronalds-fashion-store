'use client'

import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { ProductCard } from '@/components/product-card';
import { getCollectionBySlug, getProductsByCollection, collections } from '@/lib/data';
import { ArrowLeft, ArrowRight } from 'lucide-react';

export default function CollectionPage() {
  const params = useParams();
  const slug = params.slug as string;
  const collection = getCollectionBySlug(slug);
  const products = getProductsByCollection(slug);

  if (!collection) {
    return (
      <main className="min-h-screen bg-background">
        <Header />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <h1 className="text-2xl font-light mb-4">Colección no encontrada</h1>
            <Link href="/colecciones" className="text-accent hover:underline">
              Ver todas las colecciones
            </Link>
          </div>
        </div>
        <Footer />
      </main>
    );
  }

  const otherCollections = collections.filter(c => c.id !== collection.id).slice(0, 3);

  return (
    <main className="min-h-screen bg-background">
      <Header />

      {/* Hero */}
      <section className="relative h-[60vh] min-h-[400px]">
        <Image
          src={collection.image}
          alt={collection.name}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/40 to-transparent" />
        <div className="absolute inset-0 flex items-end">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-16 w-full">
            <Link 
              href="/colecciones"
              className="inline-flex items-center gap-2 text-background/70 hover:text-background mb-4 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Todas las colecciones
            </Link>
            {collection.season && (
              <p className="text-sm font-medium uppercase tracking-widest text-accent mb-2">
                {collection.season} {collection.year}
              </p>
            )}
            <h1 className="text-4xl md:text-6xl font-light text-background mb-4">
              {collection.name}
            </h1>
            <p className="text-lg text-background/80 max-w-2xl">
              {collection.description}
            </p>
          </div>
        </div>
      </section>

      {/* Products */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 flex items-center justify-between">
            <p className="text-muted-foreground">
              {products.length} {products.length === 1 ? 'producto' : 'productos'}
            </p>
          </div>

          {products.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-muted-foreground mb-4">
                No hay productos en esta colección todavía.
              </p>
              <Link 
                href="/categoria/mujer"
                className="text-accent hover:underline"
              >
                Explorar otras categorías
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Other Collections */}
      <section className="py-16 bg-secondary/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 flex items-end justify-between">
            <div>
              <p className="mb-2 text-sm font-medium uppercase tracking-widest text-accent">
                Descubre Más
              </p>
              <h2 className="text-3xl font-light tracking-wide">
                Otras Colecciones
              </h2>
            </div>
            <Link
              href="/colecciones"
              className="hidden items-center gap-2 text-sm font-medium uppercase tracking-wider transition-colors hover:text-accent md:flex"
            >
              Ver Todas
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {otherCollections.map((col) => (
              <Link
                key={col.id}
                href={`/coleccion/${col.slug}`}
                className="group relative aspect-[4/5] overflow-hidden rounded-2xl"
              >
                <Image
                  src={col.image}
                  alt={col.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent" />
                <div className="absolute inset-0 flex flex-col justify-end p-6">
                  <h3 className="text-xl font-medium text-background mb-2">
                    {col.name}
                  </h3>
                  <p className="text-sm text-background/70 line-clamp-2">
                    {col.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
