/**
 * Next Smaller Element or Nearest Smaller Element - InterviewBit
 * https://www.interviewbit.com/problems/nearest-smaller-element/
 *
 * Problem Statement:
 * Given an array, find the nearest smaller element G[i] for every element A[i] in the array such that the element has an index smaller than i.
 *
 * More formally,
 *     G[i] for an element A[i] = an element A[j] such that
 *     j is maximum possible AND
 *     j < i AND
 *     A[j] < A[i]
 * Elements for which no smaller element exist, consider next smaller element as -1.
 *
 * Input Format: The only argument given is integer array A.
 * Output Format: Return the integer array G such that G[i] contains nearest smaller number than A[i].If no such element occurs G[i] should be -1.
 */

import java.util.Arrays;
import java.util.Stack;

class Solution {

    public int[] prevSmaller(int[] A) {
        int n = A.length;
        int[] result = new int[n];
        Stack<Integer> stack = new Stack<>();

        for (int i = 0; i < n; i++) {
            while (!stack.isEmpty() && stack.peek() >= A[i]) {
                stack.pop();
            }
            result[i] = stack.isEmpty() ? -1 : stack.peek();
            stack.push(A[i]);
        }

        return result;
    }

    public static void main(String[] args) {
        Solution solution = new Solution();
        int[] A = { 4, 5, 2, 10, 8 };
        int[] result = solution.prevSmaller(A);

        System.out.println(
            "Previous Smaller Element: " + Arrays.toString(result)
        );
    }
}
