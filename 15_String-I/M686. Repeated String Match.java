// Repeated String Match --> Rabin Karp Algorithm
// https://leetcode.com/problems/repeated-string-match/

class Solution {

    public int repeatedStringMatch(String a, String b) {
        int count = 1;
        String temp = a;

        while (temp.length() < b.length()) {
            temp += a;
            count++;
        }

        if (temp.contains(b)) return count;

        if ((temp + a).contains(b)) return count + 1;

        return -1;
    }

    public static void main(String[] args) {
        Solution solution = new Solution();
        String a = "abcd";
        String b = "cdabcdab";
        int result = solution.repeatedStringMatch(a, b);
        System.out.println(result);
    }
}
