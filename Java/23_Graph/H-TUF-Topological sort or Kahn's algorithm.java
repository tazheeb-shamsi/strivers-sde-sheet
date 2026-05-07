// TUF: Topological sort BFS and DFS --> Kahn's algorithm
// https://takeuforward.org/plus/dsa/problems/topological-sort-or-kahns-algorithm/
/*

Approach:
1. Calculate in-degree of all vertices by traversing the graph
2. Add all vertices with in-degree 0 to a queue
3. Process vertices in the queue and generate topological order
4. For each processed vertex, reduce in-degree of its neighbors and add to queue if in-degree becomes 0
5. Repeat steps 3 and 4 until queue is empty
*/

import java.util.*;

class Solution {
    public int[] topoSort(int V, List<Integer>[] adj) {
        // Step 1: Calculate in-degree of all vertices
        int[] indegree = new int[V];
        for (int i = 0; i < V; i++) {
            for (int neighbor : adj[i]) {
                indegree[neighbor]++;
            }
        }
        
        // Step 2: Add all vertices with in-degree 0 to queue
        Queue<Integer> queue = new LinkedList<>();
        for (int i = 0; i < V; i++) {
            if (indegree[i] == 0) {
                queue.offer(i);
            }
        }
        
        // Step 3: Process vertices and generate topological order
        int[] topoOrder = new int[V];
        int index = 0;
        
        while (!queue.isEmpty()) {
            int node = queue.poll();
            topoOrder[index++] = node;
            
            // Reduce in-degree of neighbors
            for (int neighbor : adj[node]) {
                indegree[neighbor]--;
                if (indegree[neighbor] == 0) {
                    queue.offer(neighbor);
                }
            }
        }
        
        return topoOrder;
    }
}

class Main{
    public static void main(String[] args){
        // Example: DAG with 6 vertices
        // Edges: 5->0, 5->2, 4->0, 4->1, 2->3, 3->1
        int V = 6;
        List<Integer>[] adj = new ArrayList[V];
        for (int i = 0; i < V; i++) {
            adj[i] = new ArrayList<>();
        }
        
        // Add edges
        adj[5].add(0);
        adj[5].add(2);
        adj[4].add(0);
        adj[4].add(1);
        adj[2].add(3);
        adj[3].add(1);
        
        Solution solution = new Solution();
        int[] result = solution.topoSort(V, adj);
        
        System.out.println("Topological Sort (Kahn's Algorithm):");
        for (int node : result) {
            System.out.print(node + " ");
        }
        System.out.println();
    }
}



