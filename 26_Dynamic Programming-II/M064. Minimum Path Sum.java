// 64. Minimum Path Sum
// Minimum sum path in the matrix.
// (count paths and similar type do, also backtrack to find the Minimum path)
// https://leetcode.com/problems/minimum-path-sum/

class Solution {

    static {
        System.gc();
        for (int i = 0; i< 200; i++) {
            minPathSum(new int[][]{new int[]{0}});
        }
    }

    public static int minPathSum(int[][] grid) {
        int m = grid.length, n = grid[0].length;
        
        for (int j = 1; j < n; j++)
            grid[0][j] += grid[0][j-1];
        
        for (int i = 1; i < m; i++)
            grid[i][0] += grid[i-1][0];
        
        for (int i = 1; i < m; i++)
            for (int j = 1; j < n; j++)
                grid[i][j] += Math.min(grid[i-1][j], grid[i][j-1]);
        
        return grid[m-1][n-1];
    }

    public static void main(String[] args) {
        Solution sol = new Solution();
        
        // Test Case 1
        int[][] grid1 = {{1,3,1},{1,5,1},{4,2,1}};
        System.out.println("Test Case 1: " + sol.minPathSum(grid1)); // Expected: 7
        
        // Test Case 2
        int[][] grid2 = {{1,2,3},{4,5,6}};
        System.out.println("Test Case 2: " + sol.minPathSum(grid2)); // Expected: 12
    }
}
