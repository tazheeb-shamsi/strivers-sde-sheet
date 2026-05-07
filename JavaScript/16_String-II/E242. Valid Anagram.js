// 242. Valid Anagram
// https://leetcode.com/problems/valid-anagram/

/**
 * Check if t is an anagram of s
 * @param {string} s - First string
 * @param {string} t - Second string
 * @returns {boolean} - True if t is an anagram of s
 */
function isAnagram(s, t) {
    if (s.length !== t.length) return false;

    const count = new Array(26).fill(0);

    for (const c of s) {
        count[c.charCodeAt(0) - 'a'.charCodeAt(0)]++;
    }

    for (const c of t) {
        count[c.charCodeAt(0) - 'a'.charCodeAt(0)]--;
    }

    for (const n of count) {
        if (n !== 0) return false;
    }

    return true;
}

// Alternative using Map (handles Unicode)
function isAnagramMap(s, t) {
    if (s.length !== t.length) return false;

    const map = new Map();

    for (const c of s) {
        map.set(c, (map.get(c) || 0) + 1);
    }

    for (const c of t) {
        if (!map.has(c) || map.get(c) === 0) return false;
        map.set(c, map.get(c) - 1);
    }

    return true;
}

// Test cases
console.log(isAnagram("anagram", "nagaram")); // true
console.log(isAnagram("rat", "car")); // false
console.log(isAnagram("listen", "silent")); // true
console.log(isAnagram("hello", "world")); // false