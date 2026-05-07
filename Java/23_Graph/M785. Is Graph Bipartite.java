// 785. Is Graph Bipartite? 
// check using BFS and DFS
// https://leetcode.com/problems/is-graph-bipartite/

/*
Approach:
1. Use BFS with graph coloring - try to color graph with 2 colors
2. If any two adjacent nodes have same color, graph is not bipartite
3. Handle disconnected components by checking all uncolored nodes
4. Use color array: -1 (uncolored), 0 and 1 (two colors)
*/

import java.util.*;

class Solution {
    // Main method - can use either BFS or DFS
    public boolean isBipartite(int[][] graph) {
        return isBipartiteBFS(graph); // Using BFS by default
        // return isBipartiteDFS(graph); // Can use DFS instead
    }
    
    // Approach 1: BFS (Breadth First Search)
    public boolean isBipartiteBFS(int[][] graph) {
        int n = graph.length;
        int[] color = new int[n];
        Arrays.fill(color, -1); // -1 means uncolored
        
        // Check all components (for disconnected graphs)
        for (int i = 0; i < n; i++) {
            if (color[i] == -1) {
                if (!bfsCheck(i, graph, color)) {
                    return false;
                }
            }
        }
        return true;
    }
    
    private boolean bfsCheck(int start, int[][] graph, int[] color) {
        Queue<Integer> queue = new LinkedList<>();
        queue.offer(start);
        color[start] = 0; // Start with color 0
        
        while (!queue.isEmpty()) {
            int node = queue.poll();
            
            // Check all adjacent nodes
            for (int neighbor : graph[node]) {
                if (color[neighbor] == -1) {
                    // Color with opposite color
                    color[neighbor] = 1 - color[node];
                    queue.offer(neighbor);
                } else if (color[neighbor] == color[node]) {
                    // Same color as current node - not bipartite
                    return false;
                }
            }
        }
        return true;
    }
    
    // Approach 2: DFS (Depth First Search)
    public boolean isBipartiteDFS(int[][] graph) {
        int n = graph.length;
        int[] color = new int[n];
        Arrays.fill(color, -1); // -1 means uncolored
        
        // Check all components (for disconnected graphs)
        for (int i = 0; i < n; i++) {
            if (color[i] == -1) {
                if (!dfsCheck(i, 0, graph, color)) {
                    return false;
                }
            }
        }
        return true;
    }
    
    private boolean dfsCheck(int node, int col, int[][] graph, int[] color) {
        color[node] = col;
        
        // Check all adjacent nodes
        for (int neighbor : graph[node]) {
            if (color[neighbor] == -1) {
                // Color with opposite color and recurse
                if (!dfsCheck(neighbor, 1 - col, graph, color)) {
                    return false;
                }
            } else if (color[neighbor] == col) {
                // Same color as current node - not bipartite
                return false;
            }
        }
        return true;
    }
    
}

class Main{
    public static void main(String[] args){
        Solution sol = new Solution();
        
        // Test case 1: Bipartite graph (square)
        int[][] graph1 = {{1,3},{0,2},{1,3},{0,2}};
        System.out.println("=== Test 1: Bipartite Graph (Square) ===");
        System.out.println("Graph: [[1,3],[0,2],[1,3],[0,2]]");
        System.out.println("BFS Result: " + sol.isBipartiteBFS(graph1)); // Expected: true
        System.out.println("DFS Result: " + sol.isBipartiteDFS(graph1)); // Expected: true
        
        // Test case 2: Not bipartite (triangle - odd cycle)
        int[][] graph2 = {{1,2,3},{0,2},{0,1,3},{0,2}};
        System.out.println("\n=== Test 2: Non-Bipartite Graph (Odd Cycle) ===");
        System.out.println("Graph: [[1,2,3],[0,2],[0,1,3],[0,2]]");
        System.out.println("BFS Result: " + sol.isBipartiteBFS(graph2)); // Expected: false
        System.out.println("DFS Result: " + sol.isBipartiteDFS(graph2)); // Expected: false
        
        // Test case 3: Disconnected bipartite graph
        int[][] graph3 = {{1},{0},{3},{2}};
        System.out.println("\n=== Test 3: Disconnected Bipartite Graph ===");
        System.out.println("Graph: [[1],[0],[3],[2]]");
        System.out.println("BFS Result: " + sol.isBipartiteBFS(graph3)); // Expected: true
        System.out.println("DFS Result: " + sol.isBipartiteDFS(graph3)); // Expected: true
        
        // Test case 4: Empty adjacency (all isolated nodes)
        int[][] graph4 = {{},{},{},{}};
        System.out.println("\n=== Test 4: Isolated Nodes ===");
        System.out.println("Graph: [[],[],[],[]]");
        System.out.println("BFS Result: " + sol.isBipartiteBFS(graph4)); // Expected: true
        System.out.println("DFS Result: " + sol.isBipartiteDFS(graph4)); // Expected: true
    }
}