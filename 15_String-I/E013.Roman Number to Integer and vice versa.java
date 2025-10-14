// Roman Number to Integer and vice versa
// https://leetcode.com/problems/roman-to-integer/

class Solution {

    // Map Roman characters to their integer values
    private int getNumberValue(char c) {
        switch (c) {
            case 'I': return 1;
            case 'V': return 5;
            case 'X': return 10;
            case 'L': return 50;
            case 'C': return 100;
            case 'D': return 500;
            case 'M': return 1000;
            default: return 0;
        }
    }

    // Convert Roman numeral to integer
    public int romanToInt(String s) {
        int result = 0;
        int prevValue = 0;

        for (int i = s.length() - 1; i >= 0; i--) {
            int value = getNumberValue(s.charAt(i));
            if (value < prevValue) {
                result -= value;
            } else {
                result += value;
            }
            prevValue = value;
        }

        return result;
    }

    // Convert integer to Roman numeral
    public String intToRoman(int num) {
        int[] values = {1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1};
        String[] symbols = {
            "M", "CM", "D", "CD", "C", "XC",
            "L", "XL", "X", "IX", "V", "IV", "I"
        };

        StringBuilder sb = new StringBuilder();

        for (int i = 0; i < values.length && num > 0; i++) {
            while (num >= values[i]) {
                num -= values[i];
                sb.append(symbols[i]);
            }
        }

        return sb.toString();
    }

    public static void main(String[] args) {
        Solution sol = new Solution();

        // Roman → Integer
        System.out.println(sol.romanToInt("MCMXCIV")); // Output: 1994

        // Integer → Roman
        System.out.println(sol.intToRoman(1994)); // Output: MCMXCIV
    }
}
