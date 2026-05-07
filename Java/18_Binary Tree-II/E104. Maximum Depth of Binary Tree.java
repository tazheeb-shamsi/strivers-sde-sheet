// Maximum Depth of Binary Tree.
// https://leetcode.com/problems/maximum-depth-of-binary-tree/   

// Type              |  Details                                           
// ------------------+----------------------------------------------------
// Time Complexity   |  O(N) – Each node is visited exactly once          
// Space Complexity  |  O(H) – Recursion stack height (H = height of tree)

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
    
    public int maxDepth(TreeNode root) {
        if (root == null) return 0;

        // Recursively find the depths of left and right subtrees
        int leftDepth = maxDepth(root.left);
        int rightDepth = maxDepth(root.right);
        return 1 + Math.max(leftDepth, rightDepth);
    }
    
    public static void main(String[] args) {
        TreeNode root = new TreeNode(3);
        root.left = new TreeNode(9);
        root.right = new TreeNode(20);
        root.right.left = new TreeNode(15);
        root.right.right = new TreeNode(7);

        Solution solution = new Solution();
        int depth = solution.maxDepth(root);
        System.out.println("Maximum Depth: " + depth);
    }
}

  