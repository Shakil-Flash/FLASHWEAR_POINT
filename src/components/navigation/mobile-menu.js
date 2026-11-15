/**
 * FLASHWEAR COMPONENT — MOBILE NAVIGATION DRAWER
 * Creative Direction: LIGHTNING STRIKE
 * 
 * Accessible, full-height slide-over drawer for mobile/tablet viewports.
 * Manages body scroll-lock, focus trapping, Escape dismissal, and navigation links.
 */

import { ICONS } from './icons.js';
import { escapeHTML, trapFocus } from '../../utils/dom.js';
import { store } from '../../state/store.js';
import { eventBus } from '../../utils/events.js';
import { EVENTS } from '../../utils/constants.js';

export class MobileMenu {
  constructor(options = {}) {
    this.menuItems = options.menuItems || [];
    this.brand = options.brand || {};
    this.container = null;
    this.isOpen = false;
    this.cleanupFocusTrap = null;
    this.previousFocusedElement = null;
    this.unsubscribers = [];
  }

  mount(targetParent = document.body) {
    if (!targetParent) return;

    this.container = document.createElement('div');
    this.container.id = 'fw-mobile-menu-drawer';
    this.container.className = 'fw-mobile-drawer';
    this.container.setAttribute('role', 'dialog');
    this.container.setAttribute('aria-modal', 'true');
    this.container.setAttribute('aria-label', 'Mobile Navigation');
    this.container.setAttribute('aria-hidden', 'true');

    this._render();
    targetParent.appendChild(this.container);

    this._setupEvents();
    this._setupReactivity();
  }

  _render() {
    const wishlistCount = store.getWishlistCount();
    const cartCount = store.getCartCount();

    const linksHTML = this.menuItems
      .map((item, idx) => {
        const badgeHTML = item.badge
          ? `<span class="mobile-nav-badge">${escapeHTML(item.badge)}</span>`
          : '';
        return `
          <li class="mobile-nav-item">
            <a href="${escapeHTML(item.href)}" class="mobile-nav-link" data-mobile-id="${escapeHTML(item.id)}">
              <span class="mobile-nav-label">${escapeHTML(item.label)}</span>
              ${badgeHTML}
              <span class="mobile-nav-arrow" aria-hidden="true">${ICONS.arrowRight}</span>
            </a>
          </li>
        `;
      })
      .join('');

    this.container.innerHTML = `
      <div class="mobile-drawer-backdrop" aria-hidden="true"></div>
      <div class="mobile-drawer-panel">
        <!-- Drawer Header -->
        <div class="mobile-drawer-header">
          <a href="/" class="mobile-drawer-brand" aria-label="FLASHWEAR Home">
            <img src="${escapeHTML(this.brand.logoDark || '/public/assets/brand/flashwear-wordmark-dark.svg')}" alt="FLASHWEAR" height="22">
          </a>
          <button type="button" class="mobile-drawer-close" aria-label="Close navigation menu">
            ${ICONS.close}
          </button>
        </div>

        <!-- Navigation Menu -->
        <nav class="mobile-drawer-nav" aria-label="Mobile Menu">
          <ul class="mobile-nav-list">
            ${linksHTML}
          </ul>
        </nav>

        <!-- Quick Access Actions -->
        <div class="mobile-drawer-actions">
          <button type="button" class="mobile-action-card mobile-search-trigger">
            <span class="mobile-action-icon">${ICONS.search}</span>
            <span class="mobile-action-text">Search Archive</span>
          </button>

          <a href="#wishlist" class="mobile-action-card mobile-wishlist-trigger">
            <span class="mobile-action-icon">${ICONS.heart}</span>
            <span class="mobile-action-text">Wishlist</span>
            <span class="mobile-action-count wishlist-count-badge">${wishlistCount}</span>
          </a>

          <button type="button" class="mobile-action-card mobile-cart-trigger">
            <span class="mobile-action-icon">${ICONS.bag}</span>
            <span class="mobile-action-text">Shopping Bag</span>
            <span class="mobile-action-count cart-count-badge">${cartCount}</span>
          </button>
        </div>

        <!-- Archival Status Footer -->
        <div class="mobile-drawer-footer">
          <div class="badge badge-strike">
            <span class="pulse-dot"></span>LIGHTNING STRIKE // LIVE
          </div>
          <div class="mobile-footer-coords">[COORD: 35.6762° N, 139.6503° E]</div>
        </div>
      </div>
    `;
  }

  _setupEvents() {
    if (!this.container) return;

    // Close button
    const closeBtn = this.container.querySelector('.mobile-drawer-close');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => this.close());
    }

    // Backdrop click
    const backdrop = this.container.querySelector('.mobile-drawer-backdrop');
    if (backdrop) {
      backdrop.addEventListener('click', () => this.close());
    }

    // Link clicks -> close drawer
    const links = this.container.querySelectorAll('.mobile-nav-link');
    links.forEach((link) => {
      link.addEventListener('click', () => this.close());
    });

    // Cart trigger in mobile drawer
    const cartTrigger = this.container.querySelector('.mobile-cart-trigger');
    if (cartTrigger) {
      cartTrigger.addEventListener('click', () => {
        this.close();
        store.toggleCartDrawer(true);
      });
    }

    // Keyboard listener: Escape key
    this._handleKeyDown = (e) => {
      if (e.key === 'Escape' && this.isOpen) {
        this.close();
      }
    };
    window.addEventListener('keydown', this._handleKeyDown);
  }

  _setupReactivity() {
    const unsubCart = eventBus.on(EVENTS.CART_UPDATED, ({ count }) => {
      if (!this.container) return;
      const badge = this.container.querySelector('.cart-count-badge');
      if (badge) badge.textContent = count;
    });

    const unsubWishlist = eventBus.on(EVENTS.WISHLIST_UPDATED, ({ count }) => {
      if (!this.container) return;
      const badge = this.container.querySelector('.wishlist-count-badge');
      if (badge) badge.textContent = count;
    });

    this.unsubscribers.push(unsubCart, unsubWishlist);
  }

  open() {
    if (!this.container || this.isOpen) return;

    this.previousFocusedElement = document.activeElement;
    this.isOpen = true;

    this.container.classList.add('is-open');
    this.container.setAttribute('aria-hidden', 'false');
    document.body.classList.add('fw-mobile-menu-open');

    // Update toggle button aria-expanded in header
    const toggleBtn = document.querySelector('.nav-mobile-toggle');
    if (toggleBtn) {
      toggleBtn.setAttribute('aria-expanded', 'true');
    }

    // Trap focus inside panel
    const panel = this.container.querySelector('.mobile-drawer-panel');
    this.cleanupFocusTrap = trapFocus(panel);

    eventBus.emit(EVENTS.MOBILE_MENU_TOGGLED, { isOpen: true });
  }

  close() {
    if (!this.container || !this.isOpen) return;

    this.isOpen = false;
    this.container.classList.remove('is-open');
    this.container.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('fw-mobile-menu-open');

    const toggleBtn = document.querySelector('.nav-mobile-toggle');
    if (toggleBtn) {
      toggleBtn.setAttribute('aria-expanded', 'false');
    }

    if (this.cleanupFocusTrap) {
      this.cleanupFocusTrap();
      this.cleanupFocusTrap = null;
    }

    // Restore focus
    if (this.previousFocusedElement && typeof this.previousFocusedElement.focus === 'function') {
      this.previousFocusedElement.focus();
    }

    eventBus.emit(EVENTS.MOBILE_MENU_TOGGLED, { isOpen: false });
  }

  destroy() {
    if (this._handleKeyDown) {
      window.removeEventListener('keydown', this._handleKeyDown);
    }
    this.unsubscribers.forEach((unsub) => unsub());
    this.unsubscribers = [];
    if (this.container && this.container.parentElement) {
      this.container.parentElement.removeChild(this.container);
    }
  }
}
