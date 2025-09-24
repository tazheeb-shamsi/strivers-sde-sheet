// 20. Valid Parentheses
// https://leetcode.com/problems/valid-parentheses/

class Solution {
    public boolean isValid(String s) {
        char[] stack = new char[s.length()];
        int top = -1;
        
        for (char c : s.toCharArray()) {
            if (c == '(' || c == '[' || c == '{') {
                stack[++top] = c; // push
            } else {
                if (top == -1) return false; // empty
                char open = stack[top--];    // pop
                if (c == ')' && open != '(') return false;
                if (c == ']' && open != '[') return false;
                if (c == '}' && open != '{') return false;
            }
        }
        
        return top == -1;
    }
    
    public static void main(String[] args) {
        Solution solution = new Solution();
        String input = "()[]{}";
        boolean result = solution.isValid(input);
        System.out.println(result);
    }
}
