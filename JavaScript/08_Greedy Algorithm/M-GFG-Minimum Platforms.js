// Minimum Platforms
// Minimum number of platforms required for a railway
// https://www.geeksforgeeks.org/problems/minimum-platforms-1587115620/1
// Company Tags: Paytm, Amazon, Microsoft, D-E-Shaw, Hike, Walmart, Adobe, Google

/**
 * @param {number[]} arr - arrival times
 * @param {number[]} dep - departure times
 * @return {number}
 */
function findPlatform(arr, dep) {
    arr.sort((a, b) => a - b);
    dep.sort((a, b) => a - b);

    let i = 0;
    let j = 0;
    let max = 0;
    let count = 0;

    while (i < arr.length && j < dep.length) {
        if (arr[i] <= dep[j]) {
            count++;
            i++;
        } else {
            count--;
            j++;
        }
        max = Math.max(max, count);
    }

    return max;
}

const arr = [900, 940, 950, 1100, 1500, 1800];
const dep = [910, 1200, 1120, 1130, 1900, 2000];
console.log("Minimum Platforms Required:", findPlatform(arr, dep)); // Output: 3
