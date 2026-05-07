// 56. Merge Intervals
// https://leetcode.com/problems/merge-intervals/

/**
 * @param {number[][]} intervals
 * @return {number[][]}
 */
function merge(intervals) {
    // If there's only one or no interval, no merging needed
    if (intervals.length <= 1) return intervals;

    // Step 1: Sort intervals by their starting points
    intervals.sort((a, b) => a[0] - b[0]);

    // idx will track the position of the last merged interval
    let idx = 0;

    // Step 2: Iterate over intervals to merge overlaps
    for (let i = 1; i < intervals.length; i++) {
        // If current interval overlaps with the previous one
        if (intervals[idx][1] >= intervals[i][0]) {
            // Merge by updating the end to the max end of both intervals
            intervals[idx][1] = Math.max(intervals[idx][1], intervals[i][1]);
        } else {
            // No overlap, move to next position and copy the current interval
            idx++;
            intervals[idx] = intervals[i];
        }
    }

    // Step 3: Return only the merged portion of the array
    return intervals.slice(0, idx + 1);
}

const intervals = [[1, 3], [2, 6], [8, 10], [15, 18]];
console.log(merge(intervals)); // Output: [[1, 6], [8, 10], [15, 18]]
