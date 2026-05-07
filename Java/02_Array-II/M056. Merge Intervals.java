import java.util.Arrays;

class Solution {

    // Function to merge overlapping intervals
    public int[][] merge(int[][] intervals) {
        // If there's only one or no interval, no merging needed
        if (intervals.length <= 1) return intervals;

        // Step 1: Sort intervals by their starting points
        Arrays.sort(intervals, (a, b) -> Integer.compare(a[0], b[0]));

        // idx will track the position of the last merged interval
        int idx = 0;

        // Step 2: Iterate over intervals to merge overlaps
        for (int i = 1; i < intervals.length; i++) {
            // If current interval overlaps with the previous one
            if (intervals[idx][1] >= intervals[i][0]) {
                // Merge by updating the end to the max end of both intervals
                intervals[idx][1] = Math.max(
                    intervals[idx][1],
                    intervals[i][1]
                );
            } else {
                // No overlap, move to next position and copy the current interval
                idx++;
                intervals[idx] = intervals[i];
            }
        }

        // Step 3: Return only the merged portion of the array
        return Arrays.copyOf(intervals, idx + 1);
    }

    // Entry point of the program
    public static void main(String[] args) {
        Solution solution = new Solution();

        // Example input: intervals with some overlaps
        int[][] intervals = { { 1, 3 }, { 2, 6 }, { 8, 10 }, { 15, 18 } };

        // Call the merge function
        int[][] mergedIntervals = solution.merge(intervals);

        // Print the merged intervals
        System.out.println("Merged Intervals:");
        for (int[] interval : mergedIntervals) {
            System.out.println("[" + interval[0] + ", " + interval[1] + "]");
        }
    }
}
