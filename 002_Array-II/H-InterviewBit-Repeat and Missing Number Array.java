// InterviewBit Probelem : Repeated and Missing Number in Array

import java.util.*;

class Solution {

    public ArrayList<Integer> repeatedAndMissingNumber(final List<Integer> A) {
        int n = A.size();
        long sumN = ((long) n * (n + 1)) / 2;
        long sumN2 = ((long) n * (n + 1) * (2 * n + 1)) / 6;

        long sumA = 0,
            sumA2 = 0;

        for (int num : A) {
            sumA += num;
            sumA2 += (long) num * num;
        }

        long diff = sumA - sumN; // x - y
        long squareDiff = sumA2 - sumN2; // x^2 - y^2 = (x - y)(x + y)

        long sum = squareDiff / diff; // x + y

        int repeated = (int) ((diff + sum) / 2);
        int missing = (int) (repeated - diff);

        ArrayList<Integer> result = new ArrayList<>();
        result.add(repeated);
        result.add(missing);
        return result;
    }

    public class Main {

        public static void main(String[] args) {
            Solution sol = new Solution();
            List<Integer> input = Arrays.asList(3, 1, 2, 5, 3);
            ArrayList<Integer> result = sol.repeatedAndMissingNumber(input);
            System.out.println("Repeated: " + result.get(0));
            System.out.println("Missing: " + result.get(1));
        }
    }
}
