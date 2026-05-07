/**
 * TUF: Topological Sort (Kahn's Algorithm - BFS)
 * https://takeuforward.org/plus/dsa/problems/topological-sort
 *
 * Topological Sort: Linear ordering of vertices such that for every directed edge u -> v,
 * vertex u comes before v in the ordering.
 *
 * Type             | Details
 * -----------------+----------------------------------------------------
 * Time Complexity  | O(V + E) – Process each vertex and edge once
 * Space Complexity | O(V) – Queue and indegree array
 */

/**
 * Kahn's Algorithm (BFS-based Topological Sort)
 * @param {number} V - Number of vertices
 * @param {number[][]} adj - Adjacency list
 * @returns {number[]} - Topological order
 */
function topologicalSortBFS(V, adj) {
    // Calculate indegree for each vertex
    const indegree = new Array(V).fill(0);
    
    for (let i = 0; i < V; i++) {
        for (const neighbor of adj[i]) {
            indegree[neighbor]++;
        }
    }
    
    // Add all vertices with indegree 0 to queue
    const queue = [];
    for (let i = 0; i < V; i++) {
        if (indegree[i] === 0) {
            queue.push(i);
        }
    }
    
    const result = [];
    
    while (queue.length > 0) {
        const node = queue.shift();
        result.push(node);
        
        // Reduce indegree of neighbors
        for (const neighbor of adj[node]) {
            indegree[neighbor]--;
            if (indegree[neighbor] === 0) {
                queue.push(neighbor);
            }
        }
    }
    
    // If result doesn't contain all vertices, cycle exists
    if (result.length !== V) {
        return []; // Cycle detected
    }
    
    return result;
}

/**
 * DFS-based Topological Sort
 * @param {number} V - Number of vertices
 * @param {number[][]} adj - Adjacency list
 * @returns {number[]} - Topological order
 */
function topologicalSortDFS(V, adj) {
    const visited = new Array(V).fill(false);
    const stack = [];
    
    for (let i = 0; i < V; i++) {
        if (!visited[i]) {
            dfs(i, adj, visited, stack);
        }
    }
    
    // Reverse the stack to get topological order
    return stack.reverse();
}

function dfs(node, adj, visited, stack) {
    visited[node] = true;
    
    for (const neighbor of adj[node]) {
        if (!visited[neighbor]) {
            dfs(neighbor, adj, visited, stack);
        }
    }
    
    stack.push(node);
}

// Test cases
// DAG with 6 vertices
// 5 -> 0, 4
// 4 -> 0, 1
// 2 -> 3
// 3 -> 1
const adj = [
    [],        // 0
    [],        // 1
    [3],       // 2 -> 3
    [1],       // 3 -> 1
    [0, 1],    // 4 -> 0, 1
    [0, 2]     // 5 -> 0, 2
];

console.log("Topological Sort (BFS - Kahn's):", topologicalSortBFS(6, adj));
console.log("Topological Sort (DFS):", topologicalSortDFS(6, adj));