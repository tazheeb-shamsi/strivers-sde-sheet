// 152. Maximum Product Subarray
// https://leetcode.com/problems/maximum-product-subarray/

class Solution {
    public int maxProduct(int[] nums) {
        if (nums == null || nums.length == 0) {
            return 0;
        }
        
        int maxProduct = nums[0];
        int minProduct = nums[0];
        int result = nums[0];
        
        for (int i = 1; i < nums.length; i++) {
            // Store the current max because it will be updated
            int currentMax = maxProduct;
            
            // Update max and min products
            maxProduct = Math.max(nums[i], Math.max(nums[i] * currentMax, nums[i] * minProduct));
            minProduct = Math.min(nums[i], Math.min(nums[i] * currentMax, nums[i] * minProduct));
            
            // Update the result
            result = Math.max(result, maxProduct);
        }
        
        return result;
    }

    public static void main(String[] args) {
        Solution solution = new Solution();
        
        // Test cases
        int[] nums1 = {2, 3, -2, 4};
        System.out.println("Test case 1: " + solution.maxProduct(nums1)); // Expected: 6
        
        int[] nums2 = {-2, 0, -1};
        System.out.println("Test case 2: " + solution.maxProduct(nums2)); // Expected: 0
        
        int[] nums3 = {2, 3, -2, 4, -1};
        System.out.println("Test case 3: " + solution.maxProduct(nums3)); // Expected: 48
    }
}