// CodingNinja: Max heap, Min Heap Implementation --> Only for Interview
// https://www.naukri.com/code360/problems/min-heap_4691801
// Company Tag: Adobe, Amazon, Flipkart

// Problem Statement:
// Implement the Min Heap data structure.
// You will be given 2 types of queries:-
// 0 X
// Insert X in the heap.

// 1
// Print the minimum element from the heap and remove it.

// Constraints :
// 1 <= T <= 5
// 1 <= N <= 10^5
// 1 <= X <= 50

// Time Limit: 1 sec
// Sample Input:
// 2
// 3
// 0 2
// 0 1
// 1
// 2
// 0 1
// 1

// Sample Output:
// 1
// 1

// Explanation Of Sample Input 1 :
// For the first test case:-
// Insert 2 in the heap and currently, 2 is the smallest element in the heap.
// Insert 1 in the heap and now the smallest element is 1.
// Return and remove the smallest element which is 1.

// For the second test case:-
// Insert 1 in the heap and currently, 1 is the smallest element in the heap.
// Return the smallest element from the heap which is 1 and remove it.

import java.util.*;

class Solution {

    // minHeap function which take size of Queries and Queries as Input.
    // Returns an array out outputs depending on the query.
    static int[] minHeap(int n, int[][] q) {
        int[] result = new int[n];
        int index = 0;
        PriorityQueue<Integer> minHeap = new PriorityQueue<>();

        for (int[] query : q) {
            if (query[0] == 0) {
                minHeap.add(query[1]);
            } else {
                result[index++] = minHeap.poll();
            }
        }

        return Arrays.copyOf(result, index);
    }

    public static void main(String[] args) {
        int[][] queries = {
            { 0, 5 },
            { 0, 3 },
            { 0, 1 },
            { 1 },
            { 0, 2 },
            { 1 },
        };
        int[] result = Solution.minHeap(queries.length, queries);

        System.out.println(Arrays.toString(result));
    }
}
