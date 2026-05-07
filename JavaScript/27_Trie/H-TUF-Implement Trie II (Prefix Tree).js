/**
 * TUF: Implement Trie II (Prefix Tree) with additional operations
 * https://takeuforward.org/plus/dsa/problems/implement-trie-ii
 *
 * Support insert, countWordsEqualTo, countWordsStartingWith, erase
 *
 * Type             | Details
 * -----------------+----------------------------------------------------
 * Time Complexity  | O(L) per operation – L is word length
 * Space Complexity | O(N * L) – N words of avg length L
 */

function createTrieNode() {
    const children = {};
    let countEndsWith = 0;  // Count of words ending at this node
    let countPrefix = 0;    // Count of words with this prefix

    return {
        getChild(char) { return children[char]; },
        setChild(char, node) { children[char] = node; },
        hasChild(char) { return char in children; },
        getCountEndsWith() { return countEndsWith; },
        getCountPrefix() { return countPrefix; },
        incrementCountEndsWith() { countEndsWith++; },
        decrementCountEndsWith() { countEndsWith--; },
        incrementCountPrefix() { countPrefix++; },
        decrementCountPrefix() { countPrefix--; }
    };
}

function createTrie() {
    const root = createTrieNode();

    /**
     * Insert a word into the trie
     * @param {string} word
     */
    function insert(word) {
        let node = root;
        for (const char of word) {
            if (!node.hasChild(char)) {
                node.setChild(char, createTrieNode());
            }
            node = node.getChild(char);
            node.incrementCountPrefix();
        }
        node.incrementCountEndsWith();
    }

    /**
     * Count words equal to given word
     * @param {string} word
     * @returns {number}
     */
    function countWordsEqualTo(word) {
        let node = root;
        for (const char of word) {
            if (!node.hasChild(char)) {
                return 0;
            }
            node = node.getChild(char);
        }
        return node.getCountEndsWith();
    }

    /**
     * Count words starting with given prefix
     * @param {string} prefix
     * @returns {number}
     */
    function countWordsStartingWith(prefix) {
        let node = root;
        for (const char of prefix) {
            if (!node.hasChild(char)) {
                return 0;
            }
            node = node.getChild(char);
        }
        return node.getCountPrefix();
    }

    /**
     * Erase a word from trie (assumes word exists)
     * @param {string} word
     */
    function erase(word) {
        let node = root;
        for (const char of word) {
            if (!node.hasChild(char)) {
                return; // Word doesn't exist
            }
            node = node.getChild(char);
            node.decrementCountPrefix();
        }
        node.decrementCountEndsWith();
    }

    return { insert, countWordsEqualTo, countWordsStartingWith, erase };
}

// Test cases
const trie = createTrie();

trie.insert("apple");
trie.insert("apple");
trie.insert("apps");
trie.insert("apps");

console.log("countWordsEqualTo('apple'):", trie.countWordsEqualTo("apple")); // 2
console.log("countWordsEqualTo('apps'):", trie.countWordsEqualTo("apps")); // 2
console.log("countWordsEqualTo('app'):", trie.countWordsEqualTo("app")); // 0

console.log("countWordsStartingWith('app'):", trie.countWordsStartingWith("app")); // 4
console.log("countWordsStartingWith('appl'):", trie.countWordsStartingWith("appl")); // 2

trie.erase("apple");
console.log("\nAfter erasing one 'apple':");
console.log("countWordsEqualTo('apple'):", trie.countWordsEqualTo("apple")); // 1
console.log("countWordsStartingWith('app'):", trie.countWordsStartingWith("app")); // 3
