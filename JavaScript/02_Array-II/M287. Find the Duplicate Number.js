// 287. Find the Duplicate Number
// https://leetcode.com/problems/find-the-duplicate-number/
// Find the duplicate in an array of N+1 integers

/**
 * Floyd's Tortoise and Hare (Cycle Detection)
 * @param {number[]} nums
 * @return {number}
 */
function findDuplicate(nums) {
    let slow = nums[0];
    let fast = nums[0];

    do {
        slow = nums[slow];
        fast = nums[nums[fast]];
    } while (slow !== fast);

    let ptr1 = nums[0];
    let ptr2 = slow;

    while (ptr1 !== ptr2) {
        ptr1 = nums[ptr1];
        ptr2 = nums[ptr2];
    }

    return ptr1;
}

const nums = [1, 3, 4, 2, 2];
console.log("Duplicate number:", findDuplicate(nums)); // Output: 2
