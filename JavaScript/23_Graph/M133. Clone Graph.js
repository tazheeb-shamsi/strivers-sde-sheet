/**
 * 133. Clone Graph
 * https://leetcode.com/problems/clone-graph/
 *
 * Type             | Details
 * -----------------+----------------------------------------------------
 * Time Complexity  | O(V + E) – Visit each vertex and edge once
 * Space Complexity | O(V) – HashMap for visited nodes
 */

/**
 * Definition for a Node.
 */
function createNode(val = 0, neighbors = []) {
    return { val, neighbors: [...neighbors] };
}

/**
 * Clone a connected undirected graph using DFS
 * @param {Node} node
 * @returns {Node}
 */
function cloneGraph(node) {
    if (node === null) return null;
    
    const visited = new Map(); // Maps original node to cloned node
    return cloneDFS(node, visited);
}

function cloneDFS(node, visited) {
    // If already cloned, return the clone
    if (visited.has(node)) {
        return visited.get(node);
    }
    
    // Create a clone
    const clone = createNode(node.val);
    visited.set(node, clone);
    
    // Clone all neighbors
    for (const neighbor of node.neighbors) {
        clone.neighbors.push(cloneDFS(neighbor, visited));
    }
    
    return clone;
}

/**
 * Clone graph using BFS
 * @param {Node} node
 * @returns {Node}
 */
function cloneGraphBFS(node) {
    if (node === null) return null;
    
    const visited = new Map();
    const queue = [node];
    
    // Create clone for first node
    visited.set(node, createNode(node.val));
    
    while (queue.length > 0) {
        const curr = queue.shift();
        
        for (const neighbor of curr.neighbors) {
            // If not cloned yet, create clone and add to queue
            if (!visited.has(neighbor)) {
                visited.set(neighbor, createNode(neighbor.val));
                queue.push(neighbor);
            }
            
            // Add cloned neighbor to current clone's neighbors
            visited.get(curr).neighbors.push(visited.get(neighbor));
        }
    }
    
    return visited.get(node);
}

// Test cases
// Create graph: [[2,4],[1,3],[2,4],[1,3]]
// 1 -- 2
// |    |
// 4 -- 3
const node1 = createNode(1);
const node2 = createNode(2);
const node3 = createNode(3);
const node4 = createNode(4);

node1.neighbors = [node2, node4];
node2.neighbors = [node1, node3];
node3.neighbors = [node2, node4];
node4.neighbors = [node1, node3];

const cloned = cloneGraph(node1);

console.log("Original node 1:", node1.val);
console.log("Cloned node 1:", cloned.val);
console.log("Same reference?", node1 === cloned); // false
console.log("Same values?", node1.val === cloned.val); // true
console.log("Cloned neighbors:", cloned.neighbors.map(n => n.val)); // [2, 4]