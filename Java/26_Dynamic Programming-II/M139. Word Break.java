// 139. Word Break
// https://leetcode.com/problems/word-break/

import java.util.*;

class Solution {
    public boolean wordBreak(String s, List<String> wordDict) {
        // Convert wordDict to a set for O(1) lookups
        Set<String> wordSet = new HashSet<>(wordDict);
        int n = s.length();
        
        // dp[i] represents if s[0...i-1] can be segmented into words from the dictionary
        boolean[] dp = new boolean[n + 1];
        dp[0] = true; // Empty string is always present
        
        // The maximum length of words in the dictionary to optimize the inner loop
        int maxWordLength = 0;
        for (String word : wordDict) {
            maxWordLength = Math.max(maxWordLength, word.length());
        }
        
        for (int i = 1; i <= n; i++) {
            // Only check up to the maximum word length or the current position
            int start = Math.max(0, i - maxWordLength - 1);
            for (int j = start; j < i; j++) {
                if (dp[j] && wordSet.contains(s.substring(j, i))) {
                    dp[i] = true;
                    break; // Move to next i once we find a valid break
                }
            }
        }
        
        return dp[n];
    }

    // Alternative solution using BFS
    public boolean wordBreakBFS(String s, List<String> wordDict) {
        Set<String> wordSet = new HashSet<>(wordDict);
        Queue<Integer> queue = new LinkedList<>();
        boolean[] visited = new boolean[s.length()];
        queue.add(0);
        
        while (!queue.isEmpty()) {
            int start = queue.remove();
            if (visited[start]) continue;
            
            for (int end = start + 1; end <= s.length(); end++) {
                if (wordSet.contains(s.substring(start, end))) {
                    if (end == s.length()) {
                        return true;
                    }
                    queue.add(end);
                }
            }
            visited[start] = true;
        }
        return false;
    }

    public static void main(String[] args) {
        Solution sol = new Solution();
        
        // Test Case 1
        String s1 = "leetcode";
        List<String> wordDict1 = Arrays.asList("leet", "code");
        System.out.println("Test Case 1: " + sol.wordBreak(s1, wordDict1)); // Expected: true
        System.out.println("BFS Version: " + sol.wordBreakBFS(s1, wordDict1)); // Expected: true
        
        // Test Case 2
        String s2 = "applepenapple";
        List<String> wordDict2 = Arrays.asList("apple", "pen");
        System.out.println("Test Case 2: " + sol.wordBreak(s2, wordDict2)); // Expected: true
        System.out.println("BFS Version: " + sol.wordBreakBFS(s2, wordDict2)); // Expected: true
        
        // Test Case 3: No possible segmentation
        String s3 = "catsandog";
        List<String> wordDict3 = Arrays.asList("cats", "dog", "sand", "and", "cat");
        System.out.println("Test Case 3: " + sol.wordBreak(s3, wordDict3)); // Expected: false
        System.out.println("BFS Version: " + sol.wordBreakBFS(s3, wordDict3)); // Expected: false
    }
}