// TUF: Palindrome partitioning
// https://takeuforward.org/plus/dsa/problems/palindrome-partitioning/

/**
 * Given a string s partition string s such that every substring of partition is palindrome. 
 * Return all possible palindrome partition of string s.
 * 
 * Examples:
 * Input : s = "aabaa"
 * Output : [ [ "a", "a", "b", "a", "a"] , [ "a", "a", "b", "aa"] , [ "a", "aba", "a"] , [ "aa", "b", "a", "a"] , [ "aa", "b", "aa" ] , [ "aabaa" ] ]
 * Explanation : Above all are the possible ways in which the string can be partitioned so that each substring is a palindrome.
 * 
 * Input : s = "baa"
 * Output : [ [ "b", "a", "a"] , [ "b", "aa" ] ]
 * Explanation : Above all are the possible ways in which the string can be partitioned so that each substring is a palindrome.
 */

import java.util.*;

class Solution {
    public List<List<String>> partition(String s) {
        List<List<String>> result = new ArrayList<>();
        List<String> current = new ArrayList<>();
        boolean[][] dp = new boolean[s.length()][s.length()];
        
        // Preprocess the string to find all palindromic substrings
        for (int i = 0; i < s.length(); i++) {
            for (int j = 0; j <= i; j++) {
                if (s.charAt(i) == s.charAt(j) && (i - j <= 2 || dp[j+1][i-1])) {
                    dp[j][i] = true;
                }
            }
        }
        
        backtrack(s, 0, current, result, dp);
        return result;
    }
    
    private void backtrack(String s, int start, List<String> current, List<List<String>> result, boolean[][] dp) {
        if (start == s.length()) {
            result.add(new ArrayList<>(current));
            return;
        }
        
        for (int i = start; i < s.length(); i++) {
            // If the substring s[start..i] is a palindrome
            if (dp[start][i]) {
                // Add the current palindrome to the current list
                current.add(s.substring(start, i + 1));
                // Recurse for the remaining string
                backtrack(s, i + 1, current, result, dp);
                // Backtrack
                current.remove(current.size() - 1);
            }
        }
    }

    public static void main(String[] args) {
        Solution sol = new Solution();
        
        // Test case 1
        String s1 = "aabaa";
        System.out.println("Input: " + s1);
        System.out.println("Output: " + sol.partition(s1));
        
        // Test case 2
        String s2 = "baa";
        System.out.println("\nInput: " + s2);
        System.out.println("Output: " + sol.partition(s2));
    }
}