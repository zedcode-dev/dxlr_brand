# Modern E-commerce Store Blueprint
**Next.js Fashion Brand - Simple & Modern Design**

---

## 🎯 Core Philosophy
- **Modern animations** with subtle, smooth interactions
- **Simple aesthetic** - clean white background, calm main color
- **Content-driven** - all data from `content.ts`
- **Performance-first** - fast, responsive, delightful

---

## 📁 Project Structure

```
/app
  /page.tsx                 # Home
  /shop/page.tsx           # Shop/Products
  /product/[id]/page.tsx   # Product Detail
  /about/page.tsx          # About
  /contact/page.tsx        # Contact
  /checkout/page.tsx       # Checkout (mockup)
  /layout.tsx              # Root layout
  
/components
  /ui
    /Navbar.tsx
    /Footer.tsx
    /Button.tsx
    /ProductCard.tsx
    /CartDrawer.tsx
    /AnimatedSection.tsx
  /home
    /Hero.tsx
    /FeaturedProducts.tsx
    /CategorySection.tsx
    /Newsletter.tsx
  /product
    /ProductGallery.tsx
    /ProductInfo.tsx
    /SizeSelector.tsx
  /checkout
    /CheckoutForm.tsx
    /OrderSummary.tsx

/lib
  /content.ts              # ALL CONTENT & PRODUCTS
  /cart-context.tsx        # Cart state management
  /animations.ts           # Framer Motion variants
  /utils.ts                # Helper functions

/public
  /images
    /products
    /brand
```

---

## 🎨 Design System

### Color Palette
```typescript
// Calm, modern palette
primary: '#7C9885'        // Soft sage green
secondary: '#E8EDE7'      // Light cream
accent: '#A4B8A8'         // Muted green
background: '#FFFFFF'     // Pure white
text: '#2D3436'           // Dark gray
textLight: '#636E72'      // Medium gray
```

### Typography
```typescript
// Clean, modern fonts
headings: 'Clash Display' or 'Cabinet Grotesk'
body: 'Inter' or 'Satoshi'
```

### Spacing & Layout
- Max width: 1400px
- Grid: 12 columns
- Gaps: 16px, 24px, 32px, 48px, 64px
- Border radius: 0px (sharp) or 4px (subtle)

---

## 🎭 Animation Strategy

### Principles
1. **Entrance animations**: Fade up, scale, stagger
2. **Hover states**: Scale, color shift, shadow
3. **Page transitions**: Smooth, quick (200-300ms)
4. **Scroll-triggered**: Reveal on scroll (Intersection Observer)
5. **Micro-interactions**: Button press, cart add, image zoom

### Key Animations

**Page Load**
```typescript
// Stagger children on load
container: {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
}

item: {
  hidden: { y: 20, opacity: 0 },
  show: { y: 0, opacity: 1 }
}
```

**Hover Effects**
- Product cards: lift + shadow
- Buttons: scale(1.02) + color darken
- Images: scale(1.05) inside container

**Scroll Animations**
- Fade up on scroll
- Parallax on hero
- Progress indicator

---

## 📄 Pages Breakdown

### 1. HOME PAGE
**Sections:**
- Hero (full viewport, minimal text, video/image background)
- Featured Products (3-4 items, grid)
- Category Showcase (2 categories with images)
- About Preview (brand story snippet)
- Newsletter Signup
- Instagram Feed Preview (optional)

**Key Features:**
- Smooth scroll
- Parallax hero
- Staggered product cards
- Magnetic cursor (subtle)

---

### 2. SHOP PAGE
**Layout:**
- Filter sidebar (collapsible on mobile)
- Product grid (3-4 columns)
- Sort dropdown
- Pagination or infinite scroll

**Filters:**
- Category
- Size
- Price range
- Color

**Product Card:**
```typescript
- Image (hover shows second image)
- Name
- Price
- Quick add to cart button (hover reveal)
- "New" or "Sale" badge
```

---

### 3. PRODUCT DETAIL PAGE
**Layout:**
- Left: Image gallery (main + thumbnails)
- Right: Product info

**Features:**
- Image zoom on hover
- Size selector (visual, not dropdown)
- Quantity selector
- Add to cart (animated)
- Accordion: Description, Care, Shipping
- "You might also like" section

**Animations:**
- Image gallery smooth transitions
- Size selector active state
- Cart add success animation

---

### 4. ABOUT PAGE
**Content:**
- Hero section (brand mission)
- Story timeline
- Values/pillars (grid of 3-4)
- Team or founder section (optional)
- Sustainability commitment

**Design:**
- Large typography
- Minimal imagery
- Generous whitespace

---

### 5. CONTACT PAGE
**Elements:**
- Contact form (Name, Email, Message)
- Email/Social links
- Store location (if applicable)
- FAQ accordion

**Form:**
- Floating labels
- Validation feedback
- Success state animation

---

### 6. CHECKOUT PAGE (Mockup)
**Steps:**
1. Cart review
2. Shipping info
3. Payment (mockup - no real processing)
4. Order confirmation

**Features:**
- Progress indicator
- Order summary sidebar
- Form validation
- Success animation

---

## 🗂️ Content Structure (`content.ts`)

```typescript
// SITE CONFIG
export const siteConfig = {
  name: "BRAND NAME",
  tagline: "Timeless pieces for modern living",
  email: "hello@brand.com",
  social: {
    instagram: "@brandname",
    twitter: "@brandname"
  }
}

// PRODUCTS
export interface Product {
  id: string
  name: string
  price: number
  category: string
  description: string
  images: string[]
  sizes: string[]
  colors: string[]
  featured: boolean
  new: boolean
  sale: boolean
  salePrice?: number
}

export const products: Product[] = [
  {
    id: "001",
    name: "Classic Linen Shirt",
    price: 89,
    category: "Shirts",
    description: "Breathable linen shirt...",
    images: ["/images/shirt-1.jpg", "/images/shirt-2.jpg"],
    sizes: ["S", "M", "L", "XL"],
    colors: ["White", "Beige"],
    featured: true,
    new: true,
    sale: false
  },
  // ... more products
]

// CATEGORIES
export const categories = [
  { name: "Shirts", slug: "shirts", image: "/images/cat-shirts.jpg" },
  { name: "Pants", slug: "pants", image: "/images/cat-pants.jpg" },
  // ...
]

// PAGES CONTENT
export const pageContent = {
  home: {
    hero: {
      title: "Elevated Essentials",
      subtitle: "Timeless pieces designed for everyday elegance",
      cta: "Shop Collection"
    },
    about: {
      title: "Crafted with Care",
      text: "We believe in quality over quantity..."
    }
  },
  about: {
    mission: "Our mission is to...",
    story: "Founded in 2024...",
    values: [
      { title: "Quality", text: "..." },
      { title: "Sustainability", text: "..." },
      { title: "Transparency", text: "..." }
    ]
  }
}

// FAQ
export const faqs = [
  { q: "What's your return policy?", a: "30 days..." },
  // ...
]
```

---

## 🛒 Cart Management

```typescript
// cart-context.tsx
interface CartItem {
  product: Product
  size: string
  color: string
  quantity: number
}

interface CartContext {
  items: CartItem[]
  addItem: (item: CartItem) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, qty: number) => void
  total: number
  itemCount: number
  clearCart: () => void
}

// Store in localStorage
// Animate on add/remove
```

---

## 🎬 Animation Library (Framer Motion)

```typescript
// animations.ts
export const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
}

export const scaleIn = {
  initial: { scale: 0.9, opacity: 0 },
  animate: { scale: 1, opacity: 1 },
  transition: { duration: 0.3 }
}

export const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
}

export const hoverScale = {
  whileHover: { scale: 1.02 },
  whileTap: { scale: 0.98 }
}
```

---

## 🧩 Key Components

### Navbar
- Logo (left)
- Menu links: Shop, About, Contact
- Search icon (optional)
- Cart icon with count badge
- Sticky on scroll with background fade-in
- Mobile: hamburger menu

### Product Card
```tsx
- Container: overflow hidden
- Image: scale on hover
- Quick view button (hover reveal)
- Add to cart (slide up on hover)
- Smooth transitions
```

### Footer
- Logo + tagline
- Links: Shop, About, Contact, FAQ
- Social icons
- Newsletter signup
- Copyright

### Cart Drawer
- Slide from right
- Backdrop blur
- Item list
- Subtotal
- Checkout button
- Close button

---

## 📱 Responsive Breakpoints

```typescript
sm: '640px'   // Mobile landscape
md: '768px'   // Tablet
lg: '1024px'  // Desktop
xl: '1280px'  // Large desktop
2xl: '1536px' // XL desktop
```

**Grid Adjustments:**
- Mobile: 1 column
- Tablet: 2 columns
- Desktop: 3-4 columns

---

## ⚡ Performance Optimizations

1. **Images**: Next.js Image component, lazy loading
2. **Fonts**: Font optimization, preload
3. **Code splitting**: Dynamic imports
4. **Animations**: Use `transform` and `opacity` only
5. **Debounce**: Search, scroll events
6. **Memoization**: React.memo, useMemo for heavy computations

---

## 🎯 Key User Flows

### Shopping Flow
1. Land on home → See hero + featured products
2. Click "Shop" → Browse products with filters
3. Click product → View details + gallery
4. Select size/color → Add to cart (success animation)
5. Open cart drawer → Review items
6. Click checkout → Fill form → Success

### Discovery Flow
1. Home → Scroll through featured products
2. Click category → Filter by category
3. Explore products → Add favorites to cart

---

## 🔧 Tech Stack Summary

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **State**: Context API + localStorage
- **Forms**: React Hook Form
- **Type Safety**: TypeScript

---

## 🚀 Development Priority

**Phase 1: Foundation**
1. Setup Next.js + Tailwind + Framer Motion
2. Create content.ts with sample products
3. Build Navbar + Footer
4. Setup cart context

**Phase 2: Core Pages**
1. Home page (hero + featured products)
2. Shop page (grid + filters)
3. Product detail page

**Phase 3: Polish**
1. About + Contact pages
2. Checkout mockup
3. Animations refinement
4. Mobile optimization

**Phase 4: Final Touches**
1. Performance optimization
2. Accessibility
3. Testing
4. Deploy

---

## 💡 Unique Selling Points

1. **Scroll-triggered reveals**: Content appears elegantly as you scroll
2. **Magnetic hover effects**: Buttons/cards react to cursor proximity
3. **Smooth page transitions**: No jarring navigations
4. **Product image zoom**: Hover to see details
5. **Minimal aesthetic**: Lots of breathing room, calm colors
6. **Fast & responsive**: Optimized for speed

---

## 📝 Sample Products (6-8 needed)

1. Classic Linen Shirt - $89
2. Wide-Leg Trousers - $125
3. Oversized Blazer - $189
4. Cotton Tee (Basic) - $45
5. Denim Jacket - $159
6. Knit Sweater - $98
7. Linen Pants - $115
8. Silk Scarf - $65

---

## ✅ Final Checklist

- [ ] All animations smooth (60fps)
- [ ] Mobile-first responsive
- [ ] Cart persists (localStorage)
- [ ] Images optimized
- [ ] Fast page loads (<2s)
- [ ] Accessible (ARIA labels, keyboard nav)
- [ ] Clean code structure
- [ ] TypeScript strict mode
- [ ] SEO meta tags
- [ ] Error handling

---

**Ready to build? Start with the foundation and iterate!** 🚀