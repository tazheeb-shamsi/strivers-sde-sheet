// Pre, Post, Inorder in one traversal
// https://takeuforward.org/plus/dsa/problems/pre,-post,-inorder-in-one-traversal

/*
Given a binary tree with root node. Return the In-order,Pre-order and Post-order traversal of the binary tree.

Examples:
    Input : root = [1, 3, 4, 5, 2, 7, 6 ]
    Output : [ [5, 3, 2, 1, 7, 4, 6] , [1, 3, 5, 2, 4, 7, 6] , [5, 2, 3, 7, 6, 4, 1] ]
Explanation :
- The In-order traversal is [5, 3, 2, 1, 7, 4, 6].
- The Pre-order traversal is [1, 3, 5, 2, 4, 7, 6].
- The Post-order traversal is [5, 2, 3, 7, 6, 4, 1].
*/

import java.util.*;

class Solution {

    public static class TreeNode {
        int val;
        TreeNode left;
        TreeNode right;

        TreeNode(int val) {
            this.val = val;
        }
    }

    // Recursive approach
    // Method to get all three traversals
    public List<List<Integer>> getTreeTraversals(TreeNode root) {
        List<Integer> inorder = new ArrayList<>();
        List<Integer> preorder = new ArrayList<>();
        List<Integer> postorder = new ArrayList<>();

        inorderTraversal(root, inorder);
        preorderTraversal(root, preorder);
        postorderTraversal(root, postorder);

        List<List<Integer>> result = new ArrayList<>();
        result.add(inorder);
        result.add(preorder);
        result.add(postorder);

        return result;
    }

    // Inorder: Left -> Root -> Right
    private void inorderTraversal(TreeNode node, List<Integer> result) {
        if (node == null) return;
        inorderTraversal(node.left, result);
        result.add(node.val);
        inorderTraversal(node.right, result);
    }

    // Preorder: Root -> Left -> Right
    private void preorderTraversal(TreeNode node, List<Integer> result) {
        if (node == null) return;
        result.add(node.val);
        preorderTraversal(node.left, result);
        preorderTraversal(node.right, result);
    }

    // Postorder: Left -> Right -> Root
    private void postorderTraversal(TreeNode node, List<Integer> result) {
        if (node == null) return;
        postorderTraversal(node.left, result);
        postorderTraversal(node.right, result);
        result.add(node.val);
    }

    public static void main(String[] args) {
        // Build the tree from example: [1, 3, 4, 5, 2, 7, 6]
        //        1
        //       / \
        //      3   4
        //     / \ / \
        //    5  2 7  6

        TreeNode root = new TreeNode(1);
        root.left = new TreeNode(3);
        root.right = new TreeNode(4);
        root.left.left = new TreeNode(5);
        root.left.right = new TreeNode(2);
        root.right.left = new TreeNode(7);
        root.right.right = new TreeNode(6);

        Solution solution = new Solution();
        List<List<Integer>> result = solution.getTreeTraversals(root);

        System.out.println("Inorder:   " + result.get(0));
        System.out.println("Preorder:  " + result.get(1));
        System.out.println("Postorder: " + result.get(2));

        // Expected output:
        // Inorder:   [5, 3, 2, 1, 7, 4, 6]
        // Preorder:  [1, 3, 5, 2, 4, 7, 6]
        // Postorder: [5, 2, 3, 7, 6, 4, 1]
    }
}
