# FLASHWEAR — DESIGN SYSTEM & DESIGN TOKENS SPECIFICATION
**System:** FLASHWEAR Design System  
**Phase:** 02 — Design System & Design Tokens  
**Creative Direction:** LIGHTNING STRIKE  
**Version:** 2.0.0  
**Target Architecture:** Production Web & E-Commerce Flagship  

---

## 1. SYSTEM OVERVIEW & ARCHITECTURE

The FLASHWEAR design system establishes a centralized, tokenized foundation built for the **LIGHTNING STRIKE** visual direction. It provides a shared language between brand strategy, UI design, and frontend engineering.

### 1.1 Architectural Principles
1. **Token Hierarchy:** Primitives (Raw values) → Semantic Tokens (Contextual meaning) → Component Tokens (Interaction rules).
2. **Velocity & Restraint:** Built on deep obsidian and crimson darkness, driven by Flash Red as the primary brand color, and sparked by electric orange and lightning-gold micro-accents.
3. **Fluid & Responsive:** Typography and spacing utilize mathematical clamping scales that adjust continuously across mobile, tablet, and desktop viewports without layout shifts.
4. **Accessible by Default:** High-contrast text pairings exceeding WCAG AA standards, visible focus indicators, and native support for `prefers-reduced-motion`.

### 1.2 File Structure
All design tokens and component foundations are implemented in pure, standards-compliant CSS located in `styles/`:

```
styles/
├── tokens.css       # Raw & Semantic tokens (Colors, Typography, Spacing, Layout, Shadows, Motion)
├── components.css   # Reusable component foundations (Buttons, Form Inputs, Badges, Cards)
└── index.css        # Global entry point, CSS reset, layout containers, and utility classes
```

---

## 2. COLOR SYSTEM & SEMANTIC TOKENS

### 2.1 Raw Color Palette (Primitives)

| Token Name | HEX | RGB | Intended Role |
| :--- | :--- | :--- | :--- |
| `--color-obsidian` | `#09090B` | `9, 9, 11` | Primary canvas & deepest structural background |
| `--color-deep-crimson` | `#650B12` | `101, 11, 18` | Dark red surfaces, card backgrounds, depth shadows |
| `--color-flash-red` | `#C41420` | `196, 20, 32` | **Primary brand color & dominant action driver** |
| `--color-electric-orange` | `#FF4A16` | `255, 74, 22` | Energy accents, button hover glows, active indicators |
| `--color-lightning-gold` | `#FFC52E` | `255, 197, 46` | Lightning highlights, precision spark marks, live badges |
| `--color-warm-amber` | `#FF9D24` | `255, 157, 36` | Secondary highlights, gradient bridges, capsule badges |
| `--color-ash-grey` | `#85858D` | `133, 133, 141` | Muted secondary text, inactive borders, timestamps |
| `--color-cloud-white` | `#F5F5F5` | `245, 245, 245` | Primary light typography across all dark surfaces |
| `--color-pure-white` | `#FFFFFF` | `255, 255, 255` | High-contrast vector highlights, primary button text |

### 2.2 Semantic Color Tokens

```css
/* Background & Canvas */
--bg-primary:            var(--color-obsidian);         /* #09090B */
--bg-secondary:          var(--color-surface-base);     /* #120D0F */
--bg-elevated:           var(--color-surface-raised);   /* #1A1215 */
--bg-crimson:            var(--color-deep-crimson);     /* #650B12 */
--bg-overlay:            rgba(9, 9, 11, 0.92);
--bg-modal:              rgba(18, 13, 15, 0.96);

/* Typography */
--text-primary:          var(--color-cloud-white);      /* #F5F5F5 */
--text-contrast:         var(--color-pure-white);       /* #FFFFFF */
--text-secondary:        var(--color-ash-grey);         /* #85858D */
--text-muted:            rgba(133, 133, 141, 0.65);
--text-brand:            var(--color-flash-red);        /* #C41420 */
--text-accent:           var(--color-lightning-gold);   /* #FFC52E */
--text-energy:           var(--color-electric-orange);  /* #FF4A16 */
--text-inverse:          var(--color-obsidian);         /* #09090B */

/* Brand & Interactive Accents */
--accent-primary:        var(--color-flash-red);        /* Primary CTA & key focus */
--accent-secondary:      var(--color-electric-orange);  /* Dynamic energy burst */
--accent-highlight:      var(--color-lightning-gold);   /* Focal spark point */
--accent-amber:          var(--color-warm-amber);       /* Capsule tag accent */

/* Borders & Dividers */
--border-subtle:         #2A1418;                       /* Hairline structural frame */
--border-default:        #3E161C;                       /* Card & input borders */
--border-crimson:        var(--color-deep-crimson);     /* Elevated crimson framing */
--border-brand:          var(--color-flash-red);        /* Focus & active card borders */
--border-highlight:      var(--color-lightning-gold);   /* Spark badge borders */
--divider:               rgba(133, 133, 141, 0.18);    /* Content separation lines */

/* Feedback States */
--feedback-success:      #10B981;                       /* Verified stock & checkouts */
--feedback-warning:      var(--color-lightning-gold);   /* Low-inventory advisory */
--feedback-error:        var(--color-flash-red);        /* Validation alert */
--feedback-info:         #3B82F6;                       /* System notices */
```

### 2.3 Color Application & Proportion Rules
- **60% Obsidian Black (`#09090B`):** Dominant structural canvas.
- **20% Deep Crimson (`#650B12`):** Surfaces, depth gradients, and atmospheric shadows.
- **12% Flash Red (`#C41420`):** Dominant brand accent (Primary buttons, key headlines, active states).
- **4% Electric Orange (`#FF4A16`):** Kinetic energy transitions and hover glows.
- **2% Lightning Gold (`#FFC52E`):** Precision sparks, live drop indicators, and coordinate tags.
- **2% Cloud White / Ash Grey:** High-legibility text and structural hairlines.

---

## 3. TYPOGRAPHY SYSTEM

### 3.1 Font Families
- **Display Typography:** `'Syne', 'Plus Jakarta Sans', sans-serif`  
  *Characteristics:* Architectural, bold, wide-stance geometric curves that convey runway editorial authority.
- **Body & Interface:** `'Inter', -apple-system, BlinkMacSystemFont, sans-serif`  
  *Characteristics:* Pristine Swiss readability, neutral geometry, optical clarity at small sizes.
- **Archival Metadata:** `'JetBrains Mono', 'Space Mono', monospace`  
  *Characteristics:* Technical precision, monospaced tabular alignment, archival edition labeling.

### 3.2 Typographic Hierarchy Scale

| Token | Size Range | Weight | Line Height | Tracking | Case | Applied Usage |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `--text-display-2xl` | `clamp(48px, 6.5vw, 84px)` | 800 | 0.95–1.08 | `-0.04em` | UPPERCASE | Homepage hero mastheads, major drops |
| `--text-display-xl` | `clamp(36px, 4.5vw, 56px)` | 800 | 1.08 | `-0.03em` | UPPERCASE | Section leads, collection campaign titles |
| `--text-heading-lg` | `clamp(26px, 3.0vw, 36px)` | 700 | 1.15 | `-0.02em` | UPPERCASE | Category banners, editorial lookbook leads |
| `--text-heading-md` | `24px (1.5rem)` | 600 | 1.25 | `-0.01em` | Normal | Product names, module highlights |
| `--text-heading-sm` | `18px (1.125rem)` | 600 | 1.35 | `0.00em` | Normal | Filter headings, drawer titles |
| `--text-body-lg` | `18px (1.125rem)` | 400 | 1.60 | `0.00em` | Sentence | Editorial introductions, lead narrative |
| `--text-body-base` | `15px (0.9375rem)` | 400 | 1.55 | `0.00em` | Sentence | Standard descriptions, body copy |
| `--text-body-sm` | `13px (0.8125rem)` | 400 | 1.50 | `+0.01em` | Sentence | Secondary specifications, footer copy |
| `--text-meta-mono` | `11px (0.6875rem)` | 600 | 1.40 | `+0.18em` | UPPERCASE | Technical SKUs, Lightning tags, coords |
| `--text-btn` | `13px (0.8125rem)` | 600 | 1.00 | `+0.12em` | UPPERCASE | Interactive buttons, navigation links |
| `--text-price` | `16px (1.0rem)` | 700 | 1.20 | `-0.01em` | Normal | Product price points, currency display |

---

## 4. SPACING SYSTEM (4px INCREMENTS)

The spacing scale is strictly derived from 4px increments to maintain visual mathematical rhythm across all components and page layouts:

| Token | Pixels | Rem Equivalent | Common Application |
| :--- | :--- | :--- | :--- |
| `--space-1` | `4px` | `0.25rem` | Micro icon gaps, badge vertical padding |
| `--space-2` | `8px` | `0.50rem` | Button gap, inline badge padding, input inner gap |
| `--space-3` | `12px` | `0.75rem` | Mobile grid gaps, card internal padding (compact) |
| `--space-4` | `16px` | `1.00rem` | Input horizontal padding, mobile page margins |
| `--space-5` | `20px` | `1.25rem` | Card padding (medium), modal internal spacing |
| `--space-6` | `24px` | `1.50rem` | Desktop grid gaps, standard button horizontal padding |
| `--space-8` | `32px` | `2.00rem` | Tablet page margins, large card padding |
| `--space-10` | `40px` | `2.50rem` | Large module separation, hero inner spacing |
| `--space-12` | `48px` | `3.00rem` | Desktop page margins, compact section vertical padding |
| `--space-16` | `64px` | `4.00rem` | Medium section padding |
| `--space-20` | `80px` | `5.00rem` | Standard section vertical padding |
| `--space-24` | `96px` | `6.00rem` | Major campaign feature separation |
| `--space-32` | `128px` | `8.00rem` | Hero & high-drama editorial section spacing |

---

## 5. LAYOUT, CONTAINERS & BREAKPOINTS

### 5.1 Container Widths
- `--container-max`: `1360px` (Max bounding box for content alignment)
- `--container-desktop`: `1280px`
- `--container-tablet`: `768px`
- `--container-mobile`: `100%`

### 5.2 Responsive Breakpoints

| Breakpoint | Viewport Range | Columns | Horizontal Margin | Grid Gap |
| :--- | :--- | :--- | :--- | :--- |
| **Mobile (`sm`)** | `< 640px` | 4 columns | `16px (--space-4)` | `12px (--space-3)` |
| **Tablet Portrait (`md`)** | `640px – 767px` | 6 columns | `24px (--space-6)` | `16px (--space-4)` |
| **Tablet Landscape (`lg`)**| `768px – 1023px` | 8 columns | `32px (--space-8)` | `16px (--space-4)` |
| **Desktop (`xl`)** | `1024px – 1279px` | 12 columns | `48px (--space-12)` | `24px (--space-6)` |
| **Large Desktop (`2xl`)** | `1280px – 1440px` | 12 columns | `48px (--space-12)` | `24px (--space-6)` |
| **Ultrawide** | `≥ 1441px` | 12 columns (centered) | Auto | `32px (--space-8)` |

---

## 6. BORDER, RADIUS & SHADOW SYSTEM

### 6.1 Border Widths & Radii
- **Border Widths:**
  - Hairline: `1px` (`--border-width-hairline`)
  - Standard: `1.5px` (`--border-width-standard`)
  - Thick / Focus: `2px` (`--border-width-thick`)
- **Border Radii:**
  - Sharp / Architectural: `0px` (`--radius-none`)
  - Micro / Controls: `2px` (`--radius-xs`) — Used for buttons, inputs, pills
  - Cards & Containers: `4px` (`--radius-sm`)
  - Panels: `8px` (`--radius-md`)
  - Outer Modals: `12px` (`--radius-lg`)
  - Full Pill: `9999px` (`--radius-pill`)

### 6.2 Elevation Shadows & Kinetic Ambient Glows
- `--shadow-subtle`: `0 1px 2px rgba(0, 0, 0, 0.4)`
- `--shadow-card`: `0 4px 16px rgba(0, 0, 0, 0.6), 0 0 0 1px var(--border-default)`
- `--shadow-drawer`: `-8px 0 32px rgba(0, 0, 0, 0.85)`
- `--shadow-modal`: `0 20px 48px rgba(0, 0, 0, 0.9), 0 0 0 1px var(--border-crimson)`
- **Controlled Kinetic Glows:**
  - `--glow-red`: `0 0 24px rgba(196, 20, 32, 0.25)` (Active cards, secondary button hover)
  - `--glow-red-strong`: `0 0 36px rgba(196, 20, 32, 0.45)` (Major hero focus, drop banner)
  - `--glow-orange`: `0 0 20px rgba(255, 74, 22, 0.30)` (Primary button hover ignition)
  - `--glow-gold`: `0 0 16px rgba(255, 197, 46, 0.35)` (Status pulse dot, live badge)

---

## 7. MOTION & TRANSITIONS

### 7.1 Durations & Velocity Easing
- Fast: `120ms` (`--duration-fast`)
- Standard: `200ms` (`--duration-normal`)
- Slow: `350ms` (`--duration-slow`)
- **Velocity Curve:** `cubic-bezier(0.16, 1, 0.3, 1)`  
  *Characteristics:* High initial acceleration followed by instant, sharp deceleration. Captures the physics of high-speed kinetic motion without bouncy or cartoonish physics.

### 7.2 Accessibility (`prefers-reduced-motion`)
When the user requests reduced motion at the OS level, all motion durations are collapsed to `0ms` and transforms are disabled to guarantee comfort and safety.

---

## 8. COMPONENT INTERACTION SPECIFICATIONS

### 8.1 Primary Action Button (`.btn-primary`)
- **Default:** Background `var(--color-flash-red)` (`#C41420`), Text `var(--color-pure-white)` (`#FFFFFF`), Border `1px solid var(--color-flash-red)`.
- **Hover:** Background `var(--color-electric-orange)` (`#FF4A16`), Border `var(--color-electric-orange)`, Glow `var(--glow-orange)`, `translateY(-1px)`.
- **Active:** Background `var(--color-flash-red)`, `translateY(0px)`, Glow cleared.
- **Focus-Visible:** `box-shadow: 0 0 0 2px var(--color-obsidian), 0 0 0 4px var(--color-flash-red)`.
- **Disabled:** Background `rgba(133, 133, 141, 0.12)`, Text `rgba(133, 133, 141, 0.45)`, Border `rgba(133, 133, 141, 0.2)`.

### 8.2 Secondary Button (`.btn-secondary`)
- **Default:** Background transparent, Text `var(--color-cloud-white)` (`#F5F5F5`), Border `1px solid var(--color-deep-crimson)` (`#650B12`).
- **Hover:** Border `var(--color-flash-red)`, Background `rgba(196, 20, 32, 0.14)`, Text `var(--color-pure-white)`, Glow `var(--glow-red)`.
- **Active:** Background `rgba(196, 20, 32, 0.25)`.

### 8.3 Status & Drop Badges
- **Lightning Strike Badge (`.badge-strike`):** Translucent crimson background (`rgba(196, 20, 32, 0.14)`), Lightning Gold border (`rgba(255, 197, 46, 0.45)`), Lightning Gold text, and an animated pulsing dot (`animation: strike-pulse 1.6s infinite`).
- **Archival Edition Badge (`.badge-edition`):** Raised dark surface, Deep Crimson border, Ash Grey / Gold text in `JetBrains Mono`.

### 8.4 Form Controls (`.input-field`)
- **Default:** Background `#120D0F`, Border `1px solid #3E161C`, Text `#F5F5F5`, Placeholder `#85858D`.
- **Hover:** Border `#650B12`.
- **Focus:** Border `var(--color-flash-red)`, Box-shadow focus ring + subtle red glow, Background `#1A1215`.
- **Error:** Border `var(--color-flash-red) !important`.

---

## 9. LIGHTNING STRIKE VISUAL USAGE RULES

### Rules for Application
1. **Black and Deep Crimson as Foundations:** 80% of any view must consist of dark obsidian surfaces and crimson depth.
2. **Flash Red for Dominance:** Used for all primary actions, focal headlines, and active tab indicators.
3. **Electric Orange for Kinetic Energy:** Reserved for interactive hover states, dynamic energy gradients, and active alerts.
4. **Lightning Gold for Micro-Sparks:** Strictly constrained to ≤2% area (status indicators, registration dots, coordinate stamps).

### Prohibitions
- **NO large bright yellow or gold backgrounds.**
- **NO blinding neon glow overlays that impair text readability.**
- **NO multi-colored rainbow gradients.**
- **NO rounded cartoonish buttons or bubbly UI elements.**

---
*FLASHWEAR Design System & Token Specification — Production Ready.*
