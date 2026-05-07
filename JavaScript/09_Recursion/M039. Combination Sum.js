// 39. Combination Sum
// https://leetcode.com/problems/combination-sum/

/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
function combinationSum(candidates, target) {
    candidates.sort((a, b) => a - b); // sort for pruning
    const result = [];
    backtrack(result, [], candidates, target, 0);
    return result;
}

function backtrack(result, current, candidates, target, start) {
    if (target === 0) {
        result.push([...current]); // only copy here
        return;
    }

    for (let i = start; i < candidates.length; i++) {
        const val = candidates[i];
        if (val > target) break;

        current.push(val);
        backtrack(result, current, candidates, target - val, i);
        current.pop();
    }
}

const candidates = [2, 3, 6, 7];
const target = 7;
console.log(combinationSum(candidates, target)); // Output: [[2, 2, 3], [7]]
