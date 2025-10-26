// TUF: Binary Tree - Morris Preorder Traversal
// https://leetcode.com/problems/binary-tree-preorder-traversal/

/**
    Given root of binary tree, return the preorder traversal of the binary tree.

    Morris preorder Traversal is a tree traversal algorithm aiming to achieve a space complexity of O(1)
    without recursion or an external data structure.

    Examples:
    Input : root = [1, 4, null, 4 2]
    Output : [1, 4, 4, 2]
 */

 import java.util.*;
 
 class Solution {
     public static class TreeNode {
         int val;
         TreeNode left, right;
         TreeNode(int val) { this.val = val; }
         TreeNode(int val, TreeNode left, TreeNode right) {
             this.val = val;
             this.left = left;
             this.right = right;
         }
     }
 
     public List<Integer> preorderTraversal(TreeNode root) {
         List<Integer> result = new ArrayList<>();
         TreeNode curr = root;
 
         while (curr != null) {
             if (curr.left == null) {
                 // Visit node, then move right
                 result.add(curr.val);
                 curr = curr.right;
             } else {
                 // Find inorder predecessor
                 TreeNode predecessor = curr.left;
                 while (predecessor.right != null && predecessor.right != curr) {
                     predecessor = predecessor.right;
                 }
 
                 if (predecessor.right == null) {
                     // Visit node before creating the thread (Preorder)
                     result.add(curr.val);
                     predecessor.right = curr;
                     curr = curr.left;
                 } else {
                     // Revert the thread
                     predecessor.right = null;
                     curr = curr.right;
                 }
             }
         }
 
         return result;
     }
 
     public static void main(String[] args) {
         Solution s = new Solution();
 
         // Example: root = [1, 4, null, 4, 2]
         TreeNode root = new TreeNode(1);
         root.left = new TreeNode(4);
         root.left.left = new TreeNode(4);
         root.left.right = new TreeNode(2);
 
         List<Integer> preorder = s.preorderTraversal(root);
         System.out.println(preorder); // ✅ Output: [1, 4, 4, 2]
     }
 }
