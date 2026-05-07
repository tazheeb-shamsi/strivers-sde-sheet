// TUF: Find Maximum of Minimums for Every Window Size
// https://takeuforward.org/plus/dsa/problems/maximum-of-minimums-for-every-window-size

// Problem Statement:
// Given an array arr[] of size n, for every window size i from 1 to n,
// find the maximum of the minimum of all contiguous subarrays of size i.
// Return an array of size n where the i-th element contains the maximum of minimums for window size i + 1.

// Example:
// Input: arr = [10, 20, 30, 50, 10, 70, 30]
// Output: [70, 30, 20, 10, 10, 10, 10]

/**
 * Find maximum of minimums for every window size
 * @param {number[]} arr - Input array
 * @returns {number[]} - Array of maximum of minimums for each window size
 */
function maxOfMin(arr) {
    const n = arr.length;
    const left = new Array(n).fill(-1); // Previous smaller index
    const right = new Array(n).fill(n); // Next smaller index

    const stack = [];

    // Find previous smaller element index
    for (let i = 0; i < n; i++) {
        while (stack.length > 0 && arr[stack[stack.length - 1]] >= arr[i]) {
            stack.pop();
        }
        if (stack.length > 0) {
            left[i] = stack[stack.length - 1];
        }
        stack.push(i);
    }

    stack.length = 0; // Clear stack

    // Find next smaller element index
    for (let i = n - 1; i >= 0; i--) {
        while (stack.length > 0 && arr[stack[stack.length - 1]] >= arr[i]) {
            stack.pop();
        }
        if (stack.length > 0) {
            right[i] = stack[stack.length - 1];
        }
        stack.push(i);
    }

    // Result array
    const res = new Array(n).fill(-Infinity);

    // Fill res[length-1] with max of mins
    for (let i = 0; i < n; i++) {
        const length = right[i] - left[i] - 1;
        res[length - 1] = Math.max(res[length - 1], arr[i]);
    }

    // Fill empty entries from right to left
    for (let i = n - 2; i >= 0; i--) {
        res[i] = Math.max(res[i], res[i + 1]);
    }

    return res;
}

// Test cases
console.log(maxOfMin([10, 20, 30, 50, 10, 70, 30])); // [70, 30, 20, 10, 10, 10, 10]
console.log(maxOfMin([10, 20, 30])); // [30, 20, 10]
console.log(maxOfMin([5, 1, 3, 2, 4])); // [5, 3, 2, 1, 1]