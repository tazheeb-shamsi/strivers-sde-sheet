/**
 * TUF: Longest Word with All Prefixes
 * https://takeuforward.org/plus/dsa/problems/longest-word-with-all-prefixes
 *
 * Find the longest word where every prefix is also a word in the dictionary.
 *
 * Type             | Details
 * -----------------+----------------------------------------------------
 * Time Complexity  | O(N * L) – Insert and check all words
 * Space Complexity | O(N * L) – Trie storage
 */

function createTrieNode() {
    const children = {};
    let isEnd = false;

    return {
        getChild(char) { return children[char]; },
        setChild(char, node) { children[char] = node; },
        hasChild(char) { return char in children; },
        getChildren() { return children; },
        isEndOfWord() { return isEnd; },
        setEndOfWord(val) { isEnd = val; }
    };
}

function createTrie() {
    const root = createTrieNode();

    function insert(word) {
        let node = root;
        for (const char of word) {
            if (!node.hasChild(char)) {
                node.setChild(char, createTrieNode());
            }
            node = node.getChild(char);
        }
        node.setEndOfWord(true);
    }

    /**
     * Check if all prefixes of the word exist
     */
    function hasAllPrefixes(word) {
        let node = root;
        for (const char of word) {
            if (!node.hasChild(char)) {
                return false;
            }
            node = node.getChild(char);
            if (!node.isEndOfWord()) {
                return false;
            }
        }
        return true;
    }

    function getRoot() {
        return root;
    }

    return { insert, hasAllPrefixes, getRoot };
}

/**
 * Find longest word with all prefixes
 * @param {string[]} words
 * @returns {string}
 */
function longestWordWithAllPrefixes(words) {
    const trie = createTrie();

    // Insert all words into trie
    for (const word of words) {
        trie.insert(word);
    }

    let result = "";

    // Check each word
    for (const word of words) {
        if (trie.hasAllPrefixes(word)) {
            // Update result if current word is longer or lexicographically smaller
            if (word.length > result.length || 
                (word.length === result.length && word < result)) {
                result = word;
            }
        }
    }

    return result;
}

/**
 * Alternative: DFS approach
 */
function longestWordDFS(words) {
    const trie = createTrie();
    for (const word of words) {
        trie.insert(word);
    }

    let result = "";

    function dfs(node, currentWord) {
        if (currentWord.length > result.length || 
            (currentWord.length === result.length && currentWord < result)) {
            result = currentWord;
        }

        // Explore children in lexicographical order
        const children = node.getChildren();
        const chars = Object.keys(children).sort();
        for (const char of chars) {
            const child = children[char];
            if (child.isEndOfWord()) {
                dfs(child, currentWord + char);
            }
        }
    }

    dfs(trie.getRoot(), "");
    return result;
}

// Test cases
const words1 = ["a", "banana", "app", "appl", "ap", "apply", "apple"];
console.log("longestWordWithAllPrefixes:", longestWordWithAllPrefixes(words1)); 
// "apple" - has prefixes a, ap, app, appl, apple

const words2 = ["abc", "a", "ab", "abcd"];
console.log("longestWordWithAllPrefixes:", longestWordWithAllPrefixes(words2)); 
// "abcd"

const words3 = ["a", "b", "ba", "bca", "bda", "bdca"];
console.log("longestWordDFS:", longestWordDFS(words3)); 
// "bdca"
