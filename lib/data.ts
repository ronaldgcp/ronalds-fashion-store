import { Product, Category, Collection, ShippingMethod } from './types';

// Colecciones
export const collections: Collection[] = [
  {
    id: 'col-1',
    name: 'Primavera 2025',
    slug: 'primavera-2025',
    description: 'Colores vibrantes y tejidos ligeros para la nueva temporada',
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&q=80',
    season: 'Primavera',
    year: 2025,
    featured: true
  },
  {
    id: 'col-2',
    name: 'Essentials',
    slug: 'essentials',
    description: 'Piezas atemporales que nunca pasan de moda',
    image: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=800&q=80',
    featured: true
  },
  {
    id: 'col-3',
    name: 'Urban Street',
    slug: 'urban-street',
    description: 'Estilo urbano contemporaneo para el día a día',
    image: 'https://images.unsplash.com/photo-1523398002811-999ca8dec234?w=800&q=80',
    featured: true
  },
  {
    id: 'col-4',
    name: 'Luxury Edition',
    slug: 'luxury-edition',
    description: 'Piezas exclusivas de edición limitada',
    image: 'https://images.unsplash.com/photo-1558171813-4c088753af8f?w=800&q=80',
    featured: true
  },
  {
    id: 'col-5',
    name: 'Sport Active',
    slug: 'sport-active',
    description: 'Rendimiento y estilo para tu vida activa',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80'
  },
  {
    id: 'col-6',
    name: 'Night Out',
    slug: 'night-out',
    description: 'Elegancia para tus noches especiales',
    image: 'https://images.unsplash.com/photo-1518577915332-c2a19f149a75?w=800&q=80'
  }
];

// Categorías expandidas
export const categories: Category[] = [
  {
    id: 'cat-1',
    name: 'Ropa Mujer',
    slug: 'mujer',
    image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=800&q=80',
    description: 'Moda femenina para todas las ocasiones',
    subcategories: [
      { name: 'Vestidos', slug: 'vestidos' },
      { name: 'Blusas', slug: 'blusas' },
      { name: 'Pantalones', slug: 'pantalones' },
      { name: 'Faldas', slug: 'faldas' },
      { name: 'Abrigos', slug: 'abrigos' },
      { name: 'Chaquetas', slug: 'chaquetas' },
      { name: 'Camisetas', slug: 'camisetas' },
      { name: 'Jerseys', slug: 'jerseys' }
    ]
  },
  {
    id: 'cat-2',
    name: 'Ropa Hombre',
    slug: 'hombre',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80',
    description: 'Estilo masculino contemporáneo',
    subcategories: [
      { name: 'Camisas', slug: 'camisas' },
      { name: 'Pantalones', slug: 'pantalones' },
      { name: 'Chaquetas', slug: 'chaquetas' },
      { name: 'Abrigos', slug: 'abrigos' },
      { name: 'Camisetas', slug: 'camisetas' },
      { name: 'Jerseys', slug: 'jerseys' },
      { name: 'Trajes', slug: 'trajes' },
      { name: 'Polos', slug: 'polos' }
    ]
  },
  {
    id: 'cat-3',
    name: 'Bolsos',
    slug: 'bolsos',
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800&q=80',
    description: 'Bolsos de diseño y accesorios',
    subcategories: [
      { name: 'Tote Bags', slug: 'tote-bags' },
      { name: 'Bandoleras', slug: 'bandoleras' },
      { name: 'Mochilas', slug: 'mochilas' },
      { name: 'Clutches', slug: 'clutches' },
      { name: 'Shoppers', slug: 'shoppers' }
    ]
  },
  {
    id: 'cat-4',
    name: 'Zapatos',
    slug: 'zapatos',
    image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=800&q=80',
    description: 'Calzado de calidad premium',
    subcategories: [
      { name: 'Sneakers', slug: 'sneakers' },
      { name: 'Tacones', slug: 'tacones' },
      { name: 'Botas', slug: 'botas' },
      { name: 'Sandalias', slug: 'sandalias' },
      { name: 'Mocasines', slug: 'mocasines' },
      { name: 'Deportivos', slug: 'deportivos' }
    ]
  },
  {
    id: 'cat-5',
    name: 'Accesorios',
    slug: 'accesorios',
    image: 'https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?w=800&q=80',
    description: 'Complementos que marcan la diferencia',
    subcategories: [
      { name: 'Billeteras', slug: 'billeteras' },
      { name: 'Cinturones', slug: 'cinturones' },
      { name: 'Gafas de Sol', slug: 'gafas-sol' },
      { name: 'Relojes', slug: 'relojes' },
      { name: 'Joyería', slug: 'joyeria' },
      { name: 'Bufandas', slug: 'bufandas' },
      { name: 'Gorros', slug: 'gorros' },
      { name: 'Guantes', slug: 'guantes' }
    ]
  },
  {
    id: 'cat-6',
    name: 'Sport',
    slug: 'sport',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80',
    description: 'Ropa deportiva de alto rendimiento',
    subcategories: [
      { name: 'Leggings', slug: 'leggings' },
      { name: 'Tops Deportivos', slug: 'tops-deportivos' },
      { name: 'Sudaderas', slug: 'sudaderas' },
      { name: 'Shorts', slug: 'shorts' }
    ]
  }
];

// Productos expandidos (48+ productos)
export const products: Product[] = [
  // ROPA MUJER - Vestidos
  {
    id: 'prod-1',
    name: 'Vestido Midi Satinado',
    description: 'Elegante vestido midi en satén con escote en V y espalda descubierta. Perfecto para ocasiones especiales.',
    price: 189.00,
    originalPrice: 249.00,
    images: [
      'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&q=80',
      'https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=800&q=80'
    ],
    category: 'mujer',
    subcategory: 'vestidos',
    collection: 'night-out',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Negro', hex: '#000000' },
      { name: 'Champagne', hex: '#F7E7CE' },
      { name: 'Burgundy', hex: '#722F37' }
    ],
    material: '100% Seda',
    features: ['Lavado en seco', 'Forro interior', 'Cremallera lateral'],
    stock: 45,
    featured: true,
    isNew: true,
    rating: 4.8,
    reviews: 127
  },
  {
    id: 'prod-2',
    name: 'Vestido Camisero Lino',
    description: 'Vestido camisero en lino puro con cinturón a juego. Ideal para el verano.',
    price: 129.00,
    images: [
      'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=800&q=80'
    ],
    category: 'mujer',
    subcategory: 'vestidos',
    collection: 'primavera-2025',
    sizes: ['XS', 'S', 'M', 'L'],
    colors: [
      { name: 'Blanco', hex: '#FFFFFF' },
      { name: 'Beige', hex: '#D4B896' },
      { name: 'Azul Cielo', hex: '#87CEEB' }
    ],
    material: '100% Lino',
    stock: 78,
    featured: true,
    rating: 4.6,
    reviews: 89
  },
  {
    id: 'prod-3',
    name: 'Vestido Punto Acanalado',
    description: 'Vestido ajustado de punto acanalado con manga larga y cuello alto.',
    price: 89.00,
    images: [
      'https://images.unsplash.com/photo-1551803091-e20673f15770?w=800&q=80'
    ],
    category: 'mujer',
    subcategory: 'vestidos',
    collection: 'essentials',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Negro', hex: '#000000' },
      { name: 'Gris', hex: '#808080' },
      { name: 'Camel', hex: '#C19A6B' }
    ],
    material: '70% Lana, 30% Cashmere',
    stock: 120,
    rating: 4.7,
    reviews: 203
  },
  // ROPA MUJER - Blusas
  {
    id: 'prod-4',
    name: 'Blusa Seda Lazo',
    description: 'Blusa de seda con lazo al cuello y mangas abullonadas. Elegancia atemporal.',
    price: 145.00,
    images: [
      'https://images.unsplash.com/photo-1564257631407-4deb1f99d992?w=800&q=80'
    ],
    category: 'mujer',
    subcategory: 'blusas',
    collection: 'luxury-edition',
    sizes: ['XS', 'S', 'M', 'L'],
    colors: [
      { name: 'Marfil', hex: '#FFFFF0' },
      { name: 'Rosa Palo', hex: '#FADADD' },
      { name: 'Negro', hex: '#000000' }
    ],
    material: '100% Seda',
    stock: 56,
    isNew: true,
    rating: 4.9,
    reviews: 67
  },
  {
    id: 'prod-5',
    name: 'Camisa Oversize Algodón',
    description: 'Camisa oversize en algodón orgánico con bolsillos delanteros.',
    price: 79.00,
    images: [
      'https://images.unsplash.com/photo-1598554747436-c9293d6a588f?w=800&q=80'
    ],
    category: 'mujer',
    subcategory: 'blusas',
    collection: 'urban-street',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Blanco', hex: '#FFFFFF' },
      { name: 'Azul Rayas', hex: '#4169E1' },
      { name: 'Verde Oliva', hex: '#808000' }
    ],
    material: '100% Algodón Orgánico',
    stock: 200,
    isBestseller: true,
    rating: 4.5,
    reviews: 312
  },
  // ROPA MUJER - Pantalones
  {
    id: 'prod-6',
    name: 'Pantalón Wide Leg',
    description: 'Pantalón de pierna ancha en tejido fluido con cintura alta.',
    price: 119.00,
    images: [
      'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=800&q=80'
    ],
    category: 'mujer',
    subcategory: 'pantalones',
    collection: 'primavera-2025',
    sizes: ['34', '36', '38', '40', '42', '44'],
    colors: [
      { name: 'Negro', hex: '#000000' },
      { name: 'Blanco', hex: '#FFFFFF' },
      { name: 'Navy', hex: '#000080' }
    ],
    material: '95% Poliéster, 5% Elastano',
    stock: 89,
    featured: true,
    rating: 4.6,
    reviews: 178
  },
  {
    id: 'prod-7',
    name: 'Jeans Mom Fit',
    description: 'Jeans de tiro alto con corte relajado en denim premium.',
    price: 99.00,
    images: [
      'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=800&q=80'
    ],
    category: 'mujer',
    subcategory: 'pantalones',
    collection: 'essentials',
    sizes: ['34', '36', '38', '40', '42'],
    colors: [
      { name: 'Light Blue', hex: '#ADD8E6' },
      { name: 'Medium Blue', hex: '#0000CD' },
      { name: 'Negro', hex: '#000000' }
    ],
    material: '100% Algodón Denim',
    stock: 156,
    isBestseller: true,
    rating: 4.8,
    reviews: 456
  },
  // ROPA MUJER - Abrigos
  {
    id: 'prod-8',
    name: 'Abrigo Lana Premium',
    description: 'Abrigo largo de lana italiana con solapas anchas y cinturón.',
    price: 389.00,
    originalPrice: 489.00,
    images: [
      'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=800&q=80'
    ],
    category: 'mujer',
    subcategory: 'abrigos',
    collection: 'luxury-edition',
    sizes: ['XS', 'S', 'M', 'L'],
    colors: [
      { name: 'Camel', hex: '#C19A6B' },
      { name: 'Negro', hex: '#000000' },
      { name: 'Gris', hex: '#808080' }
    ],
    material: '80% Lana, 20% Cashmere',
    features: ['Forro de seda', 'Botones de nácar', 'Hecho en Italia'],
    stock: 23,
    isLimited: true,
    rating: 4.9,
    reviews: 89
  },
  {
    id: 'prod-9',
    name: 'Trench Clásico',
    description: 'Trench coat impermeable con doble botonadura y cinturón.',
    price: 249.00,
    images: [
      'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&q=80'
    ],
    category: 'mujer',
    subcategory: 'abrigos',
    collection: 'essentials',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Beige', hex: '#F5F5DC' },
      { name: 'Negro', hex: '#000000' },
      { name: 'Navy', hex: '#000080' }
    ],
    material: 'Gabardina impermeable',
    stock: 67,
    rating: 4.7,
    reviews: 234
  },
  // ROPA HOMBRE - Camisas
  {
    id: 'prod-10',
    name: 'Camisa Oxford Classic',
    description: 'Camisa Oxford de algodón con corte regular y cuello button-down.',
    price: 89.00,
    images: [
      'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=800&q=80'
    ],
    category: 'hombre',
    subcategory: 'camisas',
    collection: 'essentials',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'Blanco', hex: '#FFFFFF' },
      { name: 'Celeste', hex: '#B0E0E6' },
      { name: 'Rosa', hex: '#FFB6C1' }
    ],
    material: '100% Algodón Oxford',
    stock: 234,
    isBestseller: true,
    rating: 4.6,
    reviews: 567
  },
  {
    id: 'prod-11',
    name: 'Camisa Lino Mandarin',
    description: 'Camisa de lino con cuello mao y corte slim fit.',
    price: 109.00,
    images: [
      'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&q=80'
    ],
    category: 'hombre',
    subcategory: 'camisas',
    collection: 'primavera-2025',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Blanco', hex: '#FFFFFF' },
      { name: 'Beige', hex: '#F5F5DC' },
      { name: 'Negro', hex: '#000000' }
    ],
    material: '100% Lino',
    stock: 89,
    isNew: true,
    rating: 4.5,
    reviews: 123
  },
  // ROPA HOMBRE - Trajes
  {
    id: 'prod-12',
    name: 'Traje Slim Fit Italiano',
    description: 'Traje de dos piezas en lana Super 120s con corte italiano.',
    price: 599.00,
    originalPrice: 749.00,
    images: [
      'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800&q=80'
    ],
    category: 'hombre',
    subcategory: 'trajes',
    collection: 'luxury-edition',
    sizes: ['46', '48', '50', '52', '54'],
    colors: [
      { name: 'Navy', hex: '#000080' },
      { name: 'Gris Carbón', hex: '#36454F' },
      { name: 'Negro', hex: '#000000' }
    ],
    material: 'Lana Super 120s',
    features: ['Hecho en Italia', 'Forro Bemberg', 'Botones de cuerno'],
    stock: 34,
    featured: true,
    isLimited: true,
    rating: 4.9,
    reviews: 78
  },
  // ROPA HOMBRE - Chaquetas
  {
    id: 'prod-13',
    name: 'Bomber Cuero Premium',
    description: 'Chaqueta bomber en piel de cordero con forro acolchado.',
    price: 449.00,
    images: [
      'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&q=80'
    ],
    category: 'hombre',
    subcategory: 'chaquetas',
    collection: 'urban-street',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Negro', hex: '#000000' },
      { name: 'Marrón', hex: '#8B4513' }
    ],
    material: 'Piel de cordero',
    features: ['Forro interior', 'Bolsillos con cremallera', 'Puños elásticos'],
    stock: 45,
    featured: true,
    rating: 4.8,
    reviews: 156
  },
  {
    id: 'prod-14',
    name: 'Blazer Casual Desestructurado',
    description: 'Blazer sin forro con tejido ligero ideal para entretiempo.',
    price: 229.00,
    images: [
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&q=80'
    ],
    category: 'hombre',
    subcategory: 'chaquetas',
    collection: 'essentials',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'Azul', hex: '#4169E1' },
      { name: 'Beige', hex: '#F5F5DC' },
      { name: 'Gris', hex: '#808080' }
    ],
    material: '55% Lino, 45% Algodón',
    stock: 78,
    rating: 4.6,
    reviews: 189
  },
  // BOLSOS
  {
    id: 'prod-15',
    name: 'Tote Bag Cuero Italiano',
    description: 'Bolso tote de gran capacidad en piel italiana con asas reforzadas.',
    price: 289.00,
    images: [
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800&q=80',
      'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=800&q=80'
    ],
    category: 'bolsos',
    subcategory: 'tote-bags',
    collection: 'luxury-edition',
    colors: [
      { name: 'Negro', hex: '#000000' },
      { name: 'Camel', hex: '#C19A6B' },
      { name: 'Burgundy', hex: '#722F37' }
    ],
    material: 'Piel italiana',
    features: ['Bolsillo interior con cremallera', 'Forro de tela', 'Base rígida'],
    stock: 56,
    featured: true,
    isBestseller: true,
    rating: 4.9,
    reviews: 234
  },
  {
    id: 'prod-16',
    name: 'Bandolera Cadena Dorada',
    description: 'Bolso bandolera con cadena dorada y cierre de solapa magnético.',
    price: 199.00,
    images: [
      'https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=800&q=80'
    ],
    category: 'bolsos',
    subcategory: 'bandoleras',
    collection: 'night-out',
    colors: [
      { name: 'Negro', hex: '#000000' },
      { name: 'Rojo', hex: '#DC143C' },
      { name: 'Nude', hex: '#E3BC9A' }
    ],
    material: 'Piel sintética premium',
    stock: 89,
    isNew: true,
    rating: 4.7,
    reviews: 167
  },
  {
    id: 'prod-17',
    name: 'Mochila Urban Piel',
    description: 'Mochila elegante en piel con compartimento para laptop 15".',
    price: 249.00,
    images: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80'
    ],
    category: 'bolsos',
    subcategory: 'mochilas',
    collection: 'urban-street',
    colors: [
      { name: 'Negro', hex: '#000000' },
      { name: 'Marrón', hex: '#8B4513' },
      { name: 'Navy', hex: '#000080' }
    ],
    material: 'Piel vacuna',
    features: ['Compartimento laptop', 'Bolsillos laterales', 'Espalda acolchada'],
    stock: 67,
    rating: 4.6,
    reviews: 198
  },
  {
    id: 'prod-18',
    name: 'Clutch Satinado Fiesta',
    description: 'Clutch de satén con cierre joya y cadena extraíble.',
    price: 129.00,
    images: [
      'https://images.unsplash.com/photo-1594223274512-ad4803739b7c?w=800&q=80'
    ],
    category: 'bolsos',
    subcategory: 'clutches',
    collection: 'night-out',
    colors: [
      { name: 'Negro', hex: '#000000' },
      { name: 'Champagne', hex: '#F7E7CE' },
      { name: 'Esmeralda', hex: '#50C878' }
    ],
    material: 'Satén',
    stock: 45,
    isNew: true,
    rating: 4.8,
    reviews: 89
  },
  {
    id: 'prod-19',
    name: 'Shopper Lona Premium',
    description: 'Bolso shopper de lona reforzada con detalles en piel.',
    price: 159.00,
    images: [
      'https://images.unsplash.com/photo-1591561954557-26941169b49e?w=800&q=80'
    ],
    category: 'bolsos',
    subcategory: 'shoppers',
    collection: 'essentials',
    colors: [
      { name: 'Natural', hex: '#F5F5DC' },
      { name: 'Navy', hex: '#000080' },
      { name: 'Oliva', hex: '#808000' }
    ],
    material: 'Lona y piel',
    stock: 123,
    rating: 4.5,
    reviews: 276
  },
  // ZAPATOS
  {
    id: 'prod-20',
    name: 'Sneakers Cuero Minimalista',
    description: 'Zapatillas de piel blanca con suela de goma vulcanizada.',
    price: 179.00,
    images: [
      'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800&q=80',
      'https://images.unsplash.com/photo-1600269452121-4f2416e55c28?w=800&q=80'
    ],
    category: 'zapatos',
    subcategory: 'sneakers',
    collection: 'essentials',
    sizes: ['36', '37', '38', '39', '40', '41', '42', '43', '44', '45'],
    colors: [
      { name: 'Blanco', hex: '#FFFFFF' },
      { name: 'Negro', hex: '#000000' },
      { name: 'Beige', hex: '#F5F5DC' }
    ],
    material: 'Piel vacuna',
    stock: 189,
    featured: true,
    isBestseller: true,
    rating: 4.8,
    reviews: 567
  },
  {
    id: 'prod-21',
    name: 'Stilettos Charol',
    description: 'Zapatos de tacón alto en charol con punta afilada.',
    price: 219.00,
    images: [
      'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=800&q=80'
    ],
    category: 'zapatos',
    subcategory: 'tacones',
    collection: 'night-out',
    sizes: ['35', '36', '37', '38', '39', '40'],
    colors: [
      { name: 'Negro', hex: '#000000' },
      { name: 'Rojo', hex: '#DC143C' },
      { name: 'Nude', hex: '#E3BC9A' }
    ],
    material: 'Charol',
    features: ['Tacón 10cm', 'Plantilla acolchada'],
    stock: 67,
    rating: 4.6,
    reviews: 145
  },
  {
    id: 'prod-22',
    name: 'Botas Chelsea Piel',
    description: 'Botas Chelsea en piel pulida con elásticos laterales.',
    price: 269.00,
    images: [
      'https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=800&q=80'
    ],
    category: 'zapatos',
    subcategory: 'botas',
    collection: 'essentials',
    sizes: ['36', '37', '38', '39', '40', '41', '42', '43', '44'],
    colors: [
      { name: 'Negro', hex: '#000000' },
      { name: 'Marrón', hex: '#8B4513' },
      { name: 'Burdeos', hex: '#722F37' }
    ],
    material: 'Piel de becerro',
    stock: 98,
    rating: 4.7,
    reviews: 234
  },
  {
    id: 'prod-23',
    name: 'Sandalias Tiras Doradas',
    description: 'Sandalias de tacón medio con tiras cruzadas metalizadas.',
    price: 149.00,
    images: [
      'https://images.unsplash.com/photo-1603487742131-4160ec999306?w=800&q=80'
    ],
    category: 'zapatos',
    subcategory: 'sandalias',
    collection: 'primavera-2025',
    sizes: ['35', '36', '37', '38', '39', '40'],
    colors: [
      { name: 'Dorado', hex: '#FFD700' },
      { name: 'Plateado', hex: '#C0C0C0' },
      { name: 'Rosa Gold', hex: '#B76E79' }
    ],
    material: 'Piel metalizada',
    features: ['Tacón 6cm', 'Cierre tobillero'],
    stock: 56,
    isNew: true,
    rating: 4.5,
    reviews: 89
  },
  {
    id: 'prod-24',
    name: 'Mocasines Borlas',
    description: 'Mocasines clásicos con borlas en piel cepillada.',
    price: 199.00,
    images: [
      'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?w=800&q=80'
    ],
    category: 'zapatos',
    subcategory: 'mocasines',
    sizes: ['38', '39', '40', '41', '42', '43', '44', '45'],
    colors: [
      { name: 'Marrón', hex: '#8B4513' },
      { name: 'Negro', hex: '#000000' },
      { name: 'Burdeos', hex: '#722F37' }
    ],
    material: 'Piel cepillada',
    stock: 78,
    rating: 4.7,
    reviews: 167
  },
  {
    id: 'prod-25',
    name: 'Running Performance Pro',
    description: 'Zapatillas running con tecnología de amortiguación avanzada.',
    price: 159.00,
    images: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80'
    ],
    category: 'zapatos',
    subcategory: 'deportivos',
    collection: 'sport-active',
    sizes: ['36', '37', '38', '39', '40', '41', '42', '43', '44', '45'],
    colors: [
      { name: 'Negro/Blanco', hex: '#000000' },
      { name: 'Azul/Naranja', hex: '#4169E1' },
      { name: 'Gris/Verde', hex: '#808080' }
    ],
    material: 'Mesh transpirable',
    features: ['Suela amortiguada', 'Plantilla anatómica', 'Reflectantes'],
    stock: 145,
    isBestseller: true,
    rating: 4.8,
    reviews: 389
  },
  // ACCESORIOS - Billeteras
  {
    id: 'prod-26',
    name: 'Billetera Piel Clásica',
    description: 'Billetera de piel con múltiples compartimentos y protección RFID.',
    price: 89.00,
    images: [
      'https://images.unsplash.com/photo-1627123424574-724758594e93?w=800&q=80'
    ],
    category: 'accesorios',
    subcategory: 'billeteras',
    collection: 'essentials',
    colors: [
      { name: 'Negro', hex: '#000000' },
      { name: 'Marrón', hex: '#8B4513' },
      { name: 'Navy', hex: '#000080' }
    ],
    material: 'Piel vacuna',
    features: ['8 ranuras tarjetas', 'Protección RFID', 'Compartimento billetes'],
    stock: 234,
    isBestseller: true,
    rating: 4.7,
    reviews: 456
  },
  {
    id: 'prod-27',
    name: 'Cartera Monedero Compacta',
    description: 'Cartera compacta con cremallera y espacio para tarjetas.',
    price: 69.00,
    images: [
      'https://images.unsplash.com/photo-1606503825008-909a67e63c3d?w=800&q=80'
    ],
    category: 'accesorios',
    subcategory: 'billeteras',
    colors: [
      { name: 'Rosa', hex: '#FFC0CB' },
      { name: 'Negro', hex: '#000000' },
      { name: 'Rojo', hex: '#DC143C' }
    ],
    material: 'Piel sintética',
    stock: 189,
    rating: 4.5,
    reviews: 234
  },
  {
    id: 'prod-28',
    name: 'Tarjetero Slim',
    description: 'Tarjetero ultra fino con capacidad para 6 tarjetas.',
    price: 49.00,
    images: [
      'https://images.unsplash.com/photo-1612902456551-333ac5afa26e?w=800&q=80'
    ],
    category: 'accesorios',
    subcategory: 'billeteras',
    collection: 'essentials',
    colors: [
      { name: 'Negro', hex: '#000000' },
      { name: 'Camel', hex: '#C19A6B' },
      { name: 'Azul', hex: '#4169E1' }
    ],
    material: 'Piel italiana',
    stock: 312,
    rating: 4.6,
    reviews: 178
  },
  // ACCESORIOS - Cinturones
  {
    id: 'prod-29',
    name: 'Cinturón Reversible',
    description: 'Cinturón de piel reversible negro/marrón con hebilla giratoria.',
    price: 79.00,
    images: [
      'https://images.unsplash.com/photo-1624222247344-550fb60583dc?w=800&q=80'
    ],
    category: 'accesorios',
    subcategory: 'cinturones',
    collection: 'essentials',
    sizes: ['85', '90', '95', '100', '105', '110'],
    colors: [
      { name: 'Negro/Marrón', hex: '#000000' }
    ],
    material: 'Piel vacuna',
    features: ['Reversible', 'Hebilla giratoria'],
    stock: 145,
    isBestseller: true,
    rating: 4.7,
    reviews: 345
  },
  {
    id: 'prod-30',
    name: 'Cinturón Hebilla Logo',
    description: 'Cinturón de piel con hebilla de logo dorada.',
    price: 129.00,
    images: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80'
    ],
    category: 'accesorios',
    subcategory: 'cinturones',
    collection: 'luxury-edition',
    sizes: ['80', '85', '90', '95', '100'],
    colors: [
      { name: 'Negro', hex: '#000000' },
      { name: 'Marrón', hex: '#8B4513' }
    ],
    material: 'Piel de becerro',
    stock: 67,
    rating: 4.8,
    reviews: 167
  },
  // ACCESORIOS - Gafas de Sol
  {
    id: 'prod-31',
    name: 'Gafas Aviador Clásicas',
    description: 'Gafas de sol aviador con montura metálica y lentes polarizadas.',
    price: 159.00,
    images: [
      'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800&q=80'
    ],
    category: 'accesorios',
    subcategory: 'gafas-sol',
    collection: 'essentials',
    colors: [
      { name: 'Dorado/Verde', hex: '#FFD700' },
      { name: 'Plateado/Azul', hex: '#C0C0C0' },
      { name: 'Negro/Gris', hex: '#000000' }
    ],
    material: 'Metal y cristal',
    features: ['Lentes polarizadas', 'UV400', 'Incluye funda'],
    stock: 89,
    featured: true,
    rating: 4.8,
    reviews: 289
  },
  {
    id: 'prod-32',
    name: 'Gafas Cat Eye Acetato',
    description: 'Gafas de sol cat eye en acetato italiano con patillas anchas.',
    price: 189.00,
    images: [
      'https://images.unsplash.com/photo-1577803645773-f96470509666?w=800&q=80'
    ],
    category: 'accesorios',
    subcategory: 'gafas-sol',
    collection: 'luxury-edition',
    colors: [
      { name: 'Negro', hex: '#000000' },
      { name: 'Carey', hex: '#8B4513' },
      { name: 'Burdeos', hex: '#722F37' }
    ],
    material: 'Acetato italiano',
    features: ['UV400', 'Incluye funda y paño'],
    stock: 56,
    isNew: true,
    rating: 4.7,
    reviews: 123
  },
  // ACCESORIOS - Relojes
  {
    id: 'prod-33',
    name: 'Reloj Minimalista Acero',
    description: 'Reloj de esfera limpia en acero inoxidable con correa de malla.',
    price: 249.00,
    images: [
      'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=800&q=80'
    ],
    category: 'accesorios',
    subcategory: 'relojes',
    collection: 'essentials',
    colors: [
      { name: 'Plateado', hex: '#C0C0C0' },
      { name: 'Dorado Rosa', hex: '#B76E79' },
      { name: 'Negro', hex: '#000000' }
    ],
    material: 'Acero inoxidable',
    features: ['Movimiento japonés', 'Resistente al agua 3ATM', 'Cristal zafiro'],
    stock: 67,
    featured: true,
    rating: 4.8,
    reviews: 234
  },
  {
    id: 'prod-34',
    name: 'Reloj Cronógrafo Sport',
    description: 'Reloj cronógrafo con función de fecha y correa de silicona.',
    price: 299.00,
    images: [
      'https://images.unsplash.com/photo-1539874754764-5a96559165b0?w=800&q=80'
    ],
    category: 'accesorios',
    subcategory: 'relojes',
    collection: 'sport-active',
    colors: [
      { name: 'Negro', hex: '#000000' },
      { name: 'Azul', hex: '#4169E1' }
    ],
    material: 'Acero y silicona',
    features: ['Cronógrafo', 'Resistente al agua 10ATM', 'Fecha'],
    stock: 45,
    rating: 4.6,
    reviews: 167
  },
  // ACCESORIOS - Joyería
  {
    id: 'prod-35',
    name: 'Collar Cadena Delicada',
    description: 'Collar de cadena fina en plata bañada en oro con colgante minimalista.',
    price: 79.00,
    images: [
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&q=80'
    ],
    category: 'accesorios',
    subcategory: 'joyeria',
    collection: 'essentials',
    colors: [
      { name: 'Oro', hex: '#FFD700' },
      { name: 'Plata', hex: '#C0C0C0' },
      { name: 'Oro Rosa', hex: '#B76E79' }
    ],
    material: 'Plata 925 bañada',
    stock: 156,
    isBestseller: true,
    rating: 4.7,
    reviews: 345
  },
  {
    id: 'prod-36',
    name: 'Pendientes Aro Grueso',
    description: 'Pendientes de aro grueso en metal pulido.',
    price: 59.00,
    images: [
      'https://images.unsplash.com/photo-1630019852942-f89202989a59?w=800&q=80'
    ],
    category: 'accesorios',
    subcategory: 'joyeria',
    collection: 'urban-street',
    colors: [
      { name: 'Oro', hex: '#FFD700' },
      { name: 'Plata', hex: '#C0C0C0' }
    ],
    material: 'Latón bañado',
    stock: 234,
    rating: 4.5,
    reviews: 267
  },
  {
    id: 'prod-37',
    name: 'Pulsera Eslabones',
    description: 'Pulsera de eslabones gruesos con cierre de seguridad.',
    price: 99.00,
    images: [
      'https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=800&q=80'
    ],
    category: 'accesorios',
    subcategory: 'joyeria',
    collection: 'luxury-edition',
    colors: [
      { name: 'Oro', hex: '#FFD700' },
      { name: 'Plata', hex: '#C0C0C0' }
    ],
    material: 'Acero bañado',
    stock: 89,
    rating: 4.6,
    reviews: 145
  },
  // ACCESORIOS - Bufandas
  {
    id: 'prod-38',
    name: 'Bufanda Cashmere',
    description: 'Bufanda extra suave en cashmere puro con flecos.',
    price: 189.00,
    images: [
      'https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?w=800&q=80'
    ],
    category: 'accesorios',
    subcategory: 'bufandas',
    collection: 'luxury-edition',
    colors: [
      { name: 'Gris', hex: '#808080' },
      { name: 'Camel', hex: '#C19A6B' },
      { name: 'Negro', hex: '#000000' }
    ],
    material: '100% Cashmere',
    stock: 45,
    isLimited: true,
    rating: 4.9,
    reviews: 89
  },
  {
    id: 'prod-39',
    name: 'Fular Seda Estampado',
    description: 'Fular de seda con estampado exclusivo.',
    price: 129.00,
    images: [
      'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=800&q=80'
    ],
    category: 'accesorios',
    subcategory: 'bufandas',
    collection: 'primavera-2025',
    colors: [
      { name: 'Multicolor', hex: '#FF6B6B' },
      { name: 'Azul/Blanco', hex: '#4169E1' }
    ],
    material: '100% Seda',
    stock: 67,
    isNew: true,
    rating: 4.7,
    reviews: 78
  },
  // SPORT
  {
    id: 'prod-40',
    name: 'Leggings High Waist',
    description: 'Leggings de talle alto con tejido de compresión y bolsillo lateral.',
    price: 79.00,
    images: [
      'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=800&q=80'
    ],
    category: 'sport',
    subcategory: 'leggings',
    collection: 'sport-active',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Negro', hex: '#000000' },
      { name: 'Navy', hex: '#000080' },
      { name: 'Burdeos', hex: '#722F37' }
    ],
    material: '78% Nylon, 22% Spandex',
    features: ['Compresión', 'Bolsillo lateral', 'Sin costuras'],
    stock: 189,
    isBestseller: true,
    rating: 4.8,
    reviews: 456
  },
  {
    id: 'prod-41',
    name: 'Top Deportivo Cruzado',
    description: 'Sujetador deportivo con tiras cruzadas en la espalda.',
    price: 49.00,
    images: [
      'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80'
    ],
    category: 'sport',
    subcategory: 'tops-deportivos',
    collection: 'sport-active',
    sizes: ['XS', 'S', 'M', 'L'],
    colors: [
      { name: 'Negro', hex: '#000000' },
      { name: 'Blanco', hex: '#FFFFFF' },
      { name: 'Rosa', hex: '#FFC0CB' }
    ],
    material: 'Nylon y Spandex',
    features: ['Soporte medio', 'Copas removibles', 'Secado rápido'],
    stock: 234,
    rating: 4.6,
    reviews: 312
  },
  {
    id: 'prod-42',
    name: 'Sudadera Oversize Training',
    description: 'Sudadera oversize con capucha y bolsillo canguro.',
    price: 89.00,
    images: [
      'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&q=80'
    ],
    category: 'sport',
    subcategory: 'sudaderas',
    collection: 'sport-active',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Gris', hex: '#808080' },
      { name: 'Negro', hex: '#000000' },
      { name: 'Beige', hex: '#F5F5DC' }
    ],
    material: '80% Algodón, 20% Poliéster',
    stock: 145,
    rating: 4.7,
    reviews: 234
  },
  {
    id: 'prod-43',
    name: 'Shorts Running Reflectante',
    description: 'Shorts ligeros con malla interior y detalles reflectantes.',
    price: 59.00,
    images: [
      'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=800&q=80'
    ],
    category: 'sport',
    subcategory: 'shorts',
    collection: 'sport-active',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Negro', hex: '#000000' },
      { name: 'Azul', hex: '#4169E1' },
      { name: 'Verde', hex: '#228B22' }
    ],
    material: '100% Poliéster reciclado',
    features: ['Malla interior', 'Reflectantes', 'Bolsillo con cremallera'],
    stock: 178,
    rating: 4.5,
    reviews: 189
  },
  // Más productos
  {
    id: 'prod-44',
    name: 'Vestido Blazer Power',
    description: 'Vestido estilo blazer con hombreras estructuradas y cinturón.',
    price: 169.00,
    images: [
      'https://images.unsplash.com/photo-1485968579580-b6d095142e6e?w=800&q=80'
    ],
    category: 'mujer',
    subcategory: 'vestidos',
    collection: 'urban-street',
    sizes: ['XS', 'S', 'M', 'L'],
    colors: [
      { name: 'Negro', hex: '#000000' },
      { name: 'Rojo', hex: '#DC143C' },
      { name: 'Check', hex: '#808080' }
    ],
    material: 'Poliéster blend',
    stock: 67,
    isNew: true,
    featured: true,
    rating: 4.7,
    reviews: 98
  },
  {
    id: 'prod-45',
    name: 'Jersey Cuello Alto Merino',
    description: 'Jersey de lana merino con cuello alto y corte relajado.',
    price: 139.00,
    images: [
      'https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?w=800&q=80'
    ],
    category: 'mujer',
    subcategory: 'jerseys',
    collection: 'essentials',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Crema', hex: '#FFFDD0' },
      { name: 'Negro', hex: '#000000' },
      { name: 'Gris', hex: '#808080' },
      { name: 'Camel', hex: '#C19A6B' }
    ],
    material: '100% Lana Merino',
    stock: 112,
    rating: 4.8,
    reviews: 267
  },
  {
    id: 'prod-46',
    name: 'Polo Piqué Premium',
    description: 'Polo clásico en piqué de algodón con logo bordado.',
    price: 79.00,
    images: [
      'https://images.unsplash.com/photo-1625910513413-5fc45e80bb77?w=800&q=80'
    ],
    category: 'hombre',
    subcategory: 'polos',
    collection: 'essentials',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'Blanco', hex: '#FFFFFF' },
      { name: 'Navy', hex: '#000080' },
      { name: 'Verde', hex: '#228B22' },
      { name: 'Rojo', hex: '#DC143C' }
    ],
    material: '100% Algodón Piqué',
    stock: 289,
    isBestseller: true,
    rating: 4.6,
    reviews: 423
  },
  {
    id: 'prod-47',
    name: 'Gorro Lana Canalé',
    description: 'Gorro de lana con tejido acanalado y dobladillo.',
    price: 39.00,
    images: [
      'https://images.unsplash.com/photo-1576871337622-98d48d1cf531?w=800&q=80'
    ],
    category: 'accesorios',
    subcategory: 'gorros',
    collection: 'essentials',
    colors: [
      { name: 'Negro', hex: '#000000' },
      { name: 'Gris', hex: '#808080' },
      { name: 'Beige', hex: '#F5F5DC' },
      { name: 'Burdeos', hex: '#722F37' }
    ],
    material: '50% Lana, 50% Acrílico',
    stock: 234,
    rating: 4.5,
    reviews: 156
  },
  {
    id: 'prod-48',
    name: 'Guantes Piel Táctiles',
    description: 'Guantes de piel con puntas táctiles para usar con el móvil.',
    price: 69.00,
    images: [
      'https://images.unsplash.com/photo-1545594861-3bef43ff2fc8?w=800&q=80'
    ],
    category: 'accesorios',
    subcategory: 'guantes',
    collection: 'essentials',
    sizes: ['S', 'M', 'L'],
    colors: [
      { name: 'Negro', hex: '#000000' },
      { name: 'Marrón', hex: '#8B4513' }
    ],
    material: 'Piel de cordero',
    features: ['Puntas táctiles', 'Forro cashmere'],
    stock: 89,
    rating: 4.7,
    reviews: 123
  }
];

// Métodos de envío
export const shippingMethods: ShippingMethod[] = [
  {
    id: 'standard',
    name: 'Envío Estándar',
    description: 'Entrega en 4-6 días laborables',
    price: 4.95,
    estimatedDays: '4-6 días'
  },
  {
    id: 'express',
    name: 'Envío Express',
    description: 'Entrega en 2-3 días laborables',
    price: 9.95,
    estimatedDays: '2-3 días'
  },
  {
    id: 'premium',
    name: 'Envío Premium',
    description: 'Entrega en 24 horas',
    price: 14.95,
    estimatedDays: '24 horas'
  },
  {
    id: 'free',
    name: 'Envío Gratis',
    description: 'En pedidos superiores a 100€',
    price: 0,
    estimatedDays: '4-6 días'
  }
];

// Funciones de ayuda
export function getProductById(id: string): Product | undefined {
  return products.find(p => p.id === id);
}

export function getProductsByCategory(category: string): Product[] {
  return products.filter(p => p.category === category);
}

export function getProductsBySubcategory(category: string, subcategory: string): Product[] {
  return products.filter(p => p.category === category && p.subcategory === subcategory);
}

export function getProductsByCollection(collectionSlug: string): Product[] {
  return products.filter(p => p.collection === collectionSlug);
}

export function getFeaturedProducts(): Product[] {
  return products.filter(p => p.featured);
}

export function getNewProducts(): Product[] {
  return products.filter(p => p.isNew);
}

export function getBestsellers(): Product[] {
  return products.filter(p => p.isBestseller);
}

export function getLimitedProducts(): Product[] {
  return products.filter(p => p.isLimited);
}

export function searchProducts(query: string): Product[] {
  const lowerQuery = query.toLowerCase();
  return products.filter(p => 
    p.name.toLowerCase().includes(lowerQuery) ||
    p.description.toLowerCase().includes(lowerQuery) ||
    p.category.toLowerCase().includes(lowerQuery) ||
    (p.subcategory && p.subcategory.toLowerCase().includes(lowerQuery))
  );
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find(c => c.slug === slug);
}

export function getCollectionBySlug(slug: string): Collection | undefined {
  return collections.find(c => c.slug === slug);
}
