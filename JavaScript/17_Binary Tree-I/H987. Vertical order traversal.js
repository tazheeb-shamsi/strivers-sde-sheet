// 987. Vertical Order Traversal of a Binary Tree
// https://leetcode.com/problems/vertical-order-traversal-of-a-binary-tree/

/**
 * Creates a tree node
 */
function createTreeNode(val = 0, left = null, right = null) {
    return { val, left, right };
}

/**
 * Vertical order traversal of binary tree
 * @param {TreeNode} root - Root of the binary tree
 * @returns {number[][]} - Vertical order traversal
 */
function verticalTraversal(root) {
    if (root === null) return [];

    const map = new Map(); // col -> array of values
    const queue = [[root, 0]]; // [node, column]

    while (queue.length > 0) {
        const size = queue.length;
        const levelMap = new Map(); // col -> values at this level

        for (let i = 0; i < size; i++) {
            const [node, col] = queue.shift();

            if (!levelMap.has(col)) {
                levelMap.set(col, []);
            }
            levelMap.get(col).push(node.val);

            if (node.left !== null) {
                queue.push([node.left, col - 1]);
            }
            if (node.right !== null) {
                queue.push([node.right, col + 1]);
            }
        }

        // Merge level results into main map (sort values at same position)
        for (const [col, values] of levelMap) {
            values.sort((a, b) => a - b);
            if (!map.has(col)) {
                map.set(col, []);
            }
            map.get(col).push(...values);
        }
    }

    // Sort by column and return values
    const sortedCols = [...map.keys()].sort((a, b) => a - b);
    return sortedCols.map(col => map.get(col));
}

// Test cases
const root = createTreeNode(3);
root.left = createTreeNode(9);
root.right = createTreeNode(20);
root.right.left = createTreeNode(15);
root.right.right = createTreeNode(7);

console.log(verticalTraversal(root)); // [[9], [3, 15], [20], [7]]

const root2 = createTreeNode(1);
root2.left = createTreeNode(2);
root2.right = createTreeNode(3);
root2.left.left = createTreeNode(4);
root2.left.right = createTreeNode(5);
root2.right.left = createTreeNode(6);
root2.right.right = createTreeNode(7);

console.log(verticalTraversal(root2)); // [[4], [2], [1, 5, 6], [3], [7]]
