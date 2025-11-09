// 133. Clone Graph
// https://leetcode.com/problems/clone-graph/

/*
Approach: Use HashMap to track cloned nodes and perform DFS/BFS
1. Use HashMap to store mapping: original node -> cloned node
2. DFS/BFS Approach:
   - If node is null, return null
   - If node already cloned (in map), return cloned node
   - Create new node with same value
   - Add to map to avoid infinite loops
   - Recursively/Iteratively clone all neighbors
   - Add cloned neighbors to new node's neighbor list

Key Points:
- HashMap prevents infinite loops in cyclic graphs
- Each node is cloned exactly once
- Deep copy means all nodes and edges are new objects

Time Complexity: O(N + E) where N = nodes, E = edges
Space Complexity: O(N) for HashMap and recursion stack
*/

import java.util.*;

class Node {
    public int val;
    public List<Node> neighbors;
    public Node() {
        val = 0;
        neighbors = new ArrayList<Node>();
    }
    public Node(int _val) {
        val = _val;
        neighbors = new ArrayList<Node>();
    }
    public Node(int _val, ArrayList<Node> _neighbors) {
        val = _val;
        neighbors = _neighbors;
    }
}

class Solution {
    // Approach 1: DFS with HashMap
    public Node cloneGraph(Node node) {
        if (node == null) return null;
        HashMap<Node, Node> visited = new HashMap<>();
        return cloneDFS(node, visited);
        // return cloneGraphBFS(node); 
    }
    
    private Node cloneDFS(Node node, HashMap<Node, Node> visited) {
        // If already cloned, return the clone
        if (visited.containsKey(node)) {
            return visited.get(node);
        }
        
        // Create new node (clone)
        Node cloneNode = new Node(node.val);
        
        // Add to map BEFORE processing neighbors (prevents infinite loops)
        visited.put(node, cloneNode);
        
        // Clone all neighbors
        for (Node neighbor : node.neighbors) {
            cloneNode.neighbors.add(cloneDFS(neighbor, visited));
        }
        
        return cloneNode;
    }
    
    // Approach 2: BFS with HashMap
    public Node cloneGraphBFS(Node node) {
        if (node == null) return null;
        
        HashMap<Node, Node> visited = new HashMap<>();
        Queue<Node> queue = new LinkedList<>();
        
        // Clone the starting node
        Node cloneNode = new Node(node.val);
        visited.put(node, cloneNode);
        queue.offer(node);
        
        while (!queue.isEmpty()) {
            Node current = queue.poll();
            
            // Process all neighbors
            for (Node neighbor : current.neighbors) {
                if (!visited.containsKey(neighbor)) {
                    // Clone the neighbor
                    Node cloneNeighbor = new Node(neighbor.val);
                    visited.put(neighbor, cloneNeighbor);
                    queue.offer(neighbor);
                }
                // Add cloned neighbor to current cloned node's neighbors
                visited.get(current).neighbors.add(visited.get(neighbor));
            }
        }
        
        return cloneNode;
    }

     public static void main(String[] args){
        Solution sol = new Solution();
        
        // Test case 1: Graph with 4 nodes
        // adjList = [[2,4],[1,3],[2,4],[1,3]]
        Node node1 = new Node(1);
        Node node2 = new Node(2);
        Node node3 = new Node(3);
        Node node4 = new Node(4);
        
        node1.neighbors.add(node2);
        node1.neighbors.add(node4);
        node2.neighbors.add(node1);
        node2.neighbors.add(node3);
        node3.neighbors.add(node2);
        node3.neighbors.add(node4);
        node4.neighbors.add(node1);
        node4.neighbors.add(node3);
        
        System.out.println("=== Test 1: 4-Node Graph (DFS) ===");
        System.out.println("Original Graph: [[2,4],[1,3],[2,4],[1,3]]");
        Node clonedDFS = sol.cloneGraph(node1);
        System.out.println("Cloned node value: " + clonedDFS.val);
        System.out.println("Cloned node neighbors count: " + clonedDFS.neighbors.size());
        System.out.println("Is deep copy (different object): " + (clonedDFS != node1));
        System.out.println("First neighbor value: " + clonedDFS.neighbors.get(0).val);
        System.out.println("First neighbor is different object: " + (clonedDFS.neighbors.get(0) != node2));
        
        System.out.println("\n=== Test 1: 4-Node Graph (BFS) ===");
        Node clonedBFS = sol.cloneGraphBFS(node1);
        System.out.println("Cloned node value: " + clonedBFS.val);
        System.out.println("Cloned node neighbors count: " + clonedBFS.neighbors.size());
        System.out.println("Is deep copy (different object): " + (clonedBFS != node1));
        
        // Test case 2: Single node
        Node single = new Node(1);
        System.out.println("\n=== Test 2: Single Node (DFS) ===");
        System.out.println("Original Graph: [[]]");
        Node clonedSingle = sol.cloneGraph(single);
        System.out.println("Cloned node value: " + clonedSingle.val);
        System.out.println("Cloned node neighbors count: " + clonedSingle.neighbors.size());
        System.out.println("Is deep copy: " + (clonedSingle != single));
        
        // Test case 3: Null input
        System.out.println("\n=== Test 3: Null Input (DFS) ===");
        Node clonedNull = sol.cloneGraph(null);
        System.out.println("Cloned null: " + (clonedNull == null)); // Expected: true
        
        // Test case 4: Two connected nodes
        Node a = new Node(1);
        Node b = new Node(2);
        a.neighbors.add(b);
        b.neighbors.add(a);
        
        System.out.println("\n=== Test 4: Two Connected Nodes (BFS) ===");
        System.out.println("Original Graph: [[2],[1]]");
        Node clonedA = sol.cloneGraphBFS(a);
        System.out.println("Cloned node value: " + clonedA.val);
        System.out.println("Cloned node neighbors count: " + clonedA.neighbors.size());
        System.out.println("Neighbor value: " + clonedA.neighbors.get(0).val);
        System.out.println("Circular reference preserved: " + (clonedA.neighbors.get(0).neighbors.get(0) == clonedA));
        System.out.println("Is deep copy: " + (clonedA != a));
        
        // Test case 5: Triangle graph
        Node t1 = new Node(1);
        Node t2 = new Node(2);
        Node t3 = new Node(3);
        t1.neighbors.add(t2);
        t1.neighbors.add(t3);
        t2.neighbors.add(t1);
        t2.neighbors.add(t3);
        t3.neighbors.add(t1);
        t3.neighbors.add(t2);
        
        System.out.println("\n=== Test 5: Triangle Graph (DFS) ===");
        System.out.println("Original Graph: [[2,3],[1,3],[1,2]]");
        Node clonedT1 = sol.cloneGraph(t1);
        System.out.println("Cloned node value: " + clonedT1.val);
        System.out.println("Cloned node neighbors count: " + clonedT1.neighbors.size());
        System.out.println("All nodes are different objects: " + 
            (clonedT1 != t1 && clonedT1.neighbors.get(0) != t2 && clonedT1.neighbors.get(1) != t3));
    }

}

