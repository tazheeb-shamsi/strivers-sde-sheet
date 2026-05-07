// GFG: N Meetings in One Room
// https://www.geeksforgeeks.org/problems/n-meetings-in-one-room-1587115620/1
// Company Tags: Flipkart, Amazon, Microsoft, MakeMyTrip, Cisco

/**
 * @param {number[]} start
 * @param {number[]} end
 * @return {number}
 */
function maxMeetings(start, end) {
    const n = start.length;
    const meetings = [];

    for (let i = 0; i < n; i++) {
        meetings.push([start[i], end[i]]);
    }

    // Sort by end time
    meetings.sort((a, b) => a[1] - b[1]);

    let count = 1;
    let prevEnd = meetings[0][1];

    for (let i = 1; i < n; i++) {
        if (meetings[i][0] > prevEnd) {
            count++;
            prevEnd = meetings[i][1];
        }
    }

    return count;
}

const start = [1, 3, 0, 5, 8, 5];
const end = [2, 4, 6, 7, 9, 9];
console.log("Maximum number of meetings:", maxMeetings(start, end)); // Output: 4
