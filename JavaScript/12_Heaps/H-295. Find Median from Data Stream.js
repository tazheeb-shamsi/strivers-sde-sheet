// 295. Find Median from Data Stream
// https://leetcode.com/problems/find-median-from-data-stream/

// Time Complexity: O(log n) for addNum, O(1) for findMedian
// Space Complexity: O(n)

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
 * MedianFinder to find median from a data stream
 */
function createMedianFinder() {
    const maxHeap = createMaxHeap(); // left half (smaller elements)
    const minHeap = createMinHeap(); // right half (larger elements)

    function addNum(num) {
        if (maxHeap.size() === 0 || maxHeap.peek() >= num) {
            maxHeap.push(num);
        } else {
            minHeap.push(num);
        }

        // Balance the heaps
        if (maxHeap.size() > minHeap.size() + 1) {
            minHeap.push(maxHeap.pop());
        } else if (minHeap.size() > maxHeap.size()) {
            maxHeap.push(minHeap.pop());
        }
    }

    function findMedian() {
        if (maxHeap.size() === minHeap.size()) {
            return (maxHeap.peek() + minHeap.peek()) / 2.0;
        }
        return maxHeap.peek();
    }

    return { addNum, findMedian };
}

// Test cases
const medianFinder = createMedianFinder();
medianFinder.addNum(1);
medianFinder.addNum(2);
console.log(medianFinder.findMedian()); // 1.5
medianFinder.addNum(3);
console.log(medianFinder.findMedian()); // 2.0
medianFinder.addNum(4);
console.log(medianFinder.findMedian()); // 2.5
