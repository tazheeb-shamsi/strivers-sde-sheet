/**
 * 421. Maximum XOR of Two Numbers in an Array
 * https://leetcode.com/problems/maximum-xor-of-two-numbers-in-an-array/
 *
 * Find maximum XOR of any two numbers in the array.
 *
 * Type             | Details
 * -----------------+----------------------------------------------------
 * Time Complexity  | O(N * 32) – Insert and query N numbers, 32 bits each
 * Space Complexity | O(N * 32) – Trie nodes
 */

/**
 * Creates a TrieNode for binary trie (functional approach)
 * @returns {Object} TrieNode
 */
function createTrieNode() {
    return { children: [null, null] }; // Index 0 for bit 0, index 1 for bit 1
}

/**
 * Creates a Trie for binary numbers (functional approach)
 * @returns {Object} Trie operations
 */
function createTrie() {
    const root = createTrieNode();

    /**
     * Insert a number into trie (binary representation)
     * @param {number} num
     */
    function insert(num) {
        let node = root;
        for (let i = 31; i >= 0; i--) {
            const bit = (num >> i) & 1;
            if (!node.children[bit]) {
                node.children[bit] = createTrieNode();
            }
            node = node.children[bit];
        }
    }

    /**
     * Find maximum XOR with given number
     * @param {number} num
     * @returns {number}
     */
    function getMaxXOR(num) {
        let node = root;
        let maxXOR = 0;

        for (let i = 31; i >= 0; i--) {
            const bit = (num >> i) & 1;
            const oppositeBit = 1 - bit;

            // Try to go the opposite direction for maximum XOR
            if (node.children[oppositeBit]) {
                maxXOR |= (1 << i);
                node = node.children[oppositeBit];
            } else if (node.children[bit]) {
                node = node.children[bit];
            }
        }

        return maxXOR;
    }

    return { insert, getMaxXOR };
}

/**
 * Maximum XOR of Two Numbers using Trie
 * @param {number[]} nums
 * @returns {number}
 */
function findMaximumXOR(nums) {
    const trie = createTrie();

    // Insert first number
    trie.insert(nums[0]);

    let maxXOR = 0;

    // For each subsequent number, find max XOR with existing numbers
    for (let i = 1; i < nums.length; i++) {
        maxXOR = Math.max(maxXOR, trie.getMaxXOR(nums[i]));
        trie.insert(nums[i]);
    }

    return maxXOR;
}

/**
 * Brute Force approach O(N²)
 */
function findMaximumXORBruteForce(nums) {
    let maxXOR = 0;
    for (let i = 0; i < nums.length; i++) {
        for (let j = i + 1; j < nums.length; j++) {
            maxXOR = Math.max(maxXOR, nums[i] ^ nums[j]);
        }
    }
    return maxXOR;
}

// Test cases
const nums1 = [3, 10, 5, 25, 2, 8];
console.log("Max XOR (Trie):", findMaximumXOR(nums1)); // 28 (5 ^ 25)
console.log("Max XOR (Brute):", findMaximumXORBruteForce(nums1)); // 28

const nums2 = [14, 70, 53, 83, 49, 91, 36, 80, 92, 51, 66, 70];
console.log("Max XOR (Trie):", findMaximumXOR(nums2)); // 127

const nums3 = [0];
console.log("Max XOR single element:", findMaximumXOR(nums3)); // 0
