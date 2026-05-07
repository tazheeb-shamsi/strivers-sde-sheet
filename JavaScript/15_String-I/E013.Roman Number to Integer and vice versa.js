// 13. Roman to Integer & 12. Integer to Roman
// https://leetcode.com/problems/roman-to-integer/
// https://leetcode.com/problems/integer-to-roman/

/**
 * Get integer value for a Roman character
 * @param {string} c - Roman character
 * @returns {number} - Integer value
 */
function getNumberValue(c) {
    const map = {
        'I': 1,
        'V': 5,
        'X': 10,
        'L': 50,
        'C': 100,
        'D': 500,
        'M': 1000
    };
    return map[c] || 0;
}

/**
 * Convert Roman numeral to integer
 * @param {string} s - Roman numeral string
 * @returns {number} - Integer value
 */
function romanToInt(s) {
    let result = 0;
    let prevValue = 0;

    for (let i = s.length - 1; i >= 0; i--) {
        const value = getNumberValue(s[i]);
        if (value < prevValue) {
            result -= value;
        } else {
            result += value;
        }
        prevValue = value;
    }

    return result;
}

/**
 * Convert integer to Roman numeral
 * @param {number} num - Integer to convert
 * @returns {string} - Roman numeral string
 */
function intToRoman(num) {
    const values = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];
    const symbols = ["M", "CM", "D", "CD", "C", "XC", "L", "XL", "X", "IX", "V", "IV", "I"];

    let result = "";

    for (let i = 0; i < values.length && num > 0; i++) {
        while (num >= values[i]) {
            num -= values[i];
            result += symbols[i];
        }
    }

    return result;
}

// Test cases
// Roman → Integer
console.log(romanToInt("III")); // 3
console.log(romanToInt("LVIII")); // 58
console.log(romanToInt("MCMXCIV")); // 1994

// Integer → Roman
console.log(intToRoman(3)); // "III"
console.log(intToRoman(58)); // "LVIII"
console.log(intToRoman(1994)); // "MCMXCIV"