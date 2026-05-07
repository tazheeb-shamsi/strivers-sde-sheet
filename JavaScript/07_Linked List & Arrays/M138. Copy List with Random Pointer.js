// 138. Copy List with Random Pointer
// https://leetcode.com/problems/copy-list-with-random-pointer/

// Definition for a Node.
/**
 * Creates a node with random pointer
 */
function createNode(val = 0, next = null, random = null) {
    return { val, next, random };
}

/**
 * @param {Node} head
 * @return {Node}
 */
function copyRandomList(head) {
    if (head === null) return null;

    // Create a copy of each node and insert it after the original node
    let curr = head;
    while (curr !== null) {
        const copy = createNode(curr.val);
        copy.next = curr.next;
        curr.next = copy;
        curr = copy.next;
    }

    // Set the random pointers for the copied nodes
    curr = head;
    while (curr !== null) {
        if (curr.random !== null) {
            curr.next.random = curr.random.next;
        }
        curr = curr.next.next;
    }

    // Separate the original and copied lists
    let original = head;
    let copy = head.next;
    const copyHead = copy;

    while (original !== null) {
        original.next = original.next.next;
        if (copy.next !== null) {
            copy.next = copy.next.next;
        }
        original = original.next;
        copy = copy.next;
    }

    return copyHead;
}

// Helper function to print list
function printList(head) {
    const result = [];
    while (head !== null) {
        result.push(head.val);
        head = head.next;
    }
    return result;
}

// Create test list
const node1 = createNode(1);
const node2 = createNode(2);
const node3 = createNode(3);
const node4 = createNode(4);

node1.next = node2;
node2.next = node3;
node3.next = node4;

node1.random = node3;
node2.random = node4;
node3.random = node2;
node4.random = node1;

const copiedList = copyRandomList(node1);
console.log(printList(copiedList)); // Output: [1, 2, 3, 4]
