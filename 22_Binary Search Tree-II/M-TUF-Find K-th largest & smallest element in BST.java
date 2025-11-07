// TUF: Find K-th largest and Smallest element in BST
// K-th Smallest and Largest Element in BST
// https://takeuforward.org/plus/dsa/problems/kth-smallest-and-largest-element-in-bst?tab=editorial

/*
Problem Statement:
Given a Binary Search Tree and an integer k, find the kth smallest and kth largest 
elements in the BST. Return them as a list [kth_smallest, kth_largest].

Example 1:
Input: root = [5,3,6,2,4,null,null,1], k = 3
Output: [3, 5]
Explanation: 
- Inorder: [1,2,3,4,5,6]
- 3rd smallest = 3
- 3rd largest = 5

Constraints:
- The number of nodes in the tree is n
- 1 <= k <= n <= 10^4
- 0 <= Node.data <= 10^4
*/

import java.util.*;

class TreeNode {
    int data;
    TreeNode left;
    TreeNode right;
    TreeNode(int val) { 
        data = val; 
        left = null; 
        right = null; 
    }
}

class Solution {
    /*
    Approach: Inorder and Reverse Inorder Traversal
    - For kth smallest: Inorder traversal gives sorted order (left-root-right)
    - For kth largest: Reverse inorder gives descending order (right-root-left)
    - Use counter to track which element we're at
    
    Time Complexity: O(n) - may need to traverse entire tree in worst case
    Space Complexity: O(h) - recursion stack where h is height
    */
    public List<Integer> kLargesSmall(TreeNode root, int k) {
        List<Integer> result = new ArrayList<>();
        
        // Find kth smallest
        int[] counter = {0};
        int[] kthSmallest = {-1};
        findKthSmallest(root, k, counter, kthSmallest);
        
        // Find kth largest
        counter[0] = 0;
        int[] kthLargest = {-1};
        findKthLargest(root, k, counter, kthLargest);
        
        result.add(kthSmallest[0]);
        result.add(kthLargest[0]);
        
        return result;
    }
    
    // Inorder traversal to find kth smallest (left -> root -> right)
    private void findKthSmallest(TreeNode node, int k, int[] counter, int[] result) {
        if (node == null || counter[0] >= k) return;
        
        // Traverse left subtree
        findKthSmallest(node.left, k, counter, result);
        
        // Visit current node
        counter[0]++;
        if (counter[0] == k) {
            result[0] = node.data;
            return;
        }
        
        // Traverse right subtree
        findKthSmallest(node.right, k, counter, result);
    }
    
    // Reverse inorder traversal to find kth largest (right -> root -> left)
    private void findKthLargest(TreeNode node, int k, int[] counter, int[] result) {
        if (node == null || counter[0] >= k) return;
        
        // Traverse right subtree first
        findKthLargest(node.right, k, counter, result);
        
        // Visit current node
        counter[0]++;
        if (counter[0] == k) {
            result[0] = node.data;
            return;
        }
        
        // Traverse left subtree
        findKthLargest(node.left, k, counter, result);
    }
}

class Main {
    public static void main(String[] args) {
        Solution solution = new Solution();
        
        // Test Case 1: [5,3,6,2,4,null,null,1]
        TreeNode root1 = new TreeNode(5);
        root1.left = new TreeNode(3);
        root1.right = new TreeNode(6);
        root1.left.left = new TreeNode(2);
        root1.left.right = new TreeNode(4);
        root1.left.left.left = new TreeNode(1);
        
        System.out.println("Test Case 1:");
        System.out.println("Tree (Inorder): [1,2,3,4,5,6]");
        System.out.println("k = 3");
        List<Integer> result1 = solution.kLargesSmall(root1, 3);
        System.out.println("Expected: [3, 5]");
        System.out.println("Output: " + result1);
        System.out.println();
        
        // Test Case 2: [3,1,4,null,2]
        TreeNode root2 = new TreeNode(3);
        root2.left = new TreeNode(1);
        root2.right = new TreeNode(4);
        root2.left.right = new TreeNode(2);
        
        System.out.println("Test Case 2:");
        System.out.println("Tree (Inorder): [1,2,3,4]");
        System.out.println("k = 1");
        List<Integer> result2 = solution.kLargesSmall(root2, 1);
        System.out.println("Expected: [1, 4]");
        System.out.println("Output: " + result2);
        System.out.println();
        
        // Test Case 3: [8,5,10,3,7,9,12,1,4,6]
        TreeNode root3 = new TreeNode(8);
        root3.left = new TreeNode(5);
        root3.right = new TreeNode(10);
        root3.left.left = new TreeNode(3);
        root3.left.right = new TreeNode(7);
        root3.right.left = new TreeNode(9);
        root3.right.right = new TreeNode(12);
        root3.left.left.left = new TreeNode(1);
        root3.left.left.right = new TreeNode(4);
        root3.left.right.left = new TreeNode(6);
        
        System.out.println("Test Case 3:");
        System.out.println("Tree (Inorder): [1,3,4,5,6,7,8,9,10,12]");
        System.out.println("k = 5");
        List<Integer> result3 = solution.kLargesSmall(root3, 5);
        System.out.println("Expected: [6, 7]");
        System.out.println("Output: " + result3);
    }
}