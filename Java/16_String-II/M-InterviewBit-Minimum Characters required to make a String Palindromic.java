// InterviewBit: Minimum Characters required to make a String Palindromic
// https://www.interviewbit.com/problems/minimum-characters-required-to-make-a-string-palindromic/

class Solution {

    public int solve(String A) {
        String rev = new StringBuilder(A).reverse().toString();
        String concat = A + "$" + rev;

        int[] lps = new int[concat.length()];
        int i = 1,
            len = 0;

        while (i < concat.length()) {
            if (concat.charAt(i) == concat.charAt(len)) {
                len++;
                lps[i] = len;
                i++;
            } else {
                if (len != 0) {
                    len = lps[len - 1];
                } else {
                    lps[i] = 0;
                    i++;
                }
            }
        }

        return A.length() - lps[concat.length() - 1];
    }
}
