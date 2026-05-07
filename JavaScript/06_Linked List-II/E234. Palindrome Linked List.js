// 234. Palindrome Linked List
// Check if a LinkedList is palindrome or not.
// https://leetcode.com/problems/palindrome-linked-list/

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
function isPalindrome(head) {
    if (head === null || head.next === null) return true;

    // 1) Find middle (slow at mid)
    let slow = head;
    let fast = head;

    while (fast !== null && fast.next !== null) {
        slow = slow.next;
        fast = fast.next.next;
    }

    // 2) If odd length, skip the middle
    if (fast !== null) {
        slow = slow.next;
    }

    // 3) Reverse the second half starting at slow
    let second = reverse(slow);

    // 4) Compare first half and reversed second half
    let p1 = head;
    let p2 = second;
    let ok = true;

    while (ok && p2 !== null) {
        if (p1.val !== p2.val) ok = false;
        p1 = p1.next;
        p2 = p2.next;
    }

    return ok;
}

function reverse(node) {
    let prev = null;
    let curr = node;

    while (curr !== null) {
        const nxt = curr.next;
        curr.next = prev;
        prev = curr;
        curr = nxt;
    }

    return prev;
}

const head = createListNode(1, createListNode(2, createListNode(2, createListNode(1))));
console.log(isPalindrome(head)); // Output: true
