// GFG: n Meetings in One Room.
// https://www.geeksforgeeks.org/problems/n-meetings-in-one-room-1587115620/1
// Company Tags: Flipkart Amazon Microsoft MakeMyTrip Cisco
import java.util.Arrays;

class Solution {

    public int maxMeetings(int start[], int end[]) {
        int n = start.length;
        int[][] meetings = new int[n][2];

        for (int i = 0; i < n; i++) {
            meetings[i][0] = start[i];
            meetings[i][1] = end[i];
        }

        Arrays.sort(meetings, (a, b) -> a[1] - b[1]);

        int count = 1;
        int prevEnd = meetings[0][1];

        for (int i = 1; i < n; i++) {
            if (meetings[i][0] > prevEnd) {
                count++;
                prevEnd = meetings[i][1];
            }
        }

        return count;
    }

    public static void main(String[] args) {
        int[] start = { 1, 3, 0, 5, 8, 5 };
        int[] end = { 2, 4, 6, 7, 9, 9 };

        Solution solution = new Solution();
        int maxMeetings = solution.maxMeetings(start, end);

        System.out.println(
            "Maximum number of meetings that can be held in one room: " +
            maxMeetings
        );
    }
}
