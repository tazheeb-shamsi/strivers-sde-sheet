/**
 * TUF: Word Break (All possible sentences)
 * https://takeuforward.org/plus/dsa/problems/word-break
 *
 * Return all possible sentences that can be formed by
 * splitting the string into dictionary words.
 *
 * Type             | Details
 * -----------------+----------------------------------------------------
 * Time Complexity  | O(N * 2^N) – Exponential in worst case
 * Space Complexity | O(N) – Recursion depth
 */

/**
 * Word Break II - Return all valid sentences
 * @param {string} s
 * @param {string[]} wordDict
 * @returns {string[]}
 */
function wordBreakII(s, wordDict) {
    const wordSet = new Set(wordDict);
    const memo = new Map();
    
    function backtrack(start) {
        if (memo.has(start)) {
            return memo.get(start);
        }
        
        const sentences = [];
        
        if (start === s.length) {
            sentences.push("");
            return sentences;
        }
        
        for (let end = start + 1; end <= s.length; end++) {
            const word = s.substring(start, end);
            
            if (wordSet.has(word)) {
                const restSentences = backtrack(end);
                
                for (const sentence of restSentences) {
                    if (sentence === "") {
                        sentences.push(word);
                    } else {
                        sentences.push(word + " " + sentence);
                    }
                }
            }
        }
        
        memo.set(start, sentences);
        return sentences;
    }
    
    return backtrack(0);
}

/**
 * Simple backtracking without memoization
 */
function wordBreakBacktrack(s, wordDict) {
    const wordSet = new Set(wordDict);
    const result = [];
    
    function backtrack(start, path) {
        if (start === s.length) {
            result.push(path.join(" "));
            return;
        }
        
        for (let end = start + 1; end <= s.length; end++) {
            const word = s.substring(start, end);
            if (wordSet.has(word)) {
                path.push(word);
                backtrack(end, path);
                path.pop();
            }
        }
    }
    
    backtrack(0, []);
    return result;
}

/**
 * Check if word break is possible (before finding all sentences)
 */
function canWordBreak(s, wordDict) {
    const wordSet = new Set(wordDict);
    const n = s.length;
    const dp = new Array(n + 1).fill(false);
    dp[0] = true;
    
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

// Test cases
const s1 = "catsanddog";
const wordDict1 = ["cat", "cats", "and", "sand", "dog"];
console.log("wordBreakII('catsanddog'):", wordBreakII(s1, wordDict1));
// ["cats and dog", "cat sand dog"]

const s2 = "pineapplepenapple";
const wordDict2 = ["apple", "pen", "applepen", "pine", "pineapple"];
console.log("wordBreakII('pineapplepenapple'):", wordBreakII(s2, wordDict2));
// ["pine apple pen apple", "pineapple pen apple", "pine applepen apple"]

const s3 = "catsandog";
const wordDict3 = ["cats", "dog", "sand", "and", "cat"];
console.log("wordBreakII('catsandog'):", wordBreakII(s3, wordDict3));
// [] (empty - cannot be segmented)