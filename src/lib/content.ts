// ============================================
// DXLR Fashion Brand - Content Configuration
// ============================================

// Site Configuration
export const siteConfig = {
  name: "DXLR",
  tagline: "Elevated Essentials for Modern Living",
  description: "Premium fashion pieces crafted with precision and purpose. DXLR represents the intersection of timeless design and contemporary style.",
  email: "hello@dxlr.eg",
  phone: "+20 100 123 4567",
  address: "Downtown Cairo, 26th of July Street, Cairo, Egypt",
  social: {
    instagram: "@dxlr.official",
    twitter: "@dxlr",
    facebook: "DXLR.Official",
    pinterest: "dxlr"
  },
  currency: "EGP",
  currencySymbol: "EGP "
}

// Product Interface
export interface Product {
  id: string
  name: string
  price: number
  category: string
  categorySlug: string
  description: string
  details: string[]
  care: string[]
  material: string
  images: string[]
  sizes: string[]
  colors: { name: string; hex: string }[]
  featured: boolean
  new: boolean
  sale: boolean
  salePrice?: number
  inStock: boolean
}

// Categories
export const categories = [
  {
    name: "Shirts",
    slug: "shirts",
    description: "Premium quality shirts for every occasion",
    image: "/images/categories/shirts.jpg"
  },
  {
    name: "Pants",
    slug: "pants",
    description: "Tailored trousers and relaxed fits",
    image: "/images/categories/pants.jpg"
  },
  {
    name: "Jackets",
    slug: "jackets",
    description: "Outerwear that makes a statement",
    image: "/images/categories/jackets.jpg"
  },
  {
    name: "Accessories",
    slug: "accessories",
    description: "The finishing touches to complete your look",
    image: "/images/categories/accessories.jpg"
  }
]

// Products
export const products: Product[] = [
  {
    id: "001",
    name: "Classic White Oxford Shirt",
    price: 1850,
    category: "Shirts",
    categorySlug: "shirts",
    description: "A timeless white Oxford shirt crafted from premium Egyptian cotton. The perfect foundation for any wardrobe, this shirt features a classic fit with a button-down collar and genuine mother-of-pearl buttons. Versatile enough to wear with a suit or casually with jeans.",
    details: [
      "100% Egyptian cotton Oxford weave",
      "Classic fit with button-down collar",
      "Mother-of-pearl buttons",
      "Single chest pocket",
      "Adjustable barrel cuffs",
      "Split back yoke for comfort"
    ],
    care: [
      "Machine wash cold with like colors",
      "Tumble dry low",
      "Iron on medium heat",
      "Do not bleach"
    ],
    material: "100% Egyptian Cotton",
    images: [
      "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=800&q=80",
      "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=800&q=80",
      "https://images.unsplash.com/photo-1620012253295-c15cc3e65df4?w=800&q=80"
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: [
      { name: "White", hex: "#FFFFFF" },
      { name: "Light Blue", hex: "#ADD8E6" }
    ],
    featured: true,
    new: true,
    sale: false,
    inStock: true
  },
  {
    id: "002",
    name: "Premium Wool Overcoat",
    price: 4500,
    category: "Jackets",
    categorySlug: "jackets",
    description: "A sophisticated overcoat crafted from Italian virgin wool. This timeless piece features a tailored silhouette with peak lapels, double-breasted closure, and a luxurious satin lining. Perfect for formal occasions and cold weather elegance.",
    details: [
      "100% Italian virgin wool",
      "Double-breasted with peak lapels",
      "Full satin lining",
      "Two flap pockets with ticket pocket",
      "Inside welt pocket",
      "Center back vent"
    ],
    care: [
      "Professional dry clean only",
      "Store on wide hanger",
      "Use garment bag for storage",
      "Brush regularly to maintain"
    ],
    material: "100% Virgin Wool",
    images: [
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&q=80",
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&q=80",
      "https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?w=800&q=80"
    ],
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Charcoal", hex: "#36454F" },
      { name: "Navy", hex: "#1B2838" },
      { name: "Camel", hex: "#C19A6B" }
    ],
    featured: true,
    new: false,
    sale: true,
    salePrice: 3600,
    inStock: true
  },
  {
    id: "003",
    name: "Italian Leather Belt",
    price: 950,
    category: "Accessories",
    categorySlug: "accessories",
    description: "A handcrafted leather belt made from full-grain Italian calfskin. Features a solid brass buckle with a brushed finish and carefully stitched edges. This belt ages beautifully, developing a unique patina over time.",
    details: [
      "Full-grain Italian calfskin leather",
      "Solid brass buckle with brushed finish",
      "Hand-stitched edges",
      "35mm width",
      "5 adjustment holes",
      "Made in Italy"
    ],
    care: [
      "Wipe with dry cloth after use",
      "Apply leather conditioner monthly",
      "Store flat or rolled",
      "Keep away from direct sunlight"
    ],
    material: "100% Italian Calfskin Leather",
    images: [
      "https://images.unsplash.com/photo-1624222247344-550fb60583dc?w=800&q=80",
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80",
      "https://images.unsplash.com/photo-1585856331426-d7e74642e45a?w=800&q=80"
    ],
    sizes: ["85cm", "90cm", "95cm", "100cm", "105cm"],
    colors: [
      { name: "Black", hex: "#1A1A1A" },
      { name: "Dark Brown", hex: "#3D2314" },
      { name: "Tan", hex: "#D2B48C" }
    ],
    featured: true,
    new: true,
    sale: false,
    inStock: true
  },
  {
    id: "004",
    name: "Premium Denim Jeans",
    price: 3200,
    category: "Pants",
    categorySlug: "pants",
    description: "Expertly crafted from Japanese selvedge denim. These jeans feature a modern tapered fit and are rinsed for a softer feel from the first wear. The indigo dye will fade uniquely to you over time.",
    details: [
      "13.5oz Japanese selvedge denim",
      "Modern tapered fit",
      "Button fly",
      "Chain-stitched hem",
      "Leather patch",
      "Made in Japan"
    ],
    care: [
      "Wash cold inside out",
      "Hang dry only",
      "Wash infrequently",
      "Avoid light colors initially"
    ],
    material: "100% Cotton Selvedge Denim",
    images: [
      "https://images.unsplash.com/photo-1602293589930-45aad59ba3ab?w=800&q=80",
      "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=800&q=80",
      "https://images.unsplash.com/photo-1565084888279-aca607ecce0c?w=800&q=80"
    ],
    sizes: ["30", "31", "32", "33", "34", "36"],
    colors: [
      { name: "Indigo", hex: "#1F2937" },
      { name: "Black", hex: "#111827" },
      { name: "Light Wash", hex: "#9CA3AF" }
    ],
    featured: true,
    new: false,
    sale: false,
    inStock: true
  },
  {
    id: "005",
    name: "Cashmere Turtleneck",
    price: 3800,
    category: "Shirts",
    categorySlug: "shirts",
    description: "The ultimate luxury basic. Woven from Grade-A Mongolian cashmere, this turtleneck offers unmatched softness and warmth without bulk. A perfect layering piece for the discerning wardrobe.",
    details: [
      "100% Grade-A Mongolian Cashmere",
      "2-ply yarn for durability",
      "Ribbed neck, cuffs and hem",
      "Regular fit",
      "Temperature regulating"
    ],
    care: [
      "Hand wash cold or dry clean",
      "Dry flat in shade",
      "Do not hang",
      "Use cashmere comb for pilling"
    ],
    material: "100% Cashmere",
    images: [
      "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&q=80",
      "https://images.unsplash.com/photo-1624458316315-998f828a1ea5?w=800&q=80",
      "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=800&q=80"
    ],
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Charcoal", hex: "#374151" },
      { name: "Camel", hex: "#D4A373" },
      { name: "Cream", hex: "#F3E9D2" }
    ],
    featured: false,
    new: true,
    sale: false,
    inStock: true
  },
  {
    id: "006",
    name: "Classic Chelsea Boots",
    price: 5200,
    category: "Accessories",
    categorySlug: "accessories",
    description: "A reimagined classic. These Chelsea boots are constructed with a sleek profile and a durable Goodyear welt. The elastic side panels and pull tabs make them easy to slip on, while the leather sole ensures elegance.",
    details: [
      "Full-grain calf leather upper",
      "Goodyear welt construction",
      "Leather lining and sole",
      "Reinforced elastic panels",
      "Hand-finished"
    ],
    care: [
      "Clean with soft brush",
      "Polish regularly",
      "Use shoe trees",
      "Resoling recommended when worn"
    ],
    material: "100% Calf Leather",
    images: [
      "https://images.unsplash.com/photo-1638247025967-b4e38f787b76?w=800&q=80",
      "https://images.unsplash.com/photo-1560343090-f0409e92791a?w=800&q=80",
      "https://images.unsplash.com/photo-1542280756-74b2f55e73ab?w=800&q=80"
    ],
    sizes: ["40", "41", "42", "43", "44", "45"],
    colors: [
      { name: "Black", hex: "#000000" },
      { name: "Dark Brown", hex: "#3E2723" },
      { name: "Suede Tan", hex: "#BCAAA4" }
    ],
    featured: false,
    new: false,
    sale: false,
    inStock: true
  },
  {
    id: "007",
    name: "Printed Silk Scarf",
    price: 1800,
    category: "Accessories",
    categorySlug: "accessories",
    description: "Add a touch of flair to any outfit. This 100% silk scarf features an exclusive geometric print designed in our Cairo studio. Lightweight and breathable, it can be styled in multiple ways.",
    details: [
      "100% Mulberry silk",
      "Hand-rolled edges",
      "Exclusive geometric print",
      "90cm x 90cm square",
      "Printed in Italy"
    ],
    care: [
      "Dry clean only",
      "Iron on low heat",
      "Do not bleach",
      "Store flat"
    ],
    material: "100% Mulberry Silk",
    images: [
      "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=800&q=80",
      "https://images.unsplash.com/photo-1584030373081-f37b7bb4fa8e?w=800&q=80",
      "https://images.unsplash.com/photo-1606294503028-5a417539dfd4?w=800&q=80"
    ],
    sizes: ["One Size"],
    colors: [
      { name: "Midnight Blue", hex: "#191970" },
      { name: "Burgundy", hex: "#800020" }
    ],
    featured: false,
    new: true,
    sale: false,
    inStock: true
  },
  {
    id: "008",
    name: "Aviator Sunglasses",
    price: 2400,
    category: "Accessories",
    categorySlug: "accessories",
    description: "Iconic style meets modern protection. These aviator frames are made from lightweight aerospace-grade alloy and feature polarized lenses to reduce glare. A timeless accessory for the sunny days ahead.",
    details: [
      "Aerospace-grade metal alloy frame",
      "Polarized UV400 lenses",
      "Adjustable nose pads",
      "Includes leather case",
      "Lens width: 58mm"
    ],
    care: [
      "Clean with microfiber cloth",
      "Keep in case when not in use",
      "Avoid harsh chemicals",
      "Do not leave in hot car"
    ],
    material: "Metal Alloy & Polycarbonate",
    images: [
      "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=800&q=80",
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800&q=80",
      "https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?w=800&q=80"
    ],
    sizes: ["One Size"],
    colors: [
      { name: "Gold/Green", hex: "#FFD700" },
      { name: "Silver/Blue", hex: "#C0C0C0" },
      { name: "Black/Grey", hex: "#000000" }
    ],
    featured: true,
    new: false,
    sale: true,
    salePrice: 1950,
    inStock: true
  },
  {
    id: "009",
    name: "Leather Weekend Bag",
    price: 8500,
    category: "Accessories",
    categorySlug: "accessories",
    description: "The perfect companion for your short getaways. This spacious weekender is crafted from durable pebbled leather that resists scratches. Features a separate shoe compartment and multiple internal pockets.",
    details: [
      "Pebbled full-grain leather",
      "Water-resistant lining",
      "Detachable shoulder strap",
      "Dedicated shoe compartment",
      "Brass hardware",
      "Dimensions: 50x30x25cm"
    ],
    care: [
      "Wipe clean with damp cloth",
      "Use leather conditioner",
      "Stuff with paper to keep shape",
      "Store in dust bag"
    ],
    material: "100% Full-Grain Leather",
    images: [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80",
      "https://images.unsplash.com/photo-1547949003-9792a18a2601?w=800&q=80",
      "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=800&q=80"
    ],
    sizes: ["One Size"],
    colors: [
      { name: "Cognac", hex: "#9E5B40" },
      { name: "Black", hex: "#000000" }
    ],
    featured: false,
    new: true,
    sale: false,
    inStock: true
  },
  {
    id: "010",
    name: "Minimalist Mechanical Watch",
    price: 6500,
    category: "Accessories",
    categorySlug: "accessories",
    description: "Strip back the unnecessary. This automatic watch features a clean Bauhaus-inspired dial, sapphire crystal glass, and a reliable Japanese movement. A statement of understated elegance.",
    details: [
      "Automatic mechanical movement",
      "Sapphire crystal glass",
      "316L Stainless steel case",
      "Genuine leather strap",
      "5ATM water resistance",
      "Case diameter: 40mm"
    ],
    care: [
      "Avoid strong magnetic fields",
      "Service every 3-5 years",
      "Do not shower with watch",
      "Wipe clean with soft cloth"
    ],
    material: "Stainless Steel & Leather",
    images: [
      "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=800&q=80",
      "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?w=800&q=80",
      "https://images.unsplash.com/photo-1434056886845-dac89dd99199?w=800&q=80"
    ],
    sizes: ["One Size"],
    colors: [
      { name: "Silver/White", hex: "#F5F5F5" },
      { name: "Rose Gold/Black", hex: "#B76E79" }
    ],
    featured: true,
    new: false,
    sale: false,
    inStock: true
  }
]

// Page Content
export const pageContent = {
  home: {
    hero: {
      title: "Elevated Essentials",
      subtitle: "Timeless pieces designed for modern living. Crafted with intention, worn with confidence.",
      cta: "Shop Collection"
    },
    featured: {
      title: "Featured Pieces",
      subtitle: "Curated selections from our latest collection"
    },
    categories: {
      title: "Shop by Category",
      subtitle: "Find your perfect fit"
    },
    about: {
      title: "Crafted with Purpose",
      text: "At DXLR, we believe in the power of thoughtful design. Each piece in our collection is carefully considered—from the selection of premium materials to the precision of every stitch. We create garments that transcend trends, offering timeless style that grows more personal with every wear."
    },
    newsletter: {
      title: "Join the DXLR Community",
      subtitle: "Subscribe for exclusive access to new arrivals, style guides, and member-only offers.",
      placeholder: "Enter your email",
      button: "Subscribe"
    }
  },
  about: {
    hero: {
      title: "Our Story",
      subtitle: "Born from a desire to create something meaningful"
    },
    mission: "DXLR was founded with a simple mission: to create exceptional garments that respect both the wearer and the world we live in. We believe that true luxury isn't about excess—it's about intention, quality, and timeless design.",
    story: "Founded in 2024, DXLR emerged from a shared frustration with fast fashion and a passion for craftsmanship. Our founders, with decades of experience in design and sustainable manufacturing, set out to prove that ethical fashion could also be desirable fashion. Every piece we create tells a story of careful sourcing, skilled artisanship, and respect for both people and planet.",
    values: [
      {
        title: "Quality First",
        text: "We source the finest materials from trusted partners around the world. From Italian wool to Japanese denim, every fabric is chosen for its exceptional feel, durability, and natural beauty.",
        icon: "gem"
      },
      {
        title: "Sustainable Practices",
        text: "Our commitment to the environment influences every decision we make. We use organic and recycled materials where possible, minimize waste, and partner with manufacturers who share our values.",
        icon: "leaf"
      },
      {
        title: "Timeless Design",
        text: "We create pieces meant to last—not just in construction, but in style. Our designs transcend seasonal trends, offering a refined aesthetic that remains relevant year after year.",
        icon: "clock"
      },
      {
        title: "Transparent Process",
        text: "We believe you deserve to know how your clothes are made. From sourcing to shipping, we maintain full visibility into our supply chain and share that journey with you.",
        icon: "eye"
      }
    ]
  },
  contact: {
    title: "Get in Touch",
    subtitle: "We'd love to hear from you. Whether you have a question about our products, need styling advice, or just want to say hello, our team is here to help.",
    form: {
      name: "Your Name",
      email: "Email Address",
      subject: "Subject",
      message: "Your Message",
      button: "Send Message"
    }
  }
}

// FAQ
export const faqs = [
  {
    question: "What is your return policy?",
    answer: "We offer a 30-day return policy for all unworn items in their original condition with tags attached. Returns are free for all domestic orders. Simply initiate a return through your account or contact our customer service team."
  },
  {
    question: "How do I find my size?",
    answer: "Each product page includes detailed measurements and a size guide. We recommend measuring a garment you already own and love, then comparing those measurements to our size chart. Our customer service team is also happy to provide personalized sizing advice."
  },
  {
    question: "Where do you ship?",
    answer: "We ship worldwide. Domestic orders typically arrive within 3-5 business days, while international orders may take 7-14 business days depending on the destination. All orders over $200 qualify for free shipping."
  },
  {
    question: "Are your products sustainably made?",
    answer: "Sustainability is at the core of everything we do. We use organic and recycled materials wherever possible, work with certified ethical manufacturers, and continuously seek ways to reduce our environmental footprint. Each product page includes information about the materials and production methods used."
  },
  {
    question: "How should I care for my DXLR garments?",
    answer: "Each garment comes with specific care instructions on the label and product page. Generally, we recommend washing less frequently, using cold water, and air drying when possible. This not only extends the life of your garments but also reduces environmental impact."
  },
  {
    question: "Do you offer gift wrapping?",
    answer: "Yes! We offer complimentary gift wrapping on all orders. Simply select the gift wrapping option at checkout and include a personalized message. Your items will arrive beautifully presented in our signature packaging."
  }
]

// Helper functions
export function getProductById(id: string): Product | undefined {
  return products.find(p => p.id === id)
}

export function getProductsByCategory(categorySlug: string): Product[] {
  return products.filter(p => p.categorySlug === categorySlug)
}

export function getFeaturedProducts(): Product[] {
  return products.filter(p => p.featured)
}

export function getNewProducts(): Product[] {
  return products.filter(p => p.new)
}

export function getSaleProducts(): Product[] {
  return products.filter(p => p.sale)
}

export function formatPrice(price: number): string {
  return `${siteConfig.currencySymbol}${price}`
}
