// TUF: Find Maximum of Minimums for Every Window Size
// https://takeuforward.org/plus/dsa/problems/maximum-of-minimums-for-every-window-size

/** Problem Statement:

 * Given an array arr[] of size n, for every window size i from 1 to n,
 * find the maximum of the minimum of all contiguous subarrays of size i.

 * --> Return an array of size n where the i-th element contains the maximum of minimums for window size i + 1.

 Constraints:
 1 <= n <= 10^5
 1 <= arr[i] <= 10^6

 Example:
 Input: arr = [10, 20, 30, 50, 10, 70, 30]
 Output: [70, 30, 20, 10, 10, 10, 10]

 Explanation:
 Window size 1: max of [10, 20, 30, 50, 10, 70, 30] → 70
 Window size 2: max of [10,20], [20,30], ..., [70,30] → max of all mins → 30 ... and so on.
 */

import java.util.*;

public class Solution {

    public static int[] maxOfMin(int[] arr) {
        int n = arr.length;
        int[] left = new int[n]; // Previous smaller
        int[] right = new int[n]; // Next smaller
        Arrays.fill(left, -1);
        Arrays.fill(right, n);

        Stack<Integer> stack = new Stack<>();

        // Previous smaller
        for (int i = 0; i < n; i++) {
            while (!stack.isEmpty() && arr[stack.peek()] >= arr[i]) {
                stack.pop();
            }
            if (!stack.isEmpty()) {
                left[i] = stack.peek();
            }
            stack.push(i);
        }

        stack.clear();

        // Next smaller
        for (int i = n - 1; i >= 0; i--) {
            while (!stack.isEmpty() && arr[stack.peek()] >= arr[i]) {
                stack.pop();
            }
            if (!stack.isEmpty()) {
                right[i] = stack.peek();
            }
            stack.push(i);
        }

        // Result array
        int[] res = new int[n];
        Arrays.fill(res, Integer.MIN_VALUE);

        // Fill res[length-1] with max of mins
        for (int i = 0; i < n; i++) {
            int length = right[i] - left[i] - 1;
            res[length - 1] = Math.max(res[length - 1], arr[i]);
        }

        // Fill empty entries
        for (int i = n - 2; i >= 0; i--) {
            res[i] = Math.max(res[i], res[i + 1]);
        }

        return res;
    }

    public static void main(String[] args) {
        int[] arr1 = { 10, 20, 30, 50, 10, 70, 30 };
        int[] arr2 = { 6, 3, 5, 1, 12 };
        int[] arr3 = { 1, 2, 3, 4 };
        Solution Result = new Solution();
        System.out.println(Arrays.toString(Result.maxOfMin(arr1))); // [70, 30, 20, 10, 10, 10, 10]
        System.out.println(Arrays.toString(Result.maxOfMin(arr2))); // [12, 5, 3, 3, 1]
        System.out.println(Arrays.toString(Result.maxOfMin(arr3))); // [4, 3, 2, 1]
    }
}
