// 50. Pow(x, n)
// https://leetcode.com/problems/powx-n/
// Implement pow(x, n), which calculates x raised to the power n (i.e., x^n).

/**
 * @param {number} x
 * @param {number} n
 * @return {number}
 */
function myPow(x, n) {
    // If n is 0, return 1 (base case)
    if (n === 0) return 1;

    // Handle negative powers
    if (n < 0) {
        x = 1 / x; // Convert x^(-n) to 1 / (x^n)
        n = -n; // Make n positive
    }

    // Efficient exponentiation by squaring
    return powHelper(x, n);
}

function powHelper(x, n) {
    if (n === 0) return 1; // Base case: x^0 = 1
    const half = powHelper(x, Math.floor(n / 2)); // Recurse on half of the exponent

    if (n % 2 === 0) {
        return half * half; // Even exponent: (x^n) = (x^(n/2))^2
    } else {
        return x * half * half; // Odd exponent: x^n = x * (x^(n/2))^2
    }
}

console.log(myPow(2.00000, 10)); // Output: 1024
console.log(myPow(2.10000, 3)); // Output: 9.261
console.log(myPow(2.00000, -2)); // Output: 0.25
