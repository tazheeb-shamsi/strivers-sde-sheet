// TUF: Left View of Binary Tree
// https://takeuforward.org/plus/dsa/problems/right-left-view-of-bt

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
 * Get left side view of binary tree (BFS approach)
 * @param {TreeNode} root - Root of the binary tree
 * @returns {number[]} - Left view
 */
function leftSideView(root) {
    const result = [];
    if (root === null) return result;

    const queue = [root];

    while (queue.length > 0) {
        const size = queue.length;

        for (let i = 0; i < size; i++) {
            const curr = queue.shift();

            // Add first node of each level
            if (i === 0) {
                result.push(curr.val);
            }

            if (curr.left !== null) queue.push(curr.left);
            if (curr.right !== null) queue.push(curr.right);
        }
    }

    return result;
}

/**
 * Get left side view using DFS (recursive)
 * @param {TreeNode} root - Root of the binary tree
 * @returns {number[]} - Left view
 */
function leftSideViewDFS(root) {
    const result = [];

    function dfs(node, level) {
        if (node === null) return;

        // First node at each level is the left view
        if (level === result.length) {
            result.push(node.val);
        }

        dfs(node.left, level + 1);
        dfs(node.right, level + 1);
    }

    dfs(root, 0);
    return result;
}

// Test cases
const root = createTreeNode(1);
root.left = createTreeNode(2);
root.right = createTreeNode(3);
root.left.right = createTreeNode(5);
root.right.right = createTreeNode(4);

console.log("Left View (BFS):", leftSideView(root)); // [1, 2, 5]
console.log("Left View (DFS):", leftSideViewDFS(root)); // [1, 2, 5]