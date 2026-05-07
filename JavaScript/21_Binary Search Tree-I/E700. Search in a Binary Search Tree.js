/**
 * 700. Search in a Binary Search Tree
 * Search given Key in BST
 * https://leetcode.com/problems/search-in-a-binary-search-tree/
 *
 * Type             | Details
 * -----------------+----------------------------------------------------
 * Time Complexity  | O(H) – H is height of tree
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
 * Search for a value in BST
 * @param {TreeNode} root - Root of the BST
 * @param {number} val - Value to search
 * @returns {TreeNode} - Node with the value, or null
 */
function searchBST(root, val) {
    if (root === null || root.val === val) return root;
    if (root.val > val) return searchBST(root.left, val);
    else return searchBST(root.right, val);
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
// Build the tree [4,2,7,1,3]
const root = createTreeNode(4);
root.left = createTreeNode(2);
root.right = createTreeNode(7);
root.left.left = createTreeNode(1);
root.left.right = createTreeNode(3);

const val = 2;
const result = searchBST(root, val);

process.stdout.write("Output: ");
printTree(result); // Output: [2,1,3]