// 416. Partition Equal Subset Sum --> DP - Subset Sum Equal to Target
// https://leetcode.com/problems/partition-equal-subset-sum/

class Solution {
    public boolean canPartition(int[] nums) {
        int totalSum = 0;
        for (int num : nums) {
            totalSum += num;
        }
        
        // If total sum is odd, cannot partition into two equal subsets
        if (totalSum % 2 != 0) {
            return false;
        }
        
        int target = totalSum / 2;
        int n = nums.length;
        
        // dp[i][j] = can we make sum j using first i elements
        boolean[][] dp = new boolean[n + 1][target + 1];
        
        // Base case: sum 0 can always be achieved with any number of elements (empty subset)
        for (int i = 0; i <= n; i++) {
            dp[i][0] = true;
        }
        
        // Fill the dp table
        for (int i = 1; i <= n; i++) {
            for (int j = 1; j <= target; j++) {
                // If current element is greater than current sum, we can't include it
                if (nums[i - 1] > j) {
                    dp[i][j] = dp[i - 1][j];
                } else {
                    // We can either include or exclude the current element
                    dp[i][j] = dp[i - 1][j] || dp[i - 1][j - nums[i - 1]];
                }
            }
        }
        
        return dp[n][target];
    }

    // Space optimized version using 1D array
    public boolean canPartitionOptimized(int[] nums) {
        int totalSum = 0;
        for (int num : nums) {
            totalSum += num;
        }
        
        if (totalSum % 2 != 0) {
            return false;
        }
        
        int target = totalSum / 2;
        boolean[] dp = new boolean[target + 1];
        dp[0] = true;
        
        for (int num : nums) {
            for (int j = target; j >= num; j--) {
                dp[j] = dp[j] || dp[j - num];
            }
        }
        
        return dp[target];
    }

    public static void main(String[] args) {
        Solution sol = new Solution();
        
        // Test Case 1
        int[] nums1 = {1, 5, 11, 5};
        System.out.println("Test Case 1: " + sol.canPartition(nums1)); // Expected: true
        System.out.println("Optimized: " + sol.canPartitionOptimized(nums1)); // Expected: true
        
        // Test Case 2
        int[] nums2 = {1, 2, 3, 5};
        System.out.println("Test Case 2: " + sol.canPartition(nums2)); // Expected: false
        System.out.println("Optimized: " + sol.canPartitionOptimized(nums2)); // Expected: false
        
        // Test Case 3: Edge case with single element
        int[] nums3 = {2};
        System.out.println("Test Case 3: " + sol.canPartition(nums3)); // Expected: false
        System.out.println("Optimized: " + sol.canPartitionOptimized(nums3)); // Expected: false
    }
}