// Combination Sum
// https://leetcode.com/problems/combination-sum/

import java.util.*;

class Solution {
    public List<List<Integer>> combinationSum(int[] candidates, int target) {
        Arrays.sort(candidates);  // sort for pruning
        List<List<Integer>> result = new ArrayList<>();
        backtrack(result, new ArrayList<>(), candidates, target, 0);
        return result;
    }
    
    private void backtrack(List<List<Integer>> result, List<Integer> current, int[] candidates, int target, int start) {
        if (target == 0) {
            result.add(new ArrayList<>(current)); // only copy here
            return;
        }
            
        for (int i = start; i < candidates.length; i++) {
            int val = candidates[i];
            if (val > target) break;  
                
            current.add(val);
            backtrack(result, current, candidates, target - val, i);
            current.remove(current.size() - 1);
        }
    }

    public static void main(String[] args) {
        Solution solution = new Solution();
        int[] candidates = { 2, 3, 6, 7 };
        int target = 7;
        List<List<Integer>> result = solution.combinationSum(
            candidates,
            target
        );
        System.out.println(result);
    }
}
