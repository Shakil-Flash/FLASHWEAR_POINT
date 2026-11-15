/**
 * FLASHWEAR FRONTEND ARCHITECTURE — SAFE STORAGE ACCESS
 * Wraps browser localStorage with an in-memory fallback for environments
 * with disabled cookies, private browsing, or automated tests.
 */

class MemoryStorage {
  constructor() {
    this.store = new Map();
  }
  getItem(key) {
    return this.store.get(key) || null;
  }
  setItem(key, value) {
    this.store.set(key, String(value));
  }
  removeItem(key) {
    this.store.delete(key);
  }
  clear() {
    this.store.clear();
  }
}

// Detect localStorage availability safely
function getStorageBackend() {
  try {
    if (typeof window !== 'undefined' && 'localStorage' in window) {
      const testKey = '__fw_test__';
      window.localStorage.setItem(testKey, testKey);
      window.localStorage.removeItem(testKey);
      return window.localStorage;
    }
  } catch (e) {
    // Falls back to MemoryStorage on SecurityError or QuotaExceeded
  }
  return new MemoryStorage();
}

const backend = getStorageBackend();

export const storage = {
  /**
   * Retrieve parsed JSON item or fallback default.
   */
  get(key, defaultValue = null) {
    try {
      const raw = backend.getItem(key);
      if (raw === null || raw === undefined) return defaultValue;
      return JSON.parse(raw);
    } catch (err) {
      console.warn(`[storage] Error reading key "${key}":`, err);
      return defaultValue;
    }
  },

  /**
   * Save item as serialized JSON.
   */
  set(key, value) {
    try {
      backend.setItem(key, JSON.stringify(value));
      return true;
    } catch (err) {
      console.warn(`[storage] Error writing key "${key}":`, err);
      return false;
    }
  },

  /**
   * Remove item from storage.
   */
  remove(key) {
    try {
      backend.removeItem(key);
      return true;
    } catch (err) {
      return false;
    }
  },

  /**
   * Clear all stored items.
   */
  clear() {
    try {
      backend.clear();
      return true;
    } catch (err) {
      return false;
    }
  }
};
