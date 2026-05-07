// 207. Course Schedule
// Detect A cycle in Directed Graph using DFS
// https://leetcode.com/problems/course-schedule/

/*
Approach:
1. Build adjacency list from prerequisites
2. Use DFS with state tracking:
   - 0: not visited
   - 1: visiting (in current DFS path)
   - 2: visited (completely processed)
3. If we visit a node that's currently being visited (state 1), there's a cycle
4. Return true if no cycles found (can finish all courses)

Time Complexity: O(V + E) where V = numCourses, E = prerequisites.length
Space Complexity: O(V + E) for adjacency list and recursion stack
*/

import java.util.*;

class Solution {
    public boolean canFinish(int numCourses, int[][] prerequisites) {
        // Build adjacency list
        List<List<Integer>> adj = new ArrayList<>();
        for (int i = 0; i < numCourses; i++) {
            adj.add(new ArrayList<>());
        }
        
        for (int[] prereq : prerequisites) {
            int course = prereq[0];
            int prerequisite = prereq[1];
            adj.get(prerequisite).add(course);
        }
        
        // State array: 0 = not visited, 1 = visiting, 2 = visited
        int[] state = new int[numCourses];
        
        // Check for cycles starting from each course
        for (int i = 0; i < numCourses; i++) {
            if (state[i] == 0) {
                if (hasCycle(i, adj, state)) {
                    return false; // Cycle detected
                }
            }
        }
        
        return true; // No cycles, can finish all courses
    }
    
    private boolean hasCycle(int course, List<List<Integer>> adj, int[] state) {
        // Mark as visiting
        state[course] = 1;
        
        // Visit all neighbors
        for (int neighbor : adj.get(course)) {
            if (state[neighbor] == 1) {
                // Back edge found - cycle detected
                return true;
            }
            if (state[neighbor] == 0) {
                if (hasCycle(neighbor, adj, state)) {
                    return true;
                }
            }
            // If state[neighbor] == 2, it's already processed, skip
        }
        
        // Mark as visited (completely processed)
        state[course] = 2;
        return false;
    }

    public static void main(String[] args){
        Solution sol = new Solution();
        
        // Test case 1: Can finish - no cycle
        int numCourses1 = 2;
        int[][] prerequisites1 = {{1,0}};
        System.out.println("=== Test 1: Simple Prerequisites ===");
        System.out.println("Courses: " + numCourses1);
        System.out.println("Prerequisites: [[1,0]]");
        System.out.println("Can Finish: " + sol.canFinish(numCourses1, prerequisites1)); // Expected: true
        
        // Test case 2: Cannot finish - has cycle
        int numCourses2 = 2;
        int[][] prerequisites2 = {{1,0},{0,1}};
        System.out.println("\n=== Test 2: Circular Dependency ===");
        System.out.println("Courses: " + numCourses2);
        System.out.println("Prerequisites: [[1,0],[0,1]]");
        System.out.println("Can Finish: " + sol.canFinish(numCourses2, prerequisites2)); // Expected: false
        
        // Test case 3: Multiple prerequisites, can finish
        int numCourses3 = 4;
        int[][] prerequisites3 = {{1,0},{2,0},{3,1},{3,2}};
        System.out.println("\n=== Test 3: Multiple Prerequisites ===");
        System.out.println("Courses: " + numCourses3);
        System.out.println("Prerequisites: [[1,0],[2,0],[3,1],[3,2]]");
        System.out.println("Can Finish: " + sol.canFinish(numCourses3, prerequisites3)); // Expected: true
        
        // Test case 4: Complex cycle
        int numCourses4 = 3;
        int[][] prerequisites4 = {{0,1},{1,2},{2,0}};
        System.out.println("\n=== Test 4: Triangle Cycle ===");
        System.out.println("Courses: " + numCourses4);
        System.out.println("Prerequisites: [[0,1],[1,2],[2,0]]");
        System.out.println("Can Finish: " + sol.canFinish(numCourses4, prerequisites4)); // Expected: false
        
        // Test case 5: No prerequisites
        int numCourses5 = 3;
        int[][] prerequisites5 = {};
        System.out.println("\n=== Test 5: No Prerequisites ===");
        System.out.println("Courses: " + numCourses5);
        System.out.println("Prerequisites: []");
        System.out.println("Can Finish: " + sol.canFinish(numCourses5, prerequisites5)); // Expected: true
    }
}
