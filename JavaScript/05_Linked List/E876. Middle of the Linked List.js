// 876. Middle of the Linked List
// https://leetcode.com/problems/middle-of-the-linked-list/

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
function middleNode(head) {
    let slow = head;
    let fast = head;

    while (fast !== null && fast.next !== null) {
        slow = slow.next;
        fast = fast.next.next;
    }

    return slow;
}

const head = createListNode(1, createListNode(2, createListNode(3, createListNode(4, createListNode(5)))));
console.log(middleNode(head).val); // Output: 3
