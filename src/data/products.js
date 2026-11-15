/**
 * FLASHWEAR DATA ARCHITECTURE — PRODUCT CATALOG
 * Creative Direction: LIGHTNING STRIKE
 * Normalized product schemas for homepage curation, grids, and quick view.
 */

export const products = [
  {
    id: 'fw_prod_001',
    sku: 'FW-STRIKE-HD01',
    name: 'Velocity Heavyweight Fleece Hoodie',
    slug: 'velocity-heavyweight-fleece-hoodie',
    category: 'cat_hoodies',
    collectionId: 'col_edition_01',
    price: 240,
    compareAtPrice: null,
    currency: 'USD',
    badge: 'LIVE DROP',
    badgeType: 'strike',
    specifications: {
      fabric: '100% Organic Double-Face Cotton',
      weight: '480 GSM',
      cut: 'Boxy Silhouette with Dropped Shoulders',
      origin: 'Crafted in Tokyo Workshop'
    },
    colorways: [
      { name: 'Obsidian Black', hex: '#09090B', available: true },
      { name: 'Flash Red', hex: '#C41420', available: true },
      { name: 'Deep Crimson', hex: '#650B12', available: false }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    inventory: 14,
    rating: 4.9,
    reviewCount: 38,
    isFeatured: true,
    isNew: true,
    images: {
      primary: '/public/assets/images/products/velocity-hoodie-black-front.jpg',
      secondary: '/public/assets/images/products/velocity-hoodie-black-back.jpg',
      detail: '/public/assets/images/products/velocity-hoodie-detail-stitch.jpg'
    },
    description: 'Engineered for high velocity. The signature FLASHWEAR hoodie features dense 480GSM double-face fleece, an architectural double-lined hood, and subtle flash-red internal reinforcement taping.'
  },
  {
    id: 'fw_prod_002',
    sku: 'FW-STRIKE-JK02',
    name: 'Kinetic Storm Technical Shell',
    slug: 'kinetic-storm-technical-shell',
    category: 'cat_outerwear',
    collectionId: 'col_edition_01',
    price: 480,
    compareAtPrice: 540,
    currency: 'USD',
    badge: 'ARCHIVE ACCESS',
    badgeType: 'amber',
    specifications: {
      fabric: '3-Layer Membrane Technical Nylon',
      weight: '320 GSM',
      cut: 'Articulated Storm Fit',
      waterproof: '20,000mm Hydrostatic Head'
    },
    colorways: [
      { name: 'Obsidian / Crimson', hex: '#09090B', available: true },
      { name: 'Pure Flash Red', hex: '#C41420', available: true }
    ],
    sizes: ['M', 'L', 'XL'],
    inventory: 6,
    rating: 5.0,
    reviewCount: 22,
    isFeatured: true,
    isNew: false,
    images: {
      primary: '/public/assets/images/products/kinetic-shell-crimson-front.jpg',
      secondary: '/public/assets/images/products/kinetic-shell-crimson-angle.jpg',
      detail: '/public/assets/images/products/kinetic-shell-zipper-macro.jpg'
    },
    description: 'Monolithic protective outerwear constructed from ultra-dense 3-layer membrane nylon. Features directional speed-seams taped in deep crimson with an internal storm collar.'
  },
  {
    id: 'fw_prod_003',
    sku: 'FW-STRIKE-TS03',
    name: 'Architectural Boxy Heavyweight Tee',
    slug: 'architectural-boxy-heavyweight-tee',
    category: 'cat_tees',
    collectionId: 'col_edition_01',
    price: 110,
    compareAtPrice: null,
    currency: 'USD',
    badge: 'EDITION 01',
    badgeType: 'edition',
    specifications: {
      fabric: '100% Combed Heavy Jersey',
      weight: '300 GSM',
      cut: 'Boxy Drop-Shoulder Relaxed Silhouette',
      collar: 'Dense 1.25-inch Ribbed Mock Collar'
    },
    colorways: [
      { name: 'Cloud White', hex: '#F5F5F5', available: true },
      { name: 'Obsidian Black', hex: '#09090B', available: true },
      { name: 'Flash Red', hex: '#C41420', available: true }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    inventory: 28,
    rating: 4.8,
    reviewCount: 64,
    isFeatured: true,
    isNew: true,
    images: {
      primary: '/public/assets/images/products/boxy-tee-white-front.jpg',
      secondary: '/public/assets/images/products/boxy-tee-white-back.jpg',
      detail: '/public/assets/images/products/boxy-tee-collar-detail.jpg'
    },
    description: 'Clean architectural cut in heavy 300GSM combed cotton jersey. Cut with wide elbow-grazing sleeves and structured shoulders that maintain a crisp monolithic shape.'
  },
  {
    id: 'fw_prod_004',
    sku: 'FW-STRIKE-TR04',
    name: 'Articulated Modular Cargo Pant',
    slug: 'articulated-modular-cargo-pant',
    category: 'cat_trousers',
    collectionId: 'col_edition_01',
    price: 320,
    compareAtPrice: null,
    currency: 'USD',
    badge: 'LIMITED ALLOCATION',
    badgeType: 'amber',
    specifications: {
      fabric: 'Treated Water-Repellent Cotton-Nylon Ripstop',
      weight: '280 GSM',
      cut: 'Tapered Articulated Leg with Bungee Cuffs',
      hardware: 'Matte Black Anodized Pulls'
    },
    colorways: [
      { name: 'Obsidian Black', hex: '#09090B', available: true },
      { name: 'Deep Crimson', hex: '#650B12', available: true }
    ],
    sizes: ['30', '32', '34', '36'],
    inventory: 9,
    rating: 4.9,
    reviewCount: 19,
    isFeatured: true,
    isNew: true,
    images: {
      primary: '/public/assets/images/products/cargo-pant-black-front.jpg',
      secondary: '/public/assets/images/products/cargo-pant-black-side.jpg',
      detail: '/public/assets/images/products/cargo-pant-pocket-hardware.jpg'
    },
    description: 'Utilitarian precision meets luxury drape. Features 6 low-profile geometric cargo compartments, internal knee articulation darts, and adjustable shock-cord ankle cuffs.'
  }
];
