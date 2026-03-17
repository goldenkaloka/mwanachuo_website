/**
 * Centralized utility for safe localStorage operations.
 * Prevents app crashes due to QuotaExceededError or JSON parse errors.
 */

const STORAGE_PREFIX = "mwanachuo_";

export const cacheStore = {
  setItem: (key: string, value: any) => {
    try {
      localStorage.setItem(`${STORAGE_PREFIX}${key}`, JSON.stringify(value));
    } catch (e) {
      console.warn("[CacheStore] Set item failed:", e);
      // If we're out of space, clear old cache items
      if (e instanceof DOMException && e.name === "QuotaExceededError") {
        cacheStore.clearAppCache();
      }
    }
  },

  getItem: <T>(key: string): T | null => {
    try {
      const saved = localStorage.getItem(`${STORAGE_PREFIX}${key}`);
      if (!saved) return null;
      return JSON.parse(saved) as T;
    } catch (e) {
      console.warn("[CacheStore] Get item failed:", e);
      return null;
    }
  },

  removeItem: (key: string) => {
    try {
      localStorage.removeItem(`${STORAGE_PREFIX}${key}`);
    } catch (e) {
      console.error("[CacheStore] Remove item failed:", e);
    }
  },

  /**
   * Clears all items prefixed with our storage key.
   * Useful for logout cleanup.
   */
  clearAppCache: () => {
    try {
      const keysToRemove: string[] = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && (key.startsWith(STORAGE_PREFIX) || key.startsWith("cached") || key.startsWith("selected_university"))) {
          keysToRemove.push(key);
        }
      }
      keysToRemove.forEach(key => localStorage.removeItem(key));
    } catch (e) {
      console.error("[CacheStore] Global clear failed:", e);
    }
  }
};
