// 234. Palindrome Linked List
// Check if a LinkedList is palindrome or not.
// https://leetcode.com/problems/palindrome-linked-list


class Solution {

    // ----- Singly Linked List Node -----
    public static class ListNode {

        int val;
        ListNode next;
        ListNode() {}
        ListNode(int v) {
            this.val = v;
        }
        ListNode(int v, ListNode n) {
            this.val = v;
            this.next = n;
        }
    }

    public boolean isPalindrome(ListNode head) {
        if (head == null || head.next == null) return true;

        // 1) Find middle (slow at mid)
        ListNode slow = head,
            fast = head;
        while (fast != null && fast.next != null) {
            slow = slow.next;
            fast = fast.next.next;
        }

        // 2) If odd length, skip the middle
        if (fast != null) {
            // odd number of nodes
            slow = slow.next;
        }

        // 3) Reverse the second half starting at slow
        ListNode second = reverse(slow);

        // 4) Compare first half and reversed second half
        ListNode p1 = head,
            p2 = second;
        boolean ok = true;
        while (ok && p2 != null) {
            if (p1.val != p2.val) ok = false;
            p1 = p1.next;
            p2 = p2.next;
        }

        // 5) (Optional) Restore second half
        // reverse(second); // uncomment if you need to keep the list structure intact

        return ok;
    }

    private ListNode reverse(ListNode node) {
        ListNode prev = null,
            curr = node;
        while (curr != null) {
            ListNode nxt = curr.next;
            curr.next = prev;
            prev = curr;
            curr = nxt;
        }
        return prev;
    }

    public static void main(String[] args) {
        Solution s = new Solution();
        ListNode head = new ListNode(
            1,
            new ListNode(2, new ListNode(2, new ListNode(1)))
        );
        boolean result = s.isPalindrome(head);
        System.out.println(result); // true
    }
}
