// Flatten Binary Tree to Linked List
// https://leetcode.com/problems/flatten-binary-tree-to-linked-list/


class Solution {
    public static class TreeNode {
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
    
    public void flatten(TreeNode root) {
        if(null==root){
            return;
        }
        while(null!=root){
            if(null!=root.left){
                TreeNode left=root.left;
                TreeNode current=root.left;
                while(null!=current.right){
                    current=current.right;
                }
                current.right=root.right;
                root.left=null;
                root.right=left;
            }
            root=root.right;
        }
    }
    
    public static void main(String[] args) {
           Solution solution = new Solution();
           TreeNode root = new TreeNode(1);
           root.left = new TreeNode(2);
           root.right = new TreeNode(5);
           root.left.left = new TreeNode(3);
           root.left.right = new TreeNode(4);
           root.right.right = new TreeNode(6);
           
           solution.flatten(root);
   
           // Print flattened list
           TreeNode curr = root;
           while (curr != null) {
               System.out.print(curr.val + " ");
               curr = curr.right;
           }
       }
}