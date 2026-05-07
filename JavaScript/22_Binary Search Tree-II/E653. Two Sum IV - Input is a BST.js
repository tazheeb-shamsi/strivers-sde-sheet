/**
 * 653. Two Sum IV - Input is a BST
 * Find a pair with a given sum in BST
 * https://leetcode.com/problems/two-sum-iv-input-is-a-bst/
 *
 * Type             | Details
 * -----------------+----------------------------------------------------
 * Time Complexity  | O(N) – Visit each node once
 * Space Complexity | O(N) – For HashSet or list
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
 * Approach 1: Using HashSet + DFS
 * @param {TreeNode} root
 * @param {number} k
 * @returns {boolean}
 */
function findTarget(root, k) {
    const set = new Set();
    return dfs(root, k, set);
}

function dfs(node, k, set) {
    if (node === null) return false;
    
    // Check if complement exists
    if (set.has(k - node.val)) {
        return true;
    }
    
    // Add current value to set
    set.add(node.val);
    
    // Search in left and right subtrees
    return dfs(node.left, k, set) || dfs(node.right, k, set);
}

/**
 * Approach 2: Inorder Traversal + Two Pointers
 * @param {TreeNode} root
 * @param {number} k
 * @returns {boolean}
 */
function findTargetTwoPointer(root, k) {
    const list = [];
    inorder(root, list);
    
    let left = 0, right = list.length - 1;
    while (left < right) {
        const sum = list[left] + list[right];
        if (sum === k) return true;
        else if (sum < k) left++;
        else right--;
    }
    return false;
}

function inorder(node, list) {
    if (node === null) return;
    inorder(node.left, list);
    list.push(node.val);
    inorder(node.right, list);
}

// Test cases
// Build BST: [5,3,6,2,4,null,7]
const root = createTreeNode(5);
root.left = createTreeNode(3);
root.right = createTreeNode(6);
root.left.left = createTreeNode(2);
root.left.right = createTreeNode(4);
root.right.right = createTreeNode(7);

console.log("findTarget (k=9):", findTarget(root, 9));  // true (3 + 6)
console.log("findTarget (k=28):", findTarget(root, 28)); // false

// Rebuild tree for second approach (since we traverse it)
const root2 = createTreeNode(5);
root2.left = createTreeNode(3);
root2.right = createTreeNode(6);
root2.left.left = createTreeNode(2);
root2.left.right = createTreeNode(4);
root2.right.right = createTreeNode(7);

console.log("findTargetTwoPointer (k=9):", findTargetTwoPointer(root2, 9)); // true