/**
 * 322. Coin Change
 * https://leetcode.com/problems/coin-change/
 *
 * Find the minimum number of coins to make up the amount.
 *
 * Type             | Details
 * -----------------+----------------------------------------------------
 * Time Complexity  | O(amount * N) – N is number of coins
 * Space Complexity | O(amount) – DP array
 */

/**
 * Coin Change - Minimum coins
 * @param {number[]} coins
 * @param {number} amount
 * @returns {number}
 */
function coinChange(coins, amount) {
    // dp[i] = minimum coins to make amount i
    const dp = new Array(amount + 1).fill(Infinity);
    dp[0] = 0;
    
    for (let i = 1; i <= amount; i++) {
        for (const coin of coins) {
            if (coin <= i && dp[i - coin] !== Infinity) {
                dp[i] = Math.min(dp[i], dp[i - coin] + 1);
            }
        }
    }
    
    return dp[amount] === Infinity ? -1 : dp[amount];
}

/**
 * Alternative: Iterate coins first
 */
function coinChangeAlt(coins, amount) {
    const dp = new Array(amount + 1).fill(Infinity);
    dp[0] = 0;
    
    for (const coin of coins) {
        for (let i = coin; i <= amount; i++) {
            dp[i] = Math.min(dp[i], dp[i - coin] + 1);
        }
    }
    
    return dp[amount] === Infinity ? -1 : dp[amount];
}

/**
 * Coin Change with coin selection
 */
function coinChangeWithCoins(coins, amount) {
    const dp = new Array(amount + 1).fill(Infinity);
    const parent = new Array(amount + 1).fill(-1);
    dp[0] = 0;
    
    for (let i = 1; i <= amount; i++) {
        for (const coin of coins) {
            if (coin <= i && dp[i - coin] !== Infinity && dp[i - coin] + 1 < dp[i]) {
                dp[i] = dp[i - coin] + 1;
                parent[i] = coin;
            }
        }
    }
    
    if (dp[amount] === Infinity) {
        return { minCoins: -1, coins: [] };
    }
    
    // Reconstruct coins used
    const usedCoins = [];
    let remaining = amount;
    while (remaining > 0) {
        usedCoins.push(parent[remaining]);
        remaining -= parent[remaining];
    }
    
    return { minCoins: dp[amount], coins: usedCoins };
}

/**
 * Recursive with Memoization
 */
function coinChangeMemo(coins, amount) {
    const memo = new Map();
    
    function solve(remaining) {
        if (remaining === 0) return 0;
        if (remaining < 0) return -1;
        if (memo.has(remaining)) return memo.get(remaining);
        
        let minCoins = Infinity;
        
        for (const coin of coins) {
            const result = solve(remaining - coin);
            if (result !== -1) {
                minCoins = Math.min(minCoins, result + 1);
            }
        }
        
        const answer = minCoins === Infinity ? -1 : minCoins;
        memo.set(remaining, answer);
        return answer;
    }
    
    return solve(amount);
}

/**
 * Count ways to make change (Coin Change II)
 */
function coinChangeWays(coins, amount) {
    const dp = new Array(amount + 1).fill(0);
    dp[0] = 1;
    
    for (const coin of coins) {
        for (let i = coin; i <= amount; i++) {
            dp[i] += dp[i - coin];
        }
    }
    
    return dp[amount];
}

// Test cases
console.log("coinChange([1,2,5], 11):", coinChange([1, 2, 5], 11)); // 3
console.log("coinChange([2], 3):", coinChange([2], 3)); // -1
console.log("coinChange([1], 0):", coinChange([1], 0)); // 0

const result = coinChangeWithCoins([1, 2, 5], 11);
console.log("\nWith coins:");
console.log("Min coins:", result.minCoins);
console.log("Coins used:", result.coins);

console.log("\nNumber of ways to make change:");
console.log("coinChangeWays([1,2,5], 5):", coinChangeWays([1, 2, 5], 5)); // 4