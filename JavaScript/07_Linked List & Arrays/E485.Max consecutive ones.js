// 485. Max Consecutive Ones
// https://leetcode.com/problems/max-consecutive-ones/
// Time Complexity: O(n) - Single pass through array
// Space Complexity: O(1) - Only using constant extra space

/**
 * @param {number[]} nums
 * @return {number}
 */
function findMaxConsecutiveOnes(nums) {
    let max = 0;
    let count = 0;

    for (const num of nums) {
        if (num === 1) {
            count++;
            max = Math.max(max, count);
        } else {
            count = 0;
        }
    }

    return max;
}

const nums = [1, 1, 0, 1, 1, 1];
console.log("Max consecutive ones:", findMaxConsecutiveOnes(nums)); // Output: 3
