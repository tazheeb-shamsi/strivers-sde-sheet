// 206. Reverse Linked List
// Reverse a singly linked list.
// https://leetcode.com/problems/reverse-linked-list/

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

    public ListNode reverseList(ListNode head) {
        ListNode prev = null; // Initially, there’s no previous node
        ListNode curr = head; // Start from the head

        while (curr != null) {
            ListNode nextNode = curr.next; // Save the next node
            curr.next = prev; // Reverse the link
            prev = curr; // Move prev forward
            curr = nextNode; // Move curr forward
        }

        return prev; // New head of the reversed list
    }

    public static void main(String[] args) {
        ListNode head = new ListNode(
            1,
            new ListNode(2, new ListNode(3, new ListNode(4, new ListNode(5))))
        );
        Solution solution = new Solution();
        ListNode reversed = solution.reverseList(head);

        // Print reversed list
        while (reversed != null) {
            System.out.print(reversed.val + " ");
            reversed = reversed.next;
        }
    }
}
