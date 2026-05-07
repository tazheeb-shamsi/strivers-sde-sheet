// 021. Merge Two Sorted Lists
// https://leetcode.com/problems/merge-two-sorted-lists/

// Definition for singly-linked list.
/**
 * Creates a list node
 */
function createListNode(val = 0, next = null) {
    return { val, next };
}

/**
 * @param {ListNode} list1
 * @param {ListNode} list2
 * @return {ListNode}
 */
function mergeTwoLists(list1, list2) {
    const dummy = createListNode();
    let prev = dummy;

    while (list1 !== null && list2 !== null) {
        if (list1.val < list2.val) {
            prev.next = list1;
            list1 = list1.next;
        } else {
            prev.next = list2;
            list2 = list2.next;
        }
        prev = prev.next;
    }

    prev.next = list1 === null ? list2 : list1;

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

const list1 = createListNode(1, createListNode(2, createListNode(4)));
const list2 = createListNode(1, createListNode(3, createListNode(4)));
console.log(printList(mergeTwoLists(list1, list2))); // Output: [1, 1, 2, 3, 4, 4]
