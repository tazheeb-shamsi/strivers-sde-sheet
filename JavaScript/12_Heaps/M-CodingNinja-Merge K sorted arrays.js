// CodingNinja: Merge K sorted arrays
// https://www.naukri.com/code360/problems/merge-k-sorted-arrays_975379

// Description:
// You have been given 'K' different arrays/lists, which are sorted individually (in ascending order).
// You need to merge all the given arrays/list such that the output array/list should be sorted in ascending order.

/**
 * MinHeap implementation for merging k sorted arrays
 * Stores [value, arrayIndex, elementIndex]
 */
function createMinHeap() {
    const heap = [];

    function size() {
        return heap.length;
    }

    function isEmpty() {
        return heap.length === 0;
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
            if (heap[parent][0] <= heap[idx][0]) break;
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
            if (left < n && heap[left][0] < heap[smallest][0]) smallest = left;
            if (right < n && heap[right][0] < heap[smallest][0]) smallest = right;
            if (smallest === idx) break;
            [heap[smallest], heap[idx]] = [heap[idx], heap[smallest]];
            idx = smallest;
        }
    }

    return { size, isEmpty, push, pop };
}

/**
 * Merge K sorted arrays into one sorted array
 * @param {number[][]} kArrays - Array of k sorted arrays
 * @param {number} k - Number of arrays
 * @returns {number[]} - Merged sorted array
 */
function mergeKSortedArrays(kArrays, k) {
    const pq = createMinHeap();
    const result = [];

    // Push first element of each array
    for (let i = 0; i < k; i++) {
        if (kArrays[i].length > 0) {
            pq.push([kArrays[i][0], i, 0]);
        }
    }

    // Extract min and add next element from same array
    while (!pq.isEmpty()) {
        const [val, arrIdx, elemIdx] = pq.pop();
        result.push(val);

        // If there's a next element in same array, add it
        if (elemIdx + 1 < kArrays[arrIdx].length) {
            pq.push([kArrays[arrIdx][elemIdx + 1], arrIdx, elemIdx + 1]);
        }
    }

    return result;
}

// Test cases
const kArrays1 = [
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9]
];
console.log(mergeKSortedArrays(kArrays1, 3)); // [1, 2, 3, 4, 5, 6, 7, 8, 9]

const kArrays2 = [
    [1, 3, 5, 7],
    [2, 4, 6, 8],
    [0, 9, 10, 11]
];
console.log(mergeKSortedArrays(kArrays2, 3)); // [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
