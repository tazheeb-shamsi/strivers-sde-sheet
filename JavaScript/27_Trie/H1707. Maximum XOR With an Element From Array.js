/**
 * 1707. Maximum XOR With an Element From Array
 * https://leetcode.com/problems/maximum-xor-with-an-element-from-array/
 *
 * For each query [xi, mi], find max XOR of xi with element <= mi from nums.
 *
 * Type             | Details
 * -----------------+----------------------------------------------------
 * Time Complexity  | O((N + Q) * 32) – Process each number in trie
 * Space Complexity | O(N * 32) – Trie nodes
 */

function createTrieNode() {
    const children = [null, null]; // 0 and 1

    return {
        getChild(bit) { return children[bit]; },
        setChild(bit, node) { children[bit] = node; },
        hasChild(bit) { return children[bit] !== null; }
    };
}

function createTrie() {
    const root = createTrieNode();

    function insert(num) {
        let node = root;
        for (let i = 31; i >= 0; i--) {
            const bit = (num >> i) & 1;
            if (!node.hasChild(bit)) {
                node.setChild(bit, createTrieNode());
            }
            node = node.getChild(bit);
        }
    }

    function getMaxXOR(num) {
        if (!root.hasChild(0) && !root.hasChild(1)) {
            return -1;
        }

        let node = root;
        let maxXOR = 0;

        for (let i = 31; i >= 0; i--) {
            const bit = (num >> i) & 1;
            const oppositeBit = 1 - bit;

            if (node.hasChild(oppositeBit)) {
                maxXOR |= (1 << i);
                node = node.getChild(oppositeBit);
            } else if (node.hasChild(bit)) {
                node = node.getChild(bit);
            } else {
                return -1;
            }
        }

        return maxXOR;
    }

    return { insert, getMaxXOR };
}

/**
 * Maximum XOR With an Element From Array
 * @param {number[]} nums
 * @param {number[][]} queries
 * @returns {number[]}
 */
function maximizeXor(nums, queries) {
    // Sort nums
    nums.sort((a, b) => a - b);

    // Add index to queries and sort by mi
    const indexedQueries = queries.map((q, i) => [...q, i]);
    indexedQueries.sort((a, b) => a[1] - b[1]);

    const result = new Array(queries.length);
    const trie = createTrie();
    let numIndex = 0;

    for (const [xi, mi, queryIndex] of indexedQueries) {
        // Add all nums <= mi to trie
        while (numIndex < nums.length && nums[numIndex] <= mi) {
            trie.insert(nums[numIndex]);
            numIndex++;
        }

        result[queryIndex] = trie.getMaxXOR(xi);
    }

    return result;
}

// Test cases
const nums1 = [0, 1, 2, 3, 4];
const queries1 = [[3, 1], [1, 3], [5, 6]];
console.log("maximizeXor([0,1,2,3,4], [[3,1],[1,3],[5,6]]):", 
    maximizeXor(nums1, queries1)); // [3, 3, 7]

const nums2 = [5, 2, 4, 6, 6, 3];
const queries2 = [[12, 4], [8, 1], [6, 3]];
console.log("maximizeXor([5,2,4,6,6,3], [[12,4],[8,1],[6,3]]):", 
    maximizeXor(nums2, queries2)); // [15, -1, 5]
