// 160. Intersection of Two Linked Lists
// Find intersection point of Y LinkedList
// https://leetcode.com/problems/intersection-of-two-linked-lists/

// Definition for singly-linked list.
/**
 * Creates a list node
 */
function createListNode(val = 0, next = null) {
    return { val, next };
}

/**
 * @param {ListNode} headA
 * @param {ListNode} headB
 * @return {ListNode}
 */
function getIntersectionNode(headA, headB) {
    let a = headA;
    let b = headB;

    while (a !== b) {
        a = a === null ? headB : a.next;
        b = b === null ? headA : b.next;
    }

    return a;
}

// Create intersecting lists
const headA = createListNode(1);
headA.next = createListNode(2);
headA.next.next = createListNode(3);

const headB = createListNode(4);
headB.next = createListNode(5);
headB.next.next = headA.next; // Intersection at node with value 2

const intersection = getIntersectionNode(headA, headB);
console.log(intersection ? intersection.val : null); // Output: 2
