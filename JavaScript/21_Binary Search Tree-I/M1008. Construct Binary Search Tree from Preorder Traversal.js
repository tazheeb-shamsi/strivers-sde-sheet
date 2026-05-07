/**
 * 1008. Construct Binary Search Tree from Preorder Traversal
 * https://leetcode.com/problems/construct-binary-search-tree-from-preorder-traversal/
 *
 * Type             | Details
 * -----------------+----------------------------------------------------
 * Time Complexity  | O(N) – Each element is visited once
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
 * Construct BST from preorder traversal
 * @param {number[]} preorder - Preorder traversal array
 * @returns {TreeNode} - Root of the constructed BST
 */
function bstFromPreorder(preorder) {
    const index = { val: 0 };
    return construct(preorder, index, Infinity);
}

function construct(preorder, index, bound) {
    if (index.val === preorder.length || preorder[index.val] > bound) {
        return null;
    }
    const root = createTreeNode(preorder[index.val++]);
    root.left = construct(preorder, index, root.val);
    root.right = construct(preorder, index, bound);
    return root;
}

/**
 * Convert tree to level order array
 * @param {TreeNode} root
 * @returns {(number|null)[]}
 */
function toLevelOrder(root) {
    const result = [];
    const queue = [root];
    while (queue.length > 0) {
        const node = queue.shift();
        if (node === null) {
            result.push(null);
            continue;
        }
        result.push(node.val);
        if (node.left !== null || node.right !== null) {
            queue.push(node.left);
            queue.push(node.right);
        }
    }
    return result;
}

// Test cases
const root = bstFromPreorder([8, 5, 1, 7, 10, 12]);
console.log(toLevelOrder(root)); // Output: [8, 5, 10, 1, 7, null, 12]

const root2 = bstFromPreorder([1, 3]);
console.log(toLevelOrder(root2)); // Output: [1, null, 3]