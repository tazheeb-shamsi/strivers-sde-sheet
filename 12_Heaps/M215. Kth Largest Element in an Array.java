// 215. Kth Largest Element in an Array
// https://leetcode.com/problems/kth-largest-element-in-an-array/

import java.util.PriorityQueue;

class Solution {

    public int findKthLargest(int[] nums, int k) {
        PriorityQueue<Integer> pq = new PriorityQueue<>();
        for (int num : nums) {
            pq.offer(num);
            if (pq.size() > k) {
                pq.poll();
            }
        }
        return pq.peek();
    }

    public static void main(String[] args) {
        Solution solution = new Solution();
        int[] nums = { 3, 2, 1, 5, 6, 4 };
        int k = 2;
        System.out.println(solution.findKthLargest(nums, k)); // Output: 5
    }
}
