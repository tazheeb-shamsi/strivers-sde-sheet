import java.util.*;

class Solution {

    public List<List<Integer>> generate(int numRows) {
        List<List<Integer>> res = new ArrayList<>(numRows);

        for (int i = 0; i < numRows; i++) {
            List<Integer> row = new ArrayList<>(i + 1);
            row.add(1); // first element is always 1

            for (int j = 1; j < i; j++) {
                // sum of two elements from the previous row
                int val = res.get(i - 1).get(j - 1) + res.get(i - 1).get(j);
                row.add(val);
            }

            if (i > 0) row.add(1); // last element is 1 (if more than 1 element)
            res.add(row);
        }

        return res;
    }

    public static void main(String[] args) {
        Solution sol = new Solution();
        int numRows = 5; // You can change this to test different values

        List<List<Integer>> triangle = sol.generate(numRows);

        // Print the triangle
        for (List<Integer> row : triangle) {
            System.out.println(row);
        }
    }
}
