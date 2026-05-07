/**
 * Detect A Cycle in Undirected Graph using DFS
 *
 * Type             | Details
 * -----------------+----------------------------------------------------
 * Time Complexity  | O(V + E) – Visit each vertex and edge once
 * Space Complexity | O(V) – Visited array and recursion stack
 */

/**
 * Detect cycle in undirected graph using DFS
 * @param {number} V - Number of vertices
 * @param {number[][]} adj - Adjacency list
 * @returns {boolean} - true if cycle exists
 */
function isCyclic(V, adj) {
    const visited = new Array(V).fill(false);
    
    // Check all components
    for (let i = 0; i < V; i++) {
        if (!visited[i]) {
            if (dfsCheckCycle(i, -1, adj, visited)) {
                return true;
            }
        }
    }
    
    return false;
}

function dfsCheckCycle(node, parent, adj, visited) {
    visited[node] = true;
    
    for (const neighbor of adj[node]) {
        if (!visited[neighbor]) {
            if (dfsCheckCycle(neighbor, node, adj, visited)) {
                return true;
            }
        } else if (neighbor !== parent) {
            // Visited node that is not parent means cycle
            return true;
        }
    }
    
    return false;
}

// Test cases
// Graph with cycle: 0-1-2-3-0
const adjWithCycle = [
    [1, 3],
    [0, 2],
    [1, 3],
    [0, 2]
];
console.log("Graph with cycle:", isCyclic(4, adjWithCycle)); // true

// Tree (no cycle)
// 0 -- 1 -- 2
//      |
//      3
const adjTree = [
    [1],
    [0, 2, 3],
    [1],
    [1]
];
console.log("Tree (no cycle):", isCyclic(4, adjTree)); // false

// Single edge (no cycle)
const adjSingleEdge = [
    [1],
    [0]
];
console.log("Single edge:", isCyclic(2, adjSingleEdge)); // false

// Self-loop
const adjSelfLoop = [
    [0, 1],
    [0]
];
console.log("Self loop:", isCyclic(2, adjSelfLoop)); // true