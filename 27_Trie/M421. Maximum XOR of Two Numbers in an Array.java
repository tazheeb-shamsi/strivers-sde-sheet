// 421. Maximum XOR of Two Numbers in an Array
// https://leetcode.com/problems/maximum-xor-of-two-numbers-in-an-array/description/

// 421. Maximum XOR of Two Numbers in an Array
import java.util.HashSet;

class Solution {
    public int findMaximumXOR(int[] nums) {
        if (nums == null || nums.length < 2) return 0;

        int max = 0; 
        for (int num : nums) max = Math.max(max, num);
        int mask = Integer.highestOneBit(max); 

        int prefixMask = 0; 
        int answer = 0; 

        while (mask != 0) {
            prefixMask |= mask; 
            int candidate = answer | mask; // tentatively set this bit in answer to 1 
            if (canXor(nums, prefixMask, candidate)) {
                answer = candidate; 
            } 

            mask >>= 1; 
        } 

        return answer; 
    }

    private boolean canXor(int[] nums, int prefixMask, int candidate) {
        HashSet<Integer> seen = new HashSet<>(nums.length); 
        for (int num : nums) {
            int prefix = num & prefixMask; 
            if (seen.contains(prefix ^ candidate)) {
                return true;
            }

            seen.add(prefix); 
        }

        return false; 
    }


    public static void main(String[] args) {
        Solution sol = new Solution();

        int[] nums1 = {3, 10, 5, 25, 2, 8};
        System.out.println(sol.findMaximumXOR(nums1)); // Expected: 28

        int[] nums2 = {14, 70, 53, 83, 49, 91, 36, 80, 92, 51, 66, 70};
        System.out.println(sol.findMaximumXOR(nums2)); // Expected: 127
    }
}
