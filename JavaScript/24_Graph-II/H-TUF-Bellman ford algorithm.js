/**
 * TUF: Bellman-Ford Algorithm
 * https://takeuforward.org/plus/dsa/problems/bellman-ford
 *
 * Single source shortest path algorithm that handles negative weights.
 * Can detect negative cycles.
 *
 * Type             | Details
 * -----------------+----------------------------------------------------
 * Time Complexity  | O(V * E) – Relax all edges V-1 times
 * Space Complexity | O(V) – Distance array
 */

/**
 * Bellman-Ford algorithm for single source shortest path
 * @param {number} V - Number of vertices
 * @param {number[][]} edges - Array of [u, v, weight]
 * @param {number} src - Source vertex
 * @returns {number[]} - Shortest distances from source (-1 if negative cycle)
 */
function bellmanFord(V, edges, src) {
    const INF = 1e8;
    const dist = new Array(V).fill(INF);
    dist[src] = 0;
    
    // Relax all edges V-1 times
    for (let i = 0; i < V - 1; i++) {
        for (const [u, v, wt] of edges) {
            if (dist[u] !== INF && dist[u] + wt < dist[v]) {
                dist[v] = dist[u] + wt;
            }
        }
    }
    
    // Check for negative cycle (V-th iteration)
    for (const [u, v, wt] of edges) {
        if (dist[u] !== INF && dist[u] + wt < dist[v]) {
            // Negative cycle detected
            return [-1];
        }
    }
    
    return dist;
}

/**
 * Bellman-Ford with path reconstruction
 * @param {number} V - Number of vertices
 * @param {number[][]} edges - Array of [u, v, weight]
 * @param {number} src - Source vertex
 * @param {number} dest - Destination vertex
 * @returns {Object} - { distance, path }
 */
function bellmanFordWithPath(V, edges, src, dest) {
    const INF = 1e8;
    const dist = new Array(V).fill(INF);
    const parent = new Array(V).fill(-1);
    dist[src] = 0;
    
    for (let i = 0; i < V - 1; i++) {
        for (const [u, v, wt] of edges) {
            if (dist[u] !== INF && dist[u] + wt < dist[v]) {
                dist[v] = dist[u] + wt;
                parent[v] = u;
            }
        }
    }
    
    // Check for negative cycle
    for (const [u, v, wt] of edges) {
        if (dist[u] !== INF && dist[u] + wt < dist[v]) {
            return { distance: -1, path: [], hasNegativeCycle: true };
        }
    }
    
    // Reconstruct path
    const path = [];
    let curr = dest;
    while (curr !== -1) {
        path.unshift(curr);
        curr = parent[curr];
    }
    
    return { distance: dist[dest], path, hasNegativeCycle: false };
}

// Test cases
// Graph with 5 vertices
const edges = [
    [0, 1, -1],
    [0, 2, 4],
    [1, 2, 3],
    [1, 3, 2],
    [1, 4, 2],
    [3, 2, 5],
    [3, 1, 1],
    [4, 3, -3]
];

console.log("Bellman-Ford distances from 0:", bellmanFord(5, edges, 0));
// Expected: [0, -1, 2, -2, 1]

const result = bellmanFordWithPath(5, edges, 0, 3);
console.log("Distance to 3:", result.distance);
console.log("Path to 3:", result.path);

// Graph with negative cycle
const edgesWithCycle = [
    [0, 1, 1],
    [1, 2, -1],
    [2, 0, -1]
];
console.log("With negative cycle:", bellmanFord(3, edgesWithCycle, 0)); // [-1]