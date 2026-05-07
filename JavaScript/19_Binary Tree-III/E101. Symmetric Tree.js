/**
 * 101. Symmetric Tree
 * https://leetcode.com/problems/symmetric-tree/
 *
 * Type             | Details
 * -----------------+----------------------------------------------------
 * Time Complexity  | O(N) – Each node is visited exactly once
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
 * Check if two subtrees are mirror images of each other
 * @param {TreeNode} left - Left subtree
 * @param {TreeNode} right - Right subtree
 * @returns {boolean} - True if mirror images, false otherwise
 */
function isMirror(left, right) {
    if (left === null && right === null) return true;
    if (left === null || right === null) return false;
    return left.val === right.val && 
           isMirror(left.left, right.right) && 
           isMirror(left.right, right.left);
}

/**
 * Check if a binary tree is symmetric (mirror of itself)
 * @param {TreeNode} root - Root of the binary tree
 * @returns {boolean} - True if the tree is symmetric, false otherwise
 */
function isSymmetric(root) {
    if (root === null) return true;
    return isMirror(root.left, root.right);
}

// Test cases
const root = createTreeNode(1);
root.left = createTreeNode(2);
root.right = createTreeNode(2);
root.left.left = createTreeNode(3);
root.left.right = createTreeNode(4);
root.right.left = createTreeNode(4);
root.right.right = createTreeNode(3);

console.log(isSymmetric(root)); // Output: true