/**
 * 215. Kth Largest Element in an Unsorted Array
 * https://leetcode.com/problems/kth-largest-element-in-an-array/
 *
 * Type             | Details
 * -----------------+----------------------------------------------------
 * Time Complexity  | O(N log K) – Each insertion/removal is O(log K)
 * Space Complexity | O(K) – Min-heap stores at most K elements
 */

/**
 * Creates a MinHeap (functional approach)
 * @returns {Object} MinHeap operations
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
        if (heap.length === 1) return heap.pop();
        
        const min = heap[0];
        heap[0] = heap.pop();
        bubbleDown(0);
        return min;
    }

    function bubbleUp(index) {
        while (index > 0) {
            const parentIndex = Math.floor((index - 1) / 2);
            if (heap[parentIndex] <= heap[index]) break;
            [heap[parentIndex], heap[index]] = [heap[index], heap[parentIndex]];
            index = parentIndex;
        }
    }

    function bubbleDown(index) {
        const length = heap.length;
        while (true) {
            const leftChild = 2 * index + 1;
            const rightChild = 2 * index + 2;
            let smallest = index;

            if (leftChild < length && heap[leftChild] < heap[smallest]) {
                smallest = leftChild;
            }
            if (rightChild < length && heap[rightChild] < heap[smallest]) {
                smallest = rightChild;
            }
            if (smallest === index) break;

            [heap[index], heap[smallest]] = [heap[smallest], heap[index]];
            index = smallest;
        }
    }

    return { size, peek, push, pop };
}

/**
 * Find the kth largest element in an unsorted array
 * @param {number[]} nums - Input array
 * @param {number} k - K value
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
const nums = [3, 2, 1, 5, 6, 4];
const k = 2;

const result = findKthLargest(nums, k);
console.log("The " + k + "th largest element is:", result); // Output: 5
