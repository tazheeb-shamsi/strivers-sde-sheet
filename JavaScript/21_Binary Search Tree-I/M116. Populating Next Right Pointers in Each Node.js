/**
 * 116. Populating Next Right Pointers in Each Node
 * https://leetcode.com/problems/populating-next-right-pointers-in-each-node/
 *
 * Type             | Details
 * -----------------+----------------------------------------------------
 * Time Complexity  | O(N) – Visit each node once
 * Space Complexity | O(1) – Using next pointers, no extra space
 */

/**
 * Definition for a Node.
 */
function createNode(val = 0, left = null, right = null, next = null) {
    return { val, left, right, next };
}

/**
 * Populate next right pointers in each node
 * @param {Node} root - Root of the perfect binary tree
 * @returns {Node} - Root with next pointers populated
 */
function connect(root) {
    if (root === null) return null;

    let leftmost = root;
    while (leftmost.left !== null) {
        let head = leftmost;
        while (head !== null) {
            head.left.next = head.right;
            if (head.next !== null) {
                head.right.next = head.next.left;
            }
            head = head.next;
        }
        leftmost = leftmost.left;
    }
    return root;
}

/**
 * Get levels string in [1,#,2,3,#,4,5,6,7,#] format
 * @param {Node} root
 * @returns {string}
 */
function getLevelsString(root) {
    if (root === null) return "[]";
    const parts = [];
    let levelStart = root;

    while (levelStart !== null) {
        let current = levelStart;
        while (current !== null) {
            parts.push(current.val);
            current = current.next;
        }
        parts.push("#");
        levelStart = levelStart.left;
    }

    return "[" + parts.join(",") + "]";
}

// Test cases
const root = createNode(1);
root.left = createNode(2);
root.right = createNode(3);
root.left.left = createNode(4);
root.left.right = createNode(5);
root.right.left = createNode(6);
root.right.right = createNode(7);

const result = connect(root);

console.log("Output:", getLevelsString(result));
// Output: [1,#,2,3,#,4,5,6,7,#]