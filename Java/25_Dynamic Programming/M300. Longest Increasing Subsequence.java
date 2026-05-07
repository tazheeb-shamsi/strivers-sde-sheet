// 300. Longest Increasing Subsequence
// https://leetcode.com/problems/longest-increasing-subsequence/

import java.util.Arrays;

class Solution {
    public int lengthOfLIS(int[] nums) {
        if (nums == null || nums.length == 0) {
            return 0;
        }
        
        int[] dp = new int[nums.length];
        int len = 0;
        
        for (int num : nums) {
            int i = Arrays.binarySearch(dp, 0, len, num);
            if (i < 0) {
                i = -(i + 1);
            }
            dp[i] = num;
            if (i == len) {
                len++;
            }
        }
        
        return len;
    }

    public static void main(String[] args) {
        Solution solution = new Solution();
        
        // Test cases
        int[] nums1 = {10, 9, 2, 5, 3, 7, 101, 18};
        System.out.println("Test case 1: " + solution.lengthOfLIS(nums1)); // Expected: 4
        
        int[] nums2 = {0, 1, 0, 3, 2, 3};
        System.out.println("Test case 2: " + solution.lengthOfLIS(nums2)); // Expected: 4
        
        int[] nums3 = {7, 7, 7, 7, 7, 7, 7};
        System.out.println("Test case 3: " + solution.lengthOfLIS(nums3)); // Expected: 1
    }
}