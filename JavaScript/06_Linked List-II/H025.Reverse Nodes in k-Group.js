// 25. Reverse Nodes in k-Group
// https://leetcode.com/problems/reverse-nodes-in-k-group/

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
function reverseKGroup(head, k) {
    if (head === null || k === 1) return head;

    // Create a dummy node to simplify edge cases
    const dummy = createListNode(0);
    dummy.next = head;
    let prevGroupEnd = dummy;

    while (true) {
        // Check if there are at least k nodes remaining
        const kthNode = getKthNode(prevGroupEnd, k);
        if (kthNode === null) break;

        const nextGroupStart = kthNode.next;

        // Reverse the current group
        let prev = nextGroupStart;
        let curr = prevGroupEnd.next;

        while (curr !== nextGroupStart) {
            const temp = curr.next;
            curr.next = prev;
            prev = curr;
            curr = temp;
        }

        // Connect with previous group
        const temp = prevGroupEnd.next;
        prevGroupEnd.next = kthNode;
        prevGroupEnd = temp;
    }

    return dummy.next;
}

// Helper function to find the kth node from a given start
function getKthNode(start, k) {
    while (start !== null && k > 0) {
        start = start.next;
        k--;
    }
    return start;
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
console.log(printList(reverseKGroup(head, 2))); // Output: [2, 1, 4, 3, 5]
