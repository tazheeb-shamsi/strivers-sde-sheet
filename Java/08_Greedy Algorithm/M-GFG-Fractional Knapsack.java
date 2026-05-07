// Fractional Knapsack
// https://www.geeksforgeeks.org/problems/fractional-knapsack-1587115620/1
// Company Tags: Microsoft

/* Statement:
 * Given two arrays, val[] and wt[] , representing the values and weights of items,
 * and an integer capacity representing the maximum weight a knapsack can hold,
 * determine the maximum total value that can be achieved by putting items in the knapsack.
 * You are allowed to break items into fractions if necessary.
 * Return the maximum value as a double, rounded to 6 decimal places.

 * Examples :
    * Input: val[] = [60, 100, 120], wt[] = [10, 20, 30], capacity = 50
    * Output: 240.000000
 * Explanation: By taking items of weight 10 and 20 kg and 2/3 fraction of 30 kg.
   Hence total price will be 60+100+(2/3)(120) = 240
    * Input: val[] = [500], wt[] = [30], capacity = 10
    * Output: 166.670000
 * Explanation: Since the item’s weight exceeds capacity, we take a fraction 10/30 of it, yielding value 166.670000.
 * Constraints:
    * 1 ≤ val.size = wt.size ≤ 105
    * 1 ≤ capacity ≤ 109
    * 1 ≤ val[i], wt[i] ≤ 104
*/
import java.util.Arrays;

class Solution {

    public double fractionalKnapsack(int[] val, int[] wt, int capacity) {
        int n = val.length;
        double[][] items = new double[n][2];
        for (int i = 0; i < n; i++) {
            items[i][0] = val[i];
            items[i][1] = wt[i];
        }
        Arrays.sort(items, (a, b) -> Double.compare(b[0] / b[1], a[0] / a[1]));
        double maxVal = 0;
        for (double[] item : items) {
            if (capacity >= item[1]) {
                maxVal += item[0];
                capacity -= item[1];
            } else {
                maxVal += (item[0] * capacity) / item[1];
                break;
            }
        }
        return Math.round(maxVal * 1000000) / 1000000.0;
    }

    public static void main(String[] args) {
        int[] val = { 500 };
        int[] wt = { 30 };
        int capacity = 10;
        Solution solution = new Solution();
        double result = solution.fractionalKnapsack(val, wt, capacity);
        System.out.println(result); // Output: 166.666667
    }
}
