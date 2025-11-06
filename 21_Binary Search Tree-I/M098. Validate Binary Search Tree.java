// 98. Validate Binary Search Tree
// --> Check is a BT is BST or not?
// https://leetcode.com/problems/validate-binary-search-tree/

class Solution {
    public class TreeNode {
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
    
    public boolean isValidBST(TreeNode root) {
        return isValidBST(root, Long.MIN_VALUE, Long.MAX_VALUE);
    }
    
    private boolean isValidBST(TreeNode node, long minVal, long maxVal) {
        if (node == null) return true;
        if (node.val <= minVal || node.val >= maxVal) return false;
        return isValidBST(node.left, minVal, node.val) && isValidBST(node.right, node.val, maxVal);
    }
    
    public static void main(String[] args) {
        Solution solution = new Solution();
        TreeNode root = solution.new TreeNode(2);
        root.left = solution.new TreeNode(1);
        root.right = solution.new TreeNode(3);
        System.out.println(solution.isValidBST(root)); // Output: true
    }
}
