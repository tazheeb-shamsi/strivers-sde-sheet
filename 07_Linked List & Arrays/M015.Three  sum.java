// Three sum --> 3 Sum == 0
// https://leetcode.com/problems/3sum/
// Time Complexity: O(n^2)
// Space Complexity: O(n)

import java.util.*;

class Solution {

    public List<List<Integer>> threeSum(int[] nums) {
        List<List<Integer>> result = new ArrayList<>();

        if (nums == null || nums.length < 3) return result;

        Arrays.sort(nums); // Step 1: sort the array

        for (int i = 0; i < nums.length - 2; i++) {
            // Skip duplicate elements for i
            if (i > 0 && nums[i] == nums[i - 1]) continue;

            int left = i + 1;
            int right = nums.length - 1;

            while (left < right) {
                int sum = nums[i] + nums[left] + nums[right];

                if (sum == 0) {
                    result.add(Arrays.asList(nums[i], nums[left], nums[right]));

                    // Skip duplicates for left and right
                    while (left < right && nums[left] == nums[left + 1]) left++;
                    while (
                        left < right && nums[right] == nums[right - 1]
                    ) right--;

                    left++;
                    right--;
                } else if (sum < 0) {
                    left++; // Need a bigger number
                } else {
                    right--; // Need a smaller number
                }
            }
        }

        return result;
    }

    public static void main(String[] args) {
        Solution sol = new Solution();

        int[] nums = { -1, 0, 1, 2, -1, -4 };

        List<List<Integer>> triplets = sol.threeSum(nums);

        for (List<Integer> triplet : triplets) {
            System.out.println(triplet);
        }
    }
}
