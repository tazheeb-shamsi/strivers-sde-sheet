// GFG: Find nth root of m --> The N-th root of an integer.
// https://www.geeksforgeeks.org/problems/find-nth-root-of-m5843/1

// You are given 2 numbers n and m, the task is to find n√m (nth root of m).
// If the root is not integer then returns -1
// Examples :
// Input: n = 3, m = 27
// Output: 3
// Explanation: 33 = 27

// Input: n = 3, m = 9
// Output: -1
// Explanation: 3rd root of 9 is not integer.

// Input: n = 4, m = 625
// Output: 5
// Explanation: 54 = 625

class Solution {

    public int nthRoot(int n, int m) {
        if (m == 0) return 0;
        if (m == 1) return 1;

        int low = 1,
            high = m;

        while (low <= high) {
            int mid = low + (high - low) / 2;
            long pow = power(mid, n, m); // safe power computation

            if (pow == m) {
                return mid;
            } else if (pow < m) {
                low = mid + 1;
            } else {
                high = mid - 1;
            }
        }

        return -1;
    }

    // Compute base^exp but stop if > limit
    private long power(long base, int exp, int limit) {
        long result = 1;
        for (int i = 0; i < exp; i++) {
            result *= base;
            if (result > limit) return result; // early stop
        }
        return result;
    }

    public static void main(String[] args) {
        Solution sol = new Solution();
        System.out.println(sol.nthRoot(3, 27)); // 3
        System.out.println(sol.nthRoot(3, 9)); // -1
        System.out.println(sol.nthRoot(4, 625)); // 5
    }
}
