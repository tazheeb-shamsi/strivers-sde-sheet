// 94. Binary Tree Inorder Traversal
// https://leetcode.com/problems/binary-tree-inorder-traversal/

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
 * Iterative Inorder Traversal using stack
 * @param {TreeNode} root - Root of the binary tree
 * @returns {number[]} - Inorder traversal (Left -> Root -> Right)
 */
function inorderTraversal(root) {
    const result = [];
    const stack = [];
    let curr = root;

    while (curr !== null || stack.length > 0) {
        // Go to leftmost node
        while (curr !== null) {
            stack.push(curr);
            curr = curr.left;
        }

        // Process node
        curr = stack.pop();
        result.push(curr.val);

        // Move to right subtree
        curr = curr.right;
    }

    return result;
}

/**
 * Recursive Inorder Traversal
 * @param {TreeNode} root - Root of the binary tree
 * @returns {number[]} - Inorder traversal
 */
function inorderTraversalRecursive(root) {
    const result = [];

    function inorder(node) {
        if (node === null) return;
        inorder(node.left);
        result.push(node.val);
        inorder(node.right);
    }

    inorder(root);
    return result;
}

// Test cases
const root = createTreeNode(1);
root.right = createTreeNode(2);
root.right.left = createTreeNode(3);

console.log(inorderTraversal(root)); // [1, 3, 2]
console.log(inorderTraversalRecursive(root)); // [1, 3, 2]