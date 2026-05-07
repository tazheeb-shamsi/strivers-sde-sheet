/**
 * TUF: Number of Distinct Substrings in a String
 * https://takeuforward.org/plus/dsa/problems/distinct-substrings
 *
 * Count all distinct substrings of a given string.
 *
 * Type             | Details
 * -----------------+----------------------------------------------------
 * Time Complexity  | O(N²) – Insert all substrings
 * Space Complexity | O(N²) – Trie nodes in worst case
 */

function createTrieNode() {
    const children = {};

    return {
        getChild(char) { return children[char]; },
        setChild(char, node) { children[char] = node; },
        hasChild(char) { return char in children; }
    };
}

function createTrie() {
    const root = createTrieNode();
    let count = 0;

    /**
     * Insert a string starting from given index
     * Count new nodes added (each new node = new distinct substring)
     */
    function insertAndCount(str, startIndex) {
        let node = root;
        for (let i = startIndex; i < str.length; i++) {
            const char = str[i];
            if (!node.hasChild(char)) {
                node.setChild(char, createTrieNode());
                count++;
            }
            node = node.getChild(char);
        }
    }

    function getCount() {
        return count;
    }

    return { insertAndCount, getCount };
}

/**
 * Count distinct substrings using Trie
 * @param {string} s
 * @returns {number}
 */
function countDistinctSubstrings(s) {
    const trie = createTrie();

    // Insert all suffixes
    for (let i = 0; i < s.length; i++) {
        trie.insertAndCount(s, i);
    }

    // Add 1 for empty string (if required)
    return trie.getCount() + 1;
}

/**
 * Alternative: Using Set (less efficient but simpler)
 */
function countDistinctSubstringsSet(s) {
    const substrings = new Set();

    for (let i = 0; i < s.length; i++) {
        for (let j = i + 1; j <= s.length; j++) {
            substrings.add(s.substring(i, j));
        }
    }

    // Add 1 for empty string
    return substrings.size + 1;
}

/**
 * Get all distinct substrings
 */
function getAllDistinctSubstrings(s) {
    const substrings = new Set();
    substrings.add(""); // Empty string

    for (let i = 0; i < s.length; i++) {
        for (let j = i + 1; j <= s.length; j++) {
            substrings.add(s.substring(i, j));
        }
    }

    return [...substrings].sort();
}

// Test cases
console.log("countDistinctSubstrings('abc'):", countDistinctSubstrings("abc")); 
// 7: "", "a", "b", "c", "ab", "bc", "abc"

console.log("countDistinctSubstrings('aaa'):", countDistinctSubstrings("aaa")); 
// 4: "", "a", "aa", "aaa"

console.log("countDistinctSubstrings('abab'):", countDistinctSubstrings("abab")); 
// 8: "", "a", "b", "ab", "ba", "aba", "bab", "abab"
