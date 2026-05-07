/**
 * 152. Maximum Product Subarray
 * https://leetcode.com/problems/maximum-product-subarray/
 *
 * Type             | Details
 * -----------------+----------------------------------------------------
 * Time Complexity  | O(N) – Single pass
 * Space Complexity | O(1) – Constant space
 */

/**
 * Find the contiguous subarray with the largest product
 * @param {number[]} nums
 * @returns {number}
 */
function maxProduct(nums) {
    if (nums.length === 0) return 0;
    
    let maxProd = nums[0];
    let minProd = nums[0];
    let result = nums[0];
    
    for (let i = 1; i < nums.length; i++) {
        const curr = nums[i];
        
        // When multiplied by negative, max becomes min and vice versa
        if (curr < 0) {
            [maxProd, minProd] = [minProd, maxProd];
        }
        
        // Either start new subarray or extend previous
        maxProd = Math.max(curr, maxProd * curr);
        minProd = Math.min(curr, minProd * curr);
        
        result = Math.max(result, maxProd);
    }
    
    return result;
}

/**
 * Alternative approach using prefix and suffix products
 */
function maxProductPrefixSuffix(nums) {
    const n = nums.length;
    let maxProd = Number.MIN_SAFE_INTEGER;
    
    // Prefix product
    let prefix = 1;
    for (let i = 0; i < n; i++) {
        prefix *= nums[i];
        maxProd = Math.max(maxProd, prefix);
        if (prefix === 0) prefix = 1;
    }
    
    // Suffix product
    let suffix = 1;
    for (let i = n - 1; i >= 0; i--) {
        suffix *= nums[i];
        maxProd = Math.max(maxProd, suffix);
        if (suffix === 0) suffix = 1;
    }
    
    return maxProd;
}

/**
 * DP approach with explicit arrays
 */
function maxProductDP(nums) {
    const n = nums.length;
    const dpMax = new Array(n);
    const dpMin = new Array(n);
    
    dpMax[0] = nums[0];
    dpMin[0] = nums[0];
    let result = nums[0];
    
    for (let i = 1; i < n; i++) {
        const candidates = [
            nums[i],
            nums[i] * dpMax[i - 1],
            nums[i] * dpMin[i - 1]
        ];
        
        dpMax[i] = Math.max(...candidates);
        dpMin[i] = Math.min(...candidates);
        
        result = Math.max(result, dpMax[i]);
    }
    
    return result;
}

// Test cases
console.log("maxProduct([2,3,-2,4]):", maxProduct([2, 3, -2, 4])); // 6
console.log("maxProduct([-2,0,-1]):", maxProduct([-2, 0, -1])); // 0
console.log("maxProduct([-2,3,-4]):", maxProduct([-2, 3, -4])); // 24

console.log("\nPrefix-Suffix approach:");
console.log("maxProduct([2,3,-2,4]):", maxProductPrefixSuffix([2, 3, -2, 4])); // 6
console.log("maxProduct([-2,3,-4]):", maxProductPrefixSuffix([-2, 3, -4])); // 24

console.log("\nDP approach:");
console.log("maxProduct([2,3,-2,4]):", maxProductDP([2, 3, -2, 4])); // 6