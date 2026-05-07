// 146. LRU Cache
// https://leetcode.com/problems/lru-cache/

/**
 * Creates an LRU Cache (functional approach)
 * Uses Map to maintain insertion order
 * @param {number} capacity - Maximum capacity
 * @returns {Object} LRUCache operations
 */
function createLRUCache(capacity) {
    const cache = new Map();

    function get(key) {
        if (!cache.has(key)) return -1;
        
        // Move to end (most recently used)
        const value = cache.get(key);
        cache.delete(key);
        cache.set(key, value);
        return value;
    }

    function put(key, value) {
        if (cache.has(key)) {
            cache.delete(key);
        } else if (cache.size >= capacity) {
            // Remove least recently used (first item)
            const firstKey = cache.keys().next().value;
            cache.delete(firstKey);
        }
        cache.set(key, value);
    }

    return { get, put };
}

// Test cases
const lRUCache = createLRUCache(2);
lRUCache.put(1, 1);
lRUCache.put(2, 2);
console.log(lRUCache.get(1));    // 1
lRUCache.put(3, 3);              // evicts key 2
console.log(lRUCache.get(2));    // -1 (not found)
lRUCache.put(4, 4);              // evicts key 1
console.log(lRUCache.get(1));    // -1 (not found)
console.log(lRUCache.get(3));    // 3
console.log(lRUCache.get(4));    // 4
