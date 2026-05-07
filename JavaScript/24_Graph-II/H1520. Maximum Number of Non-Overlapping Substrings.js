/**
 * TUF: Kosaraju's Algorithm - Strongly Connected Components
 * https://takeuforward.org/plus/dsa/problems/kosaraju
 *
 * Find all Strongly Connected Components (SCCs) in a directed graph.
 *
 * Type             | Details
 * -----------------+----------------------------------------------------
 * Time Complexity  | O(V + E) – Two DFS traversals
 * Space Complexity | O(V + E) – Stack and transpose graph
 */

/**
 * Kosaraju's Algorithm for finding SCCs
 * @param {number} V - Number of vertices
 * @param {number[][]} adj - Adjacency list
 * @returns {number} - Number of strongly connected components
 */
function kosaraju(V, adj) {
    // Step 1: Get vertices in order of finish time (topological order)
    const visited = new Array(V).fill(false);
    const stack = [];
    
    for (let i = 0; i < V; i++) {
        if (!visited[i]) {
            dfs1(i, adj, visited, stack);
        }
    }
    
    // Step 2: Create transpose graph
    const transpose = Array.from({ length: V }, () => []);
    for (let u = 0; u < V; u++) {
        for (const v of adj[u]) {
            transpose[v].push(u);
        }
    }
    
    // Step 3: Process vertices in order of decreasing finish time
    visited.fill(false);
    let sccCount = 0;
    
    while (stack.length > 0) {
        const node = stack.pop();
        if (!visited[node]) {
            dfs2(node, transpose, visited);
            sccCount++;
        }
    }
    
    return sccCount;
}

function dfs1(node, adj, visited, stack) {
    visited[node] = true;
    
    for (const neighbor of adj[node]) {
        if (!visited[neighbor]) {
            dfs1(neighbor, adj, visited, stack);
        }
    }
    
    stack.push(node);
}

function dfs2(node, adj, visited) {
    visited[node] = true;
    
    for (const neighbor of adj[node]) {
        if (!visited[neighbor]) {
            dfs2(neighbor, adj, visited);
        }
    }
}

/**
 * Kosaraju's Algorithm with SCC groups
 * @param {number} V - Number of vertices
 * @param {number[][]} adj - Adjacency list
 * @returns {number[][]} - Array of SCCs
 */
function kosarajuWithGroups(V, adj) {
    // Step 1: Fill vertices in stack according to finishing times
    const visited = new Array(V).fill(false);
    const stack = [];
    
    for (let i = 0; i < V; i++) {
        if (!visited[i]) {
            fillOrder(i, adj, visited, stack);
        }
    }
    
    // Step 2: Create transpose graph
    const transpose = Array.from({ length: V }, () => []);
    for (let u = 0; u < V; u++) {
        for (const v of adj[u]) {
            transpose[v].push(u);
        }
    }
    
    // Step 3: Process vertices in order of decreasing finish time
    visited.fill(false);
    const sccs = [];
    
    while (stack.length > 0) {
        const node = stack.pop();
        if (!visited[node]) {
            const component = [];
            collectSCC(node, transpose, visited, component);
            sccs.push(component);
        }
    }
    
    return sccs;
}

function fillOrder(node, adj, visited, stack) {
    visited[node] = true;
    
    for (const neighbor of adj[node]) {
        if (!visited[neighbor]) {
            fillOrder(neighbor, adj, visited, stack);
        }
    }
    
    stack.push(node);
}

function collectSCC(node, adj, visited, component) {
    visited[node] = true;
    component.push(node);
    
    for (const neighbor of adj[node]) {
        if (!visited[neighbor]) {
            collectSCC(neighbor, adj, visited, component);
        }
    }
}

// Test cases
// Graph with 5 vertices and 3 SCCs
// SCC1: {0, 1, 2}, SCC2: {3}, SCC3: {4}
const adj = [
    [1],       // 0 -> 1
    [2],       // 1 -> 2
    [0, 3],    // 2 -> 0, 3
    [4],       // 3 -> 4
    []         // 4
];

console.log("Number of SCCs:", kosaraju(5, adj)); // Expected: 3

const sccs = kosarajuWithGroups(5, adj);
console.log("SCCs:", sccs);

// Another example with cycle
const adj2 = [
    [1],
    [2],
    [3],
    [0]  // Creates one big SCC
];
console.log("Number of SCCs (single cycle):", kosaraju(4, adj2)); // Expected: 1