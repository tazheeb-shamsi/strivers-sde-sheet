/**
 * 347. Top K Frequent Elements
 * https://leetcode.com/problems/top-k-frequent-elements/
 *
 * Type             | Details
 * -----------------+----------------------------------------------------
 * Time Complexity  | O(N log K) – Using max heap of size K
 * Space Complexity | O(N) – Frequency map
 */

/**
 * Creates a MaxHeap by frequency (functional approach)
 * @returns {Object} MaxHeap operations
 */
function createMaxHeapByFreq() {
    const heap = []; // [freq, num]

    function size() { return heap.length; }
    function peek() { return heap[0]; }

    function push(val) {
        heap.push(val);
        bubbleUp(heap.length - 1);
    }

    function pop() {
        if (heap.length === 0) return undefined;
        if (heap.length === 1) return heap.pop();
        const max = heap[0];
        heap[0] = heap.pop();
        bubbleDown(0);
        return max;
    }

    function bubbleUp(idx) {
        while (idx > 0) {
            const parent = Math.floor((idx - 1) / 2);
            if (heap[parent][0] >= heap[idx][0]) break;
            [heap[parent], heap[idx]] = [heap[idx], heap[parent]];
            idx = parent;
        }
    }

    function bubbleDown(idx) {
        while (true) {
            let largest = idx;
            const left = 2 * idx + 1;
            const right = 2 * idx + 2;
            if (left < heap.length && heap[left][0] > heap[largest][0]) largest = left;
            if (right < heap.length && heap[right][0] > heap[largest][0]) largest = right;
            if (largest === idx) break;
            [heap[idx], heap[largest]] = [heap[largest], heap[idx]];
            idx = largest;
        }
    }

    return { size, peek, push, pop };
}

/**
 * Find the k most frequent elements
 * @param {number[]} nums - Input array
 * @param {number} k - Number of top frequent elements
 * @returns {number[]} - K most frequent elements
 */
function topKFrequent(nums, k) {
    // Count frequencies
    const freqMap = new Map();
    for (const num of nums) {
        freqMap.set(num, (freqMap.get(num) || 0) + 1);
    }
    
    // Build max heap
    const maxHeap = createMaxHeapByFreq();
    for (const [num, freq] of freqMap) {
        maxHeap.push([freq, num]);
    }
    
    // Extract top k
    const result = [];
    for (let i = 0; i < k; i++) {
        result.push(maxHeap.pop()[1]);
    }
    
    return result;
}

// Alternative using bucket sort (O(N) time)
function topKFrequentBucket(nums, k) {
    const freqMap = new Map();
    for (const num of nums) {
        freqMap.set(num, (freqMap.get(num) || 0) + 1);
    }
    
    // Bucket sort: bucket[i] = numbers with frequency i
    const buckets = new Array(nums.length + 1).fill(null).map(() => []);
    for (const [num, freq] of freqMap) {
        buckets[freq].push(num);
    }
    
    const result = [];
    for (let i = buckets.length - 1; i >= 0 && result.length < k; i--) {
        result.push(...buckets[i]);
    }
    
    return result.slice(0, k);
}

// Test cases
const nums = [1, 1, 1, 2, 2, 3];
const k = 2;

console.log("Top", k, "frequent (heap):", topKFrequent(nums, k)); // [1, 2]
console.log("Top", k, "frequent (bucket):", topKFrequentBucket(nums, k)); // [1, 2]

const nums2 = [1];
console.log("Top 1 frequent:", topKFrequent(nums2, 1)); // [1]
