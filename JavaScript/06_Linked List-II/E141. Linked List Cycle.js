// 141. Linked List Cycle
// Detect a cycle in Linked List
// https://leetcode.com/problems/linked-list-cycle/

// Definition for singly-linked list.
/**
 * Creates a list node
 */
function createListNode(val = 0, next = null) {
    return { val, next };
}

/**
 * @param {ListNode} head
 * @return {boolean}
 */
function hasCycle(head) {
    if (head === null || head.next === null) return false;

    let slow = head;
    let fast = head.next;

    while (slow !== fast) {
        if (fast === null || fast.next === null) return false;
        slow = slow.next;
        fast = fast.next.next;
    }

    return true;
}

// Test with cycle
const head = createListNode(1);
head.next = createListNode(2);
head.next.next = createListNode(3);
head.next.next.next = createListNode(4);
head.next.next.next.next = head.next; // Creates cycle
console.log(hasCycle(head)); // Output: true
