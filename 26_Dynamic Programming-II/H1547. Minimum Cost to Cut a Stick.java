// 1547. Minimum Cost to Cut a Stick
// https://leetcode.com/problems/minimum-cost-to-cut-a-stick/

import java.util.Arrays;

class Solution {
    public int minCost(int n, int[] cuts) {
        // Add 0 and n to the cuts array and sort it
        int m = cuts.length;
        int[] newCuts = new int[m + 2];
        System.arraycopy(cuts, 0, newCuts, 1, m);
        newCuts[0] = 0;
        newCuts[m + 1] = n;
        Arrays.sort(newCuts);
        
        // dp[i][j] = min cost to cut from newCuts[i] to newCuts[j]
        int[][] dp = new int[m + 2][m + 2];
        
        // Fill the DP table in a way that all subproblems are solved before they're needed
        for (int i = m; i >= 0; i--) {
            for (int j = i + 1; j <= m + 1; j++) {
                if (j - i == 1) {
                    dp[i][j] = 0;  // No cuts needed
                    continue;
                }
                
                int minCost = Integer.MAX_VALUE;
                int length = newCuts[j] - newCuts[i];
                
                // Try all possible cuts between i and j
                for (int k = i + 1; k < j; k++) {
                    int cost = dp[i][k] + dp[k][j] + length;
                    if (cost < minCost) {
                        minCost = cost;
                    }
                }
                
                dp[i][j] = minCost;
            }
        }
        
        return dp[0][m + 1];
    }

    public static void main(String[] args) {
        Solution sol = new Solution();
        int n = 7;
        int[] cuts = {1, 3, 4, 5};
        System.out.println("Minimum cost to cut the stick: " + sol.minCost(n, cuts)); // Output: 16
        
        n = 9;
        cuts = new int[]{5, 6, 1, 4, 2};
        System.out.println("Minimum cost to cut the stick: " + sol.minCost(n, cuts)); // Output: 22
    }
}