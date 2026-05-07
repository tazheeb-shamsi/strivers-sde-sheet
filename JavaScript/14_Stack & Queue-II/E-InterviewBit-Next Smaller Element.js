// Next Smaller Element or Nearest Smaller Element - InterviewBit
// https://www.interviewbit.com/problems/nearest-smaller-element/

// Problem Statement:
// Given an array, find the nearest smaller element G[i] for every element A[i]
// such that the element has an index smaller than i.
// G[i] = A[j] such that j is maximum possible AND j < i AND A[j] < A[i]
// Elements for which no smaller element exist, consider next smaller element as -1.

/**
 * Find previous smaller element for each element in array
 * @param {number[]} A - Input array
 * @returns {number[]} - Array of previous smaller elements
 */
function prevSmaller(A) {
    const n = A.length;
    const result = new Array(n);
    const stack = [];

    for (let i = 0; i < n; i++) {
        while (stack.length > 0 && stack[stack.length - 1] >= A[i]) {
            stack.pop();
        }
        result[i] = stack.length === 0 ? -1 : stack[stack.length - 1];
        stack.push(A[i]);
    }

    return result;
}

// Test cases
console.log(prevSmaller([4, 5, 2, 10, 8])); // [-1, 4, -1, 2, 2]
console.log(prevSmaller([3, 2, 1])); // [-1, -1, -1]
console.log(prevSmaller([1, 6, 4, 10, 2, 5])); // [-1, 1, 1, 4, 1, 2]