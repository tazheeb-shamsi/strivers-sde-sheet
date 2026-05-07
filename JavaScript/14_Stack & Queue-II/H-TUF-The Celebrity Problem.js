// TUF: The Celebrity Problem
// https://leetcode.com/problems/find-the-celebrity/

// Problem Statement:
// A celebrity is a person who is known by everyone else at the party but does not know anyone in return.
// Given a square matrix M of size N x N where M[i][j] is 1 if person i knows person j, and 0 otherwise,
// determine if there is a celebrity at the party.
// Return the index of the celebrity or -1 if no such person exists.

/**
 * Helper function to check if person a knows person b
 * @param {number[][]} mat - Adjacency matrix
 * @param {number} a - Person a
 * @param {number} b - Person b
 * @returns {boolean} - True if a knows b
 */
function knows(mat, a, b) {
    return mat[a][b] === 1;
}

/**
 * Find the celebrity in the party
 * @param {number[][]} mat - Adjacency matrix
 * @returns {number} - Index of celebrity or -1 if none exists
 */
function findCelebrity(mat) {
    const n = mat.length;
    let candidate = 0;

    // Step 1: Find candidate
    for (let i = 1; i < n; i++) {
        if (knows(mat, candidate, i)) {
            candidate = i; // candidate cannot be celebrity if they know someone
        }
    }

    // Step 2: Verify candidate
    for (let i = 0; i < n; i++) {
        if (i !== candidate) {
            // Celebrity should not know anyone and everyone should know celebrity
            if (knows(mat, candidate, i) || !knows(mat, i, candidate)) {
                return -1; // No celebrity
            }
        }
    }

    return candidate; // Celebrity found
}

// Test cases
const mat1 = [
[0, 1, 0],
[0, 0, 0],
[0, 1, 0]
];
console.log(findCelebrity(mat1)); // 1 (person 1 is celebrity)

const mat2 = [
[0, 1, 1],
[1, 0, 1],
[1, 1, 0]
];
console.log(findCelebrity(mat2)); // -1 (no celebrity)

const mat3 = [
[0, 0, 1, 0],
[0, 0, 1, 0],
[0, 0, 0, 0],
[0, 0, 1, 0]
];
console.log(findCelebrity(mat3)); // 2