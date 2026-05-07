// 53. Maximum Subarray --> Kadane's Algorithm
// https://leetcode.com/problems/maximum-subarray/

/**
 * Kadane's Algorithm
 * @param {number[]} nums
 * @return {number}
 */
function maxSubArray(nums) {
    let maxSoFar = nums[0];
    let currMax = nums[0];

    for (let i = 1; i < nums.length; i++) {
        currMax = Math.max(nums[i], currMax + nums[i]); // extend or start new subarray
        maxSoFar = Math.max(maxSoFar, currMax); // update global max
    }

    return maxSoFar;
}

console.log(maxSubArray([-2, 1, -3, 4, -1, 2, 1, -5, 4])); // Output: 6

