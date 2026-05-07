// 215. Kth Largest Element in an Array
// https://leetcode.com/problems/kth-largest-element-in-an-array/

// Time Complexity: O(n log k)
// Space Complexity: O(k)

/**
 * MinHeap implementation for finding kth largest
 */
function createMinHeap() {
    const heap = [];

    function size() {
        return heap.length;
    }

    function peek() {
        return heap[0];
    }

    function push(val) {
        heap.push(val);
        bubbleUp(heap.length - 1);
    }

    function pop() {
        if (heap.length === 0) return undefined;
        const min = heap[0];
        const last = heap.pop();
        if (heap.length > 0) {
            heap[0] = last;
            bubbleDown(0);
        }
        return min;
    }

    function bubbleUp(idx) {
        while (idx > 0) {
            const parent = Math.floor((idx - 1) / 2);
            if (heap[parent] <= heap[idx]) break;
            [heap[parent], heap[idx]] = [heap[idx], heap[parent]];
            idx = parent;
        }
    }

    function bubbleDown(idx) {
        const n = heap.length;
        while (true) {
            let smallest = idx;
            const left = 2 * idx + 1;
            const right = 2 * idx + 2;
            if (left < n && heap[left] < heap[smallest]) smallest = left;
            if (right < n && heap[right] < heap[smallest]) smallest = right;
            if (smallest === idx) break;
            [heap[smallest], heap[idx]] = [heap[idx], heap[smallest]];
            idx = smallest;
        }
    }

    return { size, peek, push, pop };
}

/**
 * Find the kth largest element in an array
 * @param {number[]} nums - Array of numbers
 * @param {number} k - Position from largest (1-indexed)
 * @returns {number} - Kth largest element
 */
function findKthLargest(nums, k) {
    const pq = createMinHeap();

    for (const num of nums) {
        pq.push(num);
        if (pq.size() > k) {
            pq.pop();
        }
    }

    return pq.peek();
}

// Test cases
console.log(findKthLargest([3, 2, 1, 5, 6, 4], 2)); // 5
console.log(findKthLargest([3, 2, 3, 1, 2, 4, 5, 5, 6], 4)); // 4
console.log(findKthLargest([1], 1)); // 1
console.log(findKthLargest([7, 6, 5, 4, 3, 2, 1], 5)); // 3
