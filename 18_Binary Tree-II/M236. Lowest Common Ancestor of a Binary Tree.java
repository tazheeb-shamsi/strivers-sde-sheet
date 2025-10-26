// Lowest Common Ancestor(LCA) of a Binary Tree
// https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/

// Type             | Details
// -----------------+----------------------------------------------------
// Time Complexity  | O(N) – Each node is visited exactly once
// Space Complexity | O(H) – Recursion stack height (H = height of tree)
//                  | Balanced tree**: O(log N) where H = log N
//                  | Skewed tree** (like a linked list): O(N) where H = N

class Solution {
    public class TreeNode {
        int val;
        TreeNode left;
        TreeNode right;
        TreeNode(int x) { val = x; }
    }
    
    public TreeNode lowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q) {
        if (root == null || root == p || root == q) return root;
        TreeNode left = lowestCommonAncestor(root.left, p, q);
        TreeNode right = lowestCommonAncestor(root.right, p, q);
        return left == null ? right : right == null ? left : root;
    }
    
    public static void main(String[] args) {
        TreeNode root = new TreeNode(3);
        root.left = new TreeNode(5);
        root.right = new TreeNode(1);
        root.left.left = new TreeNode(6);
        root.left.right = new TreeNode(2);
        root.right.left = new TreeNode(0);
        root.right.right = new TreeNode(8);
        root.left.right.left = new TreeNode(7);
        root.left.right.right = new TreeNode(4);

        TreeNode p = root.left;
        TreeNode q = root.right;

        Solution solution = new Solution();
        TreeNode lca = solution.lowestCommonAncestor(root, p, q);
        System.out.println("Lowest Common Ancestor: " + lca.val);
    }
}