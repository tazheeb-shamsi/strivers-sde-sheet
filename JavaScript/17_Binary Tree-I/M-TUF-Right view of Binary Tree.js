// TUF: Right View of Binary Tree
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
 * Get right side view of binary tree (BFS approach)
 * @param {TreeNode} root - Root of the binary tree
 * @returns {number[]} - Right view
 */
function rightSideView(root) {
    const result = [];
    if (root === null) return result;

    const queue = [root];

    while (queue.length > 0) {
        const size = queue.length;

        for (let i = 0; i < size; i++) {
            const curr = queue.shift();

            // Add last node of each level
            if (i === size - 1) {
                result.push(curr.val);
            }

            if (curr.left !== null) queue.push(curr.left);
            if (curr.right !== null) queue.push(curr.right);
        }
    }

    return result;
}

/**
 * Get right side view using DFS (recursive)
 * @param {TreeNode} root - Root of the binary tree
 * @returns {number[]} - Right view
 */
function rightSideViewDFS(root) {
    const result = [];

    function dfs(node, level) {
        if (node === null) return;

        // First node at each level when going right first
        if (level === result.length) {
            result.push(node.val);
        }

        dfs(node.right, level + 1);
        dfs(node.left, level + 1);
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

console.log("Right View (BFS):", rightSideView(root)); // [1, 3, 4]
console.log("Right View (DFS):", rightSideViewDFS(root)); // [1, 3, 4]

const root2 = createTreeNode(1);
root2.left = createTreeNode(2);
root2.left.left = createTreeNode(4);

console.log("Right View:", rightSideView(root2)); // [1, 2, 4]