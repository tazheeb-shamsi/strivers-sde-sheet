/**
 * 139. Word Break
 * https://leetcode.com/problems/word-break/
 *
 * Check if string can be segmented into dictionary words.
 *
 * Type             | Details
 * -----------------+----------------------------------------------------
 * Time Complexity  | O(N² * M) – N = length, M = max word length
 * Space Complexity | O(N) – DP array
 */

/**
 * Word Break using DP
 * @param {string} s
 * @param {string[]} wordDict
 * @returns {boolean}
 */
function wordBreak(s, wordDict) {
    const wordSet = new Set(wordDict);
    const n = s.length;
    
    // dp[i] = true if s[0..i-1] can be segmented
    const dp = new Array(n + 1).fill(false);
    dp[0] = true; // Empty string
    
    for (let i = 1; i <= n; i++) {
        for (let j = 0; j < i; j++) {
            if (dp[j] && wordSet.has(s.substring(j, i))) {
                dp[i] = true;
                break;
            }
        }
    }
    
    return dp[n];
}

/**
 * Optimized: Only check word lengths that exist
 */
function wordBreakOptimized(s, wordDict) {
    const wordSet = new Set(wordDict);
    const wordLengths = [...new Set(wordDict.map(w => w.length))];
    const n = s.length;
    
    const dp = new Array(n + 1).fill(false);
    dp[0] = true;
    
    for (let i = 1; i <= n; i++) {
        for (const len of wordLengths) {
            if (i >= len && dp[i - len] && wordSet.has(s.substring(i - len, i))) {
                dp[i] = true;
                break;
            }
        }
    }
    
    return dp[n];
}

/**
 * Recursive with Memoization
 */
function wordBreakMemo(s, wordDict) {
    const wordSet = new Set(wordDict);
    const memo = new Map();
    
    function canBreak(start) {
        if (start === s.length) return true;
        if (memo.has(start)) return memo.get(start);
        
        for (let end = start + 1; end <= s.length; end++) {
            if (wordSet.has(s.substring(start, end)) && canBreak(end)) {
                memo.set(start, true);
                return true;
            }
        }
        
        memo.set(start, false);
        return false;
    }
    
    return canBreak(0);
}

/**
 * BFS approach
 */
function wordBreakBFS(s, wordDict) {
    const wordSet = new Set(wordDict);
    const n = s.length;
    const visited = new Set();
    const queue = [0];
    
    while (queue.length > 0) {
        const start = queue.shift();
        
        if (start === n) return true;
        if (visited.has(start)) continue;
        
        visited.add(start);
        
        for (let end = start + 1; end <= n; end++) {
            if (wordSet.has(s.substring(start, end))) {
                queue.push(end);
            }
        }
    }
    
    return false;
}

// Test cases
console.log("wordBreak('leetcode', ['leet','code']):", 
    wordBreak("leetcode", ["leet", "code"])); // true

console.log("wordBreak('applepenapple', ['apple','pen']):", 
    wordBreak("applepenapple", ["apple", "pen"])); // true

console.log("wordBreak('catsandog', ['cats','dog','sand','and','cat']):", 
    wordBreak("catsandog", ["cats", "dog", "sand", "and", "cat"])); // false

console.log("\nOptimized:");
console.log("wordBreak('leetcode'):", 
    wordBreakOptimized("leetcode", ["leet", "code"])); // true

console.log("\nBFS:");
console.log("wordBreak('leetcode'):", 
    wordBreakBFS("leetcode", ["leet", "code"])); // true