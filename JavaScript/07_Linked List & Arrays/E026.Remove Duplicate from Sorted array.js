// 26. Remove Duplicates from Sorted Array
// https://leetcode.com/problems/remove-duplicates-from-sorted-array/
// Time Complexity: O(n) - Single pass through array
// Space Complexity: O(1) - Only using constant extra space

/**
 * @param {number[]} nums
 * @return {number}
 */
function removeDuplicates(nums) {
    // Handle edge cases
    if (nums.length <= 1) return nums.length;

    // Two-pointer approach: i tracks position for next unique element
    let i = 0;

    // j scans through the array looking for unique elements
    for (let j = 1; j < nums.length; j++) {
        // When we find a new unique element
        if (nums[j] !== nums[i]) {
            i++;
            nums[i] = nums[j];
        }
    }

    return i + 1;
}

const nums = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5];
const length = removeDuplicates(nums);
console.log("Length:", length); // Output: 5
console.log("Array:", nums.slice(0, length)); // Output: [1, 2, 3, 4, 5]
