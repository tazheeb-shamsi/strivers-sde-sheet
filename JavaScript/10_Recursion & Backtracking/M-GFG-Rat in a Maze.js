// Rat in a Maze
// https://www.geeksforgeeks.org/problems/rat-in-a-maze-problem/1

/**
 * @param {number[][]} maze
 * @return {string[]}
 */
function ratInMaze(maze) {
    const n = maze.length;
    const result = [];
    const visited = Array.from({ length: n }, () => new Array(n).fill(false));

    if (maze[0][0] === 0 || maze[n - 1][n - 1] === 0) return result;

    backtrack(maze, n, 0, 0, visited, '', result);
    return result;
}

function backtrack(maze, n, row, col, visited, path, result) {
    // Base case
    if (row === n - 1 && col === n - 1) {
        result.push(path);
        return;
    }

    // Mark visited
    visited[row][col] = true;

    // Move Down
    if (row + 1 < n && maze[row + 1][col] === 1 && !visited[row + 1][col]) {
        backtrack(maze, n, row + 1, col, visited, path + 'D', result);
    }

    // Move Left
    if (col - 1 >= 0 && maze[row][col - 1] === 1 && !visited[row][col - 1]) {
        backtrack(maze, n, row, col - 1, visited, path + 'L', result);
    }

    // Move Right
    if (col + 1 < n && maze[row][col + 1] === 1 && !visited[row][col + 1]) {
        backtrack(maze, n, row, col + 1, visited, path + 'R', result);
    }

    // Move Up
    if (row - 1 >= 0 && maze[row - 1][col] === 1 && !visited[row - 1][col]) {
        backtrack(maze, n, row - 1, col, visited, path + 'U', result);
    }

    // Unmark visited
    visited[row][col] = false;
}

const maze = [
    [1, 0, 0, 0],
    [1, 1, 0, 1],
    [1, 1, 0, 0],
    [0, 1, 1, 1]
];
console.log(ratInMaze(maze)); // Output: ["DDRDRR", "DRDDRR"]
