// 151. Reverse Words in a String
// https://leetcode.com/problems/reverse-words-in-a-string/

/**
 * Reverse the order of words in a string
 * @param {string} s - Input string
 * @returns {string} - String with words reversed
 */
function reverseWords(s) {
    // Split by whitespace, filter empty strings, reverse, and join
    return s.trim().split(/\s+/).reverse().join(' ');
}

// Alternative implementation without built-in reverse
function reverseWordsManual(s) {
    const words = s.trim().split(/\s+/);
    let result = "";

    for (let i = words.length - 1; i >= 0; i--) {
        result += words[i];
        if (i !== 0) {
            result += ' ';
        }
    }

    return result;
}

// Test cases
console.log(reverseWords("the sky is blue")); // "blue is sky the"
console.log(reverseWords("  hello world  ")); // "world hello"
console.log(reverseWords("a good   example")); // "example good a"
console.log(reverseWords("")); // ""
console.log(reverseWords("a")); // "a"
console.log(reverseWords("  a ")); // "a"
console.log(reverseWords("  a b ")); // "b a"

console.log("--- Manual implementation ---");
console.log(reverseWordsManual("the sky is blue")); // "blue is sky the"
console.log(reverseWordsManual("  hello world  ")); // "world hello"