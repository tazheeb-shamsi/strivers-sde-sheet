/**
    Given an array like nums = [1, 2, 3], the next permutation is [1, 3, 2].
    If it's the last permutation like [3, 2, 1], then the next should be the smallest one: [1, 2, 3].

    Steps:
    1.Find the first index i from the end where nums[i] < nums[i+1].
    2.If such an i exists:
      Find the smallest number greater than nums[i] to its right (j).
      Swap nums[i] and nums[j].
    3.Reverse the suffix starting from i+1 to the end to get the smallest lexicographical order.
*/
import java.util.Arrays;

class Solution {

    public void nextPermutation(int[] nums) {
        int n = nums.length;
        int i = n - 2;

        // Step 1: Find first decreasing element from right
        while (i >= 0 && nums[i] >= nums[i + 1]) {
            i--;
        }

        // Step 2: Find number just larger than nums[i] and swap
        if (i >= 0) {
            int j = n - 1;
            while (nums[j] <= nums[i]) {
                j--;
            }
            swap(nums, i, j);
        }

        // Step 3: Reverse the elements after i
        reverse(nums, i + 1, n - 1);
    }

    private void swap(int[] nums, int i, int j) {
        int tmp = nums[i];
        nums[i] = nums[j];
        nums[j] = tmp;
    }

    private void reverse(int[] nums, int start, int end) {
        while (start < end) {
            swap(nums, start++, end--);
        }
    }

    public static void main(String[] args) {
        Solution solution = new Solution();
        int[] nums = { 1, 2, 3 };
        solution.nextPermutation(nums);
        System.out.println(Arrays.toString(nums)); // Output: [1, 3, 2]
    }
}
