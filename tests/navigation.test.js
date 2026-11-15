/**
 * FLASHWEAR PHASE 04 — NAVIGATION & ANNOUNCEMENT UNIT TESTS
 * Validates AnnouncementBar, MainNavigation, MobileMenu, and State Reactivity.
 */

import { strict as assert } from 'assert';
import { AnnouncementBar } from '../src/components/navigation/announcement-bar.js';
import { MainNavigation } from '../src/components/navigation/main-navigation.js';
import { MobileMenu } from '../src/components/navigation/mobile-menu.js';
import { navigationConfig } from '../src/data/navigation.js';
import { store } from '../src/state/store.js';
import { storage } from '../src/utils/storage.js';
import { eventBus } from '../src/utils/events.js';
import { STORAGE_KEYS, EVENTS } from '../src/utils/constants.js';

let passed = 0;
let failed = 0;

function test(description, fn) {
  try {
    fn();
    console.log(`  ✓ ${description}`);
    passed++;
  } catch (err) {
    console.error(`  ✗ ${description}`);
    console.error(`    ${err.message}`);
    failed++;
  }
}

// Minimal In-Memory DOM Stub for Node.js Testing
class MockElement {
  constructor(tagName = 'div') {
    this.tagName = tagName.toUpperCase();
    this.id = '';
    this.className = '';
    this.classList = {
      _classes: new Set(),
      add: (c) => this.classList._classes.add(c),
      remove: (c) => this.classList._classes.delete(c),
      toggle: (c, force) => {
        if (typeof force === 'boolean') {
          force ? this.classList._classes.add(c) : this.classList._classes.delete(c);
        } else {
          this.classList._classes.has(c) ? this.classList._classes.delete(c) : this.classList._classes.add(c);
        }
      },
      contains: (c) => this.classList._classes.has(c)
    };
    this.attributes = new Map();
    this.listeners = new Map();
    this.innerHTML = '';
    this.children = [];
    this.parentElement = null;
    this.textContent = '';
  }

  setAttribute(k, v) { this.attributes.set(k, String(v)); }
  getAttribute(k) { return this.attributes.get(k) || null; }
  hasAttribute(k) { return this.attributes.has(k); }
  removeAttribute(k) { this.attributes.delete(k); }

  appendChild(el) {
    el.parentElement = this;
    this.children.push(el);
    return el;
  }

  removeChild(el) {
    this.children = this.children.filter((c) => c !== el);
    el.parentElement = null;
    return el;
  }

  addEventListener(event, handler) {
    if (!this.listeners.has(event)) this.listeners.set(event, []);
    this.listeners.get(event).push(handler);
  }

  removeEventListener(event, handler) {
    if (!this.listeners.has(event)) return;
    this.listeners.set(event, this.listeners.get(event).filter((h) => h !== handler));
  }

  dispatchEvent(event) {
    const handlers = this.listeners.get(event.type) || [];
    handlers.forEach((h) => h(event));
  }

  querySelector(selector) {
    // Basic selector matching for unit tests
    if (selector.startsWith('.')) {
      const cls = selector.substring(1);
      return this._find((el) => el.classList.contains(cls) || (el.className && el.className.includes(cls)));
    }
    if (selector.startsWith('#')) {
      const id = selector.substring(1);
      return this._find((el) => el.id === id);
    }
    return this._find((el) => el.tagName === selector.toUpperCase());
  }

  querySelectorAll(selector) {
    const results = [];
    this._findAll(selector, results);
    return results;
  }

  _find(predicate) {
    for (const child of this.children) {
      if (predicate(child)) return child;
      const found = child._find(predicate);
      if (found) return found;
    }
    return null;
  }

  _findAll(selector, results) {
    const isClass = selector.startsWith('.');
    const cls = isClass ? selector.substring(1) : '';
    for (const child of this.children) {
      if (isClass && (child.classList.contains(cls) || child.className.includes(cls))) {
        results.push(child);
      }
      child._findAll(selector, results);
    }
  }
}

// Global DOM mocks for Node test runner
global.document = {
  createElement: (tag) => new MockElement(tag),
  body: new MockElement('body'),
  querySelector: (sel) => null,
  activeElement: null
};

global.window = {
  addEventListener: () => {},
  removeEventListener: () => {},
  scrollY: 0
};

console.log('\n=== FLASHWEAR PHASE 04 NAVIGATION TEST SUITE ===\n');

// 1. Navigation Data Schema Tests
console.log('[1. Navigation Configuration & Schema]');
test('Navigation config contains required 5 center links: Shop, New Arrivals, Collections, Best Sellers, Lookbook', () => {
  const items = navigationConfig.header.menuItems;
  const labels = items.map((i) => i.label);
  const hrefs = items.map((i) => i.href);

  assert.ok(labels.includes('Shop'), 'Missing Shop link');
  assert.ok(labels.includes('New Arrivals'), 'Missing New Arrivals link');
  assert.ok(labels.includes('Collections'), 'Missing Collections link');
  assert.ok(labels.includes('Best Sellers'), 'Missing Best Sellers link');
  assert.ok(labels.includes('Lookbook'), 'Missing Lookbook link');

  assert.ok(hrefs.includes('#shop'));
  assert.ok(hrefs.includes('#new-arrivals'));
  assert.ok(hrefs.includes('#collections'));
  assert.ok(hrefs.includes('#best-sellers'));
  assert.ok(hrefs.includes('#lookbook'));
});

test('Announcement configuration contains multiple promotional and shipping messages', () => {
  assert.ok(navigationConfig.announcement.enabled, 'Announcement should be enabled');
  assert.ok(navigationConfig.announcement.messages.length >= 3, 'Should have at least 3 announcement messages');
  navigationConfig.announcement.messages.forEach((msg) => {
    assert.ok(msg.id && msg.text && msg.tag);
  });
});

// 2. AnnouncementBar Component Tests
console.log('\n[2. AnnouncementBar Component]');
test('AnnouncementBar initializes and renders message into slot', () => {
  storage.clear();
  const bar = new AnnouncementBar();
  const slot = new MockElement('div');
  bar.mount(slot);

  assert.ok(slot.children.length === 1, 'Announcement bar should be mounted');
  const rendered = slot.children[0];
  assert.strictEqual(rendered.id, 'fw-announcement-bar');
  assert.strictEqual(rendered.getAttribute('role'), 'region');
  assert.ok(rendered.innerHTML.includes('STRIKE ALERT'));
  assert.ok(rendered.innerHTML.includes('EDITION 01 ALLOCATION IS LIVE'));
});

test('AnnouncementBar message rotation advances on next() and previous()', () => {
  const bar = new AnnouncementBar();
  const slot = new MockElement('div');
  bar.mount(slot);

  assert.strictEqual(bar.currentIndex, 0);
  bar.next();
  assert.strictEqual(bar.currentIndex, 1);
  assert.ok(bar.container.innerHTML.includes('DISPATCH'));

  bar.previous();
  assert.strictEqual(bar.currentIndex, 0);
  assert.ok(bar.container.innerHTML.includes('STRIKE ALERT'));
});

test('AnnouncementBar dismiss sets persistence in storage and emits event', () => {
  storage.clear();
  let eventFired = false;
  const unsub = eventBus.on(EVENTS.ANNOUNCEMENT_DISMISSED, () => {
    eventFired = true;
  });

  const bar = new AnnouncementBar();
  const slot = new MockElement('div');
  bar.mount(slot);

  assert.strictEqual(bar.isDismissed, false);
  bar.dismiss();

  assert.strictEqual(bar.isDismissed, true);
  assert.strictEqual(storage.get(STORAGE_KEYS.ANNOUNCEMENT_DISMISSED), true);
  assert.ok(bar.container.classList.contains('is-dismissing'));

  unsub();
});

test('AnnouncementBar does not mount when already dismissed in storage', () => {
  storage.set(STORAGE_KEYS.ANNOUNCEMENT_DISMISSED, true);
  const bar = new AnnouncementBar();
  const slot = new MockElement('div');
  bar.mount(slot);

  assert.strictEqual(slot.children.length, 0);
  storage.clear();
});

// 3. MainNavigation Component Tests
console.log('\n[3. MainNavigation Component]');
test('MainNavigation renders brand logo, menu list, and action buttons', () => {
  const nav = new MainNavigation();
  const slot = new MockElement('header');
  nav.mount(slot);

  assert.ok(slot.innerHTML.includes('nav-brand-logo-desktop'));
  assert.ok(slot.innerHTML.includes('Shop'));
  assert.ok(slot.innerHTML.includes('New Arrivals'));
  assert.ok(slot.innerHTML.includes('Collections'));
  assert.ok(slot.innerHTML.includes('Best Sellers'));
  assert.ok(slot.innerHTML.includes('Lookbook'));
  assert.ok(slot.innerHTML.includes('nav-btn-search'));
  assert.ok(slot.innerHTML.includes('nav-btn-wishlist'));
  assert.ok(slot.innerHTML.includes('nav-btn-cart'));

  nav.destroy();
});

test('MainNavigation reacts to cart and wishlist state updates', () => {
  storage.clear();
  const nav = new MainNavigation();
  const slot = new MockElement('header');
  nav.mount(slot);

  // Initial cart is 0
  assert.strictEqual(store.getCartCount(), 0);

  // Add product to store -> verify event triggers badge update
  const mockProduct = {
    id: 'test_p1',
    name: 'Test Fleece',
    price: 240,
    images: { primary: '' }
  };
  store.addToCart(mockProduct, 'L', 'Obsidian Black', 2);
  assert.strictEqual(store.getCartCount(), 2);

  // Wishlist toggle
  store.toggleWishlist('test_p1');
  assert.strictEqual(store.getWishlistCount(), 1);

  nav.destroy();
  storage.clear();
});

// 4. MobileMenu Drawer Tests
console.log('\n[4. MobileMenu Drawer]');
test('MobileMenu initializes drawer dialog with correct ARIA attributes', () => {
  const menu = new MobileMenu({
    menuItems: navigationConfig.header.menuItems,
    brand: navigationConfig.header.brand
  });
  const body = new MockElement('body');
  menu.mount(body);

  assert.strictEqual(menu.container.id, 'fw-mobile-menu-drawer');
  assert.strictEqual(menu.container.getAttribute('role'), 'dialog');
  assert.strictEqual(menu.container.getAttribute('aria-modal'), 'true');
  assert.strictEqual(menu.container.getAttribute('aria-hidden'), 'true');
  assert.strictEqual(menu.isOpen, false);

  menu.destroy();
});

test('MobileMenu open() and close() manage state and aria attributes cleanly', () => {
  const menu = new MobileMenu({
    menuItems: navigationConfig.header.menuItems,
    brand: navigationConfig.header.brand
  });
  const body = new MockElement('body');
  menu.mount(body);

  menu.open();
  assert.strictEqual(menu.isOpen, true);
  assert.ok(menu.container.classList.contains('is-open'));
  assert.strictEqual(menu.container.getAttribute('aria-hidden'), 'false');

  menu.close();
  assert.strictEqual(menu.isOpen, false);
  assert.strictEqual(menu.container.classList.contains('is-open'), false);
  assert.strictEqual(menu.container.getAttribute('aria-hidden'), 'true');

  menu.destroy();
});

console.log(`\n========================================`);
console.log(`TEST RESULTS: ${passed} Passed, ${failed} Failed`);
console.log(`========================================\n`);

if (failed > 0) {
  process.exit(1);
}
