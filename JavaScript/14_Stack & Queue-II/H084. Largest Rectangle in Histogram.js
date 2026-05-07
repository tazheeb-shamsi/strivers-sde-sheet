// 84. Largest Rectangle in Histogram
// https://leetcode.com/problems/largest-rectangle-in-histogram

// Given an array of integers heights representing the histogram's bar height
// where the width of each bar is 1, return the area of the largest rectangle in the histogram.

// Example:
// Input: heights = [2,1,5,6,2,3]
// Output: 10

/**
 * Find the largest rectangle area in histogram
 * @param {number[]} heights - Array of bar heights
 * @returns {number} - Maximum rectangle area
 */
function largestRectangleArea(heights) {
    const n = heights.length;
    const left = new Array(n); // Previous smaller index
    const right = new Array(n); // Next smaller index
    const stack = [];

    // Fill left array - find previous smaller element index
    for (let i = 0; i < n; i++) {
        while (stack.length > 0 && heights[stack[stack.length - 1]] >= heights[i]) {
            stack.pop();
        }
        left[i] = stack.length === 0 ? -1 : stack[stack.length - 1];
        stack.push(i);
    }

    // Clear stack
    stack.length = 0;

    // Fill right array - find next smaller element index
    for (let i = n - 1; i >= 0; i--) {
        while (stack.length > 0 && heights[stack[stack.length - 1]] >= heights[i]) {
            stack.pop();
        }
        right[i] = stack.length === 0 ? n : stack[stack.length - 1];
        stack.push(i);
    }

    // Calculate max area
    let maxArea = 0;
    for (let i = 0; i < n; i++) {
        const area = heights[i] * (right[i] - left[i] - 1);
        maxArea = Math.max(maxArea, area);
    }

    return maxArea;
}

// Test cases
console.log(largestRectangleArea([2, 1, 5, 6, 2, 3])); // 10
console.log(largestRectangleArea([2, 4])); // 4
console.log(largestRectangleArea([1])); // 1
console.log(largestRectangleArea([2, 1, 2])); // 3