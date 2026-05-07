// TUF: Binary Tree - Morris Preorder Traversal
// https://leetcode.com/problems/binary-tree-preorder-traversal/

// Morris preorder Traversal achieves O(1) space complexity
// without recursion or an external data structure.

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
 * Morris Preorder Traversal - O(n) time, O(1) space
 * @param {TreeNode} root - Root of the binary tree
 * @returns {number[]} - Preorder traversal
 */
function preorderTraversal(root) {
    const result = [];
    let curr = root;

    while (curr !== null) {
        if (curr.left === null) {
            // Visit node, then move right
            result.push(curr.val);
            curr = curr.right;
        } else {
            // Find inorder predecessor
            let predecessor = curr.left;
            while (predecessor.right !== null && predecessor.right !== curr) {
                predecessor = predecessor.right;
            }

            if (predecessor.right === null) {
                // Visit node before creating the thread (Preorder)
                result.push(curr.val);
                predecessor.right = curr;
                curr = curr.left;
            } else {
                // Revert the thread
                predecessor.right = null;
                curr = curr.right;
            }
        }
    }

    return result;
}

// Test cases
const root = createTreeNode(1);
root.left = createTreeNode(4);
root.left.left = createTreeNode(4);
root.left.right = createTreeNode(2);

console.log(preorderTraversal(root)); // [1, 4, 4, 2]

const root2 = createTreeNode(1);
root2.left = createTreeNode(2);
root2.right = createTreeNode(3);
root2.left.left = createTreeNode(4);
root2.left.right = createTreeNode(5);

console.log(preorderTraversal(root2)); // [1, 2, 4, 5, 3]