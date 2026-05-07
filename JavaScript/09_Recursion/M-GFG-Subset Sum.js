// GFG: Subset Sums
// https://www.geeksforgeeks.org/problems/subset-sums2234/1

/**
 * @param {number[]} arr
 * @return {number[]}
 */
function subsetSums(arr) {
    const sums = [];
    subsetSumsHelper(arr, 0, 0, sums);
    sums.sort((a, b) => a - b);
    return sums;
}

function subsetSumsHelper(arr, index, sum, sums) {
    if (index === arr.length) {
        sums.push(sum);
        return;
    }
    subsetSumsHelper(arr, index + 1, sum + arr[index], sums);
    subsetSumsHelper(arr, index + 1, sum, sums);
}

const arr = [2, 3];
console.log(subsetSums(arr)); // Output: [0, 2, 3, 5]
