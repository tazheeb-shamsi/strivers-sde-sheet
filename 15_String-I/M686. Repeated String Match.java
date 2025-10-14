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
}
