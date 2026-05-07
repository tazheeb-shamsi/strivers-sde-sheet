/**
 * 72. Edit Distance (Levenshtein Distance)
 * https://leetcode.com/problems/edit-distance/
 *
 * Find minimum number of operations to convert word1 to word2.
 * Operations: Insert, Delete, Replace
 *
 * Type             | Details
 * -----------------+----------------------------------------------------
 * Time Complexity  | O(M * N) – DP table
 * Space Complexity | O(M * N) or O(min(M, N)) space optimized
 */

/**
 * Edit Distance using 2D DP
 * @param {string} word1
 * @param {string} word2
 * @returns {number}
 */
function minDistance(word1, word2) {
    const m = word1.length;
    const n = word2.length;
    
    // dp[i][j] = min operations to convert word1[0..i-1] to word2[0..j-1]
    const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));
    
    // Base cases: converting to/from empty string
    for (let i = 0; i <= m; i++) dp[i][0] = i; // delete all chars
    for (let j = 0; j <= n; j++) dp[0][j] = j; // insert all chars
    
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (word1[i - 1] === word2[j - 1]) {
                // Characters match, no operation needed
                dp[i][j] = dp[i - 1][j - 1];
            } else {
                // Take minimum of insert, delete, replace
                dp[i][j] = 1 + Math.min(
                    dp[i][j - 1],     // Insert
                    dp[i - 1][j],     // Delete
                    dp[i - 1][j - 1]  // Replace
                );
            }
        }
    }
    
    return dp[m][n];
}

/**
 * Space Optimized - O(min(M, N))
 */
function minDistanceOptimized(word1, word2) {
    // Ensure word1 is shorter for space optimization
    if (word1.length > word2.length) {
        [word1, word2] = [word2, word1];
    }
    
    const m = word1.length;
    const n = word2.length;
    
    let prev = new Array(m + 1);
    let curr = new Array(m + 1);
    
    // Base case
    for (let i = 0; i <= m; i++) prev[i] = i;
    
    for (let j = 1; j <= n; j++) {
        curr[0] = j;
        for (let i = 1; i <= m; i++) {
            if (word1[i - 1] === word2[j - 1]) {
                curr[i] = prev[i - 1];
            } else {
                curr[i] = 1 + Math.min(curr[i - 1], prev[i], prev[i - 1]);
            }
        }
        [prev, curr] = [curr, prev];
    }
    
    return prev[m];
}

/**
 * Edit Distance with path reconstruction
 */
function minDistanceWithOperations(word1, word2) {
    const m = word1.length;
    const n = word2.length;
    
    const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));
    
    for (let i = 0; i <= m; i++) dp[i][0] = i;
    for (let j = 0; j <= n; j++) dp[0][j] = j;
    
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (word1[i - 1] === word2[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1];
            } else {
                dp[i][j] = 1 + Math.min(dp[i][j - 1], dp[i - 1][j], dp[i - 1][j - 1]);
            }
        }
    }
    
    // Backtrack to find operations
    const operations = [];
    let i = m, j = n;
    
    while (i > 0 || j > 0) {
        if (i > 0 && j > 0 && word1[i - 1] === word2[j - 1]) {
            i--;
            j--;
        } else if (i > 0 && j > 0 && dp[i][j] === dp[i - 1][j - 1] + 1) {
            operations.push(`Replace '${word1[i - 1]}' with '${word2[j - 1]}' at position ${i - 1}`);
            i--;
            j--;
        } else if (j > 0 && dp[i][j] === dp[i][j - 1] + 1) {
            operations.push(`Insert '${word2[j - 1]}' at position ${i}`);
            j--;
        } else if (i > 0 && dp[i][j] === dp[i - 1][j] + 1) {
            operations.push(`Delete '${word1[i - 1]}' at position ${i - 1}`);
            i--;
        }
    }
    
    return { distance: dp[m][n], operations: operations.reverse() };
}

/**
 * Recursive with Memoization
 */
function minDistanceMemo(word1, word2) {
    const m = word1.length;
    const n = word2.length;
    const memo = Array.from({ length: m }, () => new Array(n).fill(-1));
    
    function solve(i, j) {
        if (i === m) return n - j; // Insert remaining
        if (j === n) return m - i; // Delete remaining
        
        if (memo[i][j] !== -1) return memo[i][j];
        
        if (word1[i] === word2[j]) {
            memo[i][j] = solve(i + 1, j + 1);
        } else {
            memo[i][j] = 1 + Math.min(
                solve(i, j + 1),     // Insert
                solve(i + 1, j),     // Delete
                solve(i + 1, j + 1)  // Replace
            );
        }
        
        return memo[i][j];
    }
    
    return solve(0, 0);
}

// Test cases
console.log("minDistance('horse', 'ros'):", minDistance("horse", "ros")); // 3
console.log("minDistance('intention', 'execution'):", minDistance("intention", "execution")); // 5

console.log("\nOptimized:");
console.log("minDistance('horse', 'ros'):", minDistanceOptimized("horse", "ros")); // 3

console.log("\nWith operations:");
const result = minDistanceWithOperations("horse", "ros");
console.log("Distance:", result.distance);
console.log("Operations:", result.operations);