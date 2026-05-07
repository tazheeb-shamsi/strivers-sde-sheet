/**
 * TUF: Floyd-Warshall Algorithm
 * https://takeuforward.org/plus/dsa/problems/floyd-warshall
 *
 * All-pairs shortest path algorithm.
 * Handles negative edges (but not negative cycles).
 *
 * Type             | Details
 * -----------------+----------------------------------------------------
 * Time Complexity  | O(V³) – Three nested loops
 * Space Complexity | O(V²) – Distance matrix (can be done in-place)
 */

/**
 * Floyd-Warshall Algorithm for all-pairs shortest paths
 * @param {number[][]} dist - Distance matrix (modify in-place)
 *        dist[i][j] = weight of edge i->j or Infinity if no edge
 *        dist[i][i] = 0
 */
function floydWarshall(dist) {
    const V = dist.length;
    const INF = 1e8;
    
    // Replace -1 with Infinity for no edge (common input format)
    for (let i = 0; i < V; i++) {
        for (let j = 0; j < V; j++) {
            if (dist[i][j] === -1 && i !== j) {
                dist[i][j] = INF;
            }
        }
    }
    
    // Main algorithm: try each vertex as intermediate
    for (let k = 0; k < V; k++) {
        for (let i = 0; i < V; i++) {
            for (let j = 0; j < V; j++) {
                if (dist[i][k] < INF && dist[k][j] < INF) {
                    dist[i][j] = Math.min(dist[i][j], dist[i][k] + dist[k][j]);
                }
            }
        }
    }
    
    // Replace Infinity back to -1 (if needed for output format)
    for (let i = 0; i < V; i++) {
        for (let j = 0; j < V; j++) {
            if (dist[i][j] >= INF) {
                dist[i][j] = -1;
            }
        }
    }
}

/**
 * Floyd-Warshall with path reconstruction
 */
function floydWarshallWithPath(matrix) {
    const V = matrix.length;
    const INF = 1e8;
    const dist = matrix.map(row => [...row]);
    const next = Array.from({ length: V }, () => new Array(V).fill(-1));
    
    // Initialize next matrix
    for (let i = 0; i < V; i++) {
        for (let j = 0; j < V; j++) {
            if (dist[i][j] !== -1 && dist[i][j] !== 0) {
                next[i][j] = j;
            }
            if (dist[i][j] === -1) {
                dist[i][j] = INF;
            }
        }
    }
    
    // Main algorithm
    for (let k = 0; k < V; k++) {
        for (let i = 0; i < V; i++) {
            for (let j = 0; j < V; j++) {
                if (dist[i][k] < INF && dist[k][j] < INF && 
                    dist[i][k] + dist[k][j] < dist[i][j]) {
                    dist[i][j] = dist[i][k] + dist[k][j];
                    next[i][j] = next[i][k];
                }
            }
        }
    }
    
    // Reconstruct path from u to v
    function getPath(u, v) {
        if (next[u][v] === -1) return [];
        const path = [u];
        while (u !== v) {
            u = next[u][v];
            path.push(u);
        }
        return path;
    }
    
    // Replace Infinity with -1
    for (let i = 0; i < V; i++) {
        for (let j = 0; j < V; j++) {
            if (dist[i][j] >= INF) dist[i][j] = -1;
        }
    }
    
    return { dist, getPath };
}

/**
 * Detect negative cycle using Floyd-Warshall
 */
function hasNegativeCycle(matrix) {
    const V = matrix.length;
    const INF = 1e8;
    const dist = matrix.map(row => row.map(x => x === -1 ? INF : x));
    
    for (let k = 0; k < V; k++) {
        for (let i = 0; i < V; i++) {
            for (let j = 0; j < V; j++) {
                if (dist[i][k] < INF && dist[k][j] < INF) {
                    dist[i][j] = Math.min(dist[i][j], dist[i][k] + dist[k][j]);
                }
            }
        }
    }
    
    // Negative cycle exists if diagonal has negative value
    for (let i = 0; i < V; i++) {
        if (dist[i][i] < 0) return true;
    }
    return false;
}

// Test cases
// 4 vertices, -1 means no direct edge
const matrix = [
    [0, 3, -1, 5],
    [2, 0, -1, 4],
    [-1, 1, 0, -1],
    [-1, -1, 2, 0]
];

floydWarshall(matrix);
console.log("All-pairs shortest paths:");
matrix.forEach(row => console.log(row));

// With path reconstruction
const matrix2 = [
    [0, 3, -1, 5],
    [2, 0, -1, 4],
    [-1, 1, 0, -1],
    [-1, -1, 2, 0]
];
const result = floydWarshallWithPath(matrix2);
console.log("\nPath from 0 to 2:", result.getPath(0, 2));
console.log("Path from 3 to 1:", result.getPath(3, 1));