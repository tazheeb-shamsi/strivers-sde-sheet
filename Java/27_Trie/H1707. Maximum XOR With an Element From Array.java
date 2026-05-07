// 1707. Maximum XOR With an Element From Array
// https://leetcode.com/problems/maximum-xor-with-an-element-from-array/

class Solution {
    // Bitwise trie node for integers
    private static class Node {
        Node[] child = new Node[2];
    }

    private void insert(Node root, int num) {
        Node cur = root;
        for (int bit = 31; bit >= 0; bit--) {
            int b = (num >> bit) & 1;
            if (cur.child[b] == null) cur.child[b] = new Node();
            cur = cur.child[b];
        }
    }

    private int query(Node root, int num) {
        Node cur = root;
        int ans = 0;
        for (int bit = 31; bit >= 0; bit--) {
            int b = (num >> bit) & 1;
            int want = 1 - b;
            if (cur.child[want] != null) {
                ans |= (1 << bit);
                cur = cur.child[want];
            } else if (cur.child[b] != null) {
                cur = cur.child[b];
            } else {
                break;
            }
        }
        return ans;
    }

    public int[] maximizeXor(int[] nums, int[][] queries) {
        java.util.Arrays.sort(nums);

        int qn = queries.length;
        int[][] qs = new int[qn][3]; // xi, mi, originalIndex
        for (int i = 0; i < qn; i++) {
            qs[i][0] = queries[i][0];
            qs[i][1] = queries[i][1];
            qs[i][2] = i;
        }

        java.util.Arrays.sort(qs, new java.util.Comparator<int[]>() {
            public int compare(int[] a, int[] b) {
                return Integer.compare(a[1], b[1]); // sort by mi
            }
        });

        int[] ans = new int[qn];
        java.util.Arrays.fill(ans, -1);

        Node root = new Node();
        int idx = 0, n = nums.length;

        for (int[] q : qs) {
            int x = q[0], m = q[1], qi = q[2];

            // Insert all nums <= m into trie
            while (idx < n && nums[idx] <= m) {
                insert(root, nums[idx]);
                idx++;
            }

            if (idx == 0) {
                ans[qi] = -1; // no valid element
            } else {
                ans[qi] = query(root, x);
            }
        }

        return ans;
    }

    public static void main(String[] args){
        
        Solution sol = new Solution();

        int[] nums = {0,1,2,3,4};
        int[][] queries = {{3,1},{1,3},{5,6}};

        int[] ans = sol.maximizeXor(nums, queries);

        for (int i = 0; i < ans.length; i++) {
            System.out.println(ans[i]);
        }
    }
}