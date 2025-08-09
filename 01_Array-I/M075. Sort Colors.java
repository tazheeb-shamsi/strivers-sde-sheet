// 75.Sort an array of 0's, 1's and 2's AKA --> Sort Colors (Dutch National Flag problem)

import java.util.Arrays;

class Solution {

    public void sortColors(int[] nums) {
        int low = 0,
            mid = 0,
            high = nums.length - 1;

        // Dutch National Flag algorithm
        while (mid <= high) {
            if (nums[mid] == 0) {
                swap(nums, low++, mid++);
            } else if (nums[mid] == 1) {
                mid++;
            } else {
                swap(nums, mid, high--);
            }
        }
    }

    private void swap(int[] nums, int i, int j) {
        int temp = nums[i];
        nums[i] = nums[j];
        nums[j] = temp;
    }

    // 🔽 Main method for testing
    public static void main(String[] args) {
        Solution sol = new Solution();
        int[] nums = { 2, 0, 2, 1, 1, 0 };
        sol.sortColors(nums);
        System.out.println(Arrays.toString(nums)); // Output: [0, 0, 1, 1, 2, 2]
    }
}
