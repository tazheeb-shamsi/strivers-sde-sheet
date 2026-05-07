// 5. Longest Palindromic Substring
// https://leetcode.com/problems/longest-palindromic-substring/

// Time Complexity: O(n^2)
// Space Complexity: O(1)

/**
 * Expand around center to find palindrome length
 * @param {string} s - Input string
 * @param {number} left - Left index
 * @param {number} right - Right index
 * @returns {number} - Length of palindrome
 */
function expandAroundCenter(s, left, right) {
    while (left >= 0 && right < s.length && s[left] === s[right]) {
        left--;
        right++;
    }
    return right - left - 1;
}

/**
 * Find the longest palindromic substring
 * @param {string} s - Input string
 * @returns {string} - Longest palindromic substring
 */
function longestPalindrome(s) {
    if (!s || s.length < 1) return "";

    let start = 0;
    let end = 0;

    for (let i = 0; i < s.length; i++) {
        // Odd length palindrome (single center)
        const len1 = expandAroundCenter(s, i, i);
        // Even length palindrome (two centers)
        const len2 = expandAroundCenter(s, i, i + 1);
        const len = Math.max(len1, len2);

        if (len > end - start) {
            start = i - Math.floor((len - 1) / 2);
            end = i + Math.floor(len / 2);
        }
    }

    return s.substring(start, end + 1);
}

// Test cases
console.log(longestPalindrome("babad")); // "bab" or "aba"
console.log(longestPalindrome("cbbd")); // "bb"
console.log(longestPalindrome("a")); // "a"
console.log(longestPalindrome("ac")); // "a"
console.log(longestPalindrome("racecar")); // "racecar"