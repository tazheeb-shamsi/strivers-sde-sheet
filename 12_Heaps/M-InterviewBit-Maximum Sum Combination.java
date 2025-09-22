// Maximum Sum Combination
// https://www.interviewbit.com/problems/maximum-sum-combinations/

// Problem Statement:
// Given two arrays A and B of size N each. Find the maximum N elements from the sum combinations (Ai + Bj) formed from elements in array A and B.
// Example:
// Input: A = [1, 4, 2, 3], B = [2, 5, 1, 6], N = 4
// Output: [10, 9, 9, 8]
// Explanation: The maximum 4 elements of the sum combinations are 10(6+4), 9(6+3), 9(5+4), 8(6+2).

import java.util.*;

class Solution {

    public int[] solve(int[] A, int[] B, int C) {
        int n = A.length;

        // Sort both arrays in descending order
        Arrays.sort(A);
        Arrays.sort(B);

        // Reverse both arrays to get descending order
        reverse(A);
        reverse(B);

        // Max heap to store sums with their indices
        PriorityQueue<int[]> pq = new PriorityQueue<>((a, b) -> b[0] - a[0]);
        Set<String> visited = new HashSet<>();

        // Start with the maximum possible sum
        pq.offer(new int[] { A[0] + B[0], 0, 0 });
        visited.add("0,0");

        int[] result = new int[C];
        int index = 0;

        while (index < C && !pq.isEmpty()) {
            int[] curr = pq.poll();
            result[index++] = curr[0];
            int i = curr[1];
            int j = curr[2];

            // Add next possible combinations
            if (i + 1 < n && !visited.contains((i + 1) + "," + j)) {
                pq.offer(new int[] { A[i + 1] + B[j], i + 1, j });
                visited.add((i + 1) + "," + j);
            }

            if (j + 1 < n && !visited.contains(i + "," + (j + 1))) {
                pq.offer(new int[] { A[i] + B[j + 1], i, j + 1 });
                visited.add(i + "," + (j + 1));
            }
        }

        return result;
    }

    private void reverse(int[] arr) {
        int left = 0,
            right = arr.length - 1;
        while (left < right) {
            int temp = arr[left];
            arr[left] = arr[right];
            arr[right] = temp;
            left++;
            right--;
        }
    }

    public static void main(String[] args) {
        Solution solution = new Solution();

        // Test case 1: Basic example
        int[] A1 = { 1, 4, 2, 3 };
        int[] B1 = { 2, 5, 1, 6 };
        int C1 = 4;
        int[] result1 = solution.solve(A1, B1, C1);
        System.out.println("Test 1 - Expected: [10, 9, 9, 8]");
        System.out.print("Test 1 - Actual: [");
        for (int i = 0; i < result1.length; i++) {
            System.out.print(result1[i]);
            if (i < result1.length - 1) System.out.print(", ");
        }
        System.out.println("]");

        // Test case 2: Small identical arrays
        int[] A2 = { 5, 3, 1 };
        int[] B2 = { 5, 3, 1 };
        int C2 = 3;
        int[] result2 = solution.solve(A2, B2, C2);
        System.out.println("Test 2 - Expected: [10, 8, 8]");
        System.out.print("Test 2 - Actual: [");
        for (int i = 0; i < result2.length; i++) {
            System.out.print(result2[i]);
            if (i < result2.length - 1) System.out.print(", ");
        }
        System.out.println("]");

        // Test case 3: Edge case with maximum values
        int[] A3 = { 1000, 999, 998 };
        int[] B3 = { 1000, 999, 998 };
        int C3 = 5;
        int[] result3 = solution.solve(A3, B3, C3);
        System.out.println("Test 3 - Expected: [2000, 1999, 1999, 1998, 1998]");
        System.out.print("Test 3 - Actual: [");
        for (int i = 0; i < result3.length; i++) {
            System.out.print(result3[i]);
            if (i < result3.length - 1) System.out.print(", ");
        }
        System.out.println("]");
    }
}
