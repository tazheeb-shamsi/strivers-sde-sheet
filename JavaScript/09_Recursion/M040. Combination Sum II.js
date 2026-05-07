// 40. Combination Sum II
// https://leetcode.com/problems/combination-sum-ii/

/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
function combinationSum2(candidates, target) {
    candidates.sort((a, b) => a - b);
    const result = [];
    backtrack(candidates, target, 0, [], result);
    return result;
}

function backtrack(candidates, target, start, path, result) {
    if (target === 0) {
        result.push([...path]);
        return;
    }

    for (let i = start; i < candidates.length; i++) {
        if (i > start && candidates[i] === candidates[i - 1]) continue; // skip duplicates
        if (candidates[i] > target) break;

        path.push(candidates[i]);
        backtrack(candidates, target - candidates[i], i + 1, path, result);
        path.pop();
    }
}

const candidates = [10, 1, 2, 7, 6, 1, 5];
const target = 8;
console.log(combinationSum2(candidates, target)); // Output: [[1, 1, 6], [1, 2, 5], [1, 7], [2, 6]]
