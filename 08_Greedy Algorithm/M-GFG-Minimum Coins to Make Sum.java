// GFG : Find Minimum Number Of Coins That Make A Change.
// Coin Change - Minimum Coins to Make Sum
// https://www.geeksforgeeks.org/problems/number-of-coins1824/1

import java.util.Arrays;

class Solution {

    public int minCoins(int[] coins, int sum) {
        int[] dp = new int[sum + 1];
        Arrays.fill(dp, Integer.MAX_VALUE);
        dp[0] = 0;
        for (int i = 1; i <= sum; i++) {
            for (int coin : coins) {
                if (i - coin >= 0 && dp[i - coin] != Integer.MAX_VALUE) {
                    dp[i] = Math.min(dp[i], dp[i - coin] + 1);
                }
            }
        }
        return dp[sum] == Integer.MAX_VALUE ? -1 : dp[sum];
    }

    public static void main(String[] args) {
        Solution solution = new Solution();
        int[] coins = { 1, 2, 5 };
        int sum = 11;
        System.out.println(solution.minCoins(coins, sum));
    }
}
