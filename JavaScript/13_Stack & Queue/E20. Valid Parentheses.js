// 20. Valid Parentheses
// https://leetcode.com/problems/valid-parentheses/

// Time Complexity: O(n)
// Space Complexity: O(n)

/**
 * Check if a string of parentheses is valid
 * @param {string} s - String containing parentheses
 * @returns {boolean} - True if valid
 */
function isValid(s) {
    const stack = [];

    for (const c of s) {
        if (c === '(' || c === '[' || c === '{') {
            stack.push(c); // push opening bracket
        } else {
            if (stack.length === 0) return false; // empty stack
            const open = stack.pop(); // pop
            if (c === ')' && open !== '(') return false;
            if (c === ']' && open !== '[') return false;
            if (c === '}' && open !== '{') return false;
        }
    }

    return stack.length === 0;
}

// Test cases
console.log(isValid("()")); // true
console.log(isValid("()[]{}")); // true
console.log(isValid("(]")); // false
console.log(isValid("([)]")); // false
console.log(isValid("{[]}")); // true
console.log(isValid("")); // true
console.log(isValid("(((")); // false