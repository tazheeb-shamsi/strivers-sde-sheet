// Implement Stack using Arrays (LIFO)
// https://takeuforward.org/plus/dsa/problems/implement-stack-using-arrays

/**
 * Creates a stack using array (functional approach)
 * @param {number} capacity - Maximum capacity of the stack
 * @returns {Object} Stack operations
 */
function createArrayStack(capacity = 1000) {
    const arr = new Array(capacity);
    let top = -1;

    function push(x) {
        if (top === capacity - 1) {
            throw new Error("Stack overflow");
        }
        arr[++top] = x;
    }

    function pop() {
        if (isEmpty()) {
            throw new Error("Stack underflow");
        }
        return arr[top--];
    }

    function peek() {
        if (isEmpty()) {
            throw new Error("Stack is empty");
        }
        return arr[top];
    }

    function isEmpty() {
        return top === -1;
    }

    function size() {
        return top + 1;
    }

    return { push, pop, peek, isEmpty, size };
}

// Test cases
const stack = createArrayStack();
stack.push(5);
stack.push(10);
console.log(stack.peek()); // 10
console.log(stack.pop()); // 10
console.log(stack.isEmpty()); // false
console.log(stack.size()); // 1
stack.push(20);
stack.push(30);
console.log(stack.pop()); // 30
console.log(stack.peek()); // 20
