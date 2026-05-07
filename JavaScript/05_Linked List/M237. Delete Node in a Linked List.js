// 237. Delete Node in a Linked List
// https://leetcode.com/problems/delete-node-in-a-linked-list/

// Definition for singly-linked list.
/**
 * Creates a list node
 */
function createListNode(val = 0, next = null) {
    return { val, next };
}

/**
 * @param {ListNode} node
 * @return {void} Do not return anything, modify node in-place instead.
 */
function deleteNode(node) {
    node.val = node.next.val;
    node.next = node.next.next;
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

const head = createListNode(1, createListNode(2, createListNode(3, createListNode(4, createListNode(5)))));
deleteNode(head.next.next); // Delete node with value 3
console.log(printList(head)); // Output: [1, 2, 4, 5]
