/**
 * 98. Validate Binary Search Tree
 * Check if a BT is BST or not
 * https://leetcode.com/problems/validate-binary-search-tree/
 *
 * Type             | Details
 * -----------------+----------------------------------------------------
 * Time Complexity  | O(N) – Visit each node once
 * Space Complexity | O(H) – Recursion stack
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
 * Check if binary tree is a valid BST
 * @param {TreeNode} root - Root of the tree
 * @returns {boolean} - True if valid BST
 */
function isValidBST(root) {
    return validate(root, -Infinity, Infinity);
}

function validate(node, minVal, maxVal) {
    if (node === null) return true;
    if (node.val <= minVal || node.val >= maxVal) return false;
    return validate(node.left, minVal, node.val) && 
           validate(node.right, node.val, maxVal);
}

// Test cases
const root = createTreeNode(2);
root.left = createTreeNode(1);
root.right = createTreeNode(3);
console.log(isValidBST(root)); // Output: true

const root2 = createTreeNode(5);
root2.left = createTreeNode(1);
root2.right = createTreeNode(4);
root2.right.left = createTreeNode(3);
root2.right.right = createTreeNode(6);
console.log(isValidBST(root2)); // Output: false