// TUF: Print root to node path
// https://takeuforward.org/plus/dsa/problems/print-root-to-note-path-in-bt

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
 * Find all paths from root to leaf nodes
 * @param {TreeNode} root - Root of the binary tree
 * @returns {number[][]} - All root to leaf paths
 */
function allRootToLeaf(root) {
    const paths = [];
    const path = [];

    function dfs(node) {
        if (node === null) return;

        path.push(node.val);

        if (node.left === null && node.right === null) {
            // Leaf node - add copy of current path
            paths.push([...path]);
        } else {
            dfs(node.left);
            dfs(node.right);
        }

        path.pop(); // Backtrack
    }

    dfs(root);
    return paths;
}

/**
 * Find path from root to a specific target node
 * @param {TreeNode} root - Root of the binary tree
 * @param {number} target - Target value to find
 * @returns {number[]} - Path from root to target, empty if not found
 */
function rootToNodePath(root, target) {
    const path = [];

    function dfs(node) {
        if (node === null) return false;

        path.push(node.val);

        if (node.val === target) return true;

        if (dfs(node.left) || dfs(node.right)) {
            return true;
        }

        path.pop(); // Backtrack
        return false;
    }

    dfs(root);
    return path;
}

// Test cases
const root = createTreeNode(1);
root.left = createTreeNode(2);
root.right = createTreeNode(3);
root.left.left = createTreeNode(4);
root.left.right = createTreeNode(5);
root.right.left = createTreeNode(6);
root.right.right = createTreeNode(7);

console.log("All root to leaf paths:");
const paths = allRootToLeaf(root);
paths.forEach(p => console.log(p));
// [1, 2, 4]
// [1, 2, 5]
// [1, 3, 6]
// [1, 3, 7]

console.log("\nPath to node 5:", rootToNodePath(root, 5)); // [1, 2, 5]
console.log("Path to node 7:", rootToNodePath(root, 7)); // [1, 3, 7]