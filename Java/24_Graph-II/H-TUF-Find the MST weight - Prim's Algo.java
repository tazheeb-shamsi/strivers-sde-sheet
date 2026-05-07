// TUF: Find the MST weight using Prim's Algorithm
// https://takeuforward.org/plus/dsa/problems/find-the-mst-weight

/*
Problem Statement:
Given a weighted, undirected and connected graph of V vertices and E edges. 
The task is to find the sum of weights of the edges of the Minimum Spanning Tree (MST).

Approach - Prim's Algorithm:
1. Use a priority queue (min-heap) to store {weight, node}
2. Start from node 0, add it to MST and mark as visited
3. Add all adjacent edges to priority queue
4. Pick minimum weight edge that connects to an unvisited node
5. Add that node to MST and repeat until all nodes are visited
6. Keep track of total MST weight

Time Complexity: O(E log E) where E is number of edges
Space Complexity: O(V + E) for adjacency list and visited array
*/

import java.util.*;

class Solution {
    // Pair class to store {weight, node}
    static class Pair implements Comparable<Pair> {
        int weight;
        int node;
        
        Pair(int weight, int node) {
            this.weight = weight;
            this.node = node;
        }
        
        @Override
        public int compareTo(Pair other) {
            return this.weight - other.weight;
        }
    }
    
    public int spanningTree(int V, List<List<List<Integer>>> adj) {
        // Priority queue to store {weight, node}
        PriorityQueue<Pair> pq = new PriorityQueue<>();
        
        // Visited array to track nodes in MST
        boolean[] visited = new boolean[V];
        
        // Start from node 0 with weight 0
        pq.add(new Pair(0, 0));
        
        int mstWeight = 0;
        
        while (!pq.isEmpty()) {
            Pair current = pq.poll();
            int wt = current.weight;
            int node = current.node;
            
            // If already visited, skip
            if (visited[node]) {
                continue;
            }
            
            // Mark as visited and add weight to MST
            visited[node] = true;
            mstWeight += wt;
            
            // Add all adjacent edges to priority queue
            for (List<Integer> edge : adj.get(node)) {
                int adjNode = edge.get(0);
                int edgeWeight = edge.get(1);
                
                if (!visited[adjNode]) {
                    pq.add(new Pair(edgeWeight, adjNode));
                }
            }
        }
        
        return mstWeight;
    }

    public static void main(String[] args) {
        // Test Case 1
        int V1 = 3;
        List<List<List<Integer>>> adj1 = new ArrayList<>();
        
        for (int i = 0; i < V1; i++) {
            adj1.add(new ArrayList<>());
        }
        
        // Edge 0-1 with weight 5
        adj1.get(0).add(Arrays.asList(1, 5));
        adj1.get(1).add(Arrays.asList(0, 5));
        
        // Edge 1-2 with weight 3
        adj1.get(1).add(Arrays.asList(2, 3));
        adj1.get(2).add(Arrays.asList(1, 3));
        
        // Edge 0-2 with weight 1
        adj1.get(0).add(Arrays.asList(2, 1));
        adj1.get(2).add(Arrays.asList(0, 1));
        
        Solution sol = new Solution();
        System.out.println("MST Weight (Test 1): " + sol.spanningTree(V1, adj1)); // Expected: 4
        
        // Test Case 2
        int V2 = 5;
        List<List<List<Integer>>> adj2 = new ArrayList<>();
        
        for (int i = 0; i < V2; i++) {
            adj2.add(new ArrayList<>());
        }
        
        // Adding edges
        int[][] edges = {
            {0, 1, 2}, {0, 3, 6},
            {1, 2, 3}, {1, 3, 8}, {1, 4, 5},
            {2, 4, 7},
            {3, 4, 9}
        };
        
        for (int[] edge : edges) {
            int u = edge[0];
            int v = edge[1];
            int w = edge[2];
            adj2.get(u).add(Arrays.asList(v, w));
            adj2.get(v).add(Arrays.asList(u, w));
        }
        
        System.out.println("MST Weight (Test 2): " + sol.spanningTree(V2, adj2)); // Expected: 16
    }
}
