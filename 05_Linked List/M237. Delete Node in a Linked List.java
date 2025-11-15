// Delete Node in a Linked List
// https://leetcode.com/problems/delete-node-in-a-linked-list

class Solution {
    public static class ListNode{
        int val;
        ListNode next;
        ListNode (int x){ val = x;}
    }

    public void deleteNode(ListNode node){
        node.val = node.next.val;
        node.next = node.next.next;

        // No need to explicitly set node.next.next = null as it will be garbage collected

    }

    public static void main(String[] args){
        Solution solution = new Solution();

        ListNode head = new ListNode(1);
        head.next = new ListNode(2);
        head.next.next = new ListNode(3);
        head.next.next.next = new ListNode(4);
        head.next.next.next.next = new ListNode(5);

        solution.deleteNode(head.next.next);

        ListNode curr = head;
        while (curr != null) {
            System.out.print(curr.val + " ");
            curr = curr.next;
        }

    }
}
