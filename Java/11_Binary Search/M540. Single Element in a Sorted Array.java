// 540. Single Element in a Sorted Array
// Find the element that appears once in a sorted array, and the rest element appears twice.
// https://leetcode.com/problems/single-element-in-a-sorted-array/

// Time Complexity: O(log n) (binary search)
// Space Complexity: O(1)

class Solution {
    public int singleNonDuplicate(int[] nums) {
        int left = 0, right = nums.length - 1;
        while (left < right) {
            int mid = left + (right - left) / 2;
            if (mid % 2 == 1) mid--;
            if (nums[mid] != nums[mid + 1]) right = mid;
            else left = mid + 2;
        }
        return nums[left];
    }
    public static void main(String[] args) {
        Solution solution = new Solution();
        int[] nums = {1, 1, 2, 3, 3, 4, 4, 8, 8};
        int result = solution.singleNonDuplicate(nums);
        System.out.println(result);
    }
}