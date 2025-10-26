// 145. Binary Tree Postorder Traversal
// https://leetcode.com/problems/binary-tree-postorder-traversal/

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Stack;

class Solution{
     public static class TreeNode {
          int val;
          TreeNode left;
          TreeNode right;
          TreeNode() {}
          TreeNode(int val) { this.val = val; }
          TreeNode(int val, TreeNode left, TreeNode right) {
              this.val = val;
              this.left = left;
              this.right = right;
          }
      }
      
      public List<Integer> postorderTraversal(TreeNode root) {
              
                List<Integer> result = new ArrayList<>();
                if (root == null) return result;
                
                Stack<TreeNode> stack = new Stack<>();
                stack.push(root);
                
                while (!stack.isEmpty()) {
                    TreeNode node = stack.pop();
                    result.add(node.val);
                    
                    if (node.left != null) stack.push(node.left);
                    if (node.right != null) stack.push(node.right);
                }
                
                Collections.reverse(result);
                return result;
      }
      
      public static void main(String[] args) {
          Solution solution = new Solution();
          TreeNode root = new TreeNode(1);
          root.left = new TreeNode(2);
          root.right = new TreeNode(3);
          root.left.left = new TreeNode(4);
          root.left.right = new TreeNode(5);
          root.right.left = new TreeNode(6);
          root.right.right = new TreeNode(7);
          
          List<Integer> result = solution.postorderTraversal(root);
          System.out.println(result);
      }
}