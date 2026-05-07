/**
 * Children Sum Property in Binary Tree
 * https://takeuforward.org/plus/dsa/problems/children-sum-property-in-binary-tree
 *
 * Type             | Details
 * -----------------+----------------------------------------------------
 * Time Complexity  | O(N) – Each node is visited exactly once
 * Space Complexity | O(H) – Recursion stack height (H = height of tree)
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
 * Modify the tree to satisfy children sum property
 * Node's value = sum of left child's value + right child's value
 * @param {TreeNode} root - Root of the binary tree
 */
function changeTree(root) {
    // Base case: If the current node is null, return
    if (root === null) {
        return;
    }

    // Calculate the sum of the values of
    // the left and right children, if they exist
    let child = 0;
    if (root.left !== null) {
        child += root.left.val;
    }
    if (root.right !== null) {
        child += root.right.val;
    }

    // Compare the sum of children with
    // the current node's value and update
    if (child >= root.val) {
        root.val = child;
    } else {
        // If the sum is smaller, update the
        // child with the current node's value
        if (root.left !== null) {
            root.left.val = root.val;
        } else if (root.right !== null) {
            root.right.val = root.val;
        }
    }

    // Recursively call the function
    // on the left and right children
    changeTree(root.left);
    changeTree(root.right);

    // Calculate the total sum of the
    // values of the left and right children
    let tot = 0;
    if (root.left !== null) {
        tot += root.left.val;
    }
    if (root.right !== null) {
        tot += root.right.val;
    }

    // If either left or right child exists,
    // update the current node's value with the total sum
    if (root.left !== null || root.right !== null) {
        root.val = tot;
    }
}

/**
 * Inorder traversal of the tree
 * @param {TreeNode} root - Root of the tree
 * @returns {number[]} - Array of values in inorder
 */
function inorderTraversal(root) {
    const result = [];
    
    function traverse(node) {
        if (node === null) return;
        traverse(node.left);
        result.push(node.val);
        traverse(node.right);
    }
    
    traverse(root);
    return result;
}

// Test cases
// Create the binary tree
const root = createTreeNode(3);
root.left = createTreeNode(5);
root.right = createTreeNode(1);
root.left.left = createTreeNode(6);
root.left.right = createTreeNode(2);
root.right.left = createTreeNode(0);
root.right.right = createTreeNode(8);
root.left.right.left = createTreeNode(7);
root.left.right.right = createTreeNode(4);

// Print the inorder traversal of tree before modification
console.log("Binary Tree before modification:", inorderTraversal(root).join(" "));

// Call the changeTree function to modify the binary tree
changeTree(root);

// Print the inorder traversal after modification
console.log("Binary Tree after Children Sum Property:", inorderTraversal(root).join(" "));