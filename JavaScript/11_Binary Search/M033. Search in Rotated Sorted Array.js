// 33. Search in Rotated Sorted Array
// Search element in a sorted and rotated array or find pivot where it is rotated.
// https://leetcode.com/problems/search-in-rotated-sorted-array/

// Time Complexity: O(log n)
// Space Complexity: O(1)

/**
 * Search for target in a rotated sorted array
 * @param {number[]} nums - Rotated sorted array
 * @param {number} target - Target value to search
 * @returns {number} - Index of target, or -1 if not found
 */
function search(nums, target) {
    let left = 0;
    let right = nums.length - 1;

    while (left <= right) {
        const mid = left + Math.floor((right - left) / 2);

        if (nums[mid] === target) {
            return mid;
        }

        // Check if left half is sorted
        if (nums[left] <= nums[mid]) {
            if (nums[left] <= target && target < nums[mid]) {
                right = mid - 1;
            } else {
                left = mid + 1;
            }
        } else {
            // Right half is sorted
            if (nums[mid] < target && target <= nums[right]) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
    }

    return -1;
}

// Test cases
console.log(search([4, 5, 6, 7, 0, 1, 2], 0)); // 4
console.log(search([4, 5, 6, 7, 0, 1, 2], 3)); // -1
console.log(search([1], 0)); // -1
console.log(search([3, 1], 1)); // 1