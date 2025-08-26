// H025. Reverse Nodes in k-Group
// H025. Reverse a LinkedList in groups of size k
// https://leetcode.com/problems/reverse-nodes-in-k-group/

/*
Given the head of a linked list, reverse the nodes of the list k at a time, and return the modified list.
k is a positive integer and is less than or equal to the length of the linked list. If the number of nodes is not a multiple of k then left-out nodes, in the end, should remain as it is.
You may not alter the values in the list's nodes, only nodes themselves may be changed.

Example:
Input: head = [1,2,3,4,5], k = 2
Output: [2,1,4,3,5]
Explanation: First group [1,2] becomes [2,1], second group [3,4] becomes [4,3], [5] remains as is.
*/

class Solution {

    // Definition for singly-linked list.
    public static class ListNode {

        int val;
        ListNode next;

        ListNode() {}

        ListNode(int val) {
            this.val = val;
        }

        ListNode(int val, ListNode next) {
            this.val = val;
            this.next = next;
        }
    }

    public ListNode reverseKGroup(ListNode head, int k) {
        if (head == null || k == 1) return head;

        // Create a dummy node to simplify edge cases
        ListNode dummy = new ListNode(0);
        dummy.next = head;
        ListNode prevGroupEnd = dummy;

        while (true) {
            // Check if there are at least k nodes remaining
            ListNode kthNode = getKthNode(prevGroupEnd, k);
            if (kthNode == null) break;

            ListNode nextGroupStart = kthNode.next;

            // Reverse the current group
            ListNode prev = nextGroupStart;
            ListNode curr = prevGroupEnd.next;

            while (curr != nextGroupStart) {
                ListNode temp = curr.next;
                curr.next = prev;
                prev = curr;
                curr = temp;
            }

            // Connect with previous group
            ListNode temp = prevGroupEnd.next;
            prevGroupEnd.next = kthNode;
            prevGroupEnd = temp;
        }

        return dummy.next;
    }

    // Helper method to find the kth node from a given start
    private ListNode getKthNode(ListNode start, int k) {
        while (start != null && k > 0) {
            start = start.next;
            k--;
        }
        return start;
    }

    // Helper method to print the list
    public static void printList(ListNode head) {
        while (head != null) {
            System.out.print(head.val);
            if (head.next != null) System.out.print(" -> ");
            head = head.next;
        }
        System.out.println();
    }

    public static void main(String[] args) {
        Solution solution = new Solution();

        // Test case 1: [1,2,3,4,5], k = 2
        // Expected: [2,1,4,3,5]
        ListNode head1 = new ListNode(
            1,
            new ListNode(2, new ListNode(3, new ListNode(4, new ListNode(5))))
        );

        System.out.println("Original list:");
        printList(head1);

        ListNode result1 = solution.reverseKGroup(head1, 2);
        System.out.println("After reversing in groups of 2:");
        printList(result1);

        System.out.println();

        // Test case 2: [1,2,3,4,5], k = 3
        // Expected: [3,2,1,4,5]
        ListNode head2 = new ListNode(
            1,
            new ListNode(2, new ListNode(3, new ListNode(4, new ListNode(5))))
        );

        System.out.println("Original list:");
        printList(head2);

        ListNode result2 = solution.reverseKGroup(head2, 3);
        System.out.println("After reversing in groups of 3:");
        printList(result2);

        System.out.println();

        // Test case 3: [1,2], k = 2
        // Expected: [2,1]
        ListNode head3 = new ListNode(1, new ListNode(2));

        System.out.println("Original list:");
        printList(head3);

        ListNode result3 = solution.reverseKGroup(head3, 2);
        System.out.println("After reversing in groups of 2:");
        printList(result3);
    }
}
