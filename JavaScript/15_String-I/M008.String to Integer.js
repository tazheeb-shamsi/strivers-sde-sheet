// 8. String to Integer (atoi)
// https://leetcode.com/problems/string-to-integer-atoi/

// Implement the myAtoi(string s) function, which converts a string to a 32-bit signed integer.

const INT_MAX = 2147483647; // 2^31 - 1
const INT_MIN = -2147483648; // -2^31

/**
 * Convert string to integer (atoi implementation)
 * @param {string} s - Input string
 * @returns {number} - Parsed integer
 */
function myAtoi(s) {
    let sign = 1;
    let result = 0;
    let index = 0;
    const n = s.length;

    // Skip leading whitespaces
    while (index < n && s[index] === ' ') {
        index++;
    }

    // Check for sign
    if (index < n && (s[index] === '+' || s[index] === '-')) {
        sign = s[index] === '+' ? 1 : -1;
        index++;
    }

    // Process digits
    while (index < n && s[index] >= '0' && s[index] <= '9') {
        const digit = s[index].charCodeAt(0) - '0'.charCodeAt(0);

        // Check for overflow
        if (result > Math.floor(INT_MAX / 10) ||
            (result === Math.floor(INT_MAX / 10) && digit > INT_MAX % 10)) {
            return sign === 1 ? INT_MAX : INT_MIN;
        }

        result = result * 10 + digit;
        index++;
    }

    return result * sign;
}

// Test cases
console.log(myAtoi("42")); // 42
console.log(myAtoi("   -42")); // -42
console.log(myAtoi("4193 with words")); // 4193
console.log(myAtoi("words and 987")); // 0
console.log(myAtoi("-91283472332")); // -2147483648 (INT_MIN)
console.log(myAtoi("91283472332")); // 2147483647 (INT_MAX)