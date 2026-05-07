// 901. Online Stock Span
// https://leetcode.com/problems/online-stock-span/

/**
 * Creates a stock spanner (functional approach)
 * Returns the span of the stock's price for the current day
 * @returns {Object} StockSpanner operations
 */
function createStockSpanner() {
    const stack = []; // [price, span]

    function next(price) {
        let span = 1;
        
        while (stack.length > 0 && stack[stack.length - 1][0] <= price) {
            span += stack.pop()[1];
        }
        
        stack.push([price, span]);
        return span;
    }

    return { next };
}

// Test cases
const stockSpanner = createStockSpanner();
console.log(stockSpanner.next(100)); // 1
console.log(stockSpanner.next(80));  // 1
console.log(stockSpanner.next(60));  // 1
console.log(stockSpanner.next(70));  // 2
console.log(stockSpanner.next(60));  // 1
console.log(stockSpanner.next(75));  // 4
console.log(stockSpanner.next(85));  // 6
