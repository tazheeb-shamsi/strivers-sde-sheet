// TUF-The Celebrity Problem
// https://leetcode.com/problems/find-the-celebrity/

/**
 * Problem Statement:
 * A celebrity is a person who is known by everyone else at the party but does not know anyone in return.
 * Given a square matrix M of size N x N where M[i][j] is 1 if person i knows person j, and 0 otherwise,
 * determine if there is a celebrity at the party.
 * Return the index of the celebrity or -1 if no such person exists.

 Note that M[i][i] is always 0.
 */

public class CelebrityProblem {

    // Helper function using matrix
    static boolean knows(int[][] mat, int a, int b) {
        return mat[a][b] == 1;
    }

    // Function to find celebrity
    public static int findCelebrity(int[][] mat) {
        int n = mat.length;
        int candidate = 0;

        // Step 1: Find candidate
        for (int i = 1; i < n; i++) {
            if (knows(mat, candidate, i)) {
                candidate = i; // candidate cannot be celebrity
            }
        }

        // Step 2: Verify candidate
        for (int i = 0; i < n; i++) {
            if (i != candidate) {
                if (knows(mat, candidate, i) || !knows(mat, i, candidate)) {
                    return -1; // No celebrity
                }
            }
        }

        return candidate; // Celebrity found
    }

    public static void main(String[] args) {
        int[][] mat = { { 1, 1, 0 }, { 0, 1, 0 }, { 0, 1, 1 } };

        int celeb = findCelebrity(mat);

        if (celeb == -1) {
            System.out.println("No celebrity found");
        } else {
            System.out.println("Celebrity is person " + celeb);
        }
    }
}
