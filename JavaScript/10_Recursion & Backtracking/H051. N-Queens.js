// 51. N-Queens
// https://leetcode.com/problems/n-queens/

/**
 * @param {number} n
 * @return {string[][]}
 */
function solveNQueens(n) {
    const ans = [];
    const fullmask = (1 << n) - 1;

    // Build templates
    const templates = [];
    for (let i = 0; i < n; i++) {
        const row = '.'.repeat(i) + 'Q' + '.'.repeat(n - i - 1);
        templates.push(row);
    }

    function backtrack(queens, r, col, di1, di2) {
        if (r === n) {
            const res = [];
            for (let i = 0; i < n; i++) {
                res.push(templates[queens[i]]);
            }
            ans.push(res);
            return;
        }

        let safe = fullmask & ~(col | di1 | di2);
        while (safe !== 0) {
            const p = safe & -safe;
            const c = Math.log2(p) | 0;

            queens[r] = c;
            backtrack(queens, r + 1, col | p, (di1 | p) << 1, (di2 | p) >> 1);

            safe ^= p;
        }
    }

    backtrack(new Array(n), 0, 0, 0, 0);
    return ans;
}

console.log(solveNQueens(4));
// Output: [[".Q..","...Q","Q...","..Q."],["..Q.","Q...","...Q",".Q.."]]
