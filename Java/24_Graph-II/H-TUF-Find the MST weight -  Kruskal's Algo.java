// TUF: Find the MST weight using Kruskal's Algorithm
// https://takeuforward.org/plus/dsa/problems/find-the-mst-weight

/*
Problem Statement:
Given a weighted, undirected and connected graph of V vertices and E edges. 
The task is to find the sum of weights of the edges of the Minimum Spanning Tree (MST).

Approach - Kruskal's Algorithm:
1. Extract all edges from adjacency list
2. Sort all edges by weight in ascending order
3. Use Union-Find (Disjoint Set Union) data structure
4. Iterate through sorted edges and add edge to MST if it doesn't form cycle
5. Use union-find to check if two nodes are in same component
6. Stop when we have V-1 edges in MST

Time Complexity: O(E log E) for sorting edges
Space Complexity: O(V) for parent and rank arrays
*/

import java.util.*;

class Solution {
    // Edge class to store edge information
    static class Edge implements Comparable<Edge> {
        int src, dest, weight;
        
        Edge(int src, int dest, int weight) {
            this.src = src;
            this.dest = dest;
            this.weight = weight;
        }
        
        @Override
        public int compareTo(Edge other) {
            return this.weight - other.weight;
        }
    }
    
    // Disjoint Set Union (Union-Find) class
    static class DisjointSet {
        int[] parent;
        int[] rank;
        
        DisjointSet(int n) {
            parent = new int[n];
            rank = new int[n];
            for (int i = 0; i < n; i++) {
                parent[i] = i;
                rank[i] = 0;
            }
        }
        
        // Find operation with path compression
        int find(int x) {
            if (parent[x] != x) {
                parent[x] = find(parent[x]);
            }
            return parent[x];
        }
        
        // Union operation by rank
        boolean union(int x, int y) {
            int rootX = find(x);
            int rootY = find(y);
            
            if (rootX == rootY) {
                return false; // Already in same set (cycle detected)
            }
            
            // Union by rank
            if (rank[rootX] < rank[rootY]) {
                parent[rootX] = rootY;
            } else if (rank[rootX] > rank[rootY]) {
                parent[rootY] = rootX;
            } else {
                parent[rootY] = rootX;
                rank[rootX]++;
            }
            return true;
        }
    }
    
    public int spanningTree(int V, List<List<List<Integer>>> adj) {
        // Step 1: Extract all edges from adjacency list
        List<Edge> edges = new ArrayList<>();
        
        for (int i = 0; i < V; i++) {
            for (List<Integer> edge : adj.get(i)) {
                int adjNode = edge.get(0);
                int weight = edge.get(1);
                
                // Add edge only once (avoid duplicates in undirected graph)
                if (i < adjNode) {
                    edges.add(new Edge(i, adjNode, weight));
                }
            }
        }
        
        // Step 2: Sort edges by weight
        Collections.sort(edges);
        
        // Step 3: Initialize Disjoint Set
        DisjointSet ds = new DisjointSet(V);
        
        int mstWeight = 0;
        int edgeCount = 0;
        
        // Step 4: Process edges in sorted order
        for (Edge edge : edges) {
            // If adding this edge doesn't form a cycle
            if (ds.union(edge.src, edge.dest)) {
                mstWeight += edge.weight;
                edgeCount++;
                
                // MST has V-1 edges
                if (edgeCount == V - 1) {
                    break;
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
