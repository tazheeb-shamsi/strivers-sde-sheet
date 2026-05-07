// 901. Online Stock Span
// https://leetcode.com/problems/online-stock-span

import java.util.*;

class StockSpanner {

    private Stack<int[]> stack;

    public StockSpanner() {
        stack = new Stack<>();
    }

    public int next(int price) {
        int span = 1;
        while (!stack.isEmpty() && stack.peek()[0] <= price) {
            span += stack.pop()[1];
        }
        stack.push(new int[] { price, span });
        return span;
    }

    public static void main(String[] args) {
        StockSpanner stockSpanner = new StockSpanner();
        System.out.println(stockSpanner.next(100)); // Output: 1
        System.out.println(stockSpanner.next(80)); // Output: 1
        System.out.println(stockSpanner.next(60)); // Output: 1
        System.out.println(stockSpanner.next(70)); // Output: 2
        System.out.println(stockSpanner.next(60)); // Output: 1
        System.out.println(stockSpanner.next(75)); // Output: 4
        System.out.println(stockSpanner.next(85)); // Output: 6
    }

    // Test inside StockSpanner class like LeetCode
    // public static void test(String[] args) {
    //     // Input
    //     String[] commands = {"StockSpanner","next","next","next","next","next","next","next"};
    //     int[][] values = { {}, {100}, {80}, {60}, {70}, {60}, {75}, {85} };

    //     List<Object> output = new ArrayList<>();
    //     StockSpanner obj = null;

    //     for (int i = 0; i < commands.length; i++) {
    //         if (commands[i].equals("StockSpanner")) {
    //             obj = new StockSpanner();
    //             output.add(null);
    //         } else if (commands[i].equals("next")) {
    //             output.add(obj.next(values[i][0]));
    //         }
    //     }

    //     System.out.println(output); // Output: [null, 1, 1, 1, 2, 1, 4, 6]
    // }
}
