// Largest Subarray with 0 sum a.k.a Largest Subarray with K sum
// https://geeksforgeeks.org/problems/largest-subarray-with-0-sum/1
import java.util.HashMap;

class Solution {
    public int maxLen(int[] arr, int n) {
        HashMap<Integer, Integer> map = new HashMap<>();
        int sum = 0;
        int maxLen = 0;
        for (int i = 0; i < n; i++) {
            sum += arr[i];
            if (sum == 0) {
                maxLen = i + 1;
            } else {
                if (map.containsKey(sum)) {
                    maxLen = Math.max(maxLen, i - map.get(sum));
                } else {
                    map.put(sum, i);
                }
            }
        }
        return maxLen;
    }
    
    public static void main(String[] args) {
        int[] arr = {15, -2, 2, -8, 1, 7, 10, 23};
        int n = arr.length;
        Solution solution = new Solution();
        int maxLen = solution.maxLen(arr, n);
        System.out.println("Length of the largest subarray with 0 sum: " + maxLen);
    }
}