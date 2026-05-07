// GFG: Matrix Median --> Median in a row-wise sorted Matrix.
// https://www.geeksforgeeks.org/problems/median-in-a-row-wise-sorted-matrix1527/1

// Problem Statement:
// Given a row-wise sorted matrix mat[][] of size n*m,
// where the number of rows and columns is always odd.
// Return the median of the matrix.

// Examples:

// Input: mat[][] = [[1, 3, 5],
//                 [2, 6, 9],
//                 [3, 6, 9]]
// Output: 5
// Explanation: Sorting matrix elements gives us [1, 2, 3, 3, 5, 6, 6, 9, 9].
// Hence, 5 is median.

// Input: mat[][] = [[2, 4, 9],
//                 [3, 6, 7],
//                 [4, 7, 10]]
// Output: 6
// Explanation: Sorting matrix elements gives us [2, 3, 4, 4, 6, 7, 7, 9, 10].
// Hence, 6 is median.

// Input: mat = [[3], [4], [8]]
// Output: 4
// Explanation: Sorting matrix elements gives us [3, 4, 8].
// Hence, 4 is median.

import java.util.*;

class Solution {

    public int median(int[][] mat) {
        int n = mat.length;
        int m = mat[0].length;

        int min = Integer.MAX_VALUE,
            max = Integer.MIN_VALUE;

        // Find overall min and max from first and last column
        for (int i = 0; i < n; i++) {
            min = Math.min(min, mat[i][0]);
            max = Math.max(max, mat[i][m - 1]);
        }
        // position of median in sorted order
        int desired = (n * m + 1) / 2;

        while (min < max) {
            int mid = min + (max - min) / 2;
            int place = 0;

            // Count elements <= mid
            for (int i = 0; i < n; i++) {
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

    // Helper: count elements <= target in a sorted row
    private int countLessEqual(int[] row, int target) {
        int l = 0,
            r = row.length;
        while (l < r) {
            int mid = (l + r) / 2;
            if (row[mid] <= target) l = mid + 1;
            else r = mid;
        }
        return l;
    }

    public static void main(String[] args) {
        Solution sol = new Solution();

        int[][] mat1 = { { 1, 3, 5 }, { 2, 6, 9 }, { 3, 6, 9 } };
        System.out.println(sol.median(mat1)); // 5

        int[][] mat2 = { { 2, 4, 9 }, { 3, 6, 7 }, { 4, 7, 10 } };
        System.out.println(sol.median(mat2)); // 6

        int[][] mat3 = { { 3 }, { 4 }, { 8 } };
        System.out.println(sol.median(mat3)); // 4
    }
}


    // Optimal Binary Search Solution: O(