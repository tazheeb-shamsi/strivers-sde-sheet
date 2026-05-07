/**
 * TUF: Maximum Sum Increasing Subsequence
 * https://takeuforward.org/plus/dsa/problems/maximum-sum-increasing-subsequence
 *
 * Find the maximum sum of elements in an increasing subsequence.
 *
 * Type             | Details
 * -----------------+----------------------------------------------------
 * Time Complexity  | O(N²) – Two nested loops
 * Space Complexity | O(N) – DP array
 */

/**
 * Maximum Sum Increasing Subsequence
 * @param {number[]} arr - Input array
 * @param {number} n - Length of array
 * @returns {number} - Maximum sum of increasing subsequence
 */
function maxSumIS(arr, n) {
    // dp[i] = maximum sum of increasing subsequence ending at index i
    const dp = [...arr]; // Initialize with array values (each element is a subsequence of length 1)
    
    for (let i = 1; i < n; i++) {
        for (let j = 0; j < i; j++) {
            if (arr[j] < arr[i] && dp[j] + arr[i] > dp[i]) {
                dp[i] = dp[j] + arr[i];
            }
        }
    }
    
    // Find maximum in dp array
    return Math.max(...dp);
}

/**
 * Maximum Sum Increasing Subsequence with path reconstruction
 */
function maxSumISWithPath(arr, n) {
    const dp = [...arr];
    const parent = Array.from({ length: n }, (_, i) => i);
    
    for (let i = 1; i < n; i++) {
        for (let j = 0; j < i; j++) {
            if (arr[j] < arr[i] && dp[j] + arr[i] > dp[i]) {
                dp[i] = dp[j] + arr[i];
                parent[i] = j;
            }
        }
    }
    
    // Find index of maximum
    let maxSum = dp[0];
    let maxIdx = 0;
    for (let i = 1; i < n; i++) {
        if (dp[i] > maxSum) {
            maxSum = dp[i];
            maxIdx = i;
        }
    }
    
    // Reconstruct the subsequence
    const subsequence = [];
    let idx = maxIdx;
    while (parent[idx] !== idx) {
        subsequence.unshift(arr[idx]);
        idx = parent[idx];
    }
    subsequence.unshift(arr[idx]);
    
    return { maxSum, subsequence };
}

/**
 * O(n log n) approach using Binary Indexed Tree (advanced)
 * For each value, find max sum of smaller elements
 */
function maxSumISOptimized(arr, n) {
    // Coordinate compression
    const sorted = [...arr].sort((a, b) => a - b);
    const rank = new Map();
    let r = 1;
    for (const val of sorted) {
        if (!rank.has(val)) {
            rank.set(val, r++);
        }
    }
    
    // BIT for maximum query
    const bit = new Array(r + 1).fill(0);
    
    function update(idx, val) {
        while (idx <= r) {
            bit[idx] = Math.max(bit[idx], val);
            idx += idx & (-idx);
        }
    }
    
    function query(idx) {
        let result = 0;
        while (idx > 0) {
            result = Math.max(result, bit[idx]);
            idx -= idx & (-idx);
        }
        return result;
    }
    
    let maxSum = 0;
    for (let i = 0; i < n; i++) {
        const currRank = rank.get(arr[i]);
        // Find max sum of elements smaller than arr[i]
        const prevMax = query(currRank - 1);
        const currSum = prevMax + arr[i];
        maxSum = Math.max(maxSum, currSum);
        update(currRank, currSum);
    }
    
    return maxSum;
}

// Test cases
const arr = [1, 101, 2, 3, 100, 4, 5];
const n = arr.length;

console.log("Maximum Sum Increasing Subsequence:", maxSumIS(arr, n));
// Expected: 106 (1 + 2 + 3 + 100)

const result = maxSumISWithPath(arr, n);
console.log("Max Sum:", result.maxSum);
console.log("Subsequence:", result.subsequence);

// Test case 2
const arr2 = [10, 5, 4, 3];
console.log("\nTest 2:", maxSumIS(arr2, arr2.length)); // Expected: 10

// Test case 3
const arr3 = [3, 4, 5, 10];
console.log("Test 3:", maxSumIS(arr3, arr3.length)); // Expected: 22