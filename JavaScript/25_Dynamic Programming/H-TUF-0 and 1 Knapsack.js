/**
 * TUF: 0/1 Knapsack Problem
 * https://takeuforward.org/plus/dsa/problems/0-1-knapsack
 *
 * Given weights and values of n items, put items in a knapsack of capacity W
 * to get the maximum total value.
 *
 * Type             | Details
 * -----------------+----------------------------------------------------
 * Time Complexity  | O(N * W) – DP table
 * Space Complexity | O(W) – Space optimized to 1D array
 */

/**
 * 0/1 Knapsack using 2D DP
 * @param {number} W - Knapsack capacity
 * @param {number[]} wt - Array of weights
 * @param {number[]} val - Array of values
 * @param {number} n - Number of items
 * @returns {number} - Maximum value
 */
function knapsack2D(W, wt, val, n) {
    // dp[i][w] = max value using first i items with capacity w
    const dp = Array.from({ length: n + 1 }, () => new Array(W + 1).fill(0));
    
    for (let i = 1; i <= n; i++) {
        for (let w = 0; w <= W; w++) {
            // Don't take item i
            dp[i][w] = dp[i - 1][w];
            
            // Take item i (if weight allows)
            if (wt[i - 1] <= w) {
                dp[i][w] = Math.max(dp[i][w], val[i - 1] + dp[i - 1][w - wt[i - 1]]);
            }
        }
    }
    
    return dp[n][W];
}

/**
 * 0/1 Knapsack using 1D DP (Space Optimized)
 * @param {number} W - Knapsack capacity
 * @param {number[]} wt - Array of weights
 * @param {number[]} val - Array of values
 * @param {number} n - Number of items
 * @returns {number} - Maximum value
 */
function knapsack(W, wt, val, n) {
    const dp = new Array(W + 1).fill(0);
    
    for (let i = 0; i < n; i++) {
        // Traverse from right to left to avoid using updated values
        for (let w = W; w >= wt[i]; w--) {
            dp[w] = Math.max(dp[w], val[i] + dp[w - wt[i]]);
        }
    }
    
    return dp[W];
}

/**
 * 0/1 Knapsack with item selection
 */
function knapsackWithItems(W, wt, val, n) {
    const dp = Array.from({ length: n + 1 }, () => new Array(W + 1).fill(0));
    
    for (let i = 1; i <= n; i++) {
        for (let w = 0; w <= W; w++) {
            dp[i][w] = dp[i - 1][w];
            if (wt[i - 1] <= w) {
                dp[i][w] = Math.max(dp[i][w], val[i - 1] + dp[i - 1][w - wt[i - 1]]);
            }
        }
    }
    
    // Backtrack to find selected items
    const selectedItems = [];
    let w = W;
    for (let i = n; i > 0 && w > 0; i--) {
        if (dp[i][w] !== dp[i - 1][w]) {
            selectedItems.push(i - 1); // 0-indexed
            w -= wt[i - 1];
        }
    }
    
    return { maxValue: dp[n][W], selectedItems: selectedItems.reverse() };
}

/**
 * Recursive with Memoization
 */
function knapsackMemo(W, wt, val, n) {
    const memo = new Map();
    
    function solve(i, w) {
        if (i === 0 || w === 0) return 0;
        
        const key = `${i},${w}`;
        if (memo.has(key)) return memo.get(key);
        
        let result = solve(i - 1, w); // Don't take
        if (wt[i - 1] <= w) {
            result = Math.max(result, val[i - 1] + solve(i - 1, w - wt[i - 1]));
        }
        
        memo.set(key, result);
        return result;
    }
    
    return solve(n, W);
}

// Test cases
const val = [60, 100, 120];
const wt = [10, 20, 30];
const W = 50;
const n = val.length;

console.log("Knapsack 2D:", knapsack2D(W, wt, val, n)); // Expected: 220
console.log("Knapsack 1D:", knapsack(W, wt, val, n)); // Expected: 220
console.log("Knapsack Memo:", knapsackMemo(W, wt, val, n)); // Expected: 220

const result = knapsackWithItems(W, wt, val, n);
console.log("Max Value:", result.maxValue);
console.log("Selected Items (indices):", result.selectedItems);