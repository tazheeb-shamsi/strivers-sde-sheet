// 232. Implement Queue using Stacks
// https://leetcode.com/problems/implement-queue-using-stacks/

/**
 * Creates a queue using stacks (functional approach)
 * Uses two stacks - amortized O(1) for all operations
 * @returns {Object} Queue operations
 */
function createMyQueue() {
    let stackIn = [];
    let stackOut = [];

    function push(x) {
        stackIn.push(x);
    }

    function pop() {
        peek(); // Ensure stackOut has elements
        return stackOut.pop();
    }

    function peek() {
        if (stackOut.length === 0) {
            while (stackIn.length > 0) {
                stackOut.push(stackIn.pop());
            }
        }
        return stackOut[stackOut.length - 1];
    }

    function empty() {
        return stackIn.length === 0 && stackOut.length === 0;
    }

    return { push, pop, peek, empty };
}

// Test cases
const myQueue = createMyQueue();
myQueue.push(1);
myQueue.push(2);
console.log(myQueue.peek());  // 1
console.log(myQueue.pop());   // 1
console.log(myQueue.empty()); // false
myQueue.push(3);
console.log(myQueue.pop());   // 2
console.log(myQueue.pop());   // 3
console.log(myQueue.empty()); // true
