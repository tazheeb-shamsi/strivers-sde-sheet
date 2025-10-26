// Mirror Tree -> Mirror a binary tree
// Check if Binary Tree is the mirror of itself or not
// https://takeuforward.org/plus/dsa/problems/check-for-symmetrical-bts

class Solution{
    public static class TreeNode {
        int data;
        TreeNode left;
        TreeNode right;
        TreeNode(int val) { data = val; left = null; right = null; }
    }
    
    public boolean isSymmetric(TreeNode root) {
        if (root == null) return true;
        return isMirror(root.left, root.right);
    }

    private boolean isMirror(TreeNode left, TreeNode right) {
        if (left == null && right == null) return true;
        if (left == null || right == null) return false;
        return left.data == right.data && isMirror(left.left, right.right) && isMirror(left.right, right.left);
    }
    
    public static void main(String[] args) {
        TreeNode root = new TreeNode(1);
        root.left = new TreeNode(2);
        root.right = new TreeNode(2);
        root.left.left = new TreeNode(3);
        root.left.right = new TreeNode(4);
        root.right.left = new TreeNode(4);
        root.right.right = new TreeNode(3);

        Solution solution = new Solution();
        System.out.println(solution.isSymmetric(root)); // Output: true
    }
}