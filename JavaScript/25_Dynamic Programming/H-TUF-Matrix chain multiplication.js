/**
 * TUF: Matrix Chain Multiplication
 * https://takeuforward.org/plus/dsa/problems/matrix-chain-multiplication
 *
 * Given dimensions of matrices, find minimum number of multiplications
 * needed to multiply the chain.
 *
 * Type             | Details
 * -----------------+----------------------------------------------------
 * Time Complexity  | O(N³) – Three nested loops
 * Space Complexity | O(N²) – DP table
 */

/**
 * Matrix Chain Multiplication using DP
 * @param {number[]} arr - Array of dimensions
 * @param {number} n - Length of array
 * @returns {number} - Minimum number of multiplications
 */
function matrixMultiplication(arr, n) {
    // dp[i][j] = minimum cost to multiply matrices from i to j
    const dp = Array.from({ length: n }, () => new Array(n).fill(0));
    
    // l is chain length
    for (let l = 2; l < n; l++) {
        for (let i = 1; i < n - l + 1; i++) {
            const j = i + l - 1;
            dp[i][j] = Infinity;
            
            // Try all possible positions to split
            for (let k = i; k < j; k++) {
                const cost = dp[i][k] + dp[k + 1][j] + arr[i - 1] * arr[k] * arr[j];
                dp[i][j] = Math.min(dp[i][j], cost);
            }
        }
    }
    
    return dp[1][n - 1];
}

/**
 * MCM using Recursion with Memoization
 */
function matrixMultiplicationMemo(arr, n) {
    const memo = Array.from({ length: n }, () => new Array(n).fill(-1));
    
    function solve(i, j) {
        if (i >= j) return 0;
        
        if (memo[i][j] !== -1) return memo[i][j];
        
        let minCost = Infinity;
        
        for (let k = i; k < j; k++) {
            const cost = solve(i, k) + solve(k + 1, j) + arr[i - 1] * arr[k] * arr[j];
            minCost = Math.min(minCost, cost);
        }
        
        memo[i][j] = minCost;
        return minCost;
    }
    
    return solve(1, n - 1);
}

/**
 * MCM with parenthesization (show optimal order)
 */
function matrixMultiplicationWithOrder(arr, n) {
    const dp = Array.from({ length: n }, () => new Array(n).fill(0));
    const bracket = Array.from({ length: n }, () => new Array(n).fill(0));
    
    for (let l = 2; l < n; l++) {
        for (let i = 1; i < n - l + 1; i++) {
            const j = i + l - 1;
            dp[i][j] = Infinity;
            
            for (let k = i; k < j; k++) {
                const cost = dp[i][k] + dp[k + 1][j] + arr[i - 1] * arr[k] * arr[j];
                if (cost < dp[i][j]) {
                    dp[i][j] = cost;
                    bracket[i][j] = k;
                }
            }
        }
    }
    
    function printParenthesis(i, j) {
        if (i === j) {
            return `M${i}`;
        }
        return `(${printParenthesis(i, bracket[i][j])} x ${printParenthesis(bracket[i][j] + 1, j)})`;
    }
    
    return {
        minCost: dp[1][n - 1],
        order: printParenthesis(1, n - 1)
    };
}

// Test cases
// Matrices: A1 (10x30), A2 (30x5), A3 (5x60)
const arr = [10, 30, 5, 60];
const n = arr.length;

console.log("Minimum multiplications:", matrixMultiplication(arr, n));
// Expected: 4500
// (A1 x A2) x A3 = 10*30*5 + 10*5*60 = 1500 + 3000 = 4500

console.log("Using Memoization:", matrixMultiplicationMemo(arr, n));

const result = matrixMultiplicationWithOrder(arr, n);
console.log("Min cost:", result.minCost);
console.log("Optimal order:", result.order);

// Another test case
const arr2 = [40, 20, 30, 10, 30];
console.log("\nTest 2:", matrixMultiplication(arr2, arr2.length)); // Expected: 26000