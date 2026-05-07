// GFG: Find Minimum Number Of Coins That Make A Change
// Coin Change - Minimum Coins to Make Sum
// https://www.geeksforgeeks.org/problems/number-of-coins1824/1

/**
 * @param {number[]} coins
 * @param {number} sum
 * @return {number}
 */
function minCoins(coins, sum) {
    const dp = new Array(sum + 1).fill(Infinity);
    dp[0] = 0;

    for (let i = 1; i <= sum; i++) {
        for (const coin of coins) {
            if (i - coin >= 0 && dp[i - coin] !== Infinity) {
                dp[i] = Math.min(dp[i], dp[i - coin] + 1);
            }
        }
    }

    return dp[sum] === Infinity ? -1 : dp[sum];
}

const coins = [1, 2, 5];
const sum = 11;
console.log(minCoins(coins, sum)); // Output: 3
