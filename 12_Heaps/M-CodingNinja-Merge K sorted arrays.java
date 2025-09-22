// CodingNinja: Merge K sorted arrays
// https://www.naukri.com/code360/problems/merge-k-sorted-arrays_975379
// Description:
// You have been given ‘K’ different arrays/lists, which are sorted individually (in ascending order).
// You need to merge all the given arrays/list such that the output array/list should be sorted in ascending order.

import java.util.*;
import java.util.ArrayList;

class Solution {

    public static ArrayList<Integer> mergeKSortedArrays(
        ArrayList<ArrayList<Integer>> kArrays,
        int k
    ) {
        PriorityQueue<Integer> pq = new PriorityQueue<>();
        for (ArrayList<Integer> arr : kArrays) {
            for (int num : arr) {
                pq.add(num);
            }
        }
        ArrayList<Integer> ans = new ArrayList<>();
        while (!pq.isEmpty()) {
            ans.add(pq.poll());
        }
        return ans;
    }

    public static void main(String[] args) {
        ArrayList<ArrayList<Integer>> kArrays = new ArrayList<>();
        kArrays.add(new ArrayList<>(Arrays.asList(1, 4, 7)));
        kArrays.add(new ArrayList<>(Arrays.asList(2, 5, 8)));
        kArrays.add(new ArrayList<>(Arrays.asList(3, 6, 9)));
        int k = 3;
        ArrayList<Integer> mergedArray = mergeKSortedArrays(kArrays, k);
        System.out.println(mergedArray);
    }
}
