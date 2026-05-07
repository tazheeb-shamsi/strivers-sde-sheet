// 460. LFU Cache
// https://leetcode.com/problems/lfu-cache/

/**
 * Creates an LFU Cache (functional approach)
 * @param {number} capacity - Maximum capacity
 * @returns {Object} LFUCache operations
 */
function createLFUCache(capacity) {
    const keyToVal = new Map();
    const keyToFreq = new Map();
    const freqToKeys = new Map();
    let minFreq = 0;

    function updateFreq(key) {
        const freq = keyToFreq.get(key);
        keyToFreq.set(key, freq + 1);
        
        // Remove from current frequency list
        freqToKeys.get(freq).delete(key);
        if (freqToKeys.get(freq).size === 0) {
            freqToKeys.delete(freq);
            if (minFreq === freq) minFreq++;
        }
        
        // Add to new frequency list
        if (!freqToKeys.has(freq + 1)) {
            freqToKeys.set(freq + 1, new Set());
        }
        freqToKeys.get(freq + 1).add(key);
    }

    function get(key) {
        if (!keyToVal.has(key)) return -1;
        updateFreq(key);
        return keyToVal.get(key);
    }

    function put(key, value) {
        if (capacity === 0) return;
        
        if (keyToVal.has(key)) {
            keyToVal.set(key, value);
            updateFreq(key);
            return;
        }
        
        if (keyToVal.size >= capacity) {
            // Remove LFU key (first in minFreq set)
            const keysAtMinFreq = freqToKeys.get(minFreq);
            const keyToRemove = keysAtMinFreq.values().next().value;
            keysAtMinFreq.delete(keyToRemove);
            if (keysAtMinFreq.size === 0) {
                freqToKeys.delete(minFreq);
            }
            keyToVal.delete(keyToRemove);
            keyToFreq.delete(keyToRemove);
        }
        
        keyToVal.set(key, value);
        keyToFreq.set(key, 1);
        if (!freqToKeys.has(1)) {
            freqToKeys.set(1, new Set());
        }
        freqToKeys.get(1).add(key);
        minFreq = 1;
    }

    return { get, put };
}

// Test cases
const lfu = createLFUCache(2);
lfu.put(1, 1);
lfu.put(2, 2);
console.log(lfu.get(1));      // 1
lfu.put(3, 3);                // evicts key 2
console.log(lfu.get(2));      // -1
console.log(lfu.get(3));      // 3
lfu.put(4, 4);                // evicts key 1
console.log(lfu.get(1));      // -1
console.log(lfu.get(3));      // 3
console.log(lfu.get(4));      // 4
