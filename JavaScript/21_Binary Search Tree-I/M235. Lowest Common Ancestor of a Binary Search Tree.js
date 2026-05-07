/**
 * 235. Lowest Common Ancestor of a Binary Search Tree
 * LCA of a Binary Search Tree
 * https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/
 *
 * Type             | Details
 * -----------------+----------------------------------------------------
 * Time Complexity  | O(H) – H is height of tree
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
 * Find lowest common ancestor of two nodes in BST
 * @param {TreeNode} root - Root of the BST
 * @param {TreeNode} p - First node
 * @param {TreeNode} q - Second node
 * @returns {TreeNode} - LCA of p and q
 */
function lowestCommonAncestor(root, p, q) {
    if (root === null || root === p || root === q) return root;
    
    const left = lowestCommonAncestor(root.left, p, q);
    const right = lowestCommonAncestor(root.right, p, q);
    
    if (left !== null && right !== null) return root;
    
    return left !== null ? left : right;
}

// Test cases
const root = createTreeNode(6);
root.left = createTreeNode(2);
root.right = createTreeNode(8);
root.left.left = createTreeNode(0);
root.left.right = createTreeNode(4);
root.right.left = createTreeNode(7);
root.right.right = createTreeNode(9);
root.left.right.left = createTreeNode(3);
root.left.right.right = createTreeNode(5);

const p = root.left;       // Node 2
const q = root.right;      // Node 8

const lca = lowestCommonAncestor(root, p, q);
console.log("Lowest Common Ancestor of", p.val, "and", q.val + ":", lca.val);
// Output: 6