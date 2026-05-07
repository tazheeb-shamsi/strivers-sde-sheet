// TUF: Floyd Warshall Algorithm
// https://takeuforward.org/plus/dsa/problems/floyd-warshall-algorithm

/*
Problem Statement:
Given a weighted, directed graph with V vertices represented as an adjacency matrix.
Find the shortest distances between every pair of vertices.
The matrix[i][j] denotes the weight of the edge from i to j.
If matrix[i][j] = -1, it means there is no edge from i to j.

Approach - Floyd-Warshall Algorithm:
1. The algorithm uses Dynamic Programming approach
2. Create a distance matrix initially same as input matrix
3. Try every vertex as an intermediate vertex
4. For each pair (i, j), check if going through vertex k gives shorter path
5. Update distance[i][j] = min(distance[i][j], distance[i][k] + distance[k][j])
6. After V iterations, we get shortest distances between all pairs

Formula: dist[i][j] = min(dist[i][j], dist[i][k] + dist[k][j]) for all k

Time Complexity: O(V³) - three nested loops
Space Complexity: O(1) - in-place modification (or O(V²) if creating new matrix)

Key Points:
- Works with negative weights
- Can detect negative cycles
- Finds shortest path between all pairs
*/

class Solution {
    public void shortestDistance(int[][] matrix) {
        int n = matrix.length;
        
        // Step 1: Replace -1 with a large value (infinity) 
        // except for diagonal elements
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n; j++) {
                if (matrix[i][j] == -1) {
                    matrix[i][j] = (int) 1e9;
                }
                if (i == j) {
                    matrix[i][j] = 0;
                }
            }
        }
        
        // Step 2: Floyd-Warshall Algorithm
        // Try every vertex as intermediate vertex
        for (int k = 0; k < n; k++) {
            for (int i = 0; i < n; i++) {
                for (int j = 0; j < n; j++) {
                    // If vertex k is on the shortest path from i to j
                    // then update the value of matrix[i][j]
                    matrix[i][j] = Math.min(
                        matrix[i][j], 
                        matrix[i][k] + matrix[k][j]
                    );
                }
            }
        }
        
        // Step 3: Check for negative cycle (optional)
        // If matrix[i][i] < 0 for any i, negative cycle exists
        for (int i = 0; i < n; i++) {
            if (matrix[i][i] < 0) {
                System.out.println("Negative cycle detected!");
                return;
            }
        }
        
        // Step 4: Replace infinity back with -1
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n; j++) {
                if (matrix[i][j] >= (int) 1e9) {
                    matrix[i][j] = -1;
                }
            }
        }
    }

    // Helper method to print matrix
    public static void printMatrix(int[][] matrix) {
        for (int i = 0; i < matrix.length; i++) {
            for (int j = 0; j < matrix[i].length; j++) {
                if (matrix[i][j] == -1) {
                    System.out.print("INF ");
                } else {
                    System.out.print(matrix[i][j] + " ");
                }
            }
            System.out.println();
        }
    }

    public static void main(String[] args) {
        Solution sol = new Solution();
        
        // Test Case 1
        System.out.println("Test Case 1:");
        int[][] matrix1 = {
            {0, 3, -1, 7},
            {8, 0, 2, -1},
            {5, -1, 0, 1},
            {2, -1, -1, 0}
        };
        
        System.out.println("Original Matrix:");
        printMatrix(matrix1);
        
        sol.shortestDistance(matrix1);
        
        System.out.println("\nShortest Distance Matrix:");
        printMatrix(matrix1);
        
        // Test Case 2
        System.out.println("\n\nTest Case 2:");
        int[][] matrix2 = {
            {0, 5, -1, 10},
            {-1, 0, 3, -1},
            {-1, -1, 0, 1},
            {-1, -1, -1, 0}
        };
        
        System.out.println("Original Matrix:");
        printMatrix(matrix2);
        
        sol.shortestDistance(matrix2);
        
        System.out.println("\nShortest Distance Matrix:");
        printMatrix(matrix2);
        
        // Test Case 3 - Simple example
        System.out.println("\n\nTest Case 3:");
        int[][] matrix3 = {
            {0, 2, -1, -1},
            {1, 0, 3, -1},
            {-1, -1, 0, -1},
            {3, 5, 4, 0}
        };
        
        System.out.println("Original Matrix:");
        printMatrix(matrix3);
        
        sol.shortestDistance(matrix3);
        
        System.out.println("\nShortest Distance Matrix:");
        printMatrix(matrix3);
    }
}