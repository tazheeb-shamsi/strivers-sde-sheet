// 75. Sort an array of 0's, 1's and 2's AKA --> Sort Colors (Dutch National Flag problem)
// https://leetcode.com/problems/sort-colors/

/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
function sortColors(nums) {
    let low = 0;
    let mid = 0;
    let high = nums.length - 1;

    // Dutch National Flag algorithm
    while (mid <= high) {
        if (nums[mid] === 0) {
            swap(nums, low++, mid++);
        } else if (nums[mid] === 1) {
            mid++;
        } else {
            swap(nums, mid, high--);
        }
    }
}

function swap(nums, i, j) {
    const temp = nums[i];
    nums[i] = nums[j];
    nums[j] = temp;
}

const nums = [2, 0, 2, 1, 1, 0];
sortColors(nums);
console.log(nums); // Output: [0, 0, 1, 1, 2, 2]

