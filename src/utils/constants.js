/**
 * FLASHWEAR FRONTEND ARCHITECTURE — CONSTANTS
 * Creative Direction: LIGHTNING STRIKE
 */

export const STORAGE_KEYS = {
  CART: 'flashwear_cart_v1',
  WISHLIST: 'flashwear_wishlist_v1',
  RECENTLY_VIEWED: 'flashwear_recent_v1',
  CURRENCY: 'flashwear_currency_pref',
  THEME: 'flashwear_theme_mode'
};

export const BREAKPOINTS = {
  SM: 640,
  MD: 768,
  LG: 1024,
  XL: 1280,
  XXL: 1440
};

export const CURRENCIES = {
  USD: { symbol: '$', code: 'USD', rate: 1.0 },
  EUR: { symbol: '€', code: 'EUR', rate: 0.92 },
  GBP: { symbol: '£', code: 'GBP', rate: 0.79 },
  JPY: { symbol: '¥', code: 'JPY', rate: 155.0 }
};

export const EVENTS = {
  CART_UPDATED: 'flashwear:cart_updated',
  CART_DRAWER_TOGGLED: 'flashwear:cart_drawer_toggled',
  WISHLIST_UPDATED: 'flashwear:wishlist_updated',
  SEARCH_QUERY_CHANGED: 'flashwear:search_query_changed',
  QUICK_VIEW_REQUESTED: 'flashwear:quick_view_requested',
  NOTIFICATION_EMITTED: 'flashwear:notification_emitted'
};

export const BRAND_DEFAULTS = {
  NAME: 'FLASHWEAR',
  EDITION: 'EDITION 01 // AUTUMN 2026',
  COORDINATES: '35.6762° N, 139.6503° E',
  STATUS: 'IGNITED'
};
