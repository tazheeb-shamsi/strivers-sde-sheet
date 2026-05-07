// 155. Min Stack
// https://leetcode.com/problems/min-stack/

/**
 * Creates a min stack (functional approach)
 * Supports push, pop, top, and getMin in O(1) time
 * @returns {Object} MinStack operations
 */
function createMinStack() {
    const stack = [];
    const minStack = [];

    function push(val) {
        stack.push(val);
        if (minStack.length === 0 || val <= minStack[minStack.length - 1]) {
            minStack.push(val);
        }
    }

    function pop() {
        const val = stack.pop();
        if (val === minStack[minStack.length - 1]) {
            minStack.pop();
        }
    }

    function top() {
        return stack[stack.length - 1];
    }

    function getMin() {
        return minStack[minStack.length - 1];
    }

    return { push, pop, top, getMin };
}

// Test cases
const minStack = createMinStack();
minStack.push(-2);
minStack.push(0);
minStack.push(-3);
console.log(minStack.getMin()); // -3
minStack.pop();
console.log(minStack.top());    // 0
console.log(minStack.getMin()); // -2
