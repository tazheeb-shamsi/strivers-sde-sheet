// 200. Number of Islands
// https://leetcode.com/problems/number-of-islands/

class Solution {
    public int numIslands(char[][] grid) {
        if (grid == null || grid.length == 0) {
            return 0;
        }
        
        int m = grid.length;
        int n = grid[0].length;
        int count = 0;
        
        // Traverse through each cell in the grid
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                // If we find a land cell ('1'), it's a new island
                if (grid[i][j] == '1') {
                    count++;
                    // Mark all connected land cells as visited using DFS
                    dfs(grid, i, j, m, n);
                }
            }
        }
        
        return count;
    }
    
    private void dfs(char[][] grid, int i, int j, int m, int n) {
        // Base cases: out of bounds or water or already visited
        if (i < 0 || i >= m || j < 0 || j >= n || grid[i][j] == '0') {
            return;
        }
        
        // Mark current cell as visited by changing '1' to '0'
        grid[i][j] = '0';
        
        // Explore all 4 directions (up, down, left, right)
        dfs(grid, i - 1, j, m, n); // up
        dfs(grid, i + 1, j, m, n); // down
        dfs(grid, i, j - 1, m, n); // left
        dfs(grid, i, j + 1, m, n); // right
    }

    public static void main(String[] args) {
        Solution sol = new Solution();
        
        // Test case 1
        char[][] grid1 = {
            {'1', '1', '1', '1', '0'},
            {'1', '1', '0', '1', '0'},
            {'1', '1', '0', '0', '0'},
            {'0', '0', '0', '0', '0'}
        };
        System.out.println("Test 1: " + sol.numIslands(grid1)); // Expected: 1
        
        // Test case 2
        char[][] grid2 = {
            {'1', '1', '0', '0', '0'},
            {'1', '1', '0', '0', '0'},
            {'0', '0', '1', '0', '0'},
            {'0', '0', '0', '1', '1'}
        };
        System.out.println("Test 2: " + sol.numIslands(grid2)); // Expected: 3
    }
}