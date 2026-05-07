/**
 * 207. Detect A Cycle in Directed Graph using DFS
 * https://leetcode.com/problems/course-schedule/
 *
 * Type             | Details
 * -----------------+----------------------------------------------------
 * Time Complexity  | O(V + E) – Visit each vertex and edge once
 * Space Complexity | O(V) – Visited and recursion stack arrays
 */

/**
 * Detect cycle in directed graph using DFS
 * Uses visited and recStack (nodes in current DFS path)
 * @param {number} numCourses - Number of vertices
 * @param {number[][]} prerequisites - Edges [a, b] means b -> a
 * @returns {boolean} - true if possible to finish (no cycle)
 */
function canFinish(numCourses, prerequisites) {
    // Build adjacency list
    const adj = Array.from({ length: numCourses }, () => []);
    
    for (const [course, prereq] of prerequisites) {
        adj[prereq].push(course);
    }
    
    const visited = new Array(numCourses).fill(false);
    const recStack = new Array(numCourses).fill(false);
    
    for (let i = 0; i < numCourses; i++) {
        if (!visited[i]) {
            if (hasCycleDFS(i, adj, visited, recStack)) {
                return false; // Cycle found, can't finish
            }
        }
    }
    
    return true; // No cycle
}

function hasCycleDFS(node, adj, visited, recStack) {
    visited[node] = true;
    recStack[node] = true;
    
    for (const neighbor of adj[node]) {
        // If neighbor is in current recursion stack, cycle exists
        if (recStack[neighbor]) {
            return true;
        }
        
        // If not visited, continue DFS
        if (!visited[neighbor]) {
            if (hasCycleDFS(neighbor, adj, visited, recStack)) {
                return true;
            }
        }
    }
    
    // Remove from recursion stack before returning
    recStack[node] = false;
    return false;
}

/**
 * Alternative: Cycle detection using colors (WHITE, GRAY, BLACK)
 * WHITE = unvisited, GRAY = in progress, BLACK = completed
 */
function canFinishWithColors(numCourses, prerequisites) {
    const adj = Array.from({ length: numCourses }, () => []);
    
    for (const [course, prereq] of prerequisites) {
        adj[prereq].push(course);
    }
    
    const WHITE = 0, GRAY = 1, BLACK = 2;
    const color = new Array(numCourses).fill(WHITE);
    
    function dfs(node) {
        color[node] = GRAY;
        
        for (const neighbor of adj[node]) {
            if (color[neighbor] === GRAY) return true; // Cycle
            if (color[neighbor] === WHITE && dfs(neighbor)) return true;
        }
        
        color[node] = BLACK;
        return false;
    }
    
    for (let i = 0; i < numCourses; i++) {
        if (color[i] === WHITE && dfs(i)) {
            return false;
        }
    }
    
    return true;
}

// Test cases
console.log("canFinish(2, [[1,0]]):", canFinish(2, [[1, 0]])); // true
console.log("canFinish(2, [[1,0],[0,1]]):", canFinish(2, [[1, 0], [0, 1]])); // false

console.log("canFinishWithColors(2, [[1,0]]):", canFinishWithColors(2, [[1, 0]])); // true
console.log("canFinishWithColors(2, [[1,0],[0,1]]):", canFinishWithColors(2, [[1, 0], [0, 1]])); // false