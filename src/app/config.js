/**
 * FLASHWEAR FRONTEND ARCHITECTURE — APP CONFIGURATION
 * Centralized application configuration, environment settings & feature flags.
 */

export const appConfig = {
  appName: 'FLASHWEAR',
  brandDirection: 'LIGHTNING STRIKE',
  version: '1.0.0',
  phase: '03',
  features: {
    cartDrawer: true,
    wishlist: true,
    quickView: true,
    currencySelector: true,
    recentlyViewed: true,
    reducedMotionAudit: true
  },
  defaults: {
    currency: 'USD',
    locale: 'en-US',
    itemsPerPage: 12
  },
  endpoints: {
    // Local / static paths for mock assets
    brandAssets: '/public/assets/brand/',
    productImages: '/public/assets/images/products/',
    campaignImages: '/public/assets/images/campaigns/'
  }
};
