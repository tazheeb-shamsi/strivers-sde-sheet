// TUF: Bottom view of Binary Tree
// https://takeuforward.org/plus/dsa/problems/bottom-view-of-bt

import java.util.*;

class Solution {
    public static class TreeNode {
        int val;
        TreeNode left, right;
        TreeNode(int val) { this.val = val; }
    }

    // Bottom View
    public List<Integer> bottomView(TreeNode root) {
        List<Integer> result = new ArrayList<>();
        if (root == null) return result;

        Map<Integer, Integer> map = new TreeMap<>(); // HD -> node.val
        Queue<Pair> queue = new LinkedList<>();
        queue.offer(new Pair(root, 0));

        while (!queue.isEmpty()) {
            Pair p = queue.poll();
            TreeNode node = p.node;
            int hd = p.hd;

            // For bottom view, overwrite value at HD every time
            map.put(hd, node.val);

            if (node.left != null) queue.offer(new Pair(node.left, hd - 1));
            if (node.right != null) queue.offer(new Pair(node.right, hd + 1));
        }

        for (int val : map.values()) {
            result.add(val);
        }
        return result;
    }

    // Helper class to store node and horizontal distance
    private static class Pair {
        TreeNode node;
        int hd;
        Pair(TreeNode n, int h) { node = n; hd = h; }
    }

    public static void main(String[] args) {
        Solution sol = new Solution();

        // Build tree: [1, 2, 3, null, 5, null, 4]
        TreeNode root = new TreeNode(1);
        root.left = new TreeNode(2);
        root.right = new TreeNode(3);
        root.left.right = new TreeNode(5);
        root.right.right = new TreeNode(4);

        System.out.println("Bottom View: " + sol.bottomView(root)); // [2, 5, 3, 4]
    }
}
