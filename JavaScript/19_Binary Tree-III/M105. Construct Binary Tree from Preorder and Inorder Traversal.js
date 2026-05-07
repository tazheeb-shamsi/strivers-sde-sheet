/**
 * 105. Construct Binary Tree from Preorder and Inorder Traversal
 * https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/
 *
 * Given two integer arrays preorder and inorder where preorder is the preorder traversal of a
 * binary tree and inorder is the inorder traversal of the same tree, construct and return the binary tree.
 *
 * Type             | Details
 * -----------------+----------------------------------------------------
 * Time Complexity  | O(N) – Each node is constructed once
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
 * Build a binary tree from preorder and inorder traversal arrays
 * @param {number[]} preorder - Preorder traversal array
 * @param {number[]} inorder - Inorder traversal array
 * @returns {TreeNode} - Root of the constructed binary tree
 */
function buildTree(preorder, inorder) {
    let preIndex = 0;
    let inIndex = 0;

    function construct(limit) {
        if (preIndex === preorder.length) {
            return null;
        }

        if (inorder[inIndex] === limit) {
            inIndex++;
            return null;
        }

        const node = createTreeNode(preorder[preIndex++]);
        node.left = construct(node.val);
        node.right = construct(limit);

        return node;
    }

    return construct(Infinity);
}

// Test cases
const preorder = [3, 9, 20, 15, 7];
const inorder = [9, 3, 15, 20, 7];

const root = buildTree(preorder, inorder);

console.log(root.val);        // Output: 3
console.log(root.left.val);   // Output: 9
console.log(root.right.val);  // Output: 20