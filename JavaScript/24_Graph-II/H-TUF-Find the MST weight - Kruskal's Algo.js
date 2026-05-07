/**
 * TUF: Minimum Spanning Tree - Kruskal's Algorithm
 * https://takeuforward.org/plus/dsa/problems/minimum-spanning-tree
 *
 * Greedy algorithm using Union-Find (Disjoint Set Union).
 *
 * Time Complexity: O(E * log E) – Sorting edges dominates
 * Space Complexity: O(V + E) – DSU arrays and edges
 */

/**
 * Disjoint Set Union (Union-Find) with path compression and union by rank
 */
function createDSU(n) {
    const parent = Array.from({ length: n }, (_, i) => i);
    const rank = Array(n).fill(0);

    function find(x) {
        if (parent[x] !== x) {
            parent[x] = find(parent[x]); // Path compression
        }
        return parent[x];
    }

    function union(x, y) {
        const px = find(x);
        const py = find(y);
        
        if (px === py) return false; // Already in same set
        
        // Union by rank
        if (rank[px] < rank[py]) {
            parent[px] = py;
        } else if (rank[px] > rank[py]) {
            parent[py] = px;
        } else {
            parent[py] = px;
            rank[px]++;
        }
        
        return true;
    }

    return { find, union };
}

/**
 * Kruskal's Algorithm for Minimum Spanning Tree
 * @param {number} V - Number of vertices
 * @param {number[][]} edges - Array of [u, v, weight]
 * @returns {Object} - { weight, mstEdges }
 */
function kruskalMST(V, edges) {
    // Sort edges by weight
    edges.sort((a, b) => a[2] - b[2]);
    
    const dsu = createDSU(V);
    let mstWeight = 0;
    const mstEdges = [];
    
    for (const [u, v, wt] of edges) {
        // If u and v are in different components, include this edge
        if (dsu.union(u, v)) {
            mstWeight += wt;
            mstEdges.push([u, v, wt]);
            
            // MST complete when we have V-1 edges
            if (mstEdges.length === V - 1) break;
        }
    }
    
    return { weight: mstWeight, mstEdges };
}

/**
 * Find MST weight only (simplified version)
 * @param {number} V - Number of vertices
 * @param {number[][][]} adj - Adjacency list where adj[u] = [[v, weight], ...]
 * @returns {number} - MST weight
 */
function spanningTree(V, adj) {
    // Convert adjacency list to edges
    const edges = [];
    for (let u = 0; u < V; u++) {
        for (const [v, wt] of adj[u]) {
            if (u < v) { // Avoid duplicates
                edges.push([u, v, wt]);
            }
        }
    }
    
    edges.sort((a, b) => a[2] - b[2]);
    
    const dsu = createDSU(V);
    let mstWeight = 0;
    
    for (const [u, v, wt] of edges) {
        if (dsu.union(u, v)) {
            mstWeight += wt;
        }
    }
    
    return mstWeight;
}

// Test cases
// Graph: 0--1--2
//        |\ | /|
//        | \|/ |
//        3--4--5
const edges1 = [
    [0, 1, 2], [0, 3, 6], [0, 4, 4],
    [1, 2, 3], [1, 4, 5],
    [2, 4, 7], [2, 5, 1],
    [3, 4, 8],
    [4, 5, 9]
];

const result1 = kruskalMST(6, edges1);
console.log("MST Weight:", result1.weight);
console.log("MST Edges:", result1.mstEdges);

// Test with adjacency list
const adj = [
    [[1, 2], [3, 6], [4, 4]],
    [[0, 2], [2, 3], [4, 5]],
    [[1, 3], [4, 7], [5, 1]],
    [[0, 6], [4, 8]],
    [[0, 4], [1, 5], [2, 7], [3, 8], [5, 9]],
    [[2, 1], [4, 9]]
];

console.log("Spanning Tree Weight:", spanningTree(6, adj));
