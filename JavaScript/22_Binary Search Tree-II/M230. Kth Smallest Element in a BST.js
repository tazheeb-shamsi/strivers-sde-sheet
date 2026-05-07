/**
 * 230. Kth Smallest Element in a BST
 * https://leetcode.com/problems/kth-smallest-element-in-a-bst/
 *
 * Type             | Details
 * -----------------+----------------------------------------------------
 * Time Complexity  | O(H + k) – H is height of tree
 * Space Complexity | O(H) – Recursion stack or explicit stack
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
 * Find kth smallest element in BST (Recursive)
 * @param {TreeNode} root
 * @param {number} k
 * @returns {number}
 */
function kthSmallest(root, k) {
    const state = { count: 0, result: 0 };
    inorder(root, k, state);
    return state.result;
}

function inorder(node, k, state) {
    if (node === null) return;
    
    inorder(node.left, k, state);
    
    state.count++;
    if (state.count === k) {
        state.result = node.val;
        return;
    }
    
    inorder(node.right, k, state);
}

/**
 * Find kth smallest element in BST (Iterative using Stack)
 * @param {TreeNode} root
 * @param {number} k
 * @returns {number}
 */
function kthSmallestIterative(root, k) {
    const stack = [];
    let curr = root;
    let count = 0;
    
    while (curr !== null || stack.length > 0) {
        // Go to leftmost node
        while (curr !== null) {
            stack.push(curr);
            curr = curr.left;
        }
        
        // Process current node
        curr = stack.pop();
        count++;
        
        if (count === k) {
            return curr.val;
        }
        
        curr = curr.right;
    }
    
    return -1;
}

// Test cases
// Test Case 1: [3,1,4,null,2], k = 1
const root1 = createTreeNode(3);
root1.left = createTreeNode(1);
root1.right = createTreeNode(4);
root1.left.right = createTreeNode(2);

console.log("Test Case 1 (k=1):", kthSmallest(root1, 1)); // Expected: 1
console.log("Iterative:", kthSmallestIterative(root1, 1));

// Test Case 2: [5,3,6,2,4,null,null,1], k = 3
const root2 = createTreeNode(5);
root2.left = createTreeNode(3);
root2.right = createTreeNode(6);
root2.left.left = createTreeNode(2);
root2.left.right = createTreeNode(4);
root2.left.left.left = createTreeNode(1);

console.log("Test Case 2 (k=3):", kthSmallest(root2, 3)); // Expected: 3
console.log("Iterative:", kthSmallestIterative(root2, 3));