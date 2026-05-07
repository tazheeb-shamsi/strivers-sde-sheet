// Compare Version Numbers
// https://leetcode.com/problems/compare-version-numbers/

class Solution {
    public int compareVersion(String version1, String version2) { 
        String[] v1 = version1.split("\\.");
        String[] v2 = version2.split("\\.");
        
        int i = 0;
        int j = 0;
        
        while (i < v1.length || j < v2.length) {
            int num1 = i < v1.length ? Integer.parseInt(v1[i]) : 0;
            int num2 = j < v2.length ? Integer.parseInt(v2[j]) : 0;
            
            if (num1 < num2) return -1;
            if (num1 > num2) return 1;
            
            i++;
            j++;
        }
        
        return 0;
    }
    
    public static void main(String[] args) {
        Solution solution = new Solution();
        String version1 = "1.0.1";
        String version2 = "1.1.2";
        int result = solution.compareVersion(version1, version2);
        System.out.println("Version comparison result: " + result);
    }
}