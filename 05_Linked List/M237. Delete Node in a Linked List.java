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
}
