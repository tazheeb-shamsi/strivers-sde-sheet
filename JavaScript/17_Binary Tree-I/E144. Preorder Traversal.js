// 144. Binary Tree Preorder Traversal
// https://leetcode.com/problems/binary-tree-preorder-traversal/

/**
 * TreeNode class for binary tree
 */
/**
 * Creates a tree node
 */
function createTreeNode(val = 0, left = null, right = null) {
    return { val, left, right };
}

/**
 * Iterative Preorder Traversal using stack
 * @param {TreeNode} root - Root of the binary tree
 * @returns {number[]} - Preorder traversal (Root -> Left -> Right)
 */
function preorderTraversal(root) {
    const result = [];
    if (root === null) return result;

    const stack = [root];

    while (stack.length > 0) {
        const node = stack.pop();
        result.push(node.val);

        // Push right first so left is processed first
        if (node.right !== null) stack.push(node.right);
        if (node.left !== null) stack.push(node.left);
    }

    return result;
}

/**
 * Recursive Preorder Traversal
 * @param {TreeNode} root - Root of the binary tree
 * @returns {number[]} - Preorder traversal
 */
function preorderTraversalRecursive(root) {
    const result = [];

    function preorder(node) {
        if (node === null) return;
        result.push(node.val);
        preorder(node.left);
        preorder(node.right);
    }

    preorder(root);
    return result;
}

// Test cases
const root = createTreeNode(1);
root.left = createTreeNode(2);
root.right = createTreeNode(3);
root.left.left = createTreeNode(4);
root.left.right = createTreeNode(5);

console.log(preorderTraversal(root)); // [1, 2, 4, 5, 3]
console.log(preorderTraversalRecursive(root)); // [1, 2, 4, 5, 3]