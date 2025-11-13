// Job sequencing Problem --> Maximum profit in Job scheduling
// https://takeuforward.org/plus/dsa/problems/job-sequencing-problem

/**
 * 
 *   Given an 2D array Jobs of size Nx3, where Jobs[i][0] represents JobID , Jobs[i][1] represents Deadline , Jobs[i][2] represents Profit associated with that job. Each Job takes 1 unit of time to complete and only one job can be scheduled at a time.
 *
 *   The profit associated with a job is earned only if it is completed by its deadline. Find the number of jobs and maximum profit.
 *   
 *   Examples:
 *   Input : Jobs = [ [1, 4, 20] , [2, 1, 10] , [3, 1, 40] , [4, 1, 30] ]
 *   Output : 2 60
 *   Explanation : Job with JobID 3 can be performed at time t=1 giving a profit of 40.
 *   
 *   Job with JobID 1 can be performed at time t=2 giving a profit of 20.
 *   No more jobs can be scheduled, So total Profit = 40 + 20 => 60.
 *   Total number of jobs completed are two, JobID 1, JobID 3.
 *   So answer is 2 60. ̰
 */

import java.util.*;

class Solution {
    // Memoization table: dp[t] = maximum profit that can be achieved by time t
    private int[] dp;
    
    // Function to find the maximum profit and the number of jobs done using DP
    public int[] JobScheduling(int[][] jobs) {
        int n = jobs.length;
        if (n == 0) return new int[]{0, 0};
        
        // Sort jobs by deadline to process them in order
        Arrays.sort(jobs, (a, b) -> a[1] - b[1]);
        
        // Find maximum deadline
        int maxDeadline = 0;
        for (int[] job : jobs) {
            maxDeadline = Math.max(maxDeadline, job[1]);
        }
        
        // dp[t] represents the maximum profit that can be achieved by time t
        dp = new int[maxDeadline + 1];
        
        // Process each job
        for (int[] job : jobs) {
            int deadline = job[1];
            int profit = job[2];
            
            // For each time slot from deadline down to 1
            for (int t = deadline; t >= 1; t--) {
                // If we can include this job at time t
                if (dp[t] < dp[t - 1] + profit) {
                    dp[t] = dp[t - 1] + profit;
                }
            }
        }
        
        // Find the maximum profit and count the number of jobs
        int jobCount = 0;
        int currentProfit = 0;
        
        for (int t = 1; t <= maxDeadline; t++) {
            if (dp[t] > currentProfit) {
                currentProfit = dp[t];
                jobCount++;
            }
        }
        
        return new int[]{jobCount, currentProfit};
    }

    public static void main(String[] args) {
        Solution sol = new Solution();
        
        // Test Case 1: Example from problem statement
        int[][] jobs1 = {{1, 4, 20}, {2, 1, 10}, {3, 1, 40}, {4, 1, 30}};
        int[] result1 = sol.JobScheduling(jobs1);
        System.out.println("Test Case 1: " + Arrays.toString(result1));
        // Expected: [2, 60] (2 jobs with total profit 60)
        
        // Test Case 2: All jobs have same deadline
        int[][] jobs2 = {{1, 2, 100}, {2, 2, 80}, {3, 2, 60}, {4, 2, 40}, {5, 2, 20}};
        int[] result2 = sol.JobScheduling(jobs2);
        System.out.println("Test Case 2: " + Arrays.toString(result2));
        // Expected: [2, 180] (2 jobs with total profit 180)
        
        // Test Case 3: All jobs can be scheduled
        int[][] jobs3 = {{1, 5, 50}, {2, 1, 10}, {3, 2, 20}, {4, 3, 30}, {5, 4, 40}};
        int[] result3 = sol.JobScheduling(jobs3);
        System.out.println("Test Case 3: " + Arrays.toString(result3));
        // Expected: [5, 150] (all 5 jobs scheduled)
        
        // Test Case 4: Empty input
        int[][] jobs4 = {};
        int[] result4 = sol.JobScheduling(jobs4);
        System.out.println("Test Case 4: " + Arrays.toString(result4));
        // Expected: [0, 0] (no jobs)
        
        // Test Case 5: Single job
        int[][] jobs5 = {{1, 1, 100}};
        int[] result5 = sol.JobScheduling(jobs5);
        System.out.println("Test Case 5: " + Arrays.toString(result5));
        // Expected: [1, 100] (single job with profit 100)
    }
}