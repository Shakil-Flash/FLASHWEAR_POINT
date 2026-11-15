# FLASHWEAR — FRONTEND ARCHITECTURE SPECIFICATION
**System:** FLASHWEAR E-Commerce Digital Flagship  
**Phase:** 03 — Frontend Architecture and Project Structure  
**Creative Direction:** LIGHTNING STRIKE  
**Version:** 1.0.0  
**Status:** Approved Technical Foundation  

---

## 1. APPLICATION ARCHITECTURE OVERVIEW

The FLASHWEAR frontend architecture is engineered to support a high-performance, modular digital flagship without overengineering or premature framework bloat. It adheres to **native standard ES Modules (ESM)**, decoupled reactive pub-sub state management, and clear separation of concerns across data, presentation, styling, and services.

### Core Architectural Principles
1. **Decoupled Section Composition:** The future homepage is assembled from independent, self-contained sections registered with a central lifecycle registry rather than a monolithic markup file.
2. **Centralized Data Hub:** All product taxonomies, campaigns, lookbooks, and navigational structures are normalized into immutable data models (`src/data/`) to eliminate hardcoded markup repetition.
3. **Event-Driven Client Reactivity:** Cross-component interactions (cart drawer, wishlist counter, search filter, and quick view) communicate through an in-memory `EventBus` (`src/utils/events.js`), keeping components decoupled from global state mutation.
4. **Resilient Local Persistence:** The state store synchronizes with a fault-tolerant storage backend (`src/utils/storage.js`) featuring automatic in-memory fallbacks for private browsing or restricted environments.
5. **Strict Styling Ownership:** Styling is exclusively governed by the Phase 02 design token architecture (`styles/tokens.css`, `styles/components.css`, `styles/index.css`), ensuring zero style divergence across upcoming phases.

---

## 2. PROJECT DIRECTORY STRUCTURE

The repository is organized around clear logical boundaries:

```text
FLASHWEAR/
├── .gitignore                      # Git exclusion rules
├── package.json                    # Project metadata & npm test/dev scripts
├── index.html                      # Digital flagship HTML entry point & showcase sandbox
├── styles/                         # Phase 02 Centralized Design System
│   ├── tokens.css                  # Raw & semantic design tokens (Colors, Typography, Spacing, Glows)
│   ├── components.css              # Interaction rules & component foundations (Buttons, Badges, Inputs)
│   └── index.css                   # Global stylesheet entry point, reset, container & grid primitives
├── public/                         # Public static assets
│   └── assets/
│       ├── brand/                  # 10 verified Lightning Strike vector SVG assets
│       ├── images/                 # Product, campaign, and lookbook photographic assets
│       │   ├── products/
│       │   ├── campaigns/
│       │   └── lookbook/
│       └── icons/                  # SVG system & navigation icons
├── src/                            # Modular application source code (ES Modules)
│   ├── index.js                    # Primary module export barrel
│   ├── app/                        # Bootstrapping & configuration
│   │   ├── app.js                  # Application lifecycle engine & layout initialier
│   │   └── config.js               # App configuration, environment flags & endpoints
│   ├── components/                 # Component contracts & factories
│   │   ├── ui/                     # Reusable UI primitives (button markup, badge markup)
│   │   │   ├── button.js
│   │   │   └── badge.js
│   │   ├── layout/                 # Layout shell contract (Announcement, Header, Main, Footer slots)
│   │   │   └── layout-shell.js
│   │   ├── navigation/             # Navigation contracts & menu configuration mapping
│   │   ├── product/                # Product card & quick-view contracts
│   │   └── sections/               # Section registry & dynamic section lifecycle loader
│   │       └── section-registry.js
│   ├── data/                       # Normalized content schemas & mock datasets
│   │   ├── index.js                # Centralized data export hub
│   │   ├── products.js             # Product catalog (SKU, price, fabric, GSM, colorways, inventory)
│   │   ├── categories.js           # Category taxonomies (Outerwear, Hoodies, Tees, Trousers, Accessories)
│   │   ├── collections.js          # Archival drop metadata (Edition 01, Crimson Monolith)
│   │   ├── campaigns.js            # Hero campaign storytelling & editorial metadata
│   │   ├── navigation.js           # Header, announcement, and footer menu trees
│   │   ├── testimonials.js         # Editorial press quotes & critical acclaim
│   │   └── promotions.js           # Archival allocation & dispatch banners
│   ├── state/                      # Client state management
│   │   └── store.js                # Reactive store (Cart, Wishlist, Recently Viewed, Search, QuickView)
│   ├── services/                   # Application services
│   │   └── analytics.js            # Decoupled telemetry tracking stub
│   └── utils/                      # Reusable utilities & helpers
│       ├── constants.js            # Storage keys, breakpoints, currencies, event names
│       ├── formatters.js           # Currency formatting (USD, EUR, JPY), discounts, dates, slugs
│       ├── storage.js              # Safe LocalStorage wrapper with in-memory fallback
│       ├── events.js               # PubSub EventBus instance
│       └── dom.js                  # Debounce, throttle, HTML escaping, focus trap helpers
├── tests/                          # Automated unit test suite
│   └── architecture.test.js        # Data integrity, state management, and formatter validation
└── docs/                           # Project documentation & guidelines
    ├── brand/                      # Phase 01 Brand Identity & Visual Direction
    │   ├── FLASHWEAR_BRAND_GUIDELINES.md
    │   └── VISUAL_DIRECTION.md
    ├── design-system/              # Phase 02 Design System Specification
    │   └── DESIGN_SYSTEM.md
    └── architecture/               # Phase 03 Frontend Architecture
        └── FRONTEND_ARCHITECTURE.md
```

---

## 3. COMPONENT ORGANIZATION & CONVENTIONS

### 3.1 Component Categories
- **`components/ui/`:** Low-level, stateless, presentation-only primitives (`Button`, `Badge`, `Icon`). They consume classes from `styles/components.css` and accept explicit props.
- **`components/layout/`:** Structural scaffolding (`LayoutShell`) managing major application regions (Announcement slot, Header slot, Main Content slot, Drawer slot, Footer slot).
- **`components/sections/`:** Independent, self-contained homepage sections managed by `SectionRegistry`.
- **`components/product/`:** Product display modules (Product Card, Quick View modal, Variant Selector).

### 3.2 Conventions & Best Practices
- **File Naming:** Kebab-case matching the component responsibility (e.g. `layout-shell.js`, `section-registry.js`, `button.js`).
- **Exports:** Explicit named exports rather than default exports to facilitate tree-shaking and clear autocompletion.
- **Styling Ownership:** Components NEVER declare internal `<style>` tags with hardcoded raw hex colors; they strictly assign semantic CSS classes (`.btn-primary`, `.badge-strike`, `.card-surface`) defined in `styles/`.
- **Zero Monoliths:** No single component file may combine product data parsing, DOM layout, and drawer logic into one block. Responsibilities are split cleanly between `data/`, `state/`, and `components/`.

---

## 4. HOMEPAGE COMPOSITION STRATEGY

The homepage is composed dynamically through the **`SectionRegistry`** (`src/components/sections/section-registry.js`) and **`LayoutShell`** (`src/components/layout/layout-shell.js`).

### Composition Flow

```
+----------------------------------------------------------------------------------+
| LayoutShell Scaffolding (#app)                                                   |
|                                                                                  |
|  [ #fw-announcement-slot ] -> Announcement Bar (Phase 04/05)                     |
|  [ #fw-header-slot ]       -> Main Navigation & Brand Lockup (Phase 06)          |
|                                                                                  |
|  [ #fw-main-content ]      -> SectionRegistry.mountAll()                         |
|      ├── Section 01: Hero Banner (Priority 10)                                   |
|      ├── Section 02: Featured Category Architecture (Priority 20)                |
|      ├── Section 03: Edition 01 Product Grid (Priority 30)                       |
|      ├── Section 04: Editorial Lookbook Stream (Priority 40)                     |
|      └── Section 05: Brand Manifesto / Press (Priority 50)                       |
|                                                                                  |
|  [ #fw-footer-slot ]       -> Global Archival Footer (Phase 28/29)               |
|  [ #fw-drawer-slot ]       -> Cart Drawer & Mobile Menu Overlays                 |
|  [ #fw-modal-slot ]        -> Quick View Modal & Lightbox Overlays               |
+----------------------------------------------------------------------------------+
```

Each future development phase implements its assigned section by registering with `sectionRegistry`:
```javascript
sectionRegistry.register('hero_banner', {
  render: () => createHeroMarkup(campaigns[0]),
  init: (sectionEl) => attachHeroAnimations(sectionEl)
}, 10);
```

---

## 5. DATA ARCHITECTURE

All data is structured in normalized JavaScript modules within `src/data/`:

| Data Entity | File | Schema Highlights |
| :--- | :--- | :--- |
| **Products** | `products.js` | `id`, `sku`, `name`, `slug`, `category`, `price`, `compareAtPrice`, `badge`, `colorways`, `sizes`, `inventory`, `specifications` (GSM, cut, fabric), `images` |
| **Categories** | `categories.js` | `id`, `name`, `slug`, `descriptor`, `itemCount`, `featured` |
| **Collections** | `collections.js` | `id`, `name`, `slug`, `status` (`IGNITED`), `releaseDate`, `tagline` |
| **Campaigns** | `campaigns.js` | `id`, `title`, `headline`, `subheadline`, `ctaPrimary`, `ctaSecondary`, `media` |
| **Navigation** | `navigation.js` | Header menu items, announcement text, action icons, footer column hierarchy |
| **Testimonials** | `testimonials.js` | `id`, `source`, `quote`, `attribution` |
| **Promotions** | `promotions.js` | `id`, `type`, `title`, `threshold`, `badge`, `description` |

---

## 6. STATE-MANAGEMENT CONVENTIONS

Client state is managed by the unified reactive **`store`** (`src/state/store.js`):
- **Cart State:** `cartItems` array containing variant selections (`id`, `size`, `color`, `quantity`, `price`). Automatically updates totals, counts, and synchronizes with `localStorage` (`flashwear_cart_v1`).
- **Wishlist State:** `wishlistIds` set with quick `toggleWishlist(productId)` and `isInWishlist(productId)` queries.
- **Recently Viewed:** `recentIds` array tracking the last 8 visited products for instant lookbook recommendations.
- **Search Query:** `searchQuery` string updated via debounced input handlers.
- **Event-Driven Subscriptions:** Whenever state mutates, the store emits typed events through the `EventBus`:
  - `flashwear:cart_updated`
  - `flashwear:cart_drawer_toggled`
  - `flashwear:wishlist_updated`
  - `flashwear:search_query_changed`

---

## 7. STYLING INTEGRATION

The application architecture directly integrates with the Phase 02 design system:
- **`styles/tokens.css`:** Declares all design tokens (`--color-obsidian`, `--color-flash-red`, `--text-display-2xl`, `--space-4`, etc.).
- **`styles/components.css`:** Defines component primitives (`.btn-primary`, `.badge-strike`, `.input-field`, `.card-surface`).
- **`styles/index.css`:** Imports `tokens.css` and `components.css`, provides global resets, fluid layout containers, and responsive grid helpers.
- **No Style Duplication:** No duplicate style files exist in `src/`. All components consume the shared tokens.

---

## 8. ASSET MANAGEMENT

- **Brand Vector Marks:** Located in `public/assets/brand/` (10 SVGs).
- **Photographic Imagery:** Standardized directories under `public/assets/images/`:
  - `public/assets/images/products/`
  - `public/assets/images/campaigns/`
  - `public/assets/images/lookbook/`
- **System Icons:** Located in `public/assets/icons/`.

---

## 9. CODE QUALITY, NAMING CONVENTIONS & TESTING

- **JavaScript Standard:** Modern ECMAScript (ES2022+), strict mode, native ES modules.
- **Testing Suite:** Automated unit tests in `tests/architecture.test.js` executed via `npm test` or `node tests/architecture.test.js`.
- **Validation Criteria:** Every data schema, calculation helper (currency formatting, discount calculation), and state store operation must pass 100% of unit tests.

---

## 10. FUTURE EXTENSIBILITY RULES

1. **Homepage Focus:** The current architecture is strictly optimized for the single-page flagship homepage. No multi-page routing framework is required or introduced.
2. **Decoupled Future Views:** If independent views (e.g. detailed archival lookbook or checkout) are introduced in future phases, the modular `LayoutShell`, `store`, and `data` layers will serve them without refactoring.
3. **No Unapproved Dependencies:** New npm packages may not be introduced without explicit architectural review.

---
*FLASHWEAR Frontend Architecture Specification — Phase 03 Approved.*
