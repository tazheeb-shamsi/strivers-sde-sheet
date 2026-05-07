// Largest Subarray with 0 sum a.k.a Largest Subarray with K sum
// https://geeksforgeeks.org/problems/largest-subarray-with-0-sum/1

/**
 * @param {number[]} arr
 * @param {number} n
 * @return {number}
 */
function maxLen(arr, n) {
    const map = new Map();
    let sum = 0;
    let maxLen = 0;

    for (let i = 0; i < n; i++) {
        sum += arr[i];
        if (sum === 0) {
            maxLen = i + 1;
        } else {
            if (map.has(sum)) {
                maxLen = Math.max(maxLen, i - map.get(sum));
            } else {
                map.set(sum, i);
            }
        }
    }

    return maxLen;
}

const arr = [15, -2, 2, -8, 1, 7, 10, 23];
console.log("Length of the largest subarray with 0 sum:", maxLen(arr, arr.length)); // Output: 5
