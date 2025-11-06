// 108. Convert Sorted Array to Binary Search Tree
// --> Construct BST from given keys
// https://leetcode.com/problems/convert-sorted-array-to-binary-search-tree/


import java.util.*;

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

    public TreeNode sortedArrayToBST(int[] nums) {
        return buildBST(nums, 0, nums.length - 1);
    }

    private TreeNode buildBST(int[] nums, int left, int right) {
        if (left > right) return null;
        // ✅ use right-biased mid
        int mid = (left + right + 1) / 2;
        TreeNode root = new TreeNode(nums[mid]);
        root.left = buildBST(nums, left, mid - 1);
        root.right = buildBST(nums, mid + 1, right);
        return root;
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
            if (node == null) out.add("null");
            else {
                out.add(String.valueOf(node.val));
                q.add(node.left);
                q.add(node.right);
            }
        }

        int last = out.size() - 1;
        while (last >= 0 && out.get(last).equals("null")) last--;

        System.out.print("[");
        for (int i = 0; i <= last; i++) {
            System.out.print(out.get(i));
            if (i < last) System.out.print(",");
        }
        System.out.println("]");
    }

    public static void main(String[] args) {
        Solution solution = new Solution();
        int[] nums = { -10, -3, 0, 5, 9 };
        TreeNode root = solution.sortedArrayToBST(nums);
        System.out.print("Output: ");
        solution.printTree(root);
    }
}
