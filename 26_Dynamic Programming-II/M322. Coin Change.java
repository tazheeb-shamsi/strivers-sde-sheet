// 322. Coin Change
// https://leetcode.com/problems/coin-change/

import java.util.Arrays;

class Solution {
    public int coinChange(int[] coins, int amount) {
        // dp[i] will be storing the minimum number of coins required for amount i
        int[] dp = new int[amount + 1];
        
        // Initialize the dp array with a value greater than the maximum possible coins needed
        Arrays.fill(dp, amount + 1);
        
        // Base case: 0 coins needed to make amount 0
        dp[0] = 0;
        
        // For each amount from 1 to amount
        for (int i = 1; i <= amount; i++) {
            // Try every coin that has value less than or equal to current amount
            for (int coin : coins) {
                if (coin <= i) {
                    dp[i] = Math.min(dp[i], dp[i - coin] + 1);
                }
            }
        }
        
        // If dp[amount] is still greater than amount, it means we couldn't make the amount
        return dp[amount] > amount ? -1 : dp[amount];
    }

    // Alternative solution with 2D DP for better understanding
    public int coinChange2D(int[] coins, int amount) {
        int n = coins.length;
        int[][] dp = new int[n + 1][amount + 1];
        
        // Initialize first row with infinity (or amount + 1)
        for (int j = 1; j <= amount; j++) {
            dp[0][j] = amount + 1;
        }
        
        for (int i = 1; i <= n; i++) {
            for (int j = 1; j <= amount; j++) {
                if (coins[i-1] > j) {
                    dp[i][j] = dp[i-1][j];
                } else {
                    dp[i][j] = Math.min(dp[i-1][j], dp[i][j - coins[i-1]] + 1);
                }
            }
        }
        
        return dp[n][amount] > amount ? -1 : dp[n][amount];
    }

    public static void main(String[] args) {
        Solution sol = new Solution();
        
        // Test Case 1
        int[] coins1 = {1, 2, 5};
        int amount1 = 11;
        System.out.println("Test Case 1: " + sol.coinChange(coins1, amount1)); // Expected: 3 (5 + 5 + 1)
        System.out.println("2D Version: " + sol.coinChange2D(coins1, amount1)); // Expected: 3
        
        // Test Case 2
        int[] coins2 = {2};
        int amount2 = 3;
        System.out.println("Test Case 2: " + sol.coinChange(coins2, amount2)); // Expected: -1 (can't make 3 with 2)
        System.out.println("2D Version: " + sol.coinChange2D(coins2, amount2)); // Expected: -1
        
        // Test Case 3: Edge case with amount 0
        int[] coins3 = {1};
        int amount3 = 0;
        System.out.println("Test Case 3: " + sol.coinChange(coins3, amount3)); // Expected: 0 (0 coins needed for 0 amount)
        System.out.println("2D Version: " + sol.coinChange2D(coins3, amount3)); // Expected: 0
    }
}