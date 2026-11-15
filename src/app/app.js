/**
 * FLASHWEAR FRONTEND ARCHITECTURE — APPLICATION BOOTSTRAPPER
 * Orchestrates application lifecycle, event listening, and layout initialization.
 */

import { appConfig } from './config.js';
import { store } from '../state/store.js';
import { eventBus } from '../utils/events.js';
import { EVENTS } from '../utils/constants.js';
import { LayoutShell } from '../components/layout/layout-shell.js';
import { sectionRegistry } from '../components/sections/section-registry.js';

export class FlashwearApp {
  constructor() {
    this.config = appConfig;
    this.store = store;
    this.eventBus = eventBus;
    this.layout = null;
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

    // Initialize Layout Scaffold
    this.layout = new LayoutShell(root);
    this.layout.renderScaffold();

    // Attach global listeners
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
