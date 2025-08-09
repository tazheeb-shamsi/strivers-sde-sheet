// 50. Pow(x, n) --> Implement pow(x, n), which calculates x raised to the power n (i.e., xn).
// e.g. x^n = 2^3 = 8 = 2 * 2 * 2
class Solution {

    public double myPow(double x, int n) {
        // If n is 0, return 1 (base case)
        if (n == 0) return 1;

        // Handle negative powers
        if (n < 0) {
            x = 1 / x; // Convert x^(-n) to 1 / (x^n)
            n = -n; // Make n positive
        }

        // Efficient exponentiation by squaring
        return powHelper(x, n);
    }

    private double powHelper(double x, int n) {
        if (n == 0) return 1; // Base case: x^0 = 1
        double half = powHelper(x, n / 2); // Recurse on half of the exponent

        if (n % 2 == 0) {
            return half * half; // Even exponent: (x^n) = (x^(n/2))^2
        } else {
            return x * half * half; // Odd exponent: x^n = x * (x^(n/2))^2
        }
    }

    public static void main(String[] args) {
        Solution solution = new Solution();

        // Test case 1
        double result1 = solution.myPow(2.00000, 10);
        System.out.println(result1); // Should print 1024.00000

        // Test case 2
        double result2 = solution.myPow(2.10000, 3);
        System.out.println(result2); // Should print 9.26100

        // Test case 3
        double result3 = solution.myPow(2.00000, -2);
        System.out.println(result3); // Should print 0.25000
    }
}
