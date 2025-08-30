// Max consecutive ones
// https://leetcode.com/problems/max-consecutive-ones/
// Time Complexity: O(n) - Single pass through array
// Space Complexity: O(1) - Only using constant extra space

class Solution {
    public int findMaxConsecutiveOnes(int[] nums) {
        int max = 0;
        int count = 0;
        for (int num : nums) {
            if (num == 1) {
                count++;
                max = Math.max(max, count);
            } else {
                count = 0;
            }
        }
        return max;
    }
    
    public static void main(String[] args) {
        Solution solution = new Solution();
        int[] nums = {1, 1, 0, 1, 1, 1};
        int result = solution.findMaxConsecutiveOnes(nums);
        System.out.println("Max consecutive ones: " + result);
    }
}