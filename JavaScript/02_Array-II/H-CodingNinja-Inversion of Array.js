// CodingNinja - Inversion of Array a.k.a Count Inversions.

/**
 * @param {number[]} arr
 * @param {number} n
 * @return {number}
 */
function inversionCount(arr, n) {
    const temp = new Array(n);
    return mergeSort(arr, temp, 0, n - 1);
}

function mergeSort(arr, temp, left, right) {
    let count = 0;
    if (left < right) {
        const mid = left + Math.floor((right - left) / 2);
        count += mergeSort(arr, temp, left, mid);
        count += mergeSort(arr, temp, mid + 1, right);
        count += merge(arr, temp, left, mid, right);
    }
    return count;
}

function merge(arr, temp, left, mid, right) {
    let i = left;
    let j = mid + 1;
    let k = left;
    let count = 0;

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

    for (let idx = left; idx <= right; idx++) {
        arr[idx] = temp[idx];
    }

    return count;
}

const arr = [3, 2, 1];
console.log("Inversion Count:", inversionCount(arr, arr.length)); // Output: 3
