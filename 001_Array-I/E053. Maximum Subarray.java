// 53. Maximum Subarray --> Kadane's Algorithm
// https://leetcode.com/problems/maximum-subarray/

class Solution {

    // Kadane's Algorithm
    public int maxSubArray(int[] nums) {
        int maxSoFar = nums[0];
        int currMax = nums[0];

        for (int i = 1; i < nums.length; i++) {
            currMax = Math.max(nums[i], currMax + nums[i]); // extend or start new subarray
            maxSoFar = Math.max(maxSoFar, currMax); // update global max
        }

        return maxSoFar;
    }

    // 🔽 Main method for testing
    public static void main(String[] args) {
        Solution sol = new Solution();
        int[] nums = { -2, 1, -3, 4, -1, 2, 1, -5, 4 };
        int result = sol.maxSubArray(nums);
        System.out.println("Maximum Subarray Sum: " + result); // Output: 6
    }
}
