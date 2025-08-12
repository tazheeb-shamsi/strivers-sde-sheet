// 4Sum
// https://leetcode.com/problems/4sum/

import java.util.*;

class Solution {

    public List<List<Integer>> fourSum(int[] nums, int target) {
        Arrays.sort(nums);
        List<List<Integer>> result = new ArrayList<>();
        for (int i = 0; i < nums.length - 3; i++) {
            if (i > 0 && nums[i] == nums[i - 1]) continue; // Skip duplicates
            for (int j = i + 1; j < nums.length - 2; j++) {
                if (j > i + 1 && nums[j] == nums[j - 1]) continue; // Skip duplicates
                int left = j + 1,
                    right = nums.length - 1;
                while (left < right) {
                    long sum =
                        (long) nums[i] + nums[j] + nums[left] + nums[right];
                    if (sum == target) {
                        result.add(
                            Arrays.asList(
                                nums[i],
                                nums[j],
                                nums[left],
                                nums[right]
                            )
                        );
                        while (
                            left < right && nums[left] == nums[left + 1]
                        ) left++; // Skip duplicates
                        while (
                            left < right && nums[right] == nums[right - 1]
                        ) right--; // Skip duplicates
                        left++;
                        right--;
                    } else if (sum < target) left++;
                    else right--;
                }
            }
        }
        return result;
    }

    public static void main(String[] args) {
        Solution solution = new Solution();
        int[] nums = { 1, 0, -1, 0, -2, 2 };
        int target = 0;
        List<List<Integer>> result = solution.fourSum(nums, target);
        System.out.println(result);
    }
}
