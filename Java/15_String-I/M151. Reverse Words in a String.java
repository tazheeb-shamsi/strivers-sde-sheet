class Solution {

    public String reverseWord(String s) {
        String[] words = s.trim().split("\\s+");
        StringBuilder reversed = new StringBuilder();

        for (int i = words.length - 1; i >= 0; i--) {
            reversed.append(words[i]);
            if (i != 0)
                reversed.append(' ');
        }
        return reversed.toString();
    }

    public static void main(String[] args) {
        // Create a new instance of Solution
        Solution solution = new Solution();

        // Test1
        String input = "  hello world  ";
        String output = solution.reverseWord(input);
        System.out.println(output); // Output: "World Hello"

        // Test2
        String input2 = "the sky is blue";
        String output2 = solution.reverseWord(input2);
        System.out.println(output2); // Output: "blue is sky the"

        // Test3
        String input3 = "a good   example";
        String output3 = solution.reverseWord(input3);
        System.out.println(output3); // Output: "example good a"

        // Test4
        String input4 = "";
        String output4 = solution.reverseWord(input4);
        System.out.println(output4); // Output: ""

        // Test5
        String input5 = "a";
        String output5 = solution.reverseWord(input5);
        System.out.println(output5); // Output: "a"

        // Test6
        String input6 = "  a ";
        String output6 = solution.reverseWord(input6);
        System.out.println(output6); // Output: "a"

        // Test7
        String input7 = "  a b ";
        String output7 = solution.reverseWord(input7);
        System.out.println(output7); // Output: "b a"
    }
}
