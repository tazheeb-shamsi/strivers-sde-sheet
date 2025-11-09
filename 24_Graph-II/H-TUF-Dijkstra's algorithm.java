// TUF: Dijkstra's algorithm
// https://takeuforward.org/plus/dsa/problems/dijkstra's-algorithm

/*
Problem Statement:
Given a weighted, directed graph with V vertices and E edges, and a source vertex S.
Find the shortest distance of all vertices from the source vertex.
If a vertex is unreachable from S, mark its distance as 10^8.
The graph does not contain negative weight edges.

Approach - Dijkstra's Algorithm:
1. Use a priority queue (min-heap) to store {distance, node}
2. Initialize distance array with infinity (10^8), distance[S] = 0
3. Start from source vertex, add {0, S} to priority queue
4. While queue is not empty:
   - Extract node with minimum distance
   - If this distance is already outdated (greater than current), skip
   - Relax all adjacent edges
   - If shorter path found, update distance and add to queue
5. Return distance array

Why Priority Queue?
- Always processes the vertex with current shortest distance
- Ensures each vertex is processed once with its final shortest distance
- More efficient than simple O(V²) approach

Time Complexity: O(E log V) - using priority queue
Space Complexity: O(V + E) - for distance array and adjacency list

Key Limitations:
- Does NOT work with negative weights
- Greedy approach - always picks shortest distance next
- Faster than Bellman-Ford for graphs without negative weights
*/

import java.util.ArrayList;
import java.util.PriorityQueue;
import java.util.Arrays;

class Solution {
    // Pair class to store {distance, node}
    static class Pair implements Comparable<Pair> {
        int distance;
        int node;
        
        Pair(int distance, int node) {
            this.distance = distance;
            this.node = node;
        }
        
        @Override
        public int compareTo(Pair other) {
            return this.distance - other.distance;
        }
    }
    
    public int[] dijkstra(int V, ArrayList<ArrayList<ArrayList<Integer>>> adj, int S) {
        // Step 1: Initialize distance array
        int[] dist = new int[V];
        Arrays.fill(dist, (int) 1e8);
        dist[S] = 0;
        
        // Step 2: Priority queue to store {distance, node}
        PriorityQueue<Pair> pq = new PriorityQueue<>();
        pq.add(new Pair(0, S));
        
        // Step 3: Dijkstra's algorithm
        while (!pq.isEmpty()) {
            Pair current = pq.poll();
            int currDist = current.distance;
            int node = current.node;
            
            // Skip if we already found a better path
            if (currDist > dist[node]) {
                continue;
            }
            
            // Relax all adjacent edges
            for (ArrayList<Integer> edge : adj.get(node)) {
                int adjNode = edge.get(0);      // adjacent vertex
                int edgeWeight = edge.get(1);   // edge weight
                
                // If shorter path found through current node
                if (currDist + edgeWeight < dist[adjNode]) {
                    dist[adjNode] = currDist + edgeWeight;
                    pq.add(new Pair(dist[adjNode], adjNode));
                }
            }
        }
        
        return dist;
    }

    public static void main(String[] args) {
        Solution sol = new Solution();
        
        // Test Case 1: Simple graph
        System.out.println("Test Case 1: Simple graph");
        int V1 = 5;
        int S1 = 0;
        ArrayList<ArrayList<ArrayList<Integer>>> adj1 = new ArrayList<>();
        
        // Initialize adjacency list
        for (int i = 0; i < V1; i++) {
            adj1.add(new ArrayList<>());
        }
        
        // Add edges: {node, weight}
        adj1.get(0).add(new ArrayList<>(Arrays.asList(1, 2)));
        adj1.get(0).add(new ArrayList<>(Arrays.asList(2, 4)));
        adj1.get(1).add(new ArrayList<>(Arrays.asList(2, 1)));
        adj1.get(1).add(new ArrayList<>(Arrays.asList(3, 7)));
        adj1.get(2).add(new ArrayList<>(Arrays.asList(4, 3)));
        adj1.get(3).add(new ArrayList<>(Arrays.asList(4, 1)));
        
        int[] result1 = sol.dijkstra(V1, adj1, S1);
        System.out.println("Shortest distances from source " + S1 + ":");
        for (int i = 0; i < result1.length; i++) {
            if (result1[i] == (int) 1e8) {
                System.out.println("Vertex " + i + ": INF");
            } else {
                System.out.println("Vertex " + i + ": " + result1[i]);
            }
        }
        
        // Test Case 2: Graph with multiple paths
        System.out.println("\n\nTest Case 2: Graph with multiple paths");
        int V2 = 4;
        int S2 = 0;
        ArrayList<ArrayList<ArrayList<Integer>>> adj2 = new ArrayList<>();
        
        for (int i = 0; i < V2; i++) {
            adj2.add(new ArrayList<>());
        }
        
        adj2.get(0).add(new ArrayList<>(Arrays.asList(1, 1)));
        adj2.get(0).add(new ArrayList<>(Arrays.asList(2, 4)));
        adj2.get(1).add(new ArrayList<>(Arrays.asList(2, 2)));
        adj2.get(1).add(new ArrayList<>(Arrays.asList(3, 6)));
        adj2.get(2).add(new ArrayList<>(Arrays.asList(3, 3)));
        
        int[] result2 = sol.dijkstra(V2, adj2, S2);
        System.out.println("Shortest distances from source " + S2 + ":");
        for (int i = 0; i < result2.length; i++) {
            if (result2[i] == (int) 1e8) {
                System.out.println("Vertex " + i + ": INF");
            } else {
                System.out.println("Vertex " + i + ": " + result2[i]);
            }
        }
        
        // Test Case 3: Disconnected graph
        System.out.println("\n\nTest Case 3: Disconnected graph");
        int V3 = 6;
        int S3 = 0;
        ArrayList<ArrayList<ArrayList<Integer>>> adj3 = new ArrayList<>();
        
        for (int i = 0; i < V3; i++) {
            adj3.add(new ArrayList<>());
        }
        
        // Component 1: 0-1-2
        adj3.get(0).add(new ArrayList<>(Arrays.asList(1, 2)));
        adj3.get(1).add(new ArrayList<>(Arrays.asList(2, 3)));
        
        // Component 2: 3-4-5 (disconnected from source)
        adj3.get(3).add(new ArrayList<>(Arrays.asList(4, 1)));
        adj3.get(4).add(new ArrayList<>(Arrays.asList(5, 2)));
        
        int[] result3 = sol.dijkstra(V3, adj3, S3);
        System.out.println("Shortest distances from source " + S3 + ":");
        for (int i = 0; i < result3.length; i++) {
            if (result3[i] == (int) 1e8) {
                System.out.println("Vertex " + i + ": INF (unreachable)");
            } else {
                System.out.println("Vertex " + i + ": " + result3[i]);
            }
        }
        
        // Test Case 4: Single node graph
        System.out.println("\n\nTest Case 4: Single node graph");
        int V4 = 1;
        int S4 = 0;
        ArrayList<ArrayList<ArrayList<Integer>>> adj4 = new ArrayList<>();
        
        adj4.add(new ArrayList<>()); // Empty adjacency list for single node
        
        int[] result4 = sol.dijkstra(V4, adj4, S4);
        System.out.println("Shortest distances from source " + S4 + ":");
        for (int i = 0; i < result4.length; i++) {
            if (result4[i] == (int) 1e8) {
                System.out.println("Vertex " + i + ": INF");
            } else {
                System.out.println("Vertex " + i + ": " + result4[i]);
            }
        }
    }
}
