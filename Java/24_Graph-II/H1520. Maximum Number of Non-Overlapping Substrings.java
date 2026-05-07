// Strongly Connected Component using Kosaraju’s Algorithm
// 1520. Maximum Number of Non-Overlapping Substrings
// https://leetcode.com/problems/maximum-number-of-non-overlapping-substrings/

import java.util.List;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;

class Solution {
    public List<String> maxNumOfSubstrings(String s) {
        // Store first and last occurrence of each character
        int[] first = new int[26];
        int[] last = new int[26];
        Arrays.fill(first, Integer.MAX_VALUE);
        Arrays.fill(last, -1);
        
        // Find first and last occurrence of each character
        for (int i = 0; i < s.length(); i++) {
            int c = s.charAt(i) - 'a';
            first[c] = Math.min(first[c], i);
            last[c] = Math.max(last[c], i);
        }
        
        // Extend intervals to include all occurrences of characters within them
        List<int[]> intervals = new ArrayList<>();
        for (int i = 0; i < 26; i++) {
            if (first[i] == Integer.MAX_VALUE) continue;
            
            int left = first[i];
            int right = last[i];
            boolean valid = true;
            
            // Expand the interval to include all characters in current substring
            for (int j = left; j <= right; j++) {
                int c = s.charAt(j) - 'a';
                if (first[c] < left) {
                    valid = false;
                    break;
                }
                right = Math.max(right, last[c]);
            }
            
            if (valid) {
                intervals.add(new int[]{left, right});
            }
        }
        
        // Sort intervals by end point
        Collections.sort(intervals, (a, b) -> a[1] - b[1]);
        
        // Select non-overlapping intervals
        List<String> result = new ArrayList<>();
        int prevEnd = -1;
        for (int[] interval : intervals) {
            int start = interval[0];
            int end = interval[1];
            
            if (start > prevEnd) {
                result.add(s.substring(start, end + 1));
                prevEnd = end;
            }
        }
        
        return result;
    }

    public static void main(String[] args) {
        Solution sol = new Solution();
        
        // Test Case 1: Example from problem statement
        System.out.println(sol.maxNumOfSubstrings("adefaddaccc")); 
        // Expected: ["e","f","ccc"]
        
        // Test Case 2: All unique characters
        System.out.println(sol.maxNumOfSubstrings("abc")); 
        // Expected: ["a","b","c"]
        
        // Test Case 3: Repeated characters
        System.out.println(sol.maxNumOfSubstrings("abab")); 
        // Expected: ["abab"]
        
        // Test Case 4: Single character
        System.out.println(sol.maxNumOfSubstrings("a")); 
        // Expected: ["a"]
        
        // Test Case 5: All same characters
        System.out.println(sol.maxNumOfSubstrings("aaaaa")); 
        // Expected: ["aaaaa"]
    }
}