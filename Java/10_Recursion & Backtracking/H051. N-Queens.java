// N-Queens
// https://leetcode.com/problems/n-queens/

import java.util.*;

class Solution {

    private List<List<String>> ans = new ArrayList<>();
    private String[] templates;
    private int n;
    private int fullmask;

    public List<List<String>> solveNQueens(int n) {
        this.n = n;
        this.fullmask = (1 << n) - 1;
        buildTemplates();

        int col = 0;
        int di1 = 0;
        int di2 = 0;

        backtrack(new int[n], 0, n, col, di1, di2);
        return ans;
    }

    private void backtrack(
        int[] queens,
        int r,
        int n,
        int col,
        int di1,
        int di2
    ) {
        if (r == n) {
            List<String> res = new ArrayList<>();
            for (int i = 0; i < n; i++) {
                res.add(templates[queens[i]]);
            }
            ans.add(res);
            return;
        }

        int safe = fullmask & ~(col | di1 | di2);
        while (safe != 0) {
            int p = (safe & -safe);
            int c = Integer.bitCount(p - 1);

            queens[r] = c;
            backtrack(
                queens,
                r + 1,
                n,
                col | p,
                (di1 | p) << 1,
                (di2 | p) >> 1
            );

            safe ^= p;
        }
    }

    private void buildTemplates() {
        templates = new String[n];
        char[] row = new char[n];
        Arrays.fill(row, '.');

        for (int i = 0; i < n; i++) {
            row[i] = 'Q';
            templates[i] = new String(row);
            row[i] = '.';
        }
    }

    public static void main(String[] args) {
        Solution solution = new Solution();
        List<List<String>> result = solution.solveNQueens(4);
        System.out.println(result);
    }
}
