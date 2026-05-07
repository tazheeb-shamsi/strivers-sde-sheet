/**
 * 300. Longest Increasing Subsequence
 * https://leetcode.com/problems/longest-increasing-subsequence/
 *
 * Type             | Details
 * -----------------+----------------------------------------------------
 * Time Complexity  | O(N log N) – Binary search approach
 * Space Complexity | O(N) – For the tails array
 */

/**
 * LIS using O(n²) DP approach
 * @param {number[]} nums
 * @returns {number}
 */
function lengthOfLIS_DP(nums) {
    const n = nums.length;
    if (n === 0) return 0;
    
    // dp[i] = length of LIS ending at index i
    const dp = new Array(n).fill(1);
    let maxLen = 1;
    
    for (let i = 1; i < n; i++) {
        for (let j = 0; j < i; j++) {
            if (nums[j] < nums[i]) {
                dp[i] = Math.max(dp[i], dp[j] + 1);
            }
        }
        maxLen = Math.max(maxLen, dp[i]);
    }
    
    return maxLen;
}

/**
 * LIS using O(n log n) Binary Search approach
 * @param {number[]} nums
 * @returns {number}
 */
function lengthOfLIS(nums) {
    const n = nums.length;
    if (n === 0) return 0;
    
    // tails[i] = smallest ending element of all increasing subsequences of length i+1
    const tails = [];
    
    for (const num of nums) {
        // Binary search for the position to insert/replace
        let left = 0, right = tails.length;
        
        while (left < right) {
            const mid = Math.floor((left + right) / 2);
            if (tails[mid] < num) {
                left = mid + 1;
            } else {
                right = mid;
            }
        }
        
        if (left === tails.length) {
            tails.push(num);
        } else {
            tails[left] = num;
        }
    }
    
    return tails.length;
}

/**
 * LIS with path reconstruction
 */
function lisWithPath(nums) {
    const n = nums.length;
    if (n === 0) return { length: 0, subsequence: [] };
    
    const dp = new Array(n).fill(1);
    const parent = new Array(n).fill(-1);
    
    let maxLen = 1;
    let maxIdx = 0;
    
    for (let i = 1; i < n; i++) {
        for (let j = 0; j < i; j++) {
            if (nums[j] < nums[i] && dp[j] + 1 > dp[i]) {
                dp[i] = dp[j] + 1;
                parent[i] = j;
            }
        }
        if (dp[i] > maxLen) {
            maxLen = dp[i];
            maxIdx = i;
        }
    }
    
    // Reconstruct the LIS
    const lis = [];
    let idx = maxIdx;
    while (idx !== -1) {
        lis.unshift(nums[idx]);
        idx = parent[idx];
    }
    
    return { length: maxLen, subsequence: lis };
}

/**
 * Count number of LIS of maximum length
 */
function findNumberOfLIS(nums) {
    const n = nums.length;
    if (n === 0) return 0;
    
    const len = new Array(n).fill(1); // Length of LIS ending at i
    const cnt = new Array(n).fill(1); // Count of LIS ending at i
    
    let maxLen = 1;
    
    for (let i = 1; i < n; i++) {
        for (let j = 0; j < i; j++) {
            if (nums[j] < nums[i]) {
                if (len[j] + 1 > len[i]) {
                    len[i] = len[j] + 1;
                    cnt[i] = cnt[j];
                } else if (len[j] + 1 === len[i]) {
                    cnt[i] += cnt[j];
                }
            }
        }
        maxLen = Math.max(maxLen, len[i]);
    }
    
    let count = 0;
    for (let i = 0; i < n; i++) {
        if (len[i] === maxLen) {
            count += cnt[i];
        }
    }
    
    return count;
}

// Test cases
console.log("LIS([10,9,2,5,3,7,101,18]):", lengthOfLIS([10, 9, 2, 5, 3, 7, 101, 18])); // 4
console.log("LIS([0,1,0,3,2,3]):", lengthOfLIS([0, 1, 0, 3, 2, 3])); // 4
console.log("LIS([7,7,7,7,7]):", lengthOfLIS([7, 7, 7, 7, 7])); // 1

console.log("\nWith path:");
const result = lisWithPath([10, 9, 2, 5, 3, 7, 101, 18]);
console.log("Length:", result.length);
console.log("Subsequence:", result.subsequence);

console.log("\nCount of LIS:");
console.log("Count([1,3,5,4,7]):", findNumberOfLIS([1, 3, 5, 4, 7])); // 2