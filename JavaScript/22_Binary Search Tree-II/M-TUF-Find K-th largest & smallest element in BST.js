/**
 * TUF: Find K-th largest and Smallest element in BST
 * https://takeuforward.org/plus/dsa/problems/kth-smallest-and-largest-element-in-bst
 *
 * Type             | Details
 * -----------------+----------------------------------------------------
 * Time Complexity  | O(N) – May need to traverse entire tree in worst case
 * Space Complexity | O(H) – Recursion stack
 */

/**
 * Definition for a binary tree node.
 */
function createTreeNode(val = 0, left = null, right = null) {
    return { val, left, right };
}

/**
 * Find kth smallest using inorder (left -> root -> right)
 */
function findKthSmallest(node, k, counter, result) {
    if (node === null || counter.val >= k) return;
    
    findKthSmallest(node.left, k, counter, result);
    
    counter.val++;
    if (counter.val === k) {
        result.val = node.data;
        return;
    }
    
    findKthSmallest(node.right, k, counter, result);
}

/**
 * Find kth largest using reverse inorder (right -> root -> left)
 */
function findKthLargest(node, k, counter, result) {
    if (node === null || counter.val >= k) return;
    
    findKthLargest(node.right, k, counter, result);
    
    counter.val++;
    if (counter.val === k) {
        result.val = node.data;
        return;
    }
    
    findKthLargest(node.left, k, counter, result);
}

/**
 * Find kth smallest and kth largest in BST
 * @param {TreeNode} root
 * @param {number} k
 * @returns {number[]} - [kth_smallest, kth_largest]
 */
function kLargesSmall(root, k) {
    const counter1 = { val: 0 };
    const kthSmallest = { val: -1 };
    findKthSmallest(root, k, counter1, kthSmallest);
    
    const counter2 = { val: 0 };
    const kthLargest = { val: -1 };
    findKthLargest(root, k, counter2, kthLargest);
    
    return [kthSmallest.val, kthLargest.val];
}

// Test cases
// Test Case 1: [5,3,6,2,4,null,null,1]
const root1 = createTreeNode(5);
root1.left = createTreeNode(3);
root1.right = createTreeNode(6);
root1.left.left = createTreeNode(2);
root1.left.right = createTreeNode(4);
root1.left.left.left = createTreeNode(1);

console.log("Test Case 1 (k=3):");
console.log("Tree (Inorder): [1,2,3,4,5,6]");
console.log("Expected: [3, 5]");
console.log("Output:", kLargesSmall(root1, 3));

// Test Case 2: [3,1,4,null,2]
const root2 = createTreeNode(3);
root2.left = createTreeNode(1);
root2.right = createTreeNode(4);
root2.left.right = createTreeNode(2);

console.log("\nTest Case 2 (k=1):");
console.log("Expected: [1, 4]");
console.log("Output:", kLargesSmall(root2, 1));