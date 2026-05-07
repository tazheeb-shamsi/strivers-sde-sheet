/**
 * 416. Partition Equal Subset Sum
 * https://leetcode.com/problems/partition-equal-subset-sum/
 *
 * Determine if array can be partitioned into two subsets with equal sum.
 *
 * Type             | Details
 * -----------------+----------------------------------------------------
 * Time Complexity  | O(N * sum) – DP table
 * Space Complexity | O(sum) – 1D DP array
 */

/**
 * Partition Equal Subset Sum
 * @param {number[]} nums
 * @returns {boolean}
 */
function canPartition(nums) {
    const totalSum = nums.reduce((a, b) => a + b, 0);
    
    // If total sum is odd, cannot partition equally
    if (totalSum % 2 !== 0) return false;
    
    const target = totalSum / 2;
    
    // dp[i] = true if sum i is achievable
    const dp = new Array(target + 1).fill(false);
    dp[0] = true;
    
    for (const num of nums) {
        // Traverse from right to left to avoid using same element twice
        for (let j = target; j >= num; j--) {
            dp[j] = dp[j] || dp[j - num];
        }
        
        // Early termination
        if (dp[target]) return true;
    }
    
    return dp[target];
}

/**
 * Using 2D DP
 */
function canPartition2D(nums) {
    const n = nums.length;
    const totalSum = nums.reduce((a, b) => a + b, 0);
    
    if (totalSum % 2 !== 0) return false;
    
    const target = totalSum / 2;
    
    // dp[i][j] = true if sum j is achievable using first i elements
    const dp = Array.from({ length: n + 1 }, () => new Array(target + 1).fill(false));
    
    // Base case: sum 0 is always achievable
    for (let i = 0; i <= n; i++) dp[i][0] = true;
    
    for (let i = 1; i <= n; i++) {
        for (let j = 1; j <= target; j++) {
            dp[i][j] = dp[i - 1][j]; // Don't take current element
            if (nums[i - 1] <= j) {
                dp[i][j] = dp[i][j] || dp[i - 1][j - nums[i - 1]]; // Take current element
            }
        }
    }
    
    return dp[n][target];
}

/**
 * Recursive with Memoization
 */
function canPartitionMemo(nums) {
    const totalSum = nums.reduce((a, b) => a + b, 0);
    
    if (totalSum % 2 !== 0) return false;
    
    const target = totalSum / 2;
    const memo = new Map();
    
    function canAchieve(index, remaining) {
        if (remaining === 0) return true;
        if (index >= nums.length || remaining < 0) return false;
        
        const key = `${index},${remaining}`;
        if (memo.has(key)) return memo.get(key);
        
        // Take or skip current element
        const result = canAchieve(index + 1, remaining - nums[index]) || 
                       canAchieve(index + 1, remaining);
        
        memo.set(key, result);
        return result;
    }
    
    return canAchieve(0, target);
}

/**
 * Get the actual partition
 */
function partitionSubsets(nums) {
    const totalSum = nums.reduce((a, b) => a + b, 0);
    
    if (totalSum % 2 !== 0) return { canPartition: false, subsets: [[], []] };
    
    const target = totalSum / 2;
    const n = nums.length;
    
    const dp = Array.from({ length: n + 1 }, () => new Array(target + 1).fill(false));
    for (let i = 0; i <= n; i++) dp[i][0] = true;
    
    for (let i = 1; i <= n; i++) {
        for (let j = 1; j <= target; j++) {
            dp[i][j] = dp[i - 1][j];
            if (nums[i - 1] <= j) {
                dp[i][j] = dp[i][j] || dp[i - 1][j - nums[i - 1]];
            }
        }
    }
    
    if (!dp[n][target]) {
        return { canPartition: false, subsets: [[], []] };
    }
    
    // Backtrack to find subset
    const subset1 = [];
    let j = target;
    for (let i = n; i > 0 && j > 0; i--) {
        if (!dp[i - 1][j]) {
            subset1.push(nums[i - 1]);
            j -= nums[i - 1];
        }
    }
    
    const subset1Set = new Set(subset1.map((_, i) => i));
    const subset2 = nums.filter((_, i) => !subset1Set.has(i));
    
    return { canPartition: true, subsets: [subset1, subset2] };
}

// Test cases
console.log("canPartition([1,5,11,5]):", canPartition([1, 5, 11, 5])); // true
console.log("canPartition([1,2,3,5]):", canPartition([1, 2, 3, 5])); // false

console.log("\n2D DP:");
console.log("canPartition([1,5,11,5]):", canPartition2D([1, 5, 11, 5])); // true

console.log("\nMemoization:");
console.log("canPartition([1,5,11,5]):", canPartitionMemo([1, 5, 11, 5])); // true