// 645. Set Mismatch
// https://leetcode.com/problems/set-mismatch/

// Type             | Details
// -----------------+----------------------------------------------------
// Time Complexity  | O(N)
// Space Complexity | O(N) for counting array

class Solution {
    public int[] findErrorNums(int[] nums) {
        int n = nums.length;
        int[] freq = new int[n + 1];
        for (int num : nums) {
            freq[num]++;
        }

        int duplicate = -1, missing = -1;
        for (int i = 1; i <= n; i++) {
            if (freq[i] == 2) duplicate = i;
            else if (freq[i] == 0) missing = i;
        }
        return new int[]{duplicate, missing};
    }

    public static void main(String[] args) {
        Solution sol = new Solution();
        System.out.println(java.util.Arrays.toString(sol.findErrorNums(new int[]{1, 2, 2, 4})));
    }
}