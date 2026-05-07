// KMP (Knuth–Morris–Pratt) Algorithm or LPS (Longest Prefix Suffix) array
// LPS: Longest Proper Prefix that is also a Suffix, also known as the prefix function or pi array
// Find the index of the first occurrence of a pattern in a text using KMP algorithm
// https://leetcode.com/problems/find-the-index-of-the-first-occurrence-in-a-string/

/**
 * Build LPS (Longest Prefix Suffix) array
 * @param {string} pattern - Pattern string
 * @returns {number[]} - LPS array
 */
function buildLPS(pattern) {
    const n = pattern.length;
    const lps = new Array(n).fill(0);
    let len = 0; // length of previous longest prefix suffix
    let i = 1;

    while (i < n) {
        if (pattern[i] === pattern[len]) {
            len++;
            lps[i] = len;
            i++;
        } else {
            if (len !== 0) {
                len = lps[len - 1]; // fallback
            } else {
                lps[i] = 0;
                i++;
            }
        }
    }

    return lps;
}

/**
 * KMP string matching algorithm
 * @param {string} haystack - Text to search in
 * @param {string} needle - Pattern to search for
 * @returns {number} - Index of first occurrence, or -1 if not found
 */
function strStrKMP(haystack, needle) {
    if (needle === "") return 0;
    if (haystack.length < needle.length) return -1;

    const lps = buildLPS(needle);
    let i = 0; // haystack index
    let j = 0; // needle index

    while (i < haystack.length) {
        if (haystack[i] === needle[j]) {
            i++;
            j++;
            if (j === needle.length) {
                return i - j; // found match
            }
        } else {
            if (j !== 0) {
                j = lps[j - 1]; // move pattern pointer
            } else {
                i++; // move text pointer
            }
        }
    }

    return -1; // not found
}

/**
 * Find all occurrences of pattern in text using KMP
 * @param {string} text - Text to search in
 * @param {string} pattern - Pattern to search for
 * @returns {number[]} - Array of starting indices of all occurrences
 */
function findAllOccurrences(text, pattern) {
    if (pattern === "") return [];
    if (text.length < pattern.length) return [];

    const lps = buildLPS(pattern);
    const result = [];
    let i = 0;
    let j = 0;

    while (i < text.length) {
        if (text[i] === pattern[j]) {
            i++;
            j++;
            if (j === pattern.length) {
                result.push(i - j);
                j = lps[j - 1]; // continue searching
            }
        } else {
            if (j !== 0) {
                j = lps[j - 1];
            } else {
                i++;
            }
        }
    }

    return result;
}

// Test cases
console.log(strStrKMP("hello", "ll")); // 2
console.log(strStrKMP("aaaaa", "bba")); // -1
console.log(strStrKMP("sadbutsad", "sad")); // 0

console.log("LPS array for 'AABAACAABAA':", buildLPS("AABAACAABAA")); // [0, 1, 0, 1, 2, 0, 1, 2, 3, 4, 5]

console.log(findAllOccurrences("AABAACAADAABAABAAC", "AABA")); // [0, 9, 13]