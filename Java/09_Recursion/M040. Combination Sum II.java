// M.040.Combnation Sum II.java
// https://leetcode.com/problems/combination-sum-ii/

import java.util.*;
class Solution {
    public List<List<Integer>> combinationSum2(int[] candidates, int target) {
        Arrays.sort(candidates);
        List<List<Integer>> result = new ArrayList<>();
            backtrack(candidates, target, 0, new ArrayList<>(), result);
            return result;
    }

    private void backtrack(int[] candidates, int target, int start, List<Integer> path, List<List<Integer>> result) {
        if (target == 0) {
                result.add(new ArrayList<>(path)); 
                return;
        }
            
        for (int i = start; i < candidates.length; i++) {
                if (i > start && candidates[i] == candidates[i - 1]) continue; 
                if (candidates[i] > target) break; 
                
                path.add(candidates[i]);
                backtrack(candidates, target - candidates[i], i + 1, path, result);
                path.remove(path.size() - 1); 
        }
    }
    
    public static void main(String[] args) {
        Solution solution = new Solution();
        int[] candidates = {10, 1, 2, 7, 6, 1, 5};
        int target = 8;
        List<List<Integer>> result = solution.combinationSum2(candidates, target);
        System.out.println(result);
    }
}