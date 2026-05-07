// M-Coloring Problem
// https://www.geeksforgeeks.org/problems/m-coloring-problem-1587115620/1

/**
 * @param {number} v - number of vertices
 * @param {number[][]} edges
 * @param {number} m - number of colors
 * @return {boolean}
 */
function graphColoring(v, edges, m) {
    const color = new Array(v).fill(-1);
    return solve(0, color, edges, m);
}

function solve(node, color, edges, m) {
    if (node === color.length) return true;

    for (let i = 0; i < m; i++) {
        if (isValid(node, color, edges, i)) {
            color[node] = i;
            if (solve(node + 1, color, edges, m)) return true;
            color[node] = -1;
        }
    }

    return false;
}

function isValid(node, color, edges, c) {
    for (const edge of edges) {
        if (edge[0] === node && color[edge[1]] === c) return false;
        if (edge[1] === node && color[edge[0]] === c) return false;
    }
    return true;
}

const V = 4;
const edges = [[0, 1], [1, 3], [2, 3], [3, 0], [0, 2]];
const m = 3;
console.log(graphColoring(V, edges, m)); // Output: true
