type CacheItem<T> = {
  data: T;
  timestamp: number;
};

// cache em memória (RAM)
const memoryCache = new Map<string, CacheItem<any>>();

// tempo de vida do cache (TTL: Time To Live) -> 10min
const CACHE_TTL = 1000 * 60 * 10; 

export function getCache<T>(key: string): T | null {
  const now = Date.now();

  const memoryItem = memoryCache.get(key);
  if (memoryItem && now - memoryItem.timestamp < CACHE_TTL) {
    return memoryItem.data;
  }

  // se não estiver na RAM, tenta buscar no localStorage
  const stored = localStorage.getItem(key);
  if (stored) {
    const parsed: CacheItem<T> = JSON.parse(stored);
    if (now - parsed.timestamp < CACHE_TTL) {
      memoryCache.set(key, parsed);
      return parsed.data;
    }
  }

  return null;
}

export function setCache<T>(key: string, data: T) {
  const item: CacheItem<T> = {
    data,
    timestamp: Date.now(),
  };

  memoryCache.set(key, item);
  localStorage.setItem(key, JSON.stringify(item));
}
