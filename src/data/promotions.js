/**
 * FLASHWEAR DATA ARCHITECTURE — PROMOTIONAL & LOOKBOOK DATA
 * Creative Direction: LIGHTNING STRIKE
 */

export const promotions = [
  {
    id: 'promo_edition_dispatch',
    type: 'banner',
    title: 'COMPLIMENTARY WORLDWIDE EXPRESS DISPATCH',
    threshold: 300,
    currency: 'USD',
    badge: 'GLOBAL STRIKE',
    description: 'All archival allocation orders over $300 qualify for priority courier transit with signature authentication.'
  }
];

export const lookbooks = [
  {
    id: 'look_01',
    lookNumber: 'LOOK 01 / 08',
    title: 'Velocity Silhouette in Obsidian',
    caption: 'Heavyweight fleece paired with articulated modular ripstop trousers. Hard directional rim light.',
    image: '/public/assets/images/lookbook/look-01.jpg',
    featuredProductIds: ['fw_prod_001', 'fw_prod_004']
  },
  {
    id: 'look_02',
    lookNumber: 'LOOK 02 / 08',
    title: 'Kinetic Storm Outer Shell',
    caption: '3-layer membrane waterproof nylon in Flash Red and Deep Crimson. Motion strobe technique.',
    image: '/public/assets/images/lookbook/look-02.jpg',
    featuredProductIds: ['fw_prod_002', 'fw_prod_003']
  }
];
