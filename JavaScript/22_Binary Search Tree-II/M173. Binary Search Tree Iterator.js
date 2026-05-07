/**
 * 173. Binary Search Tree Iterator
 * https://leetcode.com/problems/binary-search-tree-iterator/
 *
 * Time Complexity: O(1) amortized for next(), O(1) for hasNext()
 * Space Complexity: O(H) – Stack stores at most H nodes
 */

/**
 * Creates a tree node
 */
function createTreeNode(val = 0, left = null, right = null) {
    return { val, left, right };
}

/**
 * Controlled Inorder Traversal using Stack
 */
function createBSTIterator(root) {
    const stack = [];

    function pushAllLeft(node) {
        while (node !== null) {
            stack.push(node);
            node = node.left;
        }
    }

    function next() {
        const node = stack.pop();
        
        // If node has right child, push all left nodes of right subtree
        if (node.right !== null) {
            pushAllLeft(node.right);
        }
        
        return node.val;
    }

    function hasNext() {
        return stack.length > 0;
    }

    // Initialize by pushing all left nodes from root
    pushAllLeft(root);

    return { next, hasNext };
}

// Test cases
// Test Case: BST [7,3,15,null,null,9,20]
const root = createTreeNode(7);
root.left = createTreeNode(3);
root.right = createTreeNode(15);
root.right.left = createTreeNode(9);
root.right.right = createTreeNode(20);

console.log("Test Case: BST [7,3,15,null,null,9,20]");
console.log("Expected Inorder: [3, 7, 9, 15, 20]");

const iterator = createBSTIterator(root);
const result = [];
while (iterator.hasNext()) {
    result.push(iterator.next());
}
console.log("Output:", result);
