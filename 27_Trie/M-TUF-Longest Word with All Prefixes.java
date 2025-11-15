// TUF: Longest Word with All Prefixes
// https://takeuforward.org/plus/dsa/problems/longest-word-with-all-prefixes

/**
 Given a string array nums of length n. A string is called a complete string if every prefix of this string is also present in the array nums.

Find the longest complete string in the array nums.

If there are multiple strings with the same length, return the lexicographically smallest one and if no string exists, return "None" (without quotes).

Examples:
Input : nums = [ "n", "ni", "nin", "ninj" , "ninja" , "nil" ]
Output : ninja
Explanation :
The word "ninja" is the longest word which has all its prefixes present in the array.

Input : nums = [ "ninja" , "night" , "nil" ]
Output : None
Explanation :
There is no string that has all its prefix present in array. So we return None.
 */


import java.util.Arrays;
import java.util.List;

class Solution {
    private static class Node {
        Node[] children = new Node[26];
        boolean isEnd;
    }

    private final Node root = new Node();

    private void insert(String word) {
        Node node = root;
        for (char ch : word.toCharArray()) {
            int idx = ch - 'a';
            if (node.children[idx] == null) node.children[idx] = new Node();
            node = node.children[idx];
        }
        node.isEnd = true;
    }

    private boolean hasAllPrefixes(String word) {
        Node node = root;
        for (char ch : word.toCharArray()) {
            int idx = ch - 'a';
            node = node.children[idx];
            if (node == null || !node.isEnd) return false;
        }
        return true;
    }

    public String completeString(List<String> nums) {
        if (nums == null || nums.isEmpty()) return "None";

        for (String word : nums) {
            if (word != null && !word.isEmpty()) insert(word);
        }

        String best = "";
        for (String word : nums) {
            if (word == null || word.isEmpty()) continue;
            if (hasAllPrefixes(word)) {
                if (word.length() > best.length() ||
                    (word.length() == best.length() && word.compareTo(best) < 0)) {
                    best = word;
                }
            }
        }

        return best.isEmpty() ? "None" : best;
    }

    public static void main(String[] args) {
        Solution sol = new Solution();
        System.out.println(sol.completeString(Arrays.asList("n", "ni", "nin", "ninj", "ninja", "nil"))); // ninja
        System.out.println(sol.completeString(Arrays.asList("ninja", "night", "nil"))); // None
    }
}