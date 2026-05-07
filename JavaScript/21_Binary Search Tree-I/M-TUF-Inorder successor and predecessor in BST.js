/**
 * TUF: Inorder successor and predecessor in BST
 * Find the inorder predecessor/successor of a given Key in BST
 * https://takeuforward.org/plus/dsa/problems/inorder-successor-and-predecessor-in-bst
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
 * Find inorder predecessor and successor of a key in BST
 * @param {TreeNode} root - Root of the BST
 * @param {number} key - Key to find predecessor/successor for
 * @returns {number[]} - [predecessor, successor], -1 if not found
 */
function succPredBST(root, key) {
    let predecessor = null;
    let successor = null;
    
    let current = root;
    while (current !== null) {
        if (current.data === key) {
            // Find predecessor (max in left subtree)
            if (current.left !== null) {
                let temp = current.left;
                while (temp.right !== null) {
                    temp = temp.right;
                }
                predecessor = temp;
            }

            // Find successor (min in right subtree)
            if (current.right !== null) {
                let temp = current.right;
                while (temp.left !== null) {
                    temp = temp.left;
                }
                successor = temp;
            }
            break;
        } else if (current.data < key) {
            predecessor = current;
            current = current.right;
        } else {
            successor = current;
            current = current.left;
        }
    }
    
    return [
        predecessor !== null ? predecessor.data : -1,
        successor !== null ? successor.data : -1
    ];
}

// Test cases
const root = createTreeNode(10);
root.left = createTreeNode(5);
root.right = createTreeNode(15);
root.left.left = createTreeNode(3);
root.left.right = createTreeNode(7);
root.right.left = createTreeNode(12);
root.right.right = createTreeNode(18);

const result = succPredBST(root, 10);
console.log("Predecessor:", result[0]); // Output: 7
console.log("Successor:", result[1]);   // Output: 12