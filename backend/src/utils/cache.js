const config = require('../config/config');

class Cache {
  constructor() {
    this.cache = new Map();
    this.duration = config.cacheDuration;
  }

  set(key, value) {
    const item = {
      value,
      timestamp: Date.now()
    };
    this.cache.set(key, item);
  }

  get(key) {
    const item = this.cache.get(key);
    if (!item) return null;

    const now = Date.now();
    if (now - item.timestamp > this.duration) {
      this.cache.delete(key);
      return null;
    }

    return item.value;
  }

  clear() {
    this.cache.clear();
  }
}

module.exports = new Cache(); 