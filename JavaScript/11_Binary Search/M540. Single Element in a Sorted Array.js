// 540. Single Element in a Sorted Array
// Find the element that appears once in a sorted array, and the rest element appears twice.
// https://leetcode.com/problems/single-element-in-a-sorted-array/

// Time Complexity: O(log n) (binary search)
// Space Complexity: O(1)

/**
 * Find the single non-duplicate element in a sorted array where every other element appears twice
 * @param {number[]} nums - Sorted array with one single element and rest appearing twice
 * @returns {number} - The single non-duplicate element
 */
function singleNonDuplicate(nums) {
    let left = 0;
    let right = nums.length - 1;

    while (left < right) {
        let mid = left + Math.floor((right - left) / 2);

        // Ensure mid is even
        if (mid % 2 === 1) mid--;

        if (nums[mid] !== nums[mid + 1]) {
            right = mid;
        } else {
            left = mid + 2;
        }
    }

    return nums[left];
}

// Test cases
console.log(singleNonDuplicate([1, 1, 2, 3, 3, 4, 4, 8, 8])); // 2
console.log(singleNonDuplicate([3, 3, 7, 7, 10, 11, 11])); // 10
console.log(singleNonDuplicate([1])); // 1
console.log(singleNonDuplicate([1, 1, 2])); // 2