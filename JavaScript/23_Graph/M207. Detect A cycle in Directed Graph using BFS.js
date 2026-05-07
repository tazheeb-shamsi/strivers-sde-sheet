/**
 * 207. Detect A Cycle in Directed Graph using BFS (Kahn's Algorithm)
 * https://leetcode.com/problems/course-schedule/
 *
 * Type             | Details
 * -----------------+----------------------------------------------------
 * Time Complexity  | O(V + E) – Process each vertex and edge once
 * Space Complexity | O(V) – Queue and indegree array
 */

/**
 * Detect cycle in directed graph using BFS (Kahn's Algorithm)
 * If we can't complete topological sort, cycle exists
 * @param {number} numCourses - Number of vertices
 * @param {number[][]} prerequisites - Edges [a, b] means b -> a
 * @returns {boolean} - true if possible to finish (no cycle)
 */
function canFinish(numCourses, prerequisites) {
    // Build adjacency list
    const adj = Array.from({ length: numCourses }, () => []);
    const indegree = new Array(numCourses).fill(0);
    
    for (const [course, prereq] of prerequisites) {
        adj[prereq].push(course);
        indegree[course]++;
    }
    
    // Add all nodes with indegree 0 to queue
    const queue = [];
    for (let i = 0; i < numCourses; i++) {
        if (indegree[i] === 0) {
            queue.push(i);
        }
    }
    
    let count = 0;
    
    while (queue.length > 0) {
        const node = queue.shift();
        count++;
        
        for (const neighbor of adj[node]) {
            indegree[neighbor]--;
            if (indegree[neighbor] === 0) {
                queue.push(neighbor);
            }
        }
    }
    
    // If all nodes processed, no cycle
    return count === numCourses;
}

/**
 * Detect cycle in undirected adjacency list representation
 * @param {number} V - Number of vertices
 * @param {number[][]} adj - Adjacency list
 * @returns {boolean} - true if cycle exists
 */
function hasCycleDirectedBFS(V, adj) {
    const indegree = new Array(V).fill(0);
    
    for (let i = 0; i < V; i++) {
        for (const neighbor of adj[i]) {
            indegree[neighbor]++;
        }
    }
    
    const queue = [];
    for (let i = 0; i < V; i++) {
        if (indegree[i] === 0) {
            queue.push(i);
        }
    }
    
    let count = 0;
    
    while (queue.length > 0) {
        const node = queue.shift();
        count++;
        
        for (const neighbor of adj[node]) {
            indegree[neighbor]--;
            if (indegree[neighbor] === 0) {
                queue.push(neighbor);
            }
        }
    }
    
    return count !== V; // Cycle exists if not all nodes processed
}

// Test cases
// Course Schedule test
console.log("canFinish(2, [[1,0]]):", canFinish(2, [[1, 0]])); // true
console.log("canFinish(2, [[1,0],[0,1]]):", canFinish(2, [[1, 0], [0, 1]])); // false (cycle)

// Directed graph with cycle
const adjWithCycle = [
    [1],
    [2],
    [0]  // Creates cycle: 0 -> 1 -> 2 -> 0
];
console.log("Has cycle (0->1->2->0):", hasCycleDirectedBFS(3, adjWithCycle)); // true

// Directed graph without cycle
const adjNoCycle = [
    [1],
    [2],
    []
];
console.log("Has cycle (0->1->2):", hasCycleDirectedBFS(3, adjNoCycle)); // false