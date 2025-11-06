// 235. Lowest Common Ancestor of a Binary Search Tree
// --> LCA of a Binary Search Tree

class Solution {
    public class TreeNode{
        int val;
        TreeNode left;
        TreeNode right;
        TreeNode(int x) { val = x; }
    }
    
    public TreeNode lowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q) {
        if(root == null || root == p || root == q) return root;
        
        TreeNode left = lowestCommonAncestor(root.left, p, q);
        TreeNode right = lowestCommonAncestor(root.right, p, q);
        
        if(left != null && right != null) return root;
        
        return left != null ? left : right;
    }
    
    public static void main(String[] args) {
        Solution solution = new Solution();
        TreeNode root = solution.new TreeNode(6);
        root.left = solution.new TreeNode(2);
        root.right = solution.new TreeNode(8);
        root.left.left = solution.new TreeNode(0);
        root.left.right = solution.new TreeNode(4);
        root.right.left = solution.new TreeNode(7);
        root.right.right = solution.new TreeNode(9);
        root.left.right.left = solution.new TreeNode(3);
        root.left.right.right = solution.new TreeNode(5);

        TreeNode p = root.left;
        TreeNode q = root.right;

        TreeNode lca = solution.lowestCommonAncestor(root, p, q);
        System.out.println("Lowest Common Ancestor of " + p.val + " and " + q.val + ": " + lca.val);
    }
}