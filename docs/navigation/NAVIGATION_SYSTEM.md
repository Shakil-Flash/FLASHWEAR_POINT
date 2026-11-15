# FLASHWEAR — ANNOUNCEMENT BAR & MAIN NAVIGATION SPECIFICATION
**System:** FLASHWEAR Digital Flagship  
**Phase:** 04 — Announcement Bar and Main Navigation  
**Creative Direction:** LIGHTNING STRIKE  
**Version:** 1.0.0  
**Status:** Approved & Functional  

---

## 1. COMPONENT OVERVIEW

Phase 04 implements the primary brand presence and navigation system for the FLASHWEAR digital flagship, following the approved **LIGHTNING STRIKE** identity (deep obsidian black, dark crimson, flash red, and electric golden-yellow highlights).

### Implemented Components
1. **Announcement Bar (`AnnouncementBar`):** Top-level archival dispatch banner with rotating messages, lightning tag, accessible dismissal, and LocalStorage persistence.
2. **Main Navigation (`MainNavigation`):** Primary sticky header with desktop and mobile layouts, brand vector logo, 5 central navigation anchors, and real-time reactive action buttons.
3. **Mobile Drawer (`MobileMenu`):** Slide-over navigation panel with keyboard focus trapping, Escape key dismissal, body scroll-locking, and quick-action cards.
4. **Action Buttons Group:** Search trigger, Wishlist button with live count badge, and Shopping Bag button with live cart badge.

---

## 2. ANNOUNCEMENT BAR SPECIFICATION

### 2.1 Visual Architecture & Layout
- **Position:** Top of the viewport, rendered into `#fw-announcement-slot`.
- **Background:** Obsidian Black (`#09090B`) with an upper 2px gradient speed-line (`--speed-line-grad`) and bottom crimson border (`#3E161C`).
- **Typography:** `JetBrains Mono`, 11px uppercase, tracking `+0.16em`, color Cloud White (`#F5F5F5`).
- **Lightning Tag:** `[STRIKE ALERT]` badge with an animated pulsing Lightning Gold dot (`.pulse-dot`).

### 2.2 Content & Rotation
Messages are defined in `src/data/navigation.js`:
- Message 1: `EDITION 01 ALLOCATION IS LIVE // COMPLIMENTARY WORLDWIDE EXPRESS DISPATCH OVER $300` (Tag: `STRIKE ALERT`)
- Message 2: `COMPLIMENTARY WORLDWIDE EXPRESS DISPATCH ON ORDERS OVER $300` (Tag: `DISPATCH`)
- Message 3: `HIGH VELOCITY 480GSM ARCHITECTURAL FLEECE // LIMITED PRODUCTION RUN` (Tag: `EDITION 01`)
- **Rotation Behavior:** Cycles every 6000ms. Automatically pauses on hover, focus-in, and touch interaction to guarantee screen-reader readability.

### 2.3 Dismissal Behavior
- **Dismiss Button:** Accessible `aria-label="Dismiss announcement"`, 28x28px click target with subtle hover highlight.
- **Smooth Animation:** Adds `.is-dismissing` class (`max-height: 0; opacity: 0; transform: translateY(-100%);`) over 250ms.
- **Persistence:** Writes to `storage` under key `flashwear_announcement_dismissed_v1`. On subsequent page loads, the bar remains dismissed unless cleared or reset.

---

## 3. MAIN NAVIGATION SPECIFICATION

### 3.1 Desktop Layout (`min-width: 1024px`)

```
+-----------------------------------------------------------------------------------------------+
| FLASHWEAR           SHOP   NEW ARRIVALS   COLLECTIONS   BEST SELLERS   LOOKBOOK      [🔍] [♡ 0] [🛍 0] |
+-----------------------------------------------------------------------------------------------+
```

- **Left Group:**
  - Full desktop wordmark: `/public/assets/brand/flashwear-wordmark-dark.svg` (height 24px) linking to `#` or `/`.
- **Center Group (Exact 5 Required Links):**
  1. **Shop** (`#shop`)
  2. **New Arrivals** (`#new-arrivals`) with micro-badge `NEW` in Flash Red (`#C41420`)
  3. **Collections** (`#collections`)
  4. **Best Sellers** (`#best-sellers`)
  5. **Lookbook** (`#lookbook`)
  - *Active Link State:* Flash Red bottom highlight line (`after` pseudoclass) with crisp 120ms transition.
- **Right Group:**
  1. **Search Action (`.nav-btn-search`):** Accessible search trigger with 1.75px stroke SVG icon.
  2. **Wishlist Action (`.nav-btn-wishlist`):** Heart icon with dynamic badge counter. Subscribes to `EVENTS.WISHLIST_UPDATED`.
  3. **Shopping Bag Action (`.nav-btn-cart`):** Bag icon with dynamic Flash Red count badge. Subscribes to `EVENTS.CART_UPDATED` and toggles `store.toggleCartDrawer()`.

---

## 4. MOBILE NAVIGATION SPECIFICATION (`max-width: 1023px`)

### 4.1 Header Presentation
- Center navigation menu hidden.
- Left: Accessible hamburger toggle (`.nav-mobile-toggle`) with `aria-expanded="false"`, `aria-controls="fw-mobile-menu-drawer"`.
- Center: High-visibility kinetic monogram (`/public/assets/brand/flashwear-monogram-kinetic.svg`).
- Right: Search and Shopping Bag quick buttons with live cart badge.

### 4.2 Slide-Over Drawer Panel
- **Backdrop:** `rgba(9, 9, 11, 0.85)` with 10px backdrop blur.
- **Panel:** Fixed 360px width, Obsidian Black background with Deep Crimson right border (`#650B12`).
- **Navigation Links:** Large display typography (20px `Syne`, bold, uppercase) with directional arrow indicators (`→`).
- **Quick Action Cards:** Full-width tactile cards for Search, Wishlist (with live counter), and Shopping Bag (with live counter).
- **Archival Footer:** Displays the live `LIGHTNING STRIKE // LIVE` badge and geographic coordinates.

### 4.3 Accessibility & Keyboard Controls
- **Focus Trapping:** Automatically traps Tab / Shift+Tab focus inside the open drawer panel using `trapFocus()`.
- **Escape Dismissal:** Pressing `Escape` closes the drawer immediately and restores focus to the hamburger toggle button.
- **Body Scroll Lock:** Adds `.fw-mobile-menu-open` to `document.body` (`overflow: hidden;`) to prevent background page scroll while navigating.

---

## 5. STICKY HEADER & SCROLL DYNAMICS

- **Sticky Position:** `position: sticky; top: 0; z-index: 100; width: 100%;`
- **Dynamic Scroll Treatment:** An event listener monitors `window.scrollY > 20` and applies `.is-scrolled`.
- **Scrolled Styling:** Deepens background opacity from 0.94 to 0.98, shifts bottom border color to Deep Crimson (`#650B12`), and projects a subtle elevation shadow (`0 4px 20px rgba(0, 0, 0, 0.7)`).
- **Reduced Motion Support:** All transitions honor `prefers-reduced-motion` settings.

---

## 6. REACTIVE STATE INTEGRATION

The navigation components communicate with the client store (`src/state/store.js`) and EventBus (`src/utils/events.js`):

| Action | Store Method | Event Fired | Navigation UI Reaction |
| :--- | :--- | :--- | :--- |
| **Add Product to Bag** | `store.addToCart(...)` | `flashwear:cart_updated` | Desktop & mobile bag badges update count and scale up with Flash Red animation. |
| **Toggle Wishlist** | `store.toggleWishlist(...)` | `flashwear:wishlist_updated` | Wishlist heart badge updates count and displays gold accent. |
| **Click Shopping Bag** | `store.toggleCartDrawer(...)` | `flashwear:cart_drawer_toggled` | Triggers cart drawer toggle. |
| **Dismiss Announcement** | `announcementBar.dismiss()` | `flashwear:announcement_dismissed` | Announcement smoothly collapses, header adjusts top offset. |

---

## 7. AUTOMATED TEST VALIDATION

The navigation test suite (`tests/navigation.test.js`) executes 10 automated unit tests:
1. Navigation configuration matches the exact 5 center links.
2. Announcement configuration contains rotating promotional messages.
3. `AnnouncementBar` renders with role `region` and `aria-label`.
4. `AnnouncementBar` rotates messages forward and backward.
5. `AnnouncementBar` dismissal sets LocalStorage persistence and emits event.
6. `AnnouncementBar` honors existing dismissal state on reload.
7. `MainNavigation` renders logo, menu list, and action buttons.
8. `MainNavigation` dynamically updates badges on store state changes.
9. `MobileMenu` initializes with `role="dialog"` and `aria-modal="true"`.
10. `MobileMenu` manages open/close states, ARIA attributes, and body classes.

**Combined Test Suite Result:** 25 Passed, 0 Failed (`npm test`).

---
*FLASHWEAR Navigation System Specification — Phase 04 Approved.*
