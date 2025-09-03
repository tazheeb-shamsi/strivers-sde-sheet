// M-Coloring Problem
// https://www.geeksforgeeks.org/problems/m-coloring-problem-1587115620/1
/*
You are given an undirected graph consisting of V vertices and E edges represented by a list edges[][],along with an integer m.
Your task is to determine whether it is possible to color the graph using at most m different colors such that no two adjacent vertices share the same color.
Return true if the graph can be colored with at most m colors, otherwise return false.

Note: The graph is indexed with 0-based indexing.

Examples:

Input: V = 4, edges[][] = [[0, 1], [1, 3], [2, 3], [3, 0], [0, 2]], m = 3
Output: true
Explanation: 
It is possible to color the given graph using 3 colors, for example, one of the possible ways vertices can be colored as follows:

Vertex 0: Color 1
Vertex 1: Color 2
Vertex 2: Color 2
Vertex 3: Color 3
*/
class Solution {

    boolean graphColoring(int v, int[][] edges, int m) {
        int[] color = new int[v];
        Arrays.fill(color, -1);
        return solve(0, color, edges, m);
    }

    boolean solve(int node, int[] color, int[][] edges, int m) {
        if (node == color.length) return true;
        for (int i = 0; i < m; i++) {
            if (isValid(node, color, edges, i)) {
                color[node] = i;
                if (solve(node + 1, color, edges, m)) return true;
                color[node] = -1;
            }
        }
        return false;
    }

    boolean isValid(int node, int[] color, int[][] edges, int c) {
        for (int[] edge : edges) {
            if (edge[0] == node && color[edge[1]] == c) return false;
            if (edge[1] == node && color[edge[0]] == c) return false;
        }
        return true;
    }
    
    public static void main(String[] args) {
        int V = 4;
        int[][] edges = {{0, 1}, {1, 3}, {2, 3}, {3, 0}, {0, 2}};
        int m = 3;
        Solution solution = new Solution();
        boolean result = solution.graphColoring(V, edges, m);
        System.out.println(result);
    }
}
