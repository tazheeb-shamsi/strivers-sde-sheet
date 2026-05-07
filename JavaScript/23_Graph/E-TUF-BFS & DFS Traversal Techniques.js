/**
 * TUF: BFS & DFS Traversal Techniques
 * https://takeuforward.org/plus/dsa/problems/bfs-dfs
 *
 * BFS (Breadth-First Search): Uses Queue, level-by-level traversal
 * DFS (Depth-First Search): Uses Stack/Recursion, goes deep first
 *
 * Type             | Details
 * -----------------+----------------------------------------------------
 * Time Complexity  | O(V + E) – Visit each vertex and edge once
 * Space Complexity | O(V) – Queue/Stack and visited array
 */

/**
 * BFS Traversal starting from node 0
 * @param {number} V - Number of vertices
 * @param {number[][]} adj - Adjacency list
 * @returns {number[]} - BFS traversal order
 */
function bfsTraversal(V, adj) {
    const visited = new Array(V).fill(false);
    const result = [];
    const queue = [];
    
    // Start from node 0
    queue.push(0);
    visited[0] = true;
    
    while (queue.length > 0) {
        const node = queue.shift();
        result.push(node);
        
        // Visit all adjacent nodes
        for (const neighbor of adj[node]) {
            if (!visited[neighbor]) {
                visited[neighbor] = true;
                queue.push(neighbor);
            }
        }
    }
    
    return result;
}

/**
 * DFS Traversal starting from node 0
 * @param {number} V - Number of vertices
 * @param {number[][]} adj - Adjacency list
 * @returns {number[]} - DFS traversal order
 */
function dfsTraversal(V, adj) {
    const visited = new Array(V).fill(false);
    const result = [];
    
    dfs(0, adj, visited, result);
    return result;
}

function dfs(node, adj, visited, result) {
    visited[node] = true;
    result.push(node);
    
    for (const neighbor of adj[node]) {
        if (!visited[neighbor]) {
            dfs(neighbor, adj, visited, result);
        }
    }
}

/**
 * DFS using explicit stack (Iterative)
 * @param {number} V - Number of vertices
 * @param {number[][]} adj - Adjacency list
 * @returns {number[]} - DFS traversal order
 */
function dfsIterative(V, adj) {
    const visited = new Array(V).fill(false);
    const result = [];
    const stack = [];
    
    stack.push(0);
    
    while (stack.length > 0) {
        const node = stack.pop();
        
        if (!visited[node]) {
            visited[node] = true;
            result.push(node);
            
            // Add neighbors in reverse order for consistent traversal
            for (let i = adj[node].length - 1; i >= 0; i--) {
                const neighbor = adj[node][i];
                if (!visited[neighbor]) {
                    stack.push(neighbor);
                }
            }
        }
    }
    
    return result;
}

// Test cases
// Graph with 5 vertices
// 0 -- 1 -- 2
// |    |
// 3 -- 4
const adj = [
    [1, 3],    // 0 connects to 1, 3
    [0, 2, 4], // 1 connects to 0, 2, 4
    [1],       // 2 connects to 1
    [0, 4],    // 3 connects to 0, 4
    [1, 3]     // 4 connects to 1, 3
];

console.log("BFS Traversal:", bfsTraversal(5, adj));
console.log("DFS Traversal:", dfsTraversal(5, adj));
console.log("DFS Iterative:", dfsIterative(5, adj));