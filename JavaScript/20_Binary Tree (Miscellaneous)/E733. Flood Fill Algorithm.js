/**
 * 733. Flood Fill
 * https://leetcode.com/problems/flood-fill/
 *
 * Type             | Details
 * -----------------+----------------------------------------------------
 * Time Complexity  | O(M * N) – Visit each cell at most once
 * Space Complexity | O(M * N) – Recursion stack in worst case
 */

/**
 * Perform flood fill on an image
 * @param {number[][]} image - 2D grid representing the image
 * @param {number} sr - Starting row
 * @param {number} sc - Starting column
 * @param {number} newColor - New color to fill
 * @returns {number[][]} - Modified image
 */
function floodFill(image, sr, sc, newColor) {
    if (image[sr][sc] === newColor) return image;
    
    const originalColor = image[sr][sc];
    dfs(image, sr, sc, originalColor, newColor);
    return image;
}

/**
 * DFS helper function for flood fill
 * @param {number[][]} image
 * @param {number} r - Current row
 * @param {number} c - Current column
 * @param {number} color - Original color to replace
 * @param {number} newColor - New color to fill
 */
function dfs(image, r, c, color, newColor) {
    if (
        r < 0 ||
        r >= image.length ||
        c < 0 ||
        c >= image[0].length ||
        image[r][c] !== color
    ) {
        return;
    }
    
    image[r][c] = newColor;
    dfs(image, r + 1, c, color, newColor);
    dfs(image, r - 1, c, color, newColor);
    dfs(image, r, c + 1, color, newColor);
    dfs(image, r, c - 1, color, newColor);
}

// Test cases
const image = [
    [1, 1, 1],
    [1, 1, 0],
    [1, 0, 1]
];
const sr = 1, sc = 1, newColor = 2;

const result = floodFill(image, sr, sc, newColor);

for (const row of result) {
    console.log(JSON.stringify(row));
}
// Output:
// [2,2,2]
// [2,2,0]
// [2,0,1]