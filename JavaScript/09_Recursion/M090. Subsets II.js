// 90. Subsets II
// https://leetcode.com/problems/subsets-ii/

/**
 * @param {number[]} nums
 * @return {number[][]}
 */
function subsetsWithDup(nums) {
    nums.sort((a, b) => a - b);
    const result = [];
    backtrack(result, [], nums, 0);
    return result;
}

function backtrack(result, temp, nums, start) {
    result.push([...temp]);

    for (let i = start; i < nums.length; i++) {
        if (i > start && nums[i] === nums[i - 1]) continue; // skip duplicates
        temp.push(nums[i]);
        backtrack(result, temp, nums, i + 1);
        temp.pop();
    }
}

const nums = [1, 2, 2];
console.log(subsetsWithDup(nums)); // Output: [[], [1], [1, 2], [1, 2, 2], [2], [2, 2]]
