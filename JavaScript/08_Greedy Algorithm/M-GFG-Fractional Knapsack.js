// Fractional Knapsack
// https://www.geeksforgeeks.org/problems/fractional-knapsack-1587115620/1
// Company Tags: Microsoft

/**
 * @param {number[]} val
 * @param {number[]} wt
 * @param {number} capacity
 * @return {number}
 */
function fractionalKnapsack(val, wt, capacity) {
    const n = val.length;
    const items = [];

    for (let i = 0; i < n; i++) {
        items.push({ value: val[i], weight: wt[i] });
    }

    // Sort by value/weight ratio in descending order
    items.sort((a, b) => (b.value / b.weight) - (a.value / a.weight));

    let maxVal = 0;

    for (const item of items) {
        if (capacity >= item.weight) {
            maxVal += item.value;
            capacity -= item.weight;
        } else {
            maxVal += (item.value * capacity) / item.weight;
            break;
        }
    }

    return Math.round(maxVal * 1000000) / 1000000;
}

const val = [60, 100, 120];
const wt = [10, 20, 30];
const capacity = 50;
console.log(fractionalKnapsack(val, wt, capacity)); // Output: 240
