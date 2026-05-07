/**
 * InterviewBit - Distinct Numbers in Window
 * https://www.interviewbit.com/problems/distinct-numbers-in-window/
 *
 * Type             | Details
 * -----------------+----------------------------------------------------
 * Time Complexity  | O(N) – Single pass through the array
 * Space Complexity | O(B) – HashMap stores at most B elements
 */

/**
 * Find count of distinct numbers in each window of size B
 * @param {number[]} A - Input array
 * @param {number} B - Window size
 * @returns {number[]} - Array of distinct counts for each window
 */
function dNums(A, B) {
    if (B > A.length) return [];
    
    const result = new Array(A.length - B + 1);
    const map = new Map();
    let distinctCount = 0;

    // Initialize first window
    for (let i = 0; i < B; i++) {
        const count = (map.get(A[i]) || 0) + 1;
        map.set(A[i], count);
        if (count === 1) distinctCount++;
    }
    result[0] = distinctCount;

    // Slide the window
    for (let i = B; i < A.length; i++) {
        // Add new element
        const newCount = (map.get(A[i]) || 0) + 1;
        map.set(A[i], newCount);
        if (newCount === 1) distinctCount++;

        // Remove old element
        const oldIdx = i - B;
        const oldCount = map.get(A[oldIdx]) - 1;
        map.set(A[oldIdx], oldCount);
        if (oldCount === 0) distinctCount--;

        result[i - B + 1] = distinctCount;
    }

    return result;
}

// Test cases
const A = [1, 2, 1, 3, 4, 3];
const B = 3;

const result = dNums(A, B);
console.log(result); // Output: [2, 3, 3, 2]