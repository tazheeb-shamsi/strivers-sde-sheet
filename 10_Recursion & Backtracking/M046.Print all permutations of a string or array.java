// Print all permutations of a string/array
// https://leetcode.com/problems/permutations/
/*
Given an array nums of distinct integers, return all the possible permutations.
You can return the answer in any order.

Example 1:
Input: nums = [1,2,3]
Output: [[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]

Example 2
Input: nums = [0,1]
Output: [[0,1],[1,0]]

Example 3:
Input: nums = [1]
Output: [[1]]
*/
import java.util.*;

class Solution {

    List<List<Integer>> permutations = new ArrayList<>();

    public List<List<Integer>> permute(int[] nums) {
        backtrack(nums, 0);
        return permutations;
    }

    public void backtrack(int[] nums, int idx) {
        if (idx == nums.length) {
            List<Integer> permutation = new ArrayList<>();
            for (int num : nums) permutation.add(num);
            permutations.add(permutation);
            return;
        }
        for (int i = idx; i < nums.length; i++) {
            swap(nums, i, idx);
            backtrack(nums, idx + 1);
            swap(nums, i, idx);
        }
    }

    public void swap(int[] a, int i, int j) {
        int temp = a[i];
        a[i] = a[j];
        a[j] = temp;
    }

    public static void main(String[] args) {
        Solution solution = new Solution();
        int[] nums = { 1, 2, 3 };
        List<List<Integer>> permutations = solution.permute(nums);
        System.out.println(permutations);
    }
}
