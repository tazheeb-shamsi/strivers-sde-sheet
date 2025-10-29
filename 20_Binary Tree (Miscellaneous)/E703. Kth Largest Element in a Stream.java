// Kth Largest Element in a Stream
// https://leetcode.com/problems/kth-largest-element-in-a-stream/

import java.util.PriorityQueue;

class KthLargest {
    private PriorityQueue<Integer> minHeap;
    private int k;

    public KthLargest(int k, int[] nums) {
        this.k = k;
        this.minHeap = new PriorityQueue<>(); // Min-heap

        // Add all initial numbers
        for (int num : nums) {
            add(num);
        }
    }

    public int add(int val) {
        // Add new value
        minHeap.offer(val);

        // If heap grows beyond k, remove smallest
        if (minHeap.size() > k) {
            minHeap.poll();
        }

        // The kth largest is the smallest element in the heap
        return minHeap.peek();
    }

    public static void main(String[] args) {
        int k = 3;
        int[] nums = {4, 5, 8, 2};

        KthLargest kthLargest = new KthLargest(k, nums);

        System.out.println(kthLargest.add(3));  // returns 4
        System.out.println(kthLargest.add(5));  // returns 5
        System.out.println(kthLargest.add(10)); // returns 5
        System.out.println(kthLargest.add(9));  // returns 8
        System.out.println(kthLargest.add(4));  // returns 8
    }
}


/**
 * Your KthLargest object will be instantiated and called as such:
 * KthLargest obj = new KthLargest(k, nums);
 * int param_1 = obj.add(val);
 */
