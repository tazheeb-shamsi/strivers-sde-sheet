// CodingNinja: Max heap, Min Heap Implementation --> Only for Interview
// https://www.naukri.com/code360/problems/min-heap_4691801
// Company Tag: Adobe, Amazon, Flipkart

// Problem Statement:
// Implement the Min Heap data structure.
// You will be given 2 types of queries:
// 0 X - Insert X in the heap.
// 1 - Print the minimum element from the heap and remove it.

/**
 * MinHeap implementation
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
 * MaxHeap implementation
 */
function createMaxHeap() {
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
        const max = heap[0];
        const last = heap.pop();
        if (heap.length > 0) {
            heap[0] = last;
            bubbleDown(0);
        }
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
        const n = heap.length;
        while (true) {
            let largest = idx;
            const left = 2 * idx + 1;
            const right = 2 * idx + 2;
            if (left < n && heap[left] > heap[largest]) largest = left;
            if (right < n && heap[right] > heap[largest]) largest = right;
            if (largest === idx) break;
            [heap[largest], heap[idx]] = [heap[idx], heap[largest]];
            idx = largest;
        }
    }

    return { size, peek, push, pop };
}

/**
 * Process min heap queries
 * @param {number} n - Number of queries
 * @param {number[][]} q - Array of queries
 * @returns {number[]} - Results of extraction queries
 */
function minHeapQueries(n, q) {
    const result = [];
    const minHeap = createMinHeap();

    for (const query of q) {
        if (query[0] === 0) {
            minHeap.push(query[1]);
        } else {
            result.push(minHeap.pop());
        }
    }

    return result;
}

// Test cases
const queries = [
    [0, 5],
    [0, 3],
    [0, 1],
    [1],
    [0, 2],
    [1],
];
console.log(minHeapQueries(queries.length, queries)); // [1, 2]

// Test MinHeap
const minHeap = createMinHeap();
minHeap.push(5);
minHeap.push(3);
minHeap.push(8);
minHeap.push(1);
console.log(minHeap.pop()); // 1
console.log(minHeap.pop()); // 3

// Test MaxHeap
const maxHeap = createMaxHeap();
maxHeap.push(5);
maxHeap.push(3);
maxHeap.push(8);
maxHeap.push(1);
console.log(maxHeap.pop()); // 8
console.log(maxHeap.pop()); // 5
