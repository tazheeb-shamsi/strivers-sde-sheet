// 61. Rotate List
// https://leetcode.com/problems/rotate-list/
// Time Complexity: O(n)
// Space Complexity: O(1)

// Definition for singly-linked list.
/**
 * Creates a list node
 */
function createListNode(val = 0, next = null) {
    return { val, next };
}

/**
 * @param {ListNode} head
 * @param {number} k
 * @return {ListNode}
 */
function rotateRight(head, k) {
    if (head === null || head.next === null || k === 0) return head;

    // Step 1: Find length and last node
    let last = head;
    let length = 1;
    while (last.next !== null) {
        last = last.next;
        length++;
    }

    // Step 2: Make it circular
    last.next = head;

    // Step 3: Calculate new tail
    k = k % length;
    let newLast = head;
    for (let i = 0; i < length - k - 1; i++) {
        newLast = newLast.next;
    }

    // Step 4: Break the cycle and return new head
    const newHead = newLast.next;
    newLast.next = null;

    return newHead;
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
console.log(printList(rotateRight(head, 2))); // Output: [4, 5, 1, 2, 3]
