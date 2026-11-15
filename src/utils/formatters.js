/**
 * FLASHWEAR FRONTEND ARCHITECTURE — FORMATTING HELPERS
 * Standardized data formatting adhering to Lightning Strike luxury editorial style.
 */

import { CURRENCIES } from './constants.js';

/**
 * Format raw number into standardized currency display.
 * @param {number} amount
 * @param {string} currencyCode
 * @returns {string} e.g. "$240.00" or "€220.00"
 */
export function formatPrice(amount, currencyCode = 'USD') {
  const config = CURRENCIES[currencyCode] || CURRENCIES.USD;
  const converted = amount * config.rate;
  
  // Format JPY as integer without decimals, others with 2 decimals
  if (currencyCode === 'JPY') {
    return `${config.symbol}${Math.round(converted).toLocaleString()}`;
  }

  return `${config.symbol}${converted.toFixed(2)}`;
}

/**
 * Calculate markdown reduction percentage between original and discounted price.
 * @param {number} originalPrice
 * @param {number} currentPrice
 * @returns {number} percentage rounded e.g. 25 for 25% off
 */
export function calculateDiscount(originalPrice, currentPrice) {
  if (!originalPrice || !currentPrice || originalPrice <= currentPrice) return 0;
  return Math.round(((originalPrice - currentPrice) / originalPrice) * 100);
}

/**
 * Standardized Archival date display format.
 * @param {Date|string} date
 * @returns {string} e.g. "2026.11.15"
 */
export function formatArchivalDate(date) {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}.${month}.${day}`;
}

/**
 * Safely truncate long descriptions without breaking words.
 * @param {string} text
 * @param {number} limit
 * @returns {string}
 */
export function truncate(text, limit = 120) {
  if (!text || text.length <= limit) return text;
  return text.substring(0, text.lastIndexOf(' ', limit)) + '...';
}

/**
 * Generate a clean URL-safe slug from a product title.
 * @param {string} title
 * @returns {string}
 */
export function slugify(title) {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}
