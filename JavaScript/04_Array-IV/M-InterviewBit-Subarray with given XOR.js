// InterviewBit - Count number of subarrays with given xor K --> Subarray with given XOR
// https://www.interviewbit.com/problems/subarray-with-given-xor/

/**
 * @param {number[]} A
 * @param {number} B
 * @return {number}
 */
function solve(A, B) {
    const n = A.length;
    let count = 0;
    let xor = 0;
    const map = new Map();
    map.set(0, 1);

    for (let i = 0; i < n; i++) {
        xor ^= A[i]; // XOR the current element
        const target = xor ^ B; // Find the target XOR
        count += map.get(target) || 0; // Add count of subarrays with the desired XOR
        map.set(xor, (map.get(xor) || 0) + 1); // Store the frequency of the current XOR
    }

    return count;
}

const A = [4, 2, 2, 6, 4];
const B = 6;
console.log(solve(A, B)); // Output: 4
