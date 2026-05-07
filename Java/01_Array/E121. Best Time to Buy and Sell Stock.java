class Solution {

    public int maxProfit(int[] prices) {
        int minPrice = Integer.MAX_VALUE;
        int maxProfit = 0;

        for (int price : prices) {
            if (price < minPrice) {
                minPrice = price;
            } else {
                maxProfit = Math.max(maxProfit, price - minPrice);
            }
        }
        return maxProfit;
    }

    public static void main(String[] args) {
        Solution solution = new Solution();

        // Test case 1: [7,1,5,3,6,4]
        int[] prices1 = { 7, 1, 5, 3, 6, 4 };
        System.out.println("Test case 1: " + solution.maxProfit(prices1)); // Expected: 5

        // Test case 2: [7,6,4,3,1]
        int[] prices2 = { 7, 6, 4, 3, 1 };
        System.out.println("Test case 2: " + solution.maxProfit(prices2)); // Expected: 0

        // Test case 3: [1,2,3,4,5]
        int[] prices3 = { 1, 2, 3, 4, 5 };
        System.out.println("Test case 3: " + solution.maxProfit(prices3)); // Expected: 4

        // Test case 4: [2,4,1]
        int[] prices4 = { 2, 4, 1 };
        System.out.println("Test case 4: " + solution.maxProfit(prices4)); // Expected: 2

        // Test case 5: [3,2,6,5,0,3]
        int[] prices5 = { 3, 2, 6, 5, 0, 3 };
        System.out.println("Test case 5: " + solution.maxProfit(prices5)); // Expected: 4
    }
}
