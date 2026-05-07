/**
 * Flatten Binary Tree to Linked List
 * https://leetcode.com/problems/flatten-binary-tree-to-linked-list/
 *
 * Type             | Details
 * -----------------+----------------------------------------------------
 * Time Complexity  | O(N) – Each node is visited at most twice
 * Space Complexity | O(1) – Morris traversal, no extra space
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
 * Flatten a binary tree to a linked list in-place (preorder)
 * @param {TreeNode} root - Root of the binary tree
 */
function flatten(root) {
    if (root === null) {
        return;
    }
    
    let current = root;
    
    while (current !== null) {
        if (current.left !== null) {
            let left = current.left;
            let rightmost = current.left;
            
            // Find the rightmost node in left subtree
            while (rightmost.right !== null) {
                rightmost = rightmost.right;
            }
            
            // Connect the rightmost node to current's right subtree
            rightmost.right = current.right;
            
            // Move left subtree to right
            current.left = null;
            current.right = left;
        }
        
        current = current.right;
    }
}

// Test cases
const root = createTreeNode(1);
root.left = createTreeNode(2);
root.right = createTreeNode(5);
root.left.left = createTreeNode(3);
root.left.right = createTreeNode(4);
root.right.right = createTreeNode(6);

flatten(root);

// Print flattened list
let curr = root;
const result = [];
while (curr !== null) {
    result.push(curr.val);
    curr = curr.right;
}
console.log(result.join(" ")); // Output: 1 2 3 4 5 6