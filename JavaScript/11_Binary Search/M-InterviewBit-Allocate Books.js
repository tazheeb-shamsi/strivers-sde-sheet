// InterviewBit: Allocate Books --> Allocate Minimum Number of Pages.
// https://www.interviewbit.com/problems/allocate-books/

// Problem Statement:
// Given an array of integers A of size N and an integer B.
// The College library has N books. The ith book has A[i] number of pages.
// You have to allocate books to B number of students so that the maximum number of pages allocated to a student is minimum.
// 1. A book will be allocated to exactly one student.
// 2. Each student has to be allocated at least one book.
// 3. Allotment should be in contiguous order.
// Calculate and return that minimum possible number.
// NOTE: Return -1 if a valid assignment is not possible

/**
 * Check if it's possible to allocate books with given max pages limit
 * @param {number[]} A - Array of pages in each book
 * @param {number} B - Number of students
 * @param {number} maxPages - Maximum pages a student can have
 * @returns {boolean} - True if allocation is possible
 */
function isPossible(A, B, maxPages) {
    let students = 1;
    let currentPages = 0;

    for (const pages of A) {
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

/**
 * Allocate books to minimize the maximum pages assigned to a student
 * @param {number[]} A - Array of pages in each book
 * @param {number} B - Number of students
 * @returns {number} - Minimum possible maximum pages, or -1 if impossible
 */
function books(A, B) {
    const n = A.length;
    if (B > n) return -1; // not enough books

    let low = 0;
    let high = 0;
    for (const pages of A) {
        low = Math.max(low, pages); // largest book
        high += pages; // sum of all pages
    }

    let result = -1;
    while (low <= high) {
        const mid = low + Math.floor((high - low) / 2);

        if (isPossible(A, B, mid)) {
            result = mid;
            high = mid - 1; // try for better (smaller) maximum
        } else {
            low = mid + 1;
        }
    }

    return result;
}

// Test cases
console.log(books([12, 34, 67, 90], 2)); // 113
console.log(books([10, 20, 30, 40], 2)); // 60
console.log(books([12, 34, 67, 90], 5)); // -1 (not enough books)