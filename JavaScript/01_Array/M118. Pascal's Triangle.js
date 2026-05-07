// 118. Pascal's Triangle
// https://leetcode.com/problems/pascals-triangle/

/**
 * @param {number} numRows
 * @return {number[][]}
 */
function generate(numRows) {
    const res = [];

    for (let i = 0; i < numRows; i++) {
        const row = [];
        row.push(1); // first element is always 1

        for (let j = 1; j < i; j++) {
            // sum of two elements from the previous row
            const val = res[i - 1][j - 1] + res[i - 1][j];
            row.push(val);
        }

        if (i > 0) row.push(1); // last element is 1 (if more than 1 element)
        res.push(row);
    }

    return res;
}

console.log(generate(5)); // Output: [[1], [1, 1], [1, 2, 1], [1, 3, 3, 1], [1, 4, 6, 4, 1]]

