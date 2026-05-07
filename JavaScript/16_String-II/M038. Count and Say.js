// 38. Count and Say
// https://leetcode.com/problems/count-and-say/

// The count-and-say sequence is a sequence of digit strings defined by:
// countAndSay(1) = "1"
// countAndSay(n) is the run-length encoding of countAndSay(n - 1)

// Example:
// countAndSay(1) = "1"
// countAndSay(2) = "11" (one 1)
// countAndSay(3) = "21" (two 1s)
// countAndSay(4) = "1211" (one 2, one 1)

/**
 * Generate the nth term of the count-and-say sequence
 * @param {number} n - Term number (1-indexed)
 * @returns {string} - The nth term
 */
function countAndSay(n) {
    if (n === 1) return "1";

    const prev = countAndSay(n - 1);
    let result = "";
    let count = 1;
    let prevChar = prev[0];

    for (let i = 1; i < prev.length; i++) {
        if (prev[i] === prevChar) {
            count++;
        } else {
            result += count.toString() + prevChar;
            count = 1;
            prevChar = prev[i];
        }
    }

    // Append the last group
    result += count.toString() + prevChar;

    return result;
}

// Iterative version
function countAndSayIterative(n) {
    let result = "1";

    for (let i = 2; i <= n; i++) {
        let next = "";
        let count = 1;
        let prevChar = result[0];

        for (let j = 1; j < result.length; j++) {
            if (result[j] === prevChar) {
                count++;
            } else {
                next += count.toString() + prevChar;
                count = 1;
                prevChar = result[j];
            }
        }

        next += count.toString() + prevChar;
        result = next;
    }

    return result;
}

// Test cases
console.log(countAndSay(1)); // "1"
console.log(countAndSay(2)); // "11"
console.log(countAndSay(3)); // "21"
console.log(countAndSay(4)); // "1211"
console.log(countAndSay(5)); // "111221"
console.log(countAndSay(6)); // "312211"