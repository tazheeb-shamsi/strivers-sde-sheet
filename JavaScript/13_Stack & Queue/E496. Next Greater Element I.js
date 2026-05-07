// 496. Next Greater Element I
// https://leetcode.com/problems/next-greater-element-i/

// Time Complexity: O(n + m) where n = nums1.length, m = nums2.length
// Space Complexity: O(m)

/**
 * Find the next greater element for each element in nums1 from nums2
 * @param {number[]} nums1 - Subset array
 * @param {number[]} nums2 - Reference array
 * @returns {number[]} - Next greater elements for each element in nums1
 */
function nextGreaterElement(nums1, nums2) {
    const map = new Map();
    const stack = [];

    // Process nums2 to find next greater element for each number
    for (const num of nums2) {
        while (stack.length > 0 && stack[stack.length - 1] < num) {
            map.set(stack.pop(), num);
        }
        stack.push(num);
    }

    // Build result for nums1
    const result = new Array(nums1.length);
    for (let i = 0; i < nums1.length; i++) {
        result[i] = map.has(nums1[i]) ? map.get(nums1[i]) : -1;
    }

    return result;
}

// Test cases
console.log(nextGreaterElement([4, 1, 2], [1, 3, 4, 2])); // [-1, 3, -1]
console.log(nextGreaterElement([2, 4], [1, 2, 3, 4])); // [3, -1]
console.log(nextGreaterElement([1, 3, 5, 2, 4], [6, 5, 4, 3, 2, 1, 7])); // [7, 7, 7, 7, 7]