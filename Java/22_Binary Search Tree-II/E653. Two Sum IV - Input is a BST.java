// 653. Two Sum IV - Input is a BST
// Find a pair with a given sum in BST
// https://leetcode.com/problems/two-sum-iv-input-is-a-bst/

/*
Problem Statement:
Given the root of a Binary Search Tree and a target number k, return true if there exist 
two elements in the BST such that their sum is equal to the given target.

Example 1:
Input: root = [5,3,6,2,4,null,7], k = 9
Output: true (3 + 6 = 9)

Example 2:
Input: root = [5,3,6,2,4,null,7], k = 28
Output: false

Constraints:
- The number of nodes in the tree is in the range [1, 10^4]
- -10^4 <= Node.val <= 10^4
- root is guaranteed to be a valid binary search tree
- -10^5 <= k <= 10^5
*/

import java.util.*;

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
    /*
    Approach 1: Using HashSet + DFS
    - Traverse the tree and for each node check if (k - node.val) exists in HashSet
    - If yes, we found two numbers that sum to k
    - Otherwise, add current node value to set and continue
    
    Time Complexity: O(n) - visit each node once
    Space Complexity: O(n) - for HashSet and recursion stack
    */
    public boolean findTarget(TreeNode root, int k) {
        HashSet<Integer> set = new HashSet<>();
        return dfs(root, k, set);
    }
    
    private boolean dfs(TreeNode node, int k, HashSet<Integer> set) {
        if (node == null) return false;
        
        // Check if complement exists
        if (set.contains(k - node.val)) {
            return true;
        }
        
        // Add current value to set
        set.add(node.val);
        
        // Search in left and right subtrees
        return dfs(node.left, k, set) || dfs(node.right, k, set);
    }
    
    /*
    Approach 2: Inorder Traversal + Two Pointers
    - Get sorted array using inorder traversal (BST property)
    - Use two pointers to find pair that sums to k
    
    Time Complexity: O(n)
    Space Complexity: O(n)
    */
    public boolean findTarget2(TreeNode root, int k) {
        List<Integer> list = new ArrayList<>();
        inorder(root, list);
        
        int left = 0, right = list.size() - 1;
        while (left < right) {
            int sum = list.get(left) + list.get(right);
            if (sum == k) return true;
            else if (sum < k) left++;
            else right--;
        }
        return false;
    }
    
    private void inorder(TreeNode node, List<Integer> list) {
        if (node == null) return;
        inorder(node.left, list);
        list.add(node.val);
        inorder(node.right, list);
    }
}

class Main {
    public static void main(String[] args) {
        Solution solution = new Solution();
        
        // Test Case 1: [5,3,6,2,4,null,7], k = 9
        TreeNode root1 = new TreeNode(5);
        root1.left = new TreeNode(3);
        root1.right = new TreeNode(6);
        root1.left.left = new TreeNode(2);
        root1.left.right = new TreeNode(4);
        root1.right.right = new TreeNode(7);
        
        System.out.println("Test Case 1:");
        System.out.println("Tree: [5,3,6,2,4,null,7], k = 9");
        System.out.println("Expected: true");
        System.out.println("Output (Approach 1): " + solution.findTarget(root1, 9));
        System.out.println("Output (Approach 2): " + solution.findTarget2(root1, 9));
        System.out.println();
        
        // Test Case 2: [5,3,6,2,4,null,7], k = 28
        TreeNode root2 = new TreeNode(5);
        root2.left = new TreeNode(3);
        root2.right = new TreeNode(6);
        root2.left.left = new TreeNode(2);
        root2.left.right = new TreeNode(4);
        root2.right.right = new TreeNode(7);
        
        System.out.println("Test Case 2:");
        System.out.println("Tree: [5,3,6,2,4,null,7], k = 28");
        System.out.println("Expected: false");
        System.out.println("Output (Approach 1): " + solution.findTarget(root2, 28));
        System.out.println("Output (Approach 2): " + solution.findTarget2(root2, 28));
        System.out.println();
        
        // Test Case 3: [2,1,3], k = 4
        TreeNode root3 = new TreeNode(2);
        root3.left = new TreeNode(1);
        root3.right = new TreeNode(3);
        
        System.out.println("Test Case 3:");
        System.out.println("Tree: [2,1,3], k = 4");
        System.out.println("Expected: true (1 + 3 = 4)");
        System.out.println("Output (Approach 1): " + solution.findTarget(root3, 4));
        System.out.println("Output (Approach 2): " + solution.findTarget2(root3, 4));
    }
}