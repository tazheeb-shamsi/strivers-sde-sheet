// Sort a Stack
// https://takeuforward.org/plus/dsa/problems/sort-a-stack

/* Problem Statement: Sort a Stack
 * You are given a stack of integers. 
 * Your task is to sort the stack in descending order using recursion, 
 * such that the top of the stack contains the greatest element. 
 * You are not allowed to use any loop-based sorting methods (e.g., quicksort, mergesort). 
 * You may only use recursive operations and the standard stack operations (push, pop, peek/top, and isEmpty).
 */
 
import java.util.Stack;

class Solution {
    public void sortStack(Stack<Integer> st) {
        if (st.isEmpty() || st.size() == 1) return;
        int temp = st.pop();
        sortStack(st);
        insertSorted(st, temp);
    }

    private void insertSorted(Stack<Integer> st, int val) {
        if (st.isEmpty() || st.peek() <= val) {
            st.push(val);
            return;
        }
        int temp = st.pop();
        insertSorted(st, val);
        st.push(temp);
    }
    
    public static void main(String[] args) {
        Stack<Integer> stack = new Stack<>();
        stack.push(3);
        stack.push(1);
        stack.push(4);
        stack.push(2);
        
        Solution solution = new Solution();
        solution.sortStack(stack);
        
        while (!stack.isEmpty()) {
            System.out.print(stack.pop() + " ");
        }
    }
}