// TUF: Inorder successor and predecessor in BST
// --> Predecessor and Successor
// --> Find the inorder predecessor/successor of a given Key in BST.
// https://takeuforward.org/plus/dsa/problems/inorder-successor-and-predecessor-in-bst

import java.util.*; 

class TreeNode {
    int data;
    TreeNode left;
    TreeNode right;
    
    TreeNode(int val) {
        data = val;
        left = null;
        right = null;
    }
}

class Solution {
    List<Integer> succPredBST(TreeNode root, int key) {
        TreeNode predecessor = null;
        TreeNode successor = null;
        
        TreeNode current = root;
        while (current != null) {
            if (current.data == key) {
                // Find predecessor (max in left subtree)
                if (current.left != null) {
                    TreeNode temp = current.left;
                    while (temp.right != null) {
                        temp = temp.right;
                    }
                    predecessor = temp;
                }

                // Find successor (min in right subtree)
                if (current.right != null) {
                    TreeNode temp = current.right;
                    while (temp.left != null) {
                        temp = temp.left;
                    }
                    successor = temp;
                }
                break;
            } else if (current.data < key) {
                predecessor = current;
                current = current.right;
            } else {
                successor = current;
                current = current.left;
            }
        }
        
        List<Integer> result = new ArrayList<>();
        result.add(predecessor != null ? predecessor.data : -1);
        result.add(successor != null ? successor.data : -1);
        return result;
    }
}

class Main {
    public static void main(String[] args) {
        TreeNode root = new TreeNode(10);
        root.left = new TreeNode(5);
        root.right = new TreeNode(15);
        root.left.left = new TreeNode(3);
        root.left.right = new TreeNode(7);
        root.right.left = new TreeNode(12);
        root.right.right = new TreeNode(18);
        
        Solution solution = new Solution();
        List<Integer> result = solution.succPredBST(root, 10);
        System.out.println("Predecessor: " + result.get(0));
        System.out.println("Successor: " + result.get(1));
    }
}
