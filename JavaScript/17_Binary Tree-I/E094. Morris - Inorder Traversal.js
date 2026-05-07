// 94. Binary Tree Inorder Traversal - Morris Inorder Traversal
// https://leetcode.com/problems/binary-tree-inorder-traversal/

// Morris Inorder Traversal achieves O(1) space complexity

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
 * Morris Inorder Traversal - O(n) time, O(1) space
 * @param {TreeNode} root - Root of the binary tree
 * @returns {number[]} - Inorder traversal
 */
function inorderTraversal(root) {
    const result = [];
    let curr = root;

    while (curr !== null) {
        if (curr.left === null) {
            // No left child → visit node and go right
            result.push(curr.val);
            curr = curr.right;
        } else {
            // Find inorder predecessor (rightmost node in left subtree)
            let predecessor = curr.left;
            while (predecessor.right !== null && predecessor.right !== curr) {
                predecessor = predecessor.right;
            }

            if (predecessor.right === null) {
                // Make current node the right child of its predecessor
                predecessor.right = curr;
                curr = curr.left;
            } else {
                // Left subtree already visited — revert changes
                predecessor.right = null;
                result.push(curr.val);
                curr = curr.right;
            }
        }
    }

    return result;
}

// Test cases
const root = createTreeNode(1);
root.right = createTreeNode(2);
root.right.left = createTreeNode(3);

console.log(inorderTraversal(root)); // [1, 3, 2]

const root2 = createTreeNode(1);
root2.left = createTreeNode(2);
root2.right = createTreeNode(3);
root2.left.left = createTreeNode(4);
root2.left.right = createTreeNode(5);

console.log(inorderTraversal(root2)); // [4, 2, 5, 1, 3]