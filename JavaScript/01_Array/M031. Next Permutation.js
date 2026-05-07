// 31. Next Permutation
// https://leetcode.com/problems/next-permutation/

/**
    Given an array like nums = [1, 2, 3], the next permutation is [1, 3, 2].
    If it's the last permutation like [3, 2, 1], then the next should be the smallest one: [1, 2, 3].

    Steps:
    1. Find the first index i from the end where nums[i] < nums[i+1].
    2. If such an i exists:
       Find the smallest number greater than nums[i] to its right (j).
       Swap nums[i] and nums[j].
    3. Reverse the suffix starting from i+1 to the end to get the smallest lexicographical order.
*/

/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
function nextPermutation(nums) {
    const n = nums.length;
    let i = n - 2;

    // Step 1: Find first decreasing element from right
    while (i >= 0 && nums[i] >= nums[i + 1]) {
        i--;
    }

    // Step 2: Find number just larger than nums[i] and swap
    if (i >= 0) {
        let j = n - 1;
        while (nums[j] <= nums[i]) {
            j--;
        }
        swap(nums, i, j);
    }

    // Step 3: Reverse the elements after i
    reverse(nums, i + 1, n - 1);
}

function swap(nums, i, j) {
    const tmp = nums[i];
    nums[i] = nums[j];
    nums[j] = tmp;
}

function reverse(nums, start, end) {
    while (start < end) {
        swap(nums, start++, end--);
    }
}

const nums = [1, 2, 3];
nextPermutation(nums);
console.log(nums); // Output: [1, 3, 2]

