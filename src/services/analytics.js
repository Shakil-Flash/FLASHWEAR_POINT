/**
 * FLASHWEAR FRONTEND ARCHITECTURE — ANALYTICS SERVICE
 * Decoupled telemetry and event tracking contract for future e-commerce metrics.
 */

export const analytics = {
  /**
   * Track high-velocity interaction events.
   * @param {string} eventName
   * @param {Object} payload
   */
  track(eventName, payload = {}) {
    const eventRecord = {
      event: eventName,
      timestamp: new Date().toISOString(),
      payload
    };

    // In local development / test mode, log to console
    if (typeof window !== 'undefined' && window.location.hostname === 'localhost') {
      console.debug('[Analytics]', eventRecord);
    }
  },

  trackProductView(productId, metadata = {}) {
    this.track('product_viewed', { productId, ...metadata });
  },

  trackAddToCart(productId, price, quantity = 1) {
    this.track('add_to_cart', { productId, price, quantity });
  },

  trackSearch(query, resultCount) {
    this.track('search_executed', { query, resultCount });
  }
};
