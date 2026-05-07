/**
 * 474. Ones and Zeroes
 * https://leetcode.com/problems/ones-and-zeroes/
 *
 * Find the largest subset such that there are at most m 0's and n 1's.
 *
 * Type             | Details
 * -----------------+----------------------------------------------------
 * Time Complexity  | O(L * M * N) – L is length of strs
 * Space Complexity | O(M * N) – 2D DP array
 */

/**
 * Ones and Zeroes - 0/1 Knapsack variant with two constraints
 * @param {string[]} strs
 * @param {number} m - Max number of 0's
 * @param {number} n - Max number of 1's
 * @returns {number}
 */
function findMaxForm(strs, m, n) {
    // dp[i][j] = max subset size with at most i 0's and j 1's
    const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));
    
    for (const str of strs) {
        // Count 0's and 1's in current string
        let zeros = 0, ones = 0;
        for (const c of str) {
            if (c === '0') zeros++;
            else ones++;
        }
        
        // Update DP (traverse from right to left like 0/1 knapsack)
        for (let i = m; i >= zeros; i--) {
            for (let j = n; j >= ones; j--) {
                dp[i][j] = Math.max(dp[i][j], dp[i - zeros][j - ones] + 1);
            }
        }
    }
    
    return dp[m][n];
}

/**
 * Using 3D DP for clarity
 */
function findMaxForm3D(strs, m, n) {
    const len = strs.length;
    
    // Count 0's and 1's for each string
    const counts = strs.map(str => {
        let zeros = 0, ones = 0;
        for (const c of str) {
            if (c === '0') zeros++;
            else ones++;
        }
        return [zeros, ones];
    });
    
    // dp[k][i][j] = max subset from first k strings with at most i 0's and j 1's
    const dp = Array.from({ length: len + 1 }, 
        () => Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0)));
    
    for (let k = 1; k <= len; k++) {
        const [zeros, ones] = counts[k - 1];
        
        for (let i = 0; i <= m; i++) {
            for (let j = 0; j <= n; j++) {
                dp[k][i][j] = dp[k - 1][i][j]; // Don't include current string
                
                if (i >= zeros && j >= ones) {
                    dp[k][i][j] = Math.max(
                        dp[k][i][j],
                        dp[k - 1][i - zeros][j - ones] + 1
                    );
                }
            }
        }
    }
    
    return dp[len][m][n];
}

/**
 * Recursive with Memoization
 */
function findMaxFormMemo(strs, m, n) {
    const counts = strs.map(str => {
        let zeros = 0, ones = 0;
        for (const c of str) {
            if (c === '0') zeros++;
            else ones++;
        }
        return [zeros, ones];
    });
    
    const memo = new Map();
    
    function solve(index, remainingZeros, remainingOnes) {
        if (index === strs.length) return 0;
        
        const key = `${index},${remainingZeros},${remainingOnes}`;
        if (memo.has(key)) return memo.get(key);
        
        // Don't take current string
        let result = solve(index + 1, remainingZeros, remainingOnes);
        
        // Take current string if possible
        const [zeros, ones] = counts[index];
        if (zeros <= remainingZeros && ones <= remainingOnes) {
            result = Math.max(
                result,
                1 + solve(index + 1, remainingZeros - zeros, remainingOnes - ones)
            );
        }
        
        memo.set(key, result);
        return result;
    }
    
    return solve(0, m, n);
}

// Test cases
console.log("findMaxForm(['10','0001','111001','1','0'], 5, 3):", 
    findMaxForm(["10", "0001", "111001", "1", "0"], 5, 3)); // 4

console.log("findMaxForm(['10','0','1'], 1, 1):", 
    findMaxForm(["10", "0", "1"], 1, 1)); // 2

console.log("\n3D DP:");
console.log("findMaxForm(['10','0001','111001','1','0'], 5, 3):", 
    findMaxForm3D(["10", "0001", "111001", "1", "0"], 5, 3)); // 4

console.log("\nMemoization:");
console.log("findMaxForm(['10','0','1'], 1, 1):", 
    findMaxFormMemo(["10", "0", "1"], 1, 1)); // 2