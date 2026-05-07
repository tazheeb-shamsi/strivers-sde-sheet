// 206. Reverse Linked List
// https://leetcode.com/problems/reverse-linked-list/

// Definition for singly-linked list.
/**
 * Creates a list node
 */
function createListNode(val = 0, next = null) {
    return { val, next };
}

/**
 * @param {ListNode} head
 * @return {ListNode}
 */
function reverseList(head) {
    let prev = null; // Initially, there's no previous node
    let curr = head; // Start from the head

    while (curr !== null) {
        const nextNode = curr.next; // Save the next node
        curr.next = prev; // Reverse the link
        prev = curr; // Move prev forward
        curr = nextNode; // Move curr forward
    }

    return prev; // New head of the reversed list
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
console.log(printList(reverseList(head))); // Output: [5, 4, 3, 2, 1]
