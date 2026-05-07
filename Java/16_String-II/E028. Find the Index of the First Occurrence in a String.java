// Find the Index of the First Occurrence in a String --> Z-Function
// https://leetcode.com/problems/find-the-index-of-the-first-occurrence-in-a-string/

class Solution {

    public int strStr(String haystack, String needle) {
        if (needle.isEmpty()) return 0;
        int n = haystack.length(),
            m = needle.length();
        for (int i = 0; i <= n - m; i++) {
            if (haystack.substring(i, i + m).equals(needle)) return i;
        }
        return -1;
    }

    public static void main(String[] args) {
        Solution solution = new Solution();
        String haystack = "hello";
        String needle = "ll";
        int index = solution.strStr(haystack, needle);
        System.out.println("Index of the first occurrence: " + index);
    }
}
