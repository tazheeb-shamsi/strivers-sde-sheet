/**
 * 106. Construct Binary Tree from Inorder and Postorder Traversal
 * https://leetcode.com/problems/construct-binary-tree-from-inorder-and-postorder-traversal/
 *
 * Type             | Details
 * -----------------+----------------------------------------------------
 * Time Complexity  | O(N^2) – For each node, findIdx takes O(N) in worst case
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
 * Build a binary tree from inorder and postorder traversal arrays
 * @param {number[]} inorder - Inorder traversal array
 * @param {number[]} postorder - Postorder traversal array
 * @returns {TreeNode} - Root of the constructed binary tree
 */
function buildTree(inorder, postorder) {
    if (inorder.length !== postorder.length) return null;
    if (inorder.length === 0) return null;

    let idx = postorder.length - 1;

    function findIdx(val, end) {
        for (let i = end; i >= 0; i--) {
            if (inorder[i] === val) return i;
        }
        return 0;
    }

    function build(start, end) {
        if (start > end) return null;
        
        const node = createTreeNode(postorder[idx--]);
        if (start === end) return node;

        const index = findIdx(node.val, end);
        node.right = build(index + 1, end);
        node.left = build(start, index - 1);
        
        return node;
    }

    return build(0, idx);
}

// Test cases
const inorder = [9, 3, 15, 20, 7];
const postorder = [9, 15, 7, 20, 3];

const root = buildTree(inorder, postorder);

console.log(root.val);        // Output: 3
console.log(root.left.val);   // Output: 9
console.log(root.right.val);  // Output: 20