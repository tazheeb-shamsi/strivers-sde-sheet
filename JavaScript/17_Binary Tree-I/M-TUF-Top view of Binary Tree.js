// TUF: Top View of Binary Tree
// https://takeuforward.org/plus/dsa/problems/top-view-of-bt

/**
 * Creates a tree node
 */
function createTreeNode(val = 0, left = null, right = null) {
    return { val, left, right };
}

/**
 * Get top view of binary tree
 * @param {TreeNode} root - Root of the binary tree
 * @returns {number[]} - Top view from left to right
 */
function topView(root) {
    if (root === null) return [];

    const map = new Map(); // horizontal distance -> node value
    const queue = [[root, 0]]; // [node, hd]

    while (queue.length > 0) {
        const [node, hd] = queue.shift();

        // If this horizontal distance is seen first time, add it
        if (!map.has(hd)) {
            map.set(hd, node.val);
        }

        if (node.left !== null) {
            queue.push([node.left, hd - 1]);
        }
        if (node.right !== null) {
            queue.push([node.right, hd + 1]);
        }
    }

    // Sort by horizontal distance and get values
    const sortedHDs = [...map.keys()].sort((a, b) => a - b);
    return sortedHDs.map(hd => map.get(hd));
}

// Test cases
const root = createTreeNode(1);
root.left = createTreeNode(2);
root.right = createTreeNode(3);
root.left.right = createTreeNode(5);
root.right.right = createTreeNode(4);

console.log("Top View:", topView(root)); // [2, 1, 3, 4]

const root2 = createTreeNode(1);
root2.left = createTreeNode(2);
root2.right = createTreeNode(3);
root2.left.left = createTreeNode(4);
root2.left.right = createTreeNode(5);
root2.right.left = createTreeNode(6);
root2.right.right = createTreeNode(7);

console.log("Top View 2:", topView(root2)); // [4, 2, 1, 3, 7]
