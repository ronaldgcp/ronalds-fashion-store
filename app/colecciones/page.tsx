import Link from 'next/link';
import Image from 'next/image';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { collections } from '@/lib/data';
import { ArrowRight } from 'lucide-react';

export default function CollectionsPage() {
  const featuredCollections = collections.filter(c => c.featured);
  const otherCollections = collections.filter(c => !c.featured);

  return (
    <main className="min-h-screen bg-background">
      <Header />

      {/* Hero */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-secondary/30 to-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <p className="mb-4 text-sm font-medium uppercase tracking-widest text-accent">
            Temporadas
          </p>
          <h1 className="text-4xl md:text-6xl font-light tracking-tight mb-6">
            Nuestras Colecciones
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explora nuestras colecciones cuidadosamente diseñadas, 
            donde cada pieza cuenta una historia de elegancia y estilo.
          </p>
        </div>
      </section>

      {/* Featured Collections */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <p className="mb-2 text-sm font-medium uppercase tracking-widest text-accent">
              Destacadas
            </p>
            <h2 className="text-3xl font-light tracking-wide">
              Colecciones Principales
            </h2>
          </div>
          
          {/* Grid principal */}
          <div className="grid lg:grid-cols-2 gap-6 mb-6">
            {featuredCollections.slice(0, 2).map((collection) => (
              <Link
                key={collection.id}
                href={`/coleccion/${collection.slug}`}
                className="group relative aspect-[4/3] overflow-hidden rounded-2xl"
              >
                <Image
                  src={collection.image}
                  alt={collection.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/90 via-foreground/30 to-transparent" />
                <div className="absolute inset-0 flex flex-col justify-end p-8">
                  {collection.season && (
                    <span className="text-xs font-medium uppercase tracking-widest text-accent mb-2">
                      {collection.season} {collection.year}
                    </span>
                  )}
                  <h3 className="text-2xl md:text-3xl font-light text-background mb-3">
                    {collection.name}
                  </h3>
                  <p className="text-background/70 mb-4 max-w-md">
                    {collection.description}
                  </p>
                  <span className="inline-flex items-center gap-2 text-sm font-medium text-background opacity-0 transform translate-y-2 transition-all group-hover:opacity-100 group-hover:translate-y-0">
                    Explorar Colección
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
          
          {/* Grid secundario */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredCollections.slice(2).map((collection) => (
              <Link
                key={collection.id}
                href={`/coleccion/${collection.slug}`}
                className="group relative aspect-[3/4] overflow-hidden rounded-2xl"
              >
                <Image
                  src={collection.image}
                  alt={collection.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/90 via-foreground/30 to-transparent" />
                <div className="absolute inset-0 flex flex-col justify-end p-6">
                  {collection.season && (
                    <span className="text-xs font-medium uppercase tracking-widest text-accent mb-2">
                      {collection.season}
                    </span>
                  )}
                  <h3 className="text-xl font-light text-background mb-2">
                    {collection.name}
                  </h3>
                  <p className="text-sm text-background/70 line-clamp-2">
                    {collection.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Other Collections */}
      {otherCollections.length > 0 && (
        <section className="py-16 bg-secondary/30">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-12">
              <p className="mb-2 text-sm font-medium uppercase tracking-widest text-accent">
                Más Colecciones
              </p>
              <h2 className="text-3xl font-light tracking-wide">
                Explora Más
              </h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {otherCollections.map((collection) => (
                <Link
                  key={collection.id}
                  href={`/coleccion/${collection.slug}`}
                  className="group relative aspect-[4/3] overflow-hidden rounded-2xl"
                >
                  <Image
                    src={collection.image}
                    alt={collection.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent" />
                  <div className="absolute inset-0 flex flex-col justify-end p-6">
                    <h3 className="text-xl font-medium text-background mb-2">
                      {collection.name}
                    </h3>
                    <p className="text-sm text-background/70 line-clamp-2">
                      {collection.description}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-20 bg-foreground text-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-light mb-4">
            ¿No encuentras lo que buscas?
          </h2>
          <p className="text-background/70 mb-8 max-w-xl mx-auto">
            Explora todo nuestro catálogo de productos organizados por categorías.
          </p>
          <Link
            href="/categoria/mujer"
            className="inline-flex items-center gap-2 bg-background text-foreground px-8 py-4 text-sm font-medium uppercase tracking-widest transition-colors hover:bg-background/90"
          >
            Ver Categorías
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
