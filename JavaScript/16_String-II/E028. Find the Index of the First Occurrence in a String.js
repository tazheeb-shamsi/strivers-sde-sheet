// 28. Find the Index of the First Occurrence in a String
// https://leetcode.com/problems/find-the-index-of-the-first-occurrence-in-a-string/

/**
 * Find the first occurrence of needle in haystack
 * @param {string} haystack - String to search in
 * @param {string} needle - String to search for
 * @returns {number} - Index of first occurrence, or -1 if not found
 */
function strStr(haystack, needle) {
    if (needle === "") return 0;

    const n = haystack.length;
    const m = needle.length;

    for (let i = 0; i <= n - m; i++) {
        if (haystack.substring(i, i + m) === needle) {
            return i;
        }
    }

    return -1;
}

// Alternative: Using built-in indexOf
function strStrBuiltin(haystack, needle) {
    return haystack.indexOf(needle);
}

// Test cases
console.log(strStr("hello", "ll")); // 2
console.log(strStr("aaaaa", "bba")); // -1
console.log(strStr("sadbutsad", "sad")); // 0
console.log(strStr("leetcode", "leeto")); // -1
console.log(strStr("", "")); // 0