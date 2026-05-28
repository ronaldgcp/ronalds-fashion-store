# Ronald's - E-commerce de Moda de Lujo

Un e-commerce completo y funcional de ropa y accesorios de moda, desarrollado con las últimas tecnologías web.

![Ronald's E-commerce](https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&q=80)

## Descripción

Ronald's es una tienda online de moda de lujo que ofrece una experiencia de compra premium. Incluye catálogo de productos, carrito de compras, proceso de checkout con pasarela de pagos simulada, sistema de autenticación completo y panel de usuario.

## Características

### Catálogo de Productos
- **6 Categorías principales**: Ropa Mujer, Ropa Hombre, Bolsos, Zapatos, Accesorios, Sport
- **Subcategorías detalladas**: Vestidos, Blusas, Pantalones, Faldas, Abrigos, Chaquetas, etc.
- **+48 productos** con imágenes de alta calidad
- **Filtros de precio** funcionales
- **Ordenamiento** por precio, novedades y destacados

### Sistema de Autenticación
- Registro de usuarios con validación de contraseña
- Inicio de sesión
- Recuperación de contraseña
- Persistencia de sesión con localStorage

### Carrito de Compras
- Añadir/eliminar productos
- Selección de talla y color
- Modificación de cantidades
- Cálculo automático de subtotales
- Indicador de envío gratuito (+100€)

### Proceso de Checkout
- Formulario de dirección de envío
- Múltiples métodos de envío (Estándar, Express, Nocturno)
- Pasarela de pagos con validación de tarjeta
- Confirmación de pedido con número de seguimiento

### Panel de Usuario
- Perfil editable
- Historial de pedidos
- Gestión de direcciones guardadas

### Diseño y UX
- Diseño responsive (móvil, tablet, desktop)
- Animaciones suaves con CSS
- Header con mega menú desplegable
- Hero slider con auto-play
- Secciones animadas al scroll

## Tecnologías Utilizadas

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Lenguaje**: [TypeScript](https://www.typescriptlang.org/)
- **Estilos**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Componentes UI**: [shadcn/ui](https://ui.shadcn.com/)
- **Estado Global**: [Zustand](https://zustand-demo.pmnd.rs/)
- **Iconos**: [Lucide React](https://lucide.dev/)
- **Imágenes**: [Next/Image](https://nextjs.org/docs/app/api-reference/components/image) con Unsplash

## Instalación

### Prerrequisitos

- Node.js 18.17 o superior
- pnpm (recomendado) o npm

### Pasos de Instalación

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/tu-usuario/ronalds-ecommerce.git
   cd ronalds-ecommerce
   ```

2. **Instalar dependencias**
   ```bash
   pnpm install
   # o con npm
   npm install
   ```

3. **Iniciar el servidor de desarrollo**
   ```bash
   pnpm dev
   # o con npm
   npm run dev
   ```

4. **Abrir en el navegador**
   ```
   http://localhost:3000
   ```

## Estructura del Proyecto

```
ronalds-ecommerce/
├── app/                          # Páginas y rutas (App Router)
│   ├── page.tsx                  # Página principal
│   ├── layout.tsx                # Layout raíz
│   ├── globals.css               # Estilos globales
│   ├── login/                    # Página de inicio de sesión
│   ├── registro/                 # Página de registro
│   ├── recuperar-password/       # Recuperación de contraseña
│   ├── categoria/                # Páginas de categorías
│   │   ├── [slug]/               # Categoría dinámica
│   │   └── [slug]/[subcategory]/ # Subcategoría dinámica
│   ├── producto/[id]/            # Página de producto
│   ├── coleccion/[slug]/         # Página de colección
│   ├── colecciones/              # Todas las colecciones
│   ├── carrito/                  # Carrito de compras
│   ├── checkout/                 # Proceso de pago
│   └── cuenta/                   # Panel de usuario
│       └── pedidos/              # Historial de pedidos
├── components/                   # Componentes reutilizables
│   ├── ui/                       # Componentes shadcn/ui
│   ├── header.tsx                # Navegación principal
│   ├── footer.tsx                # Pie de página
│   └── product-card.tsx          # Tarjeta de producto
├── lib/                          # Utilidades y datos
│   ├── data.ts                   # Datos de productos y categorías
│   ├── store.ts                  # Stores de Zustand
│   ├── types.ts                  # Tipos TypeScript
│   └── utils.ts                  # Funciones de utilidad
└── public/                       # Archivos estáticos
    └── favicon.ico               # Favicon con tridente
```

## Scripts Disponibles

```bash
# Desarrollo
pnpm dev          # Inicia servidor de desarrollo

# Producción
pnpm build        # Compila para producción
pnpm start        # Inicia servidor de producción

# Linting
pnpm lint         # Ejecuta ESLint
```

## Configuración

El proyecto utiliza las siguientes configuraciones:

- **next.config.mjs**: Configuración de Next.js con imágenes sin optimizar para desarrollo
- **tailwind.config.ts**: Configuración de Tailwind CSS con tema personalizado
- **tsconfig.json**: Configuración de TypeScript con paths alias

## Notas de Desarrollo

- **Sin base de datos**: Todos los datos se almacenan en memoria y localStorage
- **Pasarela de pagos simulada**: No procesa pagos reales, solo simula el flujo
- **Autenticación local**: Los usuarios se guardan en localStorage (no usar en producción)
- **Imágenes de Unsplash**: Todas las imágenes provienen de Unsplash

## Próximas Mejoras

- [ ] Integración con base de datos real (PostgreSQL/MongoDB)
- [ ] Pasarela de pagos real (Stripe)
- [ ] Sistema de autenticación con NextAuth.js
- [ ] Búsqueda de productos con Algolia
- [ ] Internacionalización (i18n)
- [ ] Tests unitarios y e2e

## Contribuir

Las contribuciones son bienvenidas. Por favor:

1. Haz fork del repositorio
2. Crea una rama para tu feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit tus cambios (`git commit -m 'Añade nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request

## Créditos

**Desarrollado por:**
- **Ronald Cubides** - Desarrollo y diseño
- **v0 by Vercel** - Asistente de desarrollo AI

**Tecnologías:**
- [Vercel](https://vercel.com) - Plataforma de despliegue
- [v0.dev](https://v0.dev) - Asistente de desarrollo AI

## Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo [LICENSE](LICENSE) para más detalles.

---

Hecho con mucho cafe y codigo por Ronald Cubides con la ayuda de v0 by Vercel
