// 645. Set Mismatch
// https://leetcode.com/problems/set-mismatch/

// Type             | Details
// -----------------+----------------------------------------------------
// Time Complexity  | O(N)
// Space Complexity | O(N) for counting array

/**
 * @param {number[]} nums
 * @return {number[]}
 */
function findErrorNums(nums) {
    const n = nums.length;
    const freq = new Array(n + 1).fill(0);

    for (const num of nums) {
        freq[num]++;
    }

    let duplicate = -1;
    let missing = -1;

    for (let i = 1; i <= n; i++) {
        if (freq[i] === 2) duplicate = i;
        else if (freq[i] === 0) missing = i;
    }

    return [duplicate, missing];
}

console.log(findErrorNums([1, 2, 2, 4])); // Output: [2, 3]

