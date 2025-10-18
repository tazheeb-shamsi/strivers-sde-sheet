// KMP (Knuth–Morris–Pratt) Algorithm or LPS (Longest Prefix Suffix) array
// LPS: Longest Proper Prefix that is also a Suffix,also known as the prefix function or pi(22/7) array
// Find the index of the first occurrence of a pattern in a text using KMP algorithm
// https://leetcode.com/problems/find-the-index-of-the-first-occurrence-in-a-string/

class Solution {

    // Build LPS (Longest Prefix Suffix) array
    private int[] buildLPS(String pattern) {
        int n = pattern.length();
        int[] lps = new int[n];
        int len = 0; // length of previous longest prefix suffix
        int i = 1;

        while (i < n) {
            if (pattern.charAt(i) == pattern.charAt(len)) {
                len++;
                lps[i] = len;
                i++;
            } else {
                if (len != 0) {
                    len = lps[len - 1]; // fallback
                } else {
                    lps[i] = 0;
                    i++;
                }
            }
        }
        return lps;
    }

    public int strStr(String haystack, String needle) {
        if (needle.isEmpty()) return 0;
        if (haystack.length() < needle.length()) return -1;

        int[] lps = buildLPS(needle);
        int i = 0; // haystack index
        int j = 0; // needle index

        while (i < haystack.length()) {
            if (haystack.charAt(i) == needle.charAt(j)) {
                i++;
                j++;
                if (j == needle.length()) {
                    return i - j; // found match
                }
            } else {
                if (j != 0) {
                    j = lps[j - 1]; // move pattern pointer
                } else {
                    i++; // move text pointer
                }
            }
        }

        return -1; // not found
    }

    public static void main(String[] args) {
        Solution solution = new Solution();
        String haystack = "hello";
        String needle = "ll";
        int index = solution.strStr(haystack, needle);
        System.out.println("Index of first occurrence: " + index);
    }
}
