// TUF: Number of distinct substrings in a string
// https://takeuforward.org/plus/dsa/problems/number-of-distinct-substrings-in-a-string

/**
 Given a string s, determine the number of distinct substrings (including the empty substring) of the given string.

A string B is a substring of a string A if B can be obtained by deleting several characters (possibly none) from the start of A and several characters (possibly none) from the end of A.

Two strings X and Y are considered different if there is at least one index i such that the character of X at index i is different from the character of Y at index i (X[i] != Y[i]).

Examples:
Input : s = "aba"
Output : 6
Explanation : The distinct substrings are "a", "ab", "ba", "b", "aba", "".

Input : s = "abc"
Output : 7
Explanation : The distinct substrings are "a", "ab", "abc", "b", "bc", "c", "".
 */

class Solution {
    private static class State {
        int len;            // length of the longest string in this state
        int link;           // suffix link
        int[] next = new int[26]; // transitions for lowercase letters

        State() {
            java.util.Arrays.fill(next, -1);
        }
    }

    private State[] states;
    private int size;
    private int last;

    public int countDistinctSubstring(String s) {
        if (s == null || s.isEmpty()) {
            return 1; // only the empty substring
        }

        int n = s.length();
        states = new State[2 * n];
        for (int i = 0; i < states.length; i++) {
            states[i] = new State();
        }
        size = 1;
        last = 0;
        states[0].len = 0;
        states[0].link = -1;

        for (char ch : s.toCharArray()) {
            addChar(ch - 'a');
        }

        long total = 0;
        for (int i = 1; i < size; i++) {
            int linkIndex = states[i].link;
            int linkLen = linkIndex == -1 ? 0 : states[linkIndex].len;
            total += states[i].len - linkLen;
        }

        return (int) (total + 1); // include empty substring
    }

    private void addChar(int c) {
        int cur = size++;
        states[cur].len = states[last].len + 1;

        int p = last;
        while (p != -1 && states[p].next[c] == -1) {
            states[p].next[c] = cur;
            p = states[p].link;
        }

        if (p == -1) {
            states[cur].link = 0;
        } else {
            int q = states[p].next[c];
            if (states[p].len + 1 == states[q].len) {
                states[cur].link = q;
            } else {
                int clone = size++;
                states[clone].len = states[p].len + 1;
                states[clone].next = states[q].next.clone();
                states[clone].link = states[q].link;

                while (p != -1 && states[p].next[c] == q) {
                    states[p].next[c] = clone;
                    p = states[p].link;
                }

                states[q].link = states[cur].link = clone;
            }
        }

        last = cur;
    }

    public static void main(String[] args) {
        Solution sol = new Solution();
        System.out.println(sol.countDistinctSubstring("aba")); // Output: 6
        System.out.println(sol.countDistinctSubstring("abc")); // Output: 7
    }
}