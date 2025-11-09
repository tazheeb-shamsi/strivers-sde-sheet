// 207. Course Schedule
// Detect A cycle in Directed Graph using BFS (Kahn's Algorithm - Topological Sort)
// https://leetcode.com/problems/course-schedule/


import java.util.*;

class Solution {
    public boolean canFinish(int numCourses, int[][] prerequisites) {
        // Build adjacency list
        List<List<Integer>> adj = new ArrayList<>();
        for (int i = 0; i < numCourses; i++) {
            adj.add(new ArrayList<>());
        }
        
        // Calculate in-degrees
        int[] indegree = new int[numCourses];
        for (int[] prereq : prerequisites) {
            int course = prereq[0];
            int prerequisite = prereq[1];
            adj.get(prerequisite).add(course);
            indegree[course]++;
        }
        
        // Add all courses with no prerequisites to queue
        Queue<Integer> queue = new LinkedList<>();
        for (int i = 0; i < numCourses; i++) {
            if (indegree[i] == 0) {
                queue.offer(i);
            }
        }
        
        // Process courses using BFS
        int processedCourses = 0;
        while (!queue.isEmpty()) {
            int course = queue.poll();
            processedCourses++;
            
            // Reduce in-degree for all neighbors
            for (int neighbor : adj.get(course)) {
                indegree[neighbor]--;
                // If in-degree becomes 0, all prerequisites are completed
                if (indegree[neighbor] == 0) {
                    queue.offer(neighbor);
                }
            }
        }
        
        // If we processed all courses, no cycle exists
        return processedCourses == numCourses;
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
        
        // Test case 6: Chain of prerequisites
        int numCourses6 = 5;
        int[][] prerequisites6 = {{1,0},{2,1},{3,2},{4,3}};
        System.out.println("\n=== Test 6: Chain of Prerequisites ===");
        System.out.println("Courses: " + numCourses6);
        System.out.println("Prerequisites: [[1,0],[2,1],[3,2],[4,3]]");
        System.out.println("Can Finish: " + sol.canFinish(numCourses6, prerequisites6)); // Expected: true
    }
}

