// InterviewBit Problem: Repeated and Missing Number in Array

/**
 * @param {number[]} A
 * @return {number[]}
 */
function repeatedAndMissingNumber(A) {
    const n = A.length;
    const sumN = (n * (n + 1)) / 2;
    const sumN2 = (n * (n + 1) * (2 * n + 1)) / 6;

    let sumA = 0;
    let sumA2 = 0;

    for (const num of A) {
        sumA += num;
        sumA2 += num * num;
    }

    const diff = sumA - sumN; // x - y
    const squareDiff = sumA2 - sumN2; // x^2 - y^2 = (x - y)(x + y)

    const sum = squareDiff / diff; // x + y

    const repeated = (diff + sum) / 2;
    const missing = repeated - diff;

    return [repeated, missing];
}

const input = [3, 1, 2, 5, 3];
console.log(repeatedAndMissingNumber(input)); // Output: [3, 4]
