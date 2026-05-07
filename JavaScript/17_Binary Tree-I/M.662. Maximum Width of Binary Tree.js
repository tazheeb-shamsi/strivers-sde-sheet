// 662. Maximum Width of Binary Tree
// https://leetcode.com/problems/maximum-width-of-binary-tree/

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
 * Find maximum width of binary tree
 * Width = number of nodes between leftmost and rightmost non-null nodes at each level
 * @param {TreeNode} root - Root of the binary tree
 * @returns {number} - Maximum width
 */
function widthOfBinaryTree(root) {
    if (root === null) return 0;

    let maxWidth = 0;
    const queue = [[root, 0n]]; // Use BigInt for index to prevent overflow

    while (queue.length > 0) {
        const size = queue.length;
        const minIndex = queue[0][1]; // Normalize to prevent overflow
        let left = 0n;
        let right = 0n;

        for (let i = 0; i < size; i++) {
            const [node, idx] = queue.shift();
            const index = idx - minIndex; // Normalized index

            if (i === 0) left = index;
            if (i === size - 1) right = index;

            // For 0-indexed complete binary tree:
            // left child = 2 * index, right child = 2 * index + 1
            if (node.left !== null) {
                queue.push([node.left, 2n * index]);
            }
            if (node.right !== null) {
                queue.push([node.right, 2n * index + 1n]);
            }
        }

        const width = Number(right - left + 1n);
        maxWidth = Math.max(maxWidth, width);
    }

    return maxWidth;
}

// Test cases
// Test 1: [1,3,2,5,3,null,9]
const root1 = createTreeNode(1);
root1.left = createTreeNode(3);
root1.right = createTreeNode(2);
root1.left.left = createTreeNode(5);
root1.left.right = createTreeNode(3);
root1.right.right = createTreeNode(9);

console.log("Width:", widthOfBinaryTree(root1)); // 4

// Test 2: [1,3,2,5]
const root2 = createTreeNode(1);
root2.left = createTreeNode(3);
root2.right = createTreeNode(2);
root2.left.left = createTreeNode(5);

console.log("Width:", widthOfBinaryTree(root2)); // 2

// Test 3: [1,3,2,5,null,null,9,6,null,null,7]
const root3 = createTreeNode(1);
root3.left = createTreeNode(3);
root3.right = createTreeNode(2);
root3.left.left = createTreeNode(5);
root3.right.right = createTreeNode(9);
root3.left.left.left = createTreeNode(6);
root3.right.right.right = createTreeNode(7);

console.log("Width:", widthOfBinaryTree(root3)); // 8