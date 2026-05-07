// InterviewBit - Count number of subarrays with given xor K --> Subarray with given XOR
// https://www.interviewbit.com/problems/subarray-with-given-xor/

import java.util.HashMap;

class Solution {

    public int solve(int[] A, int B) {
        int n = A.length;
        int count = 0;
        int xor = 0;
        HashMap<Integer, Integer> map = new HashMap<>();
        map.put(0, 1);

        for (int i = 0; i < n; i++) {
            xor ^= A[i]; // XOR the current element
            int target = xor ^ B; // Find the target XOR
            count += map.getOrDefault(target, 0); // Add count of subarrays with the desired XOR
            map.put(xor, map.getOrDefault(xor, 0) + 1); // Store the frequency of the current XOR
        }

        return count;
    }

    public static void main(String[] args) {
        Solution solution = new Solution();
        int[] A = { 4, 2, 2, 6, 4 }; // Use array, not ArrayList
        int B = 6;
        System.out.println(solution.solve(A, B)); // Output: 4
    }
}
