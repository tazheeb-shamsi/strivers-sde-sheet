// 169. Majority Element (>n/2 times)  --> Majority Element (n/2 times)
// https://leetcode.com/problems/majority-element/

class Solution {

    public int majorityElement(int[] nums) {
        int count = 0;
        int candidate = 0;

        for (int num : nums) {
            if (count == 0) {
                candidate = num;
            }
            count += (num == candidate) ? 1 : -1;
        }

        return candidate;
    }

    public static void main(String[] args) {
        Solution solution = new Solution();
        int[] nums1 = { 3, 2, 3 };
        int[] nums2 = { 2, 2, 1, 1, 1, 2, 2 };
        int majorityElement1 = solution.majorityElement(nums1);
        int majorityElement2 = solution.majorityElement(nums2);
        System.out.println("Majority Element : " + majorityElement1);
        System.out.println("Majority Element : " + majorityElement2);
    }
}
