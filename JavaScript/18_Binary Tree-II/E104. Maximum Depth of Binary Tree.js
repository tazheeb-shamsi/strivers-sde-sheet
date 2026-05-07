/**
 * Maximum Depth of Binary Tree
 * https://leetcode.com/problems/maximum-depth-of-binary-tree/
 *
 * Type              |  Details
 * ------------------+----------------------------------------------------
 * Time Complexity   |  O(N) – Each node is visited exactly once
 * Space Complexity  |  O(H) – Recursion stack height (H = height of tree)
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
 * Find the maximum depth of a binary tree
 * @param {TreeNode} root - Root of the binary tree
 * @returns {number} - Maximum depth of the tree
 */
function maxDepth(root) {
    if (root === null) return 0;

    // Recursively find the depths of left and right subtrees
    const leftDepth = maxDepth(root.left);
    const rightDepth = maxDepth(root.right);
    return 1 + Math.max(leftDepth, rightDepth);
}

// Test cases
const root = createTreeNode(3);
root.left = createTreeNode(9);
root.right = createTreeNode(20);
root.right.left = createTreeNode(15);
root.right.right = createTreeNode(7);

const depth = maxDepth(root);
console.log("Maximum Depth:", depth); // Output: Maximum Depth: 3