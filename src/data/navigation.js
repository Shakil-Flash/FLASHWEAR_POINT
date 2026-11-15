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
    menuItems: [
      { id: 'nav_editions', label: 'Editions', href: '#editions', badge: 'NEW' },
      { id: 'nav_outerwear', label: 'Outerwear', href: '#outerwear' },
      { id: 'nav_hoodies', label: 'Hoodies', href: '#hoodies' },
      { id: 'nav_archive', label: 'Archive', href: '#archive' },
      { id: 'nav_lookbook', label: 'Lookbook', href: '#lookbook' }
    ],
    statusPill: {
      text: 'LIGHTNING STRIKE // LIVE',
      type: 'strike'
    },
    actions: [
      { id: 'act_search', label: 'Search', icon: 'search' },
      { id: 'act_wishlist', label: 'Wishlist', icon: 'heart', badgeKey: 'wishlistCount' },
      { id: 'act_cart', label: 'Bag', icon: 'bag', badgeKey: 'cartCount' }
    ]
  },
  announcement: {
    enabled: true,
    message: 'EDITION 01 ALLOCATION IS LIVE // COMPLIMENTARY WORLDWIDE EXPRESS DISPATCH OVER $300',
    tag: 'STRIKE ALERT'
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
