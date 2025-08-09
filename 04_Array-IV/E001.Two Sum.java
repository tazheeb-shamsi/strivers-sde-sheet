// 001.Two Sum a.k.a Target Sum
// leetcode.com/problems/two-sum/

import java.util.*;

class Solution {

    public int[] twoSum(int[] nums, int target) {
        Map<Integer, Integer> map = new HashMap<>();
        for (int i = 0; i < nums.length; i++) {
            int sum = target - nums[i];
            if (map.containsKey(sum)) {
                return new int[] { map.get(sum), i };
            }
            map.put(nums[i], i);
        }
        throw new IllegalArgumentException("No two sum solution");
    }

    public static void main(String[] args) {
        int[] nums = { 2, 7, 11, 15 };
        int target = 9;
        Solution solution = new Solution();
        int[] result = solution.twoSum(nums, target);
        System.out.println(Arrays.toString(result));
    }
}
