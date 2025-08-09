// 493.Reverse Pairs.
// https://leetcode.com/problems/reverse-pairs/

class Solution {

    public int reversePairs(int[] nums) {
        if (nums == null || nums.length == 0) return 0;
        return mergeSort(nums, 0, nums.length - 1, new int[nums.length]);
    }

    private int mergeSort(int[] nums, int left, int right, int[] temp) {
        if (left >= right) return 0;
        int mid = left + (right - left) / 2;
        int count =
            mergeSort(nums, left, mid, temp) +
            mergeSort(nums, mid + 1, right, temp);

        // Count reverse pairs
        int j = mid + 1;
        for (int i = left; i <= mid; i++) {
            while (j <= right && nums[i] > 2L * nums[j]) j++;
            count += j - (mid + 1);
        }

        // Merge step
        merge(nums, left, mid, right, temp);
        return count;
    }

    private void merge(int[] nums, int left, int mid, int right, int[] temp) {
        int i = left,
            j = mid + 1,
            k = left;

        while (i <= mid && j <= right) {
            if (nums[i] <= nums[j]) {
                temp[k++] = nums[i++];
            } else {
                temp[k++] = nums[j++];
            }
        }

        while (i <= mid) temp[k++] = nums[i++];
        while (j <= right) temp[k++] = nums[j++];

        for (int p = left; p <= right; p++) {
            nums[p] = temp[p];
        }
    }

    public static void main(String[] args) {
        Solution solution = new Solution();
        int[] nums1 = { 1, 3, 2, 3, 1 };
        int[] nums2 = { 2, 4, 3, 5, 1 };
        System.out.println(solution.reversePairs(nums1)); // Output: 2
        System.out.println(solution.reversePairs(nums2)); // Output: 3
    }
}
