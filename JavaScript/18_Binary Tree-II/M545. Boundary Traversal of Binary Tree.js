/**
 * 545. Boundary Traversal of Binary Tree
 * https://leetcode.com/problems/boundary-of-binary-tree/
 *
 * Type             | Details
 * -----------------+----------------------------------------------------
 * Time Complexity  | O(N) – Left boundary O(H) + Leaves O(N) + Right boundary O(H) = O(N)
 * Space Complexity | O(N) – O(H) recursion stack for leaves + O(H) stack for right boundary + O(N) result list
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
 * Check if a node is a leaf node
 * @param {TreeNode} node - Tree node to check
 * @returns {boolean} - True if node is a leaf, false otherwise
 */
function isLeaf(node) {
    return node !== null && node.left === null && node.right === null;
}

/**
 * Add all leaf nodes to the result array
 * @param {TreeNode} node - Current node
 * @param {number[]} result - Result array to add leaves to
 */
function addLeaves(node, result) {
    if (node === null) return;
    if (isLeaf(node)) {
        result.push(node.val);
        return;
    }
    addLeaves(node.left, result);
    addLeaves(node.right, result);
}

/**
 * Perform boundary traversal of a binary tree
 * @param {TreeNode} root - Root of the binary tree
 * @returns {number[]} - Boundary nodes in anti-clockwise order
 */
function boundaryOfBinaryTree(root) {
    const result = [];
    if (root === null) return result;

    result.push(root.val);

    // Add left boundary (excluding leaves)
    let curr = root.left;
    while (curr !== null) {
        if (!isLeaf(curr)) result.push(curr.val);
        if (curr.left !== null) {
            curr = curr.left;
        } else {
            curr = curr.right;
        }
    }

    // Add leaves
    addLeaves(root, result);

    // Add right boundary in reverse order (excluding leaves)
    const stack = [];
    curr = root.right;
    while (curr !== null) {
        if (!isLeaf(curr)) stack.push(curr.val);
        if (curr.right !== null) {
            curr = curr.right;
        } else {
            curr = curr.left;
        }
    }
    while (stack.length > 0) {
        result.push(stack.pop());
    }

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

const boundary = boundaryOfBinaryTree(root);
console.log("boundary:", boundary); // Output: [1, 2, 4, 5, 6, 7, 3]