// Sudoko Solver
// https://leetcode.com/problems/sudoku-solver/
// Write a program to solve a Sudoku puzzle by filling the empty cells.

// A sudoku solution must satisfy all of the following rules

// Each of the digits 1-9 must occur exactly once in each row.
// Each of the digits 1-9 must occur exactly once in each column.
// Each of the digits 1-9 must occur exactly once in each of the 9 3x3 sub-boxes of the grid.
// The '.' character indicates empty cells.

import java.util.*;

class Solution {
    // Solve in-place
    public void solveSudoku(char[][] board) {
        // Bit masks for rows, cols, boxes: bit k (0..8) means digit (k+1) is used
        int[] row = new int[9], col = new int[9], box = new int[9];

        // Collect empty cells (at most 81)
        int[] er = new int[81];
        int[] ec = new int[81];
        int empties = 0;

        // Initialize masks and empties
        for (int r = 0; r < 9; r++) {
            for (int c = 0; c < 9; c++) {
                char ch = board[r][c];
                if (ch == '.') {
                    er[empties] = r;
                    ec[empties] = c;
                    empties++;
                } else {
                    int d = ch - '1';           // 0..8
                    int b = (r/3)*3 + (c/3);    // box index 0..8
                    int bit = 1 << d;
                    row[r] |= bit;
                    col[c] |= bit;
                    box[b] |= bit;
                }
            }
        }

        dfs(0, empties, er, ec, board, row, col, box);
    }

    private boolean dfs(int idx, int total,
                        int[] er, int[] ec, char[][] board,
                        int[] row, int[] col, int[] box) {

        if (idx == total) return true; // all filled

        // Heuristic: choose the next empty with minimum candidates (simple scan)
        int best = -1, bestMask = 0, bestCount = 10;
        for (int i = idx; i < total; i++) {
            int r = er[i], c = ec[i];
            int b = (r/3)*3 + (c/3);
            int used = row[r] | col[c] | box[b];
            int avail = (~used) & 0x1FF; // 9 bits
            int cnt = Integer.bitCount(avail);
            if (cnt < bestCount) {
                bestCount = cnt;
                bestMask = avail;
                best = i;
                if (cnt == 1) break; // can't get better than 1
            }
        }

        // swap the chosen empty into position idx
        if (best != idx) {
            int tmpR = er[idx]; er[idx] = er[best]; er[best] = tmpR;
            int tmpC = ec[idx]; ec[idx] = ec[best]; ec[best] = tmpC;
        }

        int r = er[idx], c = ec[idx];
        int b = (r/3)*3 + (c/3);
        int avail = bestMask;

        // Try each available digit via low-bit iteration
        while (avail != 0) {
            int pick = avail & -avail;         // lowest set bit
            int d = Integer.numberOfTrailingZeros(pick); // 0..8
            int bit = 1 << d;

            // place
            board[r][c] = (char) ('1' + d);
            row[r] |= bit; col[c] |= bit; box[b] |= bit;

            if (dfs(idx + 1, total, er, ec, board, row, col, box)) return true;

            // undo
            row[r] ^= bit; col[c] ^= bit; box[b] ^= bit;
            board[r][c] = '.';

            // remove tried option
            avail ^= pick;
        }

        // No valid digit worked here → backtrack
        return false;
    }
    
    public static void main(String[] args) {
        char[][] board = {
            {'5','3','.','.','7','.','.','.','.'},
            {'6','.','.','1','9','5','.','.','.'},
            {'.','9','8','.','.','.','.','6','.'},
            {'8','.','.','.','6','.','.','.','3'},
            {'4','.','.','8','.','3','.','.','1'},
            {'7','.','.','.','2','.','.','.','6'},
            {'.','6','.','.','.','.','2','8','.'},
            {'.','.','.','4','1','9','.','.','5'},
            {'.','.','.','.','8','.','.','7','9'}
        };
        
        Solution solution = new Solution();
        solution.solveSudoku(board);
        
        for (char[] row : board) {
            System.out.println(Arrays.toString(row));
        }
    }
}