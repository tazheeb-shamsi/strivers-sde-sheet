// 37. Sudoku Solver
// https://leetcode.com/problems/sudoku-solver/

/**
 * @param {character[][]} board
 * @return {void} Do not return anything, modify board in-place instead.
 */
function solveSudoku(board) {
    // Bit masks for rows, cols, boxes: bit k (0..8) means digit (k+1) is used
    const row = new Array(9).fill(0);
    const col = new Array(9).fill(0);
    const box = new Array(9).fill(0);

    // Collect empty cells
    const empties = [];

    // Initialize masks and empties
    for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {
            const ch = board[r][c];
            if (ch === '.') {
                empties.push([r, c]);
            } else {
                const d = ch.charCodeAt(0) - '1'.charCodeAt(0);
                const b = Math.floor(r / 3) * 3 + Math.floor(c / 3);
                const bit = 1 << d;
                row[r] |= bit;
                col[c] |= bit;
                box[b] |= bit;
            }
        }
    }

    dfs(0, empties, board, row, col, box);
}

function dfs(idx, empties, board, row, col, box) {
    if (idx === empties.length) return true;

    const [r, c] = empties[idx];
    const b = Math.floor(r / 3) * 3 + Math.floor(c / 3);
    const used = row[r] | col[c] | box[b];
    let avail = (~used) & 0x1FF; // 9 bits

    while (avail !== 0) {
        const pick = avail & -avail; // lowest set bit
        const d = Math.log2(pick) | 0; // 0..8
        const bit = 1 << d;

        // place
        board[r][c] = String.fromCharCode('1'.charCodeAt(0) + d);
        row[r] |= bit;
        col[c] |= bit;
        box[b] |= bit;

        if (dfs(idx + 1, empties, board, row, col, box)) return true;

        // undo
        row[r] ^= bit;
        col[c] ^= bit;
        box[b] ^= bit;
        board[r][c] = '.';

        avail ^= pick;
    }

    return false;
}

const board = [
    ['5', '3', '.', '.', '7', '.', '.', '.', '.'],
    ['6', '.', '.', '1', '9', '5', '.', '.', '.'],
    ['.', '9', '8', '.', '.', '.', '.', '6', '.'],
    ['8', '.', '.', '.', '6', '.', '.', '.', '3'],
    ['4', '.', '.', '8', '.', '3', '.', '.', '1'],
    ['7', '.', '.', '.', '2', '.', '.', '.', '6'],
    ['.', '6', '.', '.', '.', '.', '2', '8', '.'],
    ['.', '.', '.', '4', '1', '9', '.', '.', '5'],
    ['.', '.', '.', '.', '8', '.', '.', '7', '9']
];

solveSudoku(board);
console.log(board);
