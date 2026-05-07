/**
 * 1373. Maximum Sum BST in Binary Tree
 * https://leetcode.com/problems/maximum-sum-bst-in-binary-tree/
 *
 * Type             | Details
 * -----------------+----------------------------------------------------
 * Time Complexity  | O(N) – Visit each node once
 * Space Complexity | O(H) – Recursion stack
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
 * Find maximum sum BST in binary tree
 * @param {TreeNode} root
 * @returns {number}
 */
function maxSumBST(root) {
    let max = 0;

    function helper(node) {
        if (node === null) return 0;

        const left = helper(node.left);
        const right = helper(node.right);

        if (left === -Infinity || right === -Infinity) {
            return -Infinity;
        }

        if (node.left !== null) {
            let curr = node.left;
            while (curr.right !== null) {
                curr = curr.right;
            }
            if (curr.val >= node.val) {
                return -Infinity;
            }
        }

        if (node.right !== null) {
            let curr = node.right;
            while (curr.left !== null) {
                curr = curr.left;
            }
            if (curr.val <= node.val) {
                return -Infinity;
            }
        }

        const sum = node.val + left + right;
        if (max < sum) max = sum;

        return sum;
    }

    helper(root);
    return max;
}

// Test cases
// Test Case 1
const root1 = createTreeNode(1);
root1.left = createTreeNode(4);
root1.right = createTreeNode(3);
root1.left.left = createTreeNode(2);
root1.left.right = createTreeNode(4);
root1.right.left = createTreeNode(2);
root1.right.right = createTreeNode(5);
root1.right.right.left = createTreeNode(4);
root1.right.right.right = createTreeNode(6);

console.log("Test Case 1:", maxSumBST(root1)); // Expected: 20

// Test Case 2
const root2 = createTreeNode(4);
root2.left = createTreeNode(3);
root2.left.left = createTreeNode(1);
root2.left.right = createTreeNode(2);

console.log("Test Case 2:", maxSumBST(root2)); // Expected: 2

// Test Case 3: Negative values
const root3 = createTreeNode(-4);
root3.left = createTreeNode(-2);
root3.right = createTreeNode(-5);

console.log("Test Case 3:", maxSumBST(root3)); // Expected: 0