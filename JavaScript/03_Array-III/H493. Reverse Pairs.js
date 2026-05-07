// 493. Reverse Pairs
// https://leetcode.com/problems/reverse-pairs/

/**
 * @param {number[]} nums
 * @return {number}
 */
function reversePairs(nums) {
    if (!nums || nums.length === 0) return 0;
    const temp = new Array(nums.length);
    return mergeSort(nums, 0, nums.length - 1, temp);
}

function mergeSort(nums, left, right, temp) {
    if (left >= right) return 0;
    const mid = left + Math.floor((right - left) / 2);
    let count = mergeSort(nums, left, mid, temp) + mergeSort(nums, mid + 1, right, temp);

    // Count reverse pairs
    let j = mid + 1;
    for (let i = left; i <= mid; i++) {
        while (j <= right && nums[i] > 2 * nums[j]) j++;
        count += j - (mid + 1);
    }

    // Merge step
    merge(nums, left, mid, right, temp);
    return count;
}

function merge(nums, left, mid, right, temp) {
    let i = left;
    let j = mid + 1;
    let k = left;

    while (i <= mid && j <= right) {
        if (nums[i] <= nums[j]) {
            temp[k++] = nums[i++];
        } else {
            temp[k++] = nums[j++];
        }
    }

    while (i <= mid) temp[k++] = nums[i++];
    while (j <= right) temp[k++] = nums[j++];

    for (let p = left; p <= right; p++) {
        nums[p] = temp[p];
    }
}

console.log(reversePairs([1, 3, 2, 3, 1])); // Output: 2
console.log(reversePairs([2, 4, 3, 5, 1])); // Output: 3
