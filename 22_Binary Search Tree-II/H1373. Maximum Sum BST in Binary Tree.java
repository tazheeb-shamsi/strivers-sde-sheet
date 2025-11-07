// 1373. Maximum Sum BST in Binary Tree
// https://leetcode.com/problems/maximum-sum-bst-in-binary-tree/

class TreeNode {
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

class Solution {
    int max =0;

    public int maxSumBST(TreeNode root) {
        helper(root);
        return max;
    }
    public int helper(TreeNode root){
        if(root == null) return 0;

        int left = helper(root.left);
        int right = helper(root.right);


        if(left == Integer.MIN_VALUE || right == Integer.MIN_VALUE)
        return Integer.MIN_VALUE;

        if(root.left != null){
            TreeNode curr = root.left;
            while(curr.right !=null){
                curr=curr.right;
            }
            if(curr.val >=root.val){
                return Integer.MIN_VALUE;
            }


        }
        if(root.right !=null){
            TreeNode curr = root.right;
            while(curr.left != null){
                curr=curr.left;
            }
            if(curr.val <= root.val){
                return Integer.MIN_VALUE;
            }

        }
        int sum = root.val + left + right;
        if(max < sum) max=sum;

        return sum;
    }
}
    
class Main{
    public static void main(String[] args) {
        Solution solution = new Solution();
        
        // Test Case 1: [1,4,3,2,4,2,5,null,null,null,null,null,null,4,6]
        // Expected Output: 20 (subtree [4,2,6])
        TreeNode root1 = new TreeNode(1);
        root1.left = new TreeNode(4);
        root1.right = new TreeNode(3);
        root1.left.left = new TreeNode(2);
        root1.left.right = new TreeNode(4);
        root1.right.left = new TreeNode(2);
        root1.right.right = new TreeNode(5);
        root1.right.right.left = new TreeNode(4);
        root1.right.right.right = new TreeNode(6);
        
        System.out.println("Test Case 1: " + solution.maxSumBST(root1)); // Expected: 20
        
        // Test Case 2: [4,3,null,1,2]
        // Expected Output: 2 (subtree [2])
        Solution solution2 = new Solution();
        TreeNode root2 = new TreeNode(4);
        root2.left = new TreeNode(3);
        root2.left.left = new TreeNode(1);
        root2.left.right = new TreeNode(2);
        
        System.out.println("Test Case 2: " + solution2.maxSumBST(root2)); // Expected: 2
        
        // Test Case 3: [-4,-2,-5]
        // Expected Output: 0 (no positive sum BST)
        Solution solution3 = new Solution();
        TreeNode root3 = new TreeNode(-4);
        root3.left = new TreeNode(-2);
        root3.right = new TreeNode(-5);
        
        System.out.println("Test Case 3: " + solution3.maxSumBST(root3)); // Expected: 0
    }
}