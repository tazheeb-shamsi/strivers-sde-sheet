// 230. Kth Smallest Element in a BST
// https://leetcode.com/problems/kth-smallest-element-in-a-bst/

/*
Problem Statement:
Given the root of a binary search tree, and an integer k, return the kth smallest 
value (1-indexed) of all the values of the nodes in the tree.

Example 1:
Input: root = [3,1,4,null,2], k = 1
Output: 1

Example 2:
Input: root = [5,3,6,2,4,null,null,1], k = 3
Output: 3

Constraints:
- The number of nodes in the tree is n
- 1 <= k <= n <= 10^4
- 0 <= Node.val <= 10^4

Follow up: If the BST is modified often and you need to find the kth smallest frequently, 
how would you optimize?
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
    Approach 1: Inorder Traversal (Recursive)
    - Inorder traversal of BST gives elements in sorted order
    - Keep counter and stop when we reach kth element
    
    Time Complexity: O(H + k) where H is height, in worst case O(n)
    Space Complexity: O(H) for recursion stack
    */
    
    private int count = 0;
    private int result = 0;
    
    public int kthSmallest(TreeNode root, int k) {
        count = 0;
        result = 0;
        inorder(root, k);
        return result;
    }
    
    private void inorder(TreeNode node, int k) {
        if (node == null) return;
        
        // Traverse left subtree
        inorder(node.left, k);
        
        // Process current node
        count++;
        if (count == k) {
            result = node.val;
            return;
        }
        
        // Traverse right subtree
        inorder(node.right, k);
    }
    
    /*
    Approach 2: Iterative Inorder using Stack
    - More space efficient as we can stop early
    - Simulates inorder traversal iteratively
    
    Time Complexity: O(H + k)
    Space Complexity: O(H) for stack
    */
    public int kthSmallest2(TreeNode root, int k) {
        Stack<TreeNode> stack = new Stack<>();
        TreeNode curr = root;
        int count = 0;
        
        while (curr != null || !stack.isEmpty()) {
            // Go to leftmost node
            while (curr != null) {
                stack.push(curr);
                curr = curr.left;
            }
            
            // Process current node
            curr = stack.pop();
            count++;
            
            if (count == k) {
                return curr.val;
            }
            
            // Move to right subtree
            curr = curr.right;
        }
        
        return -1; // Should never reach here if k is valid
    }
    
    /*
    Approach 3: Follow-up - Augmented BST
    - For frequent queries, augment each node with count of nodes in left subtree
    - This allows O(H) lookup for kth smallest
    - Requires O(n) preprocessing and maintaining counts on updates
    */
}

class Main {
    public static void main(String[] args) {
        Solution solution = new Solution();
        
        // Test Case 1: [3,1,4,null,2], k = 1
        TreeNode root1 = new TreeNode(3);
        root1.left = new TreeNode(1);
        root1.right = new TreeNode(4);
        root1.left.right = new TreeNode(2);
        
        System.out.println("Test Case 1:");
        System.out.println("Tree (Inorder): [1,2,3,4]");
        System.out.println("k = 1");
        System.out.println("Expected: 1");
        System.out.println("Output (Approach 1): " + solution.kthSmallest(root1, 1));
        System.out.println("Output (Approach 2): " + solution.kthSmallest2(root1, 1));
        System.out.println();
        
        // Test Case 2: [5,3,6,2,4,null,null,1], k = 3
        TreeNode root2 = new TreeNode(5);
        root2.left = new TreeNode(3);
        root2.right = new TreeNode(6);
        root2.left.left = new TreeNode(2);
        root2.left.right = new TreeNode(4);
        root2.left.left.left = new TreeNode(1);
        
        System.out.println("Test Case 2:");
        System.out.println("Tree (Inorder): [1,2,3,4,5,6]");
        System.out.println("k = 3");
        System.out.println("Expected: 3");
        System.out.println("Output (Approach 1): " + solution.kthSmallest(root2, 3));
        System.out.println("Output (Approach 2): " + solution.kthSmallest2(root2, 3));
        System.out.println();
        
        // Test Case 3: [2,1,3], k = 2
        TreeNode root3 = new TreeNode(2);
        root3.left = new TreeNode(1);
        root3.right = new TreeNode(3);
        
        System.out.println("Test Case 3:");
        System.out.println("Tree (Inorder): [1,2,3]");
        System.out.println("k = 2");
        System.out.println("Expected: 2");
        System.out.println("Output (Approach 1): " + solution.kthSmallest(root3, 2));
        System.out.println("Output (Approach 2): " + solution.kthSmallest2(root3, 2));
    }
}