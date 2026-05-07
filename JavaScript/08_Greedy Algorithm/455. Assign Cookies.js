// 455. Assign Cookies
// https://leetcode.com/problems/assign-cookies/

/**
 * @param {number[]} g - greed factors of children
 * @param {number[]} s - sizes of cookies
 * @return {number}
 */
function findContentChildren(g, s) {
    g.sort((a, b) => a - b);
    s.sort((a, b) => a - b);

    let i = 0; // pointer for children
    let j = 0; // pointer for cookies

    while (i < g.length && j < s.length) {
        if (g[i] <= s[j]) {
            i++;
        }
        j++;
    }

    return i;
}

const g = [1, 2, 3];
const s = [1, 1];
console.log(findContentChildren(g, s)); // Output: 1
