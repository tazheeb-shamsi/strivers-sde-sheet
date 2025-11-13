// 0 and 1 Knapsack
// https://takeuforward.org/plus/dsa/problems/0-and-1-knapsack

/**
 * Given two integer arrays, val and wt, each of size N, 
 * which represent the values and weights of N items respectively, 
 * and an integer W representing the maximum capacity of a knapsack, 
 * determine the maximum value achievable by selecting a subset of the items 
 * such that the total weight of the selected items does not exceed the knapsack capacity W.

 * Each item can either be picked in its entirety or not picked at all (0-1 property). 
 * The goal is to maximize the sum of the values of the selected items while keeping the total weight within the knapsack's capacity.
 * 
 * Examples:
 * Input: val = [60, 100, 120], wt = [10, 20, 30], W = 50
 * Output: 220
 * Explanation: Select items with weights 20 and 30 for a total value of 100 + 120 = 220.
 * 
 * Input: val = [10, 40, 30, 50], wt = [5, 4, 6, 3], W = 10
 * Output: 90
 * Explanation: Select items with weights 4 and 3 for a total value of 40 + 50 = 90.
 * 
 * Input: val = [20, 5, 10, 40, 15, 25], wt = [1, 2, 3, 8, 7, 4], W = 10
 * Output: 65
 * Explanation: Select items with weights 1, 3, and 4 for a total value of 20 + 10 + 35 = 65.
 */


class Solution {
    public int knapsack01(int[] wt, int[] val, int n, int W) {
        // dp[i] will store the maximum value that can be obtained with capacity i
        int[] dp = new int[W + 1];
        
        // Initialize dp array with 0 (base case: 0 value for 0 capacity)
        // Java initializes int arrays to 0 by default, so no need to explicitly set
        
        // Iterate through each item
        for (int i = 0; i < n; i++) {
            // Process the dp array from right to left to avoid overwriting values
            // that are yet to be processed in the current iteration
            for (int w = W; w >= wt[i]; w--) {
                // For each weight, decide whether to include the current item or not
                // dp[w] represents the maximum value without including the current item
                // dp[w - wt[i]] + val[i] represents the maximum value including the current item
                dp[w] = Math.max(dp[w], dp[w - wt[i]] + val[i]);
            }
        }
        
        // The answer is the maximum value that can be obtained with the given capacity W
        return dp[W];
    }

    public static void main(String[] args) {
        Solution solution = new Solution();
        
        // Test case 1
        int[] val1 = {60, 100, 120};
        int[] wt1 = {10, 20, 30};
        int W1 = 50;
        System.out.println("Test Case 1: " + solution.knapsack01(wt1, val1, val1.length, W1)); // Expected: 220
        
        // Test case 2
        int[] val2 = {10, 40, 30, 50};
        int[] wt2 = {5, 4, 6, 3};
        int W2 = 10;
        System.out.println("Test Case 2: " + solution.knapsack01(wt2, val2, val2.length, W2)); // Expected: 90
        
        // Test case 3
        int[] val3 = {20, 5, 10, 40, 15, 25};
        int[] wt3 = {1, 2, 3, 8, 7, 4};
        int W3 = 10;
        System.out.println("Test Case 3: " + solution.knapsack01(wt3, val3, val3.length, W3)); // Expected: 65
        
        // Test case 4: Edge case with zero capacity
        int[] val4 = {1, 2, 3};
        int[] wt4 = {4, 5, 1};
        int W4 = 0;
        System.out.println("Test Case 4: " + solution.knapsack01(wt4, val4, val4.length, W4)); // Expected: 0
    }
}