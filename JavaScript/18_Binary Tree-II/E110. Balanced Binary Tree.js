/**
 * Balanced Binary Tree -> Check if a binary tree is height-balanced
 * https://leetcode.com/problems/balanced-binary-tree/
 *
 * Type             | Details
 * -----------------+----------------------------------------------------
 * Time Complexity  | O(N^2) – For each node O(N), height calculation O(N) in worst case (skewed tree)
 * Space Complexity | O(H) – Recursion stack height (H = height of tree)
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
 * Get the height of a tree node
 * @param {TreeNode} node - Tree node
 * @returns {number} - Height of the node
 */
function getHeight(node) {
    if (node === null) return 0;

    const leftHeight = getHeight(node.left);
    const rightHeight = getHeight(node.right);

    return Math.max(leftHeight, rightHeight) + 1;
}

/**
 * Check if a binary tree is height-balanced
 * @param {TreeNode} root - Root of the binary tree
 * @returns {boolean} - True if the tree is balanced, false otherwise
 */
function isBalanced(root) {
    if (root === null) return true;

    const leftHeight = getHeight(root.left);
    const rightHeight = getHeight(root.right);

    return (
        Math.abs(leftHeight - rightHeight) <= 1 &&
        isBalanced(root.left) &&
        isBalanced(root.right)
    );
}

// Test cases
const root = createTreeNode(1);
root.left = createTreeNode(2);
root.right = createTreeNode(3);
root.left.left = createTreeNode(4);
root.left.right = createTreeNode(5);
root.right.left = createTreeNode(6);
root.right.right = createTreeNode(7);

console.log(isBalanced(root)); // Output: true