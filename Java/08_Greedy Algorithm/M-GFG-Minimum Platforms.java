// Minimum Platforms
// Minimum number of platforms required for a railway.
// https://www.geeksforgeeks.org/problems/minimum-platforms-1587115620/1
// Company Tags: Paytm, Amazon, Microsoft, D-E-Shaw, Hike, Walmart, Adobe, Google, Boomerang Commerce, Zillious, Atlassian

import java.util.Arrays;

class Solution {

    public int findPlatform(int[] arr, int[] dep) {
        Arrays.sort(arr);
        Arrays.sort(dep);
        int i = 0,
            j = 0,
            max = 0,
            count = 0;
        while (i < arr.length && j < dep.length) {
            if (arr[i] <= dep[j]) {
                count++;
                i++;
            } else {
                count--;
                j++;
            }
            max = Math.max(max, count);
        }
        return max;
    }

    public static void main(String[] args) {
        int[] arr = { 900, 940, 950, 1100, 1500, 1800 };
        int[] dep = { 910, 1200, 1120, 1130, 1900, 2000 };
        Solution solution = new Solution();
        int minPlatforms = solution.findPlatform(arr, dep);
        System.out.println("Minimum Platforms Required: " + minPlatforms);
    }
}
