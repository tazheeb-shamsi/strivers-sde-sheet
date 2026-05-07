// 60. Permutation Sequence --> K-th permutation Sequence
// https://leetcode.com/problems/permutation-sequence/

/**
 * @param {number} n
 * @param {number} k
 * @return {string}
 */
function getPermutation(n, k) {
    const factorial = [1];
    for (let i = 1; i <= n; i++) {
        factorial[i] = factorial[i - 1] * i;
    }

    let result = '';
    const nums = [];
    for (let i = 1; i <= n; i++) {
        nums.push(i);
    }

    k--;
    for (let i = n; i >= 1; i--) {
        const index = Math.floor(k / factorial[i - 1]);
        result += nums[index];
        nums.splice(index, 1);
        k %= factorial[i - 1];
    }

    return result;
}

console.log(getPermutation(3, 3)); // Output: "213"
console.log(getPermutation(4, 9)); // Output: "2314"
