/**
 * TUF: Power Set (All Subsequences)
 * https://takeuforward.org/plus/dsa/problems/power-set
 *
 * Generate all subsequences of a given string.
 *
 * Type             | Details
 * -----------------+----------------------------------------------------
 * Time Complexity  | O(2^N * N) – Generate 2^N subsequences
 * Space Complexity | O(2^N * N) – Store all subsequences
 */

/**
 * Power Set using Bit Manipulation
 * @param {string} s
 * @returns {string[]}
 */
function powerSetBitManipulation(s) {
    const n = s.length;
    const result = [];
    const total = 1 << n; // 2^n

    for (let mask = 0; mask < total; mask++) {
        let subset = "";
        for (let i = 0; i < n; i++) {
            if (mask & (1 << i)) {
                subset += s[i];
            }
        }
        result.push(subset);
    }

    return result;
}

/**
 * Power Set using Recursion (Backtracking)
 * @param {string} s
 * @returns {string[]}
 */
function powerSetRecursive(s) {
    const result = [];

    function backtrack(index, current) {
        if (index === s.length) {
            result.push(current);
            return;
        }

        // Exclude current character
        backtrack(index + 1, current);

        // Include current character
        backtrack(index + 1, current + s[index]);
    }

    backtrack(0, "");
    return result;
}

/**
 * Power Set using Iterative approach
 */
function powerSetIterative(s) {
    let result = [""];

    for (const char of s) {
        const newSubsets = [];
        for (const subset of result) {
            newSubsets.push(subset + char);
        }
        result = result.concat(newSubsets);
    }

    return result;
}

/**
 * Power Set for array (numbers)
 */
function subsetsArray(nums) {
    const result = [];

    function backtrack(index, current) {
        if (index === nums.length) {
            result.push([...current]);
            return;
        }

        // Exclude
        backtrack(index + 1, current);

        // Include
        current.push(nums[index]);
        backtrack(index + 1, current);
        current.pop();
    }

    backtrack(0, []);
    return result;
}

/**
 * Power Set with duplicates (Subsets II)
 */
function subsetsWithDup(nums) {
    nums.sort((a, b) => a - b);
    const result = [];

    function backtrack(index, current) {
        result.push([...current]);

        for (let i = index; i < nums.length; i++) {
            // Skip duplicates
            if (i > index && nums[i] === nums[i - 1]) continue;

            current.push(nums[i]);
            backtrack(i + 1, current);
            current.pop();
        }
    }

    backtrack(0, []);
    return result;
}

// Test cases
console.log("Power Set (Bit) of 'abc':", powerSetBitManipulation("abc"));
// ["", "a", "b", "ab", "c", "ac", "bc", "abc"]

console.log("\nPower Set (Recursive) of 'abc':", powerSetRecursive("abc"));

console.log("\nPower Set (Iterative) of 'abc':", powerSetIterative("abc"));

console.log("\nSubsets of [1,2,3]:", subsetsArray([1, 2, 3]));
// [[], [1], [2], [1,2], [3], [1,3], [2,3], [1,2,3]]

console.log("\nSubsets with duplicates [1,2,2]:", subsetsWithDup([1, 2, 2]));
// [[], [1], [1,2], [1,2,2], [2], [2,2]]