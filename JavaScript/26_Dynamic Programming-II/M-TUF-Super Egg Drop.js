/**
 * TUF: Super Egg Drop (Egg Dropping Problem)
 * https://leetcode.com/problems/super-egg-drop/
 *
 * Find minimum number of moves to determine the critical floor.
 *
 * Type             | Details
 * -----------------+----------------------------------------------------
 * Time Complexity  | O(K * N * log N) – Binary search optimization
 * Space Complexity | O(K * N) – DP table
 */

/**
 * Super Egg Drop - O(K * N²) approach
 * @param {number} k - Number of eggs
 * @param {number} n - Number of floors
 * @returns {number}
 */
function superEggDropBasic(k, n) {
    // dp[i][j] = minimum moves with i eggs and j floors
    const dp = Array.from({ length: k + 1 }, () => new Array(n + 1).fill(0));
    
    // Base cases
    for (let j = 1; j <= n; j++) {
        dp[1][j] = j; // With 1 egg, need j moves for j floors
    }
    for (let i = 1; i <= k; i++) {
        dp[i][1] = 1; // With 1 floor, need 1 move
    }
    
    for (let i = 2; i <= k; i++) {
        for (let j = 2; j <= n; j++) {
            dp[i][j] = Infinity;
            for (let x = 1; x <= j; x++) {
                // Drop egg from floor x
                // If breaks: check floors below with i-1 eggs
                // If survives: check floors above with i eggs
                const worst = 1 + Math.max(dp[i - 1][x - 1], dp[i][j - x]);
                dp[i][j] = Math.min(dp[i][j], worst);
            }
        }
    }
    
    return dp[k][n];
}

/**
 * Super Egg Drop - O(K * N * log N) with Binary Search
 * @param {number} k - Number of eggs
 * @param {number} n - Number of floors
 * @returns {number}
 */
function superEggDrop(k, n) {
    const memo = new Map();
    
    function dp(eggs, floors) {
        if (floors <= 1) return floors;
        if (eggs === 1) return floors;
        
        const key = `${eggs},${floors}`;
        if (memo.has(key)) return memo.get(key);
        
        let low = 1, high = floors, result = floors;
        
        while (low <= high) {
            const mid = Math.floor((low + high) / 2);
            
            const broken = dp(eggs - 1, mid - 1);   // Egg breaks
            const survived = dp(eggs, floors - mid); // Egg survives
            
            const worst = 1 + Math.max(broken, survived);
            result = Math.min(result, worst);
            
            if (broken > survived) {
                high = mid - 1;
            } else {
                low = mid + 1;
            }
        }
        
        memo.set(key, result);
        return result;
    }
    
    return dp(k, n);
}

/**
 * O(K * N) approach - dp[m][k] = max floors we can check with m moves and k eggs
 */
function superEggDropOptimal(k, n) {
    // dp[m][k] = max floors we can check with m moves and k eggs
    // dp[m][k] = dp[m-1][k-1] + dp[m-1][k] + 1
    
    const dp = Array.from({ length: n + 1 }, () => new Array(k + 1).fill(0));
    
    let m = 0;
    while (dp[m][k] < n) {
        m++;
        for (let i = 1; i <= k; i++) {
            dp[m][i] = dp[m - 1][i - 1] + dp[m - 1][i] + 1;
        }
    }
    
    return m;
}

// Test cases
console.log("superEggDrop(1, 2):", superEggDrop(1, 2)); // 2
console.log("superEggDrop(2, 6):", superEggDrop(2, 6)); // 3
console.log("superEggDrop(3, 14):", superEggDrop(3, 14)); // 4

console.log("\nOptimal approach:");
console.log("superEggDropOptimal(2, 6):", superEggDropOptimal(2, 6)); // 3
console.log("superEggDropOptimal(2, 100):", superEggDropOptimal(2, 100)); // 14