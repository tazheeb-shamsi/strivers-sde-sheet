/**
 * Same Tree -> Check if two trees are identical or not
 * https://leetcode.com/problems/same-tree/
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
 * Check if two binary trees are identical
 * @param {TreeNode} p - Root of first tree
 * @param {TreeNode} q - Root of second tree
 * @returns {boolean} - True if trees are identical, false otherwise
 */
function isSameTree(p, q) {
    if (p === null && q === null) return true;
    if (p === null || q === null) return false;
    if (p.val !== q.val) return false;
    return isSameTree(p.left, q.left) && isSameTree(p.right, q.right);
}

// Test cases
// Test case 1: Identical trees
const root1 = createTreeNode(1);
root1.left = createTreeNode(2);
root1.right = createTreeNode(3);

const root2 = createTreeNode(1);
root2.left = createTreeNode(2);
root2.right = createTreeNode(3);

console.log(isSameTree(root1, root2)); // Output: true

// Test case 2: Different trees
const root3 = createTreeNode(1);
root3.left = createTreeNode(2);
root3.right = createTreeNode(4);

const root4 = createTreeNode(1);
root4.left = createTreeNode(2);
root4.right = createTreeNode(3);

console.log(isSameTree(root3, root4)); // Output: false