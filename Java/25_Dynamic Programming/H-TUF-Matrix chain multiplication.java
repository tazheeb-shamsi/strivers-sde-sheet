// TUF: Matrix chain multiplication
// https://takeuforward.org/plus/dsa/problems/matrix-chain-multiplication

/**
 * Given a chain of matrices A1, A2, A3,.....An, you have to figure out the most efficient way to multiply these matrices. 
 * In other words, determine where to place parentheses to minimize the number of multiplications.

 * Given an array nums of size n. Dimension of matrix Ai ( 0 < i < n ) is nums[i - 1] x nums[i].
 * Find a minimum number of multiplications needed to multiply the chain.

 * Examples:
 * Input : nums = [10, 15, 20, 25]
 * Output : 8000
 * Explanation : There are two ways to multiply the chain - A1*(A2*A3) or (A1*A2)*A3.
 * If we multiply in order- A1*(A2*A3), then number of multiplications required are 11250.
 * If we multiply in order- (A1*A2)*A3, then number of multiplications required are 8000.
 * Thus minimum number of multiplications required is 8000.
 * 
 * Input : nums = [4, 2, 3]
 * Output : 24
 * Explanation : There is only one way to multiply the chain - A1*A2.
 * Thus minimum number of multiplications required is 24.
 */

class Solution {
    public int matrixMultiplication(int[] nums) {
        int n = nums.length;
        if (n <= 2) return 0; // No multiplication needed for 0 or 1 matrix
        
        // dp[i][j] will store the minimum number of multiplications needed to multiply 
        // the chain of matrices from i to j (0-based indexing)
        int[][] dp = new int[n][n];
        
        // Fill the dp table in bottom-up manner
        // len is the length of the chain
        for (int len = 2; len < n; len++) {
            // i is the start index of the current chain
            for (int i = 1; i < n - len + 1; i++) {
                int j = i + len - 1; // end index of the current chain
                dp[i][j] = Integer.MAX_VALUE;
                
                // Try all possible partition points between i and j
                for (int k = i; k < j; k++) {
                    // Cost of multiplying (i..k) and (k+1..j) plus cost of multiplying the two resulting matrices
                    int cost = dp[i][k] + dp[k + 1][j] + nums[i - 1] * nums[k] * nums[j];
                    if (cost < dp[i][j]) {
                        dp[i][j] = cost;
                    }
                }
            }
        }
        
        // The result is stored in dp[1][n-1]
        return dp[1][n - 1];
    }

    public static void main(String[] args) {
        Solution solution = new Solution();
        
        // Test case 1
        int[] nums1 = {10, 15, 20, 25};
        System.out.println("Test Case 1: " + solution.matrixMultiplication(nums1)); // Expected: 8000
        
        // Test case 2
        int[] nums2 = {4, 2, 3};
        System.out.println("Test Case 2: " + solution.matrixMultiplication(nums2)); // Expected: 24
        
        // Test case 3: Single matrix (no multiplication needed)
        int[] nums3 = {1, 2};
        System.out.println("Test Case 3: " + solution.matrixMultiplication(nums3)); // Expected: 0
        
        // Test case 4
        int[] nums4 = {1, 2, 3, 4, 5};
        System.out.println("Test Case 4: " + solution.matrixMultiplication(nums4)); // Expected: 38
    }
}
