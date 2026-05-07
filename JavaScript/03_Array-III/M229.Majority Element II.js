// 229. Majority Element II --> Majority Element (n/3 times)
// https://leetcode.com/problems/majority-element-ii/
// Boyer-Moore Voting Algorithm

/**
 * @param {number[]} nums
 * @return {number[]}
 */
function majorityElement(nums) {
    let num1 = 0, num2 = 0, count1 = 0, count2 = 0;

    for (const num of nums) {
        if (num === num1) {
            count1++;
        } else if (num === num2) {
            count2++;
        } else if (count1 === 0) {
            num1 = num;
            count1 = 1;
        } else if (count2 === 0) {
            num2 = num;
            count2 = 1;
        } else {
            count1--;
            count2--;
        }
    }

    count1 = 0;
    count2 = 0;
    for (const num of nums) {
        if (num === num1) count1++;
        else if (num === num2) count2++;
    }

    const result = [];
    if (count1 > Math.floor(nums.length / 3)) result.push(num1);
    if (count2 > Math.floor(nums.length / 3)) result.push(num2);

    return result;
}

console.log(majorityElement([3, 2, 3])); // Output: [3]
console.log(majorityElement([1])); // Output: [1]
console.log(majorityElement([1, 2])); // Output: [1, 2]
