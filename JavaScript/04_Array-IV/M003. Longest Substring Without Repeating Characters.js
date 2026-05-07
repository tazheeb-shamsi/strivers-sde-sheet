// 3. Longest Substring Without Repeating Characters
// https://leetcode.com/problems/longest-substring-without-repeating-characters/

/**
 * @param {string} s
 * @return {number}
 */
function lengthOfLongestSubstring(s) {
    const n = s.length;
    let maxLength = 0;
    let left = 0;
    const charIndexMap = new Map();

    for (let right = 0; right < n; right++) {
        const currentChar = s[right];
        if (charIndexMap.has(currentChar)) {
            left = Math.max(left, charIndexMap.get(currentChar) + 1);
        }
        charIndexMap.set(currentChar, right);
        maxLength = Math.max(maxLength, right - left + 1);
    }

    return maxLength;
}

const input = "abcabcbb";
console.log("Length of longest substring without repeating characters:", lengthOfLongestSubstring(input)); // Output: 3
