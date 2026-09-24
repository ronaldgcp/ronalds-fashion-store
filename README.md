# 👗 Ronald's — Luxury Fashion E-commerce

A complete, fully functional fashion and accessories e-commerce platform, built with modern web technologies.

## 📖 Description

Ronald's is an online luxury fashion store offering a premium shopping experience. It includes a product catalog, shopping cart, a simulated payment checkout flow, a full authentication system, and a user dashboard.

## ✨ Features

### 🛍️ Product Catalog
- **6 main categories**: Women's Clothing, Men's Clothing, Bags, Shoes, Accessories, Sport
- **Detailed subcategories**: Dresses, Blouses, Pants, Skirts, Coats, Jackets, etc.
- **48+ products** with high-quality images
- **Price filters**
- **Sorting** by price, newest, and featured items

### 🔐 Authentication System
- User registration with password validation
- Login
- Password recovery
- Session persistence via localStorage

### 🛒 Shopping Cart
- Add/remove products
- Size and color selection
- Quantity adjustment
- Automatic subtotal calculation
- Free shipping indicator (+€100)

### 💳 Checkout Process
- Shipping address form
- Multiple shipping methods (Standard, Express, Overnight)
- Payment gateway with card validation
- Order confirmation with tracking number

### 👤 User Dashboard
- Editable profile
- Order history
- Saved address management

### 🎨 Design & UX
- Fully responsive (mobile, tablet, desktop)
- Smooth CSS animations
- Header with dropdown mega menu
- Auto-playing hero slider
- Scroll-triggered animated sections

## 🧰 Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui
- **Global State**: Zustand
- **Icons**: Lucide React
- **Images**: Next/Image with Unsplash

## 🚀 Installation

### Prerequisites

- Node.js 18.17 or higher
- pnpm (recommended) or npm

### Setup Steps

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd ronalds-ecommerce
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   # or with npm
   npm install
   ```

3. **Start the development server**
   ```bash
   pnpm dev
   # or with npm
   npm run dev
   ```

4. **Open in your browser**
   ```
   http://localhost:3000
   ```

## 📁 Project Structure

```
ronalds-ecommerce/
├── app/                          # Pages and routes (App Router)
│   ├── page.tsx                  # Home page
│   ├── layout.tsx                # Root layout
│   ├── globals.css               # Global styles
│   ├── login/                    # Login page
│   ├── registro/                 # Registration page
│   ├── recuperar-password/       # Password recovery
│   ├── categoria/                # Category pages
│   │   ├── [slug]/               # Dynamic category
│   │   └── [slug]/[subcategory]/ # Dynamic subcategory
│   ├── producto/[id]/            # Product page
│   ├── coleccion/[slug]/         # Collection page
│   ├── colecciones/              # All collections
│   ├── carrito/                  # Shopping cart
│   ├── checkout/                 # Payment process
│   └── cuenta/                   # User dashboard
│       └── pedidos/              # Order history
├── components/                   # Reusable components
│   ├── ui/                       # shadcn/ui components
│   ├── header.tsx                # Main navigation
│   ├── footer.tsx                # Footer
│   └── product-card.tsx          # Product card
├── lib/                          # Utilities and data
│   ├── data.ts                   # Product and category data
│   ├── store.ts                  # Zustand stores
│   ├── types.ts                  # TypeScript types
│   └── utils.ts                  # Utility functions
└── public/                       # Static assets
    └── favicon.ico                # Trident favicon
```

## 📜 Available Scripts

```bash
# Development
pnpm dev          # Start the development server

# Production
pnpm build        # Build for production
pnpm start        # Start the production server

# Linting
pnpm lint         # Run ESLint
```

## ⚙️ Configuration

The project uses the following configuration files:

- **next.config.mjs**: Next.js config with unoptimized images for development
- **tailwind.config.ts**: Tailwind CSS config with a custom theme
- **tsconfig.json**: TypeScript config with path aliases

## 📝 Development Notes

- **No database**: All data is stored in memory and localStorage
- **Simulated payment gateway**: Doesn't process real payments, only simulates the flow
- **Local authentication**: Users are saved in localStorage (not production-ready)
- **Unsplash images**: All images are sourced from Unsplash

## 🛣️ Roadmap

- [ ] Integration with a real database (PostgreSQL/MongoDB)
- [ ] Real payment gateway (Stripe)
- [ ] Authentication with NextAuth.js
- [ ] Product search with Algolia
- [ ] Internationalization (i18n)
- [ ] Unit and e2e tests

## 🤝 Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create a branch for your feature (`git checkout -b feature/new-feature`)
3. Commit your changes (`git commit -m 'Add new feature'`)
4. Push to the branch (`git push origin feature/new-feature`)
5. Open a Pull Request

## 🙌 Credits

**Developed by:**
- **Ronald Cubides and v0**

---

☕ Made with lots of coffee and code by Ronald Cubides