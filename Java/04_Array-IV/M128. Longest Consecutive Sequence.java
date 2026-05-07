// 128. Longest Consecutive Sequence
// https://leetcode.com/problems/longest-consecutive-sequence/
import java.util.Arrays;

class Solution {

    public int longestConsecutive(int[] nums) {
        if (nums.length == 0) return 0;
        Arrays.sort(nums);
        int longestStreak = 1;
        int currentStreak = 1;

        for (int i = 1; i < nums.length; i++) {
            if (nums[i] != nums[i - 1]) {
                if (nums[i] == nums[i - 1] + 1) {
                    currentStreak++;
                } else {
                    longestStreak = Math.max(longestStreak, currentStreak);
                    currentStreak = 1;
                }
            }
        }

        return Math.max(longestStreak, currentStreak);
    }

    public static void main(String[] args) {
        Solution solution = new Solution();
        int[] nums = { 100, 4, 3, 3, 200, 1, 1, 1, 3, 2 };
        int result = solution.longestConsecutive(nums);
        System.out.println(result);
    }
}
