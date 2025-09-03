// Word Break (print all ways)
// Given a string s and a dictionary of strings wordDict, add spaces in s to construct a sentence where each word is a valid dictionary word. Return all such possible sentences in any order.

// Example 1:
// Input: s = "catsanddog", wordDict = ["cat","cats","and","sand","dog"]
// Output: ["cats and dog","cat sand dog"]

// Example 2:
// Input: s = "pineapplepenapple", wordDict = ["apple","pen","applepen","pine","pineapple"]
// Output: ["pine apple pen apple","pineapple pen apple","pine applepen apple"]
// Explanation: Note that you are allowed to reuse a dictionary word.

// Example 3:
// Input: s = "catsandog", wordDict = ["cats","dog","sand","and","cat"]
// Output: []

// Constraints:
// 1 <= s.length <= 20
// 1 <= wordDict.length <= 1000
// 1 <= wordDict[i].length <= 10
// s and wordDict[i] consist of only lowercase English letters.
// All the strings of wordDict are unique.

import java.util.*;

class Solution {
    static String[] wordBreak(String[] dict, String s) {
        List<String> result = new ArrayList<>();
        wordBreakHelper(dict, s, 0, new StringBuilder(), result);
        return result.toArray(new String[0]);
    }

    private static void wordBreakHelper(String[] dict, String s, int start, StringBuilder sb, List<String> result) {
        if (start == s.length()) {
            result.add(sb.toString().trim());
            return;
        }

        for (String word : dict) {
            if (s.startsWith(word, start)) {
                int len = word.length();
                if (start == 0) {
                    wordBreakHelper(dict, s, start + len, sb.append(word), result);
                    sb.setLength(sb.length() - len);
                } else {
                    wordBreakHelper(dict, s, start + len, sb.append(" ").append(word), result);
                    sb.setLength(sb.length() - len - 1);
                }
            }
        }
    }
    
    public static void main(String[] args) {
        String[] dict = {"apple", "pen", "applepen", "pine", "pineapple"};
        String s = "pineapplepenapple";
        String[] result = wordBreak(dict, s);
        for (String str : result) {
            System.out.println(str);
        }
    }
}
