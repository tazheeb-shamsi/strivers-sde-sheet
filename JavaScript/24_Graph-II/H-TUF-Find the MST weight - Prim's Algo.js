/**
 * TUF: Minimum Spanning Tree - Prim's Algorithm
 * https://takeuforward.org/plus/dsa/problems/minimum-spanning-tree
 *
 * Greedy algorithm using Min-Heap (Priority Queue).
 *
 * Type             | Details
 * -----------------+----------------------------------------------------
 * Time Complexity  | O((V + E) * log V) – Using Min-Heap
 * Space Complexity | O(V + E) – Adjacency list and visited array
 */

/**
 * Creates a Min-Heap (functional approach)
 * @returns {Object} MinHeap operations
 */
function createMinHeap() {
    const heap = [];
    
    function push(val) {
        heap.push(val);
        bubbleUp(heap.length - 1);
    }
    
    function pop() {
        if (heap.length === 0) return null;
        const min = heap[0];
        const last = heap.pop();
        if (heap.length > 0) {
            heap[0] = last;
            bubbleDown(0);
        }
        return min;
    }
    
    function isEmpty() {
        return heap.length === 0;
    }
    
    function bubbleUp(idx) {
        while (idx > 0) {
            const parent = Math.floor((idx - 1) / 2);
            if (heap[parent][0] <= heap[idx][0]) break;
            [heap[parent], heap[idx]] = [heap[idx], heap[parent]];
            idx = parent;
        }
    }
    
    function bubbleDown(idx) {
        const n = heap.length;
        while (true) {
            let smallest = idx;
            const left = 2 * idx + 1;
            const right = 2 * idx + 2;
            
            if (left < n && heap[left][0] < heap[smallest][0]) {
                smallest = left;
            }
            if (right < n && heap[right][0] < heap[smallest][0]) {
                smallest = right;
            }
            if (smallest === idx) break;
            
            [heap[smallest], heap[idx]] = [heap[idx], heap[smallest]];
            idx = smallest;
        }
    }
    
    return { push, pop, isEmpty };
}

/**
 * Prim's Algorithm for Minimum Spanning Tree
 * @param {number} V - Number of vertices
 * @param {number[][][]} adj - Adjacency list where adj[u] = [[v, weight], ...]
 * @returns {number} - MST weight
 */
function primMST(V, adj) {
    const visited = new Array(V).fill(false);
    const minHeap = createMinHeap();
    
    minHeap.push([0, 0]); // [weight, node]
    let mstWeight = 0;
    
    while (!minHeap.isEmpty()) {
        const [wt, u] = minHeap.pop();
        
        if (visited[u]) continue;
        
        visited[u] = true;
        mstWeight += wt;
        
        for (const [v, edgeWt] of adj[u]) {
            if (!visited[v]) {
                minHeap.push([edgeWt, v]);
            }
        }
    }
    
    return mstWeight;
}

/**
 * Prim's Algorithm with MST edges
 */
function primMSTWithEdges(V, adj) {
    const visited = new Array(V).fill(false);
    const minHeap = createMinHeap();
    
    minHeap.push([0, 0, -1]); // [weight, node, parent]
    let mstWeight = 0;
    const mstEdges = [];
    
    while (!minHeap.isEmpty()) {
        const [wt, u, parent] = minHeap.pop();
        
        if (visited[u]) continue;
        
        visited[u] = true;
        mstWeight += wt;
        
        if (parent !== -1) {
            mstEdges.push([parent, u, wt]);
        }
        
        for (const [v, edgeWt] of adj[u]) {
            if (!visited[v]) {
                minHeap.push([edgeWt, v, u]);
            }
        }
    }
    
    return { weight: mstWeight, edges: mstEdges };
}

// Test cases
// Graph with 5 vertices
// adj[u] = [[v, weight], ...]
const adj = [
    [[1, 2], [3, 6]],
    [[0, 2], [2, 3], [3, 8], [4, 5]],
    [[1, 3], [4, 7]],
    [[0, 6], [1, 8], [4, 9]],
    [[1, 5], [2, 7], [3, 9]]
];

console.log("MST Weight (Prim's):", primMST(5, adj));

const result = primMSTWithEdges(5, adj);
console.log("MST Weight:", result.weight);
console.log("MST Edges:", result.edges);
