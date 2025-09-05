//SphereOnlineJudge: Aggressive Cows
// https://www.spoj.com/problems/AGGRCOW/

// Farmer John has built a new long barn, with N (2 ≤ N ≤ 100,000) stalls. 
// The stalls are located along a straight line at positions x1 ... xN (0 ≤ xi ≤ 1,000,000,000).

// His C (2 ≤ C ≤ N) cows don't like this barn layout and become aggressive towards each other once put into a stall. 
// To prevent the cows from hurting each other, Farmer John wants to assign the cows to the stalls, 
// such that the minimum distance between any two of them is as large as possible. 
// What is the largest minimum distance?

// Input:
// t – the number of test cases, then t test cases follows.
// Line 1: Two space-separated integers: N and C
// Lines 2..N+1: Line i+1 contains an integer stall location, xi

// Output:
// For each test case output one integer: the largest minimum distance.

import java.util.Arrays;

class Solution {

    public int solve(int[] stalls, int cows) {
        Arrays.sort(stalls);
        int n = stalls.length;
        int low = 1;
        int high = stalls[n - 1] - stalls[0];
        int ans = 0;

        while (low <= high) {
            int mid = low + (high - low) / 2;
            if (canPlaceCows(stalls, cows, mid)) {
                ans = mid;
                low = mid + 1;
            } else {
                high = mid - 1;
            }
        }

        return ans;
    }

    private boolean canPlaceCows(int[] stalls, int cows, int minDist) {
        int count = 1;
        int lastPos = stalls[0];

        for (int i = 1; i < stalls.length; i++) {
            if (stalls[i] - lastPos >= minDist) {
                count++;
                lastPos = stalls[i];
            }
        }

        return count >= cows;
    }

    public static void main(String[] args) {
        int[] stalls = { 1, 5, 2, 8, 4, 9 };
        int cows = 3;
        Solution solution = new Solution();
        int result = solution.solve(stalls, cows);
        System.out.println(result); // Output: 4
    }
}
