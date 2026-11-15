/**
 * FLASHWEAR FRONTEND ARCHITECTURE — AUTOMATED VALIDATION SUITE
 * Validates module integrity, data schemas, state management, and formatters.
 */

import { strict as assert } from 'assert';
import fs from 'fs';
import path from 'path';

// Import modules under test
import { app } from '../src/app/app.js';
import { appConfig } from '../src/app/config.js';
import { store } from '../src/state/store.js';
import { eventBus } from '../src/utils/events.js';
import { EVENTS } from '../src/utils/constants.js';
import { formatPrice, calculateDiscount, slugify } from '../src/utils/formatters.js';
import { storage } from '../src/utils/storage.js';
import { createButtonMarkup } from '../src/components/ui/button.js';
import { createBadgeMarkup } from '../src/components/ui/badge.js';
import { SectionRegistry } from '../src/components/sections/section-registry.js';
import * as data from '../src/data/index.js';

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

console.log('\n=== FLASHWEAR ARCHITECTURE TEST SUITE ===\n');

// 1. Data Integrity Tests
console.log('[1. Data Architecture Validation]');
test('Products catalog is non-empty and well-structured', () => {
  assert.ok(Array.isArray(data.products) && data.products.length > 0, 'Products should be an array');
  data.products.forEach((p) => {
    assert.ok(p.id, `Product missing id: ${p.name}`);
    assert.ok(p.name, `Product missing name: ${p.id}`);
    assert.ok(p.slug, `Product missing slug: ${p.id}`);
    assert.strictEqual(typeof p.price, 'number', `Product price must be a number: ${p.id}`);
    assert.ok(p.sku, `Product missing sku: ${p.id}`);
    assert.ok(p.colorways && p.colorways.length > 0, `Product missing colorways: ${p.id}`);
  });
});

test('Categories catalog is valid and structured', () => {
  assert.ok(Array.isArray(data.categories) && data.categories.length > 0);
  data.categories.forEach((cat) => {
    assert.ok(cat.id && cat.name && cat.slug);
  });
});

test('Navigation configuration contains all required layout slots', () => {
  assert.ok(data.navigationConfig.header, 'Header config missing');
  assert.ok(data.navigationConfig.announcement, 'Announcement config missing');
  assert.ok(data.navigationConfig.footer, 'Footer config missing');
});

// 2. Formatter Tests
console.log('\n[2. Formatting Utilities]');
test('formatPrice formats USD correctly', () => {
  assert.strictEqual(formatPrice(240, 'USD'), '$240.00');
  assert.strictEqual(formatPrice(110.5, 'USD'), '$110.50');
});

test('formatPrice formats JPY as integer without decimals', () => {
  const formatted = formatPrice(100, 'JPY');
  assert.ok(formatted.startsWith('¥'));
  assert.ok(!formatted.includes('.'));
});

test('calculateDiscount computes percentage accurately', () => {
  assert.strictEqual(calculateDiscount(500, 400), 20);
  assert.strictEqual(calculateDiscount(100, 100), 0);
  assert.strictEqual(calculateDiscount(100, 120), 0);
});

test('slugify transforms title to URL-safe string', () => {
  assert.strictEqual(
    slugify('Velocity Heavyweight Fleece Hoodie // 01!'),
    'velocity-heavyweight-fleece-hoodie-01'
  );
});

// 3. State Management & EventBus
console.log('\n[3. Reactive State Store & EventBus]');
test('EventBus handles subscriptions and emits data', () => {
  let received = null;
  const unsub = eventBus.on('test_event', (val) => {
    received = val;
  });
  eventBus.emit('test_event', { status: 'ok' });
  assert.deepStrictEqual(received, { status: 'ok' });
  unsub();

  // Test unsubscribe
  eventBus.emit('test_event', { status: 'ignored' });
  assert.deepStrictEqual(received, { status: 'ok' });
});

test('Cart state management handles adding, quantity updates, and calculations', () => {
  storage.clear();
  const testProd = data.products[0];
  
  store.addToCart(testProd, 'L', 'Obsidian Black', 2);
  let cartState = store.getCartState();
  assert.strictEqual(cartState.count, 2);
  assert.strictEqual(cartState.subtotal, testProd.price * 2);

  // Add same item again -> increments quantity
  store.addToCart(testProd, 'L', 'Obsidian Black', 1);
  cartState = store.getCartState();
  assert.strictEqual(cartState.count, 3);
  assert.strictEqual(cartState.items.length, 1);

  // Update quantity
  store.updateCartQuantity(0, 1);
  cartState = store.getCartState();
  assert.strictEqual(cartState.count, 1);

  // Remove
  store.removeFromCart(0);
  cartState = store.getCartState();
  assert.strictEqual(cartState.count, 0);
});

test('Wishlist state management toggles correctly', () => {
  const prodId = 'fw_prod_test_01';
  assert.strictEqual(store.isInWishlist(prodId), false);

  const added = store.toggleWishlist(prodId);
  assert.strictEqual(added, true);
  assert.strictEqual(store.isInWishlist(prodId), true);

  const removed = store.toggleWishlist(prodId);
  assert.strictEqual(removed, false);
  assert.strictEqual(store.isInWishlist(prodId), false);
});

// 4. Component Factory Markup
console.log('\n[4. UI Component Factories]');
test('createButtonMarkup generates valid button markup with semantic classes', () => {
  const html = createButtonMarkup({
    variant: 'primary',
    size: 'lg',
    text: 'Explore Capsule'
  });
  assert.ok(html.includes('class="btn btn-primary btn-lg"'));
  assert.ok(html.includes('Explore Capsule'));
  assert.ok(html.startsWith('<button'));
});

test('createButtonMarkup renders anchor tag when href is provided', () => {
  const html = createButtonMarkup({
    text: 'Lookbook',
    href: '#lookbook'
  });
  assert.ok(html.startsWith('<a href="#lookbook"'));
});

test('createBadgeMarkup renders lightning strike badge with pulse dot', () => {
  const html = createBadgeMarkup({
    type: 'strike',
    text: 'LIVE DROP'
  });
  assert.ok(html.includes('class="badge badge-strike"'));
  assert.ok(html.includes('class="pulse-dot"'));
  assert.ok(html.includes('LIVE DROP'));
});

// 5. Section Registry
console.log('\n[5. Section Registry Execution]');
test('SectionRegistry registers and orders sections by priority', () => {
  const registry = new SectionRegistry();
  registry.register('hero', { render: () => '<div>Hero</div>' }, 10);
  registry.register('footer', { render: () => '<div>Footer</div>' }, 90);
  registry.register('featured', { render: () => '<div>Featured</div>' }, 20);

  const order = registry.getRegisteredSections();
  assert.deepStrictEqual(order, ['hero', 'featured', 'footer']);
});

// 6. Stylesheet & Token Integrity
console.log('\n[6. Stylesheet & Token Integrity]');
test('Design tokens CSS file contains required Lightning Strike variables', () => {
  const tokensContent = fs.readFileSync(path.join(process.cwd(), 'styles/tokens.css'), 'utf-8');
  assert.ok(tokensContent.includes('--color-obsidian'));
  assert.ok(tokensContent.includes('--color-deep-crimson'));
  assert.ok(tokensContent.includes('--color-flash-red'));
  assert.ok(tokensContent.includes('--color-electric-orange'));
  assert.ok(tokensContent.includes('--color-lightning-gold'));
  assert.ok(tokensContent.includes('--ease-velocity'));
});

console.log(`\n========================================`);
console.log(`TEST RESULTS: ${passed} Passed, ${failed} Failed`);
console.log(`========================================\n`);

if (failed > 0) {
  process.exit(1);
}
