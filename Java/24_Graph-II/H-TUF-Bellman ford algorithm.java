// TUF: Bellman Ford Algorithm
// https://takeuforward.org/plus/dsa/problems/bellman-ford-algorithm

/*
Problem Statement:
Given a weighted, directed graph with V vertices and E edges, and a source vertex S.
Find the shortest distance of all vertices from the source vertex.
If a vertex is unreachable from S, mark its distance as 10^8.
The graph may contain negative weight edges.

Approach - Bellman-Ford Algorithm:
1. Initialize distance array with infinity (10^8), distance[S] = 0
2. Relax all edges V-1 times
   - For each edge (u, v, weight), if dist[u] + weight < dist[v], update dist[v]
3. Check for negative weight cycle by relaxing one more time
   - If any distance can still be reduced, negative cycle exists
4. Return the distance array

Why V-1 iterations?
- In a graph with V vertices, the shortest path can have at most V-1 edges
- Each iteration guarantees shortest path for one more edge

Time Complexity: O(V * E) - V-1 iterations over E edges
Space Complexity: O(V) - for distance array

Key Differences from Dijkstra:
- Works with negative weights
- Can detect negative cycles
- Slower than Dijkstra O(V*E) vs O(E log V)
*/

import java.util.ArrayList;
import java.util.Arrays;

class Solution {
    static int[] bellman_ford(int V, ArrayList<ArrayList<Integer>> edges, int S) {
        // Step 1: Initialize distance array
        int[] dist = new int[V];
        Arrays.fill(dist, (int) 1e8);
        dist[S] = 0;
        
        // Step 2: Relax all edges V-1 times
        for (int i = 0; i < V - 1; i++) {
            // Iterate through all edges
            for (ArrayList<Integer> edge : edges) {
                int u = edge.get(0);      // source vertex
                int v = edge.get(1);      // destination vertex
                int wt = edge.get(2);     // weight
                
                // Relax the edge if possible
                if (dist[u] != (int) 1e8 && dist[u] + wt < dist[v]) {
                    dist[v] = dist[u] + wt;
                }
            }
        }
        
        // Step 3: Check for negative weight cycle (Nth relaxation)
        for (ArrayList<Integer> edge : edges) {
            int u = edge.get(0);
            int v = edge.get(1);
            int wt = edge.get(2);
            
            // If we can still relax, negative cycle exists
            if (dist[u] != (int) 1e8 && dist[u] + wt < dist[v]) {
                return new int[]{-1};  // Negative cycle detected
            }
        }
        
        return dist;
    }

    public static void main(String[] args) {
        // Test Case 1: Simple graph without negative cycle
        System.out.println("Test Case 1: Graph without negative cycle");
        int V1 = 5;
        int S1 = 0;
        ArrayList<ArrayList<Integer>> edges1 = new ArrayList<>();
        
        // Format: [source, destination, weight]
        edges1.add(new ArrayList<>(Arrays.asList(0, 1, 5)));
        edges1.add(new ArrayList<>(Arrays.asList(1, 2, -2)));
        edges1.add(new ArrayList<>(Arrays.asList(1, 3, 2)));
        edges1.add(new ArrayList<>(Arrays.asList(2, 4, 3)));
        edges1.add(new ArrayList<>(Arrays.asList(3, 4, -1)));
        edges1.add(new ArrayList<>(Arrays.asList(0, 3, 9)));
        
        int[] result1 = bellman_ford(V1, edges1, S1);
        System.out.println("Shortest distances from source " + S1 + ":");
        for (int i = 0; i < result1.length; i++) {
            if (result1[i] == (int) 1e8) {
                System.out.println("Vertex " + i + ": INF");
            } else {
                System.out.println("Vertex " + i + ": " + result1[i]);
            }
        }
        
        // Test Case 2: Graph with negative weights
        System.out.println("\n\nTest Case 2: Graph with negative weights");
        int V2 = 3;
        int S2 = 0;
        ArrayList<ArrayList<Integer>> edges2 = new ArrayList<>();
        
        edges2.add(new ArrayList<>(Arrays.asList(0, 1, 4)));
        edges2.add(new ArrayList<>(Arrays.asList(1, 2, -3)));
        edges2.add(new ArrayList<>(Arrays.asList(0, 2, 5)));
        
        int[] result2 = bellman_ford(V2, edges2, S2);
        System.out.println("Shortest distances from source " + S2 + ":");
        for (int i = 0; i < result2.length; i++) {
            if (result2[i] == (int) 1e8) {
                System.out.println("Vertex " + i + ": INF");
            } else {
                System.out.println("Vertex " + i + ": " + result2[i]);
            }
        }
        
        // Test Case 3: Graph with negative cycle
        System.out.println("\n\nTest Case 3: Graph with negative cycle");
        int V3 = 3;
        int S3 = 0;
        ArrayList<ArrayList<Integer>> edges3 = new ArrayList<>();
        
        edges3.add(new ArrayList<>(Arrays.asList(0, 1, 1)));
        edges3.add(new ArrayList<>(Arrays.asList(1, 2, -1)));
        edges3.add(new ArrayList<>(Arrays.asList(2, 0, -1)));  // Creates negative cycle
        
        int[] result3 = bellman_ford(V3, edges3, S3);
        if (result3.length == 1 && result3[0] == -1) {
            System.out.println("Negative cycle detected!");
        } else {
            System.out.println("Shortest distances from source " + S3 + ":");
            for (int i = 0; i < result3.length; i++) {
                System.out.println("Vertex " + i + ": " + result3[i]);
            }
        }
        
        // Test Case 4: Disconnected graph
        System.out.println("\n\nTest Case 4: Disconnected graph");
        int V4 = 4;
        int S4 = 0;
        ArrayList<ArrayList<Integer>> edges4 = new ArrayList<>();
        
        edges4.add(new ArrayList<>(Arrays.asList(0, 1, 2)));
        edges4.add(new ArrayList<>(Arrays.asList(1, 2, 3)));
        // Vertex 3 is disconnected
        
        int[] result4 = bellman_ford(V4, edges4, S4);
        System.out.println("Shortest distances from source " + S4 + ":");
        for (int i = 0; i < result4.length; i++) {
            if (result4[i] == (int) 1e8) {
                System.out.println("Vertex " + i + ": INF (unreachable)");
            } else {
                System.out.println("Vertex " + i + ": " + result4[i]);
            }
        }
    }
}