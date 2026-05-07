/**
 * TUF: Dijkstra's Algorithm
 * https://takeuforward.org/plus/dsa/problems/dijkstra
 *
 * Single source shortest path for graphs with non-negative weights.
 *
 * Type             | Details
 * -----------------+----------------------------------------------------
 * Time Complexity  | O((V + E) * log V) – Using Min-Heap
 * Space Complexity | O(V + E) – Adjacency list and distance array
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
 * Dijkstra's algorithm using Min-Heap
 * @param {number} V - Number of vertices
 * @param {number[][][]} adj - Adjacency list where adj[u] = [[v, weight], ...]
 * @param {number} src - Source vertex
 * @returns {number[]} - Shortest distances from source
 */
function dijkstra(V, adj, src) {
    const dist = new Array(V).fill(Infinity);
    dist[src] = 0;

    const minHeap = createMinHeap();
    minHeap.push([0, src]); // [distance, node]

    while (!minHeap.isEmpty()) {
        const [d, u] = minHeap.pop();

        // Skip if we've already found a shorter path
        if (d > dist[u]) continue;

        for (const [v, weight] of adj[u]) {
            if (dist[u] + weight < dist[v]) {
                dist[v] = dist[u] + weight;
                minHeap.push([dist[v], v]);
            }
        }
    }

    return dist;
}

/**
 * Dijkstra with path reconstruction
 */
function dijkstraWithPath(V, adj, src, dest) {
    const dist = new Array(V).fill(Infinity);
    const parent = new Array(V).fill(-1);
    dist[src] = 0;

    const minHeap = createMinHeap();
    minHeap.push([0, src]);

    while (!minHeap.isEmpty()) {
        const [d, u] = minHeap.pop();

        if (d > dist[u]) continue;

        for (const [v, weight] of adj[u]) {
            if (dist[u] + weight < dist[v]) {
                dist[v] = dist[u] + weight;
                parent[v] = u;
                minHeap.push([dist[v], v]);
            }
        }
    }

    // Reconstruct path
    const path = [];
    let curr = dest;
    while (curr !== -1) {
        path.unshift(curr);
        curr = parent[curr];
    }

    return { distance: dist[dest], path };
}

// Test cases
// Graph with 5 vertices
// adj[u] = [[v, weight], ...]
const adj = [
    [[1, 2], [4, 1]],       // 0 -> 1(2), 4(1)
    [[2, 3]],               // 1 -> 2(3)
    [[3, 6]],               // 2 -> 3(6)
    [],                      // 3
    [[1, 2], [2, 4], [3, 2]] // 4 -> 1(2), 2(4), 3(2)
];

console.log("Dijkstra from 0:", dijkstra(5, adj, 0));
// Expected: [0, 2, 5, 3, 1]

const result = dijkstraWithPath(5, adj, 0, 3);
console.log("Distance to 3:", result.distance);
console.log("Path to 3:", result.path);
