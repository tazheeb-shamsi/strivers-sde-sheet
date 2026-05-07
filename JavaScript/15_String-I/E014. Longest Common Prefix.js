// 14. Longest Common Prefix
// https://leetcode.com/problems/longest-common-prefix

/**
 * Find the longest common prefix string amongst an array of strings
 * @param {string[]} strs - Array of strings
 * @returns {string} - Longest common prefix
 */
function longestCommonPrefix(strs) {
    if (!strs || strs.length === 0) return "";

    let prefix = strs[0];

    for (let i = 1; i < strs.length; i++) {
        while (strs[i].indexOf(prefix) !== 0) {
            prefix = prefix.substring(0, prefix.length - 1);
            if (prefix === "") return "";
        }
    }

    return prefix;
}

// Test cases
console.log(longestCommonPrefix(["flower", "flow", "flight"])); // "fl"
console.log(longestCommonPrefix(["dog", "racecar", "car"])); // ""
console.log(longestCommonPrefix(["interspecies", "interstellar", "interstate"])); // "inters"
console.log(longestCommonPrefix(["a"])); // "a"
console.log(longestCommonPrefix([""])); // ""