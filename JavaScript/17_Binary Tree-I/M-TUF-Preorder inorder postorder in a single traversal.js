// Pre, Post, Inorder in one traversal
// https://takeuforward.org/plus/dsa/problems/pre,-post,-inorder-in-one-traversal

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
 * Get all three traversals (Inorder, Preorder, Postorder) using recursive approach
 * @param {TreeNode} root - Root of the binary tree
 * @returns {number[][]} - [inorder, preorder, postorder]
 */
function getTreeTraversals(root) {
    const inorder = [];
    const preorder = [];
    const postorder = [];

    function inorderTraversal(node) {
        if (node === null) return;
        inorderTraversal(node.left);
        inorder.push(node.val);
        inorderTraversal(node.right);
    }

    function preorderTraversal(node) {
        if (node === null) return;
        preorder.push(node.val);
        preorderTraversal(node.left);
        preorderTraversal(node.right);
    }

    function postorderTraversal(node) {
        if (node === null) return;
        postorderTraversal(node.left);
        postorderTraversal(node.right);
        postorder.push(node.val);
    }

    inorderTraversal(root);
    preorderTraversal(root);
    postorderTraversal(root);

    return [inorder, preorder, postorder];
}

/**
 * Get all three traversals in a single pass using state tracking
 * @param {TreeNode} root - Root of the binary tree
 * @returns {number[][]} - [inorder, preorder, postorder]
 */
function getTreeTraversalsSinglePass(root) {
    const inorder = [];
    const preorder = [];
    const postorder = [];

    if (root === null) return [inorder, preorder, postorder];

    // Stack of [node, state]: state 1=preorder, 2=inorder, 3=postorder
    const stack = [[root, 1]];

    while (stack.length > 0) {
        const [node, state] = stack.pop();

        if (state === 1) {
            // Preorder: process now, then push for inorder
            preorder.push(node.val);
            stack.push([node, 2]);
            if (node.left !== null) stack.push([node.left, 1]);
        } else if (state === 2) {
            // Inorder: process now, then push for postorder
            inorder.push(node.val);
            stack.push([node, 3]);
            if (node.right !== null) stack.push([node.right, 1]);
        } else {
            // Postorder: process now
            postorder.push(node.val);
        }
    }

    return [inorder, preorder, postorder];
}

// Test cases
//        1
//       / \
//      3   4
//     / \ / \
//    5  2 7  6
const root = createTreeNode(1);
root.left = createTreeNode(3);
root.right = createTreeNode(4);
root.left.left = createTreeNode(5);
root.left.right = createTreeNode(2);
root.right.left = createTreeNode(7);
root.right.right = createTreeNode(6);

const [inorder, preorder, postorder] = getTreeTraversals(root);
console.log("Inorder:  ", inorder);   // [5, 3, 2, 1, 7, 4, 6]
console.log("Preorder: ", preorder);  // [1, 3, 5, 2, 4, 7, 6]
console.log("Postorder:", postorder); // [5, 2, 3, 7, 6, 4, 1]