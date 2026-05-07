// InterviewBit: Minimum Characters required to make a String Palindromic
// https://www.interviewbit.com/problems/minimum-characters-required-to-make-a-string-palindromic/

// Problem: Find the minimum number of characters to be added at the front
// to make the string a palindrome.

/**
 * Build LPS array for KMP algorithm
 * @param {string} s - Input string
 * @returns {number[]} - LPS array
 */
function buildLPS(s) {
    const n = s.length;
    const lps = new Array(n).fill(0);
    let len = 0;
    let i = 1;

    while (i < n) {
        if (s[i] === s[len]) {
            len++;
            lps[i] = len;
            i++;
        } else {
            if (len !== 0) {
                len = lps[len - 1];
            } else {
                lps[i] = 0;
                i++;
            }
        }
    }

    return lps;
}

/**
 * Find minimum characters to add at front to make string palindrome
 * @param {string} A - Input string
 * @returns {number} - Minimum characters to add
 */
function solve(A) {
    // Reverse the string
    const rev = A.split('').reverse().join('');

    // Concatenate with separator
    const concat = A + '$' + rev;

    // Build LPS array
    const lps = buildLPS(concat);

    // The longest palindromic prefix length is lps[last]
    // Characters to add = length - longest palindromic prefix
    return A.length - lps[concat.length - 1];
}

// Test cases
console.log(solve("ABC")); // 2 (Add "CB" to get "CBABC")
console.log(solve("AACECAAAA")); // 2 (Add "AA" to get "AAAACECAAAA")
console.log(solve("a")); // 0 (Already palindrome)
console.log(solve("abcd")); // 3 (Add "dcb" to get "dcbabcd")
console.log(solve("aba")); // 0 (Already palindrome)