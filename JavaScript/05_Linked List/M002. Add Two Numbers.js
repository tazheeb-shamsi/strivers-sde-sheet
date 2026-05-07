// 2. Add Two Numbers
// https://leetcode.com/problems/add-two-numbers/

// Definition for singly-linked list.
/**
 * Creates a list node
 */
function createListNode(val = 0, next = null) {
    return { val, next };
}

/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
function addTwoNumbers(l1, l2) {
    const dummy = createListNode(0);
    let curr = dummy;
    let carry = 0;

    while (l1 !== null || l2 !== null || carry !== 0) {
        let sum = carry;
        if (l1 !== null) {
            sum += l1.val;
            l1 = l1.next;
        }
        if (l2 !== null) {
            sum += l2.val;
            l2 = l2.next;
        }
        carry = Math.floor(sum / 10);
        curr.next = createListNode(sum % 10);
        curr = curr.next;
    }

    return dummy.next;
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

const l1 = createListNode(2, createListNode(4, createListNode(3)));
const l2 = createListNode(5, createListNode(6, createListNode(4)));
console.log(printList(addTwoNumbers(l1, l2))); // Output: [7, 0, 8] (342 + 465 = 807)
