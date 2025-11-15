// TUF: Power Set
// https://takeuforward.org/plus/dsa/problems/power-set

/**
Given an array of integers nums of unique elements. Return all possible subsets (power set) of the array.
Do not include the duplicates in the answer.

Examples:
Input : nums = [1, 2, 3]
Output : [ [ ] , [1] , [2] , [1, 2] , [3] , [1, 3] , [2, 3] , [1, 2 ,3] ]

Input : nums = [1, 2]
Output : [ [ ] , [1] , [2] , [1,2] ]
 */

import java.util.ArrayList;
import java.util.List;

class Solution {
    public List<List<Integer>> powerSet(int[] nums) {
        List<List<Integer>> result = new ArrayList<>();
        if (nums == null) return result;

        int n = nums.length;
        int total = 1 << n; // 2^n subsets

        for (int mask = 0; mask < total; mask++) {
            List<Integer> subset = new ArrayList<>();
            for (int i = 0; i < n; i++) {
                if ((mask & (1 << i)) != 0) {
                    subset.add(nums[i]);
                }
            }
            result.add(subset);
        }

        return result;
    }

    public static void main(String[] args) {
        Solution sol = new Solution();
        int[] nums = {1, 2, 3};
        System.out.println(sol.powerSet(nums));
    }
}