/**
 * 1547. Minimum Cost to Cut a Stick
 * https://leetcode.com/problems/minimum-cost-to-cut-a-stick/
 *
 * Type             | Details
 * -----------------+----------------------------------------------------
 * Time Complexity  | O(M³) – M is number of cuts
 * Space Complexity | O(M²) – DP table
 */

/**
 * Minimum cost to cut a stick
 * @param {number} n - Length of stick
 * @param {number[]} cuts - Positions to cut
 * @returns {number}
 */
function minCost(n, cuts) {
    // Add boundaries and sort
    const c = [0, ...cuts, n].sort((a, b) => a - b);
    const m = c.length;
    
    // dp[i][j] = minimum cost to cut stick from c[i] to c[j]
    const dp = Array.from({ length: m }, () => new Array(m).fill(0));
    
    // Consider all possible lengths
    for (let len = 2; len < m; len++) {
        for (let i = 0; i + len < m; i++) {
            const j = i + len;
            dp[i][j] = Infinity;
            
            // Try all possible first cuts
            for (let k = i + 1; k < j; k++) {
                const cost = c[j] - c[i] + dp[i][k] + dp[k][j];
                dp[i][j] = Math.min(dp[i][j], cost);
            }
        }
    }
    
    return dp[0][m - 1];
}

/**
 * Recursive with Memoization
 */
function minCostMemo(n, cuts) {
    const c = [0, ...cuts, n].sort((a, b) => a - b);
    const m = c.length;
    const memo = Array.from({ length: m }, () => new Array(m).fill(-1));
    
    function solve(i, j) {
        // Base case: no cuts possible between adjacent positions
        if (j - i <= 1) return 0;
        
        if (memo[i][j] !== -1) return memo[i][j];
        
        let minCost = Infinity;
        
        // Try each cut position
        for (let k = i + 1; k < j; k++) {
            const cost = c[j] - c[i] + solve(i, k) + solve(k, j);
            minCost = Math.min(minCost, cost);
        }
        
        memo[i][j] = minCost;
        return minCost;
    }
    
    return solve(0, m - 1);
}

// Test cases
console.log("minCost(7, [1,3,4,5]):", minCost(7, [1, 3, 4, 5])); // 16
// Explanation: Cut at 3, cost = 7
// Cut at 5, cost = 4 (stick from 3 to 7)
// Cut at 1, cost = 3 (stick from 0 to 3)
// Cut at 4, cost = 2 (stick from 3 to 5)
// Total = 7 + 4 + 3 + 2 = 16

console.log("minCost(9, [5,6,1,4,2]):", minCost(9, [5, 6, 1, 4, 2])); // 22

console.log("\nUsing memoization:");
console.log("minCost(7, [1,3,4,5]):", minCostMemo(7, [1, 3, 4, 5])); // 16