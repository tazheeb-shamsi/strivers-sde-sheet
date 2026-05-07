// GFG: K-th element of two arrays
// https://www.geeksforgeeks.org/problems/k-th-element-of-two-sorted-array1317/1
// Company Tags: Flipkart, Microsoft

// Given two sorted arrays a[] and b[] and an element k,
// the task is to find the element that would be at the kth position of the combined sorted array.

// Examples:
// Input: a[] = [2, 3, 6, 7, 9], b[] = [1, 4, 8, 10], k = 5
// Output: 6
// Explanation: The final combined sorted array would be [1, 2, 3, 4, 6, 7, 8, 9, 10]. The 5th element is 6.

// Input: a[] = [1, 4, 8, 10, 12], b[] = [5, 7, 11, 15, 17], k = 6
// Output: 10
// Explanation: Combined sorted array is [1, 4, 5, 7, 8, 10, 11, 12, 15, 17]. The 6th element is 10.

/**
 * Find the kth element of two sorted arrays
 * @param {number[]} a - First sorted array
 * @param {number[]} b - Second sorted array
 * @param {number} k - Position to find (1-indexed)
 * @returns {number} - kth element in combined sorted array
 */
function kthElement(a, b, k) {
    const n = a.length;
    const m = b.length;
    let i = 0;
    let j = 0;
    let count = 0;
    let ans = -1;

    while (i < n && j < m) {
        if (a[i] < b[j]) {
            ans = a[i];
            i++;
        } else {
            ans = b[j];
            j++;
        }
        count++;
        if (count === k) return ans;
    }

    // If elements are left in a[]
    while (i < n) {
        ans = a[i++];
        count++;
        if (count === k) return ans;
    }

    // If elements are left in b[]
    while (j < m) {
        ans = b[j++];
        count++;
        if (count === k) return ans;
    }

    return -1;
}

// Test cases
console.log(kthElement([2, 3, 6, 7, 9], [1, 4, 8, 10], 5)); // 6
console.log(kthElement([1, 4, 8, 10, 12], [5, 7, 11, 15, 17], 6)); // 10
console.log(kthElement([1, 2, 3], [4, 5, 6], 4)); // 4