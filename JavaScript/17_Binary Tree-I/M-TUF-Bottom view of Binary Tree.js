// TUF: Bottom View of Binary Tree
// https://takeuforward.org/plus/dsa/problems/bottom-view-of-bt

/**
 * Creates a tree node
 */
function createTreeNode(val = 0, left = null, right = null) {
    return { val, left, right };
}

/**
 * Get bottom view of binary tree
 * @param {TreeNode} root - Root of the binary tree
 * @returns {number[]} - Bottom view from left to right
 */
function bottomView(root) {
    if (root === null) return [];

    const map = new Map(); // horizontal distance -> node value
    const queue = [[root, 0]]; // [node, hd]

    while (queue.length > 0) {
        const [node, hd] = queue.shift();

        // For bottom view, overwrite value at HD every time
        map.set(hd, node.val);

        if (node.left !== null) {
            queue.push([node.left, hd - 1]);
        }
        if (node.right !== null) {
            queue.push([node.right, hd + 1]);
        }
    }

    // Sort by horizontal distance and get values
    const sortedHDs = [...map.keys()].sort((a, b) => a - b);
    return sortedHDs.map(hd => map.get(hd));
}

// Test cases
const root = createTreeNode(1);
root.left = createTreeNode(2);
root.right = createTreeNode(3);
root.left.right = createTreeNode(5);
root.right.right = createTreeNode(4);

console.log("Bottom View:", bottomView(root)); // [2, 5, 3, 4]

const root2 = createTreeNode(20);
root2.left = createTreeNode(8);
root2.right = createTreeNode(22);
root2.left.left = createTreeNode(5);
root2.left.right = createTreeNode(3);
root2.right.right = createTreeNode(25);
root2.left.right.left = createTreeNode(10);
root2.left.right.right = createTreeNode(14);

console.log("Bottom View 2:", bottomView(root2)); // [5, 10, 3, 14, 25]
