// GFG: Job Sequencing Problem
// https://www.geeksforgeeks.org/problems/job-sequencing-problem-1587115620/1
// Company Tags: Flipkart, Accolite, Microsoft

/**
 * @param {number[]} deadline
 * @param {number[]} profit
 * @return {number[]}
 */
function jobSequencing(deadline, profit) {
    const n = deadline.length;

    // Store {profit, deadline, jobId}
    const jobs = [];
    for (let i = 0; i < n; i++) {
        jobs.push({ profit: profit[i], deadline: deadline[i], id: i });
    }

    // Sort jobs by profit descending
    jobs.sort((a, b) => b.profit - a.profit);

    // Find max deadline
    let maxDeadline = 0;
    for (const d of deadline) {
        maxDeadline = Math.max(maxDeadline, d);
    }

    // DSU parent array
    const parent = [];
    for (let i = 0; i <= maxDeadline; i++) {
        parent[i] = i;
    }

    // Find parent with path compression
    function find(s) {
        if (parent[s] === s) return s;
        return parent[s] = find(parent[s]);
    }

    let totalProfit = 0;
    let totalJobs = 0;

    for (const job of jobs) {
        const d = job.deadline;
        const p = job.profit;

        // Find available slot <= d
        const availableSlot = find(d);
        if (availableSlot > 0) {
            totalProfit += p;
            totalJobs++;
            // Union: mark this slot as filled -> point to previous slot
            parent[availableSlot] = find(availableSlot - 1);
        }
    }

    return [totalJobs, totalProfit];
}

const deadline = [4, 1, 1, 1];
const profit = [20, 10, 40, 30];
console.log(jobSequencing(deadline, profit)); // Output: [2, 60]
