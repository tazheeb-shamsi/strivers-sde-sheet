// 455. Assign Cookies.
// https://leetcode.com/problems/assign-cookies/
import java.util.Arrays;
class Solution {

    public int findContentChildren(int[] g, int[] s) {
        Arrays.sort(g);
        Arrays.sort(s);
        int i = 0; // pointer for children
        int j = 0; // pointer for cookies
        while (i < g.length && j < s.length) {
            if (g[i] <= s[j]) {
                i++;
            }
            j++;
        }
        return i;
    }   

    public static void main(String[] args) {
        Solution solution = new Solution();
        int[] g = { 1, 2, 3 };
        int[] s = { 1, 1 };
        System.out.println(solution.findContentChildren(g, s));
    }
}
