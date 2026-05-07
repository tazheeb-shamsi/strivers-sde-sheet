/**
 * Lowest Common Ancestor(LCA) of a Binary Tree
 * https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/
 *
 * Type             | Details
 * -----------------+----------------------------------------------------
 * Time Complexity  | O(N) – Each node is visited exactly once
 * Space Complexity | O(H) – Recursion stack height (H = height of tree)
 *                  | Balanced tree: O(log N) where H = log N
 *                  | Skewed tree (like a linked list): O(N) where H = N
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
 * Find the lowest common ancestor of two nodes in a binary tree
 * @param {TreeNode} root - Root of the binary tree
 * @param {TreeNode} p - First target node
 * @param {TreeNode} q - Second target node
 * @returns {TreeNode} - Lowest common ancestor of p and q
 */
function lowestCommonAncestor(root, p, q) {
    if (root === null || root === p || root === q) return root;
    
    const left = lowestCommonAncestor(root.left, p, q);
    const right = lowestCommonAncestor(root.right, p, q);
    
    return left === null ? right : right === null ? left : root;
}

// Test cases
const root = createTreeNode(3);
root.left = createTreeNode(5);
root.right = createTreeNode(1);
root.left.left = createTreeNode(6);
root.left.right = createTreeNode(2);
root.right.left = createTreeNode(0);
root.right.right = createTreeNode(8);
root.left.right.left = createTreeNode(7);
root.left.right.right = createTreeNode(4);

const p = root.left;       // Node with value 5
const q = root.right;      // Node with value 1

const lca = lowestCommonAncestor(root, p, q);
console.log("Lowest Common Ancestor:", lca.val); // Output: 3