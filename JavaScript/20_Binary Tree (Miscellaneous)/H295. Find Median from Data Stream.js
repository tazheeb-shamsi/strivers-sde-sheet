/**
 * 295. Find Median from Data Stream
 * https://leetcode.com/problems/find-median-from-data-stream/
 *
 * Type             | Details
 * -----------------+----------------------------------------------------
 * Time Complexity  | O(log N) for addNum, O(1) for findMedian
 * Space Complexity | O(N) – Storing all elements in two heaps
 */

/**
 * Creates a MaxHeap (functional approach)
 * @returns {Object} MaxHeap operations
 */
function createMaxHeap() {
    const heap = [];

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
            if (heap[parent] >= heap[idx]) break;
            [heap[parent], heap[idx]] = [heap[idx], heap[parent]];
            idx = parent;
        }
    }

    function bubbleDown(idx) {
        while (true) {
            let largest = idx;
            const left = 2 * idx + 1;
            const right = 2 * idx + 2;
            if (left < heap.length && heap[left] > heap[largest]) largest = left;
            if (right < heap.length && heap[right] > heap[largest]) largest = right;
            if (largest === idx) break;
            [heap[idx], heap[largest]] = [heap[largest], heap[idx]];
            idx = largest;
        }
    }

    return { size, peek, push, pop };
}

/**
 * Creates a MinHeap (functional approach)
 * @returns {Object} MinHeap operations
 */
function createMinHeap() {
    const heap = [];

    function size() { return heap.length; }
    function peek() { return heap[0]; }

    function push(val) {
        heap.push(val);
        bubbleUp(heap.length - 1);
    }

    function pop() {
        if (heap.length === 0) return undefined;
        if (heap.length === 1) return heap.pop();
        const min = heap[0];
        heap[0] = heap.pop();
        bubbleDown(0);
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
        while (true) {
            let smallest = idx;
            const left = 2 * idx + 1;
            const right = 2 * idx + 2;
            if (left < heap.length && heap[left] < heap[smallest]) smallest = left;
            if (right < heap.length && heap[right] < heap[smallest]) smallest = right;
            if (smallest === idx) break;
            [heap[idx], heap[smallest]] = [heap[smallest], heap[idx]];
            idx = smallest;
        }
    }

    return { size, peek, push, pop };
}

/**
 * Creates a MedianFinder (functional approach)
 * Uses two heaps: maxHeap for lower half, minHeap for upper half
 * @returns {Object} MedianFinder operations
 */
function createMedianFinder() {
    const maxHeap = createMaxHeap(); // Lower half (max at top)
    const minHeap = createMinHeap(); // Upper half (min at top)

    function addNum(num) {
        // Add to maxHeap first
        maxHeap.push(num);
        
        // Balance: move max of lower half to upper half
        minHeap.push(maxHeap.pop());
        
        // Ensure maxHeap has equal or one more element
        if (minHeap.size() > maxHeap.size()) {
            maxHeap.push(minHeap.pop());
        }
    }

    function findMedian() {
        if (maxHeap.size() > minHeap.size()) {
            return maxHeap.peek();
        }
        return (maxHeap.peek() + minHeap.peek()) / 2;
    }

    return { addNum, findMedian };
}

// Test cases
const medianFinder = createMedianFinder();

medianFinder.addNum(1);
console.log("Median after [1]:", medianFinder.findMedian()); // 1

medianFinder.addNum(2);
console.log("Median after [1,2]:", medianFinder.findMedian()); // 1.5

medianFinder.addNum(3);
console.log("Median after [1,2,3]:", medianFinder.findMedian()); // 2

medianFinder.addNum(4);
console.log("Median after [1,2,3,4]:", medianFinder.findMedian()); // 2.5

medianFinder.addNum(5);
console.log("Median after [1,2,3,4,5]:", medianFinder.findMedian()); // 3
