// InterviewBit: Allocate Books --> Allocate Minimum Number of Pages.
// https://www.interviewbit.com/problems/allocate-books/

//Problem Statement: 
// Given an array of integers A of size N and an integer B.

// The College library has N books. The ith book has A[i] number of pages.

// You have to allocate books to B number of students so that the maximum number of pages allocated to a student is minimum.
// 1.A book will be allocated to exactly one student.
// 2.Each student has to be allocated at least one book.
// 3.Allotment should be in contiguous order, for example: A student cannot be allocated book 1 and book 3, skipping book 2.
// Calculate and return that minimum possible number.

// NOTE: Return -1 if a valid assignment is not possible

class Solution {
    public int books(int[] A, int B) {
        int n = A.length;
        if (B > n) return -1; // not enough books

        int low = 0, high = 0;
        for (int pages : A) {
            low = Math.max(low, pages); // largest book
            high += pages;              // sum of all pages
        }

        int result = -1;
        while (low <= high) {
            int mid = low + (high - low) / 2;

            if (isPossible(A, B, mid)) {
                result = mid;
                high = mid - 1; // try for better (smaller) maximum
            } else {
                low = mid + 1;
            }
        }

        return result;
    }

    private boolean isPossible(int[] A, int B, int maxPages) {
        int students = 1; 
        int currentPages = 0;

        for (int pages : A) {
            if (currentPages + pages > maxPages) {
                students++;
                currentPages = pages;
                if (students > B) return false;
            } else {
                currentPages += pages;
            }
        }
        return true;
    }

    public static void main(String[] args) {
        Solution sol = new Solution();
        int[] A = {12, 34, 67, 90};
        int B = 2;
        System.out.println(sol.books(A, B)); // Output: 113
    }
}
