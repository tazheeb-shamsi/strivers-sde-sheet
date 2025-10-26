// 545.Boundary Traversal of Binary Tree
// https://leetcode.com/problems/boundary-of-binary-tree/

// Type             | Details
// -----------------+----------------------------------------------------
// Time Complexity  | O(N) – Left boundary O(H) + Leaves O(N) + Right boundary O(H) = O(N)
// Space Complexity | O(N) – O(H) recursion stack for leaves + O(H) stack for right boundary + O(N) result list

import java.util.ArrayList;
import java.util.List;
import java.util.Stack;

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

    public List<Integer> boundaryOfBinaryTree(TreeNode root) {
        List<Integer> result = new ArrayList<>();
        if (root == null) return result;

        result.add(root.val);

        // Add left boundary
        TreeNode curr = root.left;
        while (curr != null) {
            if (!isLeaf(curr)) result.add(curr.val);
            if (curr.left != null) curr = curr.left;
            else curr = curr.right;
        }

        // Add leaves
        addLeaves(root, result);

        // Add right boundary in reverse order
        Stack<Integer> stack = new Stack<>();
        curr = root.right;
        while (curr != null) {
            if (!isLeaf(curr)) stack.push(curr.val);
            if (curr.right != null) curr = curr.right;
            else curr = curr.left;
        }
        while (!stack.isEmpty()) result.add(stack.pop());

        return result;
    }

    private void addLeaves(TreeNode node, List<Integer> result) {
        if (node == null) return;
        if (isLeaf(node)) result.add(node.val);
        addLeaves(node.left, result);
        addLeaves(node.right, result);
    }

    private boolean isLeaf(TreeNode node) {
        return node != null && node.left == null && node.right == null;
    }

    public static void main(String[] args) {
        TreeNode root = new TreeNode(1);
        root.left = new TreeNode(2);
        root.right = new TreeNode(3);
        root.left.left = new TreeNode(4);
        root.left.right = new TreeNode(5);
        root.right.left = new TreeNode(6);
        root.right.right = new TreeNode(7);
        Solution solution = new Solution();
        List<Integer> boundary = solution.boundaryOfBinaryTree(root);
        System.out.println("boundary: " + boundary); // output: [1, 2, 4, 5, 6, 7, 3]
    }
}
