/**
 * TUF: Floor and Ceil in a BST
 * https://takeuforward.org/plus/dsa/problems/floor-and-ceil-in-a-bst
 *
 * Floor Value: Greatest data lesser than or equal to key
 * Ceil Value: Smallest data larger than or equal to key
 *
 * Type             | Details
 * -----------------+----------------------------------------------------
 * Time Complexity  | O(H) – H is height of tree
 * Space Complexity | O(1) – Iterative approach
 */

/**
 * Definition for a binary tree node.
 */
function createTreeNode(val = 0, left = null, right = null) {
    return { val, left, right };
}

/**
 * Find floor: greatest value <= key
 * @param {TreeNode} root
 * @param {number} key
 * @returns {number}
 */
function findFloor(root, key) {
    let floor = -1;
    let curr = root;
    
    while (curr !== null) {
        if (curr.data === key) {
            return curr.data;
        } else if (curr.data < key) {
            floor = curr.data;
            curr = curr.right;
        } else {
            curr = curr.left;
        }
    }
    
    return floor;
}

/**
 * Find ceil: smallest value >= key
 * @param {TreeNode} root
 * @param {number} key
 * @returns {number}
 */
function findCeil(root, key) {
    let ceil = -1;
    let curr = root;
    
    while (curr !== null) {
        if (curr.data === key) {
            return curr.data;
        } else if (curr.data > key) {
            ceil = curr.data;
            curr = curr.left;
        } else {
            curr = curr.right;
        }
    }
    
    return ceil;
}

/**
 * Find floor and ceil in BST
 * @param {TreeNode} root
 * @param {number} key
 * @returns {number[]} - [floor, ceil]
 */
function floorCeilOfBST(root, key) {
    return [findFloor(root, key), findCeil(root, key)];
}

// Test cases
// Build BST: [8,5,12,4,7,10,14]
const root = createTreeNode(8);
root.left = createTreeNode(5);
root.right = createTreeNode(12);
root.left.left = createTreeNode(4);
root.left.right = createTreeNode(7);
root.right.left = createTreeNode(10);
root.right.right = createTreeNode(14);

console.log("Test 1 (key=9):", floorCeilOfBST(root, 9));  // [8, 10]
console.log("Test 2 (key=5):", floorCeilOfBST(root, 5));  // [5, 5]
console.log("Test 3 (key=3):", floorCeilOfBST(root, 3));  // [-1, 4]