// TUF: Floor and Ceil in a BST
// https://takeuforward.org/plus/dsa/problems/floor-and-ceil-in-a-bst

/*
Problem Statement:
Given a root of binary search tree and a key(node) value, find the floor and ceil value 
for that particular key value.

Floor Value Node: Node with the greatest data lesser than or equal to the key value. 
Ceil Value Node: Node with the smallest data larger than or equal to the key value.

If a particular floor or ceil value is not present then output -1.

Example 1:
Input: root = [8,5,12,4,7,10,14,null,null,6], key = 9
Output: [8, 10]
Explanation: Floor of 9 is 8, Ceil of 9 is 10

Example 2:
Input: root = [8,5,12,4,7,10,14], key = 5
Output: [5, 5]
Explanation: Floor of 5 is 5 itself, Ceil of 5 is 5 itself

Example 3:
Input: root = [8,5,12,4,7,10,14], key = 3
Output: [-1, 4]
Explanation: No floor exists (all values > 3), Ceil is 4
*/

import java.util.*;

class TreeNode {
    int data;
    TreeNode left;
    TreeNode right;
    TreeNode(int val) { data = val; left = null; right = null; }
}

class Solution {
    /*
    Approach: Binary Search on BST
    - For Floor: Keep track of largest value <= key
      - If current node <= key, it's a candidate, move right for larger values
      - If current node > key, move left for smaller values
    
    - For Ceil: Keep track of smallest value >= key
      - If current node >= key, it's a candidate, move left for smaller values
      - If current node < key, move right for larger values
    
    Time Complexity: O(H) where H is height of tree
    Space Complexity: O(1) - iterative approach
    */
    
    public List<Integer> floorCeilOfBST(TreeNode root, int key) {
        List<Integer> result = new ArrayList<>();
        
        int floor = findFloor(root, key);
        int ceil = findCeil(root, key);
        
        result.add(floor);
        result.add(ceil);
        
        return result;
    }
    
    // Find floor: greatest value <= key
    private int findFloor(TreeNode root, int key) {
        int floor = -1;
        TreeNode curr = root;
        
        while (curr != null) {
            if (curr.data == key) {
                return curr.data; // Exact match
            } else if (curr.data < key) {
                // Current node is candidate, but check right for larger values
                floor = curr.data;
                curr = curr.right;
            } else {
                // Current node is too large, go left
                curr = curr.left;
            }
        }
        
        return floor;
    }
    
    // Find ceil: smallest value >= key
    private int findCeil(TreeNode root, int key) {
        int ceil = -1;
        TreeNode curr = root;
        
        while (curr != null) {
            if (curr.data == key) {
                return curr.data; // Exact match
            } else if (curr.data > key) {
                // Current node is candidate, but check left for smaller values
                ceil = curr.data;
                curr = curr.left;
            } else {
                // Current node is too small, go right
                curr = curr.right;
            }
        }
        
        return ceil;
    }
    
    /*
    Alternative: Recursive Approach
    Time Complexity: O(H)
    Space Complexity: O(H) for recursion stack
    */
    public List<Integer> floorCeilOfBST_Recursive(TreeNode root, int key) {
        List<Integer> result = new ArrayList<>();
        result.add(findFloorRecursive(root, key, -1));
        result.add(findCeilRecursive(root, key, -1));
        return result;
    }
    
    private int findFloorRecursive(TreeNode node, int key, int floor) {
        if (node == null) return floor;
        
        if (node.data == key) return node.data;
        
        if (node.data < key) {
            // Update floor and search right
            return findFloorRecursive(node.right, key, node.data);
        } else {
            // Search left
            return findFloorRecursive(node.left, key, floor);
        }
    }
    
    private int findCeilRecursive(TreeNode node, int key, int ceil) {
        if (node == null) return ceil;
        
        if (node.data == key) return node.data;
        
        if (node.data > key) {
            // Update ceil and search left
            return findCeilRecursive(node.left, key, node.data);
        } else {
            // Search right
            return findCeilRecursive(node.right, key, ceil);
        }
    }
}

class Main {
    public static void main(String[] args) {
        Solution solution = new Solution();
        
        // Test Case 1: BST with key in middle
        TreeNode root1 = new TreeNode(8);
        root1.left = new TreeNode(5);
        root1.right = new TreeNode(12);
        root1.left.left = new TreeNode(4);
        root1.left.right = new TreeNode(7);
        root1.right.left = new TreeNode(10);
        root1.right.right = new TreeNode(14);
        root1.left.right.left = new TreeNode(6);
        
        System.out.println("Test Case 1:");
        System.out.println("BST: [8,5,12,4,7,10,14,null,null,6]");
        System.out.println("Key: 9");
        List<Integer> result1 = solution.floorCeilOfBST(root1, 9);
        System.out.println("Expected: [8, 10]");
        System.out.println("Output (Iterative): " + result1);
        System.out.println("Output (Recursive): " + solution.floorCeilOfBST_Recursive(root1, 9));
        System.out.println();
        
        // Test Case 2: Key exists in BST
        TreeNode root2 = new TreeNode(8);
        root2.left = new TreeNode(5);
        root2.right = new TreeNode(12);
        root2.left.left = new TreeNode(4);
        root2.left.right = new TreeNode(7);
        root2.right.left = new TreeNode(10);
        root2.right.right = new TreeNode(14);
        
        System.out.println("Test Case 2:");
        System.out.println("BST: [8,5,12,4,7,10,14]");
        System.out.println("Key: 5");
        List<Integer> result2 = solution.floorCeilOfBST(root2, 5);
        System.out.println("Expected: [5, 5]");
        System.out.println("Output (Iterative): " + result2);
        System.out.println("Output (Recursive): " + solution.floorCeilOfBST_Recursive(root2, 5));
        System.out.println();
        
        // Test Case 3: Key smaller than all nodes
        TreeNode root3 = new TreeNode(8);
        root3.left = new TreeNode(5);
        root3.right = new TreeNode(12);
        root3.left.left = new TreeNode(4);
        root3.left.right = new TreeNode(7);
        root3.right.left = new TreeNode(10);
        root3.right.right = new TreeNode(14);
        
        System.out.println("Test Case 3:");
        System.out.println("BST: [8,5,12,4,7,10,14]");
        System.out.println("Key: 3");
        List<Integer> result3 = solution.floorCeilOfBST(root3, 3);
        System.out.println("Expected: [-1, 4]");
        System.out.println("Output (Iterative): " + result3);
        System.out.println("Output (Recursive): " + solution.floorCeilOfBST_Recursive(root3, 3));
        System.out.println();
        
        // Test Case 4: Key larger than all nodes
        System.out.println("Test Case 4:");
        System.out.println("BST: [8,5,12,4,7,10,14]");
        System.out.println("Key: 20");
        List<Integer> result4 = solution.floorCeilOfBST(root3, 20);
        System.out.println("Expected: [14, -1]");
        System.out.println("Output (Iterative): " + result4);
        System.out.println("Output (Recursive): " + solution.floorCeilOfBST_Recursive(root3, 20));
    }
}