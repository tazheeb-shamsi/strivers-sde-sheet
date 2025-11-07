// 173. Binary Search Tree Iterator
// https://leetcode.com/problems/binary-search-tree-iterator/

/*
Problem Statement:
Implement the BSTIterator class that represents an iterator over the in-order traversal 
of a binary search tree (BST):

- BSTIterator(TreeNode root) Initializes an object of the BSTIterator class. 
  The root of the BST is given as part of the constructor.
- boolean hasNext() Returns true if there exists a number in the traversal to the right 
  of the pointer, otherwise returns false.
- int next() Moves the pointer to the right, then returns the number at the pointer.

Notice that by initializing the pointer to a non-existent smallest number, the first call 
to next() will return the smallest element in the BST.

You may assume that next() calls will always be valid. That is, there will be at least 
a next number in the in-order traversal when next() is called.

Example:
Input: ["BSTIterator", "next", "next", "hasNext", "next", "hasNext", "next", "hasNext", "next", "hasNext"]
       [[[7, 3, 15, null, null, 9, 20]], [], [], [], [], [], [], [], [], []]
Output: [null, 3, 7, true, 9, true, 15, true, 20, false]

Constraints:
- The number of nodes in the tree is in the range [1, 10^5]
- 0 <= Node.val <= 10^6
- At most 10^5 calls will be made to hasNext and next

Follow-up: Could you implement next() and hasNext() in average O(1) time and use O(h) memory, 
where h is the height of the tree?
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

/*
Approach: Controlled Inorder Traversal using Stack
- Use a stack to simulate inorder traversal
- Push all left nodes onto stack during initialization and after each next() call
- next() pops from stack and processes right subtree
- This achieves O(1) average time and O(h) space

Time Complexity: 
  - Constructor: O(h) to push leftmost path
  - next(): O(1) amortized (each node pushed/popped once)
  - hasNext(): O(1)
Space Complexity: O(h) for stack
*/
class BSTIterator {
    private Stack<TreeNode> stack;

    public BSTIterator(TreeNode root) {
        stack = new Stack<>();
        pushAllLeft(root);
    }
    
    // Push all left nodes from current node to stack
    private void pushAllLeft(TreeNode node) {
        while (node != null) {
            stack.push(node);
            node = node.left;
        }
    }
    
    // Returns the next smallest number
    public int next() {
        TreeNode node = stack.pop();
        
        // If node has right child, push all left nodes of right subtree
        if (node.right != null) {
            pushAllLeft(node.right);
        }
        
        return node.val;
    }
    
    // Returns whether we have a next smallest number
    public boolean hasNext() {
        return !stack.isEmpty();
    }
}

/*
Alternative Approach: Pre-compute Inorder Traversal
- Store entire inorder traversal in a list during initialization
- Use pointer to track current position

Time Complexity:
  - Constructor: O(n)
  - next(): O(1)
  - hasNext(): O(1)
Space Complexity: O(n) - stores all nodes
*/
class BSTIterator2 {
    private List<Integer> inorderList;
    private int index;
    
    public BSTIterator2(TreeNode root) {
        inorderList = new ArrayList<>();
        index = 0;
        inorderTraversal(root);
    }
    
    private void inorderTraversal(TreeNode node) {
        if (node == null) return;
        inorderTraversal(node.left);
        inorderList.add(node.val);
        inorderTraversal(node.right);
    }
    
    public int next() {
        return inorderList.get(index++);
    }
    
    public boolean hasNext() {
        return index < inorderList.size();
    }
}

class Main {
    public static void main(String[] args) {
        // Test Case 1: Standard BST
        TreeNode root1 = new TreeNode(7);
        root1.left = new TreeNode(3);
        root1.right = new TreeNode(15);
        root1.right.left = new TreeNode(9);
        root1.right.right = new TreeNode(20);
        
        System.out.println("Test Case 1: BST [7,3,15,null,null,9,20]");
        System.out.println("Expected Inorder: [3, 7, 9, 15, 20]");
        System.out.println("\nUsing Stack-based Iterator:");
        BSTIterator iterator1 = new BSTIterator(root1);
        System.out.print("Output: [");
        while (iterator1.hasNext()) {
            System.out.print(iterator1.next());
            if (iterator1.hasNext()) System.out.print(", ");
        }
        System.out.println("]");
        System.out.println();
        
        // Test Case 2: Left-skewed tree
        TreeNode root2 = new TreeNode(5);
        root2.left = new TreeNode(3);
        root2.left.left = new TreeNode(1);
        
        System.out.println("Test Case 2: Left-skewed BST [5,3,null,1]");
        System.out.println("Expected Inorder: [1, 3, 5]");
        System.out.println("\nUsing Stack-based Iterator:");
        BSTIterator iterator2 = new BSTIterator(root2);
        System.out.print("Output: [");
        while (iterator2.hasNext()) {
            System.out.print(iterator2.next());
            if (iterator2.hasNext()) System.out.print(", ");
        }
        System.out.println("]");
        System.out.println();
        
        // Test Case 3: Right-skewed tree
        TreeNode root3 = new TreeNode(1);
        root3.right = new TreeNode(3);
        root3.right.right = new TreeNode(5);
        
        System.out.println("Test Case 3: Right-skewed BST [1,null,3,null,5]");
        System.out.println("Expected Inorder: [1, 3, 5]");
        System.out.println("\nUsing List-based Iterator:");
        BSTIterator2 iterator3 = new BSTIterator2(root3);
        System.out.print("Output: [");
        while (iterator3.hasNext()) {
            System.out.print(iterator3.next());
            if (iterator3.hasNext()) System.out.print(", ");
        }
        System.out.println("]");
        System.out.println();
        
        // Test Case 4: Complex BST demonstrating hasNext()
        TreeNode root4 = new TreeNode(8);
        root4.left = new TreeNode(5);
        root4.right = new TreeNode(10);
        root4.left.left = new TreeNode(3);
        root4.left.right = new TreeNode(7);
        
        System.out.println("Test Case 4: Complex BST [8,5,10,3,7]");
        System.out.println("Testing hasNext() and next():");
        BSTIterator iterator4 = new BSTIterator(root4);
        int count = 0;
        while (iterator4.hasNext() && count < 3) {
            System.out.println("hasNext(): true, next(): " + iterator4.next());
            count++;
        }
        System.out.println("Remaining elements:");
        while (iterator4.hasNext()) {
            System.out.println("next(): " + iterator4.next());
        }
        System.out.println("hasNext(): " + iterator4.hasNext());
    }
}