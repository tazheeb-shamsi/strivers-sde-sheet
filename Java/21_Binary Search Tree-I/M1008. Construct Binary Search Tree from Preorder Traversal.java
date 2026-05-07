// 1008. Construct Binary Search Tree from Preorder Traversal
// https://leetcode.com/problems/construct-binary-search-tree-from-preorder-traversal/

class TreeNode {
    int val;
    TreeNode left;
    TreeNode right;
    TreeNode() {}
    TreeNode(int val) {
        this.val = val;
    }
    TreeNode(int val, TreeNode left, TreeNode right) {
        this.val = val;
        this.left = left;
        this.right = right;
    }
}

class Solution {

    public TreeNode bstFromPreorder(int[] preorder) {
        int[] index = { 0 };
        return construct(preorder, index, Integer.MAX_VALUE);
    }

    private TreeNode construct(int[] preorder, int[] index, int bound) {
        if (
            index[0] == preorder.length || preorder[index[0]] > bound
        ) return null;
        TreeNode root = new TreeNode(preorder[index[0]++]);
        root.left = construct(preorder, index, root.val);
        root.right = construct(preorder, index, bound);
        return root;
    }

    public void printTree(TreeNode root) {
        public List<Integer> toLevelOrder(TreeNode root) {
                List<Integer> result = new ArrayList<>();
                Queue<TreeNode> q = new LinkedList<>();
                q.offer(root);
                while (!q.isEmpty()) {
                    TreeNode node = q.poll();
                    if (node == null) {
                        result.add(null);
                        continue;
                    }
                    result.add(node.val);
                    if (node.left != null || node.right != null) {
                        q.offer(node.left);
                        q.offer(node.right);
                    }
                }
                return result;
            }
}

class Main {

    public static void main(String[] args) {
        TreeNode root = new Solution().bstFromPreorder(new int[] { 1, 3 });
        System.out.println(sol.toLevelOrder(root)); // Output: [1,null,3]
    }
}
