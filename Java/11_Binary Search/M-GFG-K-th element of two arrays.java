// GFG: K-th element of two arrays
// https://www.geeksforgeeks.org/problems/k-th-element-of-two-sorted-array1317/1
// Company Tags: Flipkart, Microsoft

// Given two sorted arrays a[] and b[] and an element k,
// the task is to find the element that would be at the kth position of the combined sorted array.

// Examples :
// Input: a[] = [2, 3, 6, 7, 9], b[] = [1, 4, 8, 10], k = 5
// Output: 6
// Explanation: The final combined sorted array would be [1, 2, 3, 4, 6, 7, 8, 9, 10]. The 5th element of this array is 6.

// Input: a[] = [1, 4, 8, 10, 12], b[] = [5, 7, 11, 15, 17], k = 6
// Output: 10
// Explanation: Combined sorted array is [1, 4, 5, 7, 8, 10, 11, 12, 15, 17]. The 6th element of this array is 10.

class Solution {

    public int kthElement(int a[], int b[], int k) {
        int n = a.length,
            m = b.length;
        int i = 0,
            j = 0,
            count = 0,
            ans = -1;

        while (i < n && j < m) {
            if (a[i] < b[j]) {
                ans = a[i];
                i++;
            } else {
                ans = b[j];
                j++;
            }
            count++;
            if (count == k) return ans;
        }

        // If elements are left in a[]
        while (i < n) {
            ans = a[i++];
            count++;
            if (count == k) return ans;
        }

        // If elements are left in b[]
        while (j < m) {
            ans = b[j++];
            count++;
            if (count == k) return ans;
        }

        return -1;
    }

    public static void main(String[] args) {
        int[] a = new int[] { 2, 3, 6, 7, 9 };
        int[] b = new int[] { 1, 4, 8, 10 };
        int k = 5;

        Solution solution = new Solution();
        int result = solution.kthElement(a, b, k);

        System.out.println(
            "The " + k + "th element of the combined sorted array is: " + result
        );
        //Output: The 5th element of the combined sorted array is: 6
    }
}
