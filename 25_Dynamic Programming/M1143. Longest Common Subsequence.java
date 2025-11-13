// 1143. Longest Common Subsequence
// https://leetcode.com/problems/longest-common-subsequence/


class Solution {
    public int longestCommonSubsequence(String text1, String text2) {
        int m = text1.length();
        int n = text2.length();
        int[][] dp = new int[m + 1][n + 1];
        
        for (int i = 0; i <= m; i++) {
            for (int j = 0; j <= n; j++) {
                if (i == 0 || j == 0) {
                    dp[i][j] = 0;
                } else if (text1.charAt(i - 1) == text2.charAt(j - 1)) {
                    dp[i][j] = dp[i - 1][j - 1] + 1;
                } else {
                    dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
                }
            }
        }
        
        return dp[m][n];
    }

    public static void main(String[] args) {
        Solution solution = new Solution();
        
        // Test cases
        String text1 = "abcde", text2 = "ace";
        System.out.println("Test case 1: " + solution.longestCommonSubsequence(text1, text2)); // Expected: 3
        
        text1 = "abc";
        text2 = "abc";
        System.out.println("Test case 2: " + solution.longestCommonSubsequence(text1, text2)); // Expected: 3
        
        text1 = "abc";
        text2 = "def";
        System.out.println("Test case 3: " + solution.longestCommonSubsequence(text1, text2)); // Expected: 0
    }
}