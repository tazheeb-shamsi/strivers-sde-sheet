// SphereOnlineJudge: Aggressive Cows
// https://www.spoj.com/problems/AGGRCOW/

// Farmer John has built a new long barn, with N (2 ≤ N ≤ 100,000) stalls.
// The stalls are located along a straight line at positions x1 ... xN (0 ≤ xi ≤ 1,000,000,000).

// His C (2 ≤ C ≤ N) cows don't like this barn layout and become aggressive towards each other once put into a stall.
// To prevent the cows from hurting each other, Farmer John wants to assign the cows to the stalls,
// such that the minimum distance between any two of them is as large as possible.
// What is the largest minimum distance?

/**
 * Check if we can place all cows with at least minDist distance between them
 * @param {number[]} stalls - Sorted array of stall positions
 * @param {number} cows - Number of cows to place
 * @param {number} minDist - Minimum distance required between cows
 * @returns {boolean} - True if placement is possible
 */
function canPlaceCows(stalls, cows, minDist) {
    let count = 1;
    let lastPos = stalls[0];

    for (let i = 1; i < stalls.length; i++) {
        if (stalls[i] - lastPos >= minDist) {
            count++;
            lastPos = stalls[i];
        }
    }

    return count >= cows;
}

/**
 * Find the largest minimum distance between cows
 * @param {number[]} stalls - Array of stall positions
 * @param {number} cows - Number of cows to place
 * @returns {number} - Largest minimum distance
 */
function solve(stalls, cows) {
    stalls.sort((a, b) => a - b);
    const n = stalls.length;
    let low = 1;
    let high = stalls[n - 1] - stalls[0];
    let ans = 0;

    while (low <= high) {
        const mid = low + Math.floor((high - low) / 2);
        if (canPlaceCows(stalls, cows, mid)) {
            ans = mid;
            low = mid + 1;
        } else {
            high = mid - 1;
        }
    }

    return ans;
}

// Test cases
console.log(solve([1, 5, 2, 8, 4, 9], 3)); // Output: 3
console.log(solve([1, 2, 4, 8, 9], 3)); // Output: 3