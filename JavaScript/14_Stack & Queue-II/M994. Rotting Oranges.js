// 994. Rotting Oranges using BFS
// https://leetcode.com/problems/rotting-oranges

// You are given an m x n grid where each cell can have one of three values:
// 0 - empty cell, 1 - fresh orange, 2 - rotten orange
// Every minute, any fresh orange adjacent to a rotten orange becomes rotten.
// Return the minimum number of minutes until no cell has a fresh orange, or -1 if impossible.

/**
 * Find minimum time for all oranges to rot using BFS
 * @param {number[][]} grid - Grid of oranges
 * @returns {number} - Minimum minutes, or -1 if impossible
 */
function orangesRotting(grid) {
    const m = grid.length;
    const n = grid[0].length;
    let fresh = 0;
    const queue = [];

    // Count fresh oranges and add rotten oranges to queue
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (grid[i][j] === 2) {
                queue.push([i, j]);
            } else if (grid[i][j] === 1) {
                fresh++;
            }
        }
    }

    // Directions: right, left, down, up
    const dirs = [[0, 1], [0, -1], [1, 0], [-1, 0]];
    let time = 0;

    // BFS
    while (queue.length > 0 && fresh > 0) {
        const size = queue.length;

        for (let i = 0; i < size; i++) {
            const [row, col] = queue.shift();

            for (const [dr, dc] of dirs) {
                const x = row + dr;
                const y = col + dc;

                // Skip if out of bounds or not fresh orange
                if (x < 0 || x >= m || y < 0 || y >= n || grid[x][y] !== 1) {
                    continue;
                }

                grid[x][y] = 2; // Mark as rotten
                queue.push([x, y]);
                fresh--;
            }
        }

        time++;
    }

    return fresh === 0 ? time : -1;
}

// Test cases
console.log(orangesRotting([[2, 1, 1], [1, 1, 0], [0, 1, 1]])); // 4
console.log(orangesRotting([[2, 1, 1], [0, 1, 1], [1, 0, 1]])); // -1
console.log(orangesRotting([[0, 2]])); // 0
console.log(orangesRotting([[1]])); // -1
console.log(orangesRotting([[2]])); // 0