// GFG: Job Sequencing Problem
// https://www.geeksforgeeks.org/problems/job-sequencing-problem-1587115620/1
// Company Tags: Flipkart, Accolite, Microsoft

import java.util.*;

class Solution {

    // Find parent (with path compression)
    private int find(int parent[], int s) {
        if (parent[s] == s) return s;
        return parent[s] = find(parent, parent[s]);
    }

    public ArrayList<Integer> jobSequencing(int[] deadline, int[] profit) {
        int n = deadline.length;

        // store {profit, deadline, jobId}
        int[][] jobs = new int[n][3];
        for (int i = 0; i < n; i++) {
            jobs[i][0] = profit[i];
            jobs[i][1] = deadline[i];
            jobs[i][2] = i;
        }

        // Sort jobs by profit descending
        Arrays.sort(jobs, (a, b) -> b[0] - a[0]);

        // Find max deadline
        int maxDeadline = 0;
        for (int d : deadline) {
            maxDeadline = Math.max(maxDeadline, d);
        }

        // DSU parent array
        int parent[] = new int[maxDeadline + 1];
        for (int i = 0; i <= maxDeadline; i++) parent[i] = i;

        int totalProfit = 0,
            totalJobs = 0;

        for (int[] job : jobs) {
            int d = job[1];
            int p = job[0];

            // Find available slot <= d
            int availableSlot = find(parent, d);
            if (availableSlot > 0) {
                totalProfit += p;
                totalJobs++;
                // Union: mark this slot as filled -> point to previous slot
                parent[availableSlot] = find(parent, availableSlot - 1);
            }
        }

        ArrayList<Integer> result = new ArrayList<>();
        result.add(totalJobs);
        result.add(totalProfit);
        return result;
    }
}
