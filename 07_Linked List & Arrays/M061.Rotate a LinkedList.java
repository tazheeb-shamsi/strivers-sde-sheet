// Rotate a LinkedList
// https://leetcode.com/problems/rotate-list/
// Time Complexity: O(n)
// Space Complexity: O(1)

class Solution {

    public class ListNode {
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

    public ListNode rotateRight(ListNode head, int k) {
        if (head == null || head.next == null || k == 0) return head;

        // Step 1: Find length and last node
        ListNode last = head;
        int length = 1;
        while (last.next != null) {
            last = last.next;
            length++;
        }

        // Step 2: Make it circular
        last.next = head;

        // Step 3: Calculate new tail
        k = k % length;
        ListNode newLast = head;
        for (int i = 0; i < length - k - 1; i++) {
            newLast = newLast.next;
        }

        // Step 4: Break the cycle and return new head
        ListNode newHead = newLast.next;
        newLast.next = null;
        return newHead;
    }

    // Helper method to print the linked list
    public void printList(ListNode head) {
        while (head != null) {
            System.out.print(head.val);
            if (head.next != null) System.out.print(" -> ");
            head = head.next;
        }
        System.out.println();
    }

    public static void main(String[] args) {
        Solution solution = new Solution();
        ListNode head = solution.new ListNode(
            1,
            solution.new ListNode(2, solution.new ListNode(3, solution.new ListNode(4, solution.new ListNode(5))))
        );
        int k = 2;
        ListNode rotated = solution.rotateRight(head, k);
        solution.printList(rotated);
    }
}

