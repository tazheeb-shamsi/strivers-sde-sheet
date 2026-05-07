/**
 * 64. Minimum Path Sum
 * https://leetcode.com/problems/minimum-path-sum/
 *
 * Find a path from top-left to bottom-right with minimum sum.
 * Can only move right or down.
 *
 * Type             | Details
 * -----------------+----------------------------------------------------
 * Time Complexity  | O(M * N) – Visit each cell once
 * Space Complexity | O(1) – Modify input grid in-place, or O(N) with 1D array
 */

/**
 * Minimum Path Sum - In-place DP
 * @param {number[][]} grid
 * @returns {number}
 */
function minPathSum(grid) {
    const m = grid.length;
    const n = grid[0].length;
    
    // Fill first row (can only come from left)
    for (let j = 1; j < n; j++) {
        grid[0][j] += grid[0][j - 1];
    }
    
    // Fill first column (can only come from above)
    for (let i = 1; i < m; i++) {
        grid[i][0] += grid[i - 1][0];
    }
    
    // Fill rest of the grid
    for (let i = 1; i < m; i++) {
        for (let j = 1; j < n; j++) {
            grid[i][j] += Math.min(grid[i - 1][j], grid[i][j - 1]);
        }
    }
    
    return grid[m - 1][n - 1];
}

/**
 * Minimum Path Sum - Using separate DP array
 */
function minPathSumDP(grid) {
    const m = grid.length;
    const n = grid[0].length;
    
    const dp = Array.from({ length: m }, () => new Array(n).fill(0));
    
    dp[0][0] = grid[0][0];
    
    // First row
    for (let j = 1; j < n; j++) {
        dp[0][j] = dp[0][j - 1] + grid[0][j];
    }
    
    // First column
    for (let i = 1; i < m; i++) {
        dp[i][0] = dp[i - 1][0] + grid[i][0];
    }
    
    // Rest
    for (let i = 1; i < m; i++) {
        for (let j = 1; j < n; j++) {
            dp[i][j] = grid[i][j] + Math.min(dp[i - 1][j], dp[i][j - 1]);
        }
    }
    
    return dp[m - 1][n - 1];
}

/**
 * Space Optimized - O(N)
 */
function minPathSumOptimized(grid) {
    const m = grid.length;
    const n = grid[0].length;
    
    const dp = new Array(n).fill(0);
    
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (i === 0 && j === 0) {
                dp[j] = grid[i][j];
            } else if (i === 0) {
                dp[j] = dp[j - 1] + grid[i][j];
            } else if (j === 0) {
                dp[j] = dp[j] + grid[i][j];
            } else {
                dp[j] = grid[i][j] + Math.min(dp[j], dp[j - 1]);
            }
        }
    }
    
    return dp[n - 1];
}

/**
 * Get the actual path
 */
function minPathSumWithPath(grid) {
    const m = grid.length;
    const n = grid[0].length;
    
    const dp = Array.from({ length: m }, () => new Array(n).fill(0));
    
    dp[0][0] = grid[0][0];
    for (let j = 1; j < n; j++) dp[0][j] = dp[0][j - 1] + grid[0][j];
    for (let i = 1; i < m; i++) dp[i][0] = dp[i - 1][0] + grid[i][0];
    
    for (let i = 1; i < m; i++) {
        for (let j = 1; j < n; j++) {
            dp[i][j] = grid[i][j] + Math.min(dp[i - 1][j], dp[i][j - 1]);
        }
    }
    
    // Backtrack to find path
    const path = [];
    let i = m - 1, j = n - 1;
    path.push([i, j]);
    
    while (i > 0 || j > 0) {
        if (i === 0) {
            j--;
        } else if (j === 0) {
            i--;
        } else if (dp[i - 1][j] < dp[i][j - 1]) {
            i--;
        } else {
            j--;
        }
        path.unshift([i, j]);
    }
    
    return { minSum: dp[m - 1][n - 1], path };
}

// Test cases
const grid1 = [
    [1, 3, 1],
    [1, 5, 1],
    [4, 2, 1]
];
console.log("minPathSum:", minPathSumDP([...grid1.map(r => [...r])])); // 7

const grid2 = [
    [1, 2, 3],
    [4, 5, 6]
];
console.log("minPathSum:", minPathSumOptimized([...grid2.map(r => [...r])])); // 12

const result = minPathSumWithPath([
    [1, 3, 1],
    [1, 5, 1],
    [4, 2, 1]
]);
console.log("Min sum:", result.minSum);
console.log("Path:", result.path);