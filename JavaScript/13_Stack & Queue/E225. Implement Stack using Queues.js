// 225. Implement Stack using Queues
// https://leetcode.com/problems/implement-stack-using-queues/

/**
 * Creates a stack using queues (functional approach)
 * Uses single queue - push is O(n), pop/top are O(1)
 * @returns {Object} Stack operations
 */
function createMyStack() {
    let queue = [];

    function push(x) {
        queue.push(x);
        // Rotate all elements except the last one
        for (let i = 0; i < queue.length - 1; i++) {
            queue.push(queue.shift());
        }
    }

    function pop() {
        return queue.shift();
    }

    function top() {
        return queue[0];
    }

    function empty() {
        return queue.length === 0;
    }

    return { push, pop, top, empty };
}

// Test cases
const myStack = createMyStack();
myStack.push(1);
myStack.push(2);
console.log(myStack.top());   // 2
console.log(myStack.pop());   // 2
console.log(myStack.empty()); // false
console.log(myStack.pop());   // 1
console.log(myStack.empty()); // true
