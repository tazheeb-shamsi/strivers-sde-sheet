// Word Break
// https://takeuforward.org/plus/dsa/problems/word-break

/**
 * Problem Statement: Given a string s and a dictionary of strings wordDict, 
 * return true if s can be segmented into a space-separated sequence of one 
 * or more dictionary words otherwise return false.
 *
 * Example 1:
 * Input: s = "takeuforward", wordDict = ["take", "forward", "you", "u"]
 * Output: true
 * Explanation: Return true because "takeuforward" can be segmented as "take", "u", "forward".

 * Example 2:
 * Input: s = "applepineapple", wordDict = ["apple"]
 * Output: false
 * Explanation: Return false because "applepineapple" can be segmented as "apple", "pine", "apple" but "pine" is not in the dictionary.
 */


import java.util.*;

class Solution {
    // Function to check if the string can be segmented
    public boolean wordBreak(String s, List<String> wordDict) {
        int n = s.length();
        Set<String> dict = new HashSet<>(wordDict);
        boolean[] dp = new boolean[n + 1];
        dp[0] = true;  // Empty string is always "segmented"
        int maxLen = 0;

        // Find the maximum length of words in the dictionary
        for (String word : wordDict) {
            maxLen = Math.max(maxLen, word.length());
        }

        // DP to check if the string can be segmented
        for (int i = 1; i <= n; ++i) {
            for (int j = Math.max(0, i - maxLen); j < i; ++j) {
                if (dp[j] && dict.contains(s.substring(j, i))) {
                    dp[i] = true;
                    break;  // Early termination when we find a valid word
                }
            }
        }

        return dp[n];  // Return if the entire string can be segmented
    }

     public static void main(String[] args) {
        Solution obj = new Solution();
        String s = "leetcode";
        List<String> wordDict = Arrays.asList("leet", "code");
        
        if (obj.wordBreak(s, wordDict)) {
            System.out.println("True");
        } else {
            System.out.println("False");
        }
    }
}