// 4. Median of Two Sorted Arrays
// https://leetcode.com/problems/median-of-two-sorted-arrays/

// Time Complexity: O(log(min(m, n)))
// Space Complexity: O(1)

/**
 * Find the median of two sorted arrays
 * @param {number[]} nums1 - First sorted array
 * @param {number[]} nums2 - Second sorted array
 * @returns {number} - Median of combined sorted array
 */
function findMedianSortedArrays(nums1, nums2) {
    // Ensure nums1 is the smaller array
    if (nums1.length > nums2.length) {
        return findMedianSortedArrays(nums2, nums1);
    }

    const m = nums1.length;
    const n = nums2.length;
    const totalLeft = Math.floor((m + n + 1) / 2);

    let left = 0;
    let right = m;

    while (left <= right) {
        const i = Math.floor((left + right) / 2); // partition in nums1
        const j = totalLeft - i; // partition in nums2

        const nums1LeftMax = i === 0 ? -Infinity : nums1[i - 1];
        const nums1RightMin = i === m ? Infinity : nums1[i];

        const nums2LeftMax = j === 0 ? -Infinity : nums2[j - 1];
        const nums2RightMin = j === n ? Infinity : nums2[j];

        if (nums1LeftMax <= nums2RightMin && nums2LeftMax <= nums1RightMin) {
            if ((m + n) % 2 === 1) {
                return Math.max(nums1LeftMax, nums2LeftMax); // odd
            } else {
                return (Math.max(nums1LeftMax, nums2LeftMax) +
                        Math.min(nums1RightMin, nums2RightMin)) / 2.0; // even
            }
        } else if (nums1LeftMax > nums2RightMin) {
            right = i - 1; // move left
        } else {
            left = i + 1; // move right
        }
    }

    throw new Error("Input arrays not sorted properly.");
}

// Test cases
console.log(findMedianSortedArrays([1, 3], [2])); // 2.0
console.log(findMedianSortedArrays([1, 2], [3, 4])); // 2.5
console.log(findMedianSortedArrays([0, 0], [0, 0])); // 0.0
console.log(findMedianSortedArrays([], [1])); // 1.0