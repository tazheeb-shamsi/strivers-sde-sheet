/**
 * Diameter of Binary Tree
 * https://leetcode.com/problems/diameter-of-binary-tree/
 *
 * Type              |  Details
 * ------------------+----------------------------------------------------
 * Time Complexity   |  O(N) – Each node is visited exactly once during DFS
 * Space Complexity  |  O(H) – Recursion stack height (H = height of tree)
 *                   |  (O(log N) for balanced tree, O(N) for skewed tree)
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
 * Find the diameter of a binary tree
 * @param {TreeNode} root - Root of the binary tree
 * @returns {number} - Diameter of the tree (longest path between any two nodes)
 */
function diameterOfBinaryTree(root) {
    let diameter = 0;

    function dfs(node) {
        if (node === null) return 0;
        const left = dfs(node.left);
        const right = dfs(node.right);
        diameter = Math.max(diameter, left + right);
        return Math.max(left, right) + 1;
    }

    dfs(root);
    return diameter;
}

// Test cases
const root = createTreeNode(1);
root.left = createTreeNode(2);
root.right = createTreeNode(3);
root.left.left = createTreeNode(4);
root.left.right = createTreeNode(5);

console.log(diameterOfBinaryTree(root)); // Output: 3