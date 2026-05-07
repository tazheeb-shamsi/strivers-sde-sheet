// 145. Binary Tree Postorder Traversal
// https://leetcode.com/problems/binary-tree-postorder-traversal/

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
 * Iterative Postorder Traversal using stack (reverse preorder trick)
 * @param {TreeNode} root - Root of the binary tree
 * @returns {number[]} - Postorder traversal (Left -> Right -> Root)
 */
function postorderTraversal(root) {
    const result = [];
    if (root === null) return result;

    const stack = [root];

    while (stack.length > 0) {
        const node = stack.pop();
        result.push(node.val);

        // Push left first so right is processed first
        if (node.left !== null) stack.push(node.left);
        if (node.right !== null) stack.push(node.right);
    }

    // Reverse to get postorder
    return result.reverse();
}

/**
 * Recursive Postorder Traversal
 * @param {TreeNode} root - Root of the binary tree
 * @returns {number[]} - Postorder traversal
 */
function postorderTraversalRecursive(root) {
    const result = [];

    function postorder(node) {
        if (node === null) return;
        postorder(node.left);
        postorder(node.right);
        result.push(node.val);
    }

    postorder(root);
    return result;
}

// Test cases
const root = createTreeNode(1);
root.left = createTreeNode(2);
root.right = createTreeNode(3);
root.left.left = createTreeNode(4);
root.left.right = createTreeNode(5);
root.right.left = createTreeNode(6);
root.right.right = createTreeNode(7);

console.log(postorderTraversal(root)); // [4, 5, 2, 6, 7, 3, 1]
console.log(postorderTraversalRecursive(root)); // [4, 5, 2, 6, 7, 3, 1]