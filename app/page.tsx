'use client'

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { ProductCard } from '@/components/product-card';
import { getFeaturedProducts, getNewProducts, getBestsellers, categories, collections } from '@/lib/data';
import { ArrowRight, Sparkles, Truck, Shield, RotateCcw, Headphones, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Hook para animaciones al scroll
function useScrollAnimation() {
  const [scrollY, setScrollY] = useState(0);
  
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return scrollY;
}

// Componente de animación fade-in
function FadeIn({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);
  
  return (
    <div
      className={`transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      } ${className}`}
    >
      {children}
    </div>
  );
}

// Hero Slider Images
const heroSlides = [
  {
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1920&q=80',
    title: 'Nueva Colección',
    subtitle: 'Primavera 2025',
    description: 'Descubre las últimas tendencias en moda femenina',
  },
  {
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1920&q=80',
    title: 'Elegancia Atemporal',
    subtitle: 'Colección Premium',
    description: 'Piezas exclusivas diseñadas para destacar',
  },
  {
    image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=1920&q=80',
    title: 'Accesorios de Lujo',
    subtitle: 'Bolsos & Zapatos',
    description: 'Complementa tu estilo con piezas únicas',
  },
];

export default function HomePage() {
  const featuredProducts = getFeaturedProducts();
  const newProducts = getNewProducts();
  const bestsellers = getBestsellers();
  const featuredCollections = collections.filter(c => c.featured);
  const scrollY = useScrollAnimation();
  
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-play slider
  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const nextSlide = () => {
    setIsAutoPlaying(false);
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setIsAutoPlaying(false);
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  return (
    <main className="min-h-screen bg-background">
      <Header />

      {/* Hero Section con Slider */}
      <section className="relative h-screen overflow-hidden">
        {/* Slides */}
        {heroSlides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
              index === currentSlide 
                ? 'opacity-100 scale-100' 
                : 'opacity-0 scale-105'
            }`}
          >
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              priority={index === 0}
              className="object-cover"
              style={{
                transform: `translateY(${scrollY * 0.3}px)`,
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-foreground/70 via-foreground/40 to-transparent" />
          </div>
        ))}
        
        {/* Content */}
        <div className="relative h-full flex items-center">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
            <div className="max-w-2xl">
              <FadeIn delay={200}>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/20 backdrop-blur-sm text-accent text-sm font-medium mb-6">
                  <Sparkles className="h-4 w-4" />
                  {heroSlides[currentSlide].subtitle}
                </div>
              </FadeIn>
              
              <FadeIn delay={400}>
                <h1 
                  key={currentSlide}
                  className="text-5xl md:text-7xl lg:text-8xl font-light text-background mb-6 animate-in fade-in slide-in-from-bottom-4 duration-700"
                >
                  {heroSlides[currentSlide].title}
                </h1>
              </FadeIn>
              
              <FadeIn delay={600}>
                <p 
                  key={`desc-${currentSlide}`}
                  className="text-xl md:text-2xl text-background/80 mb-10 font-light animate-in fade-in slide-in-from-bottom-4 duration-700 delay-150"
                >
                  {heroSlides[currentSlide].description}
                </p>
              </FadeIn>
              
              <FadeIn delay={800}>
                <div className="flex flex-wrap gap-4">
                  <Link
                    href="/categoria/mujer"
                    className="group inline-flex items-center gap-3 bg-background text-foreground px-8 py-4 text-sm font-medium uppercase tracking-widest transition-all hover:bg-accent hover:text-foreground"
                  >
                    Explorar Colección
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                  <Link
                    href="/colecciones"
                    className="inline-flex items-center gap-3 border-2 border-background/50 text-background px-8 py-4 text-sm font-medium uppercase tracking-widest transition-all hover:bg-background/10 hover:border-background"
                  >
                    Ver Colecciones
                  </Link>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
        
        {/* Slider Controls */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-6">
          <Button
            variant="ghost"
            size="icon"
            onClick={prevSlide}
            className="h-12 w-12 rounded-full bg-background/10 backdrop-blur-sm text-background hover:bg-background/20 border border-background/20"
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
          
          <div className="flex gap-2">
            {heroSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setIsAutoPlaying(false);
                  setCurrentSlide(index);
                }}
                className={`h-2 rounded-full transition-all duration-500 ${
                  index === currentSlide 
                    ? 'w-8 bg-accent' 
                    : 'w-2 bg-background/50 hover:bg-background/70'
                }`}
              />
            ))}
          </div>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={nextSlide}
            className="h-12 w-12 rounded-full bg-background/10 backdrop-blur-sm text-background hover:bg-background/20 border border-background/20"
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-8 right-8 hidden lg:flex flex-col items-center gap-2">
          <span className="text-background/60 text-xs uppercase tracking-widest rotate-90 origin-center translate-x-6">
            Scroll
          </span>
          <div className="w-px h-16 bg-gradient-to-b from-background/60 to-transparent animate-pulse" />
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-24 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="mb-16 text-center">
              <p className="mb-3 text-sm font-medium uppercase tracking-[0.3em] text-accent">
                Categorías
              </p>
              <h2 className="text-4xl md:text-5xl font-light tracking-tight">
                Explora Nuestro Catálogo
              </h2>
            </div>
          </FadeIn>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category, index) => (
              <FadeIn key={category.id} delay={index * 100}>
                <Link
                  href={`/categoria/${category.slug}`}
                  className="group relative block h-80 md:h-96 overflow-hidden rounded-2xl"
                >
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 16vw"
                    className="object-cover transition-all duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent transition-opacity group-hover:opacity-90" />
                  <div className="absolute inset-0 flex flex-col items-center justify-end p-4 text-center">
                    <h3 className="text-sm font-medium tracking-wider text-background md:text-base transition-transform group-hover:-translate-y-2">
                      {category.name}
                    </h3>
                    <span className="mt-2 text-xs text-background/70 opacity-0 translate-y-4 transition-all group-hover:opacity-100 group-hover:translate-y-0">
                      Ver productos
                    </span>
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Collections */}
      <section className="py-24 bg-secondary/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                <p className="mb-3 text-sm font-medium uppercase tracking-[0.3em] text-accent">
                  Temporada
                </p>
                <h2 className="text-4xl md:text-5xl font-light tracking-tight">
                  Colecciones Destacadas
                </h2>
              </div>
              <Link
                href="/colecciones"
                className="group inline-flex items-center gap-2 text-sm font-medium uppercase tracking-wider transition-colors hover:text-accent"
              >
                Ver Todas
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </FadeIn>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredCollections.map((collection, index) => (
              <FadeIn key={collection.id} delay={index * 150}>
                <Link
                  href={`/coleccion/${collection.slug}`}
                  className="group relative block h-96 md:h-[450px] overflow-hidden rounded-2xl"
                >
                  <Image
                    src={collection.image}
                    alt={collection.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover transition-all duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/90 via-foreground/30 to-transparent" />
                  <div className="absolute inset-0 flex flex-col justify-end p-6">
                    <span className="text-xs font-medium uppercase tracking-[0.2em] text-accent mb-2">
                      {collection.season || 'Colección'}
                    </span>
                    <h3 className="text-xl font-medium text-background mb-2">
                      {collection.name}
                    </h3>
                    <p className="text-sm text-background/70 line-clamp-2 mb-4">
                      {collection.description}
                    </p>
                    <span className="inline-flex items-center gap-2 text-sm font-medium text-background opacity-0 transform translate-y-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                      Explorar
                      <ArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-24 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                <p className="mb-3 text-sm font-medium uppercase tracking-[0.3em] text-accent">
                  Selección Exclusiva
                </p>
                <h2 className="text-4xl md:text-5xl font-light tracking-tight">
                  Productos Destacados
                </h2>
              </div>
              <Link
                href="/destacados"
                className="group inline-flex items-center gap-2 text-sm font-medium uppercase tracking-wider transition-colors hover:text-accent"
              >
                Ver Todos
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </FadeIn>
          
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featuredProducts.slice(0, 8).map((product, index) => (
              <FadeIn key={product.id} delay={index * 100}>
                <ProductCard product={product} />
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Banner Promocional */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920&q=80"
            alt="Banner"
            fill
            className="object-cover"
            style={{
              transform: `translateY(${Math.min(scrollY * 0.1, 100)}px)`,
            }}
          />
          <div className="absolute inset-0 bg-foreground/70" />
        </div>
        
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <FadeIn>
              <div>
                <p className="mb-4 text-sm font-medium uppercase tracking-[0.3em] text-accent">
                  Oferta Especial
                </p>
                <h2 className="mb-6 text-4xl md:text-5xl lg:text-6xl font-light text-background text-balance">
                  Envío Gratuito en pedidos +100€
                </h2>
                <p className="mb-10 text-background/80 text-lg">
                  Disfruta de envío gratuito en todos tus pedidos mayores a 100€.
                  Entregas en 2-5 días hábiles en toda España.
                </p>
                <Link
                  href="/categoria/mujer"
                  className="group inline-flex items-center gap-3 bg-background px-10 py-5 text-sm font-medium uppercase tracking-widest text-foreground transition-all hover:bg-accent"
                >
                  Comprar Ahora
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </FadeIn>
            
            <FadeIn delay={300}>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { value: '24h', label: 'Envío Express' },
                  { value: '30', label: 'Días Devolución' },
                  { value: '100%', label: 'Pago Seguro' },
                  { value: '24/7', label: 'Soporte' },
                ].map((stat, index) => (
                  <div
                    key={index}
                    className="bg-background/10 backdrop-blur-sm rounded-2xl p-8 text-center border border-background/10 transition-all hover:bg-background/20 hover:scale-105"
                  >
                    <p className="text-4xl md:text-5xl font-light text-accent mb-2">{stat.value}</p>
                    <p className="text-background/80 text-sm">{stat.label}</p>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Bestsellers */}
      <section className="py-24 bg-secondary/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                <p className="mb-3 text-sm font-medium uppercase tracking-[0.3em] text-accent">
                  Los Más Vendidos
                </p>
                <h2 className="text-4xl md:text-5xl font-light tracking-tight">
                  Bestsellers
                </h2>
              </div>
              <Link
                href="/bestsellers"
                className="group inline-flex items-center gap-2 text-sm font-medium uppercase tracking-wider transition-colors hover:text-accent"
              >
                Ver Todos
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </FadeIn>
          
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {bestsellers.slice(0, 4).map((product, index) => (
              <FadeIn key={product.id} delay={index * 100}>
                <ProductCard product={product} />
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="py-24 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                <p className="mb-3 text-sm font-medium uppercase tracking-[0.3em] text-accent">
                  Recién Llegados
                </p>
                <h2 className="text-4xl md:text-5xl font-light tracking-tight">
                  Novedades
                </h2>
              </div>
              <Link
                href="/novedades"
                className="group inline-flex items-center gap-2 text-sm font-medium uppercase tracking-wider transition-colors hover:text-accent"
              >
                Ver Todos
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </FadeIn>
          
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {newProducts.slice(0, 8).map((product, index) => (
              <FadeIn key={product.id} delay={index * 100}>
                <ProductCard product={product} />
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="border-t border-border bg-secondary/30 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-4">
            {[
              { icon: Truck, title: 'Envío Rápido', desc: 'Entrega en 2-5 días hábiles' },
              { icon: Shield, title: 'Pago Seguro', desc: 'Transacciones 100% protegidas' },
              { icon: RotateCcw, title: 'Devoluciones Fáciles', desc: '30 días para devoluciones' },
              { icon: Headphones, title: 'Soporte 24/7', desc: 'Atención personalizada' },
            ].map((item, index) => (
              <FadeIn key={index} delay={index * 100}>
                <div className="text-center group cursor-default">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-foreground text-background transition-all duration-300 group-hover:scale-110 group-hover:bg-accent group-hover:text-foreground">
                    <item.icon className="h-7 w-7" />
                  </div>
                  <h3 className="mb-2 font-medium text-lg">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-24 bg-foreground text-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="text-center max-w-2xl mx-auto">
              <p className="mb-3 text-sm font-medium uppercase tracking-[0.3em] text-accent">
                Newsletter
              </p>
              <h2 className="text-4xl md:text-5xl font-light tracking-tight mb-6">
                Únete a MAISON
              </h2>
              <p className="text-background/70 mb-10 text-lg">
                Suscríbete para recibir las últimas novedades, ofertas exclusivas y un 10% de descuento en tu primera compra.
              </p>
              <form className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
                <input
                  type="email"
                  placeholder="Tu email"
                  className="flex-1 px-6 py-4 bg-background/10 border border-background/20 rounded-lg text-background placeholder:text-background/50 focus:outline-none focus:border-accent transition-colors"
                />
                <button
                  type="submit"
                  className="px-8 py-4 bg-accent text-foreground font-medium uppercase tracking-wider text-sm rounded-lg hover:bg-accent/90 transition-all hover:scale-105"
                >
                  Suscribirse
                </button>
              </form>
            </div>
          </FadeIn>
        </div>
      </section>

      <Footer />
    </main>
  );
}
