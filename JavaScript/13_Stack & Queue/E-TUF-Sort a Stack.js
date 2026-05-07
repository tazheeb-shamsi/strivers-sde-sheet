// Sort a Stack
// https://takeuforward.org/plus/dsa/problems/sort-a-stack

// Problem Statement: Sort a Stack
// You are given a stack of integers.
// Your task is to sort the stack in descending order using recursion,
// such that the top of the stack contains the greatest element.
// You are not allowed to use any loop-based sorting methods.
// You may only use recursive operations and the standard stack operations.

/**
 * Insert element in sorted position in stack
 * @param {number[]} stack - Stack array
 * @param {number} val - Value to insert
 */
function insertSorted(stack, val) {
    if (stack.length === 0 || stack[stack.length - 1] <= val) {
        stack.push(val);
        return;
    }
    const temp = stack.pop();
    insertSorted(stack, val);
    stack.push(temp);
}

/**
 * Sort a stack in descending order (greatest on top)
 * @param {number[]} stack - Stack array to sort
 */
function sortStack(stack) {
    if (stack.length === 0 || stack.length === 1) return;

    const temp = stack.pop();
    sortStack(stack);
    insertSorted(stack, temp);
}

// Test cases
const stack1 = [3, 1, 4, 2];
console.log("Before sorting:", [...stack1]); // [3, 1, 4, 2]
sortStack(stack1);
console.log("After sorting:", stack1); // [1, 2, 3, 4] (4 is on top)

const stack2 = [5, 2, 8, 1, 9];
sortStack(stack2);
console.log("Sorted stack:", stack2); // [1, 2, 5, 8, 9] (9 is on top)

// Pop all elements to see sorted order
while (stack2.length > 0) {
process.stdout.write(stack2.pop() + " "); // 9 8 5 2 1
}
console.log();