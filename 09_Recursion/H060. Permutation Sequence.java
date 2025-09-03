//Permutation Sequence --> K-th permutation Sequence
// https://leetcode.com/problems/permutation-sequence/

import java.util.*;

class Solution {
    public String getPermutation(int n, int k) {
        int[] factorial = new int[n + 1];
        factorial[0] = 1;
        for (int i = 1; i <= n; i++) {
            factorial[i] = factorial[i - 1] * i;
        }

        StringBuilder sb = new StringBuilder();
        List<Integer> nums = new ArrayList<>();
        for (int i = 1; i <= n; i++) {
            nums.add(i);
        }

        k--;
        for (int i = n; i >= 1; i--) {
            int index = k / factorial[i - 1];
            sb.append(nums.get(index));
            nums.remove(index);
            k %= factorial[i - 1];
        }

        return sb.toString();
    }
    
    public static void main(String[] args) {
        Solution solution = new Solution();
        System.out.println(solution.getPermutation(3, 3));
    }
}