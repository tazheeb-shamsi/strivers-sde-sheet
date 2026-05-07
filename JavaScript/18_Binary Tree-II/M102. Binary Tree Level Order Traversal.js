/**
 * Binary Tree Level Order Traversal
 * Level order Traversal / Level order traversal in spiral form
 * https://leetcode.com/problems/binary-tree-level-order-traversal/
 *
 * Type             | Details
 * -----------------+----------------------------------------------------
 * Time Complexity  | O(N) – Each node is visited exactly once
 * Space Complexity | O(N) – Queue stores at most N/2 nodes (last level)
 */

/**
 * Definition for a binary tree node.
 */
/**
 * Creates a tree node
 */
function createTreeNode(val = 0, left = null, right = null) {
    return { val, left, right };
}

/**
 * Perform level order traversal of a binary tree
 * @param {TreeNode} root - Root of the binary tree
 * @returns {number[][]} - Array of arrays, each containing values at that level
 */
function levelOrder(root) {
    const result = [];
    if (root === null) return result;

    const queue = [root];

    while (queue.length > 0) {
        const levelSize = queue.length;
        const level = [];

        for (let i = 0; i < levelSize; i++) {
            const node = queue.shift();
            level.push(node.val);

            if (node.left !== null) queue.push(node.left);
            if (node.right !== null) queue.push(node.right);
        }

        result.push(level);
    }

    return result;
}

// Test cases
const root = createTreeNode(3);
root.left = createTreeNode(9);
root.right = createTreeNode(20);
root.right.left = createTreeNode(15);
root.right.right = createTreeNode(7);

const result = levelOrder(root);
console.log(result); // Output: [[3], [9, 20], [15, 7]]