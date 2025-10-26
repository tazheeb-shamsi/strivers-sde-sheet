// 662. Maximum Width of Binary Tree
// https://leetcode.com/problems/maximum-width-of-binary-tree/

import java.util.*;

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

    public static class Pair {
        TreeNode node;
        int index;
        
        Pair(TreeNode node, int index) {
            this.node = node;
            this.index = index;
        }
    }

    public int widthOfBinaryTree(TreeNode root) {
        if (root == null) return 0;
        
        int maxWidth = 0;
        Queue<Pair> queue = new LinkedList<>();
        queue.offer(new Pair(root, 0));
        
        while (!queue.isEmpty()) {
            int size = queue.size();
            int minIndex = queue.peek().index; // Normalize to prevent overflow
            int left = 0, right = 0;
            
            for (int i = 0; i < size; i++) {
                Pair pair = queue.poll();
                TreeNode node = pair.node;
                int index = pair.index - minIndex; // Normalize
                
                if (i == 0) left = index;
                if (i == size - 1) right = index;
                
                // Correct index formula for 0-indexed complete binary tree
                if (node.left != null) {
                    queue.offer(new Pair(node.left, 2 * index));
                }
                if (node.right != null) {
                    queue.offer(new Pair(node.right, 2 * index + 1));
                }
            }
            
            maxWidth = Math.max(maxWidth, right - left + 1);
        }
        
        return maxWidth;
    }
    
    public static void main(String[] args) {
        // Test case 1: [1,3,2,5,3,null,9]
        TreeNode root1 = new TreeNode(1);
        root1.left = new TreeNode(3);
        root1.right = new TreeNode(2);
        root1.left.left = new TreeNode(5);
        root1.left.right = new TreeNode(3);
        root1.right.right = new TreeNode(9);
        
        Solution solution = new Solution();
        System.out.println("Width: " + solution.widthOfBinaryTree(root1)); // Expected: 4
        
        // Test case 2: [1,3,2,5,null,null,9,6,null,7]
        TreeNode root2 = new TreeNode(1);
        root2.left = new TreeNode(3);
        root2.right = new TreeNode(2);
        root2.left.left = new TreeNode(5);
        root2.right.right = new TreeNode(9);
        root2.left.left.left = new TreeNode(6);
        root2.right.right.right = new TreeNode(7);
        
        System.out.println("Width: " + solution.widthOfBinaryTree(root2)); // Expected: 7
    }
}
