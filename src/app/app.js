/**
 * FLASHWEAR FRONTEND ARCHITECTURE — APPLICATION BOOTSTRAPPER
 * Creative Direction: LIGHTNING STRIKE
 * Orchestrates application lifecycle, layout initialization, announcement bar,
 * main navigation, and event listening.
 */

import { appConfig } from './config.js';
import { store } from '../state/store.js';
import { eventBus } from '../utils/events.js';
import { EVENTS } from '../utils/constants.js';
import { LayoutShell } from '../components/layout/layout-shell.js';
import { sectionRegistry } from '../components/sections/section-registry.js';
import { AnnouncementBar } from '../components/navigation/announcement-bar.js';
import { MainNavigation } from '../components/navigation/main-navigation.js';

export class FlashwearApp {
  constructor() {
    this.config = appConfig;
    this.store = store;
    this.eventBus = eventBus;
    this.layout = null;
    this.announcementBar = null;
    this.mainNavigation = null;
    this.isInitialized = false;
  }

  /**
   * Bootstrap the application.
   * @param {HTMLElement|string} rootElement - DOM node or selector
   */
  async init(rootElement = '#app') {
    if (this.isInitialized) return this;

    const root = typeof rootElement === 'string' ? document.querySelector(rootElement) : rootElement;
    if (!root) {
      console.warn(`[FlashwearApp] Root container "${rootElement}" not found. Running in headless / test mode.`);
      this.isInitialized = true;
      return this;
    }

    // 1. Initialize Layout Scaffold
    this.layout = new LayoutShell(root);
    this.layout.renderScaffold();

    // 2. Initialize Announcement Bar
    this.announcementBar = new AnnouncementBar();
    this.announcementBar.mount(this.layout.getSlot('announcement'));

    // 3. Initialize Main Navigation (Desktop & Mobile)
    this.mainNavigation = new MainNavigation();
    this.mainNavigation.mount(this.layout.getSlot('header'));

    // 4. Attach global listeners
    this._setupGlobalListeners();

    this.isInitialized = true;
    console.log(`[FlashwearApp] Initialized ${this.config.appName} // Direction: ${this.config.brandDirection}`);

    return this;
  }

  /**
   * Mount all registered sections to the main content slot.
   */
  mountSections() {
    if (!this.layout) return;
    const contentSlot = this.layout.getSlot('content');
    if (contentSlot) {
      sectionRegistry.mountAll(contentSlot);
    }
  }

  _setupGlobalListeners() {
    // Listen for cart drawer toggles
    this.eventBus.on(EVENTS.CART_DRAWER_TOGGLED, ({ isOpen }) => {
      document.body.classList.toggle('fw-drawer-open', isOpen);
    });

    // Announce system initialization
    this.eventBus.emit(EVENTS.NOTIFICATION_EMITTED, {
      type: 'system',
      message: `${this.config.appName} Initialized`
    });
  }
}

export const app = new FlashwearApp();
