// Longest Substring Without Repeating Characters.
// https://leetcode.com/problems/longest-substring-without-repeating-characters/

import java.util.*;

class Solution {

    public int lengthOfLongestSubstring(String s) {
        int n = s.length();
        int maxLength = 0;
        int left = 0;
        Map<Character, Integer> charIndexMap = new HashMap<>();

        for (int right = 0; right < n; right++) {
            char currentChar = s.charAt(right);
            if (charIndexMap.containsKey(currentChar)) {
                left = Math.max(left, charIndexMap.get(currentChar) + 1);
            }
            charIndexMap.put(currentChar, right);
            maxLength = Math.max(maxLength, right - left + 1);
        }

        return maxLength;
    }

    public static void main(String[] args) {
        Solution solution = new Solution();
        String input = "abcabcbb";
        int result = solution.lengthOfLongestSubstring(input);
        System.out.println(
            "Length of longest substring without repeating characters: " +
            result
        );
    }
}
