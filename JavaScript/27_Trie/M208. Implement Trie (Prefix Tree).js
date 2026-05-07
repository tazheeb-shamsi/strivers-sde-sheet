/**
 * 208. Implement Trie (Prefix Tree)
 * https://leetcode.com/problems/implement-trie-prefix-tree/
 *
 * Type             | Details
 * -----------------+----------------------------------------------------
 * Time Complexity  | O(L) per operation – L is word/prefix length
 * Space Complexity | O(N * L) – N words of average length L
 */

function createTrieNode() {
    const children = {};
    let isEndOfWord = false;

    return {
        getChild(char) { return children[char]; },
        setChild(char, node) { children[char] = node; },
        hasChild(char) { return char in children; },
        getChildren() { return children; },
        isEnd() { return isEndOfWord; },
        setEnd(val) { isEndOfWord = val; }
    };
}

function createTrie() {
    const root = createTrieNode();

    /**
     * Inserts a word into the trie.
     * @param {string} word
     */
    function insert(word) {
        let node = root;
        for (const char of word) {
            if (!node.hasChild(char)) {
                node.setChild(char, createTrieNode());
            }
            node = node.getChild(char);
        }
        node.setEnd(true);
    }

    /**
     * Returns if the word is in the trie.
     * @param {string} word
     * @returns {boolean}
     */
    function search(word) {
        let node = root;
        for (const char of word) {
            if (!node.hasChild(char)) {
                return false;
            }
            node = node.getChild(char);
        }
        return node.isEnd();
    }

    /**
     * Returns if there is any word in the trie that starts with the given prefix.
     * @param {string} prefix
     * @returns {boolean}
     */
    function startsWith(prefix) {
        let node = root;
        for (const char of prefix) {
            if (!node.hasChild(char)) {
                return false;
            }
            node = node.getChild(char);
        }
        return true;
    }

    /**
     * Returns all words with given prefix
     * @param {string} prefix
     * @returns {string[]}
     */
    function getWordsWithPrefix(prefix) {
        let node = root;
        for (const char of prefix) {
            if (!node.hasChild(char)) {
                return [];
            }
            node = node.getChild(char);
        }

        const words = [];
        collectWords(node, prefix, words);
        return words;
    }

    function collectWords(node, currentWord, words) {
        if (node.isEnd()) {
            words.push(currentWord);
        }
        const children = node.getChildren();
        for (const char in children) {
            collectWords(children[char], currentWord + char, words);
        }
    }

    /**
     * Delete a word from trie
     * @param {string} word
     */
    function deleteWord(word) {
        deleteHelper(root, word, 0);
    }

    function deleteHelper(node, word, index) {
        if (index === word.length) {
            if (!node.isEnd()) return false;
            node.setEnd(false);
            return Object.keys(node.getChildren()).length === 0;
        }

        const char = word[index];
        if (!node.hasChild(char)) return false;

        const shouldDeleteChild = deleteHelper(node.getChild(char), word, index + 1);

        if (shouldDeleteChild) {
            const children = node.getChildren();
            delete children[char];
            return !node.isEnd() && Object.keys(children).length === 0;
        }

        return false;
    }

    return { insert, search, startsWith, getWordsWithPrefix, delete: deleteWord };
}

// Test cases
const trie = createTrie();

trie.insert("apple");
console.log("search('apple'):", trie.search("apple"));   // true
console.log("search('app'):", trie.search("app"));       // false
console.log("startsWith('app'):", trie.startsWith("app")); // true

trie.insert("app");
console.log("search('app'):", trie.search("app"));       // true

trie.insert("application");
trie.insert("apply");

console.log("\nWords with prefix 'app':", trie.getWordsWithPrefix("app"));
// ["app", "apple", "application", "apply"]

trie.delete("app");
console.log("After deleting 'app':");
console.log("search('app'):", trie.search("app"));       // false
console.log("search('apple'):", trie.search("apple"));   // true
