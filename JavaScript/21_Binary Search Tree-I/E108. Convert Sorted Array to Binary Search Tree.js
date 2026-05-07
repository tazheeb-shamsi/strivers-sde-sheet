/**
 * 108. Convert Sorted Array to Binary Search Tree
 * Construct BST from given keys
 * https://leetcode.com/problems/convert-sorted-array-to-binary-search-tree/
 *
 * Type             | Details
 * -----------------+----------------------------------------------------
 * Time Complexity  | O(N) – Each element is visited once
 * Space Complexity | O(log N) – Recursion stack for balanced tree
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
 * Convert sorted array to height-balanced BST
 * @param {number[]} nums - Sorted array
 * @returns {TreeNode} - Root of the BST
 */
function sortedArrayToBST(nums) {
    return buildBST(nums, 0, nums.length - 1);
}

function buildBST(nums, left, right) {
    if (left > right) return null;
    // Use right-biased mid
    const mid = Math.floor((left + right + 1) / 2);
    const root = createTreeNode(nums[mid]);
    root.left = buildBST(nums, left, mid - 1);
    root.right = buildBST(nums, mid + 1, right);
    return root;
}

/**
 * Print tree in level order
 * @param {TreeNode} root
 */
function printTree(root) {
    if (root === null) {
        console.log("[]");
        return;
    }

    const queue = [root];
    const output = [];

    while (queue.length > 0) {
        const node = queue.shift();
        if (node === null) {
            output.push("null");
        } else {
            output.push(String(node.val));
            queue.push(node.left);
            queue.push(node.right);
        }
    }

    // Trim trailing nulls
    while (output.length > 0 && output[output.length - 1] === "null") {
        output.pop();
    }

    console.log("[" + output.join(",") + "]");
}

// Test cases
const nums = [-10, -3, 0, 5, 9];
const root = sortedArrayToBST(nums);
process.stdout.write("Output: ");
printTree(root);