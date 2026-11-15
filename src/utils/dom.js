/**
 * FLASHWEAR FRONTEND ARCHITECTURE — DOM UTILITIES
 * Safe browser helpers, debouncing, element creation, and accessibility toggles.
 */

/**
 * Standard debounce function for search inputs and scroll handlers.
 * @param {Function} fn
 * @param {number} delay
 * @returns {Function}
 */
export function debounce(fn, delay = 250) {
  let timer = null;
  return function (...args) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, args);
      timer = null;
    }, delay);
  };
}

/**
 * Throttle function for continuous events like window resizing or scroll.
 * @param {Function} fn
 * @param {number} limit
 * @returns {Function}
 */
export function throttle(fn, limit = 100) {
  let waiting = false;
  return function (...args) {
    if (!waiting) {
      fn.apply(this, args);
      waiting = true;
      setTimeout(() => {
        waiting = false;
      }, limit);
    }
  };
}

/**
 * Escape HTML to prevent XSS injection in dynamic template strings.
 * @param {string} str
 * @returns {string}
 */
export function escapeHTML(str) {
  if (typeof str !== 'string') return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/**
 * Trap focus within an open drawer or modal for accessibility.
 * @param {HTMLElement} element
 * @returns {Function} cleanup function to release focus trap
 */
export function trapFocus(element) {
  if (!element) return () => {};
  
  const focusables = element.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );
  if (!focusables.length) return () => {};

  const first = focusables[0];
  const last = focusables[focusables.length - 1];

  function handleKeyDown(e) {
    if (e.key !== 'Tab') return;

    if (e.shiftKey) {
      if (document.activeElement === first) {
        last.focus();
        e.preventDefault();
      }
    } else {
      if (document.activeElement === last) {
        first.focus();
        e.preventDefault();
      }
    }
  }

  element.addEventListener('keydown', handleKeyDown);
  first.focus();

  return () => {
    element.removeEventListener('keydown', handleKeyDown);
  };
}
