/**
 * FLASHWEAR COMPONENT — MAIN NAVIGATION HEADER
 * Creative Direction: LIGHTNING STRIKE
 * 
 * Houses the desktop and mobile navigation layouts, brand logo,
 * central menu links, search/wishlist/cart action icons, and sticky scroll handling.
 */

import { navigationConfig } from '../../data/navigation.js';
import { store } from '../../state/store.js';
import { eventBus } from '../../utils/events.js';
import { EVENTS } from '../../utils/constants.js';
import { ICONS } from './icons.js';
import { escapeHTML } from '../../utils/dom.js';
import { MobileMenu } from './mobile-menu.js';

export class MainNavigation {
  constructor(options = {}) {
    this.config = {
      ...navigationConfig.header,
      ...options
    };
    this.container = null;
    this.mobileMenu = null;
    this.unsubscribers = [];
  }

  /**
   * Mount navigation header into the target header slot.
   * @param {HTMLElement} mountSlot
   */
  mount(mountSlot) {
    if (!mountSlot) return;

    this.container = mountSlot;
    this.container.className = 'fw-header-sticky';
    this.container.setAttribute('role', 'banner');

    this._render();
    this._setupReactivity();
    this._setupScrollListener();

    // Initialize Mobile Menu
    this.mobileMenu = new MobileMenu({
      menuItems: this.config.menuItems,
      brand: this.config.brand
    });
    this.mobileMenu.mount(document.body);

    this._setupEvents();
  }

  _render() {
    const { brand, menuItems } = this.config;
    const wishlistCount = store.getWishlistCount();
    const cartCount = store.getCartCount();

    // Render center desktop menu items
    const menuItemsHTML = menuItems
      .map((item) => {
        const badgeHTML = item.badge
          ? `<span class="nav-badge-micro">${escapeHTML(item.badge)}</span>`
          : '';
        return `
          <li class="nav-menu-item">
            <a href="${escapeHTML(item.href)}" class="nav-link" data-nav-id="${escapeHTML(item.id)}">
              <span>${escapeHTML(item.label)}</span>
              ${badgeHTML}
            </a>
          </li>
        `;
      })
      .join('');

    this.container.innerHTML = `
      <div class="fw-header-inner container">
        <!-- 1. Left: Mobile Toggle & Brand Logo -->
        <div class="nav-group-left">
          <button type="button" class="nav-mobile-toggle" aria-expanded="false" aria-controls="fw-mobile-menu-drawer" aria-label="Open navigation menu">
            ${ICONS.menu}
          </button>
          <a href="${escapeHTML(brand.homeUrl || '/')}" class="nav-brand-link" aria-label="FLASHWEAR Homepage">
            <img src="${escapeHTML(brand.logoDark)}" alt="FLASHWEAR" class="nav-brand-logo-desktop" height="24">
            <img src="${escapeHTML(brand.monogram)}" alt="FW" class="nav-brand-monogram-mobile" height="28">
          </a>
        </div>

        <!-- 2. Center: Desktop Navigation Links -->
        <nav class="nav-group-center" aria-label="Main Navigation">
          <ul class="nav-menu-list">
            ${menuItemsHTML}
          </ul>
        </nav>

        <!-- 3. Right: Action Buttons (Search, Wishlist, Bag) -->
        <div class="nav-group-right">
          <!-- Search Action -->
          <button type="button" class="nav-action-btn nav-btn-search" aria-label="Search catalog" title="Search">
            ${ICONS.search}
            <span class="sr-only">Search</span>
          </button>

          <!-- Wishlist Action with Badge -->
          <button type="button" class="nav-action-btn nav-btn-wishlist" aria-label="View wishlist (${wishlistCount} items)" title="Wishlist">
            ${ICONS.heart}
            <span class="nav-action-badge wishlist-badge ${wishlistCount > 0 ? 'is-visible' : ''}" aria-hidden="true">${wishlistCount}</span>
            <span class="sr-only">Wishlist: ${wishlistCount} items</span>
          </button>

          <!-- Shopping Bag Action with Live Cart Badge -->
          <button type="button" class="nav-action-btn nav-btn-cart" aria-label="Shopping bag (${cartCount} items)" title="Shopping Bag">
            ${ICONS.bag}
            <span class="nav-action-badge cart-badge ${cartCount > 0 ? 'is-visible' : ''}" aria-hidden="true">${cartCount}</span>
            <span class="sr-only">Shopping bag: ${cartCount} items</span>
          </button>
        </div>
      </div>
    `;
  }

  _setupEvents() {
    if (!this.container) return;

    // Mobile menu toggle
    const toggleBtn = this.container.querySelector('.nav-mobile-toggle');
    if (toggleBtn) {
      toggleBtn.addEventListener('click', () => {
        if (this.mobileMenu) {
          this.mobileMenu.open();
        }
      });
    }

    // Search button click
    const searchBtn = this.container.querySelector('.nav-btn-search');
    if (searchBtn) {
      searchBtn.addEventListener('click', () => {
        eventBus.emit(EVENTS.SEARCH_QUERY_CHANGED, { action: 'toggle' });
      });
    }

    // Wishlist button click
    const wishlistBtn = this.container.querySelector('.nav-btn-wishlist');
    if (wishlistBtn) {
      wishlistBtn.addEventListener('click', () => {
        // Prepare navigation anchor or trigger
        const count = store.getWishlistCount();
        eventBus.emit(EVENTS.NOTIFICATION_EMITTED, {
          type: 'info',
          message: `Wishlist contains ${count} item${count === 1 ? '' : 's'}`
        });
      });
    }

    // Cart bag button click -> toggles cart drawer
    const cartBtn = this.container.querySelector('.nav-btn-cart');
    if (cartBtn) {
      cartBtn.addEventListener('click', () => {
        store.toggleCartDrawer();
      });
    }

    // Active link highlighting on click
    const navLinks = this.container.querySelectorAll('.nav-link');
    navLinks.forEach((link) => {
      link.addEventListener('click', (e) => {
        navLinks.forEach((l) => l.classList.remove('is-active'));
        link.classList.add('is-active');
      });
    });
  }

  _setupReactivity() {
    // Listen for cart state updates to update cart count badge
    const unsubCart = eventBus.on(EVENTS.CART_UPDATED, ({ count }) => {
      this._updateCartBadge(count);
    });

    // Listen for wishlist updates
    const unsubWishlist = eventBus.on(EVENTS.WISHLIST_UPDATED, ({ count }) => {
      this._updateWishlistBadge(count);
    });

    this.unsubscribers.push(unsubCart, unsubWishlist);
  }

  _updateCartBadge(count) {
    if (!this.container) return;
    const badge = this.container.querySelector('.cart-badge');
    const cartBtn = this.container.querySelector('.nav-btn-cart');
    if (badge) {
      badge.textContent = count;
      badge.classList.toggle('is-visible', count > 0);
    }
    if (cartBtn) {
      cartBtn.setAttribute('aria-label', `Shopping bag (${count} items)`);
    }
  }

  _updateWishlistBadge(count) {
    if (!this.container) return;
    const badge = this.container.querySelector('.wishlist-badge');
    const wishlistBtn = this.container.querySelector('.nav-btn-wishlist');
    if (badge) {
      badge.textContent = count;
      badge.classList.toggle('is-visible', count > 0);
    }
    if (wishlistBtn) {
      wishlistBtn.setAttribute('aria-label', `View wishlist (${count} items)`);
    }
  }

  _setupScrollListener() {
    if (typeof window === 'undefined') return;

    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      if (this.container) {
        this.container.classList.toggle('is-scrolled', isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
  }

  destroy() {
    this.unsubscribers.forEach((unsub) => unsub());
    this.unsubscribers = [];
    if (this.mobileMenu) {
      this.mobileMenu.destroy();
    }
  }
}
