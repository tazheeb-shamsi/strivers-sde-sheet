// CodingNinja - Inversion of Array a.k.a Count Inversions.

class Solution {

    public int inversionCount(int[] arr, int n) {
        int[] temp = new int[n];
        return mergeSort(arr, temp, 0, n - 1);
    }

    private int mergeSort(int[] arr, int[] temp, int left, int right) {
        int count = 0;
        if (left < right) {
            int mid = left + (right - left) / 2;
            count += mergeSort(arr, temp, left, mid);
            count += mergeSort(arr, temp, mid + 1, right);
            count += merge(arr, temp, left, mid, right);
        }
        return count;
    }

    private int merge(int[] arr, int[] temp, int left, int mid, int right) {
        int i = left,
            j = mid + 1,
            k = left;
        int count = 0;

        while (i <= mid && j <= right) {
            if (arr[i] <= arr[j]) {
                temp[k++] = arr[i++];
            } else {
                temp[k++] = arr[j++];
                count += mid - i + 1;
            }
        }

        while (i <= mid) {
            temp[k++] = arr[i++];
        }

        while (j <= right) {
            temp[k++] = arr[j++];
        }

        System.arraycopy(temp, left, arr, left, right - left + 1);
        return count;
    }

    public static void main(String[] args) {
        int[] arr = { 3, 2, 1 };
        Solution solution = new Solution();
        int count = solution.inversionCount(arr, arr.length);
        System.out.println("Inversion Count: " + count); // Inversion Count: 3
    }
}
