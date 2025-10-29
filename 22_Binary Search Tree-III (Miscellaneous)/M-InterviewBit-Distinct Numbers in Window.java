// InterviewBit - Distinct Numbers in Window
// https://www.interviewbit.com/problems/distinct-numbers-in-window/

import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;

class Solution {
    public int[] dNums(int[] A, int B) {
        int[] result = new int[A.length - B + 1];
        Map<Integer, Integer> map = new HashMap<>();
        int distinctCount = 0;
        
        for (int i = 0; i < B; i++) {
            map.put(A[i], map.getOrDefault(A[i], 0) + 1);
            if (map.get(A[i]) == 1) distinctCount++;
        }
        result[0] = distinctCount;
        
        for (int i = B; i < A.length; i++) {
            map.put(A[i], map.getOrDefault(A[i], 0) + 1);
            if (map.get(A[i]) == 1) distinctCount++;
            map.put(A[i - B], map.get(A[i - B]) - 1);
            if (map.get(A[i - B]) == 0) distinctCount--;
            result[i - B + 1] = distinctCount;
        }
        
        return result;
    }
    
    public static void main(String[] args) {
        Solution solution = new Solution();
        int[] A = {1, 2, 1, 3, 4, 3};
        int B = 3;
        int[] result = solution.dNums(A, B);
        System.out.println(Arrays.toString(result));
    }
}