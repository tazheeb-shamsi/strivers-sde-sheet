// GFG: Matrix Median --> Median in a row-wise sorted Matrix.
// https://www.geeksforgeeks.org/problems/median-in-a-row-wise-sorted-matrix1527/1

// Problem Statement:
// Given a row-wise sorted matrix mat[][] of size n*m,
// where the number of rows and columns is always odd.
// Return the median of the matrix.

// Examples:
// Input: mat[][] = [[1, 3, 5], [2, 6, 9], [3, 6, 9]]
// Output: 5
// Explanation: Sorting matrix elements gives us [1, 2, 3, 3, 5, 6, 6, 9, 9]. Hence, 5 is median.

/**
 * Count elements less than or equal to target in a sorted row
 * @param {number[]} row - Sorted array
 * @param {number} target - Target value
 * @returns {number} - Count of elements <= target
 */
function countLessEqual(row, target) {
    let l = 0;
    let r = row.length;
    while (l < r) {
        const mid = Math.floor((l + r) / 2);
        if (row[mid] <= target) {
            l = mid + 1;
        } else {
            r = mid;
        }
    }
    return l;
}

/**
 * Find the median of a row-wise sorted matrix
 * @param {number[][]} mat - Row-wise sorted matrix
 * @returns {number} - Median of the matrix
 */
function median(mat) {
    const n = mat.length;
    const m = mat[0].length;

    let min = Infinity;
    let max = -Infinity;

    // Find overall min and max from first and last column
    for (let i = 0; i < n; i++) {
        min = Math.min(min, mat[i][0]);
        max = Math.max(max, mat[i][m - 1]);
    }

    // Position of median in sorted order
    const desired = Math.floor((n * m + 1) / 2);

    while (min < max) {
        const mid = min + Math.floor((max - min) / 2);
        let place = 0;

        // Count elements <= mid
        for (let i = 0; i < n; i++) {
            place += countLessEqual(mat[i], mid);
        }

        if (place < desired) {
            min = mid + 1;
        } else {
            max = mid;
        }
    }

    return min;
}

// Test cases
console.log(median([[1, 3, 5], [2, 6, 9], [3, 6, 9]])); // 5
console.log(median([[2, 4, 9], [3, 6, 7], [4, 7, 10]])); // 6
console.log(median([[3], [4], [8]])); // 4