/**
 * 703. Kth Largest Element in a Stream
 * https://leetcode.com/problems/kth-largest-element-in-a-stream/
 *
 * Type             | Details
 * -----------------+----------------------------------------------------
 * Time Complexity  | O(N log K) for constructor, O(log K) for add
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
 * Creates a KthLargest finder (functional approach)
 * @param {number} k - K value
 * @param {number[]} nums - Initial numbers
 * @returns {Object} KthLargest operations
 */
function createKthLargest(k, nums) {
    const minHeap = createMinHeap();
    
    // Add all initial numbers
    for (const num of nums) {
        addInternal(num);
    }

    function addInternal(val) {
        minHeap.push(val);
        if (minHeap.size() > k) {
            minHeap.pop();
        }
    }

    function add(val) {
        addInternal(val);
        return minHeap.peek();
    }

    return { add };
}

// Test cases
const k = 3;
const nums = [4, 5, 8, 2];

const kthLargest = createKthLargest(k, nums);

console.log(kthLargest.add(3));  // returns 4
console.log(kthLargest.add(5));  // returns 5
console.log(kthLargest.add(10)); // returns 5
console.log(kthLargest.add(9));  // returns 8
console.log(kthLargest.add(4));  // returns 8
