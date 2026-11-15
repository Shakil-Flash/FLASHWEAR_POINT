/**
 * FLASHWEAR FRONTEND ARCHITECTURE — STATE STORE
 * Reactive, event-driven client store with persistent local storage
 * and EventBus pub-sub synchronization for all interactive homepage features.
 */

import { storage } from '../utils/storage.js';
import { eventBus } from '../utils/events.js';
import { STORAGE_KEYS, EVENTS } from '../utils/constants.js';

class StateStore {
  constructor() {
    this.cartItems = storage.get(STORAGE_KEYS.CART, []);
    this.wishlistIds = new Set(storage.get(STORAGE_KEYS.WISHLIST, []));
    this.recentIds = storage.get(STORAGE_KEYS.RECENTLY_VIEWED, []);
    this.isCartDrawerOpen = false;
    this.activeQuickView = null;
    this.searchQuery = '';
    this.currency = storage.get(STORAGE_KEYS.CURRENCY, 'USD');
  }

  /* ==========================================================================
     1. CART MANAGEMENT
     ========================================================================== */
  
  /**
   * Add a product variant to the cart.
   * @param {Object} product
   * @param {string} size
   * @param {string} color
   * @param {number} quantity
   */
  addToCart(product, size = 'M', color = 'Obsidian Black', quantity = 1) {
    if (!product || !product.id) return;

    const existingIndex = this.cartItems.findIndex(
      (item) => item.id === product.id && item.size === size && item.color === color
    );

    if (existingIndex > -1) {
      this.cartItems[existingIndex].quantity += quantity;
    } else {
      this.cartItems.push({
        id: product.id,
        name: product.name,
        slug: product.slug,
        price: product.price,
        image: product.images?.primary || '',
        sku: product.sku,
        size,
        color,
        quantity
      });
    }

    this._saveCart();
    eventBus.emit(EVENTS.CART_UPDATED, this.getCartState());
  }

  /**
   * Remove an item from the cart by index.
   * @param {number} index
   */
  removeFromCart(index) {
    if (index >= 0 && index < this.cartItems.length) {
      this.cartItems.splice(index, 1);
      this._saveCart();
      eventBus.emit(EVENTS.CART_UPDATED, this.getCartState());
    }
  }

  /**
   * Update quantity of an item in the cart.
   * @param {number} index
   * @param {number} quantity
   */
  updateCartQuantity(index, quantity) {
    if (index >= 0 && index < this.cartItems.length) {
      if (quantity <= 0) {
        this.removeFromCart(index);
      } else {
        this.cartItems[index].quantity = quantity;
        this._saveCart();
        eventBus.emit(EVENTS.CART_UPDATED, this.getCartState());
      }
    }
  }

  /**
   * Toggle or set cart drawer visibility.
   * @param {boolean} [forceState]
   */
  toggleCartDrawer(forceState) {
    this.isCartDrawerOpen = typeof forceState === 'boolean' ? forceState : !this.isCartDrawerOpen;
    eventBus.emit(EVENTS.CART_DRAWER_TOGGLED, { isOpen: this.isCartDrawerOpen });
  }

  getCartCount() {
    return this.cartItems.reduce((acc, item) => acc + item.quantity, 0);
  }

  getCartSubtotal() {
    return this.cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  }

  getCartState() {
    return {
      items: [...this.cartItems],
      count: this.getCartCount(),
      subtotal: this.getCartSubtotal(),
      isOpen: this.isCartDrawerOpen
    };
  }

  _saveCart() {
    storage.set(STORAGE_KEYS.CART, this.cartItems);
  }

  /* ==========================================================================
     2. WISHLIST MANAGEMENT
     ========================================================================== */

  /**
   * Toggle a product ID in or out of the wishlist.
   * @param {string} productId
   * @returns {boolean} isWishlisted
   */
  toggleWishlist(productId) {
    if (!productId) return false;
    let isWishlisted;

    if (this.wishlistIds.has(productId)) {
      this.wishlistIds.delete(productId);
      isWishlisted = false;
    } else {
      this.wishlistIds.add(productId);
      isWishlisted = true;
    }

    this._saveWishlist();
    eventBus.emit(EVENTS.WISHLIST_UPDATED, {
      productId,
      isWishlisted,
      count: this.wishlistIds.size
    });

    return isWishlisted;
  }

  isInWishlist(productId) {
    return this.wishlistIds.has(productId);
  }

  getWishlistCount() {
    return this.wishlistIds.size;
  }

  _saveWishlist() {
    storage.set(STORAGE_KEYS.WISHLIST, Array.from(this.wishlistIds));
  }

  /* ==========================================================================
     3. RECENTLY VIEWED PRODUCTS
     ========================================================================== */

  trackRecentlyViewed(productId) {
    if (!productId) return;
    this.recentIds = this.recentIds.filter((id) => id !== productId);
    this.recentIds.unshift(productId);
    if (this.recentIds.length > 8) {
      this.recentIds.pop();
    }
    storage.set(STORAGE_KEYS.RECENTLY_VIEWED, this.recentIds);
  }

  getRecentlyViewedIds() {
    return [...this.recentIds];
  }

  /* ==========================================================================
     4. SEARCH & QUICK VIEW
     ========================================================================== */

  setSearchQuery(query) {
    this.searchQuery = String(query).trim();
    eventBus.emit(EVENTS.SEARCH_QUERY_CHANGED, { query: this.searchQuery });
  }

  openQuickView(product) {
    this.activeQuickView = product;
    eventBus.emit(EVENTS.QUICK_VIEW_REQUESTED, { product });
  }

  closeQuickView() {
    this.activeQuickView = null;
    eventBus.emit(EVENTS.QUICK_VIEW_REQUESTED, { product: null });
  }
}

export const store = new StateStore();
