/**
 * FLASHWEAR DATA ARCHITECTURE — NAVIGATION CONFIGURATION
 * Creative Direction: LIGHTNING STRIKE
 */

export const navigationConfig = {
  header: {
    brand: {
      name: 'FLASHWEAR',
      logoDark: '/public/assets/brand/flashwear-wordmark-dark.svg',
      logoRed: '/public/assets/brand/flashwear-wordmark-red.svg',
      monogram: '/public/assets/brand/flashwear-monogram-kinetic.svg',
      homeUrl: '/'
    },
    // Required Center Navigation Items
    menuItems: [
      { id: 'nav_shop', label: 'Shop', href: '#shop' },
      { id: 'nav_new_arrivals', label: 'New Arrivals', href: '#new-arrivals', badge: 'NEW' },
      { id: 'nav_collections', label: 'Collections', href: '#collections' },
      { id: 'nav_best_sellers', label: 'Best Sellers', href: '#best-sellers' },
      { id: 'nav_lookbook', label: 'Lookbook', href: '#lookbook' }
    ],
    statusPill: {
      text: 'LIGHTNING STRIKE // LIVE',
      type: 'strike'
    },
    actions: [
      { id: 'act_search', label: 'Search', icon: 'search', ariaLabel: 'Open search' },
      { id: 'act_wishlist', label: 'Wishlist', icon: 'heart', ariaLabel: 'View wishlist', badgeKey: 'wishlistCount' },
      { id: 'act_cart', label: 'Shopping Bag', icon: 'bag', ariaLabel: 'Open shopping bag', badgeKey: 'cartCount' }
    ]
  },
  announcement: {
    enabled: true,
    rotationIntervalMs: 6000,
    messages: [
      {
        id: 'msg_edition_live',
        tag: 'STRIKE ALERT',
        text: 'EDITION 01 ALLOCATION IS LIVE // COMPLIMENTARY WORLDWIDE EXPRESS DISPATCH OVER $300',
        link: '#shop'
      },
      {
        id: 'msg_shipping',
        tag: 'DISPATCH',
        text: 'COMPLIMENTARY WORLDWIDE EXPRESS DISPATCH ON ORDERS OVER $300',
        link: '#shipping'
      },
      {
        id: 'msg_fleece_capsule',
        tag: 'EDITION 01',
        text: 'HIGH VELOCITY 480GSM ARCHITECTURAL FLEECE // LIMITED PRODUCTION RUN',
        link: '#collections'
      }
    ]
  },
  footer: {
    brandStatement: 'Architectural streetwear engineered at high velocity. Deep crimson shadows, flash red precision, and electric golden-yellow sparks.',
    links: [
      {
        title: 'Archival Catalog',
        items: [
          { label: 'Edition 01: Lightning Strike', href: '#edition-01' },
          { label: 'Crimson Monolith Capsule', href: '#capsule-crimson' },
          { label: 'All Garments', href: '#catalog' }
        ]
      },
      {
        title: 'Client Concierge',
        items: [
          { label: 'Dispatch & Express Transit', href: '#shipping' },
          { label: 'Archival Returns & Exchanges', href: '#returns' },
          { label: 'Garment Care & Density Matrix', href: '#care' }
        ]
      },
      {
        title: 'Legal & Intellectual Property',
        items: [
          { label: 'Terms of Allocation', href: '#terms' },
          { label: 'Privacy & Data Vault', href: '#privacy' },
          { label: 'Brand Compliance', href: '#compliance' }
        ]
      }
    ],
    copyright: '© 2026 FLASHWEAR. ALL RIGHTS RESERVED. FORM AT THE SPEED OF LIGHT.'
  }
};
