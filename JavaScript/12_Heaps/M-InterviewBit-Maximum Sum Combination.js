// Maximum Sum Combination
// https://www.interviewbit.com/problems/maximum-sum-combinations/

// Problem Statement:
// Given two arrays A and B of size N each. Find the maximum N elements from the sum combinations (Ai + Bj).

/**
 * MaxHeap implementation for sum combinations
 */
function createMaxHeap() {
    const heap = [];

    function size() {
        return heap.length;
    }

    function isEmpty() {
        return heap.length === 0;
    }

    function push(item) {
        heap.push(item);
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
            if (heap[parent][0] >= heap[idx][0]) break;
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
            if (left < n && heap[left][0] > heap[largest][0]) largest = left;
            if (right < n && heap[right][0] > heap[largest][0]) largest = right;
            if (largest === idx) break;
            [heap[largest], heap[idx]] = [heap[idx], heap[largest]];
            idx = largest;
        }
    }

    return { size, isEmpty, push, pop };
}

/**
 * Find maximum C sum combinations from arrays A and B
 * @param {number[]} A - First array
 * @param {number[]} B - Second array
 * @param {number} C - Number of maximum sums to find
 * @returns {number[]} - Array of C maximum sums
 */
function solve(A, B, C) {
    const n = A.length;

    // Sort both arrays in descending order
    A.sort((a, b) => b - a);
    B.sort((a, b) => b - a);

    // Max heap to store [sum, i, j]
    const pq = createMaxHeap();
    const visited = new Set();

    // Start with the maximum possible sum
    pq.push([A[0] + B[0], 0, 0]);
    visited.add("0,0");

    const result = [];

    while (result.length < C && !pq.isEmpty()) {
        const [sum, i, j] = pq.pop();
        result.push(sum);

        // Add next possible combinations
        if (i + 1 < n && !visited.has(`${i + 1},${j}`)) {
            pq.push([A[i + 1] + B[j], i + 1, j]);
            visited.add(`${i + 1},${j}`);
        }

        if (j + 1 < n && !visited.has(`${i},${j + 1}`)) {
            pq.push([A[i] + B[j + 1], i, j + 1]);
            visited.add(`${i},${j + 1}`);
        }
    }

    return result;
}

// Test cases
console.log(solve([1, 4, 2, 3], [2, 5, 1, 6], 4)); // [10, 9, 9, 8]
console.log(solve([5, 3, 1], [5, 3, 1], 3)); // [10, 8, 8]
console.log(solve([1, 2], [3, 4], 2)); // [6, 5]
