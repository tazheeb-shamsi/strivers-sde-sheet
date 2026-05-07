// 142. Linked List Cycle II
// Find the starting point of the Loop of LinkedList
// https://leetcode.com/problems/linked-list-cycle-ii/
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
 * @return {ListNode}
 */
function detectCycle(head) {
    let slow = head;
    let fast = head;
    let entry = head;

    while (fast !== null && fast.next !== null) {
        slow = slow.next;
        fast = fast.next.next;

        if (slow === fast) {
            while (slow !== entry) {
                slow = slow.next;
                entry = entry.next;
            }
            return entry;
        }
    }

    return null;
}

// Test with cycle
const head = createListNode(1);
head.next = createListNode(2);
head.next.next = createListNode(3);
head.next.next.next = createListNode(4);
head.next.next.next.next = createListNode(5);
head.next.next.next.next.next = head.next.next; // Cycle starts at node 3

const result = detectCycle(head);
console.log(result ? result.val : null); // Output: 3
