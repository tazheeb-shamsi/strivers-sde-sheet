// Flattening of a LinkedList
// https://www.geeksforgeeks.org/problems/flattening-a-linked-list/1

/*
Given a linked list containing n head nodes where every node in the linked list contains two pointers:
(i) next points to the next node in the list.
(ii) bottom pointer to a sub-linked list where the current node is the head.
Each of the sub-linked lists nodes and the head nodes are sorted in ascending order based on their data.
Your task is to flatten the linked list such that all the nodes appear in a single level while maintaining the sorted order.

Note:
1. ↓ represents the bottom pointer and -> represents the next pointer.
2. The flattened list will be printed using the bottom pointer instead of the next pointer.
*/

class Solution {
    public static class Node {
        int data;
        Node next;
        Node bottom;

        Node(int data) {
            this.data = data;
            this.next = null;
            this.bottom = null;
        }
    }

    Node flatten(Node head) {
        if (head == null || head.next == null) return head;

        // Flatten the next part first
        head.next = flatten(head.next);

        // Merge current list with flattened next list
        head = merge(head, head.next);

        return head;
    }

    Node merge(Node a, Node b) {
        if (a == null) return b;
        if (b == null) return a;

        Node dummy = new Node(0);
        Node tail = dummy;

        while (a != null && b != null) {
            if (a.data < b.data) {
                tail.bottom = a;
                a = a.bottom;
            } else {
                tail.bottom = b;
                b = b.bottom;
            }
            tail = tail.bottom;
        }

        tail.bottom = (a != null) ? a : b;
        return dummy.bottom;
    }

    public static void main(String[] args) {
        // Create a test linked list with multiple levels
        Node head = new Node(5);
        head.next = new Node(10);
        head.next.next = new Node(19);
        head.next.next.next = new Node(28);

        // Add bottom nodes to first head node (5)
        head.bottom = new Node(7);
        head.bottom.bottom = new Node(8);
        head.bottom.bottom.bottom = new Node(30);

        // Add bottom nodes to second head node (10)
        head.next.bottom = new Node(20);

        // Add bottom nodes to third head node (19)
        head.next.next.bottom = new Node(22);
        head.next.next.bottom.bottom = new Node(50);

        // Add bottom nodes to fourth head node (28)
        head.next.next.next.bottom = new Node(35);
        head.next.next.next.bottom.bottom = new Node(40);
        head.next.next.next.bottom.bottom.bottom = new Node(45);

        Solution solution = new Solution();
        Node flattened = solution.flatten(head);

        // Print the flattened list
        System.out.print("Flattened list: ");
        while (flattened != null) {
            System.out.print(flattened.data + " ");
            flattened = flattened.bottom;
        }
        System.out.println();
    }
}

