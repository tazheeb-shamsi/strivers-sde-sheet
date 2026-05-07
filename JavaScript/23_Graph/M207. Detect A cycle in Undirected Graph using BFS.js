/**
 * Detect A Cycle in Undirected Graph using BFS
 *
 * Type             | Details
 * -----------------+----------------------------------------------------
 * Time Complexity  | O(V + E) – Visit each vertex and edge once
 * Space Complexity | O(V) – Visited array and queue
 */

/**
 * Detect cycle in undirected graph using BFS
 * @param {number} V - Number of vertices
 * @param {number[][]} adj - Adjacency list
 * @returns {boolean} - true if cycle exists
 */
function isCyclic(V, adj) {
    const visited = new Array(V).fill(false);
    
    // Check all components
    for (let i = 0; i < V; i++) {
        if (!visited[i]) {
            if (bfsCheckCycle(i, adj, visited)) {
                return true;
            }
        }
    }
    
    return false;
}

function bfsCheckCycle(start, adj, visited) {
    const queue = [];
    
    // Store [node, parent]
    queue.push([start, -1]);
    visited[start] = true;
    
    while (queue.length > 0) {
        const [node, parent] = queue.shift();
        
        for (const neighbor of adj[node]) {
            if (!visited[neighbor]) {
                visited[neighbor] = true;
                queue.push([neighbor, node]);
            } else if (neighbor !== parent) {
                // Visited node that is not parent means cycle
                return true;
            }
        }
    }
    
    return false;
}

// Test cases
// Graph with cycle
// 0 -- 1 -- 2
// |         |
// 3 ------- +
const adjWithCycle = [
    [1, 3],
    [0, 2],
    [1, 3],
    [0, 2]
];
console.log("Graph with cycle:", isCyclic(4, adjWithCycle)); // true

// Graph without cycle
// 0 -- 1 -- 2
// |
// 3
const adjNoCycle = [
    [1, 3],
    [0, 2],
    [1],
    [0]
];
console.log("Graph without cycle:", isCyclic(4, adjNoCycle)); // false

// Disconnected graph with cycle
// 0 -- 1    3 -- 4
//           |    |
//           +----+
const adjDisconnected = [
    [1],
    [0],
    [],
    [4, 5],
    [3, 5],
    [3, 4]
];
console.log("Disconnected with cycle:", isCyclic(6, adjDisconnected)); // true