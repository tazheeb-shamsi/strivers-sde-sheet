/**
 * 200. Number of Islands
 * https://leetcode.com/problems/number-of-islands/
 *
 * Type             | Details
 * -----------------+----------------------------------------------------
 * Time Complexity  | O(M * N) – Visit each cell once
 * Space Complexity | O(M * N) – Recursion stack in worst case
 */

/**
 * Count number of islands using DFS
 * @param {string[][]} grid
 * @returns {number}
 */
function numIslands(grid) {
    if (grid === null || grid.length === 0) return 0;
    
    const m = grid.length;
    const n = grid[0].length;
    let count = 0;
    
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (grid[i][j] === '1') {
                count++;
                dfs(grid, i, j);
            }
        }
    }
    
    return count;
}

function dfs(grid, i, j) {
    // Boundary check and water check
    if (i < 0 || i >= grid.length || j < 0 || j >= grid[0].length || grid[i][j] !== '1') {
        return;
    }
    
    // Mark as visited
    grid[i][j] = '0';
    
    // Visit all 4 directions
    dfs(grid, i + 1, j);
    dfs(grid, i - 1, j);
    dfs(grid, i, j + 1);
    dfs(grid, i, j - 1);
}

/**
 * Count number of islands using BFS
 * @param {string[][]} grid
 * @returns {number}
 */
function numIslandsBFS(grid) {
    if (grid === null || grid.length === 0) return 0;
    
    const m = grid.length;
    const n = grid[0].length;
    let count = 0;
    const directions = [[1, 0], [-1, 0], [0, 1], [0, -1]];
    
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (grid[i][j] === '1') {
                count++;
                
                const queue = [[i, j]];
                grid[i][j] = '0';
                
                while (queue.length > 0) {
                    const [row, col] = queue.shift();
                    
                    for (const [dr, dc] of directions) {
                        const nr = row + dr;
                        const nc = col + dc;
                        
                        if (nr >= 0 && nr < m && nc >= 0 && nc < n && grid[nr][nc] === '1') {
                            grid[nr][nc] = '0';
                            queue.push([nr, nc]);
                        }
                    }
                }
            }
        }
    }
    
    return count;
}

// Test cases
const grid1 = [
    ['1', '1', '1', '1', '0'],
    ['1', '1', '0', '1', '0'],
    ['1', '1', '0', '0', '0'],
    ['0', '0', '0', '0', '0']
];
console.log("Test 1:", numIslands(grid1)); // Expected: 1

const grid2 = [
    ['1', '1', '0', '0', '0'],
    ['1', '1', '0', '0', '0'],
    ['0', '0', '1', '0', '0'],
    ['0', '0', '0', '1', '1']
];
console.log("Test 2:", numIslandsBFS(grid2)); // Expected: 3