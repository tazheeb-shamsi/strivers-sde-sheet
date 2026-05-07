// 131. Palindrome Partitioning
// https://leetcode.com/problems/palindrome-partitioning/

/**
 * @param {string} s
 * @return {string[][]}
 */
function partition(s) {
    const result = [];
    backtrack(result, [], s, 0);
    return result;
}

function backtrack(result, current, s, start) {
    if (start === s.length) {
        result.push([...current]);
        return;
    }

    for (let end = start; end < s.length; end++) {
        if (isPalindrome(s, start, end)) {
            current.push(s.substring(start, end + 1));
            backtrack(result, current, s, end + 1);
            current.pop();
        }
    }
}

function isPalindrome(s, left, right) {
    while (left < right) {
        if (s[left++] !== s[right--]) return false;
    }
    return true;
}

console.log(partition("aab")); // Output: [["a", "a", "b"], ["aa", "b"]]
