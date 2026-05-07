// Remove Duplicate from Sorted array
// https://leetcode.com/problems/remove-duplicates-from-sorted-array/
// Time Complexity: O(n) - Single pass through array
// Space Complexity: O(1) - Only using constant extra space

import java.util.Arrays;

class Solution {

    public int removeDuplicates(int[] nums) {
        // Handle edge cases
        if (nums.length <= 1) return nums.length;

        // Two-pointer approach: i tracks position for next unique element
        int i = 0;

        // j scans through the array looking for unique elements
        for (int j = 1; j < nums.length; j++) {
            // When we find a new unique element
            if (nums[j] != nums[i]) {
                i++;
                nums[i] = nums[j];
            }
        }
        return i + 1;
    }

    public static void main(String[] args) {
        Solution solution = new Solution();
        int[] nums = { 1, 1, 2, 2, 3, 3, 4, 4, 5, 5 };
        int length = solution.removeDuplicates(nums);
        System.out.println("Length: " + length);
        System.out.println(
            "Array: " + Arrays.toString(Arrays.copyOf(nums, length))
        );
    }
}
