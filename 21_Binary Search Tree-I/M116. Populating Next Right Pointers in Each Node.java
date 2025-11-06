// 116. Populating Next Right Pointers in Each Node
// https://leetcode.com/problems/populating-next-right-pointers-in-each-node/

// Definition for a Node.
class Node {
    public int val;
    public Node left;
    public Node right;
    public Node next;

    public Node() {}
    public Node(int _val) { val = _val; }
    public Node(int _val, Node _left, Node _right, Node _next) {
        val = _val;
        left = _left;
        right = _right;
        next = _next;
    }
}

class Solution {
    public Node connect(Node root) {
        if (root == null) return null;

        Node leftmost = root;
        while (leftmost.left != null) {
            Node head = leftmost;
            while (head != null) {
                head.left.next = head.right;
                if (head.next != null)
                    head.right.next = head.next.left;
                head = head.next;
            }
            leftmost = leftmost.left;
        }
        return root;
    }

    // Helper method to return output in [1,#,2,3,#,4,5,6,7,#] format
    public String getLevelsString(Node root) {
        if (root == null) return "[]";
        StringBuilder sb = new StringBuilder("[");
        Node levelStart = root;

        while (levelStart != null) {
            Node current = levelStart;
            while (current != null) {
                sb.append(current.val).append(",");
                current = current.next;
            }
            sb.append("#,");
            levelStart = levelStart.left;
        }

        // Remove last comma and close bracket
        if (sb.charAt(sb.length() - 1) == ',')
            sb.deleteCharAt(sb.length() - 1);
        sb.append("]");
        return sb.toString();
    }
}

class Main {
    public static void main(String[] args) {
        Node root = new Node(1);
        root.left = new Node(2);
        root.right = new Node(3);
        root.left.left = new Node(4);
        root.left.right = new Node(5);
        root.right.left = new Node(6);
        root.right.right = new Node(7);

        Solution solution = new Solution();
        Node result = solution.connect(root);

        System.out.println("Output: " + solution.getLevelsString(result));
    }
}

