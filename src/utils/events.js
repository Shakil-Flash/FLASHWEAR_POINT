/**
 * FLASHWEAR FRONTEND ARCHITECTURE — EVENT BUS
 * Centralized, decoupled event emitter for reactive cross-component communication
 * without prop drilling (e.g. cart badge updates, drawer toggles, notifications).
 */

class EventEmitter {
  constructor() {
    this.events = new Map();
  }

  /**
   * Subscribe to an event. Returns an unsubscribe function.
   * @param {string} eventName
   * @param {Function} handler
   * @returns {Function} unsubscribe
   */
  on(eventName, handler) {
    if (!this.events.has(eventName)) {
      this.events.set(eventName, new Set());
    }
    this.events.get(eventName).add(handler);

    return () => this.off(eventName, handler);
  }

  /**
   * Unsubscribe a handler from an event.
   * @param {string} eventName
   * @param {Function} handler
   */
  off(eventName, handler) {
    if (!this.events.has(eventName)) return;
    this.events.get(eventName).delete(handler);
    if (this.events.get(eventName).size === 0) {
      this.events.delete(eventName);
    }
  }

  /**
   * Emit an event to all subscribed listeners.
   * @param {string} eventName
   * @param {*} data
   */
  emit(eventName, data) {
    if (!this.events.has(eventName)) return;
    this.events.get(eventName).forEach((handler) => {
      try {
        handler(data);
      } catch (err) {
        console.error(`[EventBus] Error in handler for event "${eventName}":`, err);
      }
    });
  }

  /**
   * Clear all registered event listeners.
   */
  clear() {
    this.events.clear();
  }
}

export const eventBus = new EventEmitter();
