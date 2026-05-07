// 160. Intersection of Two Linked Lists
// Find intersection point of Y LinkedList
// https://leetcode.com/problems/intersection-of-two-linked-lists

class Solution {

    public static class ListNode {
        int val;
        ListNode next;
        ListNode(int x) {
            val = x;
            next = null;
        }
    }

    public ListNode getIntersectionNode(ListNode headA, ListNode headB) {
        ListNode a = headA;
        ListNode b = headB;

        while (a != b) {
            a = a == null ? headB : a.next;
            b = b == null ? headA : b.next;
        }

        return a;
    }

    public static void main(String[] args) {
        ListNode headA = new ListNode(1);
        headA.next = new ListNode(2);
        headA.next.next = new ListNode(3);

        ListNode headB = new ListNode(4);
        headB.next = new ListNode(5);
        headB.next.next = headA.next;
        Solution solution = new Solution();

        ListNode intersection = solution.getIntersectionNode(headA, headB);
        System.out.println(intersection.val); // Output: 2
    }
}
