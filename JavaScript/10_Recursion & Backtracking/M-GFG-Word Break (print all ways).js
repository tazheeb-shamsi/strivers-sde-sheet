// Word Break (print all ways)
// https://leetcode.com/problems/word-break-ii/

/**
 * @param {string} s
 * @param {string[]} wordDict
 * @return {string[]}
 */
function wordBreak(s, wordDict) {
    const result = [];
    wordBreakHelper(wordDict, s, 0, [], result);
    return result;
}

function wordBreakHelper(dict, s, start, current, result) {
    if (start === s.length) {
        result.push(current.join(' '));
        return;
    }

    for (const word of dict) {
        if (s.startsWith(word, start)) {
            current.push(word);
            wordBreakHelper(dict, s, start + word.length, current, result);
            current.pop();
        }
    }
}

const dict = ["apple", "pen", "applepen", "pine", "pineapple"];
const s = "pineapplepenapple";
console.log(wordBreak(s, dict));
// Output: ["pine apple pen apple", "pine applepen apple", "pineapple pen apple"]
