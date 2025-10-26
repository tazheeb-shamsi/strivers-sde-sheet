// TUF:Print root to node path
// https://takeuforward.org/plus/dsa/problems/print-root-to-note-path-in-bt
import java.util.ArrayList;
import java.util.List;

class Solution {
    public static class TreeNode {
        int data;
        TreeNode left;
        TreeNode right;
    
        TreeNode(int val) {
            data = val;
            left = null;
            right = null;
        }
    }
    
    public List<List<Integer>> allRootToLeaf(TreeNode root) {
        List<List<Integer>> paths = new ArrayList<>();
        List<Integer> path = new ArrayList<>();
        dfs(root, path, paths);
        return paths;
    }

    private void dfs(
        TreeNode node,
        List<Integer> path,
        List<List<Integer>> paths
    ) {
        if (node == null) return;

        path.add(node.data);

        if (node.left == null && node.right == null) {
            paths.add(new ArrayList<>(path));
        } else {
            dfs(node.left, path, paths);
            dfs(node.right, path, paths);
        }

        path.remove(path.size() - 1);
    }

    public static void main(String[] args) {
        TreeNode root = new TreeNode(1);
        root.left = new TreeNode(2);
        root.right = new TreeNode(3);
        root.left.left = new TreeNode(4);
        root.left.right = new TreeNode(5);
        root.right.left = new TreeNode(6);
        root.right.right = new TreeNode(7);

        Solution solution = new Solution();
        List<List<Integer>> paths = solution.allRootToLeaf(root);

        for (List<Integer> path : paths) {
            System.out.println(path);
        }
    }
}
