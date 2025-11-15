// TUF: Implement Trie II (Prefix Tree)
// Trie Implementation and Advanced Operations
// https://takeuforward.org/plus/dsa/problems/trie-implementation-and-advanced-operations

/**
 * Implement "TRIE” data structure from scratch with the following functions.

• Trie(): Initialize the object of this “TRIE” data structure.
• insert(“WORD”): Insert the string “WORD” into this “TRIE” data structure.
• countWordsEqualTo(“WORD”): Return how many times this “WORD” is present in this “TRIE”.
• countWordsStartingWith(“PREFIX”): Return how many words are there in this “TRIE” that have the string “PREFIX” as a prefix.
• erase(“WORD”): Delete one occurrence of the string “WORD” from the “TRIE”.

* Examples:
Input : ["Trie", "insert", "countWordsEqualTo", "insert", "countWordsStartingWith", "erase", "countWordsStartingWith"]
[ "apple", "apple", "app", "app", "apple", "app" ]
Output : [null, null, 1, null, 2, null, 1]

Explanation :
Trie trie = new Trie()
trie.insert("apple")
trie.countWordsEqualTo("apple")  // return 1
trie.insert("app") 
trie.countWordsStartingWith("app") // return 2
trie.erase("apple")
trie.countWordsStartingWith("app")   // return 1

Input : ["Trie", "insert", "countWordsEqualTo", "insert", "erase", "countWordsStartingWith"]
[ "mango", "apple", "app", "app", "mango" ]
Output : [null, null, 0, null, null, 1]

Explanation :
Trie trie = new Trie()
trie.insert("mango")
trie.countWordsEqualTo("apple")  // return 0
trie.insert("app") 
trie.erase("app")
trie.countWordsStartingWith("mango") // return 1
 */


class Trie {
    private static class Node {
        Node[] children = new Node[26];
        int prefixCount;  // number of words passing through this node
        int endCount;     // number of words ending at this node
    }

    private final Node root;

    public Trie() {
        root = new Node();
    }

    public void insert(String word) {
        if (word == null || word.isEmpty()) return;
        Node node = root;
        for (char ch : word.toCharArray()) {
            int idx = ch - 'a';
            if (node.children[idx] == null) {
                node.children[idx] = new Node();
            }
            node = node.children[idx];
            node.prefixCount++;
        }
        node.endCount++;
    }

    public int countWordsEqualTo(String word) {
        if (word == null || word.isEmpty()) return 0;
        Node node = root;
        for (char ch : word.toCharArray()) {
            int idx = ch - 'a';
            if (node.children[idx] == null) return 0;
            node = node.children[idx];
        }
        return node.endCount;
    }

    public int countWordsStartingWith(String prefix) {
        if (prefix == null || prefix.isEmpty()) return 0;
        Node node = root;
        for (char ch : prefix.toCharArray()) {
            int idx = ch - 'a';
            if (node.children[idx] == null) return 0;
            node = node.children[idx];
        }
        return node.prefixCount;
    }

    public void erase(String word) {
        if (countWordsEqualTo(word) == 0) return; // nothing to erase
        Node node = root;
        for (char ch : word.toCharArray()) {
            int idx = ch - 'a';
            Node next = node.children[idx];
            next.prefixCount--;
            if (next.prefixCount == 0) {
                node.children[idx] = null; // prune branch to save space
                return;
            }
            node = next;
        }
        node.endCount--;
    }

    public static void main(String[] args) {
        Trie trie = new Trie();
        trie.insert("apple");
        trie.insert("app");
        System.out.println(trie.countWordsEqualTo("apple")); // 1
        System.out.println(trie.countWordsStartingWith("app")); // 2
        trie.erase("apple");
        System.out.println(trie.countWordsStartingWith("app")); // 1
    }
}

/**
 * Your Trie object will be instantiated and called as such:
 * Trie obj = new Trie();
 * obj.insert(word);
 * int param_2 = obj.countWordsEqualTo(word);
 * int param_3 = obj.countWordsStartingWith(prefix);
 * obj.erase(word);
 */