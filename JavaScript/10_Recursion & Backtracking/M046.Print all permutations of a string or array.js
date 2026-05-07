// 46. Permutations - Print all permutations of a string/array
// https://leetcode.com/problems/permutations/

/**
 * @param {number[]} nums
 * @return {number[][]}
 */
function permute(nums) {
    const permutations = [];
    backtrack(nums, 0, permutations);
    return permutations;
}

function backtrack(nums, idx, permutations) {
    if (idx === nums.length) {
        permutations.push([...nums]);
        return;
    }

    for (let i = idx; i < nums.length; i++) {
        swap(nums, i, idx);
        backtrack(nums, idx + 1, permutations);
        swap(nums, i, idx);
    }
}

function swap(arr, i, j) {
    const temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}

const nums = [1, 2, 3];
console.log(permute(nums));
// Output: [[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,2,1],[3,1,2]]
