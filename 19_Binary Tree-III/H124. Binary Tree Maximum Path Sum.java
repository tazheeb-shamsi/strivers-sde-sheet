// Binary Tree Maximum Path Sum
// https://leetcode.com/problems/binary-tree-maximum-path-sum/description/ 

/**
 * A path in a binary tree is a sequence of nodes where each pair of adjacent nodes
 * in the sequence has an edge connecting them. A node can only appear in the sequence at most once.
 * Note that the path does not need to pass through the root.
 
 * The path sum of a path is the sum of the node's values in the path.
 
 * Given the root of a binary tree, return the maximum path sum of any non-empty path.
 */
 
 class Solution {
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
     
     public int maxPathSum(TreeNode root) {
        int[] maxSum = new int[1];
        maxSum[0] = Integer.MIN_VALUE;
        maxPathSum(root, maxSum);
        return maxSum[0];
     }
     
     private int maxPathSum(TreeNode node, int[] maxSum) {
        if (node == null) return 0;
        
        int left = Math.max(0, maxPathSum(node.left, maxSum));
        int right = Math.max(0, maxPathSum(node.right, maxSum));
        
        maxSum[0] = Math.max(maxSum[0], node.val + left + right);
        
        return node.val + Math.max(left, right);
     }
     
     public static void main(String[] args) {
        TreeNode root = new TreeNode(1);
        root.left = new TreeNode(2);
        root.right = new TreeNode(3);
        
        Solution solution = new Solution();
        int maxPathSum = solution.maxPathSum(root);
        System.out.println("Maximum Path Sum: " + maxPathSum);
     }
 }