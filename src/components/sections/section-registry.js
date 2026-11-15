/**
 * FLASHWEAR FRONTEND ARCHITECTURE — HOMEPAGE SECTION REGISTRY
 * Manages the composition and lifecycle of independent homepage sections.
 * Guarantees that future phases can register and mount modular sections
 * without tightly coupling components or creating monolithic files.
 */

export class SectionRegistry {
  constructor() {
    this.sections = new Map();
    this.executionOrder = [];
  }

  /**
   * Register a section definition.
   * @param {string} sectionId - Unique identifier (e.g. 'hero', 'featured_grid')
   * @param {Object} sectionDefinition
   * @param {Function} sectionDefinition.render - Function returning DOM node or HTML
   * @param {Function} [sectionDefinition.init] - Lifecycle post-mount init hook
   * @param {number} [priority=100] - Render order priority (lower runs earlier)
   */
  register(sectionId, sectionDefinition, priority = 100) {
    if (!sectionId || typeof sectionDefinition?.render !== 'function') {
      console.warn(`[SectionRegistry] Invalid registration for section: ${sectionId}`);
      return;
    }

    this.sections.set(sectionId, {
      id: sectionId,
      ...sectionDefinition,
      priority
    });

    this._sortOrder();
  }

  /**
   * Mount all registered sections into the target main content container.
   * @param {HTMLElement} container
   */
  mountAll(container) {
    if (!container) return;
    container.innerHTML = '';

    for (const sectionId of this.executionOrder) {
      const section = this.sections.get(sectionId);
      const sectionWrapper = document.createElement('section');
      sectionWrapper.id = `section-${section.id}`;
      sectionWrapper.className = `fw-section fw-section-${section.id}`;

      const rendered = section.render();
      if (typeof rendered === 'string') {
        sectionWrapper.innerHTML = rendered;
      } else if (rendered instanceof HTMLElement) {
        sectionWrapper.appendChild(rendered);
      }

      container.appendChild(sectionWrapper);

      if (typeof section.init === 'function') {
        try {
          section.init(sectionWrapper);
        } catch (err) {
          console.error(`[SectionRegistry] Error initializing section "${sectionId}":`, err);
        }
      }
    }
  }

  getRegisteredSections() {
    return [...this.executionOrder];
  }

  _sortOrder() {
    this.executionOrder = Array.from(this.sections.values())
      .sort((a, b) => a.priority - b.priority)
      .map((s) => s.id);
  }
}

export const sectionRegistry = new SectionRegistry();
