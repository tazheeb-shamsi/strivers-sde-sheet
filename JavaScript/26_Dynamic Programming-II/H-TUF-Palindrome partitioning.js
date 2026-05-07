/**
 * TUF: Palindrome Partitioning (Minimum Cuts)
 * https://takeuforward.org/plus/dsa/problems/palindrome-partitioning
 *
 * Find minimum number of cuts needed to partition a string
 * such that every substring is a palindrome.
 *
 * Type             | Details
 * -----------------+----------------------------------------------------
 * Time Complexity  | O(N²) – Two DP tables
 * Space Complexity | O(N²) – Palindrome check table
 */

/**
 * Minimum cuts for palindrome partitioning
 * @param {string} s
 * @returns {number}
 */
function minCut(s) {
    const n = s.length;
    if (n <= 1) return 0;
    
    // isPalin[i][j] = true if s[i..j] is palindrome
    const isPalin = Array.from({ length: n }, () => new Array(n).fill(false));
    
    // All single characters are palindromes
    for (let i = 0; i < n; i++) {
        isPalin[i][i] = true;
    }
    
    // Check for substrings of length 2 and more
    for (let len = 2; len <= n; len++) {
        for (let i = 0; i <= n - len; i++) {
            const j = i + len - 1;
            if (len === 2) {
                isPalin[i][j] = (s[i] === s[j]);
            } else {
                isPalin[i][j] = (s[i] === s[j]) && isPalin[i + 1][j - 1];
            }
        }
    }
    
    // dp[i] = minimum cuts for s[0..i]
    const dp = new Array(n).fill(0);
    
    for (let i = 0; i < n; i++) {
        if (isPalin[0][i]) {
            dp[i] = 0; // No cut needed
        } else {
            dp[i] = i; // Maximum cuts
            for (let j = 1; j <= i; j++) {
                if (isPalin[j][i]) {
                    dp[i] = Math.min(dp[i], dp[j - 1] + 1);
                }
            }
        }
    }
    
    return dp[n - 1];
}

/**
 * Recursive with Memoization
 */
function minCutMemo(s) {
    const n = s.length;
    
    // Precompute palindrome table
    const isPalin = Array.from({ length: n }, () => new Array(n).fill(false));
    for (let i = 0; i < n; i++) isPalin[i][i] = true;
    
    for (let len = 2; len <= n; len++) {
        for (let i = 0; i <= n - len; i++) {
            const j = i + len - 1;
            isPalin[i][j] = (s[i] === s[j]) && (len === 2 || isPalin[i + 1][j - 1]);
        }
    }
    
    const memo = new Array(n).fill(-1);
    
    function solve(i) {
        if (i === n) return 0;
        if (isPalin[i][n - 1]) return 0; // Rest is palindrome
        if (memo[i] !== -1) return memo[i];
        
        let minCuts = Infinity;
        for (let j = i; j < n; j++) {
            if (isPalin[i][j]) {
                minCuts = Math.min(minCuts, 1 + solve(j + 1));
            }
        }
        
        memo[i] = minCuts;
        return minCuts;
    }
    
    return Math.max(0, solve(0) - 1); // Subtract 1 as we're counting partitions, not cuts
}

/**
 * Get all palindrome partitions (backtracking)
 */
function partition(s) {
    const result = [];
    
    function isPalindrome(str, start, end) {
        while (start < end) {
            if (str[start] !== str[end]) return false;
            start++;
            end--;
        }
        return true;
    }
    
    function backtrack(start, current) {
        if (start === s.length) {
            result.push([...current]);
            return;
        }
        
        for (let end = start; end < s.length; end++) {
            if (isPalindrome(s, start, end)) {
                current.push(s.substring(start, end + 1));
                backtrack(end + 1, current);
                current.pop();
            }
        }
    }
    
    backtrack(0, []);
    return result;
}

// Test cases
console.log("minCut('aab'):", minCut("aab")); // 1 (a|ab)
console.log("minCut('a'):", minCut("a")); // 0
console.log("minCut('ab'):", minCut("ab")); // 1
console.log("minCut('aba'):", minCut("aba")); // 0 (already palindrome)
console.log("minCut('aabb'):", minCut("aabb")); // 1 (aa|bb)

console.log("\nAll partitions of 'aab':");
console.log(partition("aab")); // [["a","a","b"],["aa","b"]]