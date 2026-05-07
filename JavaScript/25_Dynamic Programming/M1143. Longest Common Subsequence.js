/**
 * 1143. Longest Common Subsequence
 * https://leetcode.com/problems/longest-common-subsequence/
 *
 * Type             | Details
 * -----------------+----------------------------------------------------
 * Time Complexity  | O(M * N) – DP table
 * Space Complexity | O(M * N) or O(min(M, N)) space optimized
 */

/**
 * Longest Common Subsequence using 2D DP
 * @param {string} text1
 * @param {string} text2
 * @returns {number}
 */
function longestCommonSubsequence(text1, text2) {
    const m = text1.length;
    const n = text2.length;
    
    // dp[i][j] = LCS of text1[0..i-1] and text2[0..j-1]
    const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));
    
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (text1[i - 1] === text2[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1] + 1;
            } else {
                dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
            }
        }
    }
    
    return dp[m][n];
}

/**
 * Space Optimized - O(min(M, N))
 */
function longestCommonSubsequenceOptimized(text1, text2) {
    // Make text1 the shorter string
    if (text1.length > text2.length) {
        [text1, text2] = [text2, text1];
    }
    
    const m = text1.length;
    const n = text2.length;
    
    let prev = new Array(m + 1).fill(0);
    let curr = new Array(m + 1).fill(0);
    
    for (let j = 1; j <= n; j++) {
        for (let i = 1; i <= m; i++) {
            if (text1[i - 1] === text2[j - 1]) {
                curr[i] = prev[i - 1] + 1;
            } else {
                curr[i] = Math.max(prev[i], curr[i - 1]);
            }
        }
        [prev, curr] = [curr, prev];
    }
    
    return prev[m];
}

/**
 * LCS with path reconstruction
 */
function lcsWithPath(text1, text2) {
    const m = text1.length;
    const n = text2.length;
    
    const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));
    
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (text1[i - 1] === text2[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1] + 1;
            } else {
                dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
            }
        }
    }
    
    // Backtrack to find the LCS string
    let i = m, j = n;
    let lcs = "";
    
    while (i > 0 && j > 0) {
        if (text1[i - 1] === text2[j - 1]) {
            lcs = text1[i - 1] + lcs;
            i--;
            j--;
        } else if (dp[i - 1][j] > dp[i][j - 1]) {
            i--;
        } else {
            j--;
        }
    }
    
    return { length: dp[m][n], lcs };
}

/**
 * Recursive with Memoization
 */
function lcsMemo(text1, text2) {
    const m = text1.length;
    const n = text2.length;
    const memo = Array.from({ length: m }, () => new Array(n).fill(-1));
    
    function solve(i, j) {
        if (i === m || j === n) return 0;
        
        if (memo[i][j] !== -1) return memo[i][j];
        
        if (text1[i] === text2[j]) {
            memo[i][j] = 1 + solve(i + 1, j + 1);
        } else {
            memo[i][j] = Math.max(solve(i + 1, j), solve(i, j + 1));
        }
        
        return memo[i][j];
    }
    
    return solve(0, 0);
}

// Test cases
console.log("LCS('abcde', 'ace'):", longestCommonSubsequence("abcde", "ace")); // 3
console.log("LCS('abc', 'abc'):", longestCommonSubsequence("abc", "abc")); // 3
console.log("LCS('abc', 'def'):", longestCommonSubsequence("abc", "def")); // 0

console.log("\nOptimized:");
console.log("LCS('abcde', 'ace'):", longestCommonSubsequenceOptimized("abcde", "ace")); // 3

const result = lcsWithPath("abcde", "ace");
console.log("\nWith path:");
console.log("Length:", result.length);
console.log("LCS string:", result.lcs); // "ace"