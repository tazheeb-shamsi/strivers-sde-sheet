/**
 * TUF: Job Sequencing Problem
 * https://takeuforward.org/plus/dsa/problems/job-sequencing
 *
 * Given jobs with deadlines and profits, find maximum profit
 * if only one job can be scheduled at a time.
 *
 * Time Complexity: O(N log N + N * maxDeadline) – Sort + Greedy assignment
 * Space Complexity: O(maxDeadline) – Slot array
 */

/**
 * Job Sequencing - Greedy approach
 * @param {Object[]} jobs - Array of {id, deadline, profit}
 * @returns {Object} - {count, maxProfit}
 */
function jobSequencing(jobs) {
    // Sort by profit in descending order
    jobs.sort((a, b) => b.profit - a.profit);
    
    // Find maximum deadline
    let maxDeadline = 0;
    for (const job of jobs) {
        maxDeadline = Math.max(maxDeadline, job.deadline);
    }
    
    // Slots to track scheduled jobs (1-indexed for convenience)
    const slots = new Array(maxDeadline + 1).fill(false);
    
    let count = 0;
    let maxProfit = 0;
    
    for (const job of jobs) {
        // Find a free slot for this job (as late as possible)
        for (let t = job.deadline; t > 0; t--) {
            if (!slots[t]) {
                slots[t] = true;
                count++;
                maxProfit += job.profit;
                break;
            }
        }
    }
    
    return { count, maxProfit };
}

/**
 * Disjoint Set Union for optimized job sequencing
 */
function createDSU(n) {
    const parent = Array.from({ length: n + 1 }, (_, i) => i);

    function find(x) {
        if (parent[x] !== x) {
            parent[x] = find(parent[x]);
        }
        return parent[x];
    }

    function union(x, y) {
        parent[find(x)] = find(y);
    }

    return { find, union };
}

/**
 * Job Sequencing with Union-Find for O(N log N)
 */
function jobSequencingOptimized(jobs) {
    jobs.sort((a, b) => b.profit - a.profit);
    
    let maxDeadline = 0;
    for (const job of jobs) {
        maxDeadline = Math.max(maxDeadline, job.deadline);
    }
    
    const dsu = createDSU(maxDeadline);
    
    let count = 0;
    let maxProfit = 0;
    
    for (const job of jobs) {
        // Find the latest available slot using DSU
        const availableSlot = dsu.find(job.deadline);
        
        if (availableSlot > 0) {
            // Assign job to this slot
            dsu.union(availableSlot, availableSlot - 1);
            count++;
            maxProfit += job.profit;
        }
    }
    
    return { count, maxProfit };
}

// Test cases
const jobs1 = [
    { id: 1, deadline: 4, profit: 20 },
    { id: 2, deadline: 1, profit: 10 },
    { id: 3, deadline: 1, profit: 40 },
    { id: 4, deadline: 1, profit: 30 }
];

console.log("Job Sequencing Result:", jobSequencing([...jobs1]));
// Expected: { count: 2, maxProfit: 60 }

const jobs2 = [
    { id: 1, deadline: 2, profit: 100 },
    { id: 2, deadline: 1, profit: 19 },
    { id: 3, deadline: 2, profit: 27 },
    { id: 4, deadline: 1, profit: 25 },
    { id: 5, deadline: 3, profit: 15 }
];

console.log("Job Sequencing Optimized:", jobSequencingOptimized([...jobs2]));
// Expected: { count: 3, maxProfit: 142 }

const jobs3 = [
    { id: 1, deadline: 3, profit: 35 },
    { id: 2, deadline: 4, profit: 30 },
    { id: 3, deadline: 4, profit: 25 },
    { id: 4, deadline: 2, profit: 20 },
    { id: 5, deadline: 3, profit: 15 },
    { id: 6, deadline: 1, profit: 12 },
    { id: 7, deadline: 2, profit: 5 }
];

console.log("Job Sequencing (7 jobs):", jobSequencing([...jobs3]));
