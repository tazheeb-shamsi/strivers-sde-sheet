// Vertical order traversal
// https://leetcode.com/problems/vertical-order-traversal-of-a-binary-tree/

import java.util.*;

class Solution {
    public static class TreeNode {
        int val;
        TreeNode left, right;
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
        int col;
        Pair(TreeNode node, int col) {
            this.node = node;
            this.col = col;
        }
    }

    public List<List<Integer>> verticalTraversal(TreeNode root) {
        Map<Integer, List<Integer>> map = new TreeMap<>();
        Queue<Pair> queue = new LinkedList<>();
        queue.offer(new Pair(root, 0));

        while (!queue.isEmpty()) {
            int size = queue.size();
            Map<Integer, List<Integer>> levelMap = new HashMap<>();

            for (int i = 0; i < size; i++) {
                Pair pair = queue.poll();
                TreeNode node = pair.node;
                int col = pair.col;

                levelMap.computeIfAbsent(col, k -> new ArrayList<>()).add(node.val);

                if (node.left != null) queue.offer(new Pair(node.left, col - 1));
                if (node.right != null) queue.offer(new Pair(node.right, col + 1));
            }

            for (int col : levelMap.keySet()) {
                List<Integer> list = levelMap.get(col);
                Collections.sort(list);
                map.computeIfAbsent(col, k -> new ArrayList<>()).addAll(list);
            }
        }

        return new ArrayList<>(map.values());
    }

    public static void main(String[] args) {
        TreeNode root = new TreeNode(3);
        root.left = new TreeNode(9);
        root.right = new TreeNode(20);
        root.right.left = new TreeNode(15);
        root.right.right = new TreeNode(7);

        Solution solution = new Solution();
        List<List<Integer>> result = solution.verticalTraversal(root);
        System.out.println(result); // ✅ Output: [[9], [3, 15], [20], [7]]
    }
}

