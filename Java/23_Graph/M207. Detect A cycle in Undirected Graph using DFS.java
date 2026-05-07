// 207. Course Schedule
// Detect A cycle in Undirected Graph using DFS
// https://leetcode.com/problems/course-schedule/

/*
Approach: DFS with Parent Tracking for Undirected Graph
1. Build adjacency list - treat prerequisites as UNDIRECTED edges (bidirectional)
2. Use DFS with parent tracking:
   - Mark node as visited
   - For each neighbor:
     * If unvisited: recursively check for cycle
     * If visited AND not parent: cycle detected
3. Check all components (for disconnected graphs)

Key Difference from Directed Graph:
- In undirected graphs, we track parent to avoid false cycle detection
- Edge (u,v) means both u->v and v->u

Time Complexity: O(V + E)
Space Complexity: O(V + E)
*/

import java.util.*;

class Solution {
    public boolean canFinish(int numCourses, int[][] prerequisites) {
        // Build adjacency list (BIDIRECTIONAL for undirected graph)
        List<List<Integer>> adj = new ArrayList<>();
        for (int i = 0; i < numCourses; i++) {
            adj.add(new ArrayList<>());
        }
        
        // Add edges in BOTH directions (undirected)
        for (int[] prereq : prerequisites) {
            int u = prereq[0];
            int v = prereq[1];
            adj.get(u).add(v);
            adj.get(v).add(u); // Bidirectional edge
        }
        
        boolean[] visited = new boolean[numCourses];
        
        // Check all components for cycles
        for (int i = 0; i < numCourses; i++) {
            if (!visited[i]) {
                if (hasCycleDFS(i, -1, adj, visited)) {
                    return false; // Cycle found - cannot finish
                }
            }
        }
        
        return true; // No cycle - can finish
    }
    
    private boolean hasCycleDFS(int node, int parent, List<List<Integer>> adj, boolean[] visited) {
        visited[node] = true;
        
        // Check all neighbors
        for (int neighbor : adj.get(node)) {
            if (!visited[neighbor]) {
                // Visit unvisited neighbor
                if (hasCycleDFS(neighbor, node, adj, visited)) {
                    return true;
                }
            } else if (neighbor != parent) {
                // Visited neighbor that's NOT the parent = back edge = cycle
                return true;
            }
            // If neighbor is parent, ignore (it's the edge we came from)
        }
        
        return false;
    }

    public static void main(String[] args){
        Solution sol = new Solution();
        
        // Test case 1: No cycle - linear chain
        int numCourses1 = 3;
        int[][] prerequisites1 = {{0,1},{1,2}};
        System.out.println("=== Test 1: Linear Chain ===");
        System.out.println("Courses: " + numCourses1);
        System.out.println("Prerequisites (as undirected): [[0,1],[1,2]]");
        System.out.println("Can Finish: " + sol.canFinish(numCourses1, prerequisites1)); // Expected: true
        
        // Test case 2: Has cycle - triangle
        int numCourses2 = 3;
        int[][] prerequisites2 = {{0,1},{1,2},{2,0}};
        System.out.println("\n=== Test 2: Triangle Cycle ===");
        System.out.println("Courses: " + numCourses2);
        System.out.println("Prerequisites (as undirected): [[0,1],[1,2],[2,0]]");
        System.out.println("Can Finish: " + sol.canFinish(numCourses2, prerequisites2)); // Expected: false
        
        // Test case 3: No cycle - tree structure
        int numCourses3 = 4;
        int[][] prerequisites3 = {{0,1},{0,2},{0,3}};
        System.out.println("\n=== Test 3: Tree (Star) ===");
        System.out.println("Courses: " + numCourses3);
        System.out.println("Prerequisites (as undirected): [[0,1],[0,2],[0,3]]");
        System.out.println("Can Finish: " + sol.canFinish(numCourses3, prerequisites3)); // Expected: true
        
        // Test case 4: Has cycle - square
        int numCourses4 = 4;
        int[][] prerequisites4 = {{0,1},{1,2},{2,3},{3,0}};
        System.out.println("\n=== Test 4: Square Cycle ===");
        System.out.println("Courses: " + numCourses4);
        System.out.println("Prerequisites (as undirected): [[0,1],[1,2],[2,3],[3,0]]");
        System.out.println("Can Finish: " + sol.canFinish(numCourses4, prerequisites4)); // Expected: false
        
        // Test case 5: Disconnected - no cycle
        int numCourses5 = 5;
        int[][] prerequisites5 = {{0,1},{2,3}};
        System.out.println("\n=== Test 5: Disconnected Graph ===");
        System.out.println("Courses: " + numCourses5);
        System.out.println("Prerequisites (as undirected): [[0,1],[2,3]]");
        System.out.println("Can Finish: " + sol.canFinish(numCourses5, prerequisites5)); // Expected: true
        
        // Test case 6: No prerequisites
        int numCourses6 = 3;
        int[][] prerequisites6 = {};
        System.out.println("\n=== Test 6: No Prerequisites ===");
        System.out.println("Courses: " + numCourses6);
        System.out.println("Prerequisites: []");
        System.out.println("Can Finish: " + sol.canFinish(numCourses6, prerequisites6)); // Expected: true
    }
}
