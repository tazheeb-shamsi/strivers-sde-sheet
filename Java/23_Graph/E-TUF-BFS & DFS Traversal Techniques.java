// TUF: BFS & DFS Traversal Techniques
// https://takeuforward.org/plus/dsa/problems/traversal-techniques/

/*
Problem Statement:
Given a connected undirected graph represented by an adjacency list, perform:
1. DFS (Depth-First Search) traversal starting from vertex 0
2. BFS (Breadth-First Search) traversal starting from vertex 0

Return the order of vertices visited during the traversal.

Example 1:
Input: V = 5, adj = [[2,3,1], [0], [0,4], [0], [2]]
Output: 
DFS: [0, 2, 4, 3, 1] (one possible order)
BFS: [0, 2, 3, 1, 4] (one possible order)

Example 2:
Input: V = 4, adj = [[1,2], [0,2], [0,1,3], [2]]
Output:
DFS: [0, 1, 2, 3] (one possible order)
BFS: [0, 1, 2, 3]

Constraints:
- 1 <= V <= 10^4
- 0 <= adj[i][j] <= V-1
- Graph is connected
*/

import java.util.*;

class Solution {
    /*
    DFS (Depth-First Search) - Recursive Approach
    - Uses stack (recursion stack) to explore as deep as possible before backtracking
    - Mark vertices as visited to avoid cycles
    - Visit order: current node -> explore all neighbors recursively
    
    Time Complexity: O(V + E) where V = vertices, E = edges
    Space Complexity: O(V) for visited array and recursion stack
    */
    public List<Integer> dfsOfGraph(int V, List<List<Integer>> adj) {
        List<Integer> result = new ArrayList<>();
        boolean[] visited = new boolean[V];
        
        // Start DFS from vertex 0
        dfsHelper(0, adj, visited, result);
        
        return result;
    }
    
    private void dfsHelper(int node, List<List<Integer>> adj, boolean[] visited, List<Integer> result) {
        // Mark current node as visited
        visited[node] = true;
        result.add(node);
        
        // Recursively visit all unvisited neighbors
        for (int neighbor : adj.get(node)) {
            if (!visited[neighbor]) {
                dfsHelper(neighbor, adj, visited, result);
            }
        }
    }
    
    /*
    DFS - Iterative Approach using Stack
    Alternative implementation using explicit stack instead of recursion
    */
    public List<Integer> dfsOfGraphIterative(int V, List<List<Integer>> adj) {
        List<Integer> result = new ArrayList<>();
        boolean[] visited = new boolean[V];
        Stack<Integer> stack = new Stack<>();
        
        stack.push(0);
        visited[0] = true;
        
        while (!stack.isEmpty()) {
            int node = stack.pop();
            result.add(node);
            
            // Push neighbors in reverse order to maintain left-to-right traversal
            List<Integer> neighbors = adj.get(node);
            for (int i = neighbors.size() - 1; i >= 0; i--) {
                int neighbor = neighbors.get(i);
                if (!visited[neighbor]) {
                    visited[neighbor] = true;
                    stack.push(neighbor);
                }
            }
        }
        
        return result;
    }
    
    /*
    BFS (Breadth-First Search) - Using Queue
    - Uses queue to explore level by level
    - Mark vertices as visited when adding to queue
    - Visit order: current level -> next level
    
    Time Complexity: O(V + E)
    Space Complexity: O(V) for visited array and queue
    */
    public List<Integer> bfsOfGraph(int V, List<List<Integer>> adj) {
        List<Integer> result = new ArrayList<>();
        boolean[] visited = new boolean[V];
        Queue<Integer> queue = new LinkedList<>();
        
        // Start BFS from vertex 0
        queue.offer(0);
        visited[0] = true;
        
        while (!queue.isEmpty()) {
            int node = queue.poll();
            result.add(node);
            
            // Add all unvisited neighbors to queue
            for (int neighbor : adj.get(node)) {
                if (!visited[neighbor]) {
                    visited[neighbor] = true;
                    queue.offer(neighbor);
                }
            }
        }
        
        return result;
    }
}

class Main {
    public static void main(String[] args) {
        Solution solution = new Solution();
        
        // Test Case 1: Simple connected graph
        System.out.println("Test Case 1:");
        System.out.println("Graph: 0 -> [2,3,1], 1 -> [0], 2 -> [0,4], 3 -> [0], 4 -> [2]");
        int V1 = 5;
        List<List<Integer>> adj1 = new ArrayList<>();
        for (int i = 0; i < V1; i++) {
            adj1.add(new ArrayList<>());
        }
        adj1.get(0).addAll(Arrays.asList(2, 3, 1));
        adj1.get(1).add(0);
        adj1.get(2).addAll(Arrays.asList(0, 4));
        adj1.get(3).add(0);
        adj1.get(4).add(2);
        
        System.out.println("DFS (Recursive): " + solution.dfsOfGraph(V1, adj1));
        System.out.println("DFS (Iterative): " + solution.dfsOfGraphIterative(V1, adj1));
        System.out.println("BFS: " + solution.bfsOfGraph(V1, adj1));
        System.out.println();
        
        // Test Case 2: Linear graph
        System.out.println("Test Case 2:");
        System.out.println("Graph: 0 -> [1], 1 -> [0,2], 2 -> [1,3], 3 -> [2]");
        int V2 = 4;
        List<List<Integer>> adj2 = new ArrayList<>();
        for (int i = 0; i < V2; i++) {
            adj2.add(new ArrayList<>());
        }
        adj2.get(0).add(1);
        adj2.get(1).addAll(Arrays.asList(0, 2));
        adj2.get(2).addAll(Arrays.asList(1, 3));
        adj2.get(3).add(2);
        
        System.out.println("DFS (Recursive): " + solution.dfsOfGraph(V2, adj2));
        System.out.println("DFS (Iterative): " + solution.dfsOfGraphIterative(V2, adj2));
        System.out.println("BFS: " + solution.bfsOfGraph(V2, adj2));
        System.out.println();
        
        // Test Case 3: Complete graph K4
        System.out.println("Test Case 3:");
        System.out.println("Graph: 0 -> [1,2,3], 1 -> [0,2,3], 2 -> [0,1,3], 3 -> [0,1,2]");
        int V3 = 4;
        List<List<Integer>> adj3 = new ArrayList<>();
        for (int i = 0; i < V3; i++) {
            adj3.add(new ArrayList<>());
        }
        adj3.get(0).addAll(Arrays.asList(1, 2, 3));
        adj3.get(1).addAll(Arrays.asList(0, 2, 3));
        adj3.get(2).addAll(Arrays.asList(0, 1, 3));
        adj3.get(3).addAll(Arrays.asList(0, 1, 2));
        
        System.out.println("DFS (Recursive): " + solution.dfsOfGraph(V3, adj3));
        System.out.println("DFS (Iterative): " + solution.dfsOfGraphIterative(V3, adj3));
        System.out.println("BFS: " + solution.bfsOfGraph(V3, adj3));
        System.out.println();
        
        // Test Case 4: Tree structure
        System.out.println("Test Case 4:");
        System.out.println("Tree: 0 -> [1,2], 1 -> [0,3,4], 2 -> [0], 3 -> [1], 4 -> [1]");
        int V4 = 5;
        List<List<Integer>> adj4 = new ArrayList<>();
        for (int i = 0; i < V4; i++) {
            adj4.add(new ArrayList<>());
        }
        adj4.get(0).addAll(Arrays.asList(1, 2));
        adj4.get(1).addAll(Arrays.asList(0, 3, 4));
        adj4.get(2).add(0);
        adj4.get(3).add(1);
        adj4.get(4).add(1);
        
        System.out.println("DFS (Recursive): " + solution.dfsOfGraph(V4, adj4));
        System.out.println("DFS (Iterative): " + solution.dfsOfGraphIterative(V4, adj4));
        System.out.println("BFS: " + solution.bfsOfGraph(V4, adj4));
    }
}
