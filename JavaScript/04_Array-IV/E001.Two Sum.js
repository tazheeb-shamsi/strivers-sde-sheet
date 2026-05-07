// 001. Two Sum a.k.a Target Sum
// https://leetcode.com/problems/two-sum/

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
function twoSum(nums, target) {
    const map = new Map();
    for (let i = 0; i < nums.length; i++) {
        const sum = target - nums[i];
        if (map.has(sum)) {
            return [map.get(sum), i];
        }
        map.set(nums[i], i);
    }
    throw new Error("No two sum solution");
}

const nums = [2, 7, 11, 15];
const target = 9;
console.log(twoSum(nums, target)); // Output: [0, 1]
