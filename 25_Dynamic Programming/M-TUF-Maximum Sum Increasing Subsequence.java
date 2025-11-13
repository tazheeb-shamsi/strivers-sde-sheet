// TUF - Maximum Sum Increasing Subsequence
// https://takeuforward.org/plus/dsa/problems/maximum-sum-increasing-subsequence

/**
 * Given an array arr[] of positive integers, find the maximum possible sum of a subsequence such that the elements of the subsequence are in strictly increasing order.
 * The subsequence does not need to be contiguous.
 * You must choose elements such that their order in the array is preserved and each chosen element is strictly greater than the previous one.
 * 
 * Examples:
 * Input: arr = [1, 101, 2, 3, 100]
 * Output: 106
 * Explanation: The subsequence [1, 2, 3, 100] is strictly increasing and has the maximum sum = 106.
 * 
 * Input: arr = [4, 1, 2, 3]
 * Output: 6
 * Explanation: The maximum sum increasing subsequence is [1, 2, 3], sum = 6.
 */

class Solution {
    public int maxSumIncreasingSubsequence(int[] arr, int n) {
        if (n == 0) return 0;
        
        // dp[i] will store the maximum sum of increasing subsequence ending at index i
        int[] dp = new int[n];
        
        // Initialize dp array with the array values as the minimum possible sum is the element itself
        for (int i = 0; i < n; i++) {
            dp[i] = arr[i];
        }
        
        // To store the maximum sum found so far
        int maxSum = dp[0];
        
        // For each element, check all previous elements to find the maximum sum increasing subsequence
        for (int i = 1; i < n; i++) {
            for (int j = 0; j < i; j++) {
                // If current element is greater than previous element and 
                // including it in the subsequence gives a larger sum
                if (arr[i] > arr[j] && dp[i] < dp[j] + arr[i]) {
                    dp[i] = dp[j] + arr[i];
                }
            }
            // Update the maximum sum found so far
            maxSum = Math.max(maxSum, dp[i]);
        }
        
        return maxSum;
    }

    public static void main(String[] args) {
        Solution solution = new Solution();
        
        // Test case 1
        int[] arr1 = {1, 101, 2, 3, 100};
        System.out.println("Test Case 1: " + solution.maxSumIncreasingSubsequence(arr1, arr1.length)); // Expected: 106
        
        // Test case 2
        int[] arr2 = {4, 1, 2, 3};
        System.out.println("Test Case 2: " + solution.maxSumIncreasingSubsequence(arr2, arr2.length)); // Expected: 6
        
        // Test case 3: All elements in decreasing order
        int[] arr3 = {5, 4, 3, 2, 1};
        System.out.println("Test Case 3: " + solution.maxSumIncreasingSubsequence(arr3, arr3.length)); // Expected: 5
        
        // Test case 4: All elements same
        int[] arr4 = {3, 3, 3, 3};
        System.out.println("Test Case 4: " + solution.maxSumIncreasingSubsequence(arr4, arr4.length)); // Expected: 3
    }
}