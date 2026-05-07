// 686. Repeated String Match
// https://leetcode.com/problems/repeated-string-match/

// Given two strings a and b, return the minimum number of times you should repeat
// string a so that string b is a substring of it. If it is impossible, return -1.

/**
 * Find minimum repetitions of a needed for b to be a substring
 * @param {string} a - String to repeat
 * @param {string} b - String to find as substring
 * @returns {number} - Minimum repetitions, or -1 if impossible
 */
function repeatedStringMatch(a, b) {
    let count = 1;
    let temp = a;

    // Repeat until temp is at least as long as b
    while (temp.length < b.length) {
        temp += a;
        count++;
    }

    // Check if b is a substring
    if (temp.includes(b)) return count;

    // Try one more repetition (for edge cases where b spans across repetitions)
    if ((temp + a).includes(b)) return count + 1;

    return -1;
}

// Test cases
console.log(repeatedStringMatch("abcd", "cdabcdab")); // 3
console.log(repeatedStringMatch("a", "aa")); // 2
console.log(repeatedStringMatch("a", "a")); // 1
console.log(repeatedStringMatch("abc", "wxyz")); // -1
console.log(repeatedStringMatch("abc", "cabcabca")); // 4