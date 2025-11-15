// 474. Ones and Zeroes
// https://leetcode.com/problems/ones-and-zeroes

class Solution {
    public int findMaxForm(String[] strs, int m, int n) {
        int[][] dp = new int[m + 1][n + 1];

        for (String str : strs) {
            int zeros = 0, ones = 0;
            for (char ch : str.toCharArray()) {
                if (ch == '0') zeros++;
                else ones++;
            }

            for (int i = m; i >= zeros; i--) {
                for (int j = n; j >= ones; j--) {
                    dp[i][j] = Math.max(dp[i][j], 1 + dp[i - zeros][j - ones]);
                }
            }
        }

        return dp[m][n];
    }

    public static void main(String[] args){
        Solution sol = new Solution();
        String[] strs = {"10", "0001", "111001", "1", "0"};
        System.out.println(sol.findMaxForm(strs, 5, 3)); // Expected: 4
    }
}