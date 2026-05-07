// Rat in a Maze --> Rat in a Maze Problem - I
// https://www.geeksforgeeks.org/problems/rat-in-a-maze-problem/1

/*
Consider a rat placed at position (0, 0) in an n x n square matrix mat[][]. 
The rat's goal is to reach the destination at position (n-1, n-1). 
The rat can move in four possible directions: 'U'(up), 'D'(down), 'L' (left), 'R' (right).

The matrix contains only two possible values:
0: A blocked cell through which the rat cannot travel.
1: A free cell that the rat can pass through.

Your task is to find all possible paths the rat can take to reach the destination, 
starting from (0, 0) and ending at (n-1, n-1), under the condition that the rat cannot revisit any cell along the same path. 
Furthermore, the rat can only move to adjacent cells that are within the bounds of the matrix and not blocked.
If no path exists, return an empty list.

Note: Return the final result vector in lexicographically smallest order.
*/

import java.util.*;

class Solution {
    public ArrayList<String> ratInMaze(int[][] maze) {
        int n = maze.length;
        ArrayList<String> result = new ArrayList<>();
        boolean[][] visited = new boolean[n][n];

        if (maze[0][0] == 0 || maze[n - 1][n - 1] == 0) return result;

        StringBuilder path = new StringBuilder();
        backtrack(maze, n, 0, 0, visited, path, result);
        return result; // already lexicographic, no sort needed
    }

    private void backtrack(int[][] maze, int n, int row, int col,
                           boolean[][] visited, StringBuilder path, ArrayList<String> result) {
        // Base case
        if (row == n - 1 && col == n - 1) {
            result.add(path.toString());
            return;
        }

        // Mark visited
        visited[row][col] = true;

        // Move Down
        if (row + 1 < n && maze[row + 1][col] == 1 && !visited[row + 1][col]) {
            path.append('D');
            backtrack(maze, n, row + 1, col, visited, path, result);
            path.deleteCharAt(path.length() - 1);
        }

        // Move Left
        if (col - 1 >= 0 && maze[row][col - 1] == 1 && !visited[row][col - 1]) {
            path.append('L');
            backtrack(maze, n, row, col - 1, visited, path, result);
            path.deleteCharAt(path.length() - 1);
        }

        // Move Right
        if (col + 1 < n && maze[row][col + 1] == 1 && !visited[row][col + 1]) {
            path.append('R');
            backtrack(maze, n, row, col + 1, visited, path, result);
            path.deleteCharAt(path.length() - 1);
        }

        // Move Up
        if (row - 1 >= 0 && maze[row - 1][col] == 1 && !visited[row - 1][col]) {
            path.append('U');
            backtrack(maze, n, row - 1, col, visited, path, result);
            path.deleteCharAt(path.length() - 1);
        }

        // Unmark visited
        visited[row][col] = false;
    }
}
