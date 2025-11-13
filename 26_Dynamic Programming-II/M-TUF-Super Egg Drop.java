// Super Egg Drop
// https://takeuforward.org/plus/dsa/problems/super-egg-drop

/**
 * You are given n identical eggs and a building with k floors numbered from 1 to k.
 * There exists an unknown floor f such that:
 * Any egg dropped from a floor higher than f will break.
 * Any egg dropped from f or below will not break.
 * Your goal is to determine the value of f using the minimum number of egg drops in the worst-case scenario.
 *
 * You may assume:
 * An egg that survives a fall can be reused.
 * A broken egg must be discarded.
 * All eggs behave the same way.
 * If an egg breaks at a floor, it would break at any higher floor.
 * If an egg survives a floor, it would survive any lower floor.
 *
 * Examples:
 * Input: n = 2, k = 36
 * Output: 8
 * Explanation: Minimum 8 moves are needed in the worst-case using binary + linear strategy.
 */

class Solution {
    public int eggDrop(int eggs, int floors) {
        // Create a DP table where dp[i][j] represents the minimum number of attempts
        // needed for i eggs and j floors
        int[][] dp = new int[eggs + 1][floors + 1];
        
        // Base cases:
        // 1. If there's only 1 egg, we need to check each floor one by one
        for (int j = 1; j <= floors; j++) {
            dp[1][j] = j;
        }
        
        // 2. If there's only 1 floor, we need only 1 attempt
        // 3. If there are 0 floors, we need 0 attempts
        for (int i = 1; i <= eggs; i++) {
            dp[i][1] = 1;
            dp[i][0] = 0;
        }
        
        // Fill the DP table
        for (int i = 2; i <= eggs; i++) {          // For each number of eggs
            for (int j = 2; j <= floors; j++) {     // For each number of floors
                dp[i][j] = Integer.MAX_VALUE;
                
                // Try dropping egg from each floor k from 1 to j
                for (int k = 1; k <= j; k++) {
                    // If egg breaks, check floors below (i-1 eggs, k-1 floors)
                    // If egg doesn't break, check floors above (i eggs, j-k floors)
                    int attempts = 1 + Math.max(dp[i-1][k-1], dp[i][j-k]);
                    if (attempts < dp[i][j]) {
                        dp[i][j] = attempts;
                    }
                }
            }
        }
        
        return dp[eggs][floors];
    }

    public static void main(String[] args) {
        Solution sol = new Solution();
        int n = 2, k = 36;
        System.out.println("Minimum number of attempts needed: " + sol.eggDrop(n, k));
    }
}