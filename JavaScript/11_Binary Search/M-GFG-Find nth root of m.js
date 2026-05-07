// GFG: Find nth root of m --> The N-th root of an integer.
// https://www.geeksforgeeks.org/problems/find-nth-root-of-m5843/1

// You are given 2 numbers n and m, the task is to find n√m (nth root of m).
// If the root is not integer then returns -1

// Examples:
// Input: n = 3, m = 27 --> Output: 3 (3^3 = 27)
// Input: n = 3, m = 9 --> Output: -1 (3rd root of 9 is not integer)
// Input: n = 4, m = 625 --> Output: 5 (5^4 = 625)

/**
 * Compute base^exp but stop early if result exceeds limit
 * @param {number} base - Base number
 * @param {number} exp - Exponent
 * @param {number} limit - Upper limit to stop computation
 * @returns {number} - Result of base^exp or value > limit
 */
function power(base, exp, limit) {
    let result = 1;
    for (let i = 0; i < exp; i++) {
        result *= base;
        if (result > limit) return result; // early stop
    }
    return result;
}

/**
 * Find the nth root of m (if it's an integer)
 * @param {number} n - The root to find
 * @param {number} m - The number to find root of
 * @returns {number} - nth root of m if integer, else -1
 */
function nthRoot(n, m) {
    if (m === 0) return 0;
    if (m === 1) return 1;

    let low = 1;
    let high = m;

    while (low <= high) {
        const mid = low + Math.floor((high - low) / 2);
        const pow = power(mid, n, m);

        if (pow === m) {
            return mid;
        } else if (pow < m) {
            low = mid + 1;
        } else {
            high = mid - 1;
        }
    }

    return -1;
}

// Test cases
console.log(nthRoot(3, 27)); // 3
console.log(nthRoot(3, 9)); // -1
console.log(nthRoot(4, 625)); // 5
console.log(nthRoot(2, 16)); // 4