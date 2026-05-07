/**
 * 103. Binary Tree Zigzag Level Order Traversal
 * https://leetcode.com/problems/binary-tree-zigzag-level-order-traversal/
 *
 * Type             | Details
 * -----------------+----------------------------------------------------
 * Time Complexity  | O(N) – Each node is visited exactly once
 * Space Complexity | O(N) – Queue stores at most N/2 nodes (last level) + O(N) result list
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
 * Perform zigzag level order traversal of a binary tree
 * @param {TreeNode} root - Root of the binary tree
 * @returns {number[][]} - Array of arrays with zigzag level order values
 */
function zigzagLevelOrder(root) {
    const result = [];
    if (root === null) return result;

    const queue = [root];
    let leftToRight = true;

    while (queue.length > 0) {
        const levelSize = queue.length;
        const level = [];

        for (let i = 0; i < levelSize; i++) {
            const node = queue.shift();
            if (leftToRight) {
                level.push(node.val);
            } else {
                level.unshift(node.val);
            }

            if (node.left !== null) queue.push(node.left);
            if (node.right !== null) queue.push(node.right);
        }

        result.push(level);
        leftToRight = !leftToRight;
    }

    return result;
}

// Test cases
const root = createTreeNode(3);
root.left = createTreeNode(9);
root.right = createTreeNode(20);
root.right.left = createTreeNode(15);
root.right.right = createTreeNode(7);

const zigzagOrder = zigzagLevelOrder(root);
console.log(zigzagOrder); // Output: [[3], [20, 9], [15, 7]]