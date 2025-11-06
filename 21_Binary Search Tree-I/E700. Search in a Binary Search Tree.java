// 700. Search in a Binary Search Tree --> Search given Key in BST
// https://leetcode.com/problems/search-in-a-binary-search-tree/

import java.util.LinkedList;
import java.util.Queue;
import java.util.List;
import java.util.ArrayList;

class Solution {

    public class TreeNode {

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

    public TreeNode searchBST(TreeNode root, int val) {
        if (root == null || root.val == val) return root;
        if (root.val > val) return searchBST(root.left, val);
        else return searchBST(root.right, val);
    }

    public void printTree(TreeNode root) {
        if (root == null) {
            System.out.println("[]");
            return;
        }

        Queue<TreeNode> q = new LinkedList<>();
        List<String> out = new ArrayList<>();
        q.add(root);

        while (!q.isEmpty()) {
            TreeNode node = q.poll();
            if (node == null) {
                out.add("null");
            } else {
                out.add(String.valueOf(node.val));
                q.add(node.left);
                q.add(node.right);
            }
        }

        // Trim trailing "null" values
        int last = out.size() - 1;
        while (last >= 0 && out.get(last).equals("null")) {
            last--;
        }

        // Build final string up to last index
        StringBuilder sb = new StringBuilder();
        sb.append("[");
        for (int i = 0; i <= last; i++) {
            sb.append(out.get(i));
            if (i != last) sb.append(",");
        }
        sb.append("]");
        System.out.println(sb.toString());
    }

    public static void main(String[] args) {
        Solution solution = new Solution();
        // Build the tree [4,2,7,1,3]
        TreeNode root = solution.new TreeNode(4);
        root.left = solution.new TreeNode(2);
        root.right = solution.new TreeNode(7);
        root.left.left = solution.new TreeNode(1);
        root.left.right = solution.new TreeNode(3);

        int val = 2;
        TreeNode result = solution.searchBST(root, val);

        System.out.print("Output: ");
        solution.printTree(result);
    }
}
