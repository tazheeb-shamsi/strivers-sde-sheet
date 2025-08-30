// 138. Copy List with Random Pointer.
// https://leetcode.com/problems/copy-list-with-random-pointer/


class Solution {
    static class Node {
        int val;
        Node next;
        Node random;
    
        public Node(int val) {
            this.val = val;
            this.next = null;
            this.random = null;
        }
    }
    
    public Node copyRandomList(Node head) {
        if (head == null) return null;

        // Create a copy of each node and insert it after the original node
        Node curr = head;
        while (curr != null) {
            Node copy = new Node(curr.val);
            copy.next = curr.next;
            curr.next = copy;
            curr = copy.next;
        }

        // Set the random pointers for the copied nodes
        curr = head;
        while (curr != null) {
            if (curr.random != null) {
                curr.next.random = curr.random.next;
            }
            curr = curr.next.next;
        }

        // Separate the original and copied lists
        Node original = head;
        Node copy = head.next;
        Node copyHead = copy;
        while (original != null) {
            original.next = original.next.next;
            if (copy.next != null) {
                copy.next = copy.next.next;
            }
            original = original.next;
            copy = copy.next;
        }

        return copyHead;
    }
    
    public static void main(String[] args) {
        Solution solution = new Solution();
        
        Node node1 = new Node(1);
        Node node2 = new Node(2);
        Node node3 = new Node(3);
        Node node4 = new Node(4);

        node1.next = node2;
        node2.next = node3;
        node3.next = node4;

        node1.random = node3;
        node2.random = node4;
        node3.random = node2;
        node4.random = node1;

        Node copiedList = solution.copyRandomList(node1);
        
        Node curr = copiedList;
        while (curr != null) {
            System.out.print(curr.val + " ");
            curr = curr.next;
        }
    }
}