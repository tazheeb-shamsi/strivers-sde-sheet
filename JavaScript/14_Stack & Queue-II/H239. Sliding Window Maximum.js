// 239. Sliding Window Maximum
// https://leetcode.com/problems/sliding-window-maximum

// You are given an array of integers nums, there is a sliding window of size k
// which is moving from the very left of the array to the very right.
// Return the max sliding window.

// Example:
// Input: nums = [1,3,-1,-3,5,3,6,7], k = 3
// Output: [3,3,5,5,6,7]

/**
 * Find maximum in each sliding window of size k
 * @param {number[]} nums - Input array
 * @param {number} k - Window size
 * @returns {number[]} - Maximum values for each window position
 */
function maxSlidingWindow(nums, k) {
    const n = nums.length;
    const result = new Array(n - k + 1);
    const deque = []; // Store indices, maintaining decreasing order of values

    for (let i = 0; i < n; i++) {
        // Remove indices outside current window
        while (deque.length > 0 && deque[0] < i - k + 1) {
            deque.shift();
        }

        // Remove smaller elements from back (they're useless)
        while (deque.length > 0 && nums[deque[deque.length - 1]] < nums[i]) {
            deque.pop();
        }

        deque.push(i);

        // Start recording results once we have a complete window
        if (i >= k - 1) {
            result[i - k + 1] = nums[deque[0]];
        }
    }

    return result;
}

// Test cases
console.log(maxSlidingWindow([1, 3, -1, -3, 5, 3, 6, 7], 3)); // [3, 3, 5, 5, 6, 7]
console.log(maxSlidingWindow([1], 1)); // [1]
console.log(maxSlidingWindow([1, -1], 1)); // [1, -1]
console.log(maxSlidingWindow([9, 11], 2)); // [11]
console.log(maxSlidingWindow([4, -2], 2)); // [4]