/**
 * 785. Is Graph Bipartite?
 * https://leetcode.com/problems/is-graph-bipartite/
 *
 * A graph is bipartite if we can split its nodes into two independent sets A and B
 * such that every edge connects a node in A to one in B.
 *
 * Type             | Details
 * -----------------+----------------------------------------------------
 * Time Complexity  | O(V + E) – Visit each vertex and edge once
 * Space Complexity | O(V) – Color array
 */

/**
 * Check if graph is bipartite using BFS (2-coloring)
 * @param {number[][]} graph - Adjacency list
 * @returns {boolean}
 */
function isBipartite(graph) {
    const n = graph.length;
    const color = new Array(n).fill(-1);
    
    // Check all components (graph may be disconnected)
    for (let i = 0; i < n; i++) {
        if (color[i] === -1) {
            if (!bfsCheck(i, graph, color)) {
                return false;
            }
        }
    }
    
    return true;
}

function bfsCheck(start, graph, color) {
    const queue = [start];
    color[start] = 0;
    
    while (queue.length > 0) {
        const node = queue.shift();
        
        for (const neighbor of graph[node]) {
            if (color[neighbor] === -1) {
                // Color with opposite color
                color[neighbor] = 1 - color[node];
                queue.push(neighbor);
            } else if (color[neighbor] === color[node]) {
                // Same color as parent - not bipartite
                return false;
            }
        }
    }
    
    return true;
}

/**
 * Check if graph is bipartite using DFS
 * @param {number[][]} graph - Adjacency list
 * @returns {boolean}
 */
function isBipartiteDFS(graph) {
    const n = graph.length;
    const color = new Array(n).fill(-1);
    
    for (let i = 0; i < n; i++) {
        if (color[i] === -1) {
            if (!dfsCheck(i, 0, graph, color)) {
                return false;
            }
        }
    }
    
    return true;
}

function dfsCheck(node, c, graph, color) {
    color[node] = c;
    
    for (const neighbor of graph[node]) {
        if (color[neighbor] === -1) {
            if (!dfsCheck(neighbor, 1 - c, graph, color)) {
                return false;
            }
        } else if (color[neighbor] === c) {
            return false;
        }
    }
    
    return true;
}

// Test cases
// Bipartite graph
// 0 -- 1
// |    |
// 3 -- 2
const graph1 = [[1, 3], [0, 2], [1, 3], [0, 2]];
console.log("Graph 1 (bipartite):", isBipartite(graph1)); // true

// Non-bipartite (odd cycle)
// 0 -- 1
//  \  /
//   2
const graph2 = [[1, 2], [0, 2], [0, 1]];
console.log("Graph 2 (triangle):", isBipartite(graph2)); // false

// Bipartite - complete bipartite K2,3
const graph3 = [[1, 2, 3], [0, 4], [0, 4], [0, 4], [1, 2, 3]];
console.log("Graph 3 (K2,3):", isBipartiteDFS(graph3)); // true