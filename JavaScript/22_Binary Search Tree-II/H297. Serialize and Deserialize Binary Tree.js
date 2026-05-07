/**
 * 297. Serialize and Deserialize Binary Tree
 * https://leetcode.com/problems/serialize-and-deserialize-binary-tree/
 *
 * Type             | Details
 * -----------------+----------------------------------------------------
 * Time Complexity  | O(N) – Visit each node once
 * Space Complexity | O(N) – For the serialized string and queue
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
 * Encodes a tree to a single string.
 * @param {TreeNode} root
 * @returns {string}
 */
function serialize(root) {
    if (root === null) return "";
    
    const result = [];
    const queue = [root];
    
    while (queue.length > 0) {
        const node = queue.shift();
        
        if (node === null) {
            result.push("null");
        } else {
            result.push(String(node.val));
            queue.push(node.left);
            queue.push(node.right);
        }
    }
    
    return result.join(",");
}

/**
 * Decodes your encoded data to tree.
 * @param {string} data
 * @returns {TreeNode}
 */
function deserialize(data) {
    if (data === null || data === "") return null;
    
    const values = data.split(",");
    const root = createTreeNode(parseInt(values[0]));
    const queue = [root];
    
    let i = 1;
    while (queue.length > 0 && i < values.length) {
        const node = queue.shift();
        
        // Process left child
        if (i < values.length && values[i] !== "null") {
            node.left = createTreeNode(parseInt(values[i]));
            queue.push(node.left);
        }
        i++;
        
        // Process right child
        if (i < values.length && values[i] !== "null") {
            node.right = createTreeNode(parseInt(values[i]));
            queue.push(node.right);
        }
        i++;
    }
    
    return root;
}

// Test cases
// Build a tree: [1, 2, 3, null, null, 4, 5]
const root = createTreeNode(1);
root.left = createTreeNode(2);
root.right = createTreeNode(3);
root.right.left = createTreeNode(4);
root.right.right = createTreeNode(5);

const serialized = serialize(root);
console.log("Serialized:", serialized);

const deserialized = deserialize(serialized);
console.log("Deserialized root:", deserialized.val); // 1
console.log("Deserialized left:", deserialized.left.val); // 2
console.log("Deserialized right:", deserialized.right.val); // 3