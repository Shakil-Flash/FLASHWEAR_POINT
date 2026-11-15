/**
 * FLASHWEAR FRONTEND ARCHITECTURE — PRIMARY MODULE EXPORTS
 * Creative Direction: LIGHTNING STRIKE
 */

// Application
export { app, FlashwearApp } from './app/app.js';
export { appConfig } from './app/config.js';

// State Management
export { store } from './state/store.js';

// Data Architecture
export * as data from './data/index.js';

// UI Components
export { createButtonMarkup } from './components/ui/button.js';
export { createBadgeMarkup } from './components/ui/badge.js';
export { LayoutShell } from './components/layout/layout-shell.js';
export { sectionRegistry, SectionRegistry } from './components/sections/section-registry.js';
export { AnnouncementBar, MainNavigation, MobileMenu, ICONS } from './components/navigation/index.js';

// Utilities
export * as formatters from './utils/formatters.js';
export { storage } from './utils/storage.js';
export { eventBus } from './utils/events.js';
export * as dom from './utils/dom.js';
export * as constants from './utils/constants.js';

// Services
export { analytics } from './services/analytics.js';
