//105. Construct Binary Tree from Preorder and Inorder Traversal
// https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/

/* Problem Statement:
 * Given two integer arrays preorder and inorder where preorder is the preorder traversal of a
 * binary tree and inorder is the inorder traversal of the same tree, construct and return the binary tree.
 */

import java.util.HashMap;
import java.util.Map;

class Solution {
    public static class TreeNode {
        int val;
        TreeNode left;
        TreeNode right;
        TreeNode() {}
        TreeNode(int val) {
            this.val = val;
        }
        TreeNode(int val, TreeNode left, TreeNode right) {
            this.val = val;
            this.left = left;
            this.right = right;
        }
    }

    private int preIndex = 0;
    private int inIndex = 0;

    public TreeNode buildTree(int[] preorder, int[] inorder) {
        return construct(preorder, inorder, Integer.MAX_VALUE);
    }

    private TreeNode construct(int[] preorder, int[] inorder, int limit) {
        if (preIndex == preorder.length) {
            return null;
        }

        if (inorder[inIndex] == limit) {
            inIndex++;
            return null;
        }

        TreeNode node = new TreeNode(preorder[preIndex++]);
        node.left = construct(preorder, inorder, node.val);
        node.right = construct(preorder, inorder, limit);

        return node;
    }

    public static void main(String[] args) {
        int[] preorder = { 3, 9, 20, 15, 7 };
        int[] inorder = { 9, 3, 15, 20, 7 };
        Solution solution = new Solution();
        TreeNode root = solution.buildTree(preorder, inorder);
        System.out.println(root.val);  // Output: 3
        System.out.println(root.left.val);  // Output: 9
        System.out.println(root.right.val);  // Output: 20
    }
}
