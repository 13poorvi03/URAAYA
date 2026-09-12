# URAAYA | Haute Couture & Luxury Fashion Atelier

An ultra-modern, editorial e-commerce frontend web application inspired by high-end European fashion houses (Zara Atelier, Massimo Dutti, Jacquemus, Saint Laurent).

---

## Brand Ethos: URAAYA
> *"Timeless elegance meets modern sculptural tailoring."*

URAAYA represents quiet luxury, pure materials, and architectural drape. Built with a bespoke design system featuring European serif typography, high-fashion editorial imagery, champagne gold metallic accents, and seamless micro-interactions.

---

## Key Features

### 1. Editorial Navigation & Header
- Sticky header with glassmorphism on scroll
- Announcement marquee with auto-cycling updates and promos
- Multi-currency switcher: **USD ($)**, **EUR (€)**, **GBP (£)**, **JPY (¥)** with real-time conversion
- Fullscreen search overlay with live filtering, tag suggestions, and direct links
- Quick-access Wishlist counter and slide-over Shopping Bag badge
- Responsive mobile drawer navigation with VIP concierge assistance

### 2. High-Impact Homepage
- **Editorial Hero Banner**: Full-bleed carousel with high-fashion photography and animated CTAs
- **Featured Capsules**: Asymmetric editorial layout highlighting seasonal drops
- **Trending Pieces Carousel**: Smooth horizontal scroll with category filter and quick-add functionality
- **Interactive Editorial Lookbook Teaser**: "Shop The Look" with pulsating clickable pins revealing garment popovers
- **Category Portals**: Portals for **Women**, **Men**, **Kids ("Petit URAAYA")**, and **Bags & Accessories**
- **The Atelier Craft Story**: Brand manifesto highlighting Mongolian Cashmere, Tuscan Leather, and Biella Wool
- **Luxury Client Perks**: Worldwide delivery, 24/7 concierge, bespoke packaging, 30-day returns

### 3. Product Listing Pages (PLP)
- Accessible via `/shop` or category routes (`/category/women`, `/category/men`, `/category/kids`, `/category/accessories`)
- Comprehensive Filter Sidebar:
  - Subcategory filtering
  - Price range slider ($100 – $2,000)
  - Sizing selector (`XS` through `XL`, kids sizes, `One Size`)
  - Color palette swatches with real-time indicators
- Dynamic Sorting: *Featured Atelier*, *New Season In*, *Price: Low to High*, *Price: High to Low*, *Highest Rated*
- Dual Grid View: Switch between 2-column large editorial mode and 3/4-column catalog mode
- Mobile filter drawer with active filter chips and 1-click reset

### 4. Product Detail Page (PDP)
- Multi-angle high-resolution gallery with thumbnail switcher
- **Interactive Image Lens Magnifier**: High-zoom examination on hover
- Fullscreen Lightbox image modal
- Klarna 4x installment calculator
- Color selector and size buttons with stock-level warnings ("*Only 2 pieces remaining*")
- **Interactive Size Architecture Guide**: Modal with imperial (inches) and metric (cm) measurement tables
- Accordion Sections: *Silhouette & Cut Architecture*, *Fabric Composition & Provenance*, *Care & Preservation*, *Delivery & Returns*
- **Customer Reviews & Ratings**: Breakdown stars, verified purchaser badges, and interactive "Write an Appraisal" submission modal
- **Complete The Look**: Curated sartorial pairings styled by atelier directors

### 5. Dedicated "Petit URAAYA" Kids Fashion
- Refined youth couture with hypoallergenic organic French linens and cloud-soft cashmere
- Playful yet ultra-premium aesthetic with tailored kids peacoats and keepsake gift sachets

### 6. Bags & Fine Leather Showcase
- Focus on Tuscan vegetable-tanned saddle leather, 24k vermeil jewelry, and Italian footwear
- Bespoke gold foil monogramming service callout

### 7. Interactive Editorial Lookbook
- Magazine editorial spreads with story quotes and clickable pins directly linking to garments

### 8. Shopping Bag & Checkout Flow
- **Slide-over Quick Bag**: Item thumbnails, quantity adjustment, promo code engine (`URAAYA10` for 10% off, `ATELIER20` for 20% off), and free shipping progress meter ($300 threshold)
- **Dedicated Bag Page (`/cart`)**: Complimentary gift packaging option with handwritten calligraphy note
- **3-Step Checkout (`/checkout`)**:
  - Step 1: Customer Contact & Shipping Address with auto-fill
  - Step 2: Delivery options (Standard Atelier, DHL Express VIP, Same-Day White-Glove Concierge)
  - Step 3: Simulated Luxury 3D Card Payment with live card visualizer and Apple Pay / Google Pay
- **Order Confirmation (`/order-success/:orderId`)**:
  - Simulated live order tracker (Order Confirmed ➔ Atelier Packaging ➔ Courier Transit ➔ Signature Delivery)
  - Printable invoice generator (`window.print()`)

### 9. User Account & VIP Atelier Membership
- VIP Tier badge (*URAAYA Black Card Atelier VIP*) with loyalty points balance
- Past orders history with live order tracking statuses
- Saved residences address book with "Add Residence" form
- Wishlist collection with direct 1-click "Move to Bag"

### 10. Atelier Heritage & Concierge
- **About Page (`/about`)**: The slow couture manifesto, fiber provenance, and tailoring archives
- **Concierge & Flagship Salons (`/contact`)**:
  - Interactive flagship directory (*Paris Place Vendôme, Milan Via Montenapoleone, New York Madison Avenue, London Mayfair, Tokyo Ginza*)
  - Private styling appointment scheduler with date, time, and service selection
  - Direct concierge message form

---

## Tech Stack & Architecture

- **Core**: React 19, React Router v7
- **Bundler**: Vite 8
- **Styling**: Tailwind CSS v3 with custom luxury design tokens (`noir`, `alabaster`, `sand`, `gold`)
- **Typography**: Google Fonts (*Cormorant Garamond*, *Plus Jakarta Sans*, *Cinzel*)
- **Icons**: Lucide React
- **State Management**: React Contexts with automatic `localStorage` persistence:
  - `CartContext`: items, quantities, discounts, shipping calculations, bag drawer state
  - `WishlistContext`: saved favorites, counter
  - `AuthContext`: user profile, tier, addresses, order history
  - `CurrencyContext`: live multi-currency conversions ($ USD, € EUR, £ GBP, ¥ JPY)

---

## Running the Application

### Development Mode
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### Production Build & Preview
```bash
npm run build
npm run preview
```

---

## Connecting with Backend (Ready for API Integration)

All state is cleanly isolated in `src/context/` and `src/data/`:
1. **Products & Catalog**: Replace `src/data/products.js` with API calls (`GET /api/products`, `GET /api/products/:id`).
2. **Cart & Orders**: Replace `CartContext` and `AuthContext` order submission with `POST /api/orders` and Stripe / PayPal payment intents.
3. **Authentication**: Connect `AuthContext` to your JWT / OAuth backend endpoints (`POST /api/auth/login`, `POST /api/auth/register`).

